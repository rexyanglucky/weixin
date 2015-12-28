/*
 * author:杨礼文;
 * function:考试学生对应Viewmodel
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
    /// 学生与考试关联实体
    /// </summary>
    public class StudentExamModel
    {
        //年级ID
        public int GradeID;

        /// <summary>
        /// 考试ID
        /// </summary>
        public string ExamID { get; set; }

        public string ExamName { get; set; }
        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 试题列表
        /// </summary>
        public List<StudentExamItemModel> Items { get; set; }

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

        public string TeacherTotalComment { get; set; }



        public string StageId { get; set; }

        public List<ItemStyleModel> StyleList { get; set; }
    }
    /// <summary>
    /// 考试与学生回答关联实体
    /// </summary>
    public class StudentExamItemModel
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
        /// 当前Exam所有学生回答的此题平均正确率
        /// </summary>
        public float AvgAccuracy { get; set; }
        /// <summary>
        /// 序号
        /// </summary>
        public int SequenceID { get; set; }

        /// <summary>
        /// 考试ID  
        /// </summary>
        public string ExamId { get; set; }

        /// <summary>
        /// 电子作业名称
        /// </summary>
        public string ExamName { get; set; }

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

        public string ItemText { get; set; }
        public int GradeID { get; set; }
        public string TeacherTotalComment { get; set; }
        public int IsTextAnswer { get; set; }

        public string Pager { get; set; }
        public string ItemTypeName { get; set; }
        public int ItemStyle { get; set; }
        public int OrderByIndex { get; set; }
    }
}
