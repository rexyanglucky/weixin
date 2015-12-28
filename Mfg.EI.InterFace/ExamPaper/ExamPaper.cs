using System.Data;
using Climb.Core;
using Mfg.EI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL.Teacher;
using Mfg.EI.DAL.ExamPaper;
using Mfg.Resouce.Models;
using Newtonsoft.Json;

namespace Mfg.EI.InterFace
{
    public class ExamPaper : IExamPaper
    {
        private EI_UploadExamDal eI_UploadExamDal = new EI_UploadExamDal();
        private EI_FavoriteDal eI_FavoriteDal = new EI_FavoriteDal();

        public bool Add(EI_UploadExam eI_UploadExam, int orgId, int userId)
        {
            eI_UploadExam.OrgID = orgId;
            eI_UploadExam.CreateTime = DateTime.Now;
            eI_UploadExam.CreateBy = userId.ToString();
            return eI_UploadExamDal.Add(eI_UploadExam);
        }

        public List<EI_UploadExam> ExamShare()
        {
            List<EI_UploadExam> list = eI_UploadExamDal.ExamShare();
            return list;
        }


        /// <summary>
        /// 查询出我的上传
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        public List<EI_UploadExam> MyUpExamPaper(int orgId)
        {
            List<EI_UploadExam> list = eI_UploadExamDal.MyUpExamPaper(orgId);
            return list;
        }

        /// <summary>
        /// 查看我的收藏
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        public List<EI_UploadExam> MyCollect(int orgId)
        {

            List<EI_UploadExam> list = eI_UploadExamDal.MyCollect(orgId);
            return list;
        }


        /// <summary>
        /// 获取所有数据
        /// </summary>
        /// <returns></returns>
        public List<EI_UploadExam> GetAllData()
        {
            return eI_UploadExamDal.GetAllData();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="examType"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetExamType(int examType)
        {
            return eI_UploadExamDal.GetExamType(examType.ToString());
        }

        public List<EI_UploadExam> GetExamVersion(int version)
        {
            return eI_UploadExamDal.GetExamVersion(version);
        }

        public List<EI_UploadExam> GetGrade(int grade)
        {
            return eI_UploadExamDal.GetGrade(grade);
        }

        public List<EI_UploadExam> GetName(int name)
        {
            return eI_UploadExamDal.GetName(name);
        }

        public List<EI_UploadExam> GetOrderBy(string orderBy)
        {
            string orderByResult = string.Empty;
            if (orderBy == "up")
            {
                orderByResult = " asc ";
            }
            else
            {
                orderByResult = " desc ";
            }
            return eI_UploadExamDal.GetOrderBy(orderByResult);
        }

        public List<EI_UploadExam> GetPreviewCount(int count)
        {
            return eI_UploadExamDal.GetPreviewCount(count);
        }

        /// <summary>
        /// 根据where条件查询数据
        /// </summary>
        /// <param name="grade"></param>
        /// <param name="examType"></param>
        /// <param name="examVersion"></param>
        /// <param name="name"></param>
        /// <param name="menuType"></param>
        /// <param name="subjectId"></param>
        /// <param name="createBy"></param>
        /// <param name="orderByName"></param>
        /// <param name="orderByType"></param>
        /// <param name="orgId"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetWhere(string grade, string examType, string examVersion, string name,
            string menuType, string subjectId, string createBy, string orderByName, string orderByType, string orgId = "")
        {

            return eI_UploadExamDal.GetWhere(grade, examType, examVersion, name, menuType, subjectId, createBy,
                orderByName, orderByType, orgid: orgId);
        }

        /// <summary>
        /// 获取收藏字符串
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public string GetFav(string tid, string subjectID)
        {
            StringBuilder favStr = new StringBuilder("");
            var ds = eI_UploadExamDal.MyCollect(tid, subjectID);
            var da = ds.Tables[0];
            for (int k = 0; k < da.Rows.Count; k++)
            {
                var dr = da.Rows[k];
                favStr.Append(dr["ItemID"].ToString());
                favStr.Append(",");
            }
            return favStr.ToString();
        }



        public bool Add(EI_Favorite eI_Favorite)
        {
            return eI_FavoriteDal.Add(eI_Favorite);
        }

        /// <summary>
        /// 添加点击次数
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public EI_UploadExam AddClickCount(string id)
        {
            return eI_UploadExamDal.AddClickCount(id);
        }


        public bool DeleteFav(EI_Favorite eIFavorite)
        {
            return eI_FavoriteDal.DeleteFav(eIFavorite);
        }


        public bool DeletePaper(string id)
        {
            return eI_UploadExamDal.DeletePaper(id);
        }


        #region  题库 试卷

        /// <summary>
        /// 添加收藏
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="org">机构ID</param>
        /// <param name="userid">用户ID</param>
        /// <param name="paper">试卷ID</param>
        /// <returns>成功 or 失败</returns>
        public bool AddQuePaperColl(string subject, int org, int userid, int paper)
        {
            PaperCollect collect = new PaperCollect();
            collect.f_orgid = org; //机构ID
            collect.f_paperid = paper;//试卷ID
            collect.f_time = DateTime.Now; // 收藏时间
            collect.f_typeid = 2; // 机构版收藏
            collect.f_userid = userid;//用户ID
            collect.f_delete = 0; //删除标志位

            OperationResult<int> res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperCollectQuery(subject).Add(collect);
            if (res.ErrorOptionEnum == OperateType.OperateOk)
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// 从收藏中删除
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="userid"></param>
        /// <param name="paper"></param>
        /// <returns></returns>
        public bool RemoveQuePaperColl(string subject, int userid, int paper)
        {

            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperCollectQuery(subject).Delete(paper, userid);
            if (res.ErrorOptionEnum == OperateType.OperateOk)
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// 更具年份获取收藏数据
        /// </summary>
        /// <param name="subject">科目ID</param>
        /// <param name="user">用户ID</param>
        /// <param name="year">年份,0时为2013年以前的数据</param>
        /// <param name="tid">类型ID</param>
        /// <param name="pno">页码</param>
        /// <param name="psize">单页条数</param>
        /// <param name="allconut">所有条数</param>
        /// <returns></returns>
        public List<Paper> GetQuePaperCollByYear(string subject, int user, int year, int tid, int pno, int psize, out int allconut)
        {
            PaperQuery query = new PaperQuery()
            {
                f_userid = user,//用户id
                f_type = tid,//类型
                f_pfromtype = 2,//机构的
                f_year = year,
                f_yearenum = PaperYearEnum.Equal
            };


            if (year == 0) // 年份为0时,取2013年以前的数据
            {
                query.f_year = 2013;
                query.f_yearenum = PaperYearEnum.LessThan;
            }

            if (year == -1)  // -1时查所有的
            {
                query.f_year = DateTime.Now.Year;
                query.f_yearenum = PaperYearEnum.LessThanEqual;
            }

            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperCollectQuery(subject).GetQuestionByPaperid(query, pno, psize, out allconut);



            foreach (var paper in res)
            {
                var rr = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperTypeQuery("CResource").FindOne(paper.f_type);
                paper.f_edition = rr != null ? rr.f_name : "无";
            }

            return res;
        }

        /// <summary>
        /// 试卷ID获取试题
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="id">试卷ID</param>
        /// <returns></returns>
        public List<Resouce.Models.Question> GetOnePaper(string subject, int id)
        {

            //试卷点击量统计
            ResourceQueryClient.ResourceQueryClient.Query.CreatePaperQuery(subject).AddClick(id);

            var res = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subject).FindPaper(id);


            return res;
        }


        /// <summary>
        /// 获取单个试卷
        /// </summary>
        /// <param name="id">试卷ID</param>
        /// <param name="subject">科目</param>
        /// <param name="userid">用户ID</param>
        /// <param name="isColl">是否收藏</param>
        /// <returns></returns>
        public Paper GetOnePaper(int id, string subject, int userid, out int isColl)
        {
            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperQuery(subject).FindOne(id);
            var rr = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperTypeQuery("CResource").FindOne(res.f_type);
            /*if (rr == null)
            {
                res.f_edition = "无";// 重写 为 类型
            }
            else
            {
                res.f_edition = rr.f_name;// 重写 为 类型
            }*/

            //取是否收藏

            // > 0 收藏  = 0 未收藏  -1 有错
            isColl = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperCollectQuery(subject).GetPaperCollets(userid, id);

            return res;


        }

        /// <summary>
        /// 获取试卷标签
        /// </summary>
        /// <param name="stage">阶段 x c g</param>
        /// <returns></returns>
        public List<Papertype> GetTags(string stage)
        {
            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperTypeQuery("CResource").QuePapertypes(stage);

            return res;
        }

        /// <summary>
        /// 获取系统题库和机构题库试卷
        /// </summary>
        /// <param name="tp">机构2  系统 1</param>
        /// <param name="subject">科目</param>
        /// <param name="grade">年级</param>
        /// <param name="edition">版本</param>
        /// <param name="edu">学制</param>
        /// <param name="term">学期</param>
        /// <param name="tag">标签</param>
        /// <param name="wl">文理</param>
        /// <param name="year">年</param>
        /// <param name="area">地区</param>
        /// <param name="uid">用户id</param>
        /// <param name="pno">页码</param>
        /// <param name="count">总条数</param>
        /// <returns>试卷集合</returns>
        public List<Paper> GetQuePapers(
            int tp,
            string subject,
            string grade,
            int edition,
            int edu,
            int term,
            int tag,
            int wl,
            int year,
            string area,
            int uid,
            int pno,
            out int count)
        {
            PaperQuery paperQuery = new PaperQuery();


            paperQuery.f_class = grade; // 年级



            paperQuery.f_year = year; //年份
            paperQuery.f_yearenum = PaperYearEnum.Equal; //比对条件



            //用户id
            paperQuery.f_pfromtype = tp; // 机构2  系统 1
            paperQuery.OrderEnum = PaperOrderEnum.YearDesc; //排序规则



            if (tp == 2)
            {
                paperQuery.f_pfromid = uid;
            }

            if (area == "-1")
            {
                paperQuery.f_areastate = 0; // 
            }
            else
            {
                paperQuery.f_areastate = 1; // 
                paperQuery.f_areaid = area;//地区id
            }

            if (year == 0) // 年份为0时,取2013年以前的数据
            {
                paperQuery.f_year = 2013;
                paperQuery.f_yearenum = PaperYearEnum.LessThan;
            }

            if (year == -1)  // -1时查所有的
            {
                paperQuery.f_year = DateTime.Now.Year;
                paperQuery.f_yearenum = PaperYearEnum.LessThanEqual;
            }


            if (tag != -1)
            {
                paperQuery.f_type = tag; // 类型ID
            }

            const int take = 10;

            count = 0;


            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperQuery(subject).QueryPaerList(paperQuery, pno, take, out  count);

            foreach (var paper in res)
            {
                var rr = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperTypeQuery("CResource").FindOne(paper.f_type);
                if (rr != null)
                {
                    paper.f_edition = rr.f_name;// 重写 为 类型
                }
                else
                {
                    paper.f_edition = "无";
                }

            }

            var json = JsonConvert.SerializeObject(paperQuery);
            return res;


        }


        /// <summary>
        /// 全文检索 试卷
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="key">关键字</param>
        /// <param name="pno">页码</param>
        /// <param name="count">总条数</param>
        /// <param name="time">总时间</param>
        /// <returns></returns>
        public List<Paper> SearchPaper(string subject, string key, int pno, out int count, out double time)
        {
            const int take = 10;

            //int skip = take * pno - take;

            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperQuery(subject)
                .QueryIndexPaper(key, pno, take, out count, out time);


            time = time / 1000;
            if (count > take * 100)
            {
                count = take * 100;
            }

            foreach (var paper in res)
            {
                var rr = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperTypeQuery("CResource").FindOne(paper.f_type);

                if (rr != null)
                {
                    paper.f_edition = rr.f_name;// 重写 为 类型
                }
                else
                {
                    paper.f_edition = "无";
                }

            }
            return res;
        }



        /// <summary>
        /// 搜索试卷,排除指定的ID
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="key"></param>
        /// <param name="noids"></param>
        /// <param name="pno"></param>
        /// <param name="count"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public List<Paper> SearchPaper(string subject, string key, int[] noids, int pno, out int count, out double time)
        {
            const int take = 10;

            //int skip = take * pno - take;

            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperQuery(subject)
                .QueryIndexPaper(key, noids, take, out count, out time);


            time = time / 1000;
            if (count > take * 100)
            {
                count = take * 100;
            }

            foreach (var paper in res)
            {
                var rr = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperTypeQuery("CResource").FindOne(paper.f_type);

                if (rr != null)
                {
                    paper.f_edition = rr.f_name;// 重写 为 类型
                }
                else
                {
                    paper.f_edition = "无";
                }

            }


            return res;
        }


        /// <summary>
        /// 全文检索 试题
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="key">关键字</param>
        /// <param name="pno">页码</param>
        /// <param name="count">数量</param>
        /// <param name="time">用时</param>
        public List<Resouce.Models.Question> SearchQues(string subject, string key, int pno, out int count, out double time)
        {
            const int take = 10;

            var res = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subject)
                .QueryIndexQuestions(key, take, pno, out count, out time);


            time = time / 1000;
            if (count > take * 100)
            {
                count = take * 100;
            }
            return res;
        }


        /// <summary>
        ///  获取前10条
        /// </summary>
        /// <param name="p"></param>
        /// <param name="subject"></param>
        /// <returns></returns>
        public List<Paper> GetSuPaper(Paper p, string subject)
        {
            PaperQuery query = new PaperQuery();

            //query.f_term = p.f_term;

            //query.f_edu = Convert.ToInt32(p.f_edu);

            var edi = 0;
            //if (int.TryParse(p.f_edition, out edi))
            //{
            //    query.f_edition = edi;
            //}
            query.f_type = p.f_type;
            query.OrderEnum = PaperOrderEnum.YearDesc;


            #region 年份过滤
            //1     ：期中     
            //2 	：期末
            //3 	：模拟
            //4 	：同步
            //5 	：专项
            //6 	：月考
            //7 	：中考
            //8 	：竞赛
            //9 	：高考
            //10	：小考
            //11	：会考
            //12	：开学考试
            //13	：联考
            //14	：假期作业
            //15	：调考
            //16	：会考模拟
            //17	：奥数
            //18	：测试 
            int[] examIDs = new[] { 7, 9, 10 };
            if (examIDs.Contains(p.f_type))
            {
                //query.f_year = p.f_year - 3;
                query.f_year = DateTime.Now.AddYears(-5).Year;
            }
            else
            {
                //query.f_year = p.f_year - 5;
                query.f_year = DateTime.Now.AddYears(-3).Year;

            }
            query.f_yearenum = PaperYearEnum.MoreThan;

            if (!examIDs.Contains(p.f_type))
            {
                query.f_class = p.f_class;
            }

            #endregion

            if (p.f_areaid.ToString().Length == 6)
            {
                query.f_areaid = p.f_areaid.ToString();


                //判断县
                if (Convert.ToInt32(query.f_areaid.Substring(4, 2)) != 0)
                {
                    query.f_areastate = 3;

                }
                else if (Convert.ToInt32(query.f_areaid.Substring(2, 2)) != 0)
                {
                    query.f_areastate = 2;
                }
                else
                {
                    query.f_areastate = 1;
                }

                //// 定位省市县级别
                //if (Convert.ToInt32(query.f_areaid.Substring(4, 2)) == 0)
                //{
                //    query.f_areastate = 3;
                //}

                //query.f_areastate = Convert.ToInt32(query.f_areaid.Substring(2, 2)) == 0 ? 2 : 1;
            }


            if (string.IsNullOrEmpty(query.f_areaid) || query.f_areaid == "0")
            {
                return new List<Paper>();
            }

            var all = 0;
            var res = ResourceQueryClient.ResourceQueryClient.Query.CreatePaperQuery(subject)
                .QueryPaerList(query, 1, 11, out all);
            res.Remove(p);
            return res.Skip(0).Take(10).ToList();

        }
        #endregion

    }
}
