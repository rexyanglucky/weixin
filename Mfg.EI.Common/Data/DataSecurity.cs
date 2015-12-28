using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Mfg.EI.Common
{
    public abstract class DataSecurity
    {
        private static Random rnd = new Random();

        protected DataSecurity()
        {
        }

        public static string ConvertToJavaScript(string str)
        {
            str = str.Replace(@"\", @"\\");
            str = str.Replace("\n", @"\n");
            str = str.Replace("\r", @"\r");
            str = str.Replace("\"", "\\\"");
            str = str.Replace("'", @"\'");
            return str;
        }

        public static string FilterBadChar(string strchar)
        {
            string input = string.Empty;
            if (string.IsNullOrEmpty(strchar))
            {
                return string.Empty;
            }
            string str = strchar;
            string[] strArray = new string[] { 
                "+", "'", "%", "^", "&", "?", "(", ")", "<", ">", "[", "]", "{", "}", "/", "\"", 
                ";", ":", "Chr(34)", "Chr(0)", "--"
             };
            StringBuilder builder = new StringBuilder(str);
            for (int i = 0; i < strArray.Length; i++)
            {
                input = builder.Replace(strArray[i], string.Empty).ToString();
            }
            return Regex.Replace(input, "@+", "@");
        }

        public static string FilterSqlKeyword(string strchar)
        {
            bool flag = false;
            if (string.IsNullOrEmpty(strchar))
            {
                return string.Empty;
            }
            strchar = strchar.ToUpperInvariant();
            string[] strArray = new string[] { 
                "SELECT", "UPDATE", "INSERT", "DELETE", "DECLARE", "@", "EXEC", "DBCC", "ALTER", "DROP", "CREATE", "BACKUP", "IF", "ELSE", "END", "AND", 
                "OR", "ADD", "SET", "OPEN", "CLOSE", "USE", "BEGIN", "RETUN", "AS", "GO", "EXISTS", "KILL"
             };
            for (int i = 0; i < strArray.Length; i++)
            {
                if (strchar.Contains(strArray[i]))
                {
                    strchar = strchar.Replace(strArray[i], string.Empty);
                    flag = true;
                }
            }
            if (flag)
            {
                return FilterSqlKeyword(strchar);
            }
            return strchar;
        }

        public static string GetArrayValue(int index, string[] field)
        {
            if ((field != null) && ((index >= 0) && (index < field.Length)))
            {
                return field[index];
            }
            return string.Empty;
        }

        public static string GetArrayValue(int index, Collection<string> field)
        {
            if ((index >= 0) && (index < field.Count))
            {
                return field[index];
            }
            return string.Empty;
        }

        public static string HtmlDecode(object value)
        {
            if (value == null)
            {
                return null;
            }
            return HtmlDecode(value.ToString());
        }

        public static string HtmlDecode(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                value = value.Replace("<br>", "\n");
                value = value.Replace("<br/>", "\n");
                value = value.Replace("<br />", "\n");
                value = value.Replace("&gt;", ">");
                value = value.Replace("&lt;", "<");
                value = value.Replace("&nbsp;", " ");
                value = value.Replace("&#39;", "'");
                value = value.Replace("&quot;", "\"");
            }
            return value;
        }

        public static string HtmlEncode(object value)
        {
            if (value == null)
            {
                return null;
            }
            return HtmlEncode(value.ToString());
        }

        public static string HtmlEncode(string str)
        {
            if (!string.IsNullOrEmpty(str))
            {
                str = str.Replace("<", "&lt;");
                str = str.Replace(">", "&gt;");
                str = str.Replace(" ", "&nbsp;");
                str = str.Replace("'", "&#39;");
                str = str.Replace("\"", "&quot;");
                str = str.Replace("\r\n", "<br />");
                str = str.Replace("\n", "<br />");
            }
            return str;
        }

        public static string MakeFileRndName()
        {
            return (DateTime.Now.ToString("yyyyMMddHHmmss", CultureInfo.CurrentCulture) + MakeRandomString("0123456789", 4));
        }

        public static string MakeFolderName()
        {
            return DateTime.Now.ToString("yyyyMM", CultureInfo.CurrentCulture);
        }

        public static string MakeRandomString(int pwdlen)
        {
            return MakeRandomString("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*", pwdlen);
        }

        public static string MakeRandomString(string pwdchars, int pwdlen)
        {
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < pwdlen; i++)
            {
                int num = rnd.Next(pwdchars.Length);
                builder.Append(pwdchars[num]);
            }
            return builder.ToString();
        }

        public static string RandomNum(int intlong)
        {
            StringBuilder builder = new StringBuilder(string.Empty);
            for (int i = 0; i < intlong; i++)
            {
                builder.Append(rnd.Next(10));
            }
            return builder.ToString();
        }

        public static string UrlEncode(object value)
        {
            if (value == null)
            {
                return null;
            }
            return UrlEncode(value.ToString());
        }

        public static string UrlEncode(string weburl)
        {
            if (string.IsNullOrEmpty(weburl))
            {
                return null;
            }
            return Regex.Replace(weburl, @"[^a-zA-Z0-9,-_\.]+", new MatchEvaluator(DataSecurity.UrlEncodeMatch));
        }

        public static string UrlEncode(string weburl, bool systemEncode)
        {
            if (string.IsNullOrEmpty(weburl))
            {
                return null;
            }
            if (systemEncode)
            {
                return HttpUtility.UrlEncode(weburl);
            }
            return UrlEncode(weburl);
        }

        private static string UrlEncodeMatch(Match match)
        {
            string str = match.ToString();
            if (str.Length < 1)
            {
                return str;
            }
            StringBuilder builder = new StringBuilder();
            foreach (char ch in str)
            {
                if (ch > '\x007f')
                {
                    builder.AppendFormat("%u{0:X4}", (int)ch);
                }
                else
                {
                    builder.AppendFormat("%{0:X2}", (int)ch);
                }
            }
            return builder.ToString();
        }

        public static string XmlEncode(string str)
        {
            if (!string.IsNullOrEmpty(str))
            {
                str = str.Replace("&", "&amp;");
                str = str.Replace("<", "&lt;");
                str = str.Replace(">", "&gt;");
                str = str.Replace("'", "&apos;");
                str = str.Replace("\"", "&quot;");
            }
            return str;
        }
    }
}
