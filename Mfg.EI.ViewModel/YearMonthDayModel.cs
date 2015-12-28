
/*
 * author:杨礼文;
 * function:年月日ViewModel
 * date:2015-04-20
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class YearMonthDayModel
    {
        public List<YearModel> yearList { get; set; }

        public List<MonthModel> monthList { get; set; }

        public List<DayModel> dayList { get; set; }
    }



    public class YearModel
    {
        public string ID { get; set; }

        public String Name { get; set; }
    }

    public class MonthModel
    {
        public string ID { get; set; }

        public String Name { get; set; }
    }

    public class DayModel
    {
        public string ID { get; set; }

        public String Name { get; set; }
    }
}
