
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
    public class YearMonthDay : IYearMonthDay
    {

        #region 获取年份List
        /// <summary>
        /// 获取年份List
        /// </summary>
        /// <returns></returns>
        public List<YearModel> GetYearList()
        {
            List<YearModel> yearList = new List<YearModel>();

            for (int i = 1970; i <= DateTime.Now.Year; i++)
            {
                yearList.Add(new YearModel()
                {
                    ID = i.ToString(),
                    Name = i.ToString()
                });

            }

            return yearList;
        }
        #endregion


        #region 获取月份List
        /// <summary>
        /// 获取月份List
        /// </summary>
        /// <returns></returns>
        public List<MonthModel> GetMonthList()
        {
            List<MonthModel> monthList = new List<MonthModel>();

            for (int i = 1; i <= 12; i++)
            {
                monthList.Add(new MonthModel()
                {
                    ID = i.ToString(),
                    Name = i.ToString()
                });

            }

            return monthList;
        }
        #endregion


        #region 获取天List
        /// <summary>
        /// 获取天List
        /// </summary>
        /// <returns></returns>
        public List<DayModel> GetDayList()
        {
            List<DayModel> DayList = new List<DayModel>();

            for (int i = 1; i <= 31; i++)
            {
                DayList.Add(new DayModel()
                {
                    ID = i.ToString(),
                    Name = i.ToString()
                });

            }
            return DayList;
        }
        #endregion
    }
}
