using Mfg.Resource.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 
    /// </summary>
    public class TreeModel
    {
        /// <summary>
        /// 树的ID
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// 父ID
        /// </summary>
        public string pId { get; set; }
        /// <summary>
        /// 树的节点名称
        /// </summary>
        public string name { get; set; }
    }

    /// <summary>
    /// 教师布置对象树
    /// </summary>
    public class TeachGroupModel
    {
        /// <summary>
        /// 组ID
        /// </summary>
        public int gid { get; set; }

        /// <summary>
        /// 教师ID
        /// </summary>
        public string tid { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }
    }

    public class QuestionModel
    {

        /// <summary>
        /// 是否测评
        /// </summary>
        public bool IsTest { get; set; }
        /// <summary>
        /// 书本ID
        /// </summary>
        public string BookID { get; set; }

        /// <summary>
        /// 范围   0系统题库  1机构题库 2 我的收藏
        /// </summary>
        public string range { get; set; }

        /// <summary>
        /// 总数
        /// </summary>
        public int TotalNumber { get; set; }


        /// <summary>
        /// 机构Id
        /// </summary>
        public int OrgId { get; set; }

        /// <summary>
        /// 每页行数
        /// </summary>
        public int pageSize { get; set; }
        /// <summary>
        /// 页码
        /// </summary>
        public int pNumber { get; set; }

        /// <summary>
        /// 难度 1 简单 2 中等  3复杂
        /// </summary>
        public int diff { get; set; }

        /// <summary>
        /// 题型：1选择 2 填空 3解答; 0为全部
        /// </summary>
        public int styleareaid { get; set; }

        /// <summary>
        /// 难度排序 1升序 0不排序 -1降序
        /// </summary>
        public int questionSort { get; set; }

        public int UserID { get; set; }

        /// <summary>
        /// 主知识点ID
        /// </summary>
        public int f_id { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public string SubjectID { get; set; }

        /// <summary>
        /// 学制
        /// </summary>
        public int edu { get; set; }

        /// <summary>
        /// 教材版本
        /// </summary>
        public string edition { get; set; }

        /// <summary>
        /// 年级（阶段）
        /// </summary>
        public string grade { get; set; }

        /// <summary>
        /// 学期
        /// </summary>
        public int term { get; set; }

        public int qcount { get; set; }

        /// <summary>
        /// 选修、必修类型
        /// </summary>
        public string edtitionType { get; set; }

        /// <summary>
        /// 文理
        /// </summary>
        public string artScience { get; set; }

        public string ID { get; set; }

        /// <summary>
        /// 题目标签
        /// </summary>
        /// 0 不限 2 常考 3 必考 4 易考
        public int TagID { get; set; }
        /// <summary>
        /// 题目标签ID
        /// </summary>
        /// 1 期中 2 期末 3 模拟 7中考  9 高考 10小考 
        public int PaperTagID { get; set; }
    }

    public class QuestionTeachModel : Mfg.Resource.Entity.SecmainQues
    {
        /// <summary>
        /// 学习目标集合
        /// </summary>
        public List<string> Str { get; set; }

        /// <summary>
        /// 示例
        /// </summary>
        public List<string> StrA { get; set; }

        /// <summary>
        /// 课后作业
        /// </summary>
        public List<string> StrB { get; set; }

        /// <summary>
        /// 随机试题
        /// </summary>
        public List<Mfg.Resouce.Models.Question> List { get; set; }
    }

    /// <summary>
    /// 智能换题
    /// </summary>
    public class QuestionRandModel
    {
        /// <summary>
        /// 作业ID
        /// </summary>
        public string JID { get; set; }
        /// <summary>
        /// 科目ID
        /// </summary>
        public string SubjectID { get; set; }
        /// <summary>
        /// 题型区域的id
        /// </summary>
        public int styleareid { get; set; }

        /// <summary>
        /// 主知识点id
        /// </summary>
        public int mainsecid { get; set; }

        /// <summary>
        /// 小年级
        /// </summary>
        public string grade { get; set; }

        /// <summary>
        /// 试题ID
        /// </summary>
        public int fid { get; set; }

        /// <summary>
        /// 不需要进行随机的id序列
        /// </summary>
        public string noidlist { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public int SequenceID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public float? Score { get; set; }



        #region 教学中心智能换题

        public Int64 DetailID { get; set; }   
        #endregion
    }

    /// <summary>
    /// 试题删除条件
    /// </summary>
    public class DeleteQuesModel
    {
        /// <summary>
        /// 作业ID
        /// </summary>
        public string JID { get; set; }

        /// <summary>
        /// 试题ID
        /// </summary>
        public string ItemID { get; set; }
    }


    public class CollectionModel
    {
        public string subjectID { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int UserID { get; set; }

        public int OrgID { get; set; }


        /// <summary>
        /// 选择、填空、解答-1,2,3
        /// </summary>
        public int StyleID { get; set; }

        /// <summary>
        /// 试题Id
        /// </summary>
        public int SecID { get; set; }

    }


}


