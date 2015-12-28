using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Security.Policy;
using Mfg.EI.Entity;
using Mfg.Resouce.Models;

namespace Mfg.EI.ViewModel
{
    #region local Model
    /// <summary>
    /// 教案  针对每一课次的备课
    /// </summary>
    public class PrepareLessonsModel
    {

        #region 私有变量
        private long _planindexid;
        private long _planid;
        private string _numbername;
        private string _titlename;
        private byte _indexstatus;
        private short _inumber;
        private Int32 _readnumber;
        private Int32 _printnumber;
        private DateTime _createtime = DateTime.MinValue;
        #endregion
        #region 公共属性
        /// <summary>
        /// 主键 节课属性(NOT NULL)
        /// </summary>
        public long PlanIndexID
        {
            set { _planindexid = value; }
            get { return _planindexid; }
        }
        /// <summary>
        /// 计划ID(NOT NULL)
        /// </summary>
        public long PlanID
        {
            set { _planid = value; }
            get { return _planid; }
        }
        /// <summary>
        /// 节点名称（第几次课）(NOT NULL)
        /// </summary>
        public string NumberName
        {
            set { _numbername = value; }
            get { return _numbername; }
        }
        /// <summary>
        /// 教案名称(NOT NULL)
        /// </summary>
        public string TitleName
        {
            set { _titlename = value; }
            get { return _titlename; }
        }
        /// <summary>
        /// 状态：0末开始；1进行中；2已完成
        /// </summary>
        public byte IndexStatus
        {
            set { _indexstatus = value; }
            get { return _indexstatus; }
        }
        /// <summary>
        /// 次课序号(NOT NULL)
        /// </summary>
        public short INumber
        {
            set { _inumber = value; }
            get { return _inumber; }
        }
        /// <summary>
        /// 查看总次数(NOT NULL)
        /// </summary>
        public Int32 ReadNumber
        {
            set { _readnumber = value; }
            get { return _readnumber; }
        }
        /// <summary>
        /// 打印预览次数(NOT NULL)
        /// </summary>
        public Int32 PrintNumber
        {
            set { _printnumber = value; }
            get { return _printnumber; }
        }
        /// <summary>
        /// 是否有效：1是；0否(NOT NULL)
        /// </summary>
        public bool IsEffect { set; get; }

        /// <summary>
        /// 是否显示标题(NOT NULL)
        /// </summary>
        public bool IsTitle { set; get; }

        /// <summary>
        /// 是否显示引入；1是；0否(NOT NULL)
        /// </summary>
        public bool IsFirst { set; get; }

        /// <summary>
        /// 是否显示学习目标(NOT NULL)
        /// </summary>
        public bool IsTarget { set; get; }

        /// <summary>
        /// 是否显示困难度；1是；0否(NOT NULL)
        /// </summary>
        public bool IsDiff { set; get; }

        /// <summary>
        /// 是否显示总结(NOT NULL)
        /// </summary>
        public bool IsSummary { set; get; }

        /// <summary>
        /// 课堂引入
        /// </summary>
        public string FirstMark { set; get; }

        /// <summary>
        /// 教学目标
        /// </summary>
        public string TargetMark { set; get; }

        /// <summary>
        /// 重难点分析
        /// </summary>
        public string DiffMark { set; get; }

        /// <summary>
        /// 方法与总结
        /// </summary>
        public string SummaryMark { set; get; }

        /// <summary>
        /// 打印预览教师ID列表，格式为（123,456,678）
        /// </summary>
        public string PrintTID { set; get; }

        /// <summary>
        /// 打印预览时间，格式为：('2015-4-5','2016-5-4')
        /// </summary>
        public string PrintTime { set; get; }

        /// <summary>
        /// 创建时间(NOT NULL)
        /// </summary>
        public DateTime CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }

        public bool IsTeach { get; set; }
        #endregion

        /// <summary>
        /// 知识点考法列表
        /// </summary>
        public List<PlanPointModel> PlanPointsList = new List<PlanPointModel>();

        /// <summary>
        /// 教学计划
        /// </summary>
        public ei_plan Plan = new ei_plan();

        /// <summary>
        /// 难度设置 教案难度；容易题1；较易题2；中等题3；较难题4；困难题5
        /// </summary>
        public byte DiffLever { get; set; }

        /// <summary>
        /// 讲练比例设置 讲练比例；多讲型1；多练型2；中间型3；
        /// </summary>
        public byte PlanLever { get; set; }

        /// <summary>
        /// 题数设置
        /// </summary>
        public int ItemNumber { get; set; }

        /// <summary>
        /// 课程侧重设置 1突出重点; 2全面周到; 3二者兼顾
        /// </summary>
        public byte CourseLever { get; set; }
        //是否设计过教案
        public bool IsInit { get; set; }
    }

    /// <summary>
    /// 知识点考法
    /// </summary>
    public class PlanPointModel
    {


        #region 构造函数

        /// <summary>
        /// 实体 教学过程--模板
        /// </summary>


        public PlanPointModel()
        {
        }

        #endregion

        #region 私有变量

        private long _planpointsid;
        private long _planid;
        private long _planindexid;
        private long _parentid;
        private Int32 _egnumber;
        private Int32 _worknumber;
        private string _pointid;
        private string _pointname;
        private Int32 _pointindex;
        private DateTime _createtime;

        #endregion

        #region 公共属性

        /// <summary>
        /// 主键 计划详细ID(NOT NULL)
        /// </summary>
        public long PlanPointsID
        {
            set { _planpointsid = value; }
            get { return _planpointsid; }
        }

        /// <summary>
        /// 计划ID(NOT NULL)
        /// </summary>
        public long PlanID
        {
            set { _planid = value; }
            get { return _planid; }
        }

        /// <summary>
        /// 节课ID(NOT NULL)
        /// </summary>
        public long PlanIndexID
        {
            set { _planindexid = value; }
            get { return _planindexid; }
        }

        /// <summary>
        /// 父ID
        /// </summary>
        public long ParentID
        {
            set { _parentid = value; }
            get { return _parentid; }
        }

        /// <summary>
        /// 是否有效：1是；0否(NOT NULL)
        /// </summary>
        public bool IsEffect { get; set; }

        /// <summary>
        /// 是否根节点：1是；0否(NOT NULL)
        /// </summary>
        public bool IsRoot { get; set; }

        /// <summary>
        /// 是否叶子节点：1是；0否(NOT NULL)
        /// </summary>
        public bool IsLeaf { get; set; }

        /// <summary>
        /// 当前层级(NOT NULL)
        /// </summary>
        public byte CurrentLever { get; set; }

        /// <summary>
        /// 是否有子节点：1是；0否(NOT NULL)
        /// </summary>
        public bool IsHas { get; set; }

        /// <summary>
        /// 例题总数量(NOT NULL)
        /// </summary>
        public Int32 EgNumber
        {
            set { _egnumber = value; }
            get { return _egnumber; }
        }

        /// <summary>
        /// 练习总数量(NOT NULL)
        /// </summary>
        public Int32 WorkNumber
        {
            set { _worknumber = value; }
            get { return _worknumber; }
        }

        /// <summary>
        /// 试题总数量(NOT NULL) 作为判断标识
        /// </summary>
        public Int32 QuestionNumber { set; get; }

        /// <summary>
        /// 试题总数量(NOT NULL) 不作为判断标识
        /// </summary>
        public Int32 QuestionCount { set; get; }


        /// <summary>
        /// 重要等级：1一般、2重要、3非常重要、4不重要
        /// </summary>
        public string KeyLevel { get; set; }

        /// <summary>
        /// 知识点ID(NOT NULL)
        /// </summary>
        public string PointID
        {
            set { _pointid = value; }
            get { return _pointid; }
        }

        /// <summary>
        /// 知识点名称(NOT NULL)
        /// </summary>
        public string PointName
        {
            set { _pointname = value; }
            get { return _pointname; }
        }

        /// <summary>
        /// 排序(NOT NULL)
        /// </summary>
        public Int32 PointIndex
        {
            set { _pointindex = value; }
            get { return _pointindex; }
        }

        /// <summary>
        /// 添加时间(NOT NULL)
        /// </summary>
        public DateTime CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }

        #endregion

        /// <summary>
        /// 题目列表 例题 练习题
        /// </summary>
        public List<PlanQuestionItemsModel> PlanQuestionItemsList = new List<PlanQuestionItemsModel>();

        /// <summary>
        /// 当前知识点的教学目标
        /// </summary>
        public string TargetMark { get; set; }

        public bool IsShow { get; set; }

        /// <summary>
        /// 父节点 知识点ID
        /// </summary>
        public int ParentPointId { get; set; }


        public int PointIdInt(int subjectId)
        {
            return Convert.ToInt32(PointID);
            //var p = ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery("0" + subjectId).FindOneByPointId(PointID);
            //if (p != null)
            //{
            //    return p.f_sec;
            //}
            //else
            //{
            //    return 0;
            //}
        }
    }


    /// <summary>
    /// 题目
    /// </summary>
    public class PlanQuestionItemsModel
    {

        #region 私有变量
        private long _detailid;
        private long _planpointsid;
        private byte _pointtype;
        private Int32 _itemid;
        private Int32 _itemindex;
        private DateTime _createtime;
        #endregion

        #region 公共属性
        /// <summary>
        /// 主键 试题详细表ID(NOT NULL)
        /// </summary>
        public long DetailID
        {
            set { _detailid = value; }
            get { return _detailid; }
        }
        /// <summary>
        /// 教学过程ID(NOT NULL)
        /// </summary>
        public long PlanPointsID
        {
            set { _planpointsid = value; }
            get { return _planpointsid; }
        }
        /// <summary>
        /// 例题为1；练习为2；(NOT NULL)
        /// </summary>
        public byte PointType
        {
            set { _pointtype = value; }
            get { return _pointtype; }
        }
        /// <summary>
        /// 试题ID(NOT NULL)
        /// </summary>
        public Int32 ItemID
        {
            set { _itemid = value; }
            get { return _itemid; }
        }
        /// <summary>
        /// 排序(NOT NULL)
        /// </summary>
        public Int32 ItemIndex
        {
            set { _itemindex = value; }
            get { return _itemindex; }
        }
        /// <summary>
        /// 添加时间(NOT NULL)
        /// </summary>
        public DateTime CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        /// <summary>
        /// 计划ID
        /// </summary>
        public long PlanID { get; set; }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool IsEffect { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }
        /// <summary>
        /// 试题body
        /// </summary>
        public string ItemName { get; set; }

        /// <summary>
        /// 试题分析
        /// </summary>
        public string ItemAnaly { get; set; }
        /// <summary>
        /// 题型名称 
        /// </summary>
        /// </summary>
        public string ItemTypeName { get; set; }
        /// <summary>
        /// 大题型
        /// </summary>
        public ItemState ItemType { get; set; }
        /// <summary>
        /// 小题型
        /// </summary>
        public int ItemStyle { get; set; }
        /// <summary>
        /// 正确答案    
        /// </summary>
        public string RightAnswer { get; set; }

        /// <summary>
        /// 难度
        /// </summary>
        public int Difficulty { get; set; }

        #endregion


        public bool IsShow { get; set; }
    }
    #endregion


    #region resource Model
    /// <summary>
    /// 知识点
    /// </summary>
    public class SecTestQuestion
    {
        public int f_id;
        /// <summary>
        /// 名称
        /// </summary>
        public string f_name { get; set; }

        /// <summary>
        /// 大年级
        /// </summary>
        public string f_class { get; set; }

        /// <summary>
        /// 考法与试题
        /// </summary>
        public List<TestInfoQuestion> Tlsit { set; get; }


        /// <summary>
        /// 例题列表
        /// </summary>
        public string f_exampleqlist { get; set; }
        /// <summary>
        /// 练习题列表
        /// </summary>
        public string f_workqlist { get; set; }
        /// <summary>
        /// 教学目标
        /// </summary>
        public string f_jiaoyan { set; get; }

        /// <summary>
        /// 重要程度
        /// </summary>
        public string f_keyordiff { set; get; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="?"></param>
        public SecTestQuestion(Mfg.Resouce.Models.SecTestQuestion resourceModel)
        {
            this.f_id = resourceModel.f_id;

            this.f_name = resourceModel.f_name;

            this.f_class = resourceModel.f_class;

            this.Tlsit = resourceModel.Tlsit.Select(m => new TestInfoQuestion(m)).ToList();

            this.f_exampleqlist = resourceModel.secmainqlist == null ? "" : resourceModel.secmainqlist.f_exampleqlist;
            this.f_workqlist = resourceModel.secmainqlist == null ? "" : resourceModel.secmainqlist.f_workqlist;


            this.f_jiaoyan = resourceModel.f_jiaoyan;

            this.f_keyordiff = resourceModel.f_keyordiff;
        }

        public SecTestQuestion()
        {
        }

    }
    /// <summary>
    /// 
    /// </summary>
    public class TestInfoQuestion
    {
        public TestInfoQuestion(Mfg.Resouce.Models.TestInfoQuestion resourceModel)
        {
            this.f_id = resourceModel.f_id;
            this.f_name = resourceModel.f_name;
            this.f_qidlist = resourceModel.f_qidlist;
            this.f_kaogang = resourceModel.f_kaogang;
            this.f_termfreq = resourceModel.f_termfreq;
            this.f_middlefreq = resourceModel.f_middlefreq;
            this.f_pointtype = resourceModel.f_pointtype;
            this.f_diff = resourceModel.f_diff;
            this.f_keylevel = resourceModel.f_keylevel;
            this.f_num = resourceModel.f_num;
            this.Qlsit = resourceModel.Qlsit.Select(m => new TestQuestion(m)).ToList();
        }

        public int f_id { get; set; }
        /// <summary>
        ///考法名称，添加的时候注意重复判断
        /// </summary>
        public string f_name { set; get; }
        /// <summary>
        /// 考法例题
        /// </summary>
        public string f_qidlist { set; get; }
        /// <summary>
        /// 考纲要求：了解、知道、理解、掌握、运用
        /// </summary>
        public string f_kaogang { set; get; }
        /// <summary>
        /// 学期考频：不考、少考、选考、常考、必考
        /// </summary>
        public string f_termfreq { set; get; }
        /// <summary>
        /// 中考考频：不考、少考、选考、常考、必考
        /// </summary>
        public string f_middlefreq { set; get; }
        /// <summary>
        /// 考法类型：1 独立考法，2 从属考点
        /// </summary>
        public string f_pointtype { set; get; }
        /// <summary>
        /// 考法的难度:默认 0
        /// </summary>
        public string f_diff { set; get; }
        /// <summary>
        /// 重要等级：1一般、2重要、3非常重要、4不重要
        /// </summary>
        public string f_keylevel { set; get; }

        /// <summary>
        /// 建议数量
        /// </summary>       
        public int f_num { set; get; }
        public List<TestQuestion> Qlsit { set; get; }

        /// <summary>
        /// 父节点ID
        /// </summary>
        public int ParentPointId { get; set; }
        /// <summary>
        /// 父节点名称
        /// </summary>
        public string ParentPointName { get; set; }
    }

    public class TestQuestion
    {
        public TestQuestion(Mfg.Resouce.Models.TestQuestion resourceModel)
        {
            this.f_id = resourceModel.f_id;
            this.f_difficulty = resourceModel.f_difficulty;
            this.f_maintest = resourceModel.f_maintest;
            this.f_testdiff = resourceModel.f_testdiff;
        }


        /// <summary>
        /// 试题id
        /// </summary>
        public int f_id { set; get; }

        /// <summary>
        /// 难度
        /// </summary>
        public int f_difficulty { set; get; }
        /// <summary>
        /// 考法
        /// </summary>
        public int f_maintest { set; get; }
        /// <summary>
        /// '','容易','较易','中等','较难','困难'
        /// </summary>
        public string f_testdiff { set; get; }


        public int f_testdiffInt
        {
            get
            {
                var diffdesc = 1;
                switch (f_testdiff)
                {
                    case "容易":
                        diffdesc = 1;
                        break;
                    case "较易":
                        diffdesc = 2;
                        break;
                    case "中等":
                        diffdesc = 3;
                        break;
                    case "较难":
                        diffdesc = 4;
                        break;
                    case "困难":
                        diffdesc = 5;
                        break;
                }

                return diffdesc;
            }
        }
    }



    #endregion


    /// <summary>
    /// 智能换题
    /// </summary>
    public class TeachCenterQuestionRandModel
    {

        /// <summary>
        /// 科目ID
        /// </summary>
        public string SubjectID { get; set; }
        /// <summary>
        /// 题型区域的id
        /// </summary>
        public int styleareid { get; set; }

        public string pointid { get; set; }

        /// <summary>
        /// 主知识点id
        /// </summary>

        public int mainsecid
        {
            get
            {
                return Convert.ToInt32(pointid);
                //var p = ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery("0" + Convert.ToInt32(SubjectID)).FindOneByPointId(pointid);
                //if (p != null)
                //{
                //    return p.f_sec;
                //}
                //else
                //{
                //    return 0;
                //}
            }
        }
        /// <summary>
        /// 小年级
        /// </summary>
        public string grade { get; set; }

        /// <summary>
        /// 试题ID
        /// </summary>
        public int fid { get; set; }

        /// <summary>
        /// 不需要进行随机的id序列
        /// </summary>
        public string noidlist { get; set; }

        public Int64 DetailID { get; set; }

        public byte PointType { get; set; }


        public int stage { get; set; }

        /// <summary>
        /// 考法ID
        /// </summary>
        public int kfId { get; set; }

        public int diff { get; set; }
    }


}

