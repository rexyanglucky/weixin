/*
 * author:yangjin;
 * function:验证码
 * adddate:2015-05-05
 * updatedate:2015-05-05
 */
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading;
using System.Drawing;


namespace Mfg.EI.InterFace.Common
{
    public class Verification
    {
        private char[] CHARS ={ '2', '3', '4', '5', '6', '7', '8', '9', 'A',
'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P',
'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
        string[] font = { "Times New Roman", "MS Mincho", "Book Antiqua", "Gungsuh", "PMingLiU", "Impact" };
        public static Random random = new Random();

        public String getRandomString()
        {
            StringBuilder buffer = new StringBuilder();
            int length = CHARS.Length;
            for (int i = 0; i < 6; i++)
            {
                buffer.Append(CHARS[random.Next(length)]);
            }
            return buffer.ToString();
        }

        private Color getRandomColor()
        {
            return Color.FromArgb(random.Next(255), random.Next(255), random
                    .Next(255));

        }

        private Color getReverseColor(Color c)
        {
            return Color.FromArgb(255 - c.R, 255 - c.G, c.B);
        }

        /**
         * 获取验证码
         * 
         * @param width
         *            高度
         * @param height
         *            宽度
         */
        //public Bitmap getImg(String randomString, int width, int height)
        //{

        //    Color color = getRandomColor();
        //    Color reverse = getReverseColor(color);
        //    Bitmap bi = new Bitmap(width, height);
        //    Graphics g = Graphics.FromImage(bi);
        //    g.FillRectangle(new SolidBrush(color), 0, 0, width, height);
        //    int len = font.Length;
        //    g.DrawString(randomString, new Font(font[random.Next(len)], 14), new SolidBrush(reverse), 10, 7);
        //    for (int i = 0, n = random.Next(100); i < n; i++)
        //    {
        //        g.FillRectangle(new SolidBrush(reverse), random.Next(width), random.Next(width), 1, 1);
        //    }
        //    g.Dispose();
        //    return bi;

        //}

        public Byte[] getImg(String randomString, int width, int height)
        {

            Color color = getRandomColor();
            Color reverse = getReverseColor(color);
            Bitmap bi = new Bitmap(width, height);
            Graphics g = Graphics.FromImage(bi);
            g.FillRectangle(new SolidBrush(color), 0, 0, width, height);
            int len = font.Length;
            g.DrawString(randomString, new Font(font[random.Next(len)], 14), new SolidBrush(reverse), 10, 7);
            for (int i = 0, n = random.Next(100); i < n; i++)
            {
                g.FillRectangle(new SolidBrush(reverse), random.Next(width), random.Next(width), 1, 1);
            }
            g.Dispose();
            byte[] data = null;
            using (MemoryStream ms = new MemoryStream())
            {

                bi.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                ms.Position = 0;
                data = new byte[ms.Length];
                ms.Read(data, 0, Convert.ToInt32(ms.Length));
                ms.Flush();
            }
            return data;

        }
    }
}