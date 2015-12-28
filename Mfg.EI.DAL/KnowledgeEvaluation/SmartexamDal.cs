using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.DAL
{
    /// <summary>
    /// 学能试卷Dal
    /// </summary>
    public class SmartexamDal
    {

        #region 作废
        ///// <summary>
        ///// 获取学能试卷列表
        ///// </summary>
        ///// <returns>List<EI_SmartExam/></returns>
        //public List<EI_SmartExam> GetSmartExams()
        //{
        //    var sqlstr = "SELECT EXAMID,EXAMNAME,ITEMINDEX,ADDTIME,REMARK,AGERANGE,EXPECTTIME FROM EI_SMART_EXAM WHERE ISENABLE=1";

        //    return MySQLHelper.ExecuteStatement<EI_SmartExam>(sqlstr, a =>
        //    {
        //        EI_SmartExam smartExam = new EI_SmartExam()
        //        {
        //            ExamID = a.GetInt32(0),
        //            ExamName = a.GetString(1),
        //            ItemIndex = a.GetInt32(2),
        //            AddTime = a.GetDateTime(3),
        //            Remark = a.GetString(4),
        //            AgeRange = a.GetString(5),
        //            ExpectTime = a.GetFloat(6)
        //        };
        //        return smartExam;
        //    }, null);
        //} 
        #endregion

        #region 获取学能试卷列表
        /// <summary>
        /// 获取学能试卷列表
        /// </summary>
        /// <returns>List<EI_SmartExam/></returns>
        public List<ExamDimViewModel> GetSmartExams()
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT 
                            a.ExamID,a.ExamName,a.ItemIndex ExamItemIndex,a.Remark ExamRemark,
                            c.DimID,c.DimName,c.DimIndex,c.IsDefault 
                            FROM ei_smart_exam a 
                            INNER JOIN ei_exam_item b on a.ExamID = b.ExamID 
                            INNER JOIN ei_exam_dim c on b.DimID =c.DimID
                            WHERE a.IsEnable=1 AND b.IsEnable=1 AND c.IsEnable=1 
                            GROUP BY c.DimID");

            return MySQLHelper.ExecuteStatement<ExamDimViewModel>(strSql.ToString(), a =>
            {
                var ss = a.GetDataTypeName(6);


                ExamDimViewModel smartExam = new ExamDimViewModel()
                {
                    ExamID = a.GetInt32(0),
                    ExamName = a.GetString(1),
                    ExamItemIndex = a.GetInt32(2),
                    ExamRemark = a.GetString(3),

                    DimID = a.GetInt32(4),
                    DimName = a.GetString(5),
                    DimIndex = a.IsDBNull(6) ? 0 : a.GetInt32(6),
                    IsDefault = a.GetBoolean(7)
                };
                return smartExam;
            }, null);
        }
        #endregion
    }
}
