

/*
 * author:杨礼文;
 * function:学生入学成绩接口
 * date:2015-04-20
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Common;
using Mfg.EI.DAL;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public class EnterScore : IEnterScore
    {

        private EnterScoreDal _enterScoreDal = new EnterScoreDal();


        #region 根据学生ID获取学生入学成绩
        /// <summary>
        /// 根据学生ID获取学生入学成绩
        /// </summary>
        /// <param name="stuID">学生ID</param>
        /// <returns></returns>
        public List<EnterScoreModel> GetEnterScoreModelListByStuID(string stuID)
        {
            StringBuilder sbSql = new StringBuilder();
            sbSql.Append(
                " select Subject,SubjectID,Total,Score from EI_Subject a LEFT JOIN EI_EnterScore b ON a.ID=b.SubjectID ");
            sbSql.Append(" where b.StuID=@StuID order by SubjectID ");

            var dataSet = _enterScoreDal.GetListBySqlandStuID(sbSql.ToString(), stuID);
            List<EnterScoreModel> enterScoreList = ModelConvertHelper<EnterScoreModel>.ConvertToModelList(dataSet.Tables[0]);

            if (enterScoreList.Count != 9)//固定9科成绩
            {
                enterScoreList.AddRange(new List<EnterScoreModel>()
                                                    {
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=1,Subject="数学" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=2,Subject="语文" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=3,Subject="英语" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=4,Subject="物理" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=5,Subject="化学" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=6,Subject="地理" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=7,Subject="历史" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=8,Subject="政治" } ,
                                                        new EnterScoreModel(){Total=0,Score=0,SubjectID=9,Subject="生物" } 

                                                    }
                                         );
            }

            return enterScoreList;
        }
        #endregion

    }
}
