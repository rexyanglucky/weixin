using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.Common
{
    public abstract class DataConverter
    {
        protected DataConverter()
        {
        }

        public static bool CBoolean(string input)
        {
            bool flag = false;
            if (string.IsNullOrEmpty(input))
            {
                return flag;
            }
            input = input.Trim();
            if (((string.Compare(input, "true", StringComparison.OrdinalIgnoreCase) != 0) && (string.Compare(input, "yes", StringComparison.OrdinalIgnoreCase) != 0)) && (string.Compare(input, "1", StringComparison.OrdinalIgnoreCase) != 0))
            {
                return flag;
            }
            return true;
        }

        public static DateTime CDate(object input)
        {
            if (!Convert.IsDBNull(input) && !object.Equals(input, null))
            {
                return CDate(input.ToString());
            }
            return DateTime.Now;
        }

        public static DateTime CDate(string input)
        {
            DateTime now;
            if (!DateTime.TryParse(input, out now))
            {
                now = DateTime.Now;
            }
            return now;
        }

        public static DateTime? CDate(string input, DateTime? outTime)
        {
            DateTime time;
            if (!DateTime.TryParse(input, out time))
            {
                return outTime;
            }
            return new DateTime?(time);
        }

        public static string CDateString(string input)
        {
            DateTime time;
            if (!DateTime.TryParse(input, out time))
            {
                return string.Empty;
            }
            return time.ToString("yyyy-MM-dd");
        }

        public static decimal CDecimal(object input)
        {
            return CDecimal(input, 0M);
        }

        public static decimal CDecimal(string input)
        {
            return CDecimal(input, 0M);
        }

        public static decimal CDecimal(object input, decimal defaultValue)
        {
            if (!Convert.IsDBNull(input) && !object.Equals(input, null))
            {
                return CDecimal(input.ToString(), defaultValue);
            }
            return 0M;
        }

        public static decimal CDecimal(string input, decimal defaultValue)
        {
            decimal num;
            if (!decimal.TryParse(input, out num))
            {
                num = defaultValue;
            }
            return num;
        }

        public static double CDouble(object input)
        {
            return CDouble(input, 0.0);
        }

        public static double CDouble(string input)
        {
            return CDouble(input, 0.0);
        }

        public static double CDouble(object input, double defaultValue)
        {
            if (!Convert.IsDBNull(input) && !object.Equals(input, null))
            {
                return CDouble(input.ToString(), defaultValue);
            }
            return 0.0;
        }

        public static double CDouble(string input, double defaultValue)
        {
            double num;
            if (!double.TryParse(input, out num))
            {
                return defaultValue;
            }
            return num;
        }

        public static int CLng(object input)
        {
            return CLng(input, 0);
        }

        public static int CLng(string input)
        {
            return CLng(input, 0);
        }

        public static int CLng(object input, int defaultValue)
        {
            if (!Convert.IsDBNull(input) && !object.Equals(input, null))
            {
                return CLng(input.ToString(), defaultValue);
            }
            return defaultValue;
        }

        public static int CLng(string input, int defaultValue)
        {
            int num;
            if (!int.TryParse(input, out num))
            {
                num = defaultValue;
            }
            return num;
        }

        public static float CSingle(object input)
        {
            return CSingle(input, 0f);
        }

        public static float CSingle(string input)
        {
            return CSingle(input, 0f);
        }

        public static float CSingle(object input, float defaultValue)
        {
            if (!Convert.IsDBNull(input) && !object.Equals(input, null))
            {
                return CSingle(input.ToString(), defaultValue);
            }
            return 0f;
        }

        public static float CSingle(string input, float defaultValue)
        {
            float num;
            if (!float.TryParse(input, out num))
            {
                num = defaultValue;
            }
            return num;
        }

        /// <summary>
        /// //预期正确率率
        /// </summary>
        /// <param name="f_difficulty"></param>
        /// <returns></returns>
        public static int GetExpectRate(int f_difficulty)
        {
            var i = 0;
            switch (f_difficulty)
            {
                case 1: i = 90; break;
                case 2: i = 85; break;
                case 3: i = 80; break;
                case 4: i = 75; break;
                case 5: i = 70; break;
                default:
                    break;
            }
            return i;
        }

        public static string GetDiffName(int diffID)
        {

            var diffName = "";
            if (diffID <= 20)
                diffName = "容易";
            else if (diffID <= 40)
                diffName = "较易";
            else if (diffID <= 60)
                diffName = "中等";
            else if (diffID <= 80)
                diffName = "较难";
            else if (diffID <= 100)
                diffName = "困难";
            return diffName;
        }

        public static string GetGradeIDStr(int GradeID)
        {
            var GradeIDStr = string.Empty;
            switch (GradeID)
            {
                case 1: GradeIDStr = "一年级"; break;
                case 2: GradeIDStr = "二年级"; break;
                case 3: GradeIDStr = "三年级"; break;
                case 4: GradeIDStr = "四年级"; break;
                case 5: GradeIDStr = "五年级"; break;
                case 6: GradeIDStr = "六年级"; break;
                case 7: GradeIDStr = "七年级"; break;
                case 8: GradeIDStr = "八年级"; break;
                case 9: GradeIDStr = "九年级"; break;
                default:
                    GradeIDStr = "高中"; break;
            }
            return GradeIDStr;
        }

        public static string GetStageIDStr(int StageID)
        {
            var StageIDStr = string.Empty;
            switch (StageID)
            {
                case 1: StageIDStr = "小学"; break;
                case 2: StageIDStr = "初中"; break;
                case 3: StageIDStr = "高中"; break;
                default:
                    break;
            }
            return StageIDStr;
        }

        public static string GetSubjectIDStr(int SubjectID)
        {
            var SubjectIDStr = string.Empty;
            switch (SubjectID)
            {
                case 1: SubjectIDStr = "语文"; break;
                case 2: SubjectIDStr = "数学"; break;
                case 3: SubjectIDStr = "英语"; break;
                case 4: SubjectIDStr = "物理"; break;
                case 5: SubjectIDStr = "化学"; break;
                case 6: SubjectIDStr = "地理"; break;
                case 7: SubjectIDStr = "历史"; break;
                case 8: SubjectIDStr = "政治"; break;
                case 9: SubjectIDStr = "生物"; break;
                default:
                    break;
            }
            return SubjectIDStr;
        }

        public static int GetGrade(string StageID)
        {
            var i = 0;
            switch (StageID.ToLower())
            {
                case "x": i = 1; break;
                case "c": i = 2; break;
                case "g": i = 3; break;
                default:
                    break;
            }
            return i;
        }

        public static string GetGrade(int StageID)
        {
            var i = string.Empty;
            switch (StageID)
            {
                case 1: i = "x"; break;
                case 2: i = "c"; break;
                case 3: i = "g"; break;
                default:
                    break;
            }
            return i;
        }

        /// <summary>
        /// 根据年级找到对应的阶段
        /// </summary>
        /// <param name="GradeID"></param>
        /// <returns></returns>
        public static int GetStageByGradeID(int GradeID)
        {
            var stageID = 0;
            switch (GradeID)
            {
                case 1:
                    stageID = 1;
                    break;
                case 2:
                    stageID = 1;
                    break;
                case 3:
                    stageID = 1;
                    break;
                case 4:
                    stageID = 1;
                    break;
                case 5:
                    stageID = 1;
                    break;
                case 6:
                    stageID = 1;
                    break;
                case 7:
                    stageID = 2;
                    break;
                case 8:
                    stageID = 2;
                    break;
                case 9:
                    stageID = 2;
                    break;
                case 10:
                    stageID = 3;
                    break;
                case 11:
                    stageID = 3;
                    break;
                case 12:
                    stageID = 3;
                    break;
            }
            return stageID;
        }

        /// <summary>
        /// 把数字转换成汉字的大写
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetBigCharacter(int key)
        {
            string bigchar = string.Empty;
            switch (key)
            {
                case 1:
                    bigchar = "一";
                    break;
                case 2:
                    bigchar = "二";
                    break;
                case 3:
                    bigchar = "三";
                    break;
                case 4:
                    bigchar = "四";
                    break;
                case 5:
                    bigchar = "五";
                    break;
                case 6:
                    bigchar = "六";
                    break;
                case 7:
                    bigchar = "七";
                    break;
                case 8:
                    bigchar = "八";
                    break;
                case 9:
                    bigchar = "九";
                    break;
                case 10:
                    bigchar = "十";
                    break;
                case 11:
                    bigchar = "十一";
                    break;
                case 12:
                    bigchar = "十二";
                    break;
                case 13:
                    bigchar = "十三";
                    break;
                case 14:
                    bigchar = "十四";
                    break;
                case 15:
                    bigchar = "十五";
                    break;
                case 16:
                    bigchar = "十六";
                    break;
                case 17:
                    bigchar = "十七";
                    break;
                case 18:
                    bigchar = "十八";
                    break;
                case 19:
                    bigchar = "十九";
                    break;
                case 20:
                    bigchar = "二十";
                    break;
                case 21:
                    bigchar = "二十一";
                    break;
                case 22:
                    bigchar = "二十二";
                    break;
                case 23:
                    bigchar = "二十三";
                    break;
                case 24:
                    bigchar = "二十四";
                    break;
                case 25:
                    bigchar = "二十五";
                    break;
                case 26:
                    bigchar = "二十六";
                    break;
                case 27:
                    bigchar = "二十七";
                    break;
                case 28:
                    bigchar = "二十八";
                    break;
                case 29:
                    bigchar = "二十九";
                    break;
                case 30:
                    bigchar = "三十";
                    break;
                case 31:
                    bigchar = "三十一";
                    break;
                case 32:
                    bigchar = "三十二";
                    break;
                case 33:
                    bigchar = "三十三";
                    break;
                case 34:
                    bigchar = "三十四";
                    break;
                case 35:
                    bigchar = "三十五";
                    break;
            }
            return bigchar;
        }

    }
}
