/*
 * author:谢利民;
 * function:知识测评答题表【EI_TAnswer】操作的功能
 * adddate:2015-05-22
 * updatedate:2015-05-22
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using MySql.Data;
using MySql.Data.MySqlClient;
using Mfg.EI.DBHelper;
using System.Data;
using Mfg.EI.Common;
using Mfg.EI.ViewModel;

namespace Mfg.EI.DAL
{
    /// <summary>
    /// 测评报告的功能操作
    /// </summary>
  public  class KnowReportDal
    {
      private TAnswerDal _tanswerDal = new TAnswerDal();
      /// <summary>
        ///知识点理解掌握情况
      /// </summary>
      /// <param name="masterValue"></param>
      /// <returns></returns>
       public  string GetKnowUnderstandFive(int masterValue)
      {
          string str = string.Empty;
           if(masterValue<60)
           {
               str = "知识识记理解能力欠佳<br>";
           }
           else if(masterValue>=60&&masterValue<80)
           {
               str = "知识综合分析能力欠佳<br>";
           }
           else if(masterValue>=80&&masterValue<100)
           {
               str = "知识运用探究能力欠佳<br>";
           }
           else if(masterValue==100)
           {
               str = "知识掌握及运用能力牢固<br>";
           }
          return str.ToString();
      }

      /// <summary>
      /// 
      /// </summary>
      /// <param name="level"></param>
      /// <returns></returns>
      public string  GetKnowUnderStandLevel(string level)
       {
           string str = string.Empty;
              switch(level)
              {
                  case "4":
                      str = "知识识记理解能力欠佳<br>";
                      break;
                  case "3":
                      str = "知识综合分析能力欠佳<br>";
                      break;
                  case "2":
                      str = "知识运用探究能力欠佳<br>";
                      break;
                  case "1":
                      str = "知识掌握及运用能力牢固<br>";
                      break;

              }
              return str;
       }



       /// <summary>
       /// 根据得分率获取等级
       /// </summary>
       /// <param name="masterValue"></param>
       /// <returns></returns>
       public string GetLevel(int masterValue)
       {
           string str = string.Empty;
           if (masterValue == 40)
           {
               str = "4";
           }
           else if (masterValue == 60)
           {
               str = "3";
           }
           else if (masterValue == 80)
           {
               str = "2";
           }
           else if (masterValue == 100)
           {
               str = "1";
           }
           return str;
       }

      public string GetKnowLevel(int masterValue)
       {
           string str = string.Empty;
           if (masterValue < 60)
           {
               str = "4";
           }
           else if (masterValue >= 60 && masterValue < 80)
           {
               str = "3";
           }
           else if (masterValue >= 80 && masterValue < 100)
           {
               str = "2";
           }
           else if (masterValue == 100)
           {
               str = "1";
           }
           return str;
       }

      /// <summary>
       /// 知识点测试结果
      /// </summary>
      /// <param name="masterValue"></param>
      /// <returns></returns>
      public string GetKnowResultSix(int masterValue)
       {
           string strResult = string.Empty;
           if (masterValue < 60)
           {
               strResult = "这恰恰说明你的基础非常不扎实，认知能力可提升的空间非常大，需要养成，定时预习、复习、做练习题、检查、纠<br>正、编制错题集等良好的学习习惯。<br>遇到问题，不要急于寻找答案，细心审题，多思考，仔细推敲，得到正确答案后认真做总结。不要将过多精力放<br>在难题，偏题上面，先将基础知识打好，每一步走扎实。<br>当你回过头来看，难题已经没有那么难了。";
           }
           else if (masterValue >= 60 && masterValue < 80)
           {
               strResult = "这说明你的知识点掌握情况非常不均衡，可提升的空间很大，需要合理安排时间，将薄弱知识点逐一攻克。<br>学习前先预习，学习中要充分利用课堂时间，及时配合老师，做好笔记，并养成独立思考的好习惯。<br>先打好基础知识，然后对于掌握不好的知识点要有针对性的多做题，多思考，多总结。<br>适当选择有挑战的试题会让你成长更快。";
           }
           else if (masterValue >= 80 && masterValue < 100)
           {
               strResult = "说明你的基础知识掌握情况相对不错，但在一些难题、偏题方面可提升的空间很大，需要在巩固基础知识的同时，增加一<br>些复杂题和难题的练习。<br>自己多思考，仔细审题，保持一颗平常心，实在不会的时候再向老师或同学请教，同时认真做好笔记和总结。<br>不要太过于死抠难题、偏题，也不要过于在乎考试结果，知识点学透了，自然能考出好成绩。";
           }
           else if (masterValue == 100)
           {
               strResult = "说明你的知识点掌握情况很好。常规考试对你来说已经不是什么难事。<br>但是不能放松对自己的要求，好的习惯会让你受用一生。<br>你若学有余力，可以去做一些难题、竞赛题。也可以培养一些积极向上的爱好，开拓一下视野。丰富自己的生活。";
           }
           return strResult;
       }
      /// <summary>
      /// 获取知识点内容
      /// </summary>
      /// <param name="level"></param>
      /// <returns></returns>
     public string GetKnowResultContent(string level)
              {
                  string strResult = string.Empty;
                  switch (level)
                  {
                      case "4":
                          strResult = "这恰恰说明你的基础非常不扎实，认知能力可提升的空间非常大，需要养成，定时预习、复习、做练习题、检查、纠<br>正、编制错题集等良好的学习习惯。<br>遇到问题，不要急于寻找答案，细心审题，多思考，仔细推敲，得到正确答案后认真做总结。不要将过多精力放<br>在难题，偏题上面，先将基础知识打好，每一步走扎实。<br>当你回过头来看，难题已经没有那么难了。";
                          break;
                      case "3":
                          strResult = "这说明你的知识点掌握情况非常不均衡，可提升的空间很大，需要合理安排时间，将薄弱知识点逐一攻克。<br>学习前先预习，学习中要充分利用课堂时间，及时配合老师，做好笔记，并养成独立思考的好习惯。<br>先打好基础知识，然后对于掌握不好的知识点要有针对性的多做题，多思考，多总结。<br>适当选择有挑战的试题会让你成长更快。";
                          break;
                      case "2":
                          strResult = "说明你的基础知识掌握情况相对不错，但在一些难题、偏题方面可提升的空间很大，需要在巩固基础知识的同时，增加一<br>些复杂题和难题的练习。<br>自己多思考，仔细审题，保持一颗平常心，实在不会的时候再向老师或同学请教，同时认真做好笔记和总结。<br>不要太过于死抠难题、偏题，也不要过于在乎考试结果，知识点学透了，自然能考出好成绩。";
                          break;
                      case "1":
                          strResult = "说明你的知识点掌握情况很好。常规考试对你来说已经不是什么难事。<br>但是不能放松对自己的要求，好的习惯会让你受用一生。<br>你若学有余力，可以去做一些难题、竞赛题。也可以培养一些积极向上的爱好，开拓一下视野。丰富自己的生活。";
                          break;

                  }
                  return strResult;
              }


      /// <summary>
      /// 观察力测评报告模板
      /// </summary>
      /// <param name="testValue"></param>
      /// <returns></returns>
      public string GetObserAbility(int testValue)
      {
         string strResult=string.Empty;
          if (testValue == 40)
          {
              strResult = "测评结果表明：同学，你的观察力需大大加强<br> 在平日练习或者考试中，很多时候很多题明明会做，因为粗心、心急，题干没看全就开始动笔，或者没读懂题干要求就下笔，甚至看错选项、漏题忘答，经常因这样的粗心导致失分，真的很亏。<br>实际上，你的真实水平远远大于检测成绩。<br>建议：<br> 1、在做习题的时候，用笔一个字一个字地点过去；";
              strResult += " <br>2、每次考试后总结粗心失分的题目与数量，记在日志本上警醒自己；<br>3、生活中，和小伙伴一起观察事物并就观察结果进行讨论；<br>   坚持21天，细致的观察力便会成为习惯，相信你，一定会考出令自己惊呼的成绩。";
          }
          else if (testValue == 60)
          {
              strResult = "测评结果表明：同学，你的观察力需要提升<br> 在学习和考试中，大部分时候因为审题不仔细，没看清题干而导致失分，偶尔也会看错选项，粗心指数为3颗星，你常常会因粗心栽分10分以上。<br>  实际上，你的真实水平比检测成绩好很多，是不是有点遗憾？<br>  建议：";
              strResult += "<br>1、做练习或考试的时候，不要只求快，多检查2遍；<br>  2、将每次考试因粗心失分的题目单独摘出来，记在日志本上；<br>  3、如果考试或练习没有粗心失分，记得好好奖励自己；<br>4、谨记优秀的人在学生阶段，就会严格要求自己不粗心；<br>坚持21天，细心便会成为好习惯，相信本来很棒的你，在以后的考试中，至少会提分10分以上。";
          }
          else if (testValue == 80)
          {
              strResult = "测评结果表明：同学，你的观察还不错<br> 在平时学习中，偶尔有那么一次，会因粗心大意，本来十拿九稳的试题，因看错或写错演算结果，导致意外失分。一般会在考卷中，失分5分左右。<br> 建议：<br> 1、考试或练习中，发觉自己失分的是选择题还是问答题；<br>2、进行倒推检查，用结果反推检查；<br> 3、放松心态，学会时间管理，考试时将易错题多检查一遍；";
              strResult += " <br>更细心一点，发挥会更好。保留细心的好习惯，不仅让考试提分，更会让你终生受益。";
          }
          else if (testValue == 100)
          {
              strResult = "测评结果表明：同学，你的观察力优秀<br> 在日常学习与考试中，审题非常仔细，能够轻松避开题干与选项设置的陷阱，抓住要点，筛选出正确答案，很少会在自己熟悉的知识点丢分，真的很不错！<br>在生活中，你也是位善于观察的小可爱，善于发现与捕捉很多美好的事物，这么好的观察力，一定要好好保留与坚持。<br> 很多严谨的科学家以及专家，都有跟你一样有着优秀观察力，你的潜力无穷，长大后一定会成为了不起的人物！";
          }
          return strResult;
      }
      /// <summary>
      /// 
      /// </summary>
      /// <param name="level"></param>
      /// <returns></returns>
      public string GetObserAbilityContent(string level)
      {
          string strResult = string.Empty;
          switch (level)
          {
              case "4":
                  strResult = "测评结果表明：同学，你的观察力需大大加强<br> 在平日练习或者考试中，很多时候很多题明明会做，因为粗心、心急，题干没看全就开始动笔，或者没读懂题干要求就下笔，甚至看错选项、漏题忘答，经常因这样的粗心导致失分，真的很亏。<br>实际上，你的真实水平远远大于检测成绩。<br>建议：<br> 1、在做习题的时候，用笔一个字一个字地点过去；";
                  strResult += " <br>2、每次考试后总结粗心失分的题目与数量，记在日志本上警醒自己；<br>3、生活中，和小伙伴一起观察事物并就观察结果进行讨论；<br>   坚持21天，细致的观察力便会成为习惯，相信你，一定会考出令自己惊呼的成绩。";
                  break;
              case "3":
                 strResult = "测评结果表明：同学，你的观察力需要提升<br> 在学习和考试中，大部分时候因为审题不仔细，没看清题干而导致失分，偶尔也会看错选项，粗心指数为3颗星，你常常会因粗心栽分10分以上。<br>  实际上，你的真实水平比检测成绩好很多，是不是有点遗憾？<br>  建议：";
                 strResult += "<br>1、做练习或考试的时候，不要只求快，多检查2遍；<br>  2、将每次考试因粗心失分的题目单独摘出来，记在日志本上；<br>  3、如果考试或练习没有粗心失分，记得好好奖励自己；<br>4、谨记优秀的人在学生阶段，就会严格要求自己不粗心；<br>坚持21天，细心便会成为好习惯，相信本来很棒的你，在以后的考试中，至少会提分10分以上。";
                  break;
              case "2":
                  strResult = "测评结果表明：同学，你的观察还不错<br> 在平时学习中，偶尔有那么一次，会因粗心大意，本来十拿九稳的试题，因看错或写错演算结果，导致意外失分。一般会在考卷中，失分5分左右。<br> 建议：<br> 1、考试或练习中，发觉自己失分的是选择题还是问答题；<br>2、进行倒推检查，用结果反推检查；<br> 3、放松心态，学会时间管理，考试时将易错题多检查一遍；";
                  strResult += " <br>更细心一点，发挥会更好。保留细心的好习惯，不仅让考试提分，更会让你终生受益。";
                  break;
              case "1":
                  strResult = "测评结果表明：同学，你的观察力优秀<br> 在日常学习与考试中，审题非常仔细，能够轻松避开题干与选项设置的陷阱，抓住要点，筛选出正确答案，很少会在自己熟悉的知识点丢分，真的很不错！<br>在生活中，你也是位善于观察的小可爱，善于发现与捕捉很多美好的事物，这么好的观察力，一定要好好保留与坚持。<br> 很多严谨的科学家以及专家，都有跟你一样有着优秀观察力，你的潜力无穷，长大后一定会成为了不起的人物！";
                  break;

          }
          return strResult;
      }



      /// <summary>
      /// 想象力测评报告模板
      /// </summary>
      /// <param name="testValue"></param>
      /// <returns></returns>
      public string GetImagination(int testValue)
      {
          string strResult = string.Empty;
          if (testValue == 40)
          {
              strResult = "测评结果表明：同学，你的想象力需大大加强<br> 很多时候，觉得语文古诗词很难背、英语单词难记、政史地也很难记得住，数理化中遇到诸如需要添加辅助线、分析图等延伸空间想象力时，就会觉得比较吃力，写的作文也感觉不够吸引人。其实很多同学都有这方面的困惑，是因为咱们的画面感、影像感、空间感等想象力还需要加强，怎么提升呢？<br>";
              strResult += "建议：<br> 1、平日多观察，做生活的有心人；<br> 2、多读文学作品诸如小说、科幻、故事、历史等；<br> 3、可以去学学素描绘画、参观科技馆、看3D电影等提升空间感与空间想象力 <br>4、多看好玩的漫画、动漫、电视、电影等；<br>不知不觉，你会发现好多奇思妙想都涌进来了，学习变得有趣与好玩多了，各科成绩提升越来越轻松。  ";
          }
          else if (testValue == 60 )
          {
              strResult = "测评结果表明：同学，你的想象力需要提升<br> 偶尔，存在偏科现象。某些学科成绩较好，有些学科学起来很吃力，因为想象力还未发挥潜力，譬如诗词、古文、历史、生物、地理等记忆起来费工夫，数理化感觉有点抽象，偶尔会困惑。<br>建议：<br>1、找出自己偏科的学科，搞清哪些地方是难学与困惑的点；";
              strResult += "<br>2、针对难学的点，建立起联想，将其与好玩的画面联系起来；<br>3、跟同学、老师一起探讨联想思维法、归纳法与记忆法；<br>4、多观察、多思考、多阅读、多参加各类科技、文艺活动；<br>想象力不是天生的，通过后天可以学习与增强，多阅读多观察，多思考，相信插上想象的翅膀，你的学习会更轻松。";
          }
          else if (testValue == 80)
          {
              strResult = "测评结果表明：同学，你的想象力比较丰富<br> 你的想象力比较丰富！文科方面能够轻松在头脑中创造一个念头或画面，理科诸如数理化也可以很快构建起空间想象力，学习也相对轻松，只会偶尔，产生一点点困惑。<br> 建议：<br>1、针对薄弱科目，建立起想象力的连接；<br> 2、如果是理科方面薄弱的地方，多去参加科技馆或者学学素描、绘画；<br> 3、多阅读，多提升，多参加课外活动，多和同学交流；";
          }
          else if (testValue == 100)
          {
              strResult = "测评结果表明：同学，你的想象力丰富<br> 你的想象力丰富，在课堂上，其他小伙伴还在冥思苦想，你已在大脑中勾勒出清晰的解题路径。<br> 很多时候，老师只要轻轻点拨，你就能心领神会，对于已学习过的知识点，也能够做到举一反三，触类旁通。写起作文来，更是妙笔生花。<br> 你有当科学家或者作家的潜质，想象力丰富的你，一定会有美妙的将来，不过，记得不要在课堂上天马行空。";
          }
          return strResult;
      }
      /// <summary>
      /// 
      /// </summary>
      /// <param name="level"></param>
      /// <returns></returns>
      public string GetImaginationContent(string level)
      {
          string strResult = string.Empty;
          if (level =="4")
          {
              strResult = "测评结果表明：同学，你的想象力需大大加强<br> 很多时候，觉得语文古诗词很难背、英语单词难记、政史地也很难记得住，数理化中遇到诸如需要添加辅助线、分析图等延伸空间想象力时，就会觉得比较吃力，写的作文也感觉不够吸引人。其实很多同学都有这方面的困惑，是因为咱们的画面感、影像感、空间感等想象力还需要加强，怎么提升呢？<br>";
              strResult += "建议：<br> 1、平日多观察，做生活的有心人；<br> 2、多读文学作品诸如小说、科幻、故事、历史等；<br> 3、可以去学学素描绘画、参观科技馆、看3D电影等提升空间感与空间想象力 <br>4、多看好玩的漫画、动漫、电视、电影等；<br>不知不觉，你会发现好多奇思妙想都涌进来了，学习变得有趣与好玩多了，各科成绩提升越来越轻松。  ";
          }
          else if (level == "3")
          {
              strResult = "测评结果表明：同学，你的想象力需要提升<br> 偶尔，存在偏科现象。某些学科成绩较好，有些学科学起来很吃力，因为想象力还未发挥潜力，譬如诗词、古文、历史、生物、地理等记忆起来费工夫，数理化感觉有点抽象，偶尔会困惑。<br>建议：<br>1、找出自己偏科的学科，搞清哪些地方是难学与困惑的点；";
              strResult += "<br>2、针对难学的点，建立起联想，将其与好玩的画面联系起来；<br>3、跟同学、老师一起探讨联想思维法、归纳法与记忆法；<br>4、多观察、多思考、多阅读、多参加各类科技、文艺活动；<br>想象力不是天生的，通过后天可以学习与增强，多阅读多观察，多思考，相信插上想象的翅膀，你的学习会更轻松。";
          }
          else if (level == "2")
          {
              strResult = "测评结果表明：同学，你的想象力比较丰富<br>你的想象力比较丰富！文科方面能够轻松在头脑中创造一个念头或画面，理科诸如数理化也可以很快构建起空间想象力，学习也相对轻松，只会偶尔，产生一点点困惑。<br> 建议：<br>1、针对薄弱科目，建立起想象力的连接；<br> 2、如果是理科方面薄弱的地方，多去参加科技馆或者学学素描、绘画；<br> 3、多阅读，多提升，多参加课外活动，多和同学交流；";
          }
          else if (level == "1")
          {
              strResult = "测评结果表明：同学，你的想象力丰富<br> 你的想象力丰富，在课堂上，其他小伙伴还在冥思苦想，你已在大脑中勾勒出清晰的解题路径。<br> 很多时候，老师只要轻轻点拨，你就能心领神会，对于已学习过的知识点，也能够做到举一反三，触类旁通。写起作文来，更是妙笔生花。<br> 你有当科学家或者作家的潜质，想象力丰富的你，一定会有美妙的将来，不过，记得不要在课堂上天马行空。";
          }
          return strResult;
      }
      /// <summary>
      /// 意志力测评报告模板
      /// </summary>
      /// <returns></returns>
       public string GetWillpower(int testItem)
      {
          string strResult = string.Empty;
          if (testItem == 100)
           {
               strResult = "测评结果表明：同学，你的意志力很优秀<br> 你的意志力优秀！你有一股发自内心的强大学习能量。即使面对一些繁重的学习任务，也能通过不懈努力顺利完成。再难的困境，通过你的坚持，也会被水滴石穿，最终拿下！成功者常常是意志力坚强的人，通过对意志力的训练和加强，未来的你可以征服常人难以征服的障碍，完成常人难以完成的事业。";
           }
          else if (testItem == 80)
           {
               strResult = "测评结果表明：同学，你的意志力不错<br>你的意志力不错，一般学习任务对你来说不在话下，随着学习难度的提高，偶尔也会在心底里有一点点“打退堂鼓”，不过，意志力不错的你，也只是偶尔在心里想想，很难会放弃。<br>建议：<br> 1、适当的时候，可以放松放松；<br> 2、快要放弃的时候，找一个正能量的小伙伴为自己打气；<br> 坚信自己在朝着更好努力，要取得成就，就要多努力多坚持。";
           }
          else if (testItem == 60)
           {
               strResult = "测评结果表明：同学，你的意志力需要提升<br>偶尔，会这些表现：犹豫、拖沓、心不在焉、粗心大意、优柔寡断、没有观点、固执己见等。坚持的事情，一段时间后便会放弃。<br> 不过，你无需对此过于苦恼，克服它们，提升个人的意志力，完全可以通过不断训练来提高，只要制定一些明确的目标，并且一步一步实现，便可成为一个意志坚强的孩子。<br> 建议：<br> 1、阶段性，建立一个具有挑战的明确目标；";
               strResult += "2、找一个意志力不错的小伙伴或者哥哥姐姐监督自己；<br>3、相信自己很棒，不过要坚持与自控。";
           }
          else if (testItem ==40)
           {
               strResult = "测评结果表明：同学，你的意志力需要大大提升<br> 你的意志力需要大大提升，或许你已对自己的“有头无尾”苦恼很久。在一些学习问题上，容易三分钟热度。<br>刚开始信心满满学习、练习，一旦因考试不理想、同学邀约去玩，或者觉得“辛苦”，在外界的“诱惑”以及自我的借口下，比较容易放弃，这正是意志力薄弱的表现。克服它，平时要注重培养善始善终的习惯，逐渐建立起自控能力。<br> ";
               strResult += "建议：<br>1、制定计划每天进行总结，找人监督以及自我监督；<br>  2、找一个有意志力的小伙伴，一起坚持；<br> 3、选定一个感兴趣的事情，坚持21天；<br>  4、始终告诉自己，只要坚持，一定会进步。";
           }
           return strResult;
      }

      /// <summary>
      /// 
      /// </summary>
      /// <param name="level"></param>
      /// <returns></returns>
      public string GetWillpowerContent(string level)
       {
           string strResult = string.Empty;
           if (level == "1")
           {
               strResult = "测评结果表明：同学，你的意志力很优秀<br> 你的意志力优秀！你有一股发自内心的强大学习能量。即使面对一些繁重的学习任务，也能通过不懈努力顺利完成。再难的困境，通过你的坚持，也会被水滴石穿，最终拿下！成功者常常是意志力坚强的人，通过对意志力的训练和加强，未来的你可以征服常人难以征服的障碍，完成常人难以完成的事业。";
           }
           else if (level == "2")
           {
               strResult = "测评结果表明：同学，你的意志力不错<br> 你的意志力不错，一般学习任务对你来说不在话下，随着学习难度的提高，偶尔也会在心底里有一点点“打退堂鼓”，不过，意志力不错的你，也只是偶尔在心里想想，很难会放弃。<br>建议：<br> 1、适当的时候，可以放松放松；<br> 2、快要放弃的时候，找一个正能量的小伙伴为自己打气；<br> 坚信自己在朝着更好努力，要取得成就，就要多努力多坚持。";
           }
           else if (level == "3")
           {
               strResult = "测评结果表明：同学，你的意志力需要提升<br>偶尔，会这些表现：犹豫、拖沓、心不在焉、粗心大意、优柔寡断、没有观点、固执己见等。坚持的事情，一段时间后便会放弃。<br> 不过，你无需对此过于苦恼，克服它们，提升个人的意志力，完全可以通过不断训练来提高，只要制定一些明确的目标，并且一步一步实现，便可成为一个意志坚强的孩子。<br> 建议：<br> 1、阶段性，建立一个具有挑战的明确目标；";
               strResult += "2、找一个意志力不错的小伙伴或者哥哥姐姐监督自己；<br>3、相信自己很棒，不过要坚持与自控。";
           }
           else if (level == "4")
           {
               strResult = "测评结果表明：同学，你的意志力需要大大提升<br> 你的意志力需要大大提升，或许你已对自己的“有头无尾”苦恼很久。在一些学习问题上，容易三分钟热度。<br>刚开始信心满满学习、练习，一旦因考试不理想、同学邀约去玩，或者觉得“辛苦”，在外界的“诱惑”以及自我的借口下，比较容易放弃，这正是意志力薄弱的表现。克服它，平时要注重培养善始善终的习惯，逐渐建立起自控能力。<br> ";
               strResult += "建议：<br>1、制定计划每天进行总结，找人监督以及自我监督；<br>  2、找一个有意志力的小伙伴，一起坚持；<br> 3、选定一个感兴趣的事情，坚持21天；<br>  4、始终告诉自己，只要坚持，一定会进步。";
           }
           return strResult;
       }
      /// <summary>
       /// 计算感知题平均分
      /// </summary>
      /// <param name="taid"></param>
      /// <returns></returns>
      public double GetAverageG(string taid)
       {
           double G = 0;
           int sumTotal2 = 0;
           int sumTotal = 0;
           string tempX = string.Empty;
           string tempY = string.Empty;
           int sumTotal3 = 0;
           string tempZ = string.Empty;
           List<EI_TAnswer> datalist = _tanswerDal.GetModelList(taid);
        
          // int count = 0;
           if (datalist != null)
           {
               var dataImg2 = datalist.Where(x => x.ItemSource == 2);
               if(dataImg2!=null)
               {
                   //想象力试题得分 
                   foreach (var item in dataImg2)
                   {
                       switch (item.Answer)
                       {
                           case "A":
                               sumTotal2 += 0;
                               break;
                           case "B":
                               sumTotal2 += 1;
                               break;
                           case "C":
                               sumTotal2 += 2;
                               break;
                           case "D":
                               sumTotal2 += 3;
                               break;
                       }
                   }

               }
             
               if (sumTotal2 >= 0 && sumTotal2 <= 3)
               {
                   tempX = "1";
               }
               else if (sumTotal2 >= 4 && sumTotal2 <= 7)
               {
                   tempX = "0.8";
               }
               else if (sumTotal2 >= 8 && sumTotal2 <= 11)
               {
                   tempX = "0.6";
               }
               else if (sumTotal2 >= 12 && sumTotal2 <= 15)
               {
                   tempX = "0.4";
               }
               else
               {
                   tempX = "0";
               }
               //观察力试题得分
               var dataImg = datalist.Where(x => x.ItemSource == 1).ToList();
               if (dataImg!=null)
               {
                   foreach (var item in dataImg)
                   {
                       switch (item.Answer)
                       {
                           case "A":
                               sumTotal += 0;
                               break;
                           case "B":
                               sumTotal += 1;
                               break;
                           case "C":
                               sumTotal += 2;
                               break;
                           case "D":
                               sumTotal +=3;
                               break;
                       }
                   }
               }

               if (sumTotal >= 0 && sumTotal <= 3)
               {
                   tempY = "1";
               }
               else if (sumTotal >= 4 && sumTotal <= 7)
               {
                   tempY = "0.8";
               }
               else if (sumTotal >= 8 && sumTotal <= 11)
               {
                   tempY = "0.6";
               }
               else if (sumTotal >= 12 && sumTotal <= 15)
               {
                   tempY = "0.4";
               }
               else
               {
                   tempY = "0.2";
               }
               //意志力
               var dataImg3 = datalist.Where(x => x.ItemSource == 3).ToList();

               if (dataImg3!=null)
               {
                   foreach (var item in dataImg3)
                   {
                       switch (item.Answer)
                       {
                           case "A":
                               sumTotal3 += 0;
                               break;
                           case "B":
                               sumTotal3 += 1;
                               break;
                           case "C":
                               sumTotal3 += 2;
                               break;
                           case "D":
                               sumTotal3 += 3;
                               break;
                       }
                   }
               }

               if (sumTotal3 >= 0 || sumTotal3 <= 3)
               {
                   tempZ = "1";
               }
               else if (sumTotal3 >= 4 && sumTotal3 <= 7)
               {
                   tempZ = "0.8";
               }
               else if (sumTotal3 >= 8 && sumTotal3 <= 11)
               {
                   tempZ = "0.6";
               }
               else if (sumTotal3 >= 12 && sumTotal3 <= 15)
               {
                   tempZ = "0.4";
               }
               else
               {
                   tempZ = "0.2";
               }
               G =Convert.ToDouble((Convert.ToDouble(tempX) + Convert.ToDouble(tempY) + Convert.ToDouble(tempZ)) / 3);
           }
      
           return G;
       }
 
      /// <summary>
      /// 推荐学时计算算法
      /// </summary>
      /// <param name="masterValue"></param>
      /// <param name="M">知识点设计学时</param>
      /// <param name="N">实际学时</param>
      /// <param name="G">感知题平均分为G</param>
      /// <param name="T">培训目的: 差生提分(T=0)培优、竞赛(T = 30)</param>
      /// <returns></returns>
      public double GetHoursCalculation(int masterValue,int M,double G,int T)
      {
          double N = 0;
         if(masterValue<60)
         {
             N = M;
         }
         else if(masterValue>=60&&masterValue<70)
         {
             N=(M*((T+90 -100 >0)?100:(T+90))/100)*70/100+M*G*30/100;
         }
         else if(masterValue>=70&&masterValue<80)
         {
             N = (M * ((T + 80 - 100 > 0) ? 100 : (T + 80)) / 100) * 70 / 100 + M * G * 30 / 100;
         }
         else if(masterValue>=80&&masterValue<90)
         {
             N=(M*((T+50 -100 > 0 )?100:(T+50))/100)*70/100+M*G*30/100;
         }
         else if(masterValue>=90&&masterValue<100)
         {
             N=(M*((T+30 -100 > 0 )?100:(T+30) )/100)*70/100+M*G*30/100;
         }
          else if(masterValue==100)
         {
             N=M*G*30/100;
         }
          return N;
      }
    }
}
