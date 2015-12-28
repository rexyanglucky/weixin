
/*
 * author:谢利民;
 * function:同步教学功能操作
 * date:2015-05-10
 * updateDate:2015-05-10
 */
using System;
using Mfg.EI.ViewModel;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL;

namespace Mfg.EI.InterFace
{
    /// <summary>
    /// SyncTeach：同步教学功能操作
    /// </summary>
    public class SyncTeach : ISyncTeach
    {
        public SyncTeachModel GetTeach(SyncTeachModel dto)
        {
            return new SyncTeachDal().GetTeach(dto);
        }


        public string SaveJob(SyncTeachInitModel initModel)
        {
            return new SyncTeachDal().SaveJob(initModel);
        }


        public string SavePoint(KnowledgePoint dto)
        {
            return new SyncTeachDal().SavePoint(dto);
        }


        public KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto)
        {
            return new SyncTeachDal().GetCustomerPoint(dto);
        }


        public string InitExample(KnowledgePointItem dto)
        {
            return new SyncTeachDal().InitExample(dto);
        }


        public List<KnowledgePointList> InitDraftData(KnowledgePointItem dto)
        {
            return new SyncTeachDal().InitDraftData(dto);
        }




        public string CheckDataIndex(List<KnowledgePointList> dto)
        {
            return new SyncTeachDal().CheckDataIndex(dto);
        }


        public string DelDataIndex(List<KnowledgePointList> dto)
        {
            return new SyncTeachDal().DelDataIndex(dto);
        }


        public List<KnowledgePointList> InitLocalData(KnowledgePointItem dto)
        {
            return new SyncTeachDal().InitLocalData(dto);
        }


        public string InitSaveData(KnowledgePointItem dto)
        {
            return new SyncTeachDal().InitSaveData(dto);
        }


        public List<KnowledgePointList> InitShow(KnowledgePointList dto)
        {
            return new SyncTeachDal().InitShow(dto);
        }


        public string SaveShow(KnowledgePointList dto)
        {
            return new SyncTeachDal().SaveShow(dto);
        }
    }
}
