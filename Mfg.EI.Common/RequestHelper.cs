using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Common
{
    public class RequestHelper
    {
        public static bool DownloadFile(string downLoadUrl, string saveFullName)
        {
            bool flagDown = false;
            System.Net.HttpWebRequest httpWebRequest = null;
            try
            {
                //根据url获取远程文件流
                httpWebRequest = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(downLoadUrl);

                System.Net.HttpWebResponse httpWebResponse = (System.Net.HttpWebResponse)httpWebRequest.GetResponse();
                System.IO.Stream sr = httpWebResponse.GetResponseStream();

                //创建本地文件写入流
                System.IO.Stream sw = new System.IO.FileStream(saveFullName, System.IO.FileMode.Create);

                long totalDownloadedByte = 0;
                byte[] by = new byte[1024];
                int osize = sr.Read(by, 0, (int)by.Length);
                while (osize > 0)
                {
                    totalDownloadedByte = osize + totalDownloadedByte;
                    sw.Write(by, 0, osize);
                    osize = sr.Read(by, 0, (int)by.Length);
                }
                System.Threading.Thread.Sleep(100);
                flagDown = true;
                sw.Close();
                sr.Close();
            }
            catch (System.Exception)
            {
                if (httpWebRequest != null)
                    httpWebRequest.Abort();
            }
            return flagDown;
        }
        public static byte[] DownloadFile(string downLoadUrl)
        {
            bool flagDown = false;
            System.Net.HttpWebRequest httpWebRequest = null;
            try
            {
                //根据url获取远程文件流
                httpWebRequest = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(downLoadUrl);

                System.Net.HttpWebResponse httpWebResponse = (System.Net.HttpWebResponse)httpWebRequest.GetResponse();

                using (System.IO.Stream sr = httpWebResponse.GetResponseStream())
                {
                    //var bytes = new byte[httpWebResponse.ContentLength];

                    //Task<byte[]>.Run(stream =>
                    //{
                    //    return null;
                    //});
                    //sr.ReadAsync(bytes, 0, bytes.Length);
                    var bytes = StreamToBytes(sr);


                    return bytes;
                }
            }
            catch (System.Exception)
            {
                if (httpWebRequest != null)
                    httpWebRequest.Abort();
            }
            return null;
        }
        public static byte[] StreamToBytes(Stream stream)
        {
            List<byte> bytes = new List<byte>();
            int temp = stream.ReadByte();
            while (temp != -1)
            {
                bytes.Add((byte)temp);
                temp = stream.ReadByte();
            }

            return bytes.ToArray();

        }
    }
}
