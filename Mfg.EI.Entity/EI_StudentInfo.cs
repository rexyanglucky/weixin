using System;
using System.Runtime.InteropServices;

namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_StudentInfo:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_StudentInfo
    {
        public EI_StudentInfo()
        { }
        #region Model
        private string _mfgid = "00000000-0000-0000-0000-000000000000";
        private int _orgid = 0;
        private int? _stype = 0;
        private string _name = "0";
        private string _shool;
        private string _class;
        private string _mastername;
        private string _masterphone;
        private int? _gender = 0;
        private int? _gradeid = 0;
        private int? _acastru = 0;
        private DateTime? _birthdate;//= DateTime.Now;
        private string _cardnumber;
        private string _qq;
        private string _phone;
        private string _address;
        private string _imgurl;
        private int? _roletypeid = 0;
        private DateTime? _updatetime = DateTime.Now;
        private int? _renewroleid = 0;
        private DateTime? _expirdate = DateTime.Now;
        private DateTime? _createtime = DateTime.Now;
        private DateTime? _activationTime = DateTime.Now;

        private int _fristLogin;
        private string _createBy;
        private int? _delflag = 0;
        private string _remark;

        private string _InitialPassword;


        /// <summary>
        /// 
        /// </summary>
        public string MfgID
        {
            set { _mfgid = value; }
            get { return _mfgid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int OrgID
        {
            set { _orgid = value; }
            get { return _orgid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? SType
        {
            set { _stype = value; }
            get { return _stype; }
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
        public string Shool
        {
            set { _shool = value; }
            get { return _shool; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Class
        {
            set { _class = value; }
            get { return _class; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string MasterName
        {
            set { _mastername = value; }
            get { return _mastername; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string MasterPhone
        {
            set { _masterphone = value; }
            get { return _masterphone; }
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
        public int? GradeID
        {
            set { _gradeid = value; }
            get { return _gradeid; }
        }


        /// <summary>
        /// 学生：学制,0五四制，1六三制，2文科，3理科，4不分文理
        /// 老师：学制0---六三学制1---五四学制
        /// </summary>
        public int? AcaStru
        {
            set { _acastru = value; }
            get { return _acastru; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? BirthDate
        {
            set { _birthdate = value; }
            get { return _birthdate; }
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
        public string QQ
        {
            set { _qq = value; }
            get { return _qq; }
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
        public string Address
        {
            set { _address = value; }
            get { return _address; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ImgUrl
        {
            set { _imgurl = value; }
            get { return _imgurl; }
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
        public DateTime? UpdateTime
        {
            set { _updatetime = value; }
            get { return _updatetime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? RenewRoleID
        {
            set { _renewroleid = value; }
            get { return _renewroleid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? ExpirDate
        {
            set { _expirdate = value; }
            get { return _expirdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        public string CreateBy
        {
            set { _createBy = value; }
            get { return _createBy; }
        }
        public int FristLogin { get { return _fristLogin; } set { _fristLogin = value; } }

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
        #endregion Model

        public string STypeName { get; set; }

        /// <summary>
        /// 续费时间
        /// </summary>
        public DateTime? RenewTime { get; set; }


        /// <summary>
        /// 初始密码
        /// </summary>
        public string InitialPassword
        {
            set { _InitialPassword = value; }
            get { return _InitialPassword; }
        }


        /// <summary>
        /// 激活时间
        /// </summary>
        public DateTime? ActivationTime
        {
            set { _activationTime = value; }
            get { return _activationTime; }
        }

        public string StageId { get; set; }
    }

    /// <summary>
    /// 导入导出学生对象
    /// </summary>
    public partial class ImportAndExportStudent
    {
        public ImportAndExportStudent()
        { }
        public string ID { get; set; }

        public string MfgID { get; set; }

        public string Name { get; set; }
        public string Gender { get; set; }

        public string BirthDate { get; set; }

        public string GradeID { get; set; }
        public string SType { get; set; }

        public string Phone { get; set; }

        public string AcaStru { get; set; }
        public string Address { get; set; }

        public string Shool { get; set; }

        public string Class { get; set; }


        /// <summary>
        /// 家长姓名
        /// </summary>
        public string ParentName { get; set; }
        /// <summary>
        /// 家长手机
        /// </summary>
        public string ParentPhone { get; set; }

        /// <summary>
        /// 初始密码
        /// </summary>
        public string InitialPassword { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string CreateTime { get; set; }

        /// <summary>
        /// 激活时间
        /// </summary>
        public string ActivationTime { get; set; }

        /// <summary>
        /// 到期时间
        /// </summary>
        public string ExpirDate { get; set; }





        /// <summary>
        /// 是否校验通过 0 不通过  1 通过
        /// </summary>
        public int IsPass { get; set; }


    }
}

