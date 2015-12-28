using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Security;

namespace Mfg.EI.Common
{
    public class SecurityHelper
    {
        private static byte[] IV_192;
        private static byte[] IV_64;
        private static byte[] KEY_192;
        private static byte[] KEY_64;
        static SecurityHelper()
        {
            KEY_64 = new byte[] { 0x2a, 0x10, 0x5d, 0x9c, 0x4e, 4, 0xda, 0x20 };
            IV_64 = new byte[] { 0x37, 0x67, 0xf6, 0x4f, 0x24, 0x63, 0xa7, 3 };
            KEY_192 = new byte[] { 0x2a, 0x10, 0x5d, 0x9c, 0x4e, 4, 0xda, 0x20, 15, 0xa7, 0x2c, 80, 0x1a, 250, 0x9b, 0x70, 2, 0x5e, 11, 0xcc, 0x77, 0x23, 0xb8, 0xc5 };
            IV_192 = new byte[] { 0x37, 0x67, 0xf6, 0x4f, 0x24, 0x63, 0xa7, 3, 0x2a, 5, 0x3e, 0x53, 0xb8, 7, 0xd1, 13, 0x91, 0x17, 200, 0x3a, 0xad, 10, 0x79, 0xde };
        }

        public static string Decrypt(string StrValue)
        {
            if (StrValue != "")
            {
                DESCryptoServiceProvider provider = new DESCryptoServiceProvider();
                MemoryStream stream = new MemoryStream(Convert.FromBase64String(StrValue));
                CryptoStream stream2 = new CryptoStream(stream, provider.CreateDecryptor(KEY_64, IV_64), CryptoStreamMode.Read);
                StreamReader reader = new StreamReader(stream2);
                return reader.ReadToEnd();
            }
            return "";
        }
        public static string DecryptTripleDES(string StrValue)
        {
            if (StrValue != "")
            {
                TripleDESCryptoServiceProvider provider = new TripleDESCryptoServiceProvider();
                MemoryStream stream = new MemoryStream(Convert.FromBase64String(StrValue));
                CryptoStream stream2 = new CryptoStream(stream, provider.CreateDecryptor(KEY_192, IV_192), CryptoStreamMode.Read);
                StreamReader reader = new StreamReader(stream2);
                return reader.ReadToEnd();
            }
            return "";
        }
        public static string Encrypt(string StrValue)
        {
            if (StrValue != "")
            {
                DESCryptoServiceProvider provider = new DESCryptoServiceProvider();
                MemoryStream stream = new MemoryStream();
                CryptoStream stream2 = new CryptoStream(stream, provider.CreateDecryptor(KEY_64, IV_64), CryptoStreamMode.Read);
                StreamWriter writer = new StreamWriter(stream2);
                writer.Write(StrValue);
                writer.Flush();
                stream2.FlushFinalBlock();
                stream.Flush();
                return Convert.ToBase64String(stream.GetBuffer(), 0, Convert.ToInt32(stream.Length));
            }
            return "";
        }
        public static string EncryptTripleDES(string StrValue)
        {
            if (StrValue != "")
            {
                TripleDESCryptoServiceProvider provider = new TripleDESCryptoServiceProvider();
                MemoryStream stream = new MemoryStream();
                CryptoStream stream2 = new CryptoStream(stream, provider.CreateEncryptor(KEY_192, IV_192), CryptoStreamMode.Write);
                StreamWriter writer = new StreamWriter(stream2);
                writer.Write(StrValue);
                writer.Flush();
                stream2.FlushFinalBlock();
                stream.Flush();
                return Convert.ToBase64String(stream.GetBuffer(), 0, (int)stream.Length);
            }
            return "";
        }

        #region Md5加密字符串
        /// <summary>
        /// Md5加密字符串
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string Md5(string str)
        {
            return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(str, "MD5");
        }

        public static string Md5(string str, int code)
        {
            if (code == 0x10)
            {
                return FormsAuthentication.HashPasswordForStoringInConfigFile(str, "MD5").Substring(8, 0x10);
            }
            return FormsAuthentication.HashPasswordForStoringInConfigFile(str, "MD5");
        }
        public static string Md5(string str, int code, bool isLower)
        {
            string temcode = FormsAuthentication.HashPasswordForStoringInConfigFile(str, "MD5");
            if (code == 0x10)
            {
                if (isLower)
                {
                    return temcode.ToLower().Substring(8, 0x10);
                }
                else
                {
                    return temcode.Substring(8, 0x10);
                }
            }
            else
            {
                if (isLower)
                    return temcode.ToLower();
                else
                {
                    return temcode;
                }
            }
        }

        /// <summary>
        /// Md5 encode
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string Md5Encode(string input)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(input);
            byte[] buffer = md5.ComputeHash(bytes);

            return Convert.ToBase64String(buffer);
        }


        /// <summary>
        /// 获取MD5不可逆加密后的密文
        /// </summary>
        /// <param name="plainTxt">不可逆加密前的明文</param>
        /// <returns>不可逆加密后的密文</returns>
        public static string GetMD5(string plainTxt)
        {
            if (plainTxt == null)
            {
                return null;
            }
            byte[] result = Encoding.Default.GetBytes(plainTxt);
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] output = md5.ComputeHash(result);
            string ciperTxt = BitConverter.ToString(output).Replace("-", "");

            return ciperTxt;
        }
        #endregion
    }
}
