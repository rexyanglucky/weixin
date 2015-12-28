using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;

namespace Mfg.EI.DAL
{
    public class RedisDal
    {
        /// <summary>
        /// 保存value
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool SetValue(RedisTypeEnum type, string key, object value)
        {
            return DBHelper.RedisHelper.SetValue(type, key, value);
        }

        public static bool SetValue<T>(RedisTypeEnum type, string key, T value)
        {
            return DBHelper.RedisHelper.SetValue<T>(type, key, value);
        }

        /// <summary>
        /// 读取value
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static T GetValue<T>(RedisTypeEnum type, string key)
        {
            return DBHelper.RedisHelper.GetValue<T>(type, key);
        }

        /// <summary>
        /// 移除key
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool RemoveKey(RedisTypeEnum type, string key)
        {
            return DBHelper.RedisHelper.RemoveKey(type, key);
        }

        /// <summary>
        /// 设置过期时间
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <param name="timeSpan">秒</param>
        /// <returns></returns>
        public static bool ExpireEntryAt(RedisTypeEnum type, string key, int timeSpan)
        {
            return RedisHelper.ExpireEntryAt(type, key, timeSpan);
        }

        public static bool RemoveEntryFromHash(RedisTypeEnum type, string hashId, string key)
        {
            return DBHelper.RedisHelper.RemoveEntryFromHash(type, hashId, key);
        }

        /// <summary>
        /// 根据hashid，获取键值对
        /// </summary>
        /// <param name="type"></param>
        /// <param name="hashId"></param>
        /// <returns></returns>
        public static Dictionary<string, string> GetAllEntriesFromHash(RedisTypeEnum type, string hashId)
        {
            return DBHelper.RedisHelper.GetAllEntriesFromHash(type, hashId);
        }

        /// <summary>
        /// 根据hashid，键值，获取键值对
        /// </summary>
        /// <param name="type"></param>
        /// <param name="hashId"></param>
        /// <param name="keys"></param>
        /// <returns></returns>
        public static List<string> GetValuesFromHash(RedisTypeEnum type, string hashId, params string[] keys)
        {
            return DBHelper.RedisHelper.GetValuesFromHash(type, hashId, keys);
        }

        public static List<string> GetHashKeys(RedisTypeEnum type, string hashId)
        {
            return DBHelper.RedisHelper.GetHashKeys(type, hashId);
        }

        public static bool ContainsKey(RedisTypeEnum type, string key)
        {
            return DBHelper.RedisHelper.ContainsKey(type, key);
        }

        public static bool HashContainsEntry(RedisTypeEnum type, string hashId, string filedId)
        {
            return DBHelper.RedisHelper.HashContainsEntry(type, hashId, filedId);
        }

        /// <summary>
        /// 根据hashid，键值，获取value
        /// </summary>
        /// <param name="type"></param>
        /// <param name="hashId"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetValueFromHash(RedisTypeEnum type, string hashId, string key)
        {
            return DBHelper.RedisHelper.GetValueFromHash(type, hashId, key);
        }

        /// <summary>
        /// 根据hashid，设置键值对
        /// </summary>
        /// <param name="type"></param>
        /// <param name="hashId"></param>
        /// <param name="keyValuePairs"></param>
        /// <returns></returns>
        public static bool SetRangeInHash(RedisTypeEnum type, string hashId,
            List<KeyValuePair<string, string>> keyValuePairs)
        {
            return DBHelper.RedisHelper.SetRangeInHash(type, hashId, keyValuePairs);
        }
        public static bool SetEntryInHash(RedisTypeEnum type, string hashId,
       KeyValuePair<string, string> keyValuePair)
        {
            return DBHelper.RedisHelper.SetEntryInHash(type, hashId, keyValuePair);
        }


    }
}
