using Mfg.Resouce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 题库资源ViewModel   
    /// </summary>
    public class ResQuestionViewModel : QuestionPage
    {
        /// <summary>
        /// 标签收藏
        /// </summary>
        public List<TagModel> ListCollectMark { get; set; }


        /// <summary>
        /// 是否在试题蓝
        /// </summary>
        public int IsInQuestionBox { get; set; }

       
    }
}
