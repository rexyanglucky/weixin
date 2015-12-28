using Mfg.EI.Entity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class StuDiaryModel : EI_StuDiary
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
                return CreateDay.ToString("M月dd日");
            }
        }

        /// <summary>
        /// 标题（星期）
        /// </summary>
        public string TopTitleWeek
        {
            get
            {
                return CultureInfo.CurrentCulture.DateTimeFormat.GetDayName(CreateDay.DayOfWeek);
            }
        }

        /// <summary>
        /// 是否有数据
        /// </summary>
        public bool IsEmpty { get; set; }
    }


    /// <summary>
    /// 学生学习任务
    /// </summary>
    public class StuInitModel
    {
        /// <summary>
        /// 同步练习
        /// </summary>
        public List<SyncJobModel> SyncJobsA { get; set; }

        /// <summary>
        /// 弱项提分
        /// </summary>
        public List<SyncJobModel> SyncJobsB { get; set; }


        /// <summary>
        /// 教师布置
        /// </summary>
        public List<JobModel> Jobs { get; set; }

        /// <summary>
        /// 错题
        /// </summary>
        public List<WrongModel> Wrongs { get; set; }



    }
}
