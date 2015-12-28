using Mfg.EI.DBHelper;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.DAL
{
    public class TagKeepDal
    {
        public List<TagPointModel> GetTagKeep(int TID, string SubjectID)
        {
            List<TagPointModel> list = new List<TagPointModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT DISTINCT KnowledgeID,KnowledgeName FROM EI_TagKeep WHERE TID=@TID and SubjectID=@SubjectID ORDER BY AddTime DESC;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@TID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=TID},
              new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=Convert.ToInt32( SubjectID)},
            };
            list.AddRange(MySQLHelper.ExecuteStatement<TagPointModel>(strSql.ToString(), (a) =>
            {
                return new TagPointModel()
                {
                    f_name = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    f_sec = a.IsDBNull(0) ? 0 : a.GetInt32(0)
                };
            }, parameters));
            return list;
        }

        public List<TagKeepModel> GetTagKeepData(string TID, int KnowledgeID, string SubjectID)
        {
            List<TagKeepModel> list = new List<TagKeepModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT DISTINCT ItemID FROM EI_TagKeep WHERE TID=@TID  AND KnowledgeID=@KnowledgeID and SubjectID=@SubjectID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@TID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=TID},
              new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=KnowledgeID},
              new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=SubjectID},
            };
            list.AddRange(MySQLHelper.ExecuteStatement<TagKeepModel>(strSql.ToString(), (a) =>
            {
                return new TagKeepModel()
                {
                    ItemID = a.IsDBNull(0) ? 0 : a.GetInt32(0)
                };
            }, parameters));
            return list;
        }


        #region 好题添加收藏
        /// <summary>
        /// 好题添加收藏
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool Add(TagKeepModel model)
        {
            // KeepID,TID,GradeID,StageID,SubjectID,ItemID,ItemType,TagID,KnowledgeID,KnowledgeName,AddTime,EditTime,KeepState,DiffNum,DelFlag,SequenceID  (KeepID 自增)


            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_TagKeep");
            strSql.Append(" (TID,GradeID,StageID,SubjectID,ItemID,ItemType,TagID,KnowledgeID,KnowledgeName,AddTime,EditTime,KeepState,DiffNum,DelFlag,SequenceID) ");
            strSql.Append(" values ");
            strSql.Append(" (@TID,@GradeID,@StageID,@SubjectID,@ItemID,@ItemType,@TagID,@KnowledgeID,@KnowledgeName,@AddTime,@EditTime,@KeepState,@DiffNum,@DelFlag,@SequenceID) ");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40)   {Direction = ParameterDirection.InputOutput,Value =model.TID },
                    new MySqlParameter("@GradeID", MySqlDbType.Int32,11)     {Direction = ParameterDirection.InputOutput,Value =model.GradeID }  ,
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11)     {Direction = ParameterDirection.InputOutput,Value =model.StageID }  ,
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,11)     {Direction = ParameterDirection.InputOutput,Value =model.SubjectID }  ,    
                    new MySqlParameter("@ItemID", MySqlDbType.Int32,11)     {Direction = ParameterDirection.InputOutput,Value =model.ItemID }  ,
                    new MySqlParameter("@ItemType", MySqlDbType.Int32,11)     {Direction = ParameterDirection.InputOutput,Value =model.ItemType }  ,
                    new MySqlParameter("@TagID", MySqlDbType.VarChar,40)   {Direction = ParameterDirection.InputOutput,Value =model.TagID }  ,
                    new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,11)    {Direction = ParameterDirection.InputOutput,Value =model.KnowledgeID },
                    new MySqlParameter("@KnowledgeName", MySqlDbType.VarChar,100)  {Direction = ParameterDirection.InputOutput,Value =model.KnowledgeName }  ,
                    new MySqlParameter("@AddTime", MySqlDbType.DateTime)     {Direction = ParameterDirection.InputOutput,Value =model.AddTime }  ,
                    new MySqlParameter("@EditTime", MySqlDbType.DateTime)     {Direction = ParameterDirection.InputOutput,Value =model.EditTime }  ,
                    new MySqlParameter("@KeepState", MySqlDbType.Int32,11 )    {Direction = ParameterDirection.InputOutput,Value =model.KeepState }  ,
                    new MySqlParameter("@DiffNum", MySqlDbType.Int32,11 )    {Direction = ParameterDirection.InputOutput,Value =model.DiffNum }  ,
                    new MySqlParameter("@DelFlag", MySqlDbType.Int32,11)     {Direction = ParameterDirection.InputOutput,Value =model.DelFlag }  ,
                    new MySqlParameter("@SequenceID", MySqlDbType.Int32,11)     {Direction = ParameterDirection.InputOutput,Value =model.SequenceID }
                    
                    };
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region 获取好题收藏
        /// <summary>
        /// 获取好题收藏
        /// </summary>
        /// <param name="model"></param>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        /// <returns></returns>
        public DataSet GetTagKeep(TagKeepModel model, int skip = 0, int take = 10)
        {


            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";


            strSqlCount = " SELECT Count(1) Count from EI_TagKeep ";

            strSqlList.Append(" SELECT KeepID,TID,GradeID,StageID,SubjectID,ItemID,ItemType,TagID,KnowledgeID,KnowledgeName,AddTime,EditTime,KeepState,DiffNum,DelFlag,SequenceID from EI_TagKeep ");

            strSqlWhere.Append(" WHERE DelFlag=0 ");


            List<MySqlParameter> parameterList = new List<MySqlParameter>();

            if (!string.IsNullOrEmpty(model.TID)) //老师ID
            {
                strSqlWhere.Append(" AND TID=@TID ");
                parameterList.Add(new MySqlParameter("@TID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.TID });
            }

            if (model.GradeID > 0)//年级
            {
                strSqlWhere.Append(" AND GradeID=@GradeID ");
                parameterList.Add(new MySqlParameter("@GradeID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.GradeID });
            }

            if (model.StageID > 0)//大年级
            {
                strSqlWhere.Append(" AND StageID=@StageID ");
                parameterList.Add(new MySqlParameter("@StageID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.StageID });
            }
            if (model.SubjectID > 0)//科目
            {
                strSqlWhere.Append(" AND SubjectID=@SubjectID ");
                parameterList.Add(new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.SubjectID });
            }

            if (model.ItemType > 0)//题型
            {
                strSqlWhere.Append(" AND ItemType=@ItemType ");
                parameterList.Add(new MySqlParameter("@ItemType", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.ItemType });
            }



            if (!string.IsNullOrEmpty(model.TagID)) //标签ID
            {
                if (model.TagID != "0")
                {
                    strSqlWhere.Append(" AND TagID=@TagID ");
                    parameterList.Add(new MySqlParameter("@TagID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.TagID });
                }

            }

            if (model.KnowledgeID > 0)//知识点ID
            {
                strSqlWhere.Append(" AND KnowledgeID=@KnowledgeID ");
                parameterList.Add(new MySqlParameter("@KnowledgeID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.KnowledgeID });
            }



            switch (model.DiffNum)
            {
                case 1:
                    strSqlWhere.Append(" AND DiffNum <= 40 ");
                    break;
                case 2:
                    strSqlWhere.Append(" AND 40< DiffNum <= 80 ");
                    break;
                case 3:
                    strSqlWhere.Append(" AND 80< DiffNum <= 100 ");
                    break;
                default:
                    break;
            }


            //if (model.DiffNum == 0)//难度
            //{
            //    strSqlWhere.Append(" AND DiffNum=@DiffNum ");
            //    parameterList.Add(new MySqlParameter("@DiffNum", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.DiffNum });
            //}




            if (skip < 0)
            {
                strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
                parameterList.Add(new MySqlParameter("@Skip", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = skip });
                parameterList.Add(new MySqlParameter("@Take", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = take });
            }

            string strOrder = " ORDER BY EditTime DESC ";

            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            sb.Append(strSqlWhere);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            return MySQLHelper.Query(sb.ToString(), parameterList);
        }
        #endregion


        #region 删除好题收藏
        /// <summary>
        /// 删除好题收藏
        /// </summary>
        /// <param name="tID"></param>
        /// <param name="itemID"></param>
        /// <returns></returns>
        public int DeleteTagKeepData(string tID, int itemID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_TagKeep ");
            strSql.Append(" where TID=@TID and ItemID=@ItemID  ");
            MySqlParameter[] parameters = {
                                             new MySqlParameter("@TID", MySqlDbType.VarChar,40){Direction = ParameterDirection.InputOutput,Value = tID},
                                             new MySqlParameter("@ItemID", MySqlDbType.Int32,11){Direction=ParameterDirection.InputOutput,Value=itemID}
			};
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows;

        }
        #endregion



        public List<TagModel> GetTag()
        {
            List<TagModel> list = new List<TagModel>();
            var str = new StringBuilder();
            str.Append(@"SELECT ID,Tag from EI_Tag WHERE TagType=0 AND DelFlag=0 ORDER BY OrderNumber;");
            list = MySQLHelper.ExecuteStatement<TagModel>(str.ToString(), (a) =>
              {
                  return new TagModel()
                  {
                      TagID = a.GetInt32(0),
                      TagName = a.GetString(1)
                  };
              }, null);
            return list;
        }
    }
}
