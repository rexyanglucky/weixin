using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL.OrgManger;
using Mfg.Manage.ViewModel;
using Mfg.Manager.Entity;

namespace Mfg.EI.InterFace
{
    public class Department : IDepartment
    {
        #region 私有对象
        DepartmentDal departmentDal = new DepartmentDal();
        #endregion

        #region 获取部门信息
        /// <summary>
        /// 获取部门信息
        /// </summary>
        /// <returns></returns>
        public List<EI_Department> GetDepartmentList(Search model, out int count)
        {
            List<EI_Department> departmentList = new List<EI_Department>();
            departmentList = departmentDal.GetDepartmentList(model, out count);
            return departmentList;
        }


        /// <summary>
        /// 获取部门信息
        /// </summary>
        /// <returns></returns>
        public List<DepartmentModel> GetDepartmentModelList(Search model, out int count)
        {
            List<EI_Department> departmentList = new List<EI_Department>();
            departmentList = departmentDal.GetDepartmentList(model, out count);
            var list = departmentList.Select(m => new DepartmentModel()
            {
                DepartmentID = m.DepartmentID,
                DepartmentName = m.DepartmentName,
                DepartmentName_EN = m.DepartmentName_EN,
                OrderNo = m.OrderNo,
                IsValID = m.IsValID
            }).ToList();
            return list;
        }
        #endregion

    }
}
