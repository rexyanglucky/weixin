using Mfg.EI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.InterFace
{
    public interface IWrong
    {
        List<WrongTagModel> GetTagList(string sid, string subjectId, string stageId);
        List<WrongTagModel> GetTagList(string sid);

        /// <summary>
        /// 获取错题详情
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="type">0 来源，1知识点，2是否掌握</param>
        /// <param name="tagValue"></param>
        /// <param name="satgeId"></param>
        /// <returns></returns>
        List<StudentWrongItemModel> GetWrongItems(string sid, string subjectId, string type, string tagValue, string satgeId);
        /// <summary>
        /// 获取错题详情
        /// </summary>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentWrongItemModel> GetWrongItems(string sid, string subjectId);



        /// <summary>
        /// 添加笔记
        /// </summary>
        /// <param name="eaid"></param>
        /// <param name="noteContent"></param>
        /// <param name="sourceType"></param>
        /// <returns></returns>
        bool AddItemNote(string eaid, string noteContent);
        /// <summary>
        /// 修改答案
        /// </summary>
        /// <param name="eaid"></param>
        /// <param name="noteContent"></param>
        /// <returns></returns>
        bool UpdateAnswer(string sid, string eaid, string itemid, string subjectid, string answer, ref bool IsRight);
        /// <summary>
        /// 修改学生掌握情况
        /// </summary>
        /// <param name="eaid"></param>
        /// <param name="tag"></param>
        /// <returns></returns>
        bool UpdateTag(string eaid, bool tag);

        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool Delete(string id);
    }
}
