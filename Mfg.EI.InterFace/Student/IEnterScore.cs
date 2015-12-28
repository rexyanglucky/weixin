/*
 * author:杨礼文;
 * function:学生入学成绩接口
 * date:2015-04-20
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    public interface IEnterScore
    {
        #region 根据学生ID获取学生入学成绩

        /// <summary>
        /// 根据学生ID获取学生入学成绩
        /// </summary>
        /// <param name="stuID">学生ID</param>
        /// <returns></returns>
        List<EnterScoreModel> GetEnterScoreModelListByStuID(string stuID);

        #endregion
    }
}
