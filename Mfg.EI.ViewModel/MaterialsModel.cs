
/*
 * author:杨礼文;
 * function:教材ViewModel
 * date:2015-04-19
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Mfg.Resource.Entity;
using Mfg.Resouce.Models;

namespace Mfg.EI.ViewModel
{
    public class MaterialsModel
    {

        //<param name="conn"></param>
        //   <param name="userid"></param>
        //   <param name="inclass">小年级</param>
        //   <param name="term">学期</param>
        //   <param name="wl">文理</param>
        //   <param name="book01"></param>
        //   <param name="book02"></param>
        //   <param name="book03"></param>
        //   <param name="book04"></param>
        //   <param name="book05"></param>
        //   <param name="book06"></param>
        //   <param name="book07"></param>
        //   <param name="book08"></param>
        //   <param name="book09"></param>
        //   <returns>成功返回1，操作失败返回-1，用户不存在返回-2 今年修改的次数已达到六次 -3</returns>

        #region 魔方格
        public int Userid { get; set; }
        public string Inclass { get; set; }
        public int Term { get; set; }
        public int Wl { get; set; }

        public int Edu { get; set; }

        public string Book01 { get; set; }
        public string Book02 { get; set; }
        public string Book03 { get; set; }
        public string Book04 { get; set; }
        public string Book05 { get; set; }
        public string Book06 { get; set; }
        public string Book07 { get; set; }
        public string Book08 { get; set; }
        public string Book09 { get; set; }

        public string BookName01 { get; set; }
        public string BookName02 { get; set; }
        public string BookName03 { get; set; }
        public string BookName04 { get; set; }
        public string BookName05 { get; set; }
        public string BookName06 { get; set; }
        public string BookName07 { get; set; }
        public string BookName08 { get; set; }
        public string BookName09 { get; set; }


        public List<Edition> EditonList { get; set; }//教材列表

        #endregion



        #region 机构  需要转换成mfg的  Inclass年级 Wl文理
        public int GradeID { get; set; }//年级
        public int AcaStru { get; set; }  //@*学制,0五四制，1六三制，2文科，3理科，4不分文理*@




        #endregion

    }
}
