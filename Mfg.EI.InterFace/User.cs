using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.InterFace
{
    public class User:IUser
    {
        public string UserName()
        {
            return "用户名称";
        }
    }
}
