using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using NPOI.HSSF.UserModel;
using NPOI.SS.Formula.Functions;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace Mfg.EI.Common
{
    public abstract class ExcelHelper
    {
        #region  获取连接
        /// <summary>
        /// 获取连接
        /// </summary>
        /// <param name="filepath"></param>
        /// <returns></returns>
        private static string GetStrConn(string filepath)
        {
            //string strConn = "Provider = Microsoft.Jet.OLEDB.4.0 ; Data Source =" + pPath + ";Extended Properties='Excel 8.0;HDR=False;IMEX=1'";
            string strConn = "Provider=Microsoft.Ace.OleDb.12.0;" + "data source=" + filepath + ";Extended Properties='Excel 12.0; HDR=Yes; IMEX=1'"; //此连接可以操作.xls与.xlsx文件 (支持Excel2003 和 Excel2007 的连接字符串)
            //备注： "HDR=yes;"是说Excel文件的第一行是列名而不是数据，"HDR=No;"正好与前面的相反。
            //      "IMEX=1 "如果列中的数据类型不一致，使用"IMEX=1"可必免数据类型冲突。 
            return strConn;
        }
        #endregion

        #region 获取Excel数据
        /// <summary>
        /// 获取Excel数据
        /// </summary>
        /// <param name="filepath">路径</param>
        /// <param name="sheetName">sheet名称</param>
        /// <returns></returns>
        public static DataSet GetExcelDataSource(string filepath, string sheetName)
        {
            string strConn = GetStrConn(filepath);
            try
            {
                using (OleDbConnection oleCon = new OleDbConnection(strConn))
                {
                    string Sql = "select * from [" + sheetName + "$]";
                    if (oleCon.State != ConnectionState.Open)
                    {
                        oleCon.Open();
                    }
                    using (OleDbDataAdapter da = new OleDbDataAdapter(Sql, oleCon))
                    {
                        DataSet ds = new DataSet();
                        da.Fill(ds, "[" + sheetName + "$]");
                        return ds;
                    }
                }
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("读取excel失败", ex);
                return null;
            }
        }
        #endregion

        #region 获得Excel中的所有sheetname
        /// <summary>
        ///获得Excel中的所有sheetname
        /// </summary>
        /// <param name="filepath"></param>
        /// <returns></returns>
        public ArrayList ExcelSheetName(string filepath)
        {
            string strConn = GetStrConn(filepath);
            try
            {
                using (OleDbConnection oleCon = new OleDbConnection(strConn))
                {
                    if (oleCon.State != ConnectionState.Open)
                    {
                        oleCon.Open();
                    }
                    ArrayList al = new ArrayList();
                    using (DataTable sheetNames = oleCon.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables,
                        new object[] { null, null, null, "TABLE" }))
                    {
                        foreach (DataRow dr in sheetNames.Rows)
                        {
                            al.Add(dr[2]);
                        }
                    }
                    return al;
                }
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("获得Excel中的所有sheetname失败", ex);
                return null;
            }
        }
        #endregion


        /// <summary>
        /// 
        /// </summary>
        /// <param name="filepath"></param>
        /// <param name="sheetName"></param>
        /// <param name="isFirstRowColumn"></param>
        /// <returns></returns>
        public static DataTable GetExcelDataSource(string filepath, string sheetName, bool isFirstRowColumn)
        {
            IWorkbook workbook = null;
            ISheet sheet = null;
            DataTable data = new DataTable();
            int startRow = 0;
            try
            {
                using (FileStream fs = new FileStream(filepath, FileMode.Open, FileAccess.Read))
                {

                    // fs = new FileStream(filepath, FileMode.Open, FileAccess.Read);
                    if (filepath.IndexOf(".xlsx") > 0) // 2007版本
                        workbook = new XSSFWorkbook(fs);
                    else if (filepath.IndexOf(".xls") > 0) // 2003版本
                        workbook = new HSSFWorkbook(fs);

                    if (sheetName != null)
                    {
                        sheet = workbook.GetSheet(sheetName);
                        if (sheet == null) //如果没有找到指定的sheetName对应的sheet，则尝试获取第一个sheet
                        {
                            sheet = workbook.GetSheetAt(0);
                        }
                    }
                    else
                    {
                        sheet = workbook.GetSheetAt(0);
                    }
                    if (sheet != null)
                    {
                        IRow firstRow = sheet.GetRow(0);
                        int cellCount = firstRow.LastCellNum; //一行最后一个cell的编号 即总的列数

                        if (isFirstRowColumn)
                        {
                            for (int i = firstRow.FirstCellNum; i < cellCount; ++i)
                            {
                                ICell cell = firstRow.GetCell(i);
                                if (cell != null)
                                {
                                    string cellValue = cell.StringCellValue;
                                    if (cellValue != null)
                                    {
                                        DataColumn column = new DataColumn(cellValue);
                                        data.Columns.Add(column);
                                    }
                                }
                            }
                            startRow = sheet.FirstRowNum + 1;
                        }
                        else
                        {
                            startRow = sheet.FirstRowNum;
                        }

                        //最后一列的标号
                        int rowCount = sheet.LastRowNum;
                        for (int i = startRow; i <= rowCount; ++i)
                        {
                            IRow row = sheet.GetRow(i);
                            if (row == null) continue; //没有数据的行默认是null　　　　　　　

                            DataRow dataRow = data.NewRow();
                            for (int j = row.FirstCellNum; j < cellCount; ++j)
                            {
                                if (row.GetCell(j) != null) //同理，没有数据的单元格都默认是null
                                    dataRow[j] = row.GetCell(j).ToString();
                            }
                            data.Rows.Add(dataRow);
                        }
                    }
                }
                return data;

            }
            catch (Exception ex)
            {
                LogHelperNet.Error("读取excel失败", ex);
                return null;
            }
        }


        #region 导出Excel
        /// <summary>
        /// 导出Excel
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="field">导出字段数组(ID:客户编号)</param>
        /// <returns></returns>
        public static MemoryStream ExportExcel(DataTable dt, string[] field)
        {
            IWorkbook workbook = new HSSFWorkbook();
            ISheet sheet1 = workbook.CreateSheet("Sheet1");

            #region 设置Excel标头名称
            IRow prorow = sheet1.CreateRow(0);
            for (int i = 0; i < field.Length; i++)
            {
                string properName = field[i].Split(':')[1];
                prorow.CreateCell(i).SetCellValue(properName);
            }
            #endregion

            int column = 0;

            #region 设置Excel中的内容
            for (int i = 0; i < dt.Rows.Count; i++)//遍历传过来的数据
            {
                DataRow dr = dt.Rows[i];
                IRow row = sheet1.CreateRow(i + 1);
                column = 0;
                for (int j = 0; j < field.Length; j++)//遍历属性
                {
                    for (int s = 0; s < dt.Columns.Count; s++)
                    {
                        DataColumn dc = dt.Columns[i];
                        string columnName = dc.ColumnName;
                        if (columnName.ToUpper() == field[j].Split(':')[0].ToUpper())
                        {
                            object obj = dr[columnName];
                            if (obj != null)
                            {
                                row.CreateCell(column).SetCellValue(obj.ToString());
                            }
                            else
                            {
                                row.CreateCell(column).SetCellValue(" ");
                            }
                            column++;
                            break;
                        }
                    }
                }
            }
            #endregion

            MemoryStream file = new MemoryStream();
            workbook.Write(file);
            return file;
        }
        #endregion

        #region 导出Excel
        /// <summary>
        /// 导出Excel
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="list">List对象</param>
        /// <param name="field">导出字段数组(ID:客户编号)</param>
        /// <returns></returns>
        public static MemoryStream ExportExcel<T>(List<T> list, string[] field)
        {
            IWorkbook workbook = new HSSFWorkbook();
            ISheet sheet1 = workbook.CreateSheet("Sheet1");

            Type modeltype = typeof(T);
            PropertyInfo[] properties = modeltype.GetProperties();

            T[] modelArry = list.ToArray();

            #region 设置Excel标头名称
            IRow prorow = sheet1.CreateRow(0);
            for (int i = 0; i < field.Length; i++)
            {
                string properName = field[i].Split(':')[1];
                prorow.CreateCell(i).SetCellValue(properName);
            }
            #endregion

            int column = 0;

            #region 设置Excel中的内容
            for (int i = 0; i < modelArry.Length; i++)//遍历传过来的数据
            {
                IRow row = sheet1.CreateRow(i + 1);
                //row.RowStyle.FillBackgroundColor = NPOI.HSSF.Util.HSSFColor.RED.index;
                column = 0;
                for (int j = 0; j < field.Length; j++)//遍历属性
                {
                    for (int s = 0; s < properties.Length; s++)
                    {
                        if (properties[s].Name == field[j].Split(':')[0])
                        {
                            object obj = properties[s].GetValue(modelArry[i], null);

                            if (obj != null)
                            {
                                row.CreateCell(column).SetCellValue(obj.ToString());
                            }
                            else
                            {
                                row.CreateCell(column).SetCellValue(" ");
                            }
                            column++;
                            break;
                        }
                    }
                }
            }
            #endregion

            MemoryStream file = new MemoryStream();
            workbook.Write(file);
            return file;
        }

        #endregion
    }
}
