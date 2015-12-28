using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public class KnowledgeEvaluation : IKnowledgeEvaluation
    {

        #region 私有变量

        private MeasureDal _MeasureDal = new MeasureDal();
        #endregion

        #region 获取测试卷状态
        /// <summary>
        /// 获取试卷状态
        /// </summary>
        /// <param name="measureID"></param>
        /// <returns>状态：0无效，1开始作答，2答题完毕（有效测评）255删除</returns>
        public int GetMeasureStatus(string measureID)
        {
            return _MeasureDal.GetMeasureStatus(measureID);

        }
        #endregion

        #region 获取试题
        /// <summary>
        /// 获取试题
        /// </summary>
        /// <param name="measureID"></param>
        /// <returns></returns>
        public List<MeasureItemModel> GetMeasureItem(string measureID)
        {
            List<EI_MeasureItem> list = _MeasureDal.GetMeasureItem(measureID);

            var MeasureItemList = list.Select(m => new MeasureItemModel()
                {
                    ExamID = m.ExamID,
                    ExamName = m.ExamName,
                    ItemID = m.ItemID,
                    MeasureID = m.MeasureID,
                    OrgID = m.OrgID,
                    TempID = m.TempID,
                    TID = m.TID,
                    ItemIndex = m.ItemIndex,
                    MathIndex = m.MathIndex,
                    ItemBody = m.ItemBody,
                    ItemBodyOption = m.ItemBodyOption,
                    ItemOption = m.ItemOption,
                    ItemScore = m.ItemScore,
                    AnswerItem = m.AnswerItem,
                    AnswerScore = m.AnswerScore,
                    DimID = m.DimID,
                    DimName = m.DimName,
                    DimRemark = m.DimRemark,
                    PatternID = m.PatternID,
                    PatternName = m.PatternName,
                    PatternTag = m.PatternTag,
                    PatternRemark = m.PatternRemark,
                    AddTime = m.AddTime,
                    LastEditTime = m.LastEditTime,
                    IntervalTime = m.IntervalTime
                }
                    ).ToList();


            return MeasureItemList;
        }
        #endregion

        #region 提交测评
        /// <summary>
        /// 提交测评
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public bool SubmitMeasure(List<MeasureItemModel> list)
        {
            var MeasureItemList = list.Select(m => new EI_MeasureItem()
            {
                ItemID = m.ItemID,
                MeasureID = m.MeasureID,
                OrgID = m.OrgID,
                TempID = m.TempID,
                TID = m.TID,
                ItemIndex = m.ItemIndex,
                MathIndex = m.MathIndex,
                ItemBody = m.ItemBody,
                ItemBodyOption = m.ItemBodyOption,
                ItemOption = m.ItemOption,
                ItemScore = m.ItemScore,
                AnswerItem = m.AnswerItem,
                AnswerScore = m.AnswerScore,
                DimID = m.DimID,
                DimName = m.DimName,
                DimRemark = m.DimRemark,
                PatternID = m.PatternID,
                PatternName = m.PatternName,
                PatternTag = m.PatternTag,
                PatternRemark = m.PatternRemark,
                AddTime = m.AddTime,
                LastEditTime = m.LastEditTime,
                IntervalTime = m.IntervalTime
            }
                   ).ToList();

            return _MeasureDal.SubmitMeasure(MeasureItemList);
        }

        #endregion

        #region 获取学能试卷列表作废
        /// <summary>
        /// 获取学能试卷列表
        /// </summary>
        /// <returns>List<SmartExamViewModel/></returns>
        //public List<SmartExamViewModel> GetSmartExamViewData()
        //{
        //    var smartexamDal = new SmartexamDal();
        //    var result
        //        = smartexamDal.GetSmartExams().ConvertAll(
        //        input =>
        //        {
        //            var vm = new SmartExamViewModel()
        //            {
        //                ExamID = input.ExamID,
        //                AgeRange = input.AgeRange,
        //                ExamName = input.ExamName,
        //                ExpectTime = input.ExpectTime,
        //                ItemIndex = input.ItemIndex,
        //                Remark = input.Remark
        //            };
        //            return vm;
        //        });
        //    return result;
        //}
        #endregion

        #region 获取学能试卷列表
        /// <summary>
        /// 获取学能试卷列表
        /// </summary>
        /// <returns>List<SmartExamViewModel/></returns>
        public List<ExamDimViewModel> GetSmartExamViewData()
        {
            return new SmartexamDal().GetSmartExams();
        }
        #endregion

        #region 获取学能报告信息
        /// <summary>
        /// 获取学能报告信息
        /// </summary>
        /// <param name="reportId"></param>
        /// <returns></returns>
        public SmartExamReportViewModel GetSmartReport(int reportId)
        {
            return new SmartExamReportDal().GetSmartExamRepoInfo(reportId);
        }

        #endregion


        /// <summary>
        /// 添加试卷
        /// </summary>
        /// <param name="measure"></param>
        /// <returns></returns>
        public long AddMeasureExam(MeasureExamViewModel measure)
        {
            var measureResult = new MeasureDal();
            EI_Measure_exam eiMeasure = new EI_Measure_exam()
            {
                MeasureStatus = measure.MeasureStatus,
                OrgID = measure.OrgID,
                TempID = measure.TempID,
                TID = measure.TID,
                ExamID = measure.ExamID,
                DimIDs = measure.DimIDs
            };

            return measureResult.AddMeasureExam(eiMeasure);
        }
    }
}
