
/*
 * author:杨礼文;
 * function:年级接口
 * date:2015-04-19
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public interface IGrade
    {

        #region 根据条件获取数据列表
        /// <summary>
        /// 根据条件获取数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        List<EI_Grade> GetGradeList(string strwhere);

        #endregion


        #region 根据条件获取年级ViewModel数据列表
        /// <summary>
        /// 根据条件获取年级ViewModel数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        List<GradeModel> GetGradeViewModelList(string strwhere);
        #endregion
    }
}
