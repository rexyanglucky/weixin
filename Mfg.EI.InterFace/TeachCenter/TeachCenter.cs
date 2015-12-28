using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using Mfg.EI.Common;
using Mfg.EI.DAL;
using Mfg.EI.ViewModel;


namespace Mfg.EI.InterFace
{
    /// <summary>
    /// SyncTeach：同步教学功能操作
    /// </summary>
    public class TeachCenter : ITeachCenter
    {

        private const string FirstMark = "#老师可以根据教学实际需求，记录本节课引入课堂的内容，比如课前回顾、故事引入等#";
        private const string SummaryMark = "#此处填写老师自己的教学方法，或者是老师自己针对此次教学的总结信息，包括针对当前学生学习状态信息#";
        private const string TitleName = "第{0}次课的教案";

        private readonly IQuestion _questionbank;
        private readonly TeachCenterDal _teachCenterDal = new TeachCenterDal();

        public TeachCenter(IQuestion question)
        {
            _questionbank = question;
        }

        #region 读取数据
        /// <summary>
        /// 从数据库读取教案
        /// </summary>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        public PrepareLessonsModel GetPrepareLessonFromDb(TeachCenterQueryModel queryModel)
        {
            return _teachCenterDal.GetPrepareLessonFromDb(queryModel);
        }

        /// <summary>
        /// 获取试题列表
        /// </summary>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        public List<PlanQuestionItemsModel> GetPlanQuestionItemsFromDb(TeachCenterQueryModel queryModel)
        {
            var modelList = _teachCenterDal.GetPlanQuestionItemsFromDb(queryModel);
            if (modelList.Count > 0)
            {
                var subject = modelList[0].SubjectID;
                var idList = modelList.Select(m => m.ItemID).ToArray();
                var qlist = _questionbank.FindByIdlist("0" + subject.ToString(), idList);
                Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, subject);
                modelList.ForEach(m =>
                {
                    var q = qlist.FirstOrDefault(n => n.f_id == m.ItemID);
                    if (q != null)
                    {
                        var qViewModel = new QuestionItemViewModel(q, subject);
                        m.ItemName = qViewModel.GetItemBodyHtml();
                        m.ItemAnaly = qViewModel.f_ways;
                        m.ItemTypeName = qViewModel.f_styleName;
                        m.ItemType = _r(qViewModel.f_style);
                        m.ItemStyle = qViewModel.f_style;
                        m.RightAnswer = qViewModel.f_answer;
                        m.Difficulty = qViewModel.f_difficulty;
                    }
                        
                    
                });
            }
            return modelList;

        }
        /// <summary>
        /// 更新 指定字段
        /// </summary>
        /// <param name="lessonModel"></param>
        /// <param name="cloumns">
        /// 1 fristmark 2 targetmark 3 diffmark 4 summarymark 
        /// 5 isfirst 6 istarget 7 isdiff 8 istach 9 issummary
        /// </param>
        /// <returns>bool</returns>

        #endregion

        #region 设计教案保存数据

        /// <summary>
        /// 设计教案保存数据
        /// </summary>
        /// <param name="queryModel">planindex，知识点列表，科目</param>
        /// <returns>int 0 成功 1 无数据 2程序异常</returns>
        public int SavePrepareLessonsDetial(TeachCenterQueryModel queryModel)
        {
            PrepareLessonsModel lessonsModel = GetPrepareLessonFromResource(queryModel);
            if (lessonsModel == null)
            {
                return 1;
            }
            #region 教案设置
            lessonsModel.CourseLever = (byte)queryModel.CoursesFocus;
            lessonsModel.ItemNumber = queryModel.QuestionCount;
            //讲练比例；多讲型1；多练型2；中间型3；
            var pleve = 3;
            if (queryModel.ExamplePracticePercent > 0.5)
            {
                pleve = 1;
            }
            if (queryModel.ExamplePracticePercent < 0.5)
            {
                pleve = 2;
            }
            lessonsModel.PlanLever = (byte)pleve;
            lessonsModel.CourseLever = (byte)queryModel.CoursesFocus;

            //容易题1；较易题2；中等题3；较难题4；困难题5
            lessonsModel.DiffLever = (byte)queryModel.Difficulty;
            #endregion

            if (_teachCenterDal.SavePrepareLessonsDetial(lessonsModel))
                return 0;
            else
                return 2;
        }
        /// <summary>
        /// 从资源取相对应的题目，并根据算法计算
        /// </summary>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        private PrepareLessonsModel GetPrepareLessonFromResource(TeachCenterQueryModel queryModel)
        {
            var resultList = _questionbank.GetSecTestQ("0" + queryModel.SubjectId, queryModel.KnowledageIds.TrimEnd(',').Split(',').Select(m => Convert.ToInt32(m)).ToArray());
            if (resultList == null || resultList.Count == 0)
            {
                return null;
            }
            var modelList = resultList.Select(m => new SecTestQuestion(m)).ToList();
            var lessonModel = GetPrepareLessonFromDb(queryModel);
            return ConvertResourceToLocal(modelList, lessonModel, queryModel);
        }


        /// <summary>
        /// 资源model转为本地model
        /// </summary>
        /// <param name="resourceModel"></param>
        /// <param name="lessonsModel"></param>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        private PrepareLessonsModel ConvertResourceToLocal(List<SecTestQuestion> resourceModel, PrepareLessonsModel lessonsModel, TeachCenterQueryModel queryModel)
        {
            if (resourceModel.Any())
            {

                //算法
                if (queryModel.IsHaveKfSubject)
                {
                    if (resourceModel[0].Tlsit != null && resourceModel[0].Tlsit.Any())
                    {
                        return ConvertResourceToLocalA(resourceModel, lessonsModel, queryModel);
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return ConvertResourceToLocalB(resourceModel, lessonsModel, queryModel);
                }
            }
            return null;
        }


        /// <summary>
        /// no 算法
        /// </summary>
        /// <param name="resourceModel"></param>
        /// <param name="lessonsModel"></param>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        private PrepareLessonsModel ConvertResourceToLocalB(List<SecTestQuestion> resourceModel, PrepareLessonsModel lessonsModel, TeachCenterQueryModel queryModel)
        {
            var targetMark = "";
            var diffMark = "";
            foreach (SecTestQuestion sec in resourceModel)
            {
                var point = lessonsModel.PlanPointsList.FirstOrDefault(
                    m => m.CurrentLever == 2 && m.PointIdInt(lessonsModel.Plan.SubjectID) == sec.f_id);
                if (point != null)
                {

                }
                else
                {
                    Mfg.EI.Common.LogHelperNet.Info("设计教案，知识点读取错误155--ConvertResourceToLocalB", null);
                    continue;
                }
                var workqlist = sec.f_workqlist.Trim(',').Split(',');
                var exampleqlist = sec.f_exampleqlist.Trim(',').Split(',');

                //point.PointID = sec.f_id.ToString();
                point.WorkNumber = workqlist.Length;
                point.EgNumber = exampleqlist.Length;
                point.PointName = sec.f_name;
                //point.PlanIndexID = planIndexId;
                //point.CurrentLever = 2;
                point.TargetMark = sec.f_jiaoyan;


                var planQuestionItemsList = new List<PlanQuestionItemsModel>();
                //练习题列表
                var wlist = workqlist.Where(m => !string.IsNullOrEmpty(m)).ToList().Select(
                    (itemid, index) => new PlanQuestionItemsModel
                   {

                       ItemID = Convert.ToInt32(itemid),
                       CreateTime = DateTime.Now,
                       PlanPointsID = point.PlanPointsID,
                       ItemIndex = index,
                       PointType = 2
                   }).ToList();
                //例题列表
                var plist = exampleqlist.Where(m => !string.IsNullOrEmpty(m)).ToList().Select(
                    (itemid, index) =>


                             new PlanQuestionItemsModel()
                        {
                            ItemID = Convert.ToInt32(itemid),
                            CreateTime = DateTime.Now,
                            PlanPointsID = point.PlanPointsID,
                            ItemIndex = index,
                            PointType = 1
                        }

                    ).ToList();
                planQuestionItemsList.AddRange(wlist);
                planQuestionItemsList.AddRange(plist);
                point.PlanQuestionItemsList = planQuestionItemsList;

                #region 教案
                if (queryModel.IsOverride)
                {
                    targetMark += point.PointName + "：<br/>" + point.TargetMark.Trim() + "<br/>";
                }

                #endregion

            }

            if (queryModel.IsOverride)
            {
                // 教案diffmark
                resourceModel.GroupBy(m => m.f_keyordiff).ToList().ForEach(
                    n =>
                    {
                        if (!string.IsNullOrEmpty(n.Key))
                        {
                            string[] knowledges = resourceModel.Where(f => f.f_keyordiff == n.Key)
                                .Select(j => j.f_name).ToArray();
                            diffMark +=  n.Key  + "：" + string.Join(",", knowledges);
                            diffMark += "<br/>";
                        }

                    });

                lessonsModel.FirstMark = FirstMark;
                lessonsModel.SummaryMark = SummaryMark;
                //var stuName=lessonsModel.Plan.
                lessonsModel.TitleName = string.Format(TitleName, lessonsModel.INumber);
                //教学目标
                lessonsModel.TargetMark = targetMark;
                lessonsModel.DiffMark = diffMark;
            }
            return lessonsModel;
        }

        /// <summary>
        /// 算法
        /// </summary>
        /// <param name="resourceModel"></param>
        /// <param name="lessonsModel"></param>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        private PrepareLessonsModel ConvertResourceToLocalA(List<SecTestQuestion> resourceModel, PrepareLessonsModel lessonsModel, TeachCenterQueryModel queryModel)
        {
            //考法列表
            var kfList = new List<TestInfoQuestion>();

            resourceModel.Select(m => new { m.Tlsit, m.f_id, m.f_name }).ToList()
                .ForEach(n =>
                {
                    n.Tlsit.ForEach(k =>
                    {
                        k.ParentPointId = n.f_id;
                        k.ParentPointName = n.f_name;

                        //k.SubjectId = queryModel.SubjectId;
                        //k.SubjectId=resourceModel[0].
                    });
                    kfList.AddRange(n.Tlsit);
                });
            var index = 0;
            var pointList = lessonsModel.PlanPointsList.Where(m => m.CurrentLever == 2).ToList();
            kfList.ForEach(m =>
             {

                 pointList.Add(new PlanPointModel
                 {

                     KeyLevel = m.f_keylevel,
                     ParentPointId = m.ParentPointId,
                     ParentID = lessonsModel.PlanPointsList.FirstOrDefault(k => k.PointIdInt(Convert.ToInt32(queryModel.SubjectId)) == m.ParentPointId).PlanPointsID,
                     //PlanPointsID
                     PlanID = lessonsModel.PlanID,
                     PlanIndexID = lessonsModel.PlanIndexID,
                     IsShow = false,
                     IsEffect = true,
                     IsRoot = false,
                     IsLeaf = true,
                     CurrentLever = 3,
                     IsHas = false,
                     EgNumber = 0,
                     WorkNumber = 0,
                     //kfID 
                     PointID = m.f_id.ToString(),
                     PointName = m.f_name,
                     PointIndex = ++index,
                     CreateTime = DateTime.Now

                 });
             });


            #region 第一步 确定考点题数
            pointList = StepFirst(kfList, pointList, queryModel);
            #endregion

            #region 第二步：确定试题难度
            //TODO 确定试题难度
            pointList = StepSecond(kfList, pointList, queryModel);
            #endregion

            #region 第三步：确定讲练数量
            //TODO 确定讲练数量
            pointList = StepThird(pointList, queryModel);
            #endregion


            pointList.ForEach(m =>
            {
                //m.IsEffect = m.QuestionNumber > 0;
                m.IsShow = m.QuestionCount > 0;
            });
            lessonsModel.PlanPointsList = pointList;
            var targetMark = "";
            var diffMark = "";
            if (queryModel.IsOverride)
            {
                resourceModel.ForEach(n =>
                {
                    if (!string.IsNullOrEmpty(n.f_jiaoyan))
                    {
                        //教学目标
                        targetMark += n.f_name + "：<br/>" + n.f_jiaoyan.Trim() + "<br/>";
                    }
                });

                lessonsModel.TargetMark = targetMark;
            }
            if (queryModel.IsOverride)
            {
                // 教案diffmark
                resourceModel.GroupBy(m => m.f_keyordiff).ToList().ForEach(
                    n =>
                    {
                        if (!string.IsNullOrEmpty(n.Key))
                        {
                            string[] knowledges = resourceModel.Where(f => f.f_keyordiff == n.Key)
          .Select(j => j.f_name).ToArray();
                            diffMark += n.Key+ "：" + string.Join(",", knowledges);
                            diffMark += "<br/>";
                        }

                    });
                lessonsModel.DiffMark = diffMark;
                lessonsModel.FirstMark = FirstMark;
                lessonsModel.SummaryMark = SummaryMark;
                lessonsModel.TitleName = string.Format(TitleName, lessonsModel.INumber);
            }
            return lessonsModel;
        }

        #region stepFirst 第一步 确定考点题数
        /// <summary>
        /// 第一步 突出重点
        /// </summary>
        /// <returns></returns>
        private List<PlanPointModel> StepFirst(List<TestInfoQuestion> kfList, List<PlanPointModel> pointList, TeachCenterQueryModel queryModel)
        {
            #region backup
            ////一级考法 非常重要
            //List<TestInfoQuestion> firstKfList = new List<TestInfoQuestion>();
            ////二级考法 重要
            //List<TestInfoQuestion> secondKfList = new List<TestInfoQuestion>();
            ////三级考法 一般
            //List<TestInfoQuestion> thirKfList = new List<TestInfoQuestion>();
            ////四级考法 不重要
            //List<TestInfoQuestion> fourthKfList = new List<TestInfoQuestion>();

            //foreach (TestInfoQuestion kf in kfList)
            //{
            //    switch (kf.f_keylevel)
            //    {
            //        case "非常重要":
            //            firstKfList.Add(kf);
            //            break;
            //        case "重要":
            //            secondKfList.Add(kf);
            //            break;
            //        case "一般":
            //            thirKfList.Add(kf);
            //            break;
            //        case "不重要":
            //            fourthKfList.Add(kf);
            //            break;
            //        default:
            //            break;
            //    }
            //}
            #endregion

            #region 初始化参数

            //一级考法 非常重要
            List<PlanPointModel> firstKfList = new List<PlanPointModel>();
            //二级考法 重要
            List<PlanPointModel> secondKfList = new List<PlanPointModel>();
            //三级考法 一般
            List<PlanPointModel> thirKfList = new List<PlanPointModel>();
            //四级考法 不重要
            List<PlanPointModel> fourthKfList = new List<PlanPointModel>();

            foreach (PlanPointModel kf in pointList)
            {
                switch (kf.KeyLevel)
                {
                    case "非常重要":
                        firstKfList.Add(kf);
                        break;
                    case "重要":
                        secondKfList.Add(kf);
                        break;
                    case "一般":
                        thirKfList.Add(kf);
                        break;
                    case "不重要":
                        fourthKfList.Add(kf);
                        break;
                    default:
                        break;
                }
            }


            #endregion
            // 1 突出重点，2 全面周到，3 二者兼顾
            var questionCount = queryModel.QuestionCount;
            switch (queryModel.CoursesFocus)
            {
                case 1:
                    {
                        while (questionCount > 0)
                        {
                            stepFirst_1(ref firstKfList, ref questionCount);
                            stepFirst_2(ref firstKfList, ref secondKfList, ref questionCount);
                            stepFirst_3(ref firstKfList, ref secondKfList, ref thirKfList, ref questionCount);
                            stepFirst_4(ref firstKfList, ref secondKfList, ref thirKfList, ref fourthKfList, ref questionCount);
                        }
                    }
                    break;
                case 2:
                    {
                        while (questionCount > 0)
                        {
                            stepFirst_4(ref firstKfList, ref secondKfList, ref thirKfList, ref fourthKfList, ref questionCount);
                            stepFirst_3(ref firstKfList, ref secondKfList, ref thirKfList, ref questionCount);
                            stepFirst_2(ref firstKfList, ref secondKfList, ref questionCount);
                            stepFirst_1(ref firstKfList, ref questionCount);
                        }



                    }
                    break;
                case 3:
                    {
                        while (questionCount > 0)
                        {
                            if (questionCount < kfList.Count)
                            {
                                stepFirst_3(ref firstKfList, ref secondKfList, ref thirKfList, ref questionCount);
                                stepFirst_2(ref firstKfList, ref secondKfList, ref questionCount);
                                stepFirst_1(ref firstKfList, ref questionCount);
                                stepFirst_4(ref firstKfList, ref secondKfList, ref thirKfList, ref fourthKfList, ref questionCount);
                            }
                            else
                            {
                                stepFirst_2(ref firstKfList, ref secondKfList, ref questionCount);
                                stepFirst_3(ref firstKfList, ref secondKfList, ref thirKfList, ref questionCount);
                                stepFirst_1(ref firstKfList, ref questionCount);
                                stepFirst_4(ref firstKfList, ref secondKfList, ref thirKfList, ref fourthKfList, ref questionCount);
                            }
                        }
                    }
                    break;
            }

            return pointList;
        }

        private int GetMax(params int[] list)
        {
            return list.Max();
        }

        #region 一级考点各选一题
        private void stepFirst_1(ref List<PlanPointModel> firstKfList, ref int questionCount)
        {

            if (questionCount > 0)
            {
                var index = 0;
                do
                {
                    if (questionCount > 0 && index < firstKfList.Count)
                    {
                        firstKfList[index].QuestionNumber++;
                        firstKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    index++;
                } while (questionCount > 0 && index <= GetMax(firstKfList.Count));
            }

        }
        #endregion

        #region 一二级考点各选一题
        private void stepFirst_2(ref List<PlanPointModel> firstKfList, ref List<PlanPointModel> secondKfList, ref int questionCount)
        {

            if (questionCount > 0)
            {
                var index = 0;
                do
                {
                    if (questionCount > 0 && index < firstKfList.Count)
                    {
                        firstKfList[index].QuestionNumber++;
                        firstKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    if (questionCount > 0 && index < secondKfList.Count)
                    {
                        secondKfList[index].QuestionNumber++;
                        secondKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    index++;
                } while (questionCount > 0 && index <= GetMax(firstKfList.Count, secondKfList.Count));
            }


        }

        #endregion

        #region 一二三级考点各选一题
        private void stepFirst_3(ref List<PlanPointModel> firstKfList, ref List<PlanPointModel> secondKfList, ref List<PlanPointModel> thirKfList, ref int questionCount)
        {

            if (questionCount > 0)
            {
                var index = 0;
                do
                {
                    if (questionCount > 0 && index < firstKfList.Count)
                    {
                        firstKfList[index].QuestionNumber++;
                        firstKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    if (questionCount > 0 && index < secondKfList.Count)
                    {
                        secondKfList[index].QuestionNumber++;
                        secondKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    if (questionCount > 0 && index < thirKfList.Count)
                    {
                        thirKfList[index].QuestionNumber++;
                        thirKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    index++;
                } while (questionCount > 0 && index <= GetMax(firstKfList.Count, secondKfList.Count, thirKfList.Count));
            }


        }

        #endregion

        #region 一二三四级考点各选一题
        private void stepFirst_4(ref List<PlanPointModel> firstKfList, ref List<PlanPointModel> secondKfList, ref List<PlanPointModel> thirKfList, ref List<PlanPointModel> fourthKfList, ref int questionCount)
        {
            if (questionCount > 0)
            {
                var index = 0;
                do
                {
                    if (questionCount > 0 && index < firstKfList.Count)
                    {
                        firstKfList[index].QuestionNumber++;
                        firstKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    if (questionCount > 0 && index < secondKfList.Count)
                    {
                        secondKfList[index].QuestionNumber++;
                        secondKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    if (questionCount > 0 && index < thirKfList.Count)
                    {
                        thirKfList[index].QuestionNumber++;
                        thirKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    if (questionCount > 0 && index < fourthKfList.Count)
                    {
                        fourthKfList[index].QuestionNumber++;
                        fourthKfList[index].QuestionCount++;
                        questionCount--;
                    }
                    index++;
                } while (questionCount > 0 && index <= GetMax(firstKfList.Count, secondKfList.Count, thirKfList.Count, fourthKfList.Count));
            }


        }

        #endregion
        #endregion

        #region stepSecond 第二步 确定试题难度
        private List<PlanPointModel> StepSecond(List<TestInfoQuestion> kfList, List<PlanPointModel> pointList, TeachCenterQueryModel queryModel)
        {
            var diff = queryModel.Difficulty;
            foreach (var point in pointList)
            {
                var kf =
                    kfList.FirstOrDefault(
                        m => m.ParentPointId == point.ParentPointId && m.f_id.ToString().Equals(point.PointID));
                List<TestQuestion> qlist = new List<TestQuestion>();
                if (kf != null)
                {
                    qlist = kf.Qlsit;
                }

                var p = point;
                stepSecond_2(qlist, diff, ref p);
                //pointList.Add(point);
            }
            return pointList;
        }

        private void stepSecond_2(List<TestQuestion> qlist, int diff, ref PlanPointModel point)
        {

            if (qlist.Count > 0 && point.QuestionNumber > 0)
            {
                var diffdesc = ConvertDiff(diff);
                //var cList = qlist.Where(m => m.f_testdiff.Equals(diffdesc)).ToList();
                var cList = qlist.Where(m => m.f_testdiffInt == diff).ToList();
                var count = point.PlanQuestionItemsList.Count;
                var tempPoint = point;
                if (cList.Count() >= point.QuestionCount)
                {
                    point.PlanQuestionItemsList.AddRange(
                        cList.Take(point.QuestionNumber).ToList()
                        .Select((m, t) => new PlanQuestionItemsModel
                        {
                            ItemID = m.f_id,
                            ItemIndex = count + t,
                            CreateTime = DateTime.Now,
                            PlanID = tempPoint.PlanID,
                            PlanPointsID = tempPoint.PlanPointsID,
                            IsEffect = true
                        }).ToList());
                    point.QuestionNumber -= cList.Count;
                }
                else
                {

                    point.PlanQuestionItemsList.AddRange(
                        cList.Select((m, t) => new PlanQuestionItemsModel
                        {
                            ItemID = m.f_id,
                            ItemIndex = count + t,
                            CreateTime = DateTime.Now,
                            PlanID = tempPoint.PlanID,
                            PlanPointsID = tempPoint.PlanPointsID,
                            IsEffect = true
                        }).ToList());
                    point.QuestionNumber -= cList.Count;
                    for (int m = 0; m < cList.Count(); m++)
                    {
                        qlist.Remove(cList[m]);
                    }

                    var dlist = new List<TestQuestion>();
                    var xlist = new List<TestQuestion>();
                    if (diff + 1 <= 5)
                    {
                        //dlist = qlist.Where(m => m.f_testdiff.Equals(ConvertDiff(diff + 1))).ToList();
                        dlist = qlist.Where(m => m.f_testdiffInt > diff).ToList();
                    }
                    if (diff - 1 > 0)
                    {
                        //xlist = qlist.Where(m => m.f_testdiff.Equals(ConvertDiff(diff - 1))).ToList();
                        xlist = qlist.Where(m => m.f_testdiffInt < diff).ToList();
                    }
                    //只有大于设定难度题
                    if (dlist.Count > 0 && xlist.Count == 0)
                    {
                        stepSecond_2(qlist, diff + 1, ref point);
                    }
                    //只有小于设定难度题
                    if (dlist.Count == 0 && xlist.Count > 0)
                    {
                        stepSecond_2(qlist, diff - 1, ref point);
                    }
                    if (dlist.Count > 0 && xlist.Count > 0)
                    {
                        stepSecond_2(qlist, diff + 1, ref point);
                        stepSecond_2(qlist, diff - 1, ref point);
                    }
                    //if (dlist.Count == 0 && xlist.Count == 0)
                    //{
                    //}


                }


            }



        }

        /// <summary>
        /// 转换题目难度
        /// </summary>
        /// <param name="diff"></param>
        /// <returns></returns>
        private int ConvertDiff1(int diff)
        {
            var diffLevel = 1;
            if (diff <= 20)
                diffLevel = 1;
            else if (diff <= 40)
                diffLevel = 2;
            else if (diff <= 60)
                diffLevel = 3;
            else if (diff <= 80)
                diffLevel = 4;
            else if (diff <= 100)
                diffLevel = 5;
            return diffLevel;

        }
        private Tuple<int, int> GetDiffRange(int diff)
        {
            Tuple<int, int> result = new Tuple<int, int>(0, 20);

            switch (diff)
            {
                case 1:

                    result = new Tuple<int, int>(0, 20);
                    break;
                case 2:
                    result = new Tuple<int, int>(20, 40);
                    break;
                case 3:
                    result = new Tuple<int, int>(40, 60);
                    break;
                case 4:
                    result = new Tuple<int, int>(60, 80);
                    break;
                case 5:
                    result = new Tuple<int, int>(80, 100);
                    break;
            }
            return result;
        }
        private string ConvertDiff(int diff)
        {
            var diffdesc = string.Empty;
            switch (diff)
            {
                case 1:
                    diffdesc = "容易";
                    break;
                case 2:
                    diffdesc = "较易";
                    break;
                case 3:
                    diffdesc = "中等";
                    break;
                case 4:
                    diffdesc = "较难";
                    break;
                case 5:
                    diffdesc = "困难";
                    break;
            }
            return diffdesc;
        }

        #endregion

        #region stepThird 第三步：确定讲练数量
        private List<PlanPointModel> StepThird(List<PlanPointModel> pointList, TeachCenterQueryModel queryModel)
        {

            var epPercent = queryModel.ExamplePracticePercent;
            foreach (var point in pointList)
            {
                var egNumber = 0;
                var workNumber = 0;
                egNumber = (int)Math.Ceiling(point.QuestionCount * epPercent);
                workNumber = point.QuestionCount - egNumber;
                point.EgNumber = egNumber;
                point.WorkNumber = workNumber;
                var index = 0;
                var indexWork = 0;
                var indexEg = 0;
                var eop = 0;
                if (egNumber > workNumber)
                {
                    eop = 0;
                }
                else
                {
                    eop = 1;
                }
                point.PlanQuestionItemsList.ForEach(
                    m =>
                    {

                        if (eop == 0)
                        {
                            if (indexEg < egNumber && eop == 0)
                            {
                                m.PointType = 1;
                                if (indexWork == workNumber)
                                {
                                    eop = 0;
                                }
                                else
                                {
                                    eop = 1;
                                }
                                indexEg++;
                            }
                        }
                        else
                        {
                            if (indexWork < workNumber && eop == 1)
                            {
                                m.PointType = 2;
                                if (indexEg == egNumber)
                                {
                                    eop = 1;
                                }
                                else
                                {
                                    eop = 0;
                                }
                                indexWork++;
                            }
                        }

                        index++;
                    });
            }
            return pointList;

        }
        #endregion
        #endregion

        #region 更新数据
        public bool UpdateLessonData(PrepareLessonsModel lessonModel, params int[] cloumns)
        {
            return _teachCenterDal.UpdateLessonData(lessonModel, cloumns);

        }

        /// <summary>
        /// 更新知识点
        /// </summary>
        /// <param name="pointModel"></param>
        /// <returns></returns>
        public bool UpdateLessonPoint(PlanPointModel pointModel, params int[] cloumns)
        {
            return _teachCenterDal.UpdateLessonPoint(pointModel, cloumns);
        }
        public bool UpdateLessonPoint(List<PlanPointModel> pointModels, params int[] cloumns)
        {
            return _teachCenterDal.UpdateLessonPoint(pointModels, cloumns);
        }

        /// <summary>
        /// 更新 指定字段 试题表
        /// </summary>
        /// <param name="itemModel"></param>
        /// <param name="cloumns">
        /// 1 ItemIndex
        /// </param>
        /// <returns></returns>
        public bool UpdateLessonPointQuestion(PlanQuestionItemsModel itemModel, params int[] cloumns)
        {
            return _teachCenterDal.UpdateLessonPointQuestion(itemModel, cloumns);
        }
        /// <summary>
        /// 更新 指定字段 试题表集合
        /// </summary>
        /// <param name="itemsModel"></param>
        /// <param name="cloumns">
        /// 1 ItemIndex
        /// </param>
        /// <returns></returns> 
        public bool UpdateLessonPointQuestion(List<PlanQuestionItemsModel> itemsModel, params int[] cloumns)
        {
            return _teachCenterDal.UpdateLessonPointQuestion(itemsModel, cloumns);
        }

        public Tuple<int, PlanQuestionItemsModel> ChangeItem(TeachCenterQuestionRandModel questionrandModel)
        {
            var result = 2;
            PlanQuestionItemsModel model = new PlanQuestionItemsModel();
            var subject = Convert.ToInt32(questionrandModel.SubjectID);
            //var stage = questionrandModel.grade;
            var stage = questionrandModel.stage;
            var iskf = _teachCenterDal.IsHaveKfSubject(subject, stage);
            var itemId = 0;
            var noIdList = questionrandModel.noidlist.Trim(',').Split(',').Select(m => Convert.ToInt32(m)).ToArray();
            Resouce.Models.Question questionentity;
            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, subject);
            if (iskf)
            {
                var resultModel = _questionbank.GetSecTestQ("0" + questionrandModel.SubjectID, new int[] { questionrandModel.mainsecid }).FirstOrDefault();

                if (resultModel != null)
                {
                    var modelLocal = new SecTestQuestion(resultModel);
                    var diff = ConvertDiff1(questionrandModel.diff);
                    itemId = ChangeItemDiff(modelLocal, diff + 1, noIdList, questionrandModel.kfId);
                    //if (modelLocal != null && modelLocal.Tlsit.Any())
                    //{
                    //    var kf = modelLocal.Tlsit.FirstOrDefault(m => m.f_id == questionrandModel.kfId);
                    //    if (kf != null && kf.Qlsit.Any())
                    //    {
                    //        var qList = kf.Qlsit;
                    //        var diffList = qList.Where(m => m.f_difficulty > questionrandModel.diff && !noIdList.Contains(m.f_id));
                    //        if (diffList.Any())
                    //        {
                    //            Random r = new Random();
                    //            var itemIndex = r.Next(0, diffList.Count());
                    //            itemId = diffList.ToList()[itemIndex].f_id;
                    //        }
                    //        else
                    //        {
                    //            diffList = qList.Where(m => !noIdList.Contains(m.f_id));
                    //            if (diffList.Any())
                    //            {
                    //                Random r = new Random();
                    //                var itemIndex = r.Next(0, diffList.Count());
                    //                itemId = diffList.ToList()[itemIndex].f_id;
                    //            }
                    //        }
                    //    }
                    //}
                }

                questionentity = _questionbank.FindByIdlist("0" + questionrandModel.SubjectID, new int[] { itemId }).FirstOrDefault();

            }
            else
            {
                if (!(new int[] { 1, 3 }).Contains(Convert.ToInt32(questionrandModel.SubjectID)))//语文、英文为小年级、其它为大年级
                {
                    questionrandModel.grade = questionrandModel.grade.ToList().First().ToString();
                }
                questionrandModel.noidlist = questionrandModel.noidlist.Trim(',');
                questionrandModel.SubjectID = "0" + questionrandModel.SubjectID;
                questionentity = _questionbank.RandQuestion(questionrandModel);


            }
            if (questionentity != null)
            {
                var qViewModel = new QuestionItemViewModel(questionentity, subject);
                model.ItemName = qViewModel.GetItemBodyHtml();
                model.ItemAnaly = qViewModel.f_ways;
                model.ItemTypeName = qViewModel.f_styleName;
                model.ItemType = _r(qViewModel.f_style);
                model.ItemStyle = qViewModel.f_style;
                model.RightAnswer = qViewModel.f_answer;
                model.Difficulty = qViewModel.f_difficulty;
                model.DetailID = questionrandModel.DetailID;
                model.ItemID = qViewModel.f_id;
                model.PointType = questionrandModel.PointType;

                var r = _teachCenterDal.UpdateLessonPointQuestion(model, 2);
                if (r)
                    result = 0;
                else
                    result = 2;

            }
            else
            {
                result = 1;
            }
            return new Tuple<int, PlanQuestionItemsModel>(result, model);


        }



        private int ChangeItemDiff(SecTestQuestion modelLocal, int diff, int[] noIdList, int kfId)
        {
            var itemId = 0;
            if (modelLocal != null && modelLocal.Tlsit.Any())
            {
                var kf = modelLocal.Tlsit.FirstOrDefault(m => m.f_id == kfId);
                if (kf != null && kf.Qlsit.Any())
                {
                    var qList = kf.Qlsit;
                    //20 40 60 80
                    var diffRange = GetDiffRange(diff);
                    var hlist = qList.Where(m => !noIdList.Contains(m.f_id));
                    if (hlist.Any())
                    {
                        var diffList = qList.Where(m => m.f_difficulty > diffRange.Item1 && m.f_difficulty <= diffRange.Item2 && !noIdList.Contains(m.f_id));
                        if (diffList.Any())
                        {
                            Random r = new Random();
                            var itemIndex = r.Next(0, diffList.Count());
                            itemId = diffList.ToList()[itemIndex].f_id;
                            return itemId;
                        }
                        else
                        {
                            if (diff < 5)
                            {
                                return ChangeItemDiff(modelLocal, diff + 1, noIdList, kfId);
                            }
                            else
                            {
                                return ChangeItemDiff(modelLocal, 1, noIdList, kfId);
                            }
                        }
                    }
                }
            }
            return itemId;
        }
        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="detialId"></param>
        /// <returns></returns>
        public bool DeleteQuestionItem(params string[] detialId)
        {
            return _teachCenterDal.DeleteQuestionItem(detialId.ToList());
        }

        #endregion






    }


}
