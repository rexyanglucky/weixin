using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;

namespace Mfg.EI.InterFace
{
    public interface IDict
    {
        List<EI_Dict> GetDict(string type);

        string GetDictValue(string type, string code);
        string GetDictCode(string type, string value);
        string GetSubjectName(string code);
    }
}
