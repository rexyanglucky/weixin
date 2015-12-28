using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
namespace Mfg.EI.Common
{
    public class CookieEncryptions
    {
        private static readonly string aesKEY = System.Configuration.ConfigurationManager.AppSettings["aesKEY"];
        private static readonly string aesIV = System.Configuration.ConfigurationManager.AppSettings["aesIV"];
        private static Byte[] KEY_64
        {
            get
            {
                string CacheKey = "_aesKEY_";
                Byte[] key_64 = HttpContext.Current.Cache[CacheKey] as Byte[];
                if (key_64 == null)
                {
                    string aesKEY = System.Configuration.ConfigurationManager.AppSettings["aesKEY"];
                    key_64 = System.Text.Encoding.UTF8.GetBytes(aesKEY);
                    HttpContext.Current.Cache.Insert(CacheKey, key_64);
                }
                return key_64;
            }
        }
        private static Byte[] IV_64
        {
            get
            {
                string CacheKey = "_aesIV_";
                Byte[] iv_64 = HttpContext.Current.Cache[CacheKey] as Byte[];
                if (iv_64 == null)
                {
                    string aesIV = System.Configuration.ConfigurationManager.AppSettings["aesIV"];
                    iv_64 = System.Text.Encoding.UTF8.GetBytes(aesIV);
                    HttpContext.Current.Cache.Insert(CacheKey, iv_64);
                }
                return iv_64;
            }
        }

        #region DES加密算法
        /// <summary>
        /// //标准的DES加密  关键字、数据加密
        /// </summary>
        /// <param name="name">参数</param>
        /// <returns></returns>
        public static string EncryptCookie(string name)
        {
            try
            {

                if (name != "" && name != null)
                {
                    DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
                    MemoryStream ms = new MemoryStream();
                    CryptoStream cs = new
                    CryptoStream(ms, cryptoProvider.CreateEncryptor(KEY_64, IV_64), CryptoStreamMode.Write);
                    StreamWriter sw = new StreamWriter(cs);
                    sw.Write(name);
                    sw.Flush();
                    cs.FlushFinalBlock();
                    ms.Flush();
                    return Convert.ToBase64String(ms.GetBuffer(), 0, Int32.Parse(ms.Length.ToString()));//再转换为一个字符串
                }

            }
            catch { }

            return "";
        }
        #endregion

        #region DES 解密算法
        /// <summary>
        /// //标准的DES解密
        /// </summary>
        /// <param name="temp">参数</param>
        /// <returns>string</returns>
        public static string DecryptCookie(string temp)
        {
            try
            {
                if (temp != "" && temp != null)
                {
                    DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
                    Byte[] buffer = Convert.FromBase64String(temp);  //从字符串转换为字节组
                    MemoryStream ms = new MemoryStream(buffer);
                    CryptoStream cs = new
                    CryptoStream(ms, cryptoProvider.CreateDecryptor(KEY_64, IV_64), CryptoStreamMode.Read);
                    StreamReader sr = new StreamReader(cs);
                    return sr.ReadToEnd();
                }

            }
            catch
            { }
            return "";
        }
        #endregion
        public static string GetMD5Str(string str)
        {
            // First we need to convert the string into bytes, which
            // means using a text encoder.
            byte[] unicodeText = System.Text.Encoding.UTF8.GetBytes(str);

            // Now that we have a byte array we can ask the CSP to hash it
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] result = md5.ComputeHash(unicodeText);

            // Build the final string by converting each byte
            // into hex and appending it to a StringBuilder
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                sb.Append(result[i].ToString("x2"));
            }
            return sb.ToString().ToLower();
        }
        public static string EncryptUrl(string pToEncrypt, string sKey)
        {
            //访问数据加密标准(DES)算法的加密服务提供程序 (CSP) 版本的包装对象
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            des.Key = ASCIIEncoding.ASCII.GetBytes(sKey); //建立加密对象的密钥和偏移量
            des.IV = ASCIIEncoding.ASCII.GetBytes(sKey); //原文使用ASCIIEncoding.ASCII方法的GetBytes方法

            byte[] inputByteArray = Encoding.Default.GetBytes(pToEncrypt); //把字符串放到byte数组中

            MemoryStream ms = new MemoryStream(); //创建其支持存储区为内存的流　
            //定义将数据流链接到加密转换的流
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            //上面已经完成了把加密后的结果放到内存中去

            StringBuilder ret = new StringBuilder();
            foreach (byte b in ms.ToArray())
            {
                ret.AppendFormat("{0:X2}", b);
            }
            ret.ToString();
            return ret.ToString();
        }

        public static string DecryptUrl(string pToDecrypt, string sKey)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();

            byte[] inputByteArray = new byte[pToDecrypt.Length / 2];
            for (int x = 0; x < pToDecrypt.Length / 2; x++)
            {
                int i = (Convert.ToInt32(pToDecrypt.Substring(x * 2, 2), 16));
                inputByteArray[x] = (byte)i;
            }

            des.Key = ASCIIEncoding.ASCII.GetBytes(sKey); //建立加密对象的密钥和偏移量，此值重要，不能修改
            des.IV = ASCIIEncoding.ASCII.GetBytes(sKey);
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);

            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            //建立StringBuild对象，createDecrypt使用的是流对象，必须把解密后的文本变成流对象
            StringBuilder ret = new StringBuilder();

            return System.Text.Encoding.Default.GetString(ms.ToArray());

        }
    }
}
