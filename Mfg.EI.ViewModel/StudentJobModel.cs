/*
 * author:yangjin;
 * function:作业学生对应Viewmodel
 * date:2015-05-03
 * updateDate:2015-05-03
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 学生与作业关联实体
    /// </summary>
    public class StudentJobModel
    {
        /// <summary>
        /// 作业ID
        /// </summary>
        public string JobID { get; set; }

        public string JobName { get; set; }
        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 试题列表
        /// </summary>
        public List<StudentJobItemModel> Items { get; set; }

        /// <summary>
        /// 学生
        /// </summary>
        public StudentModel Student { get; set; }

        /// <summary>
        /// 作业状态 0未提交，1已提交，2已批改
        /// </summary>
        public int StuState { get; set; }
        /// <summary>
        ///总分
        /// </summary>
        public float TotalScore { get; set; }
        /// <summary>
        /// 答题总耗时
        /// </summary>
        public int TotalTime { get; set; }
        /// <summary>
        /// 排名
        /// </summary>
        public int Ranking { get; set; }
        /// <summary>
        /// 知识点列表
        /// </summary>
        public List<KnowledgePointModel> KnowledgeList { get; set; }

        public List<KnowledgeStudentModel> KnowledgeStudentList { get; set; }
        public int GradeID { get; set; }
        public string TeacherTotalComment { get; set; }

        public string StageId { get; set; }



        public List<ItemStyleModel> StyleList { get; set; }



    }

    public class ItemStyleModel
    {
        public int ItemStyle { get; set; }
        public int Count { get; set; }
        public string ItemTypeName { get; set; }
        public int Index { get; set; }
        public string IndexZw { get; set; }
    }

    /// <summary>
    /// 作业与学生回答关联实体
    /// </summary>
    public class StudentJobItemModel
    {
        /// <summary>
        /// guid
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 正确率，1正确，0错误，大于0小于1，半对
        /// </summary>
        public float Accuracy { get; set; }
        /// <summary>
        /// 当前job所有学生回答的此题平均正确率
        /// </summary>
        public float AvgAccuracy { get; set; }
        /// <summary>
        /// 序号
        /// </summary>
        public int SequenceID { get; set; }

        /// <summary>
        /// 电子作业ID  
        /// </summary>
        public string JobId { get; set; }

        /// <summary>
        /// 电子作业名称
        /// </summary>
        public string JobName { get; set; }

        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 题目ID
        /// </summary>
        public int ItemID { get; set; }

        /// <summary>
        /// 题干
        /// </summary>
        public string ItemName { get; set; }

        /// <summary>
        /// 题目纯文本
        /// </summary>
        public string ItemText { get; set; }
        /// <summary>
        /// 学生回答
        /// </summary>
        public string Answer { get; set; }

        /// <summary>
        /// 题目解析
        /// </summary>
        public string ItemAnaly { get; set; }

        /// <summary>
        /// 题目类型
        /// </summary>
        public ItemState ItemType { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }
        /// <summary>
        /// 题目得分
        /// </summary>
        public float Score { get; set; }

        /// <summary>
        /// 教师评语
        /// </summary>
        public string TeacherComment { get; set; }

        /// <summary>
        /// 题目分值
        /// </summary>
        public float FullScore { get; set; }

        /// <summary>
        /// 题目难度
        /// </summary>
        public int DiffNum { get; set; }

        public string RightAnswer { get; set; }
        /// <summary>
        /// 回答时间
        /// </summary>
        public string AnswerTime { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }
        /// <summary>
        /// 知识点名称
        /// </summary>
        public int KnowledgeID { get; set; }
        /// <summary>
        /// 学生笔记
        /// </summary>
        public string NoteContent { get; set; }
        /// <summary>
        /// 作业状态 0未提交，1已提交，2已批改
        /// </summary>
        public int StuState { get; set; }
        /// <summary>
        /// 年级ID
        /// </summary>
        public int GradeID { get; set; }

        public string Pager { get; set; }
        public string TeacherTotalComment { get; set; }

        public int IsTextAnswer { get; set; }
        public string ItemTypeName { get; set; }

        public int ItemStyle { get; set; }
        /// <summary>
        /// 题型排序
        /// </summary>
        public int OrderByIndex { get; set; }
    }
    /// <summary>
    /// job下知识点信息
    /// </summary>
    public class KnowledgePointModel
    {
        public string JobID { get; set; }
        public string ExamID { get; set; }
        public int PointID { get; set; }
        public string PointName { get; set; }
        //知识点总分
        public double TotalFullScore { get; set; }
        //学生实际得分
        public double TotalActuScore { get; set; }
        //最高分
        public double TopScore { get; set; }
        //平均掌握率
        public double AverageRate { get; set; }
        //最高掌握率
        public double TopRate { get; set; }


    }
    /// <summary>
    /// job下学生与知识点的关联信息
    /// </summary>
    public class KnowledgeStudentModel
    {
        public string JobID { get; set; }
        public string ExamID { get; set; }
        public string SID { get; set; }
        public int PointID { get; set; }
        public string PointName { get; set; }
        //学生实际得分
        public double ActuScore { get; set; }
        //知识点满分分值
        public double FullScore { get; set; }
        //当前学生掌握率
        public double MyRate { get; set; }

    }

    /// <summary>
    /// 学生错题详细
    /// </summary>
    public class StudentWrongItemModel
    {
        /// <summary>
        /// guid
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 正确率，1正确，0错误，大于0小于1，半对
        /// </summary>
        public float Accuracy { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int SequenceID { get; set; }


        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 题目ID
        /// </summary>
        public int ItemID { get; set; }

        /// <summary>
        /// 题干
        /// </summary>
        public string ItemName { get; set; }
        /// <summary>
        /// 学生回答
        /// </summary>
        public string Answer { get; set; }

        /// <summary>
        /// 题目解析
        /// </summary>
        public string ItemAnaly { get; set; }

        /// <summary>
        /// 题目类型
        /// </summary>
        public ItemState ItemType { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }


        /// <summary>
        /// 教师评语
        /// </summary>
        public string TeacherComment { get; set; }



        /// <summary>
        /// 题目难度
        /// </summary>
        public int DiffNum { get; set; }

        public string RightAnswer { get; set; }
        /// <summary>
        /// 知识点ID
        /// </summary>
        public int KnowledgeID { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 学生笔记
        /// </summary>
        public string NoteContent { get; set; }

        /// <summary>
        /// 0 同步学习，1电子作业，2在线考试，3弱项提分
        /// </summary>
        public int SourceType { get; set; }

        /// <summary>
        /// 是否掌握 0未掌握，1已掌握
        /// </summary>
        public int Tag { get; set; }

        /// <summary>
        /// 选项列表
        /// </summary>
        public string AnswerList { get; set; }


        public string AHistory { get; set; }

        public string ACount { get; set; }

        public object WrongCount { get; set; }
        public int IsTextAnswer { get; set; }

        public string Pager { get; set; }


        //V2 yagnjin 20151030  对应题目详细信息
        public QuestionItemViewModel QuestionItem { get; set; }
    }

}
