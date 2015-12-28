

/*
 * author:杨礼文;
 * function:学能分析报告文案
 * date:2015-10-18
 * updateDate:2015-10-18
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL.KnowledgeEvaluation
{
    public class SmartdocDal
    {

        public List<EI_Smart_doc> GetSmartdocList()
        {

            string sql = @" SELECT 
                            DocID,ExamID,IsEnable,DimID,DocEnum,DocKey,DocMark,DocValue,Description,LocalDescription from ei_smart_doc";

            List<EI_Smart_doc> list = new List<EI_Smart_doc>();
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    while (a.Read())
                    {
                        EI_Smart_doc dto = new EI_Smart_doc()
                        {
                            DocID = a.GetInt32(0),
                            ExamID = a.GetInt32(1),
                            IsEnable = a.GetBoolean(2),
                            DimID = a.GetInt32(3),
                            DocEnum = a.GetInt32(4),
                            DocKey = a.GetInt32(5),
                            DocMark = a.IsDBNull(6) ? "" : a.GetString(6),
                            DocValue = a.GetString(7),
                            Description = a.GetString(8),
                            LocalDescription = a.IsDBNull(9) ? "" : a.GetString(9)
                        };

                        list.Add(dto);
                    }
                },
                null);


            return list;
        }





    }
}
