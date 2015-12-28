using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mfg.EI.InterFace.WeiXin;
namespace Mfg.EI.WeiXin.Web.Controllers
{
    public class HomeController : Controller
    {
        [Check]
        public ActionResult Menu()
        {
            return View();
        }
        public ActionResult CheckWeiXin()
        {
            return View();
        }
        public ActionResult Error()
        {
            return View();
        }
        public ActionResult WriteOpenId()
        {
            //var OpenId=WeiXinHelper.OpenId;
            //if (string.IsNullOrEmpty(OpenId)) base.JumpError();
            //_auth.SetWeiXinCookie(OpenId);
            return View();
        }
    }
}
