/*
 * author:杨礼文;
 * function:家庭信息接口
 * date:2015-04-20
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public interface IFamilyInfo
    {

        #region 根据条件获取数据列表

        /// <summary>
        /// 根据条件获取数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        List<EI_FamilyInfo> GetGradeList(string strwhere);
        #endregion

        #region 根据条件获取年级ViewModel数据列表

        /// <summary>
        /// 根据条件获取年级ViewModel数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        List<FamilyInfoModel> GetFamViewModelList(string strwhere);

        #endregion

        #region 写入家长信息
        string SubmitParentInfo(FamilyInfoModel model, string MfgID);
        #endregion
    }
}
