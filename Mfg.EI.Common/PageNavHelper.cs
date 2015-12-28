/*
 * author:杨礼文;
 * function:分页
 * date:2015-05-2
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Mfg.EI.Common
{
    public class PageNavHelper
    {

        public static string ShowPageNavigate(int pageSize, int? currentPage, int totalCount)
        {
            string redirectTo = "javascript:void(0)";
            currentPage = currentPage ?? 1;
            pageSize = (pageSize == 0 ? 8 : pageSize);
            var totalPages = Math.Max((totalCount + pageSize - 1) / pageSize, 1); //总页数
            var output = new StringBuilder();
            if (totalPages > 1)
            {
                if (currentPage == 1) //第一页
                {
                    output.Append("<a disabled='disabled'>首页</a>");
                    output.Append("<a disabled='disabled'>上一页</a>");
                }
                if (currentPage > 1)
                {
                    //处理首页连接
                    //处理上一页的连接
                    output.AppendFormat("<a href='{0}?pageIndex=1' class='pageLink'>首页</a>", redirectTo);
                    output.AppendFormat("<a href='{0}?pageIndex={1}' class='pageLink'>上一页</a>", redirectTo, currentPage - 1);
                }
                if (totalPages > 7)
                {
                    int currint = 3;
                    if (currentPage < 4)
                    {
                        for (int i = 0; i <= 6; i++)
                        {
                            if (currentPage == i + 1)
                            {
                                output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                            }
                            else
                            {
                                if (i == 6)
                                {
                                    output.AppendFormat(" <a href='{0}?pageIndex={1}' class='pageLink'>...</a>", redirectTo, 7);
                                }
                                else
                                {
                                    output.AppendFormat(" <span class='item'><a href='{0}?pageIndex={1}' class='pageLink'>{1}</a></span>", redirectTo, i + 1);
                                }
                            }
                        }
                    }
                    else if (currentPage >= 4 && currentPage < totalPages - 3)
                    {
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat("<a href='{0}?pageIndex={1}' class='pageLink'>...</a>", redirectTo, currentPage - 3);
                            }
                            else if (i == 3)//中间当前页
                            {
                                output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                            }
                            else if (i == 6)
                            {
                                output.AppendFormat("<a href='{0}?pageIndex={1}' class='pageLink'>...</a>", redirectTo, currentPage + 3);
                            }
                            else
                            {
                                output.AppendFormat(" <span class='item'><a href='{0}?pageIndex={1}' class='pageLink'>{1}</a></span>", redirectTo, currentPage + i - currint);
                            }
                        }
                    }
                    else
                    {
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat("<a href='{0}?pageIndex={1}' class='pageLink'>...</a>", redirectTo, totalPages - 6);
                            }
                            else
                            {
                                if (totalPages - 6 + i == currentPage)
                                {
                                    output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                                }
                                else
                                {
                                    output.AppendFormat(" <span class='item'><a href='{0}?pageIndex={1}' class='pageLink'>{1}</a></span>", redirectTo, totalPages - 6 + i);
                                }

                            }
                        }
                    }
                }
                else
                {
                    for (int i = 0; i < totalPages; i++)
                    {
                        if (currentPage == i + 1)
                        {
                            output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                        }
                        else
                        {
                            output.AppendFormat(" <span class='item'><a href='{0}?pageIndex={1}' class='pageLink'>{1}</a></span>", redirectTo, i + 1);
                        }
                    }
                }
                if (currentPage == totalPages) //最后一页
                {//处理下一页和尾页的链接 
                    output.Append("<a disabled='disabled'>下一页</a>");
                    output.Append("<a disabled='disabled'>尾页</a>");
                }
                if (currentPage < totalPages)
                {//处理下一页和尾页的链接 
                    output.AppendFormat("<a href='{0}?pageIndex={1}' class='pageLink'>下一页</a>", redirectTo, currentPage + 1);
                    output.AppendFormat("<a href='{0}?pageIndex={1}' class='pageLink'>尾页</a>", redirectTo, totalPages);
                }
                //output.Append("跳到<select id='sel'>");   //跳到第几页去掉
                //for (int i = 1; i <= totalPages; i++)
                //{
                //    if (i == currentPage)
                //    {
                //        output.AppendFormat("<option value='{0}' selected='selected'>{0}</option>", i);
                //    }
                //    else
                //    {
                //        output.AppendFormat("<option value='{0}'>{0}</option>", i);
                //    }
                //}
                //output.Append("</select>页");
            }
            return output.ToString();
        }

        public static string ShowPageNavigatePop(int pageSize, int? currentPage, int totalCount)
        {
            //redirectTo = "javascript:void(0)";
            currentPage = currentPage ?? 1;
            pageSize = (pageSize == 0 ? 8 : pageSize);
            var totalPages = Math.Max((totalCount + pageSize - 1) / pageSize, 1); //总页数
            var output = new StringBuilder();
            if (totalPages > 1)
            {
                if (currentPage == 1) //第一页
                {
                    output.Append("<a disabled='disabled'>首页</a>");
                    output.Append("<a disabled='disabled'>上一页</a>");
                }
                if (currentPage > 1)
                {
                    //处理首页连接
                    //处理上一页的连接
                    output.Append("<a data-pageIndex='1' class='pageLink'>首页</a>");
                    output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>上一页</a>", currentPage - 1);
                }
                if (totalPages > 7)
                {
                    int currint = 3;
                    if (currentPage < 4)
                    {
                        for (int i = 0; i <= 6; i++)
                        {
                            if (currentPage == i + 1)
                            {
                                output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                            }
                            else
                            {
                                if (i == 6)
                                {
                                    output.AppendFormat(" <a data-pageIndex='{0}' class='pageLink'>...</a>", 7);
                                }
                                else
                                {
                                    output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", i + 1);
                                }
                            }
                        }
                    }
                    else if (currentPage >= 4 && currentPage < totalPages - 3)
                    {
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>...</a>", currentPage - 3);
                            }
                            else if (i == 3)//中间当前页
                            {
                                output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                            }
                            else if (i == 6)
                            {
                                output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>...</a>", currentPage + 3);
                            }
                            else
                            {
                                output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", currentPage + i - currint);
                            }
                        }
                    }
                    else
                    {
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>...</a>", totalPages - 6);
                            }
                            else
                            {
                                if (totalPages - 6 + i == currentPage)
                                {
                                    output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                                }
                                else
                                {
                                    output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", totalPages - 6 + i);
                                }

                            }
                        }
                    }
                }
                else
                {
                    for (int i = 0; i < totalPages; i++)
                    {
                        if (currentPage == i + 1)
                        {
                            output.AppendFormat("<span class='cpb'>{0}</span>", currentPage);
                        }
                        else
                        {
                            output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", i + 1);
                        }
                    }
                }
                if (currentPage == totalPages) //最后一页
                {//处理下一页和尾页的链接 
                    output.Append("<a disabled='disabled'>下一页</a>");
                    output.Append("<a disabled='disabled'>尾页</a>");
                }
                if (currentPage < totalPages)
                {//处理下一页和尾页的链接 
                    output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>下一页</a>", currentPage + 1);
                    output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>尾页</a>", totalPages);
                }
                //output.Append("跳到<select id='sel'>");   //跳到第几页去掉
                //for (int i = 1; i <= totalPages; i++)
                //{
                //    if (i == currentPage)
                //    {
                //        output.AppendFormat("<option value='{0}' selected='selected'>{0}</option>", i);
                //    }
                //    else
                //    {
                //        output.AppendFormat("<option value='{0}'>{0}</option>", i);
                //    }
                //}
                //output.Append("</select>页");
            }
            return output.ToString();
        }

        /// <summary>
        /// bootstrap翻页
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        public static string ShowPagination(int pageSize, int? pageIndex, int totalCount)
        {

            pageIndex = pageIndex ?? 1;
            pageSize = (pageSize == 0 ? 10 : pageSize);
            var totalPages = Math.Max((totalCount + pageSize - 1) / pageSize, 1); //总页数
            var output = new StringBuilder();
            if (totalPages <= 0)
            {
                return "";
            }

            output.Append("<ul class='pagination' id='ulpagination'>");
            if (pageIndex == 1) //第一页
            {
                //output.Append("<a disabled='disabled'>首页</a>");
                //output.Append("<a disabled='disabled'>上一页</a>");

                output.Append("<li class='paginate_button previous disabled'><a disabled='disabled' aria-controls='example1' >首页</a></li> ");
                output.Append("<li class='paginate_button  disabled'><a disabled='disabled' aria-controls='example1'>上一页</a></li>");
            }
            if (pageIndex > 1)
            {
                //处理首页连接
                //处理上一页的连接
                //output.Append("<a data-pageIndex='1' class='pageLink'>首页</a>");
                //output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>上一页</a>", pageIndex - 1);

                output.Append("<li class='paginate_button previous'><a aria-controls='example1'  tabindex='1'>首页</a></li> ");
                output.AppendFormat("<li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>上一页</a></li> ", pageIndex - 1);
            }
            if (totalPages > 7)
            {
                int currint = 3;
                if (pageIndex < 4)
                {
                    for (int i = 0; i <= 6; i++)
                    {
                        if (pageIndex == i + 1)
                        {
                            //output.AppendFormat("<span class='cpb'>{0}</span>", pageIndex);
                            output.AppendFormat(" <li class='paginate_button active'><a disabled='disabled'  aria-controls='example1'tabindex='{0}'>{0}</a></li> ", pageIndex);
                        }
                        else
                        {
                            if (i == 6)
                            {
                                //output.AppendFormat(" <a data-pageIndex='{0}' class='pageLink'>...</a>", 7);
                                output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>...</a></li> ", 7);
                            }
                            else
                            {
                                //output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", i + 1);
                                output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>{0}</a></li> ", i + 1);
                            }
                        }
                    }
                }
                else if (pageIndex >= 4 && pageIndex < totalPages - 3)
                {
                    for (int i = 0; i <= 6; i++)
                    {
                        if (i == 0)
                        {
                            //output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>...</a>", pageIndex - 3);
                            output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>...</a></li> ", pageIndex - 3);
                        }
                        else if (i == 3)//中间当前页
                        {
                            //output.AppendFormat("<span class='cpb'>{0}</span>", pageIndex);
                            output.AppendFormat(" <li class='paginate_button active'><a disabled='disabled' aria-controls='example1'tabindex='{0}'>{0}</a></li> ", pageIndex);
                        }
                        else if (i == 6)
                        {
                            //output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>...</a>", pageIndex + 3);
                            output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>...</a></li> ", pageIndex + 3);
                        }
                        else
                        {
                            //output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", pageIndex + i - currint);
                            output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>{0}</a></li> ", pageIndex + i - currint);
                        }
                    }
                }
                else
                {
                    for (int i = 0; i <= 6; i++)
                    {
                        if (i == 0)
                        {
                            //output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>...</a>", totalPages - 6);
                            output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>...</a></li> ", totalPages - 6);
                        }
                        else
                        {
                            if (totalPages - 6 + i == pageIndex)
                            {
                                //output.AppendFormat("<span class='cpb'>{0}</span>", pageIndex);
                                output.AppendFormat(" <li class='paginate_button active'><a disabled='disabled' aria-controls='example1' tabindex='{0}'>{0}</a></li> ", pageIndex);
                            }
                            else
                            {
                                //output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", totalPages - 6 + i);
                                output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>{0}</a></li> ", totalPages - 6 + i);
                            }

                        }
                    }
                }
            }
            else
            {
                for (int i = 0; i < totalPages; i++)
                {
                    if (pageIndex == i + 1)
                    {
                        //output.AppendFormat("<span class='cpb'>{0}</span>", pageIndex);
                        output.AppendFormat(" <li class='paginate_button active'><a disabled='disabled' aria-controls='example1' tabindex='{0}'>{0}</a></li> ", pageIndex);
                    }
                    else
                    {
                        //output.AppendFormat(" <span class='item'><a data-pageIndex='{0}' class='pageLink'>{0}</a></span>", i + 1);
                        output.AppendFormat(" <li class='paginate_button '><a aria-controls='example1' tabindex='{0}'>{0}</a></li> ", i + 1);
                    }
                }
            }
            if (pageIndex == totalPages) //最后一页
            {
                //处理下一页和尾页的链接 
                //output.Append("<a disabled='disabled'>下一页</a>");
                //output.Append("<a disabled='disabled'>尾页</a>");

                output.Append("<li class='paginate_button  disabled'><a disabled='disabled' aria-controls='example1' >下一页</a></li> ");
                output.Append("<li class='paginate_button next  disabled'><a disabled='disabled' aria-controls='example1'>尾页</a></li>");
            }
            if (pageIndex < totalPages)
            {
                //处理下一页和尾页的链接 
                //output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>下一页</a>", pageIndex + 1);
                //output.AppendFormat("<a data-pageIndex='{0}' class='pageLink'>尾页</a>", totalPages);

                output.AppendFormat("<li class='paginate_button '><a aria-controls='example1' tabindex='{0}' >下一页</a></li> ", pageIndex + 1);
                output.AppendFormat("<li class='paginate_button next '><a aria-controls='example1' tabindex='{0}'>尾页</a></li>", totalPages);
            }
            //output.Append("跳到<select id='sel'>");   //跳到第几页去掉
            //for (int i = 1; i <= totalPages; i++)
            //{
            //    if (i == currentPage)
            //    {
            //        output.AppendFormat("<option value='{0}' selected='selected'>{0}</option>", i);
            //    }
            //    else
            //    {
            //        output.AppendFormat("<option value='{0}'>{0}</option>", i);
            //    }
            //}
            //output.Append("</select>页");

            output.Append("</ul>");

            return output.ToString();
        }

    }
}
