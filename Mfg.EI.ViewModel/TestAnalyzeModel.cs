/*
 * author:谢利民;
 * function:知识测评相关功能的接口
 * date:2015-05-12
 * update:205-05-12
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 知识测评
    /// </summary>
  public  class TestAnalyzeModel
    {
      /// <summary>
        /// 知识测评ID
      /// </summary>
      public int? TAID { get; set; }
      /// <summary>
        /// 知识测评知识点关联表
      /// </summary>
      List<TARelKnoModel> tarelknomodelList { get; set; }

      /// <summary>
      /// 知识测评与题目关联表
      /// </summary>
      List<TARelItemModel> tarelitemmodelList { get; set; }
    }
}
