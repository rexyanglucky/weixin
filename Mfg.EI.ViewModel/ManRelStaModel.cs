using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class ManRelStaModel
    {

        /// <summary>
        /// 教师ID
        /// </summary>
        public int? TID { set; get; }

        /// <summary>
        /// 阶段ID
        /// </summary>
        public int? StageID { set; get; }


        /// <summary>
        /// 科目ID
        /// </summary>
        public int? SubjectID { get; set; }

        /// <summary>
        /// 教材ID
        /// </summary>
        public string MaterialID { get; set; }

        public string Name { get; set; }

        public string StageIDName { get; set; }

        public string SubjectIDName { get; set; }

        public string MaterialIDName { get; set; }

        public int TempID { get; set; }

        public string StageIDMapping { get; set; }

        public string SubjectIDMapping { get; set; }

        public string MaterialIDMapping { get; set; }


        public string SubjectName { get; set; }

        /// <summary>
        /// 学制,1五四制，0六三制
        /// </summary>
        public int AcaStru { get; set; }

        /// <summary>
        /// 文理0---理科1---文科2---不分学科
        /// </summary>
        public int ArtSciences { get; set; }

        public Int32 IsTeach { get; set; }
    }

}
