using Mfg.EI.DBHelper;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Mfg.EI.DAL
{
    public class SyncStudyDal
    {

        public SyncStudyModel GetInit(SyncStudyModel p)
        {
            SyncStudyModel dto = new SyncStudyModel();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT GradeID,AcaStru FROM EI_StudentInfo WHERE MfgID=@MfgID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@MfgID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=p.MfgID} ,
            };
            dto = MySQLHelper.ExecuteStatement<SyncStudyModel>(strSql.ToString(), (a) =>
            {
                return new SyncStudyModel()
                {
                    MfgID = p.MfgID.ToString(),
                    GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    AcaStru = a.IsDBNull(1) ? 0 : a.GetInt32(1)
                };
            }, parameters).FirstOrDefault();
            return dto;
        }

        public SyncStudyJobModel GetInitResult(SyncStudyJob para)
        {
            SyncStudyJobModel dto = new SyncStudyJobModel();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT a.KnowledgeID,a.KnowledgeName,b.SequenceID,c.ItemID,c.AnswerTime,c.Accuracy,a.SubjectID,c.Answer,c.ID,c.NoteContent FROM EI_SyncJob a 
INNER JOIN EI_SyncJRelI b on a.ID=b.JID
INNER JOIN EI_SyncJAnswer c on a.ID=c.JID AND b.ItemID=c.ItemID
WHERE a.SID=@SID AND a.ID=@JID AND a.SubjectID=@SubjectID Order by b.ItemID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@SID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=para.SID} ,
              new MySqlParameter("@JID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=para.JID},
              new MySqlParameter("@SubjectID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=para.SubjectID} 
            };
            dto.List = MySQLHelper.ExecuteStatement<SyncStudyJob>(strSql.ToString(), (a) =>
            {
                return new SyncStudyJob()
                {
                    KnowledgeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    KnowledgeName = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    SequenceID = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                    ItemID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    AnswerTime = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                    Accuracy = a.IsDBNull(5) ? 0 : a.GetInt32(5),
                    SubjectID = a.IsDBNull(6) ? 0 : a.GetInt32(6),
                    Answer = a.IsDBNull(7) ? string.Empty : a.GetString(7),
                    AnswerID = a.IsDBNull(8) ? string.Empty : a.GetString(8),
                    NoteContent = a.IsDBNull(9) ? string.Empty : a.GetString(9)
                };
            }, parameters);
            return dto;
        }



        public KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@PointID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=dto.PointID},
              new MySqlParameter("@SubjectID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.SubjectID},
              new MySqlParameter("@KnowledgeId", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.KnowledgeId},
              new MySqlParameter("@OrgID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.OrgID}
            };

            sql.Append(@"SELECT LearningTarget,LearningDescription,EditTargetCount,EditDescriptionCount from ei_knowledgepoint where OrgID=@OrgID and PointID=@PointID and SubjectID=@SubjectID;");

            MySQLHelper.ExecuteStatement<KnowledgeCustomerPointValue>(sql.ToString(), (a) =>
            {

                dto.PointValue = new KnowledgeCustomerPointValue();

                dto.PointValue.LearningTarget = a.IsDBNull(0) ? string.Empty : a.GetString(0);
                dto.PointValue.LearningDescription = a.IsDBNull(1) ? string.Empty : a.GetString(1);
                dto.PointValue.EditTargetCount = a.GetInt16(2);
                dto.PointValue.EditDescriptionCount = a.GetInt16(3);

                return dto.PointValue;

            }, parameters);

            return dto;
        }
    }
}
