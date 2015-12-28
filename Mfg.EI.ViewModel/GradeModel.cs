
/*
 * author:杨礼文;
 * function:年级ViewModel
 * date:2015-04-19
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{

    public class GradeModel
    {
        public int? ID { get; set; }

        public String Name { get; set; }
    }


    public class  Styles
    {
        public int f_id { get; set; }

        public string f_bclass { get; set; }

        public string f_name { get; set; }

        public int f_styleareaid { get; set; }

        public string f_styleareaname { get; set; }

        public string f_subject { get; set; }
    }
}
