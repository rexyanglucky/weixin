using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    [Serializable]
    public class EI_MeasureItem
    {
        public EI_MeasureItem()
        { }

        #region 试题
        private int _ItemID;
        private int _MeasureID;
        private int _OrgID;
        private string _TempID;
        private int _TID;
        private int _ItemIndex;
        private int _MathIndex;
        private string _ItemBody;
        private string _ItemBodyOption;
        private string _ItemOption;
        private string _ItemScore;
        private string _AnswerItem;
        private float _AnswerScore;
        private int _DimID;
        private string _DimName;
        private string _DimRemark;
        private int _PatternID;
        private string _PatternName;
        private string _PatternTag;
        private string _PatternRemark;
        private DateTime _AddTime;
        private DateTime _LastEditTime;
        private int _IntervalTime;


        /// <summary>
        /// 答题ID
        /// </summary>
        public int ItemID
        {
            set { _ItemID = value; }
            get { return _ItemID; }
        }
        /// <summary>
        /// 测评ID
        /// </summary>
        public int MeasureID
        {
            set { _MeasureID = value; }
            get { return _MeasureID; }
        }
        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID
        {
            set { _OrgID = value; }
            get { return _OrgID; }
        }
        /// <summary>
        /// 测评学生临时ID
        /// </summary>
        public string TempID
        {
            set { _TempID = value; }
            get { return _TempID; }
        }
        /// <summary>
        /// 教师ID
        /// </summary>
        public int TID
        {
            set { _TID = value; }
            get { return _TID; }
        }
        /// <summary>
        /// 试题序号
        /// </summary>
        public int ItemIndex
        {
            set { _ItemIndex = value; }
            get { return _ItemIndex; }
        }
        /// <summary>
        /// 公式计算属性
        /// </summary>
        public int MathIndex
        {
            set { _MathIndex = value; }
            get { return _MathIndex; }
        }
        /// <summary>
        /// 试题内容
        /// </summary>
        public string ItemBody
        {
            set { _ItemBody = value; }
            get { return _ItemBody; }
        }

        public string ItemBodyOption
        {
            set { _ItemBodyOption = value; }
            get { return _ItemBodyOption; }
        }
        /// <summary>
        /// 选项(A,B,C,D)
        /// </summary>
        public string ItemOption
        {
            set { _ItemOption = value; }
            get { return _ItemOption; }
        }
        /// <summary>
        /// 分数（2,1,0,1）
        /// </summary>
        public string ItemScore
        {
            set { _ItemScore = value; }
            get { return _ItemScore; }
        }
        /// <summary>
        /// 作答的选项(A)
        /// </summary>
        public string AnswerItem
        {
            set { _AnswerItem = value; }
            get { return _AnswerItem; }
        }
        /// <summary>
        /// 得分
        /// </summary>
        public float AnswerScore
        {
            set { _AnswerScore = value; }
            get { return _AnswerScore; }
        }
        /// <summary>
        /// 维度ID
        /// </summary>
        public int DimID
        {
            set { _DimID = value; }
            get { return _DimID; }
        }
        /// <summary>
        /// 维度名称
        /// </summary>
        public string DimName
        {
            set { _DimName = value; }
            get { return _DimName; }
        }
        /// <summary>
        /// 维度备注
        /// </summary>
        public string DimRemark
        {
            set { _DimRemark = value; }
            get { return _DimRemark; }
        }
        /// <summary>
        /// 型ID
        /// </summary>
        public int PatternID
        {
            set { _PatternID = value; }
            get { return _PatternID; }
        }
        /// <summary>
        /// 型-名称
        /// </summary>
        public string PatternName
        {
            set { _PatternName = value; }
            get { return _PatternName; }
        }
        /// <summary>
        /// 型的标签
        /// </summary>
        public string PatternTag
        {
            set { _PatternTag = value; }
            get { return _PatternTag; }
        }
        /// <summary>
        /// 型的备注
        /// </summary>
        public string PatternRemark
        {
            set { _PatternRemark = value; }
            get { return _PatternRemark; }
        }
        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddTime
        {
            set { _AddTime = value; }
            get { return _AddTime; }
        }
        /// <summary>
        /// 最后一次修改时间
        /// </summary>
        public DateTime LastEditTime
        {
            set { _LastEditTime = value; }
            get { return _LastEditTime; }
        }
        /// <summary>
        /// 答题多少秒
        /// </summary>
        public int IntervalTime
        {
            set { _IntervalTime = value; }
            get { return _IntervalTime; }
        }
        #endregion


        #region  试卷


        private int _MeasureStatus;

        /// <summary>
        /// 状态：0无效，1开始作答，2答题完毕（有效测评）255删除；
        /// </summary>
        public int MeasureStatus
        {
            set { _MeasureStatus = value; }
            get { return _MeasureStatus; }
        }


        private int _ExamID;
        /// <summary>
        /// 试卷ID
        /// </summary>
        public int ExamID
        {
            set { _ExamID = value; }
            get { return _ExamID; }
        }

        private string _ExamName;
        /// <summary>
        /// 试卷名称
        /// </summary>
        public string ExamName
        {
            set { _ExamName = value; }
            get { return _ExamName; }
        }



        #endregion

    }
}
