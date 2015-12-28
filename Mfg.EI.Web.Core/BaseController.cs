using System.Web.Routing;
using Mfg.EI.Authenticate;
using System;
using System.Web.Mvc;
using Mfg.EI.Common;
using Mfg.EI.InterFace;
using System.Text.RegularExpressions;

namespace Mfg.EI.Web.Core
{
    public class BaseController : Controller
    {
        protected readonly IAuthenticate _auth;
        private IHomeWork _homeWork = new HomeWork(new Question());
        private IExamOnline _examOnline = new ExamOnline(new Question());

        /// <summary>
        /// 基类构造方法
        /// </summary>
        public BaseController(IAuthenticate auth)
        {
            try
            {
                this._auth = auth;
                if (IsLogin)
                {
                    if (MfgUser != null)
                    {
                        //ViewBag.Skin = MfgUser.OrgSkin;
                        //ViewBag.LogoUrl = MfgUser.LogoUrl;
                        //ViewBag.JRelSCount = _homeWork.GetEI_JRelSCount(MfgUser.RoleType, MfgUser.UserID);
                        //ViewBag.ERelSCount = _examOnline.GetEI_ERelSCount(MfgUser.RoleType, MfgUser.UserID);
                        ViewBag.RoleType = MfgUser.RoleType;
                        ViewBag.UserName = MfgUser.UserName;
                        ViewBag.UserId = MfgUser.LoginAccountNumber;
                        ViewBag.OrgID = MfgUser.OrgID.ToString();

                    }
                }
                else
                {
                    // RedirectToAction("Index", "Login");
                }
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("BaseController 读取信息失败", ex);
                throw ex;
            }
        }


        /// <summary>
        /// 用户是否登录
        /// </summary>
        public bool IsLogin
        {
            get
            {
                return _auth.IsSignIn;
            }
        }

        /// <summary>
        /// 获取当前登录人的用户编号
        /// </summary>
        public int UserID
        {
            get
            {
                if (MfgUser != null)
                {
                    //未登录用户为0
                    if (!IsLogin)
                        return 0;
                    return
                        MfgUser.UserID;
                }
                else
                {
                    if (!IsLogin)
                        return 0;
                    else
                        return MfgUser.UserID;


                }
            }
        }
        /// <summary>
        /// 获取当前登录人的简单信息
        /// </summary>
        public MfgUser MfgUser
        {
            get
            {
                if (!IsLogin) return new MfgUser();
                return _auth.MfgUser;
            }
        }
        /// <summary>
        /// 获取当前登录人的登录名
        /// </summary>
        public string UserName
        {
            get
            {
                if (!IsLogin) return null;
                return MfgUser.UserName;
            }
        }
        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID
        {
            get
            {
                //未登录用户为0
                if (!IsLogin) return 0;
                return MfgUser.OrgID;
            }
        }



        #region 作废

        //protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        //{
        //    base.Initialize(requestContext);
        //    AddLog("Initialize");
        //}

        //protected override void OnAuthorization(AuthorizationContext filterContext)
        //{
        //    base.OnAuthorization(filterContext);
        //    AddLog("OnAuthorization");
        //}


        //protected override void OnActionExecuting(ActionExecutingContext filterContext)
        //{
        //    base.OnActionExecuting(filterContext);
        //    AddLog("OnActionExecuting");
        //}


        //protected override void EndExecute(IAsyncResult asyncResult)
        //{
        //    base.EndExecute(asyncResult);
        //    AddLog("EndExecute");
        //}


        //protected override void EndExecuteCore(IAsyncResult asyncResult)
        //{
        //    base.EndExecuteCore(asyncResult);
        //    AddLog("EndExecuteCore");
        //}


        //protected override void OnActionExecuted(ActionExecutedContext filterContext)
        //{
        //    base.OnActionExecuted(filterContext);
        //    AddLog("OnActionExecuted");
        //}

        //protected override void OnResultExecuting(ResultExecutingContext filterContext)
        //{
        //    base.OnResultExecuting(filterContext);
        //    AddLog("OnResultExecuting");
        //}


        //protected override void OnResultExecuted(ResultExecutedContext filterContext)
        //{
        //    base.OnResultExecuted(filterContext);
        //    AddLog("OnResultExecuted");
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    base.Dispose(disposing);
        //    AddLog("Dispose");
        //}

        //protected override void OnException(ExceptionContext filterContext)
        //{
        //    base.OnException(filterContext);
        //    AddLog("OnException");
        //}

        //protected override void Execute(System.Web.Routing.RequestContext requestContext)
        //{
        //    base.Execute(requestContext);
        //    AddLog("Execute");
        //}

        //protected override void ExecuteCore()
        //{
        //    base.ExecuteCore();
        //    AddLog("ExecuteCore");
        //}

        //protected override void HandleUnknownAction(string actionName)
        //{
        //    base.HandleUnknownAction(actionName);
        //    AddLog("HandleUnknownAction");
        //}


        //public void AddLog(string name)
        //{
        //    LogHelperNet.Info(string.Format("{0}开始:{1}", name, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff ")), null);

        //} 
        #endregion

        #region 重写JSON方法
        ///// <summary>
        ///// 返回JsonResult
        ///// </summary>
        ///// <param name="data">数据</param>
        ///// <param name="contentType">内容类型</param>
        ///// <param name="contentEncoding">内容编码</param>
        ///// <param name="behavior">行为</param>
        ///// <returns>JsonReuslt</returns>
        //protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        //{
        //    return new CustomJsonResult
        //    {
        //        Data = data,
        //        ContentType = contentType,
        //        ContentEncoding = contentEncoding,
        //        JsonRequestBehavior = behavior,
        //        FormateStr = "yyyy-MM-dd HH:mm:ss"
        //    };
        //}

        /// <summary>
        /// 返回JsonResult.         /// </summary>
        /// <param name="data">数据</param>
        /// <param name="behavior">行为</param>
        /// <param name="format">json中dateTime类型的格式</param>
        /// <returns>Json</returns>
        protected JsonResult MyJson(object data, JsonRequestBehavior behavior, string format)
        {
            return new CustomJsonResult
            {
                Data = data,
                JsonRequestBehavior = behavior,
                FormateStr = format
            };
        }
        public JsonResult EIJson(object data, JsonRequestBehavior behavior)
        {
            return new BaseJsonResult() { Data = data, JsonRequestBehavior = behavior };
        }

        /// <summary>
        /// 返回JsonResult         /// </summary>
        /// <param name="data">数据</param>
        /// <param name="format">数据格式</param>
        /// <returns>Json</returns>
        protected JsonResult EIJsonFormat(object data, string format, JsonRequestBehavior behavior)
        {
            return new CustomJsonResult
            {
                Data = data,
                FormateStr = format,
                JsonRequestBehavior = behavior
            };
        }
        #endregion

    }


}
