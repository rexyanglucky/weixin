using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL;
using Mfg.EI.Entity;

namespace Mfg.EI.InterFace
{
    public class Dict : IDict
    {
        public List<EI_Dict> GetDict(string type)
        {
            return new DictDal().GetDict(type);
        }


        public string GetDictValue(string type, string code)
        {
            return GetDict(type).FirstOrDefault(m => m.Code == int.Parse(code)).Value;

        }

        public string GetDictCode(string type, string value)
        {
            return GetDict(type).FirstOrDefault(m => m.Value == value).Code.ToString();

        }

        public string GetSubjectName(string code)
        {
            switch (code)
            {
                case "1":
                    return "语文";
                case "2":
                    return "数学";
                case "3":
                    return "英语";
                case "4":
                    return "物理";
                case "5":
                    return "化学";
                case "6":
                    return "地理";
                case "7":
                    return "历史";
                case "8":
                    return "政治";
                case "9":
                    return "生物";
                default:
                    return "数学";
            }
        }
    }
}
