using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.Resource.Entity;

namespace Mfg.EI.ViewModel
{
    public class QuestionExtModel : QuestionExt
    {
        public int IsCollcet { get; set; }//是否已收藏 (0已收藏,1为收藏)
    }
}
