using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class EI_KDCup
    {
        private int _sId;
        private int _kDId;
        private int _cupCount;

        /// <summary>
        /// 学生ID
        /// </summary>
        public int SId
        {
            get { return _sId; }
            set { _sId = value; }
        }

        /// <summary>
        /// 学生ID
        /// </summary>
        public int KDId
        {
            get { return _kDId; }
            set { _kDId = value; }
        }

        /// <summary>
        /// 奖杯数量
        /// </summary>
        public int CupCount
        {
            get { return _cupCount; }
            set { _cupCount = value; }
        }


       
    }
}
