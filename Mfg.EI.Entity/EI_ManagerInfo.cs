using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_ManagerInfo:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_ManagerInfo
    {
        public EI_ManagerInfo()
        { }
        #region Model

        private string _id = "00000000-0000-0000-0000-000000000000";
        private int _utype = 0;
        private string _name;
        private int? _gender = 0;
        private string _cardnumber;
        private int? _orgid = 0;
        private string _loginname;
        private string _pwd;
        private string _phone;
        private string _postion;
        private string _qq;
        private string _email;
        private int? _acastru = 0;
        private int? _roletypeid = 0;
        private string _headimg;
        private DateTime? _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;

        private int? _accountnumber = 0;
        private string _createby;
        private int? _artsciences = 0;
        private int _firstLogin;
        private int _freezeFlag;
        private int _isteach = 0;
        private int _MfgID;
        /// <summary>
        /// 
        /// </summary>
        public string ID
        {
            set { _id = value; }
            get { return _id; }
        }
        public int? AccountNumber
        {
            set { _accountnumber = value; }
            get { return _accountnumber; }
        }

        public string CreateBy
        {
            set { _createby = value; }
            get { return _createby; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int UType
        {
            set { _utype = value; }
            get { return _utype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Name
        {
            set { _name = value; }
            get { return _name; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Gender
        {
            set { _gender = value; }
            get { return _gender; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string CardNumber
        {
            set { _cardnumber = value; }
            get { return _cardnumber; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? OrgID
        {
            set { _orgid = value; }
            get { return _orgid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string LoginName
        {
            set { _loginname = value; }
            get { return _loginname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Pwd
        {
            set { _pwd = value; }
            get { return _pwd; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Phone
        {
            set { _phone = value; }
            get { return _phone; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Postion
        {
            set { _postion = value; }
            get { return _postion; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string QQ
        {
            set { _qq = value; }
            get { return _qq; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Email
        {
            set { _email = value; }
            get { return _email; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? AcaStru
        {
            set { _acastru = value; }
            get { return _acastru; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? RoleTypeID
        {
            set { _roletypeid = value; }
            get { return _roletypeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DelFlag
        {
            set { _delflag = value; }
            get { return _delflag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Remark
        {
            set { _remark = value; }
            get { return _remark; }
        }

        public string HeadImg
        {
            set { _headimg = value; }
            get { return _headimg; }
        }

        /// <summary>
        /// 文理
        /// </summary>
        public int? ArtSciences
        {
            set { _artsciences = value; }
            get { return _artsciences; }
        }
        public int FirstLogin { get { return _firstLogin; } set { _firstLogin = value; } }

        public int FreezeFlag
        {
            get { return _freezeFlag; }
            set { _freezeFlag = value; }
        }

        /// <summary>
        /// 教研
        /// </summary>
        public int IsTeach
        {
            get { return _isteach; }
            set { _isteach = value; }
        }

        /// <summary>
        /// 魔方格帐号
        /// </summary>
        public int MfgID
        {
            get { return _MfgID; }
            set { _MfgID = value; }
        }


        #endregion Model

    }
}

