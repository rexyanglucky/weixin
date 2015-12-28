/*
 * author:杨礼文;
 * function:魔方格用户信息Model
 * date:2015-05-04
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class MfgUserInfoModel
    {

        //{"PId":64042904,
        //"PAlias":"小明",
        //"PSex":"男",
        //"PPhone":"",
        //"PInClass":"x1",
        //"PEdu":1,
        //"PSchool":0,
        //"PSchoolName":"",
        //"PBirthday":"1899-12-31 16:00:00",
        //"PQq":"",
        //"PAddress":"",
        //"PPhoto":"",
        //"PWl":0}


        public string PId { get; set; }
        public string PAlias { get; set; }
        public string PSex { get; set; }


        public string QPhone { get; set; }

        public string QSchoolName { get; set; }

        public string PPhone { get; set; }
        public string PInClass { get; set; }
        public int PEdu { get; set; }
        public int PSchool { get; set; }
        public string PSchoolName { get; set; }
        public string PBirthday { get; set; }
        public string PQq { get; set; }
        public string PAddress { get; set; }
        public string PPhoto { get; set; }
        public int PWl { get; set; }

        public string Index { get; set; }

        public Int32 r { get; set; }

    }
}
