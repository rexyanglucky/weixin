using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.Manage.ViewModel;
using Mfg.Manager.Entity;

namespace Mfg.EI.InterFace
{
    public interface IDepartment
    {
        #region 获取部门信息

        /// <summary>
        /// 获取部门信息
        /// </summary>
        /// <returns></returns>
        List<EI_Department> GetDepartmentList(Search model, out int count);


        /// <summary>
        /// 获取部门信息
        /// </summary>
        /// <returns></returns>
        List<DepartmentModel> GetDepartmentModelList(Search model, out int count);

        #endregion

    }
}
