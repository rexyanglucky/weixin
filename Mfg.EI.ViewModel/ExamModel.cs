/*
 * author:杨礼文;
 * function:考试ViewModel
 * date:2015-05-07
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class ExamModel
    {
        public ExamModel()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _name;
        private int? _gradeid = 0;
        private int? _subjectid = 0;
        private DateTime? _endtime = DateTime.Now;
        private int _examTime;
        private int? _state = 0;
        private string _tid = "0";
        private DateTime? _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;
        // public int StageID;

        /// <summary>
        /// 
        /// </summary>
        public string ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Name
        {
            set { _name = value; }
            get { return _name; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? GradeID
        {
            set { _gradeid = value; }
            get { return _gradeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? SubjectID
        {
            set { _subjectid = value; }
            get { return _subjectid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? EndTime
        {
            set { _endtime = value; }
            get { return _endtime; }
        }


        public int ExamTime
        {
            set { _examTime = value; }
            get { return _examTime; }

        }

        /// <summary>
        /// 
        /// </summary>
        public int? State
        {
            set { _state = value; }
            get { return _state; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string TID
        {
            set { _tid = value; }
            get { return _tid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DelFlag
        {
            set { _delflag = value; }
            get { return _delflag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Remark
        {
            set { _remark = value; }
            get { return _remark; }
        }
        public int StageID
        {
            get;
            set;
        }
        #endregion Model


        public Int64 StuCount { get; set; }//布置人数
        public Int64 CompleteCount { get; set; }//已完成人数
        public Int64 ItemCount { get; set; }//题目数量
        public double SumScore { get; set; }//学生考试成绩
        public string GradeName { get; set; } //年级
        public string SubjectName { get; set; } //科目
        public string Tname { get; set; }//老师名称
        public int StuState { get; set; }//学生作业状态,0未提交，1已提交和2已批改

        public DateTime UpdateTime { get; set; }//更新时间

        /// <summary>
        /// 作业与题目连接表【EI_JRelI】
        /// </summary>
        public List<ERelItemModel> ExamrelItemList { get; set; }

        /// <summary>
        ///  JRelSModel:电子作业与学生连接表
        /// </summary>
        public List<ERelSModel> ErelsList { get; set; }

        public List<TeaEReltModel> TeaEreltList { get; set; }

        /// <summary>
        /// 题库集合
        /// </summary>
        public List<QuestionAttrModel> QuestionList { get; set; }

        /// <summary>
        /// ID集合
        /// </summary>
        public List<JRItem> ScoreList { get; set; }


        /// <summary>
        /// //排序集合
        /// </summary>
        public List<JRIndex> IndexList { get; set; }


        public Int64 IsCorrecting { get; set; } //有无批改  (0:有批改  1无批改)
        public Int64 IsAnalysis { get; set; } //有无分析  (0:有分析   1无分析 )

    }

    public class ExamInfoModel : InfoBaseModel
    {

        /// <summary>
        /// 选择题数
        /// </summary>
        public int SelectCount { get; set; }

        /// <summary>
        /// 填空题数
        /// </summary>
        public int FillCount { get; set; }

        /// <summary>
        /// 解答题数
        /// </summary>
        public int AnswerCont { get; set; }


        /// <summary>
        /// 合计多少题
        /// </summary>
        public int TotalCount { get { return SelectCount + FillCount + AnswerCont; } }


        //public string ID { get; set; }

        ///// <summary>
        ///// 小年级
        ///// </summary>
        //public int GradeID { get; set; }
        ///// <summary>
        ///// 大年级
        ///// </summary>
        //public int StageID { get; set; }

        //public string GradeIDMappingBig
        //{
        //    get
        //    {
        //        switch (GradeID)
        //        {
        //            case 1:
        //            case 2:
        //            case 3:
        //            case 4:
        //            case 5:
        //            case 6: return "x";
        //            case 7:
        //            case 8:
        //            case 9: return "c";
        //            case 10:
        //            case 11:
        //            case 12: return "g";
        //            default:
        //                return string.Empty;
        //        }
        //    }
        //}

        //public string GradeIDMapping
        //{
        //    get
        //    {
        //        switch (GradeID)
        //        {
        //            case 1: return "x1";
        //            case 2: return "x2";
        //            case 3: return "x3";
        //            case 4: return "x4";
        //            case 5: return "x5";
        //            case 6: return "x6";
        //            case 7: return "c1";
        //            case 8: return "c2";
        //            case 9: return "c3";
        //            case 10: return "g1";
        //            case 11: return "g2";
        //            case 12: return "g3";
        //            default:
        //                return string.Empty;
        //        }
        //    }
        //}

        //public string GradeName
        //{
        //    get
        //    {
        //        switch (GradeID)
        //        {
        //            case 1: return "一年级";
        //            case 2: return "二年级";
        //            case 3: return "三年级";
        //            case 4: return "四年级";
        //            case 5: return "五年级";
        //            case 6: return "六年级";
        //            case 7: return "七年级";
        //            case 8: return "八年级";
        //            case 9: return "九年级";
        //            case 10: return "高一";
        //            case 11: return "高二";
        //            case 12: return "高三";
        //            default:
        //                return string.Empty;
        //        }
        //    }
        //}

        //public int SubjectID { get; set; }

        //public string SubjectIDMapping
        //{
        //    get
        //    {
        //        return "0" + SubjectID.ToString();
        //    }
        //}

        //public string SubjectName
        //{
        //    get
        //    {
        //        switch (SubjectID)
        //        {
        //            case 1: return "语文";
        //            case 2: return "数学";
        //            case 3: return "英语";
        //            case 4: return "物理";
        //            case 5: return "化学";
        //            case 6: return "地理";
        //            case 7: return "历史";
        //            case 8: return "政治";
        //            case 9: return "生物";
        //            default:
        //                return string.Empty;
        //        }
        //    }
        //}

        ///// <summary>
        ///// 学制,0五四制，1六三制
        ///// </summary>
        //public int AcaStru { get; set; }

        ///// <summary>
        ///// 0:理科，1:文科，2:不分文理
        ///// </summary>
        //public int ArtSciences { get; set; }

        ///// <summary>
        ///// 教材版本
        ///// </summary>
        //public string MaterialID { get; set; }

        //public bool IsHighSchool
        //{
        //    get
        //    {
        //        if (GradeID >= 10)
        //            return true;
        //        else return false;
        //    }
        //}

        ///// <summary>
        ///// 小学、初中为1、高中为2
        ///// </summary>
        //public int HighSchoolFlag
        //{
        //    get
        //    {
        //        if (GradeID >= 10) return 2;
        //        else return 1;
        //    }
        //}

        /// <summary>
        /// 题目详细--每一个作业对应的作业
        /// </summary>
        public List<ERelIGetModel> list { get; set; }

        /// <summary>
        /// 选修集合
        /// </summary>
        public List<Mfg.Resource.Entity.Tchmaterial> electiveList { get; set; }


    }

    /// <summary>
    /// 老师布置对象模型
    /// </summary>
    public class TeaEReltModel
    {
        public string EID { get; set; }

        public string TID { get; set; }

        public string StuState { get; set; }
    }

}
