using System;
using System.Configuration;

namespace Mfg.EI.DBHelper
{
    class ConfigInfo
    {
        /// <summary>
        /// 获取连接字符串
        /// </summary>
        public static string ConnectionString
        {
            get
            {
                string _connectionString = ConfigurationManager.AppSettings["ConnectionString"];
                string ConStringEncrypt = ConfigurationManager.AppSettings["ConStringEncrypt"];
                //if (ConStringEncrypt == "true")
                //{
                //    _connectionString = DESEncrypt.Decrypt(_connectionString);
                //}
                return _connectionString;
            }
        }


        /// <summary>
        /// 得到web.config里配置项的数据库连接字符串。
        /// </summary>
        /// <param name="configName"></param>
        /// <returns></returns>
        public static string GetConnectionString(string configName)
        {
            string connectionString = ConfigurationManager.AppSettings[configName];
            string ConStringEncrypt = ConfigurationManager.AppSettings["ConStringEncrypt"];
            //if (ConStringEncrypt == "true")
            //{
            //    connectionString = DESEncrypt.Decrypt(connectionString);
            //}
            return connectionString;
        }

        public static string RedisClusterUser
        {
            get
            {
                string redisClusterName = ConfigurationManager.AppSettings["RedisClusterUser"];

                return redisClusterName;
            }
        }

        public static string RedisClusterJob
        {
            get
            {
                string redisClusterName = ConfigurationManager.AppSettings["RedisClusterJob"];

                return redisClusterName;
            }
        }
        public static double RedisCacheTimeOut
        {
            get
            {
                string redisCacheTimeOut = ConfigurationManager.AppSettings["RedisCacheTimeOut"];
                return Convert.ToDouble(string.IsNullOrEmpty(redisCacheTimeOut) ? 60 * 2 * 12 : Convert.ToDouble(redisCacheTimeOut));
            }
        }


    }
}
