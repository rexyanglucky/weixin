/*
 * author:杨礼文;
 * function:作业ViewModel
 * date:2015-04-29
 */



using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class JobModel
    {

        public string T { get; set; }

        public int StageID { get; set; }

        /// <summary>
        /// 作业ID
        /// </summary>
        public string ID
        {
            set;
            get;
        }

        /// <summary>
        /// 作业名称
        /// </summary>
        public string Name
        {
            set;
            get;
        }

        /// <summary>
        /// 年级ID
        /// </summary>
        public int? GradeID
        {
            set;
            get;
        }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int? SubjectID
        {
            set;
            get;
        }

        /// <summary>
        /// 截止时间
        /// </summary>
        public DateTime? EndTime
        {
            set;
            get;
        }


        /// <summary>
        /// 状态标识
        /// </summary>
        public int? State
        {
            set;
            get;
        }

        /// <summary>
        /// 教师ID
        /// </summary>
        public string TID
        {
            set;
            get;
        }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime
        {
            set;
            get;
        }
        /// <summary>
        /// 是否启用 默认值为0
        /// </summary>
        public int? DelFlag
        {
            set;
            get;
        }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark
        {
            set;
            get;
        }

        /// <summary>
        /// 作业与题目连接表【EI_JRelI】
        /// </summary>
        public List<JobRelItemModel> JobrelItemList { get; set; }

        /// <summary>
        ///  JRelSModel:电子作业与学生连接表
        /// </summary>
        public List<JRelSModel> JrelsList { get; set; }

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


        public int Redirect { get; set; }
    }

    public class InfoBaseModel
    {
        public string Mversion { get; set; }

        public int OrgID { get; set; }

        public int IsTeach { get; set; }

        public string UID { get; set; }

        public string ID { get; set; }

        /// <summary>
        /// 小年级
        /// </summary>
        public int GradeID { get; set; }
        /// <summary>
        /// 大年级
        /// </summary>
        public int StageID { get; set; }

        public string GradeIDMappingBig
        {
            get
            {
                switch (GradeID)
                {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6: return "x";
                    case 7:
                    case 8:
                    case 9: return "c";
                    case 10:
                    case 11:
                    case 12: return "g";
                    default:
                        return string.Empty;
                }
            }
        }

        public string GradeIDMapping
        {
            get
            {
                switch (GradeID)
                {
                    case 1: return "x1";
                    case 2: return "x2";
                    case 3: return "x3";
                    case 4: return "x4";
                    case 5: return "x5";
                    case 6: return "x6";
                    case 7: return "c1";
                    case 8: return "c2";
                    case 9: return "c3";
                    case 10: return "g1";
                    case 11: return "g2";
                    case 12: return "g3";
                    default:
                        return string.Empty;
                }
            }
        }

        public string GradeName
        {
            get
            {
                switch (GradeID)
                {
                    case 1: return "一年级";
                    case 2: return "二年级";
                    case 3: return "三年级";
                    case 4: return "四年级";
                    case 5: return "五年级";
                    case 6: return "六年级";
                    case 7: return "七年级";
                    case 8: return "八年级";
                    case 9: return "九年级";
                    case 10: return "高一";
                    case 11: return "高二";
                    case 12: return "高三";
                    default:
                        return string.Empty;
                }
            }
        }

        public int SubjectID { get; set; }

        public string SubjectIDMapping
        {
            get
            {
                return "0" + SubjectID.ToString();
            }
        }

        public string SubjectName
        {
            get
            {
                switch (SubjectID)
                {
                    case 1: return "语文";
                    case 2: return "数学";
                    case 3: return "英语";
                    case 4: return "物理";
                    case 5: return "化学";
                    case 6: return "地理";
                    case 7: return "历史";
                    case 8: return "政治";
                    case 9: return "生物";
                    default:
                        return string.Empty;
                }
            }
        }

        /// <summary>
        /// 学制,0五四制，1六三制
        /// </summary>
        public int AcaStru { get; set; }

        /// <summary>
        /// 0:理科，1:文科，2:不分文理
        /// </summary>
        public int ArtSciences { get; set; }

        /// <summary>
        /// 教材版本
        /// </summary>
        public string MaterialID { get; set; }

        public bool IsHighSchool
        {
            get
            {
                if (GradeID >= 10)
                    return true;
                else return false;
            }
        }

        /// <summary>
        /// 小学、初中为1、高中为2
        /// </summary>
        public int HighSchoolFlag
        {
            get
            {
                if (GradeID >= 10) return 2;
                else return 1;
            }
        }
    }

    public class JobInfoModel : InfoBaseModel
    {
        /// <summary>
        /// 题目详细--每一个作业对应的作业
        /// </summary>
        public List<JRelIGetModel> list { get; set; }

        /// <summary>
        /// 选修集合
        /// </summary>
        public List<Mfg.Resouce.Models.Tchmaterial> electiveList { get; set; }

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


    }

    public class TagPointPageParaModelSearch
    {

        public int allCount { get; set; }

        public string SubjectID { get; set; }

        public bool enableTag { get; set; }

        public int ItemType { get; set; }

        public int DiffNum { get; set; }

        public int TagID { get; set; }

        public int TID { get; set; }

        public int CurrentIndex { get; set; }

        public int PageSize { get; set; }

        public bool T { get; set; }

        public string StageID { get; set; }
    }



    public class TagPointPageParaModel
    {
        public int SubjectID { get; set; }


        public int ItemType { get; set; }

        public int DiffNum { get; set; }

        public int TagID { get; set; }

        public int TID { get; set; }

        public int CurrentIndex { get; set; }

        public int PageSize { get; set; }

        public bool T { get; set; }

        public int StageID { get; set; }
    }

    public class TagPointPageModel
    {
        public int PageTotal { get; set; }

        public string pageNavigate { get; set; }

        public List<TagPointPageResponseModel> List { get; set; }
    }
}
