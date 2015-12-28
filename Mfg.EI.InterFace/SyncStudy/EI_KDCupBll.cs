using Mfg.EI.DAL;
using Mfg.EI.DAL.SyncStudy;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.InterFace
{
    public class EI_KDCupBll : ISyncStudy
    {


        private KDCupDal kDCupDal = new KDCupDal();

        /// <summary>
        /// 根据当前用户ID取出奖杯数
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<EI_KDCup> GetCupList(int userId)
        {
            return kDCupDal.GetCupList(userId);
        }

        /// <summary>
        /// 初始化学生数据
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        public SyncStudyModel GetInit(SyncStudyModel p)
        {
            SyncStudyModel dto = new SyncStudyDal().GetInit(p);
            switch (dto.AcaStru)
            {
                case 0: dto.AcaStru = 1; break;
                case 1: dto.AcaStru = 0; break;
                case 2: dto.ArtSciences = 1; break;
                case 3: dto.ArtSciences = 0; break;
                case 4: dto.ArtSciences = 2; break;
                default:
                    break;
            }
            switch (dto.GradeID)
            {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6: dto.GradeIDBig = "01"; dto.GradeIDMapping = "x"; break;
                case 7:
                case 8:
                case 9: dto.GradeIDBig = "02"; dto.GradeIDMapping = "c"; break;
                case 10:
                case 11:
                case 12: dto.GradeIDBig = "03"; dto.GradeIDMapping = "g"; break;
                default:
                    break;
            }
            return dto;
        }


        public SyncStudyJobModel GetInitResult(SyncStudyJob para)
        {
            SyncStudyJobModel dto = new SyncStudyDal().GetInitResult(para);
            if (dto.List != null && dto.List.Count > 0)
            {
                dto.TotalCount = dto.List.Count;
                dto.OKCount = dto.List.Where(a => a.Accuracy == 1).Count();
                dto.ErrorCount = dto.List.Where(a => a.Accuracy == 0).Count();
                dto.TotalTime = dto.List.Sum(a => string.IsNullOrEmpty(a.AnswerTime.Trim()) ? 0 : Convert.ToDouble(a.AnswerTime));
                dto.List = dto.List.OrderBy(a => a.ItemID).ToList();
                dto.KnowledgeName = dto.List.First().KnowledgeName;
                dto.SubjectIDMapping = "0" + dto.List.First().SubjectID;
            }
            return dto;
        }


        public bool InsertTestAnalysis(SyncJobModel syncjobmodel)
        {
            bool result = false;
            //向主表中插入数据
            EI_SyncJob _eisyncjob = new EI_SyncJob();
            _eisyncjob.ID = syncjobmodel.ID;
            _eisyncjob.KnowledgeID = syncjobmodel.KnowledgeID;
            _eisyncjob.KnowledgeDetialID = syncjobmodel.KnowledgeDetialID;
            _eisyncjob.SID = syncjobmodel.SID;
            _eisyncjob.KnowledgeName = syncjobmodel.KnowledgeName;
            _eisyncjob.SID = syncjobmodel.SID;
            _eisyncjob.GradeID = syncjobmodel.GradeID;
            _eisyncjob.SubjectID = syncjobmodel.SubjectID;
            _eisyncjob.RoundNumber = syncjobmodel.RoundNumber;
            _eisyncjob.RuleType = syncjobmodel.RuleType;
            _eisyncjob.TropNumber = syncjobmodel.TropNumber == null ? 0 : syncjobmodel.TropNumber;
            _eisyncjob.CreateTime = DateTime.Now;
            _eisyncjob.StageID = syncjobmodel.StageID;
            result = new SyncJobDal().Add(_eisyncjob);
            if (result)
            {
                List<SyncJRelIModel> datalist = syncjobmodel.SyncJRelIModelList;

                if (datalist.Count > 0)
                {
                    foreach (var item in datalist)
                    {
                        EI_SyncJRelI _eisyncjreli = new EI_SyncJRelI();
                        _eisyncjreli.JID = item.JID;
                        _eisyncjreli.ItemID = item.ItemID;
                        _eisyncjreli.ItemType = item.ItemType;
                        _eisyncjreli.SequenceID = item.SequenceID;
                        _eisyncjreli.KnowledgeID = item.KnowledgeID;
                        _eisyncjreli.KnowledgeName = item.KnowledgeName;
                        result = new SyncJRelIDal().Add(_eisyncjreli);
                    }
                }
            }
            return result;
        }

        /// <summary>
        /// 添加笔记
        /// </summary>
        /// <param name="jaid"></param>
        /// <param name="noteContent"></param>
        /// <returns></returns>
        public bool AddItemNote(string jaid, string noteContent)
        {
            return new SyncJRelIDal().AddItemNote(jaid, noteContent);
        }


        public List<SyncJobModel> GetCup(SyncJobModel dto)
        {
            return new SyncJRelIDal().GetCup(dto);
        }


        public KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto)
        {
            return new SyncStudyDal().GetCustomerPoint(dto);
        }
    }
}
