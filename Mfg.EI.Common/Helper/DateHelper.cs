using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.Common
{
    public abstract class DateHelper
    {
        /// <summary>根据日期，获得星期几</summary>
        /// <param name="y">年</param>  
        /// <param name="m">月</param>  
        /// <param name="d">日</param>  
        /// <returns>星期几，1代表星期一；7代表星期日</returns>
        public static int getWeekDay(int y, int m, int d)
        {
            if (m == 1) m = 13;
            if (m == 2) m = 14;
            int week = (d + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400) % 7 + 1;
            return week;
        }
        public static string NewID()
        {
            return Guid.NewGuid().ToString("n");
        }

    }
}
