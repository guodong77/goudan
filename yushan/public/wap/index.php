<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx4ebb8c954a411d91", "7e7c47ccd966da56097952925f4a4ff1");
$signPackage = $jssdk->GetSignPackage();
$news = $jssdk->GetNews();
?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>河狸建筑</title>
    <meta content="河狸建筑,河狸建筑工程信息化平台" name="keywords" />
    <meta content="河狸建筑工程信息化平台，是专门为资料员量身打造的工程管理系统，集成功能：送检计划，
送检汇总，进度管理，漏送统计及提示，送检异常统计，城市温度采集，同养温度计算及累计，
形象进度图，横道图，资料打印等功能。手机微信关注河狸建筑，让你随时随地了解现场及送检进度，
是资料员得力助手，为您提供贴心服务。河狸建筑在手，工程无忧！" name="description" />
    <link rel="stylesheet" href="./css/weui.min.css"/> 
    <link rel="stylesheet" href="./css/global.css"/> 
     <script src="./js/md5.js"></script>

    <script src="./js/jquery-1.8.3.min.js"></script>
    <script src="./js/jquery.fullPage.min.js"></script>

    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> 
    <script src="./js/echarts.min.js"></script> 

    
</head>
<body ontouchstart>
<div style="height: 1px;display: none;">
    <img src="./images/ysshare.jpg" alt="">
</div>
    <div class="weui-toptips weui-toptips_warn js_tooltips">错误提示</div>

    <div class="container" id="container"></div>
   
    <div id="loadingToast" style="opacity: 0;display: none;">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">加载中</p>
        </div>
    </div>

    <div id="toast" style=" opacity: 0; display: none;">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">已完成</p>
        </div>
    </div>

    <div class="js_dialog" id="iosDialog1" style=" display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">河狸建筑提示</strong></div>
                <div class="weui-dialog__bd" id="diatext">您确定要删除选中项么？</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn dialogsno weui-dialog__btn_default">取消</a>
                    <a href="javascript:;" class="weui-dialog__btn dialogsyes weui-dialog__btn_primary">确定</a>
                </div>
            </div>
        </div>


<div id="lip" style="z-index: 100000;display: none;" class="layui-m-layermain">
  <div class="layui-m-layersection">
    <div style="bottom: auto;" class="layui-m-layerchild layui-m-layer-msg  layui-m-anim-up">
      <div class="layui-m-layercont con"></div>
  </div>
</div>
</div>
 

<!-- 首页 -->
    <script type="text/html" id="tpl_home"><div class="page" >
    <div v-cloak class="page__bd" style="height: 100%;" id="myprolist">
        <div class="weui-tab">
            <div class="weui-tab__panel">
    <!-- 轮播图  -->
             <div class="vh_32  bgc_1">
               
<div id="focus" class="focus">
        <div class="hd">
          <ul></ul>
        </div>
        <div class="bd font_wryh">
          <ul>
            <li>
              <div class="fc_f banner1">
                <div class="banner1p">
                  <h2>四大模块齐上线</h2>
                   <p>送检跟踪、进度管理</p>
                   <p>送检汇总、横道图 </p>
                </div> 
                <div class="banner1i"><img src="./images/tb1.png" /></div>
                           
              </div>
            </li>
             <li>
              <div class="fc_f banner2">
                <div class="banner2nr">
                   <h2>云端工程管理系统</h2>
                   <p>多终端、多平台在线监控</p>
                   <p>最智能工程信息化平台 </p>
                </div>
                <div class="banner2i"><img src="./images/tb2.png" /></div>          
              </div>
            </li>
            <li>
              <div class="fc_f banner3">
                <div class="banner3nr">
                   <h2>免费是最昂贵的礼物</h2>
                   <p>为普通会员提供永久平台支撑</p>
                   <p>同时支持付费定制服务</p>
                 <p>多元化服务方式满足各类用户需求</p>
                </div>
                <div class="banner3i"><img src="./images/tb3.png" /></div>         
              </div>
            </li> 
          </ul>
        </div>
      </div>


             </div>
   <!-- 功能选择 --> 
          <section v-if="pronum()>0" class="platecss"> 
              <div class="nine_row h_p50 mbvw_1_5">
                <a  href="javascript:;" data-id="work" class="one1 mrvw_1_5 features vw_15 js_item"> 
                    <div class="dpib">
                      <img class="ico10" src="./images/ico10.png" alt="">
                    </div>
                    <span>进度管理</span>
                  </a>
                
                <a  href="javascript:;" data-id="plan" class="one1 features vw_15 js_item"> 
                  <div class="dpib">
                    <img class="ico11" src="./images/ico11.png" alt="">
                  </div>
                  <span>送检计划</span>
                </a>                 
              </div>
              <div class="nine_row h_p50">
                <a href="javascript:;" data-id="gether" class="one1 mrvw_1_5 features vw_15 js_item"> 
                  <div class="dpib">
                    <img class="ico13" src="./images/ico13.png" alt="">
                  </div>
                  <span>送检汇总</span>
                </a> 
                <a  href="javascript:;" data-id="base"  class="one1 features vw_15 js_item"> 
                  <div class="dpib"> 
                    <img class="ico12" src="./images/ico12.png" alt="">
                  </div>
                  <span>工程概况</span> 
                </a>                               
              </div>           
          </section>

          <section v-if="pronum()==0" class="platecss"> 
              <div class="nine_row h_p50 mbvw_1_5">
                <a  href="javascript:;"  class="one1 mrvw_1_5 features vw_15" @click="nopro()"> 
                    <div class="dpib">
                      <img class="ico10" src="./images/ico10.png" alt="">
                    </div>
                    <span>进度管理</span>
                  </a>
                
                <a  href="javascript:;" class="one1 features vw_15" @click="nopro()"> 
                  <div class="dpib">
                    <img class="ico11" src="./images/ico11.png" alt="">
                  </div>
                  <span>送检计划</span>
                </a>                 
              </div>
              <div class="nine_row h_p50">
                <a href="javascript:;" class="one1 mrvw_1_5 features vw_15" @click="nopro()"> 
                  <div class="dpib">
                    <img class="ico13" src="./images/ico13.png" alt="">
                  </div>
                  <span>送检汇总</span>
                </a> 
                <a  href="javascript:;"  class="one1 features vw_15" @click="nopro()"> 
                  <div class="dpib"> 
                    <img class="ico12" src="./images/ico12.png" alt="">
                  </div>
                  <span>工程概况</span> 
                </a>                               
              </div>           
          </section>

<div class="weui-cells"  v-cloak v-if="prodata.length==0" >
    <a class="weui-cell weui-cell_access js_item js_itemone" href="javascript:;" data-id="addpro" style="padding: 30px 15px;">
        <div class="weui-cell__bd weui-cell_primary t_c">
            <p><img width="32" class="valb" src="./images/add.png" alt=""> <span class="fc_1 f_23 fw_b">创建工程</span></p>
        </div> 
    </a>
    
</div>

   <!--   工程列表 -->   
     <div v-cloak v-if="prodata.length>0" class="h_r3 plr_1_5">
      <div class="nine_row h_100p bgc_f">
        <div class="one5 ">
        <div class="t_l w_p100 pd_3vw hometitle">
          我的工程
        </div>          
        </div>
          <div class="one5"></div>
          <div class="one1">
            <a class="js_item" href="javascript:;" data-id="addpro"  title="" style="display: block;">
            <img src="./images/ico14.png" class="homeaddimg" alt="">
            </a>
          </div>            
        </div>
      </div>
   <!--         列表内容  -->
    <div class="plr_3">
      <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd ">
      <a v-cloak  v-if="value.isdel!=1" href="javascript:;" class="weui-media-box weui-media-box_appmsg touchArea js_item" data-id="sin" @click="checkpro(key)"  v-for="(value,key) in prodata" >
          <div class="weui-media-box__hd weuiimgbig">
      <img style="width: 60px;height: 60px;border-radius: 50%;" class="weui-media-box__thumb" v-if="!value.proimg" src="./images/ico17.png" alt="">
      <img style="width: 60px;height: 60px;border-radius: 50%;" class="weui-media-box__thumb" v-if="value.proimg" :src="value.proimg" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title mb_5"  v-text="value.prname"></h4>
            <div class="weui-media-box__desc f_13 lh_1_9" >
              <div class="n1fc n2fc">
                <div class="floatl">
                <span v-text="['','框架结构','框剪结构'][value.jiegou]"></span>
                </div>
                <div class="floatr w_100 t_l">城市:<span v-text="value.city"> </span></div>
                <div class="cl"></div>
              </div>
              <div class="f_13 lh_1_9 fc_3">
                <div class="floatl w_120">开工:<span v-text="value.kaigong"> </span></div>
                <div class="floatl w_120">竣工:<span v-text="value.jungong"> </span></div>
                <div class="cl"></div>
              </div>
            </div>            
          </div>
        </a>

     
        
    </div>
  </div>

 
  <div class="weui-loadmore" style="display: none;">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
  </div>

 



  <div class="vh_2" > </div>  
  </div> 

 

            </div>
            <div class="weui-tabbar">
                <a href="javascript:;" data-id="home" class="weui-tabbar__item weui-bar__item_on"> 
                    <img src="./images/ico15.png" alt="" style="width: 2rem;">
                    <p class="weui-tabbar__label">首页</p>
                </a>
                <a href="javascript:;"  data-id="user" class="weui-tabbar__item js_item js_itemone">
                    <img src="./images/ico1.png" alt=""  style="width: 2rem;">
                    <p class="weui-tabbar__label">我</p>
                </a>
            </div>
        </div>
    </div>
</div></script>
<!-- 首页 -->

 


<!-- 个人中心 user -->
    <script type="text/html" id="tpl_user">
        <div class="page">
            <div class="pb_47 of_a" id="userbody">
            <!-- 头部 -->
            <div style="background: #23abe3;" class="h_250 ps_r">
            <div data-id="myinfo" class="usset js_item"><img src="./images/center2.png" alt=""></div>
             <div class="ushead">
             <img width="130" style="border-radius: 70px;" v-if="user_info.data.wechatimg" :src="user_info.data.wechatimg" alt="头像">
             <img v-if="!user_info.data.wechatimg" src="images/center1.png" alt="头像">
             </div>
             <div class="t_c fc_f f_20"> <span v-text="user_info.data.nicheng"></span></div>
              <div class="t_c fc_f mymrl"><span v-text="['','男','女'][user_info.data.sex]"></span>|<span v-text="user_info.data.ctidv"></span>
           <!--    |<span v-text="ut[user_info.data.usertype]"></span>  --></div>
              
            </div> 
            <!-- 内容部分 -->
            <div>
              <div></div>
              <div class="weui-panel"> 
                <div class="weui-cell">
                  <div class="weui-cell__bd">
                    <p>河狸建筑账号</p>
                  </div>
                  <div class="weui-cell__ft"><span v-text="user_info.data.username"></span></div>
                </div>
              </div>

              <div class="weui-panel">
              <a data-id="tel" class="features js_item" href="javascript:;">
                <div class="weui-cell">
                  <div class="weui-cell__bd">
                    <p>绑定手机</p>
                  </div>
                  <div class="weui-cell__ft"><span v-text="user_info.data.tel"></span></div>
                </div>
                </a>
              </div>  
              
              <div class="weui-panel">
              <a data-id="pwd" class="features js_item" href="javascript:;">
                <div class="weui-cell">
                  <div class="weui-cell__bd">
                    <p>密码设置</p>
                  </div>
                  <div class="weui-cell__ft">修改</div>
                </div>
              </a>
              </div>

             <div class="weui-panel">
              <a data-id="shangxian" class="features js_item" href="javascript:;">
                <div class="weui-cell">
                  <div class="weui-cell__bd">
                    <p style="display: inline-block;">当前工程上限</p><img src="./images/wh.png" alt="" style="width: 12px;display: inline-block;">
                  </div>
                  <div class="weui-cell__ft" v-text="user_info.data.maxprogram"></div>
                </div>
              </a>
              </div>

<!-- <div class="page__bd page__bd_spacing">
  <a href="javascript:;" @click="unbind" class="weui-btn weui-btn_default mt_10">解除微信绑定</a>

</div>  -->

            </div>

 
      
            
             </div></script>
<!-- 个人中心 user -->

<!-- 个人详情修改 myinfo -->
    <script type="text/html" id="tpl_myinfo">
        <div class="page">
<div class="page__bd" style="height: 100%;" id="mybody">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 
  <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg hslcenter3">      
          <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title c18_wb">头像</h4>
          </div>
          <div class="weui-media-box__hd">
              <!-- <img class="weui_media_appmsg_thumb" :src="user_info.photourl" alt=""> -->
              <img v-if="my_info.data.wechatimg" class="weui-media-box__thumb h_10vh w_10vw" :src="my_info.data.wechatimg" alt="头像">
              <img v-if="!my_info.data.wechatimg" class="weui-media-box__thumb h_10vh w_10vw" src="images/center3.png" alt="头像">
          </div>
        </a>
      </div>
    </div>

       <div class="weui-cells weui-cells_form mt_0 ">
    
          <div class="weui-cell overdetail"  >
            <div class="weui-cell__hd c18_wb" >
              <label class="weui-label">昵称</label>
            </div>
            <div class="weui-cell__bd w_p64">
               <input type="text" v-model="my_info.data.nicheng" class="overinpu weui-input" placeholder="请输入昵称"/> 
            </div>
          </div>
     <!--   -->
          

          <div class="weui-cell overdetail weui-cell_select weui-cell_select-after" style="    padding: 10px 0px 10px 15px;">
                <div class="weui-cell__hd">
                    <label  class="weui-label c18_wb">性别</label>
                </div>
                <div class="weui-cell__bd c_23a t_r ps_r">
                  <span class="sexselects" v-text="['','男','女'][my_info.data.sex]"></span>
                    <select v-model="my_info.data.sex" class="weui-select opacity0">
                        <option value="1">男</option>
                        <option value="2">女</option> 
                    </select>
                </div>
            </div>


 
          <div class="weui-cell overdetail"  >
            <div class="weui-cell__hd c18_wb" >
              <label class="weui-label">职业</label>
            </div>
            <div class="weui-cell__bd w_p64">
               <input type="text" v-model="my_info.data.workname" class="overinpu weui-input" placeholder="请输入职业"/> 
            </div>
          </div> 
       
        </div> 
            </div>
           <div class="weui-tabbar savebtn"> 
          <a href="javascript:;" @click="save" class="weui-tabbar__item"> 
              <p>保存</p>
          </a>
      </div>
        </div>
    </div>














          <div class=" pb_47 of_a" id="mybody">  

     
      </div>
    </div>  
    </div></script>
<!-- 个人详情修改 myinfo -->

<!-- 密码修改 pwd -->
    <script type="text/html" id="tpl_pwd">
        <div class="page">
<div class="page__bd" style="height: 100%;" id='pwdbody'>
        <div class="weui-tab">
            <div class="weui-tab__panel"> 

        <div class="weui-cells__title">修改密码：</div>  
        <div class="weui-cells hslpsd_ch">

          <div class="weui-cell overdetail"  >
            <div class="weui-cell__hd c18_wb" >
              <label class="weui-label">旧密码</label>
            </div>
            <div class="weui-cell__bd w_p64">
               <input type="password" v-model="tempwd.oldpasswd" class="overinpu weui-input" placeholder="请输入旧密码"/> 
            </div>
          </div>

          <div class="weui-cell overdetail"  >
            <div class="weui-cell__hd c18_wb" >
              <label class="weui-label">新密码</label>
            </div>
            <div class="weui-cell__bd w_p64">
               <input type="password" v-model="tempwd.newpasswd"  class="overinpu weui-input" placeholder="请输入新密码"/> 
            </div>
          </div>

          <div class="weui-cell overdetail"  >
            <div class="weui-cell__hd c18_wb" >
              <label class="weui-label">确认新密码</label>
            </div>
            <div class="weui-cell__bd w_p64">
               <input type="password" v-model="tempwd.newpasswdtwo"  class="overinpu weui-input" placeholder="请再次输入新密码"/> 
            </div>
          </div>
        </div>
            </div>
            <div class="weui-tabbar savebtn"> 
          <a href="javascript:;" @click="save" class="weui-tabbar__item"> 
              <p>保存</p>
          </a>
      </div>
        </div>
    </div>











     </div></script>
    <!-- 密码修改 pwd -->


<!-- 手机绑定 tel -->
    <script type="text/html" id="tpl_tel">
      <div class="page">
<div class="page__bd" style="height: 100%;" id="telbody">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 
 <div class="weui-cells__title">手机绑定：</div> 
        <div class="weui-cells"> 
          <div class="weui-cell overdetail"  >
            <div class="weui-cell__hd c18_wb" >
              <label class="weui-label">手机号</label>
            </div>
            <div class="weui-cell__bd w_p64">
               <input type="number" v-model="temtel.tel" class="overinpu weui-input" placeholder="请输入手机号"/> 
            </div>
          </div>

          <div class="weui-cell overdetail">
                <div class="weui-cell__hd c18_wb">
                  <label>验证码</label>
                </div>
                <div class="weui-cell__bd ml_1rem mr_05rem">
                    <input  v-model="temtel.phcode" class="weui-input" type="number" placeholder="请输入验证码">
                </div>
                <div class="weui-cell__ft">
                  <a v-if="itime==0" class="verificode" @click="sendcode" href="javascript:;">获取短信验证码</a>

                  <a v-if="itime>0" href="javascript:;" class="weui_btn weui_btn_mini weui_btn_default" >{{itime}}秒后可重新发送</a>
                </div>
            </div>
        </div>
            </div>
            <div class="weui-tabbar savebtn"> 
          <a href="javascript:;" @click="save" class="weui-tabbar__item"> 
              <p>保存</p>
          </a>
      </div>
        </div>
    </div>
 

      </div></script>
<!-- 手机绑定 tel -->




<!-- 工程上限  shangxian -->
<script type="text/html" id="tpl_shangxian">
    <div class="page">
    <div id='tuijianbody'>
      <div class="w_p100">
 <div class="prolimitk">
  <div class="prolimit">
    <div class="pronumber">
      <h3 v-text="my_info.data.maxprogram"></h3>
      <p>当前工程上限</p>
    </div> <!-- :href="['producs.html?f='+ my_info.data.tuijian]" -->
    <a class="proshare" >
        
      <p class="fc_f"style="font-size: 15px;margin-top: 12px;">点击微信<br>右上角按钮<br>立即分享</p>
    </a>
    </div>
    <p style="font-size: 18px;margin-bottom: 2px;"><span>您的推荐码：</span><span v-text="my_info.data.tuijian"></span></p>
    <p style="font-size: 18px;"><span>您已累计推荐：</span><span v-text="my_info.data.totalnum"></span><span>个资料员使用</span></p>
  </div>

  <div class="proline weui-cells">
    <div class="weui-cell prolineh"  onclick="fxqq()">
      <div class="weui-cell__bd">
          <p>累计推荐10个资料员即可升级工程上限为</p>
      </div>
      <div class="weui-cell__ft"><span>4</span></div>
    </div>
    <div class="weui-cell prolineh"  onclick="fxpy()">
      <div class="weui-cell__bd">
          <p>累计推荐20个资料员即可升级工程上限为</p>
      </div>
      <div class="weui-cell__ft"><span>5</span></div>
    </div>
    <div class="weui-cell prolineh"  onclick="fxline()">
      <div class="weui-cell__bd">
          <p>累计推荐30个资料员即可升级工程上限为</p>
      </div>
      <div class="weui-cell__ft"><span>6</span></div>
    </div>

  </div>
  <div class="proexplain">
    <p>规则说明</p>
    <p>1.点击页面分享链接，新用户通过您的分享的链接进行注册,您可以获得一个推荐名额;</p>
    <p>2.用户注册时,填写您的推荐码,您即可获得一个推荐名额。</p>
    <p style="margin-top: 12px;">每推荐10个资料员注册成功即可增加一个工程上限,让您畅享河狸建筑工程信息化平台！</p>
  </div>

</div>
    </div> 
 </div></script>
<!-- 工程上限  shangxian -->


<!-- 去注册 reg -->
    <script type="text/html" id="tpl_reg">
        <div class="page">
        <div>
           去注册 
        </div>
           <div>
            <a href="javascript:home();">返回</a>
           </div>  
    </div></script>
<!-- 去注册 reg -->


<!-- 去绑定 bind -->
    <script type="text/html" id="tpl_bind">
        <div class="page">
        <div>
           去绑定 
        </div>
           <div>
            <a href="javascript:home();">返回</a>
           </div>  
    </div></script>
<!-- 去绑定 bind -->


<!-- 子单位列表  sin -->
    <script type="text/html" id="tpl_sin">
        <div class="page">


     <div class="page__bd" style="height: 100%;" id="sinbody">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 


             <div>        
                 <div class="weui-cell weui-cell_select prosinselect fc_f bgc_1"> 
                  

<div class="weui-flex w_p85"> 
                      <div class="weui-flex__item prostl"   v-bind:class="{open: prosta}">
                      <div v-on:click="changeopen('#sinbody','prosta')" class="weui-media-box__title lh_48 w_p90 pl_5 t_c">&nbsp;<span v-text="prname"></span></div>
                      <img src="./images/ico2.png" alt="">
                        <div class="prolist" style="width: 100%;">
                        <div class="weui-actionsheet__menu fc_7">
                            <div  v-if="value.isdel!=1" v-on:click="checkpro(key)" class="weui-actionsheet__cell" v-for="(value,key) in prodata">
                                <span v-text="value.prname"></span>
                            </div> 
                        </div> 
                  </div>
                      </div>  
                  </div> 
                  <div class="fr w_p15 t_c delpro" style="line-height: 3;height: 48px;">
                      <div  @click="delpro(prodata[proindex])"  class="w_p100">
                      <img width="20" src="./images/delpro.png" alt="">
                       </div>
                     
                       </div> 




        <div v-on:click="changeopen('#sinbody','all')" class="weui-mask" id="iosMask" style="display: none"></div>





                  </div> 
        <div v-if="value.isdel!=1" style="margin-top: 0.5rem;" class="weui-cells"  @click='checksin(key)' v-for="(value,key) in prodata[proindex].sinchl.datalist">
          <label v-on:click.stop style="position: absolute;height: 35px;padding-top: 8px;width: 40px;" :for="['sin'+key]" class="weui-cell__hd  weui-cells_checkbox t_c"><input type="checkbox" @click="selectitem(prodata[proindex].sinchl.datalist,key)" :id="['sin'+key]" class="weui-check" :checked="value.check==1"> <i class="weui-icon-checked"></i></label>

            <a style="margin-left: 44px;padding-left: 0;" class="weui-cell weui-cell_access js_item" href="javascript:;" data-id="editsin" >
              
                <div class="weui-cell__bd">
                    <p v-text="value.sname"></p>
                </div>
                <div class="weui-cell__ft" ><span  v-text="value.cengshu"></span>层</div>
            </a>
            
        </div>

<div class="weui-cells"  v-if="prodata[proindex].sinchl.datalist.length==0">
    <a class="weui-cell weui-cell_access js_item" href="javascript:;" data-id="addsin" style="padding: 30px 15px;">
        <div class="weui-cell__bd weui-cell_primary t_c">
            <p><img width="32" class="valb" src="./images/add.png" alt=""> <span class="fc_1 f_23 fw_b">添加子单位</span></p>
        </div> 
    </a>
    
</div>




       <div v-if="showdel==0&&prodata[proindex].sinchl.datalist.length>0"  class="jhaddk js_item" data-id="addsin"><img style="width:9vh;" src="images/getheradd.png" alt=""> 
     
    </div> 
    </div>

       

</div>
<div v-if="showdel==1" class="weui-tabbar delbtn">
  <div class="weui-cells_checkbox fx_3"></div>
  <a href="javascript:;" @click="delsin(prodata[proindex].sinchl.datalist)" class="weui-tabbar__item">
    <p class="bgc_r">删除</p>
  </a>
</div>
  </div>
  </div>




  </div></script>
<!-- 子单位列表 sin -->    


<!-- 子单位添加  addsin -->
    <script type="text/html" id="tpl_addsin">
        <div class="page">

<div id="addsinbody" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 
       
        <div class="weui-cells__title"  v-text="prname"></div> 
       <div class="weui-cells weui-cells_form"> 
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">子单位名称：</label></div>
                <div class="weui-cell__bd">
                    <!--  <input v-model="sin_add.data.sname" class="weui-input" type="text" value="" placeholder="子单位名称"> -->
                        <textarea name="sname" v-model="sin_add.data.sname"  placeholder="子单位名称"
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 20px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);"></textarea>          
                </div>
             </div>
        </div>


         <div class="weui-cells weui-cells_form"> 


<div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">结构类型</label>
                </div>
                <div class="weui-cell__bd">
                    <select v-model="sin_add.data.jiegou" class="weui-select" name="select2">
                        <option value="1">框架结构</option>
                        <option value="2">框剪结构</option> 
                    </select>
                </div>
            </div>
           

             <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">层 数：</label>
                </div>
                <div class="weui-cell__bd">
                    <input v-model="sin_add.data.cengshu" class="weui-input" type="number" placeholder="请输入层数">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" @click='createbuwei' class="weui-vcode-btn">生成部位</a>
                </div>
            </div>  
        </div>
 <div class="weui-cells__title">基础部位</div>            
<div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea v-model="sin_add.data.jichu" class="weui-textarea" placeholder="基础部位" rows="3"></textarea>
                    <div class="weui-textarea-counter"></div>
                </div>
            </div>
        </div>

 <div class="weui-cells__title">主体部位</div>            
<div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea v-model="sin_add.data.zhuti" class="weui-textarea" placeholder="主体部位" rows="3"></textarea>
                    <div class="weui-textarea-counter"></div>
                </div>
            </div>
        </div> 

       <div class="weui-cell uploader-file">
                <div class="weui-cell__hd"><label for="" class="weui-label">上传图片</label></div>
            <li >
              <img v-if="sin_add.data.sinimg" style="width: 80px;height: 80px;margin-right: 10px;" :src="sin_add.data.sinimg" alt="" />
            </li>
                <div class="weui-cell__bd add-file">
                 <div id="localPicker3" class="weui-uploader__input-box" > </div>
                </div>
            </div>
 




            </div>
               <div class="weui-tabbar savebtn"> 
        <a href="javascript:;" class="weui-tabbar__item"    @click='sin_addsave'> 
                <p class="">保存</p>
            </a>
        </div> 
        </div>
    </div> </div></script>
<!-- 子单位添加 addsin -->    
 





<!-- 子单位编辑  editsin -->
    <script type="text/html" id="tpl_editsin">
        <div class="page">

<div class="page__bd" style="height: 100%;" id="editsinbody">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 

  <div class="weui-cells__title">子单位名称：</div>
<div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                  <!--   <input v-model="editsindata.sname" class="weui-input" type="text" placeholder="请输入工程名称"> -->
                                <textarea  v-model="editsindata.sname"
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 20px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);"></textarea>
                </div>
            </div>
        </div>

         <div class="weui-cells weui-cells_form">             

             <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">层数：</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.cengshu" class="weui-input" type="text" placeholder="请输入层数">
                </div>
            </div>

  

              <div class="weui-cell weui-cell_select weui-cell_select-after">
                      <div class="weui-cell__hd">
                          <label for="" class="weui-label">结构：</label>
                      </div>
                      <div class="weui-cell__bd">
                          <select  v-model="editsindata.jiegou" class="weui-select" name="select2">
                              <option value="1">框架结构</option>
                              <option value="2">框剪结构</option> 
                          </select>
                      </div>
                  </div>  

             <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">基础开工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.jcriqi" class="weui-input" type="date" value="">
                </div>
            </div>
 

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">基础完工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.jctime" class="weui-input" type="date" value="">
                </div>
            </div>
           <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">主体开工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.ztjgriqi" class="weui-input" type="date" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">主体完工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.ztjgtime" class="weui-input" type="date" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">砌体开工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.sqzriqi" class="weui-input" type="date"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">砌体完工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.sqztime" class="weui-input" type="date"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">装修开工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.zxriqi" class="weui-input" type="date"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">装修完工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.zxtime" class="weui-input" type="date"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">内墙开工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.snqriqi" class="weui-input" type="date"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">内墙完工:</label></div>
                <div class="weui-cell__bd">
                    <input  v-model="editsindata.snqtime" class="weui-input" type="date"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">外墙开工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.swqriqi" class="weui-input" type="date"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">外墙完工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.swqtime" class="weui-input" type="date"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">屋面开工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.wmriqi" class="weui-input" type="date"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">屋面完工:</label></div>
                <div class="weui-cell__bd">
                    <input v-model="editsindata.wmtime" class="weui-input" type="date"  >
                </div>
            </div>

             <div class="weui-cell uploader-file">
                <div class="weui-cell__hd"><label for="" class="weui-label">上传图片</label></div>
            <li >
              <img v-if="editsindata.sinimg" style="width: 80px;height: 80px;margin-right: 10px;" :src="editsindata.sinimg" alt="" />
            </li>
                <div class="weui-cell__bd add-file">
                 <div id="localPicker4" class="weui-uploader__input-box" > </div>
                </div>
            </div>


            




        </div>
            </div>
            
              <div class="weui-tabbar savebtn" @click="comsave()"> 
              <a href="javascript:;" class="weui-tabbar__item"> 
                      <p class="">保存</p>
                  </a>
              </div>
        </div>
    </div> 
 
    </div></script>
<!-- 子单位编辑 editsin -->  

 








<!-- 进度管理 work -->
    <script type="text/html" id="tpl_work">
        <div class="page" >
        <div id="workpro">
        <div class="bgc_1 fc_f h_r3 planaction">
          <div class="weui-cell weui-cell_select prosinselect"> 
                  <div v-cloak class="weui-flex w_p100">  

                      <div class="weui-flex__item prostl"  v-bind:class="{open: prosta}">
                      <div v-on:click="changeopen('#workpro','prosta')" class="weui-media-box__title lh_48 w_p90 t_c"><span v-text="prname"></span></div>
                      <img  v-on:click="changeopen('#workpro','prosta')" src="./images/ico2.png" alt="">
                        <div class="prolist">
                        <div class="weui-actionsheet__menu fc_7">
                             <div  v-if="value.isdel!=1" v-on:click="checkpro(key)" class="weui-actionsheet__cell" v-for="(value,key) in prodata">
                                <span v-text="value.prname"></span>
                            </div>
                        </div> 
                  </div>
                      </div>


                      <div class="weui-flex__item sinstl"  v-bind:class="{open: sinsta}">
                      <div  v-on:click="changeopen('#workpro','sinsta')" class="weui-media-box__title lh_48 pl_5 w_p90 t_c"><span v-text="sname"></span></div>
                      <img v-on:click="changeopen('#workpro','sinsta')" src="./images/ico2.png" alt="">
                       <div class="sinlist">
                       <div class="weui-actionsheet__menu fc_7">
                             <div v-if="value.isdel!=1" v-on:click="checksin(key)" class="weui-actionsheet__cell" v-for="(value,key) in prodata[proindex].sinchl.datalist">
                                <span v-text="value.sname"></span>
                            </div>
                        </div> 
                  </div>
                      </div>


                  </div>  

          </div>
          <div v-on:click="changeopen('#workpro','all')" class="weui-mask" id="iosMask" style="display: none"></div>
        </div>


 <div class="jihuacss" > 
    <div  class="scorll_box">
      <ul style="width: 380px;"> 
        <li @click="changetap(0)" :class="{active:tap==0}" >形象进度</li>
        <li @click="changetap(1)" :class="{active:tap==1}">子单位统计图表</li> 
        <li @click="changetap(2)" :class="{active:tap==2}">原材统计图表</li>
      </ul>
      </div>
 
  </div>





      

     
<div id="sinimage" v-if="tap==0"> 
         <!--  <div class="weui-cells__title"><span v-text="sname"></span>施工进度图</div>
 -->
          <div class="weui-flex ech">
           <div class="weui-flex__item plr_15" style="border-radius: 25px;border: 0;">
             <a href="javascript:;" class="ebtn btl" v-on:click="changeshowtype(0)" v-bind:class="{active:showtype==0}">全部</a>
           </div>
           <div class="weui-flex__item plr_15">
             <a href="javascript:;" class="ebtn btl" v-on:click="changeshowtype(1)"  v-bind:class="{active:showtype==1}">基础</a>
           </div>
           <div class="weui-flex__item plr_15">
             <a href="javascript:;" class="ebtn btl" v-on:click="changeshowtype(2)"  v-bind:class="{active:showtype==2}">主体</a>
           </div>
         </div>  
       <div v-cloak class="echstl mt_10">
       <div class="gckuang"> 
                  <ul class="gctitle">
                      <li>
                      <a class="a0"></a>
                      <span>未送</span>
                      </li>
                      <li>
                      <a class="a1"></a>
                      <span>已送</span>
                      </li>
                      <li>
                      <a class="a2"></a>
                      <span>漏送</span>
                      </li>
                      <li>
                      <a class="a3"></a>
                      <span>异常</span>
                      </li> 
                  </ul>  
              </div>
              <div class="pb_10">
              <!-- 形象进度 -->
              <div v-if="gettype(showtype,value.fid)" :class="value.bwtype" v-for="(value,key) in work_image.data.datalist">
                    <!-- <div class="rightpie"></div> -->
                    <div class="leftc">
                    <span class="badge badge-success badge-square ng-scope" v-if="value.byqiangdu>0">C<span v-text="value.byqiangdu"><!-- 25 --></span></span> 
                    </div>
                    <div class="t_l lh_1">
                      <div class="btitle">
                         <span v-text="value.bybuwei" v-if="value.bwtype=='ban1'||value.bwtype=='ban0'" ><!-- 屋面梁板 --></span>
                      </div> 
                   <span class="f_12 " v-if="value.bwtype=='ban1'||value.bwtype=='ban0'" v-text="value.cbyriqi"><!-- 2016-10-11 --></span>
                    </div>
                    <div class="litle">
                      <span class="bj" v-bind:class="['a'+value.by]">标</span>
                      <span class="bj" v-bind:class="['a'+value.ty]" v-if="value.tyornot==1">同</span>
                      <span class="bj" v-bind:class="['a'+value.ks]" v-if="value.ksornot==1">渗</span>
                      <span class="bj" v-bind:class="['a'+value.zt]" v-if="value.ztornot==1">柱</span>
                      <span class="bj" v-bind:class="['a'+value.dz]" v-if="value.dzornot==1">焊</span>  
                      <span class="bj" v-bind:class="['a'+value.cm]" v-if="value.cmornot==1">模</span> 
                     
                       <span class="bj" v-bind:class="['a'+value.qz]"  v-if="value.qzornot==1">砌</span>
                      <span class="bj" v-bind:class="['a'+value.wq]"  v-if="value.wqornot==1" >外</span>
                      <span class="bj" v-bind:class="['a'+value.nq]" v-if="value.nqornot==1">内</span>
                       <span class="bj" v-bind:class="['a'+value.zp]" v-if="value.zpornot==1">找</span> 
                    </div>
                  </div> 
              </div> 
       <div> 
       </div> 
        </div> 


<div class="weui-cells" v-cloak v-if="prodata[proindex].sinchl.datalist.length==0" >
    <a class="weui-cell weui-cell_access js_item" href="javascript:;" data-id="home" style="padding: 30px 15px;">
        <div class="weui-cell__bd weui-cell_primary t_c">
        <p> <span class="fc_1 f_18 fw_b">您未添加子单位，请回到首页并在工程“<span class="fc_2" v-text="prname"></span>”中添加子单位</span></p>
        </div> 
    </a>
    
</div>


</div> 





<div  v-cloak v-if="tap==1">
<!-- <div class="weui-cells__title"><span v-text="sname"></span>子单位送检统计图表</div> -->

          <div class="weui-flex ech">
           <div class="weui-flex__item plr_15" style="border-radius: 25px;border: 0;">
             <a href="javascript:;" class="ebtn btl" v-on:click="changeshowtype(0)" v-bind:class="{active:showtype==0}">全部</a>
           </div>
           <div class="weui-flex__item plr_15">
             <a href="javascript:;" class="ebtn btl" v-on:click="changeshowtype(1)"  v-bind:class="{active:showtype==1}">基础</a>
           </div>
           <div class="weui-flex__item plr_15">
             <a href="javascript:;" class="ebtn btl" v-on:click="changeshowtype(2)"  v-bind:class="{active:showtype==2}">主体</a>
           </div>
         </div>  
 



         <div class="echstl"  style="padding-left: 20px;margin-top: 30px;">
            <div id="bartwo" style="height: 300px;"></div> 
          </div>


</div>


<div  v-cloak v-if="tap==2">
<!-- <div class="weui-cells__title">原材送检统计图表</div>  -->
<div class="echstl" style="padding-left: 20px;">
  <div id="barone"  style="height: 300px;"></div>
</div> 
  </div>




 <div class="h_50"></div>

  
</div>
    </div></script>
<!-- 进度管理 work --> 

















<!-- 送检计划 plan -->
    <script type="text/html" id="tpl_plan">
        <div class="page" >
   <div class="page__bd" style="height: 100%;">
        <div class="weui-tab"  id="plantop"> 

            <div class="weui-tab__panel" id="watchpanel">
        <div class="plantop">
           <div class="bgc_1 fc_f h_r3 planaction">
<div class="weui-cell weui-cell_select prosinselect">
  <div v-cloak class="weui-flex w_p100">
    <div class="weui-flex__item prostl"  v-bind:class="{open: prosta}">
      <div v-on:click="changeopen('#plantop','prosta')" class="weui-media-box__title lh_48 w_p90 t_c">
        <span v-text="prname"></span>
      </div>
      <img  v-on:click="changeopen('#plantop','prosta')" src="./images/ico2.png" alt="">
      <div class="prolist">
        <div class="weui-actionsheet__menu fc_7">
          <div v-if="value.isdel!=1" v-on:click="checkpro(key)" class="weui-actionsheet__cell" v-for="(value,key) in prodata">
            <span v-text="value.prname"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-flex__item sinstl"  v-bind:class="{open: sinsta}">
      <div  v-on:click="changeopen('#plantop','sinsta')" class="weui-media-box__title lh_48 pl_5 w_p90 t_c" style="height: 48px;">
        <span v-text="sname"></span>
      </div>
      <img v-on:click="changeopen('#plantop','sinsta')" src="./images/ico2.png" alt="">
      <div class="sinlist">
        <div class="weui-actionsheet__menu fc_7">
        <div  v-on:click="checksin('A')" class="weui-actionsheet__cell">
            <span>原材</span>
          </div>
          <div  v-on:click="checksin(key)" class="weui-actionsheet__cell" v-for="(value,key) in prodata[proindex].sinchl.datalist">
            <span v-text="value.sname"></span>
          </div>
        </div>
      </div>
    </div> 
  </div> 
</div>
          <div v-on:click="changeopen('#plantop','all')" class="weui-mask" id="iosMask" style="display: none"></div>
        </div>

          <div class="jihuacss" > 
    <div v-cloak v-if="sinmat==0" class="scorll_box">
      <ul>
        <li v-on:click="checksj('by')" :class="stype=='by'?'active':''">标养</li>
        <li v-on:click="checksj('ty')" :class="stype=='ty'?'active':''">同养</li>
        <li v-on:click="checksj('ks')" :class="stype=='ks'?'active':''">抗渗</li>
        <li v-on:click="checksj('zt')" :class="stype=='zt'?'active':''">柱头</li>
        <li v-on:click="checksj('cm')" :class="stype=='cm'?'active':''">拆模</li>
        <li v-on:click="checksj('dz')" :class="stype=='dz'?'active':''">焊接</li>
        <li v-on:click="checksj('qz')" :class="stype=='qz'?'active':''">砌筑</li>
        <li v-on:click="checksj('nq')" :class="stype=='nq'?'active':''">内抹灰</li>
        <li v-on:click="checksj('wq')" :class="stype=='wq'?'active':''">外抹灰</li>
        <li v-on:click="checksj('zp')" :class="stype=='zp'?'active':''">找平</li>
      </ul>
      </div>
 <div v-cloak v-if="sinmat==1" class="scorll_box yc">
  <ul>
        <li v-on:click="checkmat(1)" :class="yctype==1?'active':''">钢筋</li>
        <li v-on:click="checkmat(2)" :class="yctype==2?'active':''" >水泥</li>
        <li v-on:click="checkmat(3)" :class="yctype==3?'active':''" >砂</li>
        <li v-on:click="checkmat(4)" :class="yctype==4?'active':''" >砖</li>
        <li v-on:click="checkmat(5)" :class="yctype==5?'active':''" >装饰</li>
        <li v-on:click="checkmat(6)" :class="yctype==6?'active':''" >节能</li>
        <li v-on:click="checkmat(7)" :class="yctype==7?'active':''" >防水</li>
        <li v-on:click="checkmat(8)" :class="yctype==8?'active':''">水电</li>
        <li v-on:click="checkmat(9)" :class="yctype==9?'active':''">安全</li> 
        <li v-on:click="checkmat(0)" :class="yctype==0?'active':''">全部</li>       
      </ul>
    </div>
  </div>
        </div>







 


        <div  style="padding-top: 10px;" >
<div v-cloak v-if="sinmat==0&&esta==0">
<!-- 送检 -->
    <div @click="setcodeid(value.codeid,stype)" v-if="value.isdel!=1&&value[stype+'ornot']==1" class="weui-panel weui-cell_access js_item planchk" data-id="sj" v-for="(value,key) in plan_songjian.data.datalist">
              <label v-if="stype=='by'" v-on:click.stop class="weui-cell__hd  weui-cells_checkbox" :for="['s'+key]">
                    <input :checked="value.check==1" v-on:click="selectitem(value,plan_songjian.data.datalist)" type="checkbox" name="checkbox1" class="weui-check" :id="['s'+key]">
                    <i class="weui-icon-checked"></i>
                </label>
              

               <div class="weui-cell weui-cell_switch"> 
               <div class="weui-cell__bd weui-media-box__title"> 
              <span class="weui-media-box__info"><span v-text="value.myorder"></span></span> 
              <span v-text="value[stype+'name']"></span> 
                

               </div>
                 
                <label  v-on:click.stop class="weui-cell__ft ps_r" :for="['sv'+key]">
                    <input @click="yschk(value,stype+'ys')" class="weui-switch" :id="['sv'+key]" :checked="value[stype+'ys']==1" type="checkbox">
                    <span></span> 
                </label> 
            </div>



             
            <div class="weui-panel__bd w_p100">
                <div class="weui-media-box weui-media-box_text"> 
                    <p class="weui-media-box__desc">
                    <!-- 强度 -->
                    <span class="dpb60">
                      <span v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'">
                        C<span v-text="value.byqiangdu"></span>
                      </span> 
                      <span v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'" v-if="value[stype+'qiangdu']">
                        <span v-text="value[stype+'qiangdu']"></span>
                      </span> 
                      <span v-if="value.ksdengji">
                        <span v-text="value.ksdengji"></span>
                      </span>  
                    </span> 
                    <span class="dpb40">
                    <span v-if="value[stype+'zushu']>0">
                    <span v-text="value[stype+'zushu']"></span>组</span>
                    </span>

                   

                    <span class="dpb120"><span v-text="sname"></span></span>
                    </p>
                    <ul class="weui-media-box__info">
                      <li class="weui-media-box__info__meta fc_1">
                      <span v-if="stype=='dz'">部位浇筑：</span>
                      <span v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'">浇筑：</span>
            <span v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'">制作：</span><span v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'||stype=='dz'" v-text="value.byriqi"></span>
                      <span v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'" v-text="value[stype+'riqi']"></span>
                      <span v-if="value[stype+'ys']=='0'" class="ml_1rem">
                    <span v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'" v-text="lq(value['byriqi'],value[stype+'time'],value[stype+'ys'])"></span>
                    <span v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'" v-text="lq(value[stype+'riqi'],value[stype+'time'],value[stype+'ys'])"></span>
                    <span v-if="stype=='ty'">
                  <span :class="{ 'temgreen': value.wstem<=500, 'temwarn': value.wstem>500&&value.wstem<=580,'temerror':value.wstem>580 }" v-text="value.wstem"></span>℃
                    </span>
                    
                    </span>
                     <!--  <span class="ml_1rem">21天350℃</span> -->

                      </li>
                        <li class="weui-media-box__info__meta fc_1">送检：<span v-text="value[stype+'time']"></span>
                       

                        <span v-if="value[stype+'ys']=='1'" class="ml_1rem">
                    <span v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'" v-text="lq(value['byriqi'],value[stype+'time'],value[stype+'ys'])"></span>
                    <span v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'" v-text="lq(value[stype+'riqi'],value[stype+'time'],value[stype+'ys'])"></span>
                    
                    <span  v-if="stype=='ty'">
                       <span :class="{ 'temgreen':value.ystem>=580||value.ystem<=620 , 'temerror':value.ystem>620||value.ystem<550 }" v-text="value.ystem"></span>℃
                    </span>
                   
                    </span>

                        </li> 
                    </ul>
                </div>
            </div> 
        </div>
<!-- 送检 -->  

</div>

  <!-- 设置 -->
<div v-if="esta=='1'">
  <div class="bgc_4 pd_5">
  <span class="f_17 fc_1"><span v-text="stp[stype]"></span> 部位设置</span>
</div>
     <div class="weui-cells_checkbox"> 
            <label class="weui-cell weui-check__label" :for="['sf'+key]"  v-for="(value,key) in plan_songjian.data.datalist">
                <div class="weui-cell__hd">
                    <input @click="ornotchk(value)" type="checkbox" class="weui-check" name="checkbox1" :id="['sf'+key]" :checked="value[stype+'ornot']==1">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p v-text="value.bybuwei"></p>
                </div>
            </label>  
                </div> 
</div>
<!-- 设置 -->




<!-- 原材 -->
<div v-cloak v-if="sinmat==1"> 
         <div v-if="value.isdel!=1" @click="setcodeid(value.codeid,yctype)" class="weui-panel weui-cell_access js_item planchk" data-id="yc" v-for="(value,key) in plan_mat.data.datalist">
         <label  v-on:click.stop class="weui-cell__hd  weui-cells_checkbox" :for="['s'+key]">
                    <input :checked="value.check==1" v-on:click="selectitem(value,plan_mat.data.datalist)" type="checkbox" name="checkbox1" class="weui-check" :id="['s'+key]">
                    <i class="weui-icon-checked"></i>
                </label>
               <div class="weui-cell weui-cell_switch"> 
               <div class="weui-cell__bd weui-media-box__title"> 
              <span class="weui-media-box__info"><span v-text="value.morder"></span></span> 
              <span v-text="value.mname"></span> 

               </div>
                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['sv'+key]">
                    <input @click="yschk(value,'ycys')" class="weui-switch" :id="['sv'+key]" :checked="value.ycys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <a class="weui-cell" href="javascript:;">
            <div class="weui-panel__bd w_p100">
                <div class="weui-media-box weui-media-box_text" style="padding-left: 15px;">  
                    <p v-if="yctype==1" class="weui-media-box__desc">

      
       <span class="dpb40" v-if="value.xinghao"><span v-text="value.xinghao"></span></span>
       <span class="dpb40" v-if="value.guige"><span v-text="value.guige"></span></span>
       <span class="dpb40" v-if="value.pinzhong"><span v-text="value.pinzhong"></span></span>
       <span class="dpb40" v-if="value.qiangdu"><span v-text="value.qiangdu"></span></span>
        <span class="dpb80" v-if="value.buwei"><span v-text="value.buwei"></span></span>
       <span class="dpb60" v-if="value.fenbu"><span v-text="value.fenbu"></span></span>
 <span class="dpb40"><span v-if="value.yczushu>0"><span v-text="value.yczushu"></span>组</span></span>  
                    </p> 

                    <ul class="weui-media-box__info">
                      <li class="weui-media-box__info__meta fc_1">进场日期：<span v-text="value.intime"></span>

                      </li>
                        <li class="weui-media-box__info__meta fc_1">送检日期：<span v-text="value.stime"><!-- 2012-01-20 --></span></li> 
                    </ul>
                </div>
            </div>
          </a>
        </div>  
</div>
 



          
        </div> 


 



  </div>

<div v-cloak  class="weui-tabbar">
      <div v-cloak v-if="showdel==0&&sinmat==0" class="jhaddk">
      <img v-if="stype=='by'" style="width:9vh;" src="images/getheradd.png" alt="" @click="comadd(plan_songjian.data.datalist)"> 
      <img v-if="stype!='by'&&esta==0" @click="setasta()" style="width:9vh;" src="images/set.png" alt=""> 
      <img v-if="stype!='by'&&esta==1" @click="setasta()" style="width:9vh;" src="images/save.png" alt="">
    </div>
    <div v-cloak v-if="showdel==0&&sinmat==1" class="jhaddk">
      <img @click="comadd(plan_mat.data.datalist)" style="width:9vh;" src="images/getheradd.png" alt="">
    </div>
</div>

 <div v-cloak v-if="showdel>0&&stype=='by'&&sinmat==0" class="weui-tabbar delbtn">
   <div  class="weui-cells_checkbox fx_3">
     <label class="weui-check__label w_70" for="checkall"  style="padding: 10px 15px;display: flex;">
       <input  v-on:click="selectall(plan_songjian.data.datalist)" type="checkbox" class="weui-check" name="checkbox1" id="checkall" :checked="plan_songjian.data.datalist.length==showdel"> <i class="weui-icon-checked"></i>
       <span class="fc_6">全选</span>
     </label>
   </div>

   <a href="javascript:;" class="weui-tabbar__item" @click="comdel(plan_songjian.data.datalist)">
     <p class="bgc_r">删除</p>
   </a>
 </div>

 <div v-cloak v-if="showdel>0&&sinmat==1" class="weui-tabbar delbtn">

   <div  class="weui-cells_checkbox fx_3">
     <label class="weui-check__label w_70" for="checkall"  style="padding: 10px 15px;display: flex;">
       <input  v-on:click="selectall(plan_mat.data.datalist)" type="checkbox" class="weui-check" name="checkbox1" id="checkall" :checked="plan_mat.data.datalist.length==showdel"> <i class="weui-icon-checked"></i>
       <span class="fc_6">全选</span>
     </label>
   </div>

   <a href="javascript:;" class="weui-tabbar__item" @click="comdel(plan_mat.data.datalist)">
     <p class="bgc_r">删除</p>
   </a>
 </div>


  </div>

  </div>
    </div></script>
<!-- 送检计划 plan -->



<!-- 原材详情 yc -->
    <script type="text/html" id="tpl_yc">
        <div class="page">
     <div class="page__bd" style="height: 100%;" id="ycbody">
        <div class="weui-tab">
            <div class="weui-tab__panel">        
 

  <div class="weui-cells weui-cells_form">  


          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label for="" class="weui-label">原材料名称</label>
            </div>
            <div class="weui-cell__bd">
              <!--          <input name="mname" v-model="yc_info.data.mname" class="weui-input" type="text" value="">          
              -->
              <textarea name="mname" v-model="yc_info.data.mname" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 20px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);"></textarea>
            </div>
          </div>

          <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">使用部位</label></div>
                <div class="weui-cell__bd">
                    <input name="buwei" v-model="yc_info.data.buwei" class="weui-input" type="text" value="">
                </div>
            </div>
 
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">排序:</label></div>
                <div class="weui-cell__bd">
                    <input name="morder" v-model="yc_info.data.morder" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">类型:</label>
                </div>
                <div class="weui-cell__bd">
                    <select v-model="yc_info.data.yctype" class="weui-select" name="select2">
                        <option :selected="value.t==yc_info.data.yctype" v-for="(value,key) in yctypelist" :value="value.t">{{value.title}}</option> 
                    </select>
                </div>
            </div>

 
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">分部:</label>
                </div>
                <div class="weui-cell__bd">
                    <select v-model="yc_info.data.fid" class="weui-select" name="select2">
                        <option :selected="value.t==yc_info.data.fid" v-for="(value,key) in ftypelist" :value="value.t">{{value.title}}</option> 
                    </select>
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">组数</label></div>
                <div class="weui-cell__bd">
                    <input v-model="yc_info.data.yczushu" class="weui-input" type="text" value="">
                </div>
            </div>
  
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">使用数量</label></div>
                <div class="weui-cell__bd">
                    <input name="number" v-model="yc_info.data.number" class="weui-input" type="text" value="">
                </div>
            </div>


            

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">型号</label></div>
                <div class="weui-cell__bd">
                    <input name="xinghao" v-model="yc_info.data.xinghao" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">规格</label></div>
                <div class="weui-cell__bd">
                    <input name="guige" v-model="yc_info.data.guige" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">品种</label></div>
                <div class="weui-cell__bd">
                    <input name="pinzhong" v-model="yc_info.data.pinzhong" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">强度</label></div>
                <div class="weui-cell__bd">
                    <input name="qiangdu" v-model="yc_info.data.qiangdu" class="weui-input" type="text" value="">
                </div>
            </div>


                      
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">厂家/单位</label></div>
                <div class="weui-cell__bd">
                    <input name="changjia" v-model="yc_info.data.changjia" class="weui-input" type="text" value="">
                </div>
            </div>



            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">进场日期</label></div>
                <div class="weui-cell__bd">
                    <input name="intime" v-model="yc_info.data.intime" class="weui-input" type="date" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">送检日期</label></div>
                <div class="weui-cell__bd">
                    <input name="stime" v-model="yc_info.data.stime"  class="weui-input" type="date" value="">
                </div>
            </div>

 

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">复检项目</label></div>
                <div class="weui-cell__bd">
                    <input name="fujian" v-model="yc_info.data.fujian" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">报告名称</label></div>
                <div class="weui-cell__bd">
                    <input name="baogao" v-model="yc_info.data.baogao"  class="weui-input" type="text" value="">
                </div>
            </div> 

<div class="weui-panel">
            <div class="weui-panel__hd">出厂编号</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(value,key) in dozushu(yc_info.data.yczushu)" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input name="ccph" type="text" :value="spl(yc_info.data.ccph,key)" class="weui-input">
                            </div>
                            
                        </a>
                        
                    </div>
                </div>
            </div>
        </div>

<div class="weui-panel">
            <div class="weui-panel__hd">样品编号</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                      <a v-for="(value,key) in dozushu(yc_info.data.yczushu)" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  name="ypbh" :value="spl(yc_info.data.ypbh,key)" type="text" class="weui-input">
                            </div> 
                        </a> 
                    </div>
                </div>
            </div>
        </div>
          
<div class="weui-panel">
            <div class="weui-panel__hd">检测结果</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(value,key) in dozushu(yc_info.data.yczushu)" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  name="jieguo" type="text" :value="spl(yc_info.data.ypbh,key)" class="weui-input">
                            </div>
                            
                        </a>
                         
                    </div>
                </div>
            </div>
        </div>

<div class="weui-cells__title">备注</div>
           <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="内容" rows="3"></textarea>
                    <div class="weui-textarea-counter"></div>
                </div>
            </div>

        </div>
    
</div>
 <div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave'  class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 
  </div>
  </div>






    </div></script>
<!-- 原材详情 yc -->



<!-- 送检表 sj -->
    <script type="text/html" id="tpl_sj">
        <div class="page">
        
     <div class="page__bd" style="height: 100%;" id="bybody">
        <div class="weui-tab">
            <div class="weui-tab__panel">        
 

         <div class="weui-cells weui-cells_form"> 

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">工程部位</label></div>
                <div class="weui-cell__bd">
<!--                      <input v-if="stype=='by'" v-model="by_info.data.bybuwei" class="weui-input" type="text" value="">
                    <input  v-if="stype!='by'" v-model="by_info.data[stype+'name']" class="weui-input" type="text" value=""> -->
<textarea v-if="stype=='by'" v-model="by_info.data.bybuwei"
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none;margin-top: 20px;font-size: inherit;  '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>

<textarea v-if="stype!='by'" v-model="by_info.data[stype+'name']"
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 20px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>





                </div>
            </div>

           <div  v-if="stype=='by'" class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">排序</label></div>
                <div class="weui-cell__bd">

                    <input v-model="by_info.data.myorder" class="weui-input" type="text" value="">

                </div>
            </div>

            <div v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'" class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd" style="height: 35px;line-height: 35px;">
                    <label for="" class="weui-label">分部</label>
                </div>
<!--                 <div class="weui-cell__bd">
                     <select  class="weui-select" v-model="by_info.data.fid">
                        <option :selected="by_info.data.fid==3" value="3">基础</option>
                        <option :selected="by_info.data.fid==4" value="4">主体</option> 
                    </select>

                </div> -->
            </div>

         <div class="weui-cells weui-cells_checkbox" style="display: flex;flex-wrap: wrap;margin-top: 0;padding-left: 15px;">
           <label class="weui-cell weui-check__label" :for="'ad'+key"  v-for="(value,key) in fenbudata"  @click="fenbumore(value,value.t,key)" style="padding: 5px 10px;" >
             <div class="weui-cell__hd">
               <input type="checkbox"  :checked="ischk(value.t,by_info.data.fid)" class="weui-check" :name="'checkbox'+key" :id="'ad'+key" >
               <i class="weui-icon-checked"></i>
             </div>
             <div class="weui-cell__bd">
               <p  v-html="value.title"></p>
             </div>
           </label>
         </div>

            <div  v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'" class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">强度等级</label>
                </div>
                <div class="weui-cell__bd">
                     <select  class="weui-select" v-model="by_info.data.byqiangdu">
                     <option :selected="by_info.data.byqiangdu==0" value="0">----</option>
                     <option :selected="by_info.data.byqiangdu==10" value="10">C10</option>
                     <option :selected="by_info.data.byqiangdu==15" value="15">C15</option>
                     <option :selected="by_info.data.byqiangdu==20" value="20">C20</option>
                     <option :selected="by_info.data.byqiangdu==25" value="25">C25</option> 
                     <option :selected="by_info.data.byqiangdu==30" value="30">C30</option>
                     <option :selected="by_info.data.byqiangdu==35" value="35">C35</option> 
                     <option :selected="by_info.data.byqiangdu==40" value="40">C40</option>
                     <option :selected="by_info.data.byqiangdu==45" value="45">C45</option> 
                     <option :selected="by_info.data.byqiangdu==50" value="50">C50</option>
                     <option :selected="by_info.data.byqiangdu==55" value="55">C55</option> 
                     <option :selected="by_info.data.byqiangdu==60" value="60">C60</option>
                     <option :selected="by_info.data.byqiangdu==65" value="65">C65</option> 
                     <option :selected="by_info.data.byqiangdu==70" value="70">C70</option>
                     <option :selected="by_info.data.byqiangdu==75" value="75">C75</option> 
                     <option :selected="by_info.data.byqiangdu==80" value="80">C80</option> 
                    </select>
                </div>
            </div> 
             

             <div v-if="stype=='ks'"   class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">抗渗等级</label>
                </div>
                <div class="weui-cell__bd">
                     <select  class="weui-select" v-model="by_info.data.ksdengji">
                     <option :selected="by_info.data.ksdengji==''" value="">----</option>
                     <option :selected="by_info.data.ksdengji=='P4'" value="P4">P4</option>
                     <option :selected="by_info.data.ksdengji=='P6'" value="P6">P6</option>
                     <option :selected="by_info.data.ksdengji=='P8'" value="P8">P8</option>
                     <option :selected="by_info.data.ksdengji=='P10'" value="P10">P10</option> 
                     <option :selected="by_info.data.ksdengji=='P12'" value="P12">P12</option>
                     <option :selected="by_info.data.ksdengji=='>P12'" value=">P12">>P12</option>  
                    </select>
                </div>
            </div>

              <div v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'" class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">强度/配比</label></div>
                <div class="weui-cell__bd">
                    <input v-model="by_info.data[stype+'qiangdu']" class="weui-input" type="text" value="">
                </div>
            </div>  
                        
            <div v-if="stype=='by'" class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">用量</label></div>
                <div class="weui-cell__bd">
                    <input v-model="by_info.data.byyl" @change="yongchange()" class="weui-input" type="number" value="">
                </div>
            </div> 


            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">
                <span v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'">浇筑日期</span>
                <span v-if="stype=='dz'">部位浇筑日期</span>
                <span v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'">制作日期</span>
                
                </label></div>
                <div class="weui-cell__bd">
                <input @change="riqichange(stype)" v-if="stype=='by'||stype=='ty'||stype=='ks'||stype=='zt'||stype=='cm'" v-model="by_info.data.byriqi" class="weui-input" type="date" value="">
                 <input v-if="stype=='dz'" class="weui-input" type="text" readonly="" value="">

                    <input @change="riqichange(stype)" v-if="stype=='qz'||stype=='wq'||stype=='nq'||stype=='zp'" v-model="by_info.data[stype+'riqi']" class="weui-input" type="date" value="">
                </div>
            </div>


            <div v-if="stype=='dz'" class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">
                <span v-text="stp[stype]"></span>制作日期 
                </label></div>
                <div class="weui-cell__bd">
                    <input v-model="by_info.data['dztime']" class="weui-input" type="date" value="">
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">
                <span v-text="stp[stype]"></span>送检日期 
                </label></div>
                <div class="weui-cell__bd">
                    <input v-model="by_info.data[stype+'time']" class="weui-input" type="date" value="">
                </div>
            </div>



           <a v-if="stype=='ty'" class="weui-cell weui-cell_access js_item" href="javascript:;" data-id="wendu">
                            <div class="weui-cell__hd"></div>
                            <div class="weui-cell__bd weui-cell_primary fc_1">
                            <p>同养温度：<span class="fw_b" v-text="by_info.data.tyys=='1'?by_info.data.ystem:by_info.data.wstem"></span>℃
                                </p>
                            </div>
                            <span class="weui-cell__ft"></span>
                        </a>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">组数</label></div>
                <div class="weui-cell__bd">
                    <input v-model="by_info.data[stype+'zushu']" class="weui-input" type="number" value="">
                </div>
            </div>  
          
<div  v-if="stype=='dz'" class="weui-panel">
            <div class="weui-panel__hd">钢筋牌号(设定组数，生成多行)</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(val,k) in dozushu(by_info.data.dzzushu)" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  name="dzpaihao" type="text" :value="spl(by_info.data.dzpaihao,k)" class="weui-input">
                            </div>
                            
                        </a>
                         
                    </div>
                </div>
            </div>
        </div>

          
<div  v-if="stype=='dz'" class="weui-panel">
            <div class="weui-panel__hd">焊接规格(设定组数，生成多行)</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(val,k) in dozushu(by_info.data.dzzushu)" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  name="dzguige" type="text" :value="spl(by_info.data.dzguige,k)" class="weui-input">
                            </div>
                            
                        </a>
                         
                    </div>
                </div>
            </div>
        </div>

          
<div  v-if="stype=='dz'" class="weui-panel">
            <div class="weui-panel__hd">焊接厂家(设定组数，生成多行)</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(val,k) in dozushu(by_info.data.dzzushu)" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  name="dzchangjia" type="text" :value="spl(by_info.data.dzchangjia,k)" class="weui-input">
                            </div>
                            
                        </a>
                         
                    </div>
                </div>
            </div>
        </div>

<div v-if="stype=='by'||stype=='ty'||stype=='zt'" class="weui-panel">
            <div class="weui-panel__hd">芯片编号(设定组数，生成多行)</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(val,k) in dozushu(by_info.data[stype+'zushu'])" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  :name="[stype+'xinpian']" type="text" :value="spl(by_info.data[stype+'xinpian'],k)" class="weui-input">
                            </div>
                            
                        </a>
                         
                    </div>
                </div>
            </div>
        </div>


<div  class="weui-panel">
            <div class="weui-panel__hd">样品编号(设定组数，生成多行)</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(val,k) in dozushu(by_info.data[stype+'zushu'])" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  :name="[stype+'bh']" type="text" :value="spl(by_info.data[stype+'bh'],k)" class="weui-input">
                            </div>
                            
                        </a>
                         
                    </div>
                </div>
            </div>
        </div>
            
<div  class="weui-panel">
            <div class="weui-panel__hd">检测结果</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <a  v-for="(val,k) in dozushu(by_info.data[stype+'zushu'])" class="weui-cell" href="javascript:;">
                            <div class="weui-cell__hd"> </div>
                            <div class="weui-cell__bd weui-cell_primary">
                               <input  :name="[stype+'jg']" type="text" :value="spl(by_info.data[stype+'jg'],k)" class="weui-input">
                            </div>
                            
                        </a>
                         
                    </div>
                </div>
            </div>
        </div> 

         </div>


      

</div>
 <div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 
  </div>
  </div>
</div></script>
<!-- 送检表 sj -->



<!-- 同样温度 wendu -->
    <script type="text/html" id="tpl_wendu">
        <div class="page">
   
           <div id="wendubody" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 

   




<div class="weui-panel weui-panel_access">
<div class="weui-panel__hd">同条件养护温度记录表-<span class="fc_1 f_17" v-text="wendu_info.data.tyinfo.city"></span></div>
            <div class="weui-panel__bd">
                
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title fc_7" v-text="wendu_info.data.tyinfo.bybuwei"></h4>
                    <div class="weui-media-box__desc" style="    padding-left: 20px;">
<table width="100%" border="1" class="fc_7" style="    border: 1px solid #7B7B7B;"> 
              <thead>
                <tr>
                  <th height="25">日期</th>
                  <th>最高</th>
                  <th>最低</th>
                  <th>平均</th>
                  <th>累计</th>
                  <th>龄期</th>
                            
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,key) in wendu_info.data.datalist">
                  <td>
                  <span v-if="key==0" class="ps_a fc_5 fw_b" style="left:15px;">浇</span>

                  <span v-if="key==wendu_info.data.datalist.length-1" class="ps_a  fc_1 fw_b" style="left:15px;">

                  <span v-text="wendu_info.data.tyinfo.tyys==1?'送':'今'"></span> 
                  </span>
                  <span v-text="value.wdatestr"></span></td>
                  <td><span v-text="value.htem"></span></td>
                  <td><span v-text="value.ltem"></span></td>
                  <td><span v-text="value.vtem"></span></td>
                  <td><span v-text="value.leiji"></span></td>
                  <td><span v-text="key"></span></td>

                </tr>
              </tbody>
            </table>

                    </div>
                </div>
            </div>
            <div class="weui-panel__ft">
                <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                    <div class="weui-cell__bd">本温度记录由2345天气预报网提供</div>
                    <!-- <span class="weui-cell__ft"></span> -->
                </a>    
            </div>
        </div>





            



        </div> 
  
  </div> 
            <div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='fanhui' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">返回</p>
                </a> 
            </div> 

  </div></div>




 
    </div></script>
<!-- 同样温度 wendu -->
























<!-- 工程概况 base -->
    <script type="text/html" id="tpl_base">
        <div class="page bgc_4">
       <div id="base">

                 <div class="weui-cell weui-cell_select prosinselect fc_f "> 
                  <div class="weui-flex w_p100"> 
                      <div class="weui-flex__item prostl"   v-bind:class="{open: prosta}">
                      <div v-on:click="changeopen('#base','prosta')" class="weui-media-box__title lh_48 w_p90 pl_5 t_c">&nbsp;<span v-text="prname"></span></div>
                      <img src="./images/ico2.png" alt="">
                        <div class="prolist" style="width: 100%;">
                        <div class="weui-actionsheet__menu fc_7">
                            <div  v-if="value.isdel!=1" v-on:click="checkpro(key)" class="weui-actionsheet__cell" v-for="(value,key) in prodata">
                                <span v-text="value.prname"></span>
                            </div> 
                        </div> 
                       </div>
                      </div>  
                  </div>                   
                  </div> 


 <div v-on:click="changeopen('#base','prosta')" class="weui-mask" id="iosMask" style="display: none"></div>


</div>

<div class="of_a bgc_4">
  <div class=" bgc_4">
  <div >

  <div class="weui-cells">
    <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="jiben">
        <div class="weui-cell__hd">
          <img src="./images/icox.png" class="em_2 plr_3">
        </div>
        <div class="weui-cell__bd weui-cell_primary">
            <p>基本信息</p>
        </div>
        <span class="weui-cell__ft"></span>
    </a>
    <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="jishu">
        <div class="weui-cell__hd">
        <img src="./images/ico3.png" class="em_2 plr_3"></div>
        <div class="weui-cell__bd weui-cell_primary">
            <p>技术信息</p>
        </div>
        <span class="weui-cell__ft"></span>
    </a>
</div>


   <div class="weui-cells">
    <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="shigong">
      <div class="weui-cell_hd">
        <img src="./images/ico4.png" class="em_2 plr_3">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>施工单位</p>
      </div> 
      <span class="weui-cell__ft"></span>   
    </a>
    <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="jianli">
      <div class="weui-cell_hd">
        <img src="./images/ico5.png" class="em_2 plr_3">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>监理单位</p>
      </div> 
      <span class="weui-cell__ft"></span>   
    </a>
  <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="jianshe">
      <div class="weui-cell_hd">
        <img src="./images/ico6.png" class="em_2 plr_3">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>建设单位</p>
      </div>    
      <span class="weui-cell__ft"></span>
    </a>
    <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="sheji">
      <div class="weui-cell_hd">
        <img src="./images/ico7.png" class="em_2 plr_3">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>设计单位</p>
      </div>
      <span class="weui-cell__ft"></span>    
    </a>
  <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="kancha">
      <div class="weui-cell_hd">
        <img src="./images/ico8.png" class="em_2 plr_3">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>勘察单位</p>
      </div>  
      <span class="weui-cell__ft"></span>  
    </a>

    </div>
   <div class="weui-cells">
    <a href="javascript:;" class="weui-cell weui-cell_access js_item" data-id="qita">
      <div class="weui-cell_hd">
        <img src="./images/ico9.png" class="em_2 plr_3">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>其他单位</p>
      </div>
      <span class="weui-cell__ft"></span>    
    </a>
   
  </div>

    <div class="weui-cells weui-cells_access"></div>
     </div>
 </div>
 </div>





</div> 
    </div></script>
<!-- 工程概况 base -->


<!-- 基本信息 jiben --> 
  <script type="text/html" id="tpl_jiben">
        <div class="page">
    <div id="jibenbody" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
          
      
        <div class="weui-cells__title">工程名称</div>
<div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <!-- <input name="prname" v-model="jiben.data.prname" class="weui-input" type="text" placeholder="请输入工程名称"> -->

<textarea name="prname" v-model="jiben.data.prname"  placeholder="请输入工程名称"
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 20px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>

                </div>
            </div>
        </div>
        <div>
          <!-- {{jiben.data.pid}} -->
        </div>

        <div class="weui-cells weui-cells_form">  

          <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for=""  :ax="jiben.data.codeid" class="weui-label">省份</label>
                </div>
                <div class="weui-cell__bd">
                    <select @change="selpro($event)" class="weui-select" name="select">
                     <option  value="">-选择省份-</option>
                      <option  v-for="(value,key) in com_province.data" :value="value.pid" :selected="value.pid==jiben.data.pid">{{value.province}}</option> 
                    
                    </select>
                </div>
            </div>

          <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">城市</label>
                </div>
                <div class="weui-cell__bd">
                    <select  @change="selcity($event)" class="weui-select" name="select2">
                    <option  value="">-选择城市-</option>
                        <option :selected="jiben.data.cityid==value.ctid" v-for="(value,key) in com_city.data" :value="value.ctid">{{value.city}}</option>                   
                   </select>
                </div>
            </div> 
  
<div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">结构类型</label>
                </div>
                <div class="weui-cell__bd">
                    <select name="jiegou" class="weui-select" name="select2" v-model="jiben.data.jiegou">
                        <option :selected="jiben.data.jiegou==1" value="1">框架结构</option>
                        <option :selected="jiben.data.jiegou==2" value="2">框剪结构</option> 
                    </select>
                </div>
            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">开工日期</label></div>
                <div class="weui-cell__bd">
                    <input   v-model="jiben.data.kaigong" class="weui-input" type="date" >
                </div>
            </div>
           <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">竣工日期</label></div>
                <div class="weui-cell__bd">
                    <input    v-model="jiben.data.jungong"  class="weui-input" type="date">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd">
                <label for="" class="weui-label" >工程地址</label></div>
                <div class="weui-cell__bd">

                    <input  name="gcdizhi" v-model="jiben.data.gcdizhi" class="weui-input" type="text" value="">

                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">建筑面积</label></div>
                <div class="weui-cell__bd">
                    <input name="mianji" v-model="jiben.data.mianji" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预算造价</label></div>
                <div class="weui-cell__bd">
                    <input name="zaojia" v-model="jiben.data.zaojia" class="weui-input" type="text"  >
                </div>
            </div>

          <!--   <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">所在城市</label></div>
                <div class="weui-cell__bd">
                    <input name="cityv" v-model="jiben.data.cityv" class="weui-input" type="text"  >
                </div>
            </div> -->


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">施工许可证号</label></div>
                <div class="weui-cell__bd">
                    <input name="sgbianhao" v-model="jiben.data.sgbianhao" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">发证机关</label></div>
                <div class="weui-cell__bd">
                    <input name="fzjiguan" v-model="jiben.data.fzjiguan" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">工程规划<br>许可证号</label></div>
                <div class="weui-cell__bd">
                    <input name="gcguihua" class="weui-input" type="text" v-model="jiben.data.gcguihua" >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">见证员</label></div>
                <div class="weui-cell__bd">
                    <input name="jzyuan" v-model="jiben.data.jzyuan" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">质监编号</label></div>
                <div class="weui-cell__bd">
                    <input name="zhijian" v-model="jiben.data.zhijian" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">用地规划<br>许可证号</label></div>
                <div class="weui-cell__bd">
                    <input name="ydguihua" v-model="jiben.data.ydguihua" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">*见证卡号</label></div>
                <div class="weui-cell__bd">
                    <input name="jzka" v-model="jiben.data.jzka" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">安监编号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="anjian" v-model="jiben.data.anjian" >
                </div>
            </div>


       <div class="weui-cell uploader-file">
                <div class="weui-cell__hd"><label for="" class="weui-label">上传图片</label></div>
            <li >
              <img v-if="jiben.data.proimg" style="width: 80px;height: 80px;margin-right: 10px;" :src="jiben.data.proimg" alt="" />
            </li>
                <div class="weui-cell__bd add-file">
                 <div id="localPicker2" class="weui-uploader__input-box" > </div>
                </div>
            </div>



            




        </div> 
</div> 
    <div class="weui-tabbar savebtn">
   <!--  <div class=""> </div> -->
       <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a>
   
                
            </div>
  </div>
  </div>
 
      
    </div></script>

<!-- 基本信息 jiben -->


<!-- 技术信息 jishu -->
    <script type="text/html" id="tpl_jishu">
        <div class="page"> 
           <div id="jishu_news" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
      

         <div class="weui-cells weui-cells_form">  
           <div class="weui-cell ">
                <div class="weui-cell__hd"><label for="" class="weui-label">墙体材料</label></div>
                <div class="weui-cell__bd"><!-- 
                    <input name="qiangti" v-model="jishu_info.data.qiangti" class="weui-input" type="text" value=""> -->
    <textarea name="qiangti" v-model="jishu_info.data.qiangti" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);"></textarea>
                </div>
            </div>

            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">材料强度等级</label>
                </div>
                 <div class="weui-cell__bd">
                    <input name="qiangtidj" v-model="jishu_info.data.qiangtidj" class="weui-input" type="text">
                </div>             
            </div> 

           <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">屋面隔热材料</label>
                </div>
                 <div class="weui-cell__bd">
                  <!--   <input name="gere" v-model="jishu_info.data.gere" class="weui-input" type="text"> -->
                      <textarea name="gere" v-model="jishu_info.data.gere"
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>
                </div>             
            </div> 
  
          <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">砌筑砂浆类型</label>
                </div>
                <div class="weui-cell__bd">
                 <input name="gere" v-model="jishu_info.data.qzleixing" class="weui-input" type="text">                    
                </div>
            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">砌筑砂浆配合比</label></div>
                <div class="weui-cell__bd">
                    <input name="peihebi" v-model="jishu_info.data.peihebi" class="weui-input" type="text" value="">
                </div>
            </div>
           <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">屋面防水材料</label></div>
                <div class="weui-cell__bd">
                   <!--  <input name="fangshui" v-model="jishu_info.data.fangshui" class="weui-input" type="text" value=""> -->
<textarea name="fangshui"  v-model="jishu_info.data.fangshui" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>   
                </div>
            </div>

            <div class="weui-cell" style="font-size: 15px;">
                <div class="weui-cell__hd" ><label for="" class="weui-label">水泥品种及等级(养护记录用)</label></div>
                <div class="weui-cell__bd">
                    <input name="shuini" v-model="jishu_info.data.shuini" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">外加剂名称(养护记录用)</label></div>
                <div class="weui-cell__bd">
                    <input name="waijiaji" v-model="jishu_info.data.waijiaji" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">掺和料名称(养护记录用)</label></div>
                <div class="weui-cell__bd">
                    <input name="canheliao" v-model="jishu_info.data.canheliao"  class="weui-input" type="text"  >
                </div>
            </div>

            




        </div> 
  
  </div> 
            <div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 

  </div></div>



 
    </div></script>
<!-- 技术信息 jishu -->


<!-- 施工 shigong -->
    <script type="text/html" id="tpl_shigong">
        <div class="page"> 

     
                  <div id="shi_gong" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
         

         <div class="weui-cells weui-cells_form">  

           <div class="weui-cell ">
                <div class="weui-cell__hd"><label for="" class="weui-label">施工单位</label></div>
                <div class="weui-cell__bd">
             <!--        <input  name="sgname " v-model="shigong_unit.data.sgname" class="weui-input" type="text" value=""> -->
 <textarea name="sgname" v-model="shigong_unit.data.sgname" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>  

 
                </div>
            </div> 

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位资质证号</label>
                </div>

                 <div class="weui-cell__bd">
                    <input name="sgzizhi" v-model="shigong_unit.data.sgzizhi" class="weui-input" type="text">
                </div>
             
            </div>

<div class="weui-cell t ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">资质等级</label>
                </div>
                  <div class="weui-cell__bd">
                    <input name="sgdengji" v-model="shigong_unit.data.sgdengji" class="weui-input" type="text">
                </div>
        
            </div> 
  
<div class="weui-cell  ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">注册号</label>
                </div>
                      <div class="weui-cell__bd">
                    <input name="sgzhucehao" v-model="shigong_unit.data.sgzhucehao" class="weui-input" type="text">
                </div>

            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">安全生产<br>许可证号</label></div>
                <div class="weui-cell__bd">
                    <input  name="sgxukehao " v-model="shigong_unit.data.sgxukehao" class="weui-input" type="text" value="">
                </div>
            </div>
           <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">单位电话</label></div>
                <div class="weui-cell__bd">
                    <input name="sgdianhua " v-model="shigong_unit.data.sgdianhua" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">企业技术<br>负责人</label></div>
                <div class="weui-cell__bd">
                    <input name=" qyjishu" v-model="shigong_unit.data.qyjishu"  class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">企业技术负责人证书编号</label></div>
                <div class="weui-cell__bd">
                    <input name="qyjishubh" v-model="shigong_unit.data.qyjishubh" class="weui-input" type="text" value="" >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">企业技术负责人电话号码</label></div>
                <div class="weui-cell__bd">
                    <input name="qyjishudh " v-model="shigong_unit.data.qyjishudh" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">项目技术<br>负责人</label></div>
                <div class="weui-cell__bd">
                    <input name="xmjishu" v-model="shigong_unit.data.xmjishu" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">项目技术负责人证书编号</label></div>
                <div class="weui-cell__bd">
                    <input name=" xmjishubh" v-model="shigong_unit.data.xmjishubh" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">项目技术负责人手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="xmjishudh" v-model="shigong_unit.data.xmjishudh" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">项目经理</label></div>
                <div class="weui-cell__bd">
                    <input name="jingli" v-model="shigong_unit.data.jingli" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">项目经理<br>证书号</label></div>
                <div class="weui-cell__bd">
                    <input name="jinglibh" v-model="shigong_unit.data.jinglibh" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">项目经理<br>手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="jinglidh" v-model="shigong_unit.data.jinglidh" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">施工员</label></div>
                <div class="weui-cell__bd">
                    <input name="shigongyuan" v-model="shigong_unit.data.shigongyuan" class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">施工员<br>证书编号</label></div>
                <div class="weui-cell__bd">
                    <input name="shigongyuanzh" v-model="shigong_unit.data.shigongyuanzh"  class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">施工员<br>手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="shigongyuandh" v-model="shigong_unit.data.shigongyuandh"  class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">质量员</label></div>
                <div class="weui-cell__bd">
                    <input name="zhiliangyuan" v-model="shigong_unit.data.zhiliangyuan" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">质量员<br>证书编号</label></div>
                <div class="weui-cell__bd">
                    <input name="zhiliangyuanzh" v-model="shigong_unit.data.zhiliangyuanzh" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">质量员手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="zhiliangyuandh" v-model="shigong_unit.data.zhiliangyuandh" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">安全员</label></div>
                <div class="weui-cell__bd">
                    <input name="anquanyuan" v-model="shigong_unit.data.anquanyuan" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">安全员证书编号</label></div>
                <div class="weui-cell__bd">
                    <input name="anquanyuanzh" v-model="shigong_unit.data.anquanyuanzh" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">安全员手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="anquanyuandh" v-model="shigong_unit.data.anquanyuandh" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">施工单位负责人</label></div>
                <div class="weui-cell__bd">
                    <input name="sgfuzeren" v-model="shigong_unit.data.sgfuzeren" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">施工单位负责人手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="sgfuzerendh" v-model="shigong_unit.data.sgfuzerendh"  class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">钢筋工班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="gangjingong" v-model="shigong_unit.data.gangjingong" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">抹灰班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="mohuigong" v-model="shigong_unit.data.mohuigong" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">电工班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="diangong" v-model="shigong_unit.data.diangong" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">木工班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="mugong" v-model="shigong_unit.data.mugong" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">砌筑班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="qizhu" v-model="shigong_unit.data.qizhu" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">焊工班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="hangong" v-model="shigong_unit.data.hangong" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">混凝土班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="tonggong" v-model="shigong_unit.data.tonggong"  class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">架子工班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="jiazigong" v-model="shigong_unit.data.jiazigong" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">水电班组长</label></div>
                <div class="weui-cell__bd">
                    <input name="shuidian" v-model="shigong_unit.data.shuidian" class="weui-input" type="text"  >
                </div>
            </div>

        </div> 
  
  </div>
<div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 




  </div></div>
 
    </div></script>
<!-- 施工 shigong -->



<!-- 建设    jianshe -->
    <script type="text/html" id="tpl_jianshe">
        <div class="page">
        
     <div id="jian_she" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
      
         <div class="weui-cells weui-cells_form">  

          <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">建设单位</label>
                </div>
     <div class="weui-cell__bd">
     <!--   <input name="jsname" v-model="jianshe_unit.data.jsname"  class="weui-input" type="text"  > -->
<textarea name="jsname"  v-model="jianshe_unit.data.jsname"
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>
     </div>
  </div>

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位电话</label>
                </div>
     <div class="weui-cell__bd">
       <input name="jsdianhua" v-model="jianshe_unit.data.jsdianhua"  class="weui-input" type="text"  ></div>
  </div>

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位负责人</label>
                </div>
            

                  <div class="weui-cell__bd">
                    <input name="jsfuze" v-model="jianshe_unit.data.jsfuze" class="weui-input" type="text"  >
                </div>
            </div> 
  
<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位负责人<br>手机号码</label>
                </div>

                <div class="weui-cell__bd">
           <input name="jsphone" v-model="jianshe_unit.data.jsphone"  class="weui-input" type="text"  >
           </div>
            </div>
            </div>           
           
        </div>

</div> 
<div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 


  </div></div>

 

    </div></script>
<!-- 建设    jianshe -->

<!-- 监理 jianli -->
    <script type="text/html" id="tpl_jianli">
        <div class="page">
       
          <div id="jian_li" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
         
         <div class="weui-cells weui-cells_form">  

         <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">监理单位</label>
                </div>
                  <div class="weui-cell__bd">
                    <!-- <input name="jlname" v-model="jianli_unit.data.jlname" class="weui-input" type="text"> -->
<textarea name="jlname"   v-model="jianli_unit.data.jlname" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>


                </div>
   </div>

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位资质证号</label>
                </div>
                  <div class="weui-cell__bd">
                    <input name="jlzizhi" v-model="jianli_unit.data.jlzizhi" class="weui-input" type="text">
                </div>
   </div>

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">资质等级</label>
                </div>
               <div class="weui-cell__bd">
                    <input name="jldengji" v-model="jianli_unit.data.jldengji" class="weui-input" type="text">
                </div>
            </div>



<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">注册证号</label>
                </div>
                 <div class="weui-cell__bd">
                    <input name="jlzhucehao" v-model="jianli_unit.data.jlzhucehao" class="weui-input" type="text">
                </div>
            </div> 
  
<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位电话</label>
                </div>
          
                  <div class="weui-cell__bd">
                    <input name="jldianhua" v-model="jianli_unit.data.jldianhua" class="weui-input" type="text">
                </div>

            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">项目总监理工程师</label></div>
                <div class="weui-cell__bd">
                    <input name="zongjian" v-model="jianli_unit.data.zongjian" class="weui-input" type="text" value="">
                </div>
            </div>
           <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">项目总监理工程师证书号</label></div>
                <div class="weui-cell__bd">
                    <input name="zjzhenghao" v-model="jianli_unit.data.zjzhenghao"  class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">项目总监理工程师手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="zjdianhua" v-model="jianli_unit.data.zjdianhua"  class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">专业监理工程师</label></div>
                <div class="weui-cell__bd">
                    <input name="zhuanjian" v-model="jianli_unit.data.zhuanjian"  class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">专业监理工程师证书号</label></div>
                <div class="weui-cell__bd">
                    <input name="zhuanjianzh" v-model="jianli_unit.data.zhuanjianzh"  class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">专业监理工程师手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="zhuanjiandh" v-model="jianli_unit.data.zhuanjiandh"  class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">监理员</label></div>
                <div class="weui-cell__bd">
                    <input name="jianliyuan" v-model="jianli_unit.data.jianliyuan"  class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">监理员手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="jianliyuandh" v-model="jianli_unit.data.jianliyuandh"  class="weui-input" type="text"  >
                </div>
            </div>


            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">单位负责人</label></div>
                <div class="weui-cell__bd">
                    <input name="jlfuzeren" v-model="jianli_unit.data.jlfuzeren" class="weui-input" type="text"  >
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">单位负责人<br>手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="jlfuzerendh" v-model="jianli_unit.data.jlfuzerendh" class="weui-input" type="text"  >
                </div>
           </div>
         
        </div>
</div>
<div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 
  </div></div>

 

    </div></script>
<!-- 建设    jianshe -->


<!-- 设计 sheji -->
    <script type="text/html" id="tpl_sheji">
        <div class="page">
      
           <div id="she_ji" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
           
         <div class="weui-cells weui-cells_form">  

          <div class="weui-cell   weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">设计单位</label>
                </div>
                  <div class="weui-cell__bd">
                   <!--  <input name="sjname" v-model="sheji_unit.data.sjname" class="weui-input" type="text" value=""> -->

              <textarea name="sjname" v-model="sheji_unit.data.sjname" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);"></textarea>

                </div>
           
            </div>

<div class="weui-cell  weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位资质证号</label>
                </div>
                  <div class="weui-cell__bd">
                    <input name="sjzizhi" v-model="sheji_unit.data.sjzizhi" class="weui-input" type="text" value="">
                </div>
           
            </div>

<div class="weui-cell  weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位资质等级</label>
                </div>
                  <div class="weui-cell__bd">
                    <input name="sjdengji" v-model="sheji_unit.data.sjdengji" class="weui-input" type="text" value="">
                </div>
            
            </div> 
  
<div class="weui-cell  weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">注册证号</label>
                </div>
                <div class="weui-cell__bd">

                    <input name="sjdengji" v-model="sheji_unit.data.sjzhucehao" class="weui-input" type="text" value="">
                    
                </div>
            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">单位电话</label></div>
                <div class="weui-cell__bd">
                    <input name="sjdianhua" v-model="sheji_unit.data.sjdianhua"  class="weui-input" type="text" value="">
                </div>
            </div>
           <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">单位负责人</label></div>
                <div class="weui-cell__bd">
                    <input name="sjfuze" v-model="sheji_unit.data.sjfuze" class="weui-input" type="text" value="">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">单位负责人<br>手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="sjphone" v-model="sheji_unit.data.sjphone"  class="weui-input" type="text" value="">
                </div>
            </div>
        </div>

  </div>
<div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 

   </div></div>

  
    </div></script>
<!-- 设计 sheji -->


<!-- 勘察 kancha -->
    <script type="text/html" id="tpl_kancha">
        <div class="page">
       
              <div id="kan_cha" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
           

         <div class="weui-cells weui-cells_form">  

          <div class="weui-cell ">
          <div class="weui-cell__hd">
            <label for="" class="weui-label">勘察单位</label>
          </div>
          <div class="weui-cell__bd">
           <!--  <input name="kcname" v-model="kancha.data.kcname" class="weui-input" type="text" value=""> -->
  <textarea name="kcname" v-model="kancha.data.kcname" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);">
</textarea>
           </div>

        </div>

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位资质证号</label>
                </div>
                 <div class="weui-cell__bd">
                    <input name="kczizhi" v-model="kancha.data.kczizhi" class="weui-input" type="text" value="">
                </div>
             
 </div>

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位资质等级</label>
                </div>
                  <div class="weui-cell__bd">
                    <input name="kcdengji" v-model="kancha.data.kcdengji" class="weui-input" type="text" value="">
                </div>
             
            </div> 
  
<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位负责人</label>
                </div>
                  <div class="weui-cell__bd">
                    <input name="kcfuze" v-model="kancha.data.kcfuze" class="weui-input" type="text" value="">
                </div>
           
            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">单位负责人<br>手机号码</label></div>
                <div class="weui-cell__bd">
                    <input name="kcphone" v-model="kancha.data.kcphone" class="weui-input" type="text" value="">
                </div>
            </div>
           
        </div>
  
  </div> 
<div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave'  class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 

  </div></div> 
     
    </div></script>
<!-- 勘察 kancha -->


<!-- 其他 qita -->
    <script type="text/html" id="tpl_qita">
        <div class="page">
    
            <div id="other_q" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
          
      
 

         <div class="weui-cells weui-cells_form">

          <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">商品混凝土单位</label>
                </div>
                 <div class="weui-cell__bd">
                  <!--   <input name="hntname" v-model="othera_unit.data.hntname"  class="weui-input" type="text" value=""> -->
              <textarea name="hntname" v-model="othera_unit.data.hntname"  
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);"></textarea>

                </div>
             
            </div>  


<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位资质证号</label>
                </div>
                 <div class="weui-cell__bd">
                    <input name="hntzizhi" v-model="othera_unit.data.hntzizhi"  class="weui-input" type="text" value="">
                </div>
             
            </div>

<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">单位电话</label>
               </div>
                <div class="weui-cell__bd">
                    <input name="hntphone" v-model="othera_unit.data.hntphone"  class="weui-input" type="text" value="">
                </div>
            
            </div> 
  
<div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">分包单位</label>
                </div>
                  <div class="weui-cell__bd">
                   <!--  <input name="fbname" v-model="othera_unit.data.fbname"  class="weui-input" type="text" value=""> -->
              <textarea name="fbname"  v-model="othera_unit.data.fbname" 
style='width: 100%;border: 0;overflow:scroll;overflow-y:hidden;overflow-x:hidden;resize : none; margin-top: 22px;font-size: inherit; '
onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},0);"
onblur="clearInterval(this.clock);"></textarea>

                </div>
           
            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">分包单位<br>资质证号</label></div><br>
                <div class="weui-cell__bd">
                    <input name="fenbao" v-model="othera_unit.data.fenbao" class="weui-input" type="text" value="">
                </div>
            </div>
        
        </div>
 
</div>
<div class="weui-tabbar savebtn">
                <a href="javascript:;" @click='comsave' class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 


  </div></div>
 
    </div></script>
<!-- 其他 qita -->
        
<!-- 送检汇总 gether -->
    <script type="text/html" id="tpl_gether">
        <div class="page hz"> 
<div class="page__bd" style="height: 100%;"  id="getherbody">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 

 
        <div>
          <div class="bgc_1 fc_f h_r3 planaction">
 <div class="weui-cell weui-cell_select prosinselect"> 
                  <div class="weui-flex w_p85"> 
                      <div class="weui-flex__item prostl"   v-bind:class="{open: prosta}">
                      <div v-on:click="changeopen('#getherbody','prosta')" class="weui-media-box__title lh_48 w_p90 pl_5 t_c">&nbsp;<span v-text="prname"></span></div>
                      <img src="./images/ico2.png" alt="">
                        <div class="prolist" style="width: 100%;">
                        <div class="weui-actionsheet__menu fc_7">
                            <div  v-if="value.isdel!=1" v-on:click="checkpro(key)" class="weui-actionsheet__cell" v-for="(value,key) in prodata">
                                <span v-text="value.prname"></span>
                            </div> 
                        </div> 
                  </div>
                      </div>  
                  </div> 
                  <div class="fr w_p15 t_c gethstl" v-bind:class="{open: sinsta}" >
                      <div  v-on:click="changeopen('#getherbody','sinsta')"  class="w_p100" style="line-height: 48px;">
                      <img width="20" src="./images/geth.png" alt="">
                       </div>
                       <div class="sinlist h215" style="right: 0;left: 0;width: 100%;">
                          <div class="weui-actionsheet__menu fc_7"> 
                            <div class="weui-cell">
                <div class="weui-cell__hd">
                <label for="" class="weui-label t_l">起始日期</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input ipr" v-model="btime" type="date" value="" style="">
                </div>
            </div>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                <label for="" class="weui-label t_l">结束日期</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input ipr" v-model="etime" type="date" value="">
                </div>
            </div>
                            <div class="weui-cell weui-cell_switch">
                                <div class="weui-cell__bd t_l">显示漏送</div>
                                <div class="weui-cell__ft">
                                    <input class="weui-switch" v-model="lsornot" type="checkbox">
                                </div>
                            </div>
        </div>  
 <div class="weui-actionsheet__action">
   <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="find" href="javascript:" id="showTooltips">确定</a>
        </div>
          </div>
                        </div> 
                       </div> 
                   </div> 

          </div>
 <div class="weui-mask" v-on:click="changeopen('#getherbody','all')" id="iosMask" style="display: none"></div>







</div>
   <div class="weui-footer">
            <p class="weui-footer__text t_l" style="line-height: 2;">
            <span>查询范围：</span>
            <span v-text="btime"></span>~
            <span v-text="etime"></span>
            <span v-if="lsornot">显示漏送</span>
            </p>
        </div>

      

<!-- 原材 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">原材
<span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.yc.hzlist.length+gether_data.data.yc.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.yc.hzlist.length"></span>
条记录
</span> 
 </h4>
            </div>
            <div class="weui-panel__bd">
              
            <!-- 汇总 -->
          <div  @click='setcodeid(value.codeid)' v-cloak v-for="(value,key) in gether_data.data.yc.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="yc" style="padding:5px 10px">
            <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span v-text="value.mname"></span> 
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['ychz'+key]">
                    <input class="weui-switch" @click="yschk(value,'ycys')" :id="['ychz'+key]" :checked="value.ycys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">进场：<span v-text="value.intime"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.stime"> </span></li> 
                    </ul>
             </div> 
                </div> 

<!-- 漏送 -->
      <div @click='setcodeid(value.codeid)' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.yc.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="yc" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span class="weui-media-box__info ls">漏</span>
               <span v-text="value.mname"></span> 
               
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['ycls'+key]">
                    <input class="weui-switch" @click="yschk(value,'ycys')" :id="['ycls'+key]" :checked="value.ycys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">进场：<span v-text="value.intime"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.stime"> </span></li> 
                    </ul>
             </div> 
                </div> 
  
 

    
            </div> 
        </div>


<!-- 标养 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">标养
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.by.hzlist.length+gether_data.data.by.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.by.hzlist.length"></span>
条记录
</span> </h4>
            </div>
            <div class="weui-panel__bd">
              
<!-- 汇总 -->
   <div  @click='setcodeid(value.codeid,"by")' v-cloak v-for="(value,key) in gether_data.data.by.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span v-text="value.bybuwei"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['byhz'+key]">
                    <input class="weui-switch" @click="yschk(value,'byys')" :id="['byhz'+key]" :checked="value.byys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.bytime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"by")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.by.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.bybuwei"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['byls'+key]">
                    <input class="weui-switch" @click="yschk(value,'byys')" :id="['byls'+key]" :checked="value.byys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.bytime"> </span></li> 
                    </ul>
             </div> 
                </div>  
  
            </div> 
        </div>



<!-- 同养 -->
 <div class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">同养
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.ty.hzlist.length+gether_data.data.ty.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.ty.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
                <!-- 汇总 -->
   <div  @click='setcodeid(value.codeid,"ty")' v-cloak v-for="(value,key) in gether_data.data.ty.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title" > 
               <span v-text="value.bybuwei"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['tyhz'+key]">
                    <input class="weui-switch" @click="yschk(value,'tyys')" :id="['tyhz'+key]" :checked="value.tyys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.tytime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"ty")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.ty.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title" > 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.bybuwei"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['tyls'+key]">
                    <input class="weui-switch" @click="yschk(value,'tyys')" :id="['tyls'+key]" :checked="value.tyys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.tytime"> </span></li> 
                    </ul>
             </div> 
                </div>   
            </div> 
        </div>


<!-- 抗渗 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">抗渗
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.ks.hzlist.length+gether_data.data.ks.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.ks.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
                <!-- 汇总 -->
   <div  @click='setcodeid(value.codeid,"ks")' v-cloak v-for="(value,key) in gether_data.data.ks.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span v-text="value.bybuwei"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['kshz'+key]">
                    <input class="weui-switch" @click="yschk(value,'ksys')" :id="['kshz'+key]" :checked="value.ksys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.kstime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"ks")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.ks.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span class="weui-media-box__info ls">漏</span> 
               <span v-text="value.bybuwei"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 
              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['ksls'+key]">
                    <input class="weui-switch" @click="yschk(value,'ksys')" :id="['ksls'+key]" :checked="value.ksys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.kstime"> </span></li> 
                    </ul>
             </div> 
                </div>   
            </div> 
        </div>



<!-- 柱头 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">柱头
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.zt.hzlist.length+gether_data.data.zt.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.zt.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
                                <!-- 汇总 -->
   <div @click='setcodeid(value.codeid,"zt")' v-cloak v-for="(value,key) in gether_data.data.zt.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span v-text="value.bybuwei"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 
                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['zthz'+key]">
                    <input class="weui-switch" @click="yschk(value,'ztys')" :id="['zthz'+key]" :checked="value.ztys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.zttime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div  @click='setcodeid(value.codeid,"zt")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.zt.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.bybuwei"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['ztls'+key]">
                    <input class="weui-switch" @click="yschk(value,'ztys')" :id="['ztls'+key]" :checked="value.ztys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.zttime"> </span></li> 
                    </ul>
             </div> 
                </div>  
            </div> 
        </div>


<!-- 电渣 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">焊接
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.dz.hzlist.length+gether_data.data.dz.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.dz.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
 <!-- 汇总 -->
   <div  @click='setcodeid(value.codeid,"dz")' v-cloak v-for="(value,key) in gether_data.data.dz.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span v-text="value.bybuwei"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['dzhz'+key]">
                    <input class="weui-switch" @click="yschk(value,'dzys')" :id="['dzhz'+key]" :checked="value.dzys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">砼浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.dztime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"dz")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.dz.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.bybuwei"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['dzls'+key]">
                    <input class="weui-switch" @click="yschk(value,'dzys')" :id="['dzls'+key]" :checked="value.dzys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">砼浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.kstime"> </span></li> 
                    </ul>
             </div> 
                </div>   
            </div> 
        </div>


<!-- 拆模 -->

 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">拆模
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.cm.hzlist.length+gether_data.data.cm.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.cm.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
  <!-- 汇总 -->
   <div @click='setcodeid(value.codeid,"cm")' v-cloak v-for="(value,key) in gether_data.data.cm.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span v-text="value.bybuwei"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 
                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['cmhz'+key]">
                    <input class="weui-switch" @click="yschk(value,'cmys')" :id="['cmhz'+key]" :checked="value.cmys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.cmtime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"cm")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.cm.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title "> 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.bybuwei"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['cmls'+key]">
                    <input class="weui-switch" @click="yschk(value,'cmys')" :id="['cmls'+key]" :checked="value.cmys==1" type="checkbox">
                    <span></span> 
                </label>

            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">浇筑：<span v-text="value.byriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.cmtime"> </span></li> 
                    </ul>
             </div> 
                </div>   
            </div> 
        </div>


<!-- 砌筑 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">砌筑
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.qz.hzlist.length+gether_data.data.qz.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.qz.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
                  <!-- 汇总 -->
   <div @click='setcodeid(value.codeid,"qz")' v-cloak v-for="(value,key) in gether_data.data.qz.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title "> 
               <span v-text="value.qzname"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['qzhz'+key]">
                    <input class="weui-switch" @click="yschk(value,'qzys')" :id="['qzhz'+key]" :checked="value.qzys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.qzriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.qztime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"qz")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.qz.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title "> 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.qzname"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['qzls'+key]">
                    <input class="weui-switch" @click="yschk(value,'qzys')" :id="['qzls'+key]" :checked="value.qzys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.qzriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.qztime"> </span></li> 
                    </ul>
             </div> 
                </div>  
            </div> 
        </div>


<!-- 外墙 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">外墙
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.wq.hzlist.length+gether_data.data.wq.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.wq.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
                                  <!-- 汇总 -->
   <div @click='setcodeid(value.codeid,"wq")' v-cloak v-for="(value,key) in gether_data.data.wq.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title "> 
               <span v-text="value.wqname"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['wqhz'+key]">
                    <input class="weui-switch" @click="yschk(value,'wqys')" :id="['wqhz'+key]" :checked="value.wqys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.wqriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.wqtime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"wq")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.wq.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title "> 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.wqname"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['wqls'+key]">
                    <input class="weui-switch" @click="yschk(value,'wqys')" :id="['wqls'+key]" :checked="value.wqys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.wqriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.wqtime"> </span></li> 
                    </ul>
             </div> 
                </div>  
            </div> 
        </div>


<!-- 内墙 -->
 <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">内墙
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.nq.hzlist.length+gether_data.data.nq.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.nq.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
                                  <!-- 汇总 -->
   <div @click='setcodeid(value.codeid,"nq")' v-cloak v-for="(value,key) in gether_data.data.nq.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title "> 
               <span v-text="value.nqname"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 

                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['nqhz'+key]">
                    <input class="weui-switch" @click="yschk(value,'nqys')" :id="['nqhz'+key]" :checked="value.nqys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.nqriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.nqtime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"nq")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.nq.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
               <span class="weui-media-box__info ls">漏</span><span v-text="value.nqname"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                 
               
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['nqls'+key]">
                    <input class="weui-switch" @click="yschk(value,'nqys')" :id="['nqls'+key]" :checked="value.nqys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.nqriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.nqtime"> </span></li> 
                    </ul>
             </div> 
                </div>  
            </div> 
        </div>


<!-- 找平 --> 
        <div class="weui-panel weui-panel_access ">
            <div class="weui-panel__hd">
            <h4 class="weui-media-box__title">找平
            <span class="f_13" v-cloak>
<span v-if="lsornot" v-text="gether_data.data.zp.hzlist.length+gether_data.data.zp.lslist.length"></span>
<span v-if="!lsornot" v-text="gether_data.data.zp.hzlist.length"></span>
条记录
</span>
            </h4>
            </div>
            <div class="weui-panel__bd">
                                  <!-- 汇总 -->
   <div @click='setcodeid(value.codeid,"zp")' v-cloak v-for="(value,key) in gether_data.data.zp.hzlist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title "> 
               <span v-text="value.zpname"></span> <span class="weui-media-box__info" v-text="value.sname"></span>
               
               </div> 
                <label v-on:click.stop class="weui-cell__ft ps_r" :for="['zphz'+key]">
                    <input class="weui-switch" @click="yschk(value,'zpys')" :id="['zphz'+key]" :checked="value.zpys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.zpriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.zptime"> </span></li> 
                    </ul>
             </div> 
                </div>   

<!-- 漏送 -->
 <div @click='setcodeid(value.codeid,"zp")' v-if="lsornot" v-cloak v-for="(value,key) in gether_data.data.zp.lslist" class="weui-media-box weui-media-box_text weui-cell_access js_item" data-id="sj" style="padding:5px 10px">
                   <div class="weui-cell weui-cell_switch"> 
                
               <div class="weui-cell__bd weui-media-box__title"> 
                <span class="weui-media-box__info ls">漏</span>     
               <span v-text="value.zpname"></span>
                <span class="weui-media-box__info" v-text="value.sname"></span>
                          
               </div> 

              <label v-on:click.stop class="weui-cell__ft ps_r" :for="['zpls'+key]">
                    <input class="weui-switch" @click="yschk(value,'zpys')" :id="['zpls'+key]" :checked="value.zpys==1" type="checkbox">
                    <span></span> 
                </label>
            </div>
            <div class="pl_15">
               <ul class="weui-media-box__info" style="margin-top: 2px;">
                      <li class="weui-media-box__info__meta fc_1">制作：<span v-text="value.zpriqi"></span></li>
                        <li class="weui-media-box__info__meta fc_1" style="float: right;">送检：<span v-text="value.zptime"> </span></li> 
                    </ul>
             </div> 
                </div> 


<!-- <div class="page__bd page__bd_spacing" style="padding:5px 10px">
    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="saveasjilu()">保存为送检记录</a>
</div> -->

            </div> 
        </div> 
      

 



            </div>
            <div class="weui-tabbar">
               <div v-cloak   class="jhaddk"> 
                <img  @click="saveasjilu()" style="width:9vh;" src="images/kuaizhao.png" alt="">
              </div>
            </div>
        </div>
    </div>















        

    </div></script>
<!-- 送检汇总 gether -->

<!-- 汇总详情 hzdetail -->
    <script type="text/html" id="tpl_hzdetail">
        <div class="page">
        <div>
           汇总详情 
        </div>
           <div>
            <a href="javascript:home();">返回</a>
           </div>  
    </div> 
        <script></script>
    </script>
<!-- 汇总详情hzdetail -->

<!-- 创建工程 addpro -->
    <script type="text/html" id="tpl_addpro">
        <div class="page">
           <div id="probody" class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
          
      
        <div class="weui-cells__title">工程名称</div>
<div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input  v-model="pro_add.data.prname" class="weui-input" type="text" placeholder="请输入工程名称">
                </div>
            </div>
        </div>

         <div class="weui-cells weui-cells_form">  

<div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">省份</label>
                </div>
                <div class="weui-cell__bd">
                    <select @change="selprovince(pro_add.data.pid)" v-model="pro_add.data.pid" class="weui-select" name="select2">
                        <option v-for="(value,key) in com_province.data" :value="value.pid">{{value.province}}</option>
                       
                    </select>
                </div>
            </div>

<div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">城市</label>
                </div>
                <div class="weui-cell__bd">
                    <select  v-model="pro_add.data.cityid" class="weui-select" name="select2">
            <option v-for="(value,key) in com_city.data" :value="value.ctid">{{value.city}}</option>
                   
                   </select>
                </div>
            </div> 
  
<div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">结构类型</label>
                </div>
                <div class="weui-cell__bd">
                    <select  v-model="pro_add.data.jiegou" class="weui-select" name="select2">
                        <option value="1">框架结构</option>
                        <option value="2">框剪结构</option> 
                    </select>
                </div>
            </div>           
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">开工日期</label></div>
                <div class="weui-cell__bd">
                    <input v-model="pro_add.data.kaigong" class="weui-input" type="date" value="">
                </div>
            </div>

           <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">竣工日期</label></div>
                <div class="weui-cell__bd">
                    <input v-model="pro_add.data.jungong" class="weui-input" type="date" value="">
                </div>
            </div>



       <div class="weui-cell uploader-file">
                <div class="weui-cell__hd"><label for="" class="weui-label">上传图片</label></div>
            <li >
              <img v-if="pro_add.data.proimg" style="width: 80px;height: 80px;margin-right: 10px;" :src="pro_add.data.proimg" alt="" />
            </li>
                <div class="weui-cell__bd add-file">
                 <div id="localPicker" class="weui-uploader__input-box" > </div>
                </div>
            </div>








        </div>

 
 
  
</div>
<div class="weui-tabbar savebtn"  @click="savepro">
                <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on"> 
                   <p class="">保存</p>
                </a> 
            </div> 



  </div></div>
    </div></script>
<!-- 创建工程 addpro -->


<!-- 标配 --> 
<!-- <div class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel"> 

            </div>
            <div class="weui-tabbar">
              
            </div>
        </div>
    </div> -->
<!-- 标配 -->































   
   <!--  <script src="./js/zepto.min.js"></script>  -->
    <script src="./js/1jquery.min.js"></script>
       <script src="./js/2webuploader.js"></script>
    <script src="./js/vue.js"></script>
    <script src="./js/global.js"></script>

  <script>
     $(function(){
              fac.post(YSCONF.url.my_info.url,{},function(re){
                if(re.code==1){ 
         wx.config({
            debug: false,
           appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsapi_ticket: '<?php echo $signPackage["jsapiTicket"];?>',// 必填
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
                    'checkJsApi',
               'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo'
            ]
          });
          wx.ready(function () {
            // 在这里调用 API
            wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ],
            success: function (res) {
                //alert(JSON.stringify(res));
            }
        });
               wx.onMenuShareQQ({
                  title: '河狸建筑,河狸建筑工程信息化平台',
                  desc: '河狸建筑工程信息化平台,专门为资料员量身打造的工程管理系统，集成功能：送检计划，送检汇总，进度管理，漏送统计及提示，送检异常统计，城市温度采集，同养温度计算及累计，形象进度图，横道图，资料打印等功能。手机微信关注河狸建筑，让你随时随地了解现场及送检进度，是资料员得力助手，为您提供贴心服务。河狸建筑在手，工程无忧！',
                  link: "http://pre.ysjianzhu.com/wap/producs.html?YY"+re.data.tuijian+"SS=1",
                  imgUrl: 'http://pre.ysjianzhu.com/wap/images/ysshare.jpg'
                 });
            wx.onMenuShareTimeline({
                  title: '河狸建筑,河狸建筑工程信息化平台',
                  desc: '河狸建筑工程信息化平台,专门为资料员量身打造的工程管理系统，集成功能：送检计划，送检汇总，进度管理，漏送统计及提示，送检异常统计，城市温度采集，同养温度计算及累计，形象进度图，横道图，资料打印等功能。手机微信关注河狸建筑，让你随时随地了解现场及送检进度，是资料员得力助手，为您提供贴心服务。河狸建筑在手，工程无忧！',
                  link: "http://pre.ysjianzhu.com/wap/producs.html?YY"+re.data.tuijian+"SS=1",
                  imgUrl: 'http://pre.ysjianzhu.com/wap/images/ysshare.jpg'
                 });
            wx.onMenuShareAppMessage({
                  title: '河狸建筑,河狸建筑工程信息化平台',
                  desc: '河狸建筑工程信息化平台,专门为资料员量身打造的工程管理系统，集成功能：送检计划，送检汇总，进度管理，漏送统计及提示，送检异常统计，城市温度采集，同养温度计算及累计，形象进度图，横道图，资料打印等功能。手机微信关注河狸建筑，让你随时随地了解现场及送检进度，是资料员得力助手，为您提供贴心服务。河狸建筑在手，工程无忧！',
                  link: "http://pre.ysjianzhu.com/wap/producs.html?YY"+re.data.tuijian+"SS=1",
                  imgUrl: 'http://pre.ysjianzhu.com/wap/images/ysshare.jpg'
                 });
          });
                   
                } 
              });
     }) 

    </script>

   

</body>
</html>
