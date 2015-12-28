
/*
 * author:杨礼文;
 * function:学生档案ViewModel
 * date:2015-04-19
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mfg.EI.Entity;

namespace Mfg.EI.ViewModel
{
    public class StudentArchivesModel
    {

        public StudentArchivesModel()
        {
        }


        public string MfgID { get; set; }
        public string Shool { get; set; }
        public string Class { get; set; }
        public string MasterName { get; set; }
        public string MasterPhone { get; set; }
        public string Name { get; set; }
        public int? Gender { get; set; }

        public string ImgUrl { get; set; }

        public string CardNumber { get; set; }

        public string QQ { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public DateTime? BirthDate { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? AcaStru { set; get; }

        #region 年级
        public int? GradeID { get; set; }
        public List<GradeModel> GradeList { get; set; }
        #endregion


        #region 年月日
        public string YearID { get; set; }
        public List<YearModel> YearList { get; set; }
        public string MonthID { get; set; }
        public List<MonthModel> MonthList { get; set; }
        public string DayID { get; set; }
        public List<DayModel> DayList { get; set; }
        #endregion


        public List<FamilyInfoModel> FamilyList { get; set; }

        public List<EnterScoreModel> EnterScore { get; set; }


        public string Level { get; set; }

        public DateTime? ExpirDate { get; set; }
        public DateTime? CreateTime { get; set; }

        public int? SType { get; set; }//
        public string STypeName { get; set; }//

        public List<StudentGroup> GroupName { get; set; }
        public List<EI_MRelS> RelTeac { get; set; }

        /// <summary>
        /// 激活时间
        /// </summary>
        public DateTime? ActivationTime { get; set; }
    }




}