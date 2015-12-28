using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;

namespace Mfg.EI.ViewModel
{
    public class SettedExamModel
    {

        public EI_Exam Exam { get; set; }

        /// <summary>
        /// 作业学生关联对象
        /// </summary>
        public List<EI_ERelS> ERelSList { get; set; }


        public List<EI_ERelI> ERelIList { get; set; }

        /// <summary>
        /// 题库的ViewModel
        /// </summary>

        //public List<QuestionAttrModel> QuestionAttrList { get; set; }

        public List<QuestionItemViewModel> QuestionAttrList { get; set; }


    }
}
