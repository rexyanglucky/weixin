﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.InterFace
{
    public partial interface IFactory
    {
        IGoodQuestion GetIGoodQuestion();
    }
}
