using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using Mfg.Comm.DB.Redis;
using Mfg.Comm.Func;
using Mfg.EI.Entity;
using mfg_Zookeeper.Registry.Entity;
using ServiceStack.Redis;

namespace Mfg.EI.DBHelper
{
    public class RedisHelper
    {
        #region demo

        /// <summary>对单个键的操作
        /// </summary>
        //private void siglekey()
        //{
        //    RedisSharedHelper rhelper = new RedisSharedHelper();

        //    //此处必须使用client
        //    using (var client = rhelper.GetRedisClient(
        //        Category.Jigou, //应用模块分类，请把这个值换成你开发的功能模块代码，如果是全平台功能，请使用globle
        //        ConfigurationManager.AppSettings["MYredisClusterName"],
        //        //此处传递的是集群的名称，安装dbhelper的时候，在app.config或者web.config中有demo。
        //        CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, "ceshi", "60006000"))
        //        //要查询或操作的键，这个键必须由CacheKeyBuilder类统一生成，以防止不同应用之间的数据覆盖。
        //        )
        //    {
        //        //这里展示的是利用client获取一个string型的值。也可以获取set、hash甚至创建管道、创建事务。关于client的更多用法请参阅ServiceStack.Redis中的IRedisClient、RedisClient。
        //        string value =
        //            client.GetValue(CacheKeyBuilder.GetKey((int)ApplicationIdentifier.zuoye, "ceshi", "60006000"));
        //    }

        //    using (var client = rhelper.GetRedisClient(
        //        Category.Jigou, //应用模块分类，请把这个值换成你开发的功能模块代码，如果是全平台功能，请使用globle
        //        ConfigurationManager.AppSettings["MYredisClusterName"],
        //        CacheKeyBuilder.GetKey((int)ApplicationIdentifier.zuoye, "ceshi2", "60006000")))
        //    {
        //        //这里展示的是利用client获取一个hash中一个键的值，这个键有别于redis中的key。
        //        string value2 =
        //            client.GetValueFromHash(
        //                CacheKeyBuilder.GetKey((int)ApplicationIdentifier.zuoye, "ceshi2", "60006000"), "p_photo");
        //    }
        //}

        ////获取一批数据
        //private void mulitkeys()
        //{
        //    List<string> keys = new List<string>(); //将要查询的key
        //    Dictionary<string, object> result = new Dictionary<string, object>(); //结果的存储，这里只是一个demo，可以根据的自己的业务调整
        //    keys.Add(CacheKeyBuilder.GetKey((int)ApplicationIdentifier.zuoye, "ceshi", "60006000"));
        //    keys.Add(CacheKeyBuilder.GetKey((int)ApplicationIdentifier.zuoye, "ceshi", "60006001"));
        //    keys.Add(CacheKeyBuilder.GetKey((int)ApplicationIdentifier.zuoye, "ceshi", "60006002"));
        //    RedisSharedHelper rhelper = new RedisSharedHelper();
        //    //这里在展示如果利用RedisSharedHelper操作多个key
        //    rhelper.MuiltKeys(
        //        Category.Usercenter, //应用模块分类，请把这个值换成你开发的功能模块代码，如果是全平台功能，请使用globle
        //        ConfigurationManager.AppSettings["MYredisClusterName"],
        //        keys, //这个参数是你想要查询或者操作的key
        //        //下边这个参数是一个action，可以用这种方式来自定义对key的操作。之所以这么写是由于在你查询的所有key中会有一部分key不存在的情况，需要你自己加载到缓存中。
        //        //这个action提供两个参数，第一个参数是一个IRedisClient实例，第二个参数是分布在这个IRedisClient实例上的key。
        //        (IRedisClient client, List<string> mukey) =>
        //        {
        //            if (mukey.Count > 1) //对于多个键的查询建议使用管道形式，来提高访问速度。
        //            {
        //                using (var pipeline = client.CreatePipeline())
        //                {
        //                    foreach (string key in mukey)
        //                    {
        //                        pipeline.QueueCommand(c => c.GetValue(key), y => result.Add(key, y));
        //                        //这个是ServiceStack.Redis中管道的一个重载方法，该方法的更多使用请参阅ServiceStack.Redis


        //                    }
        //                    pipeline.Flush();
        //                }

        //            }
        //            else if (mukey.Count > 0)
        //            {
        //                result.Add(mukey[0], client.GetValue(mukey[0]));
        //            }

        //        });
        //    List<string> notExist = keys.Where(k => !result.ContainsKey(k)).ToList();
        //    //去查询缓存中不存在的key，并将key存入result中。此处属于业务逻辑，就不再提供样例代码
        //    //将不存在的key加载到缓存中。
        //    rhelper.MuiltKeys(
        //        Category.Usercenter, //应用模块分类，请把这个值换成你开发的功能模块代码，如果是全平台功能，请使用globle
        //        ConfigurationManager.AppSettings["MYredisClusterName"],
        //        notExist,
        //        (IRedisClient client, List<string> mukey) =>
        //        {
        //            if (mukey.Count > 1)
        //            {

        //                using (var pipeline = client.CreatePipeline())
        //                {
        //                    foreach (string key in mukey)
        //                    {
        //                        pipeline.QueueCommand(c => c.Set<string>(key, result[key].ToString()));
        //                    }
        //                    pipeline.Flush();
        //                }

        //            }
        //            else if (mukey.Count > 0)
        //            {
        //                client.Set<string>(mukey[0], result[mukey[0]].ToString());
        //            }

        //        });
        //}

        #endregion
        static RedisHelper()
        {
            Rhelper = new RedisSharedHelper();
        }

        private static readonly RedisSharedHelper Rhelper;
        #region string
        /// <summary>
        /// 保存value
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool SetValue(RedisTypeEnum type, string key, object value)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                    ? ConfigInfo.RedisClusterUser
                    : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), key);
                using (var client = new RedisSharedHelper().GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.Set(redisKey, value, DateTime.Now.AddMinutes(ConfigInfo.RedisCacheTimeOut));
                }
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }

        public static bool SetValue<T>(RedisTypeEnum type, string key, T value)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                    ? ConfigInfo.RedisClusterUser
                    : ConfigInfo.RedisClusterJob;
                var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), key);
                using (var client = new RedisSharedHelper().GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    //client.SetEntryInHash(redisKey, "sub", "01");
                    //client.SetEntryInHash(redisKey, "name", "woshi name");

                    //                     client.SetEntryInHash(, "");
                    //client.RemoveEntryFromHash(redisKey, "ques-" + qid)02
                    return client.Set<T>(redisKey, value, DateTime.Now.AddMinutes(ConfigInfo.RedisCacheTimeOut));

                }
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }

        /// <summary>
        /// 读取value
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetValue(RedisTypeEnum type, string key)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), key);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {

                    return client.GetValue(key);
                    //return client.Get<object>(redisKey);
                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return string.Empty;
            }
        }

        public static T GetValue<T>(RedisTypeEnum type, string key)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), key);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.Get<T>(redisKey);
                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                T t = default(T);
                return t;
            }
        }
        #endregion
        #region Hash

        /// <summary>
        /// 根据hashid，获取键值对
        /// </summary>
        /// <param name="type"></param>
        /// <param name="hashId"></param>
        /// <returns></returns>
        public static Dictionary<string, string> GetAllEntriesFromHash(RedisTypeEnum type, string hashId)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                //var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.GetAllEntriesFromHash(redisKey);
                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return null;
            }
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
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                //var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.GetValuesFromHash(redisKey, keys);

                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return null;
            }
        }


        public static List<string> GetHashKeys(RedisTypeEnum type, string hashId)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                //var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.GetHashKeys(redisKey);

                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return null;
            }
        }

        public static bool HashContainsEntry(RedisTypeEnum type, string hashId, string filedId)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                //var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.HashContainsEntry(redisKey, filedId);

                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }

        public static bool ContainsKey(RedisTypeEnum type, string key)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;

                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), key);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.ContainsKey(redisKey);
                }


            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }

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
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                //var ename = Enum.GetName(typeof(Category), Category.Jigou);
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.GetValueFromHash(redisKey, key);
                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return null;
            }
        }

        /// <summary>
        /// 根据hashid，设置键值对
        /// </summary>
        /// <param name="type"></param>
        /// <param name="hashId"></param>
        /// <param name="keyValuePairs"></param>
        /// <returns></returns>
        public static bool SetRangeInHash(RedisTypeEnum type, string hashId, IEnumerable<KeyValuePair<string, string>> keyValuePairs)
        {

            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    client.SetRangeInHash(redisKey, keyValuePairs);
                    //设置过期时间
                    client.ExpireEntryAt(redisKey, DateTime.Now.AddMinutes(ConfigInfo.RedisCacheTimeOut));

                    //client.ExpireEntryAt(redisKey, DateTime.Now.AddSeconds(180));


                }
                return true;

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }

        /// <summary>
        /// 根据hashid，设置键值对
        /// </summary>
        /// <param name="type"></param>
        /// <param name="hashId"></param>
        /// <param name="keyValuePairs"></param>
        /// <returns></returns>
        public static bool SetEntryInHash(RedisTypeEnum type, string hashId, KeyValuePair<string, string> keyValuePair)
        {

            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    client.SetEntryInHash(redisKey, keyValuePair.Key, keyValuePair.Value);
                    //设置过期时间
                    client.ExpireEntryAt(redisKey, DateTime.Now.AddMinutes(ConfigInfo.RedisCacheTimeOut));

                }
                return true;

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }
        public static bool RemoveEntryFromHash(RedisTypeEnum type, string hashId, string key)
        {

            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), hashId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    return client.RemoveEntryFromHash(redisKey, key);
                }
                return true;

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }

        #endregion
        #region Set 集合类型

        /// <summary>
        /// 添加项目到集合
        /// </summary>
        /// <param name="type"></param>
        /// <param name="setId"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        public static bool AddItemToSet(RedisTypeEnum type, string setId, string item)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                    ? ConfigInfo.RedisClusterUser
                    : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), setId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    client.AddItemToSet(redisKey, item);
                }
                return true;
            }
            catch (Exception ex)
            {

                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }
        /// <summary>
        /// 批量添加项目到集合
        /// </summary>
        /// <param name="type"></param>
        /// <param name="setId"></param>
        /// <param name="items"></param>
        /// <returns></returns>
        public static bool AddRangeToSet(RedisTypeEnum type, string setId, List<string> items)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                    ? ConfigInfo.RedisClusterUser
                    : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), setId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    client.AddRangeToSet(redisKey, items);
                }
                return true;
            }
            catch (Exception ex)
            {

                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }
        //删除集合中指定项目
        public static bool RemoveItemFromSet(RedisTypeEnum type, string setId, string item)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                    ? ConfigInfo.RedisClusterUser
                    : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), setId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    client.RemoveItemFromSet(redisKey, item);
                }
                return true;
            }
            catch (Exception ex)
            {

                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }
        /// <summary>
        /// 判断集合中是否存在指定项
        /// </summary>
        /// <param name="type"></param>
        /// <param name="setId"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        public static bool SetContainsItem(RedisTypeEnum type, string setId, string item)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                    ? ConfigInfo.RedisClusterUser
                    : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), setId);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {
                    //client.RemoveItemFromSet(redisKey, item);
                    return client.SetContainsItem(setId, item);
                }
                return true;
            }
            catch (Exception ex)
            {

                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }

        #endregion

        #region common
        /// <summary>
        /// 移除key
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool RemoveKey(RedisTypeEnum type, string key)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), key);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {

                    return client.Remove(redisKey);
                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }
        }
        /// <summary>
        /// 设置过期时间
        /// </summary>
        /// <param name="type"></param>
        /// <param name="key"></param>
        /// <param name="timeSpan"></param>
        /// <returns></returns>
        public static bool ExpireEntryAt(RedisTypeEnum type, string key, int timeSpan)
        {
            try
            {
                var clusertName = type == RedisTypeEnum.Userinfo
                     ? ConfigInfo.RedisClusterUser
                     : ConfigInfo.RedisClusterJob;
                var redisKey = CacheKeyBuilder.GetKey((int)ApplicationIdentifier.JiGou, ((int)type).ToString(), key);
                using (var client = Rhelper.GetRedisClient(Category.Jigou, clusertName, redisKey))
                {

                    //设置过期时间
                    client.ExpireEntryAt(redisKey, DateTime.Now.AddSeconds(timeSpan));
                }
                return true;

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return false;
            }

        }

        #endregion





    }


}