/*
 * author:杨礼文;
 * function:作业布置ViewModel
 * adddate:2015-05-06
 */



using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;

namespace Mfg.EI.ViewModel
{
    public class SettedModel
    {
        public EI_Job job { get; set; }

        /// <summary>
        /// 作业学生关联对象
        /// </summary>
        public List<EI_JRelS> jRelSList { get; set; }


        public List<EI_JRelI> JRelIList { get; set; }

        /// <summary>
        /// 题库的ViewModel
        /// </summary>
        public List<QuestionItemViewModel> QuestionAttrList { get; set; }

        //public List<QuestionItemViewModel> QuestionAttrListV2 { get; set; }


    }
}
