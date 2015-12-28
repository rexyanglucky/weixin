
/*
 * author:杨礼文;
 * function:年月日接口
 * date:2015-04-20
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public interface IYearMonthDay
    {
        #region 获取年份List

        /// <summary>
        /// 获取年份List
        /// </summary>
        /// <returns></returns>
        List<YearModel> GetYearList();
        #endregion


        #region 获取月份List

        /// <summary>
        /// 获取月份List
        /// </summary>
        /// <returns></returns>
        List<MonthModel> GetMonthList();
        #endregion


        #region 获取天List

        /// <summary>
        /// 获取天List
        /// </summary>
        /// <returns></returns>
        List<DayModel> GetDayList();

        #endregion

    }
}
