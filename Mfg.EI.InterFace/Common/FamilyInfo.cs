/*
 * author:杨礼文;
 * function:家庭信息接口
 * date:2015-04-20
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

    public class FamilyInfo : IFamilyInfo
    {
        private FamilyInfoDal _familyInfoDal = new FamilyInfoDal();
        private StudentInfoDal _studentInfoDal = new StudentInfoDal();
        public FamilyInfo()
        {

        }

        #region 根据条件获取数据列表
        /// <summary>
        /// 根据条件获取数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        public List<EI_FamilyInfo> GetGradeList(string strwhere)
        {
            var dataSet = _familyInfoDal.GetList(strwhere);
            return ModelConvertHelper<EI_FamilyInfo>.ConvertToModelList(dataSet.Tables[0]);
        }
        #endregion


        #region 根据条件获取年级ViewModel数据列表
        /// <summary>
        /// 根据条件获取年级ViewModel数据列表
        /// </summary>
        /// <param name="strwhere"></param>
        /// <returns></returns>
        public List<FamilyInfoModel> GetFamViewModelList(string strwhere)
        {
            var dataSet = _familyInfoDal.GetList(strwhere);
            List<EI_FamilyInfo> modelList = ModelConvertHelper<EI_FamilyInfo>.ConvertToModelList(dataSet.Tables[0]);
            List<FamilyInfoModel> gradeModels = new List<FamilyInfoModel>();

            int n = 0;
            foreach (var model in modelList)//固定四个
            {
                gradeModels.Add(new FamilyInfoModel()
                {
                    SID = model.SID,
                    Relationship = model.Relationship,
                    Name = model.Name,
                    Company = model.Company,
                    Phone = model.Phone,
                    WeiXin=model.WeiXin
                   
                });
                n++;
                if (n == 4)
                {
                    break;
                }
            }
            for (int i = modelList.Count; i < 4; i++)
            {
                gradeModels.Add(new FamilyInfoModel());
            }

            return gradeModels;
        }
        #endregion

        #region 写入家长信息
        /// <summary>
        /// 微信判断家长是否存在
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool ExistsParent(string phone)
        {
            EI_FamilyInfo info = new EI_FamilyInfo()
            {
                Phone = phone
            };
            return _familyInfoDal.ParentExists(info);
        }
        /// <summary>
        /// 提交家长信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="MfgID"></param>
        /// <returns></returns>
        public string SubmitParentInfo(FamilyInfoModel model, string MfgID)
        {
            string result = string.Empty;
            EI_FamilyInfo info = new EI_FamilyInfo()
            {
                ID = model.ID,
                WeiXin = model.WeiXin,
                SID = model.SID,
                Phone = model.Phone,
                Name = model.Name,
                
            };
            if (_studentInfoDal.Exists(MfgID))
            {
                switch (ExistsParent(model.Phone))
                {
                    case true:
                        if (!_familyInfoDal.UpdateParentInfo(info))
                        {
                            result = "1002";
                        }
                        break;
                    case false:
                        if (!_familyInfoDal.Add(info))
                        {
                            result = "1003";
                        }
                        break;
                }
            }
            else
            {
                result = "1001";
            }
            return result;
        }
        #endregion

    }
}
