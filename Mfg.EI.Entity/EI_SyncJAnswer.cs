/*
 * author:谢利民;
 * function:公告表【EI_Announcement】实体类
 * adddate:2015-05-13
 * updatedate:2015-05-13
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_SyncJAnswer:同步学习作业答题表【EI_SyncJAnswer】
    /// </summary>
    public   class EI_SyncJAnswer
    {
        /// <summary>
        /// 
        /// </summary>
        private string _id=string.Empty;

        /// <summary>
        /// 
        /// </summary>
        private string _sid=string.Empty;

        /// <summary>
        /// 
        /// </summary>
        private string _jid=string.Empty;

     
        /// <summary>
        /// 
        /// </summary>
        private int? _itemid=0;
           /// <summary>
        /// 
        /// </summary>
        private string _answer=string.Empty;

        /// <summary>
        /// 
        /// </summary>
        private string _answertime=string.Empty;

        /// <summary>
        /// 
        /// </summary>
        private string _notecontent=string.Empty;

        /// <summary>
        /// 
        /// </summary>
        private float _accuracy=0;
        /// <summary>
        /// 
        /// </summary>
        private DateTime _createtime = DateTime.Now;
        /// <summary>
        /// 
        /// </summary>
        private int? _delflag = 0;
        /// <summary>
        /// 
        /// </summary>
        private string _remark;
        
        /// <summary>
        /// 
        /// </summary>
        private string _accumulated=string.Empty;
        
        /// <summary>
        /// 
        /// </summary>
        public string ID
        {
            set{_id=value;}
            get{return _id;}
        }
       /// <summary>
       /// 
       /// </summary>
 
     public string SID
     {
         set{_sid=value;}
         get{return _sid;}
     }
        /// <summary>
        /// 
        /// </summary>
        public string JID
        {
            set{_jid=value;}
            get{return _jid;}
        }

        /// <summary>
        /// 
        /// </summary>
        public int? ItemID
        {
            set{_itemid=value;}
            get{return _itemid;}
        }

        /// <summary>
        /// 
        /// </summary>
        public string Answer
        {
            set{_answer=value;}
            get{return _answer;}
        }

        public string AnswerTime
        {
            set{_answertime=value;}
            get{return _answertime;}
        }

        /// <summary>
        /// 
        /// </summary>
        public string NoteContent
        {
            set{_notecontent=value;}
            get{return _notecontent;}
        }

        /// <summary>
        /// 
        /// </summary>
        public float Accuracy
        {
            set{_accuracy=value;}
            get{return _accuracy;}
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime CreateTime
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

        /// <summary>
        /// 
        /// </summary>
        public string Accumulated
        {

            set { _accumulated = value; }
            get { return _accumulated; }
        }

        public string SubjectID { get; set; }
    }
}
