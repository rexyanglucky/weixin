
/*
 * author:杨礼文;
 * function:年级接口
 * date:2015-04-19
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Common;
using Mfg.EI.DAL;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public class Grade : IGrade
    {
        private GradeDal _gradeDal = new GradeDal();

        public Grade()
        {

        }


        #region 根据条件获取数据列表
        /// <summary>
        /// 根据条件获取数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        public List<EI_Grade> GetGradeList(string strwhere)
        {
            var dataSet = _gradeDal.GetList(strwhere);
            return ModelConvertHelper<EI_Grade>.ConvertToModelList(dataSet.Tables[0]);
        }
        #endregion


        #region 根据条件获取年级ViewModel数据列表
        /// <summary>
        /// 根据条件获取年级ViewModel数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        public List<GradeModel> GetGradeViewModelList(string strwhere)
        {
            var dataSet = _gradeDal.GetList(strwhere);
            List<EI_Grade> modelList = ModelConvertHelper<EI_Grade>.ConvertToModelList(dataSet.Tables[0]);
            List<GradeModel> gradeModels = new List<GradeModel>();
            foreach (var model in modelList)
            {
                gradeModels.Add(new GradeModel()
                                            {
                                                ID = model.ID,
                                                Name = model.Name
                                            });
            }
            return gradeModels;
        }
        #endregion

    }



}
