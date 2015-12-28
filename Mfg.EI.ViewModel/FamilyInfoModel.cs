/*
 * author:杨礼文;
 * function:家庭信息ViewModel
 * date:2015-04-20
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class FamilyInfoModel
    {
        public int ID { get; set; }

        public string SID { get; set; }
        public string Relationship { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Phone { get; set; }

        public string WeiXin { get; set; }

    }
}
