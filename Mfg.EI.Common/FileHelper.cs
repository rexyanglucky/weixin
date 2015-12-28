using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Web;
using System.Diagnostics;
namespace Mfg.EI.Common
{
    public class FileHelper
    {
        private static void write_txt(string fileName, string content)
        {
            string FILE_NAME = fileName + ".txt";//每天按照日期建立一个不同的文件名
            StreamWriter sr;
            if (File.Exists(FILE_NAME)) //如果文件存在,则创建File.AppendText对象
            {
                sr = File.AppendText(FILE_NAME);
            }
            else  //如果文件不存在,则创建File.CreateText对象
            {
                sr = File.CreateText(FILE_NAME);
            }

            sr.WriteLine(content);//将传入的字符串加上时间写入文本文件一行
            sr.Close();
        }

    }


    public class HtmlToPdf
    {
        /// <summary>
        /// HTML转换PDF
        /// </summary>
        /// <param name="html">Hmtl字符串</param>
        public static void ConvertHtmlToPdf(string html)
        {
            if (string.IsNullOrEmpty(html))
            {
                return;
            }
            else
            {
                string fileNameWithOutExtention = HttpContext.Current.Server.MapPath(Guid.NewGuid() + ".pdf");//输出文件名称
                fileNameWithOutExtention = AppDomain.CurrentDomain.BaseDirectory + Guid.NewGuid() + ".pdf";
                string wkhtmltopdfPath = HttpContext.Current.Server.MapPath(@"wkhtmltopdf\wkhtmltopdf.exe");
                wkhtmltopdfPath = @"C:\Program Files (x86)\wkhtmltopdf\bin\wkhtmltopdf.exe";
                if (!File.Exists(wkhtmltopdfPath))
                {
                    throw new Exception(String.Format("File '{0}' not found. Check if wkhtmltopdf application is installed.", wkhtmltopdfPath));
                }

                ProcessStartInfo si;
                StringBuilder paramsBuilder = new StringBuilder();
                paramsBuilder.Append("--page-size A4 ");
                paramsBuilder.AppendFormat("\"{0}\" \"{1}\"", "-", fileNameWithOutExtention);

                si = new ProcessStartInfo();
                si.CreateNoWindow = true;
                si.FileName = wkhtmltopdfPath;
                si.Arguments = paramsBuilder.ToString();
                si.UseShellExecute = false;
                si.RedirectStandardError = true;
                si.RedirectStandardInput = true;

                using (var process = new Process())
                {
                    process.StartInfo = si;
                    process.Start();
                    using (var stream = process.StandardInput)
                    {
                        byte[] buffer = Encoding.UTF8.GetBytes(html);
                        stream.BaseStream.Write(buffer, 0, buffer.Length);
                        stream.WriteLine();
                    }
                    if (!process.WaitForExit(10000))
                    {
                        throw new Exception("转换超时!");
                    }
                }

                if (File.Exists(fileNameWithOutExtention))
                {
                    //把文件读进文件流
                    FileStream fs = new FileStream(fileNameWithOutExtention, FileMode.OpenOrCreate);
                    byte[] file = new byte[fs.Length];
                    fs.Read(file, 0, file.Length);
                    fs.Close();

                    //Response给客户端下载
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.AddHeader("content-disposition", "attachment; filename=" + fileNameWithOutExtention);//强制下载
                    HttpContext.Current.Response.ContentType = "application/octet-stream";
                    HttpContext.Current.Response.Charset = "UTF-8";
                    HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
                    HttpContext.Current.Response.BinaryWrite(file);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
                else
                {
                    throw new Exception("文件不存在!");
                }
            }
        }

    }
}

