using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using Mfg.EI.DBHelper;
namespace Mfg.EI.DAL.ExamPaper
{
    public class EI_FavoriteDal
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_Favorite model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_Favorite(");
            strSql.Append("TID,ItemID,FType,TagID,CreateTime,DelFlag,Remark,subjectId)");
            strSql.Append(" values (");
            strSql.Append("@TID,@ItemID,@FType,@TagID,@CreateTime,@DelFlag,@Remark,@subjectId)");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.VarChar,40),
					new MySqlParameter("@FType", MySqlDbType.Int32),
					new MySqlParameter("@TagID", MySqlDbType.Int32),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
                    new MySqlParameter("@DelFlag", MySqlDbType.Int32),
                    new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@subjectId", MySqlDbType.VarChar,50),
                    };
            parameters[0].Value = model.TID;
            parameters[1].Value = model.ItemID;
            parameters[2].Value = model.FType;
            parameters[3].Value = model.TagID;
            parameters[4].Value = model.CreateTime;
            parameters[5].Value = model.DelFlag;
            parameters[6].Value = model.Remark;
            parameters[7].Value = model.subjectId;
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
        /// <summary>
        /// 删除收藏
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool DeleteFav(EI_Favorite model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_Favorite where TID=@TID and ItemID=@ItemID and subjectId=@subjectId and FType=@FType");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.VarChar,40),
					new MySqlParameter("@FType", MySqlDbType.Int32),
					new MySqlParameter("@subjectId", MySqlDbType.VarChar,50),
                    };
            parameters[0].Value = model.TID;
            parameters[1].Value = model.ItemID;
            parameters[2].Value = model.FType;
            parameters[3].Value = model.subjectId;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }

            return false;

        }
    }
}
