using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class AnswerJobResultPartialViewModel
    {
        public AnswerJobResultPartialViewModel()
        {
            this.Categories = new List<QuestionCategory>();
        }

        public string Title { get; set; }

        public Guid JobID { get; set; }

        public string Accumulated { get; set; }

        public List<QuestionCategory> Categories { get; set; }

        public class QuestionCategory
        {
            public QuestionCategory()
            {
                this.Questions = new List<QuestionItem>();
            }

            public string Label { get; set; }

            /// <summary>
            /// 请使用 AnswerJobResultPartialViewModel.AddQuestion(QuestionItem) 方法，该方法会从 Questions 列表里最大的 DisplayIndex 自动增长 1 之后自动赋值。
            /// </summary>
            public List<QuestionItem> Questions { get; set; }
        }

        public class QuestionItem
        {
            public int DisplayIndex { get; set; }

            public int SortIndex { get; set; }
            
            public int QuestionID { get; set; }
            
            public int State { get; set; }
        }

        public void AddQuestion(QuestionCategory category, QuestionItem item)
        {
            item.DisplayIndex = this.Categories.Count > 0 ? this.Categories.Sum(x => x.Questions.Count) + category.Questions.Count + 1 : category.Questions.Count + 1;

            category.Questions.Add(item);
        }
    }
}
