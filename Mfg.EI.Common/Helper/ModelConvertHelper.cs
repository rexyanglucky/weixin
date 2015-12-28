﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Mfg.EI.Common
{
    public abstract class ModelConvertHelper<T> where T : new()
    {
        public static List<T> ConvertToModelList(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0)
                return new List<T>();

            // 定义集合
            List<T> ts = new List<T>();
            // 获得此模型的类型
            Type type = typeof(T);
            string tempName = "";
            foreach (DataRow dr in dt.Rows)
            {
                T t = new T();
                // 获得此模型的公共属性
                PropertyInfo[] propertys = t.GetType().GetProperties();
                foreach (PropertyInfo pi in propertys)
                {
                    tempName = pi.Name;
                    // 检查DataTable是否包含此列
                    if (dt.Columns.Contains(tempName))
                    {
                        // 判断此属性是否有Setter
                        if (!pi.CanWrite) continue;
                        object value = dr[tempName];
                        if (value != DBNull.Value)
                            pi.SetValue(t, value, null);
                    }
                }
                ts.Add(t);
            }
            return ts;
        }

        public static List<T> ConvertToModelList(DataTable dt, int count)
        {
            if (dt == null || dt.Rows.Count == 0)
                return new List<T>();

            // 定义集合
            List<T> ts = new List<T>();
            // 获得此模型的类型
            Type type = typeof(T);
            string tempName = "";
            int tempRowIndex = 1;
            foreach (DataRow dr in dt.Rows)
            {
                if (tempRowIndex > count)
                {
                    break;
                }
                T t = new T();
                // 获得此模型的公共属性
                PropertyInfo[] propertys = t.GetType().GetProperties();
                foreach (PropertyInfo pi in propertys)
                {
                    tempName = pi.Name;
                    // 检查DataTable是否包含此列
                    if (dt.Columns.Contains(tempName))
                    {
                        // 判断此属性是否有Setter
                        if (!pi.CanWrite) continue;
                        object value = dr[tempName];
                        if (value != DBNull.Value)
                            pi.SetValue(t, value, null);
                    }
                }
                ts.Add(t);
                tempRowIndex++;
            }
            return ts;
        }

        public static T ConvertToModel(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0)
                return new T();

            // 定义集合
            T ts = new T();
            // 获得此模型的类型
            Type type = typeof(T);
            string tempName = "";
            foreach (DataRow dr in dt.Rows)
            {
                T t = new T();
                // 获得此模型的公共属性
                PropertyInfo[] propertys = t.GetType().GetProperties();
                foreach (PropertyInfo pi in propertys)
                {
                    tempName = pi.Name;
                    // 检查DataTable是否包含此列
                    if (dt.Columns.Contains(tempName))
                    {
                        // 判断此属性是否有Setter
                        if (!pi.CanWrite) continue;
                        object value = dr[tempName];
                        if (value != DBNull.Value)
                            pi.SetValue(t, value, null);
                    }
                }
                ts = t;
                break;
            }
            return ts;
        }
    }
}
