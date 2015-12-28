using Mfg.EI.Entity;
using System.Globalization;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 教学日志
    /// </summary>
    public class TeachDiaryModel : EI_TeachDiary
    {
        /// <summary>
        /// 1为左；2为中；3为右
        /// </summary>
        public byte ViewDiary { get; set; }

        /// <summary>
        /// 标题（时间）
        /// </summary>
        public string TopTitleDay
        {
            get
            {
                return CreateTime.Value.ToString("M月dd日");
            }
        }

        /// <summary>
        /// 标题（星期）
        /// </summary>
        public string TopTitleWeek
        {
            get
            {
                return CultureInfo.CurrentCulture.DateTimeFormat.GetDayName(CreateTime.Value.DayOfWeek);
            }
        }

        /// <summary>
        /// 是否有数据
        /// </summary>
        public bool IsEmpty { get; set; }
    }
}
