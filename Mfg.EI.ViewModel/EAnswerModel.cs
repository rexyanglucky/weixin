

/*
 * author:杨礼文;
 * function:试卷试题答案ViewModel
 * date:2015-05-14
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class EAnswerModel
    {

        public EAnswerModel()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _sid;
        private string _tid;
        private string _eid;
        private int? _itemid = 0;
        private string _answer;
        private float? _score = 0f;
        private string _answertime;
        private string _review;
        private string _notecontent;
        private float? _accuracy = 0f;
        private DateTime? _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;
        private bool _isTextAnswer;

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
        public string SID
        {
            set { _sid = value; }
            get { return _sid; }
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
        public string EID
        {
            set { _eid = value; }
            get { return _eid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ItemID
        {
            set { _itemid = value; }
            get { return _itemid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Answer
        {
            set { _answer = value; }
            get { return _answer; }
        }
        /// <summary>
        /// 
        /// </summary>
        public float? Score
        {
            set { _score = value; }
            get { return _score; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string AnswerTime
        {
            set { _answertime = value; }
            get { return _answertime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Review
        {
            set { _review = value; }
            get { return _review; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string NoteContent
        {
            set { _notecontent = value; }
            get { return _notecontent; }
        }
        /// <summary>
        /// 
        /// </summary>
        public float? Accuracy
        {
            set { _accuracy = value; }
            get { return _accuracy; }
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
        public bool IsTextAnswer
        {
            get { return _isTextAnswer; }
            set { _isTextAnswer = value; }
        }
        #endregion Model

       
    }
}
