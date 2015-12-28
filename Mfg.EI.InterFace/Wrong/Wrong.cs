using System.Data;
using Mfg.EI.Common;
using Mfg.EI.DAL;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace Mfg.EI.InterFace
{
    public class Wrong : IWrong
    {
        private WrongDal _wrongDal = new WrongDal();
        private IQuestion _questionbank;
        public Wrong(IQuestion question)
        {
            _questionbank = question;
        }
        public List<WrongTagModel> GetTagList(string sid, string subjectId, string stageId)
        {
            var ds = _wrongDal.GetTagList(sid, subjectId, stageId);
            var modelListTag = ModelConvertHelper<WrongTagModel>.ConvertToModelList(ds.Tables[0]);
            var modelListSource = ModelConvertHelper<WrongTagModel>.ConvertToModelList(ds.Tables[1]);
            var modelListknowledge = ModelConvertHelper<WrongTagModel>.ConvertToModelList(ds.Tables[2]);
            modelListTag.AddRange(modelListSource);
            modelListTag.AddRange(modelListknowledge);
            return modelListTag;
        }
        public List<WrongTagModel> GetTagList(string sid)
        {
            var ds = _wrongDal.GetTagList(sid);
            var modelListTag = ModelConvertHelper<WrongTagModel>.ConvertToModelList(ds.Tables[0]);
            var modelListSource = ModelConvertHelper<WrongTagModel>.ConvertToModelList(ds.Tables[1]);
            var modelListknowledge = ModelConvertHelper<WrongTagModel>.ConvertToModelList(ds.Tables[2]);
            modelListTag.AddRange(modelListSource);
            modelListTag.AddRange(modelListknowledge);
            return modelListTag;
        }
        #region 获取错题详情

        /// <summary>
        /// 获取错题详情
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="subjectId"></param>
        /// <param name="type"></param>
        /// <param name="tagValue"></param>
        /// <param name="stageId"></param>
        /// <returns></returns>
        public List<StudentWrongItemModel> GetWrongItems(string sid, string subjectId, string type, string tagValue, string stageId)
        {
            List<StudentWrongItemModel> modelList = new List<StudentWrongItemModel>() { };
            DataSet ds = new DataSet();

            //默认显示全部错题
            if (string.IsNullOrEmpty(type) || tagValue.Equals("-1"))
            {
                ds = _wrongDal.GetSourceWrongList(sid, subjectId, stageId: stageId);

                modelList = ModelConvertHelper<StudentWrongItemModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                switch (type)
                {
                    case "-1":
                        {
                            ds = _wrongDal.GetSourceWrongList(sid, subjectId, stageId: stageId);
                            modelList = ModelConvertHelper<StudentWrongItemModel>.ConvertToModelList(ds.Tables[0]);

                        }
                        break;
                    case "0":
                        {
                            ds = _wrongDal.GetSourceWrongList(sid, subjectId, sourceValue: tagValue, stageId: stageId);
                            modelList = ModelConvertHelper<StudentWrongItemModel>.ConvertToModelList(ds.Tables[0]);
                        } break;
                    case "1":
                        {
                            ds = _wrongDal.GetSourceWrongList(sid, subjectId, knowleadgeID: tagValue, stageId: stageId);
                            modelList = ModelConvertHelper<StudentWrongItemModel>.ConvertToModelList(ds.Tables[0]);
                        } break;
                    case "2":
                        {
                            ds = _wrongDal.GetSourceWrongList(sid, subjectId, tagValue: tagValue, stageId: stageId);
                            modelList = ModelConvertHelper<StudentWrongItemModel>.ConvertToModelList(ds.Tables[0]);
                        } break;

                }
            }


            if (modelList.Count == 0)
            {
                return modelList;
            }
            subjectId = "0" + subjectId;

            var itemlist = new StringBuilder();
            modelList.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            itemlist.ToString().TrimEnd(',');

            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectId, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, Convert.ToInt32(subjectId));
            var items = modelList;
            foreach (var item in items)
            {
                var question = questionList.FirstOrDefault(m => m.f_id == item.ItemID);
                item.ItemType = _r(question.f_style);
                item.QuestionItem = new QuestionItemViewModel(question, Convert.ToInt32(subjectId));
                //答题历史
                var rows = ds.Tables[1].Select("ItemID='" + item.ItemID + "'");
                item.AHistory = rows.Length > 0 ? rows[0]["AHistory"].ToString() : item.Answer;
                item.ACount = rows.Length > 0 ? rows[0]["ACount"].ToString() : "1";

            }


            return modelList;

        }

        /// <summary>
        /// 获取错题详情
        /// </summary>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentWrongItemModel> GetWrongItems(string sid, string subjectId)
        {
            return GetWrongItems(sid, subjectId, "", "", "");
        }
        #endregion
        #region 学生添加笔记
        /// <summary>
        /// 修改学生笔记
        /// </summary>
        /// <param name="eaid">答题表ID</param>
        /// <param name="comment">笔记内容</param>
        /// <returns></returns>
        public bool AddItemNote(string eaid, string noteContent)
        {

            return _wrongDal.UpdateNote(eaid, noteContent);

        }
        #endregion
        /// <summary>
        /// 修改答案
        /// </summary>
        /// <param name="eaid"></param>
        /// <param name="noteContent"></param>
        /// <returns></returns>
        public bool UpdateAnswer(string sid, string eaid, string itemid, string subjectid, string answer, ref bool IsRight)
        {
            var resultList = _questionbank.IsQuesCorrect("0" + subjectid, itemid, new List<string> { answer });
            if (resultList != null || resultList.Count > 0)
            {
                IsRight = resultList[itemid];
                return _wrongDal.UpdateAnswer(sid, itemid, answer, subjectid, IsRight);
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 修改学生掌握情况
        /// </summary>
        /// <param name="eaid"></param>
        /// <param name="tag"></param>
        /// <returns></returns>
        public bool UpdateTag(string eaid, bool tag)
        {

            return _wrongDal.UpdateTag(eaid, tag);
        }
        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool Delete(string id)
        {
            return _wrongDal.Delete(id);
        }



    }
}
