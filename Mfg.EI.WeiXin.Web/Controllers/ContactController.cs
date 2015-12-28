using System;
using System.Linq;
using System.Web.Mvc;
using Mfg.EI.WeiXin.ViewModel;
using Mfg.EI.ViewModel;
using Mfg.EI.InterFace;

namespace Mfg.EI.WeiXin.Web.Controllers
{
    public class ContactController : BaseController
    {
        private IFamilyInfo _FamilyInfo;
        private IStudent _Student;
        //private static log4net.ILog _log = log4net.LogManager.GetLogger("LogFile");
        public ContactController(IFamilyInfo FamilyInfo, IStudent Student)
            : base(new Authenticate.Authenticate(), new Mfg.EI.InterFace.WeiXin.WeiXin(new Mfg.EI.InterFace.HomeWork(new Mfg.EI.InterFace.Question()), new Mfg.EI.InterFace.Student(), new Mfg.EI.InterFace.ExamOnline(new Mfg.EI.InterFace.Question()), new Mfg.EI.InterFace.Wrong(new Mfg.EI.InterFace.Question())))
        {
            _FamilyInfo = FamilyInfo;
            _Student = Student;
        }
        //
        // GET: /Contact/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Guide()
        {
            return View();
        }
        [Check]
        /// <summary>
        /// 绑定学生信息
        /// </summary>
        /// <returns></returns>
        public ActionResult BindInfo()
        {
            try
            {
                string OpenId = string.Empty;
                if (_auth.WeiXinUser != null)
                {
                    OpenId = _auth.WeiXinUser.UserID;
                    var model = _WeiXin.GetBindInfo(OpenId, _auth.AppId.AppIds);
                    if (string.IsNullOrEmpty(model.StuName) & string.IsNullOrEmpty(model.StuAccount))
                    {
                        ViewBag.Title = "绑定学生信息";
                    }
                    else
                    {
                        ViewBag.Title = "修改学生信息";
                    }
                    model.WeiXin = OpenId;
                    return View(model);
                }
                else
                {
                    ViewBag.Title = "绑定学生信息";
                    return View(new RefStudent());
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 提交家长信息
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public JsonResult SubmitParent(RefStudent info)
        {
            bool result = false;
            try
            {

                var model = _Student.GetStudentInfo(info.StuAccount, info.StuName);
                if (model != null && !string.IsNullOrEmpty(model.Mfgid))
                {
                    FamilyInfoModel familyInfo = new FamilyInfoModel()
                    {
                        Phone = info.ParentPhone,
                        WeiXin = info.WeiXin,
                        Name = info.ParentName,
                        SID = info.StuAccount
                    };
                    result = _WeiXin.SubmitParentInfo(familyInfo);
                    //清空当前浏览器cookie，避免之前账号冲突
                    if (result)
                    {
                        _auth.CleareStudentCookie();
                        _auth.SetStudentCookie(info.StuAccount);
                    }
                }

            }
            catch (Exception ex)
            {
                Common.LogHelperNet.Error("", ex);
                //_log.Error(ex);
            }
            return Json(new { result });
        }
        [Login]
        /// <summary>
        /// 最新公告
        /// </summary>
        /// <returns></returns>
        public ActionResult Bulletin(int pageIndex = 0)
        {
            var OpenID = _auth.WeiXinUser.UserID;
            Bulletin model = new ViewModel.Bulletin();
            int totalCount = 0;
            model.BulletinList = _WeiXin.BulletinList(OpenID, pageIndex, out totalCount);
            if (totalCount > 10)
            {
                string _previous = string.Empty;
                string _next = string.Empty;
                int DataCount = 0;
                if (totalCount % 10 == 0) DataCount = totalCount / 10;
                else DataCount = totalCount / 10 + 1;
                string pcss = "bgskin";
                string ncss = "bgskin";
                if (pageIndex == 0)
                {
                    pcss = "bg9";

                }
                if (pageIndex == DataCount - 1)
                {
                    ncss = "bg9";
                }
                if (pageIndex > 0)
                {
                    _previous = @"href='/Contact/Bulletin.html?pageIndex=" + (pageIndex - 1) + "'";
                }
                if (pageIndex < DataCount)
                {
                    _next = @"href='/Contact/Bulletin.html?pageIndex=" + (pageIndex + 1) + "'";
                }
                model.Pager = @"<div class='tc'><a class='btn1 " + pcss + " colW' " + _previous + ">上一页</a><a class='btn1 " + ncss + " colW' " + _next + ">下一页</a></div>";
            }
            return View(model);
        }
        /// <summary>
        /// 公告详情
        /// </summary>
        /// <returns></returns>
        public ActionResult BulletinInfo(int Bid)
        {
            OrgBulletin model = _WeiXin.SingleInfo(Bid);
            ViewBag.Title = model.ContentTitle;
            return View(model);
        }
        [Login]
        /// <summary>
        /// 老师联系方式
        /// </summary>
        /// <returns></returns>
        public ActionResult Teacher()
        {
            var OpenID = _auth.WeiXinUser.UserID;
            var model = _WeiXin.TeacherList(OpenID);
            return View(model.ToList());
        }
        public ActionResult help()
        {
            return View();
        }
    }
}