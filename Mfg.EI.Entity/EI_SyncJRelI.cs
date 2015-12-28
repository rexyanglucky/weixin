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
    ///EI_SyncJRelI: 同步学习作业与题目连接表【EI_SyncJRelI】
    /// </summary>
   public   class EI_SyncJRelI
    {
       /// <summary>
       /// 
       /// </summary>
       private string _jid=string.Empty;

       /// <summary>
       /// 
       /// </summary>
       private int? _seqiemceID=0;

       /// <summary>
       /// 
       /// </summary>
       private int? _itemid=0;

       /// <summary>
       /// 
       /// </summary>
       private int? _itemtype=0;

       /// <summary>
       /// 
       /// </summary>
       private int? _knowledgeid=0;

       /// <summary>
       /// 
       /// </summary>
       private string _knowledgename=string.Empty;

       /// <summary>
       /// 
       /// </summary>
       public string JID
       {
           set{_jid=value;}
           get{return _jid;}
       }

       public int? SequenceID
       {
           set{_seqiemceID=value;}
           get{return _seqiemceID;}
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
       public int? ItemType
       {
           set{_itemtype=value;}
           get{return _itemtype;}
       }
       
       public int? KnowledgeID
        {
            set { _knowledgeid = value; }
            get { return _knowledgeid; }
        }

       /// <summary>
       /// 
       /// </summary>
       public string KnowledgeName
       {
           set { _knowledgename = value; }
           get { return _knowledgename; }
       }



    }
}
