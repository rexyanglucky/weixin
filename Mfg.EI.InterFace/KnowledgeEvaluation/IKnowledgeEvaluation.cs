using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public interface IKnowledgeEvaluation
    {

        #region 获取测试卷状态

        /// <summary>
        /// 获取试卷状态
        /// </summary>
        /// <param name="measureID"></param>
        /// <returns>状态：0无效，1开始作答，2答题完毕（有效测评）255删除</returns>
        int GetMeasureStatus(string measureID);
        #endregion

        #region 获取试题

        /// <summary>
        /// 获取试题
        /// </summary>
        /// <param name="measureID"></param>
        /// <returns></returns>
        List<MeasureItemModel> GetMeasureItem(string measureID);
        #endregion

        #region 提交测评

        /// <summary>
        /// 提交测评
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        bool SubmitMeasure(List<MeasureItemModel> list);

        #endregion

        #region 作废
        /// <summary>
        /// 获取学能试卷列表
        /// </summary>
        /// <returns></returns>
        //List<SmartExamViewModel> GetSmartExamViewData(); 
        #endregion

        /// <summary>
        /// 获取学能试卷列表
        /// </summary>
        /// <returns></returns>
        List<ExamDimViewModel> GetSmartExamViewData();

        /// <summary>
        /// 获取学能报告信息
        /// </summary>
        /// <param name="reportId"></param>
        /// <returns></returns>
        SmartExamReportViewModel GetSmartReport(int reportId);


        /// <summary>
        /// 添加试卷
        /// </summary>
        /// <param name="measure"></param>
        /// <returns></returns>
        long AddMeasureExam(MeasureExamViewModel measure);
    }
}
