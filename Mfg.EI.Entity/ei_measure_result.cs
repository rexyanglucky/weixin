
namespace Mfg.EI.Entity
{
    /// <summary>
    /// 学能报告维度实体类
    /// </summary>
    public class EI_Measure_Result
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public int ResultID { get; set; }
        /// <summary>
        /// 测评主表ID
        /// </summary>
        public int MeasureID { get; set; }
        /// <summary>
        /// 维度ID
        /// </summary>
        public int DimID { get; set; }
        /// <summary>
        /// 维度名称
        /// </summary>
        public int DimName { get; set; }
        /// <summary>
        /// 维度描述
        /// </summary>
        public string DimRemark { get; set; }
        /// <summary>
        /// 类型：0为不区分；1较差，2中等，3较好4.典型，5中间型
        /// </summary>
        public int DocEnum { get; set; }
        /// <summary>
        /// 对应间隔上限数值 和对应的型ID
        /// </summary>
        public int DocKey { get; set; }
        /// <summary>
        /// 算法备注
        /// </summary>
        public int DocMark { get; set; }
        /// <summary>
        /// 阶段描述
        /// </summary>
        public int DocValue { get; set; }
        /// <summary>
        /// 固定展示文案
        /// </summary>
        public int Description { get; set; }
        /// <summary>
        /// 个性化展示文案
        /// </summary>
        public int LocalDescription { get; set; }
        /// <summary>
        /// 状态：255删除
        /// </summary>
        public int ResultStatus { get; set; }
        /// <summary>
        /// 生成时间
        /// </summary>
        public int AddTime { get; set; }
        /// <summary>
        /// 最后一次修改时间
        /// </summary>
        public int LastEditTime { get; set; }

    }
}
