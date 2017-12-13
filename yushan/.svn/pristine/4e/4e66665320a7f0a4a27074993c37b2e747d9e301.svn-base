<?php 
namespace api\wechat\controller;
use think\Controller;
use think\Request;
use think\View;
use think\Session;
use think\Db;
use plug\myheader;
use plug\ossupload;
use think\cache\driver\Redis;
class LoginController extends Controller{




/*
 * 辅助方法1：微信接入验证
 */
public function entrance(){
  $token = 'token';
  $nonce = input("nonce");  
  $timestamp = input("timestamp");
  $echoStr = input("echostr");
  $signature = input("signature");
  $tmpArr = array($token, $timestamp, $nonce);
  sort($tmpArr, SORT_STRING);
  $tmpStr = implode( $tmpArr );
  $tmpStr = sha1( $tmpStr );
  if( $tmpStr == $signature && $echoStr){
    ob_clean();
    echo $echoStr;
    exit;
  }else{
    $this->responseMsg();
  }
}




public function responseMsg(){

  $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];               
    $postObj = simplexml_load_string($postStr,"SimpleXMLElement",LIBXML_NOCDATA);//XML转String
    //根据消息类型将信息分发
    if(strtolower( $postObj->MsgType) == 'event'){
        if(strtolower($postObj->Event) == 'subscribe'){
            $toUserName = $postObj->FromUserName;
            $fromUserName = $postObj->ToUserName;
            $createTime = time();
            $msgType = 'news';
            $articleCount = "1";
            $title1 = "河狸建筑——资料员移动办公,个人资料员用户永久免费";
            $description1 = "一、送检计划
            1．自动计算送检日期，自动累积同养温度
            2．送检汇总，智能填写，一键打印
            二、七天送检
            1．全局关联统计，送检快照留底备忘
            三、进度管理
            1．施工、送检进度形象展示，已送、未送、漏送、异常一览无遗  
            四、画横道图
            1．填写时间，自动生成横道图 
            五、移动办公
            1．云端基础架构，支持微信、手机浏览器、PC浏览器多平台移动办公";
            $picurl1 = "http://pre.ysjianzhu.com/wap/images/new.png";
            $url1 = "http://pre.ysjianzhu.com/wap/producs.html";

            $template ="<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]]></MsgType>
                        <ArticleCount>%s</ArticleCount>
                        <Articles>
                        <item>
                        <Title><![CDATA[%s]]></Title> 
                        <Description><![CDATA[%s]]></Description>
                        <PicUrl><![CDATA[%s]]></PicUrl>
                        <Url><![CDATA[%s]]></Url>
                        </item>
                        </Articles>
                        </xml>";
            $info = sprintf($template, $toUserName, $fromUserName,$createTime, $msgType,$articleCount,$title1,$description1,$picurl1,$url1);
            echo $info;
        }
    }
  }















/*
 * 辅助方法2:获取验证码
 */
public  function getphoneCode(){
 // $_POST = json_decode(file_get_contents('php://input'),true);
  // 验证图形验证码
  if(input('yzmcode')==''){
    $rearr['msg']='请输入图形验证码!';
    $rearr['code']=0;
    return json($rearr);
  }else if(!cmf_captcha_check(input('yzmcode'))){
    $rearr['msg']='图形验证码错误!';
    $rearr['code']=0; 
    return json($rearr);
   }else{

    return json(getphcode(input('tel'))); 
   }


  
 }


/*
 * 辅助方法3:获取验证码
 */
public  function getphoneCode2(){
 // $_POST = json_decode(file_get_contents('php://input'),true);

    return json(getphcode(input('tel'))); 
  
 }


/*
 * 辅助方法3：创建自定义菜单
 */
public function create_menu(){
  $appid = 'wx4ebb8c954a411d91';
  $appsecret = '7e7c47ccd966da56097952925f4a4ff1';
  //下面是测试号的appid和appsecrect
  // $appid = 'wx855ea7a09cac1332';
  // $appsecret = '61898f7349e81bda57297d900bdb67ba';
  $accestoken = get_access_token($appid,$appsecret);
  $url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token={$accestoken}";



 $menu = '{
    "button": [
        {
            "name": "行业干货",
            "sub_button":[
           {    
               "type":"view",
               "name":"分享有礼",
               "url":"http://pre.ysjianzhu.com/wap/yijian.html"
            },
            {
               "type":"view",
               "name":"历史干货",
               "url":"http://pre.ysjianzhu.com/wap/producs.html"
            }]            
        },
        {
            "type": "view",
            "name": "河狸建筑",
            "url" : "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ebb8c954a411d91&redirect_uri=http%3a%2f%2fpre.ysjianzhu.com%2fapi%2fwechat%2fLogin%2findex&scope=snsapi_base&response_type=code&state=STATE#wechat_redirect"
        },
        {
            "name": "关于河狸",
            "sub_button":[
           {    
               "type":"view",
               "name":"联系客服",
               "url":"http://pre.ysjianzhu.com/wap/yijian.html"
            },
            {
               "type":"view",
               "name":"河狸简介",
               "url":"http://pre.ysjianzhu.com/wap/producs.html"
            }]            
        }
    ]
  }';


  // $menu = '{
  //   "button": [
  //       {
  //           "type": "view",
  //           "name": "新规新闻",
  //           "url": "http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzI5NjA5Mjk2Nw==#wechat_webview_type=1&wechat_redirect"
  //       },
  //       {
  //           "type": "view",
  //           "name": "河狸建筑",
  //           "url" : "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7f78ed44b12f996f&redirect_uri=http%3a%2f%2fpre.ysjianzhu.com%2fphp%2fYswechat%2fLogin%2findex&scope=snsapi_base&response_type=code&state=STATE#wechat_redirect"
  //       },
  //       {
  //           "name": "建议反馈",
  //           "type": "view",
  //           "url": "http://pre.ysjianzhu.com/wap/yijian.html"
  //       }
  //   ]
  // }';
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);    
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $menu);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($menu)));
  $re = curl_exec($ch);
  curl_close($ch);
  print_r($re);
}





/*
 *  001.首页
 */
public function index(){
  $openid = session('openid');
  $appid = 'wx4ebb8c954a411d91';
  $appsecret = '7e7c47ccd966da56097952925f4a4ff1';
  if(!$openid){  
    $redirect_uri = 'http://pre.ysjianzhu.com/api/wechat/Login/cacheopenid';
    $redirect_uri = urlencode($redirect_uri);
    $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$redirect_uri.'&scope=snsapi_base&response_type=code&state=STATE#wechat_redirect';
    header("location:".$url); 
  }else{
    $user = Db::connect("DB_Config_1")->name('user')->where(array('wechatopenid'=>$openid))->find(); 
    if($user == null){
      //如果用户不存在，则跳转到注册页面
      $url="http://pre.ysjianzhu.com/wap/login.html";
      header("location:".$url);
    }else{
      //登录成功后进行加密，并存入redis
      lgfun($user,4);//登录类型为公众号登录  
      //获取用户基本信息，并更新用户表的微信头像
      $access_token = get_access_token($appid,$appsecret);
      $url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN';
      $url = str_replace('ACCESS_TOKEN', $access_token, $url);
      $url = str_replace('OPENID', $openid, $url);
      echo $url;
      $jsoninfo = getcurl($url);
      if(isset($jsoninfo['errcode'])){
        var_dump($jsoninfo);
      }else{
        $updata =array(
          'wechatnickname'=>$jsoninfo['nickname'],
          'wechatimg'=>$jsoninfo['headimgurl'],
          'wechatopenid'=>$openid
          ); 

        $uid = getuser()['uid'];  
        // $sql = "UPDATE cy_user SET wechatimg = '.$headimgurl.' WHERE uid = '.$uid.' AND wechatopenid ='.$openid.' ";
        // M()->execute($sql);
        Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->update($updata);
      }
      // 完成上述步骤后加载首页
      $url="http://pre.ysjianzhu.com/wap/index.php?mytime=".time();
      header("location:".$url);
    }    
  }
}

/*
 *  002.验证用户
 */     
public function cacheopenid(){

  $code = $_GET['code'];
  $appid = 'wx4ebb8c954a411d91';
  $appsecret = '7e7c47ccd966da56097952925f4a4ff1';
  $openid = session('openid');
  if($openid){
    
  }
  //下面是测试号的appid和appsecrect
  // $appid = 'wx855ea7a09cac1332';
  // $appsecret = '61898f7349e81bda57297d900bdb67ba';
  $openid= getopenid($code,$appid,$appsecret);
  $url='http://pre.ysjianzhu.com/api/wechat/Login/index';
  if($openid){
   session('openid',$openid);
   header('location:'.$url);
  }
}


/**
 * 首页 -- 解决跳转两次的问题
 *
 */
public function main(){
  $code = $_GET['code'];
  $appid = 'wx7f78ed44b12f996f';
  $appsecret = '7d9b489b921ac5276baf897507e04c60';
  $openid = session('openid');
  if(!$openid){
    $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appid}&secret={$appsecret}&code={$code}&grant_type=authorization_code";
    $jsoninfo = getcurl($url);
    $openid = $jsoninfo['openid'];
    session('openid',$openid);
  }
  $user = Db::connect("DB_Config_1")->name('user')->where(array('wechatopenid'=>$openid))->find(); 
  if($user == null){//如果用户不存在，则跳转到注册页面
   
// p($user);
// p($jsoninfo);
   header("location:"."http://pre.ysjianzhu.com/wap/login.html");
  }else{//登录成功后进行加密，并存入redis
    lgfun($user,4);//登录类型为公众号登录  
    //获取用户基本信息，并更新用户表的微信头像
    $access_token = get_access_token($appid,$appsecret);
    $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token={$access_token}&openid={$openid}&lang=zh_CN";
    $jsoninfo = getcurl($url);
    $updata =array(
      'wechatnickname'=>$jsoninfo['nickname'],
      'wechatimg'=>$jsoninfo['headimgurl'],
      'wechatopenid'=>$openid
      ); 
    // $uid = getuser()['uid'];  
    $uid = $user['uid'];
    Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->save($updata);
    // 完成上述步骤后加载首页
    $url="http://pre.ysjianzhu.com/wap/index.php?time=".time();
    header("location:".$url);
  }
}


 
/*
 *  008.新用户注册加绑定
 */
public function register(){
 // $_POST = json_decode(file_get_contents('php://input'),true);
  $redata = array('code'=>1,'msg'=>'','data'=>array());
  if(!session('phcode') || (session('phcode')!= input('msgcode'))||input('tel')!=session('tel')){
    $redata['code']=0;
    $redata['msg']='验证码不正确！';
    return json($redata);
  }

$data = Db::connect("DB_Config_1")->name('user')->where(array('tel'=>input('tel')))->find();
    if($data){
      $redata['code']=0;
      $redata['msg']='该手机已被注册，请重新输入或直接登录';
      return json($redata);
    }
    else{

       //为用户生成河狸ID(格式为：ys1000x)
  $_myPOST['tel'] = input('tel');
  $_myPOST['username'] = generateusername();
  $_myPOST['password'] = input('password','','md5'); 
  $_myPOST['add_from']='WECHAT'; 
  $_myPOST['add_time']=time(); 
  $_myPOST['usertype']= 3;
  if(session('openid')){
     $_myPOST['wechatopenid']=session('openid');
  }

 
  //判断是否是推荐过来的；
    if($_POST['from']!=''){
      $_myPOST['fromuid']=$_POST['from']; 
       dealfrom($_POST['from']);
    }
 
  //判断用户是否已经绑定
  $existuser = Db::connect("DB_Config_1")->name('user')->where(array('username'=>$data['username'],'password'=>
    $data['password'],'lockey'=>'0'))->find();
  if($existuser){
    $redata['code']=0;
    $redata['msg']='用户已经存在！';
    return json($redata);
  }else{
    Db::connect("DB_Config_1")->name('user')->insert($_myPOST);
    $redata['code']=1;
    $redata['msg']='注册成功，您的用户名是:'.$data['username'] ;
    return json($redata);
  }

}



}

/**
 *  009.老用户绑定
 */ 
public function logwithbind(){ 
//$_POST = json_decode(file_get_contents('php://input'),true);
$redata = array('code'=>'1','msg'=>'');
$username = input('username');
$pwd = input('password','','md5');
$user = Db::connect("DB_Config_1")->name('user')->where(array('username'=>$username))->find(); //用户名登录
if(!$user){ 
  $user = Db::connect("DB_Config_1")->name('user')->where(array('tel'=>$username))->find();//手机号登录
}
if (!$user || $user['password'] != $pwd){ 
  $redata['code']=0;
  $redata['msg']='用户名或者密码错误!';  
}else if(session('openid')){
  //获取openid与用户绑定并存入redis
  $user['wechatopenid']=session('openid');
  $re=Db::connect("DB_Config_1")->name('user')->where(['uid'=>$user['uid']])->update($user); 
  lgfun($user,4);

  $redata['code'] = 1;
  $redata['msg'] = '绑定成功';
}else{ 
  lgfun($user,7);
  $redata['code'] = 1;
  $redata['msg'] = '登陆成功';
}
return json($redata);
} 








//忘记密码
  public function resetpsd(){ 
    // $_POST = json_decode(file_get_contents('php://input'),true); 
    //1、定义返回数据格式；
    $redata = array('code'=>0,'msg'=>'','data'=>array());
    //2、对条件进行判断； 
    $phonecode = $_POST['msgcode']; 
    $user = Db::connect("DB_Config_1")->name('user')->where(array('tel'=>$_POST['tel']))->find();
    if(session('tel')!=$_POST['tel']){
       $redata['msg']='手机号不一致';
    }else if(!$user){
      $redata['msg']='该手机号不存在';
    }else if ($phonecode==''||$phonecode!=session('phcode')){
            $redata['msg']='手机验证码错误';
      }else{
        session('phcode','');

      $pwd = input('repsd','','md5');
      $data = array(
          'uid'=>$user['uid'],
          'password'=>$pwd,  
          'update_time'=>time() 
      );
      $uid = Db::connect("DB_Config_1")->name('user')->where(['uid'=>$user['uid']])->update($data);
      if($uid){
      $redata['code'] = 1;
        $redata['msg'] = '修改密码成功,马上去登陆！';
      }else{
        $redata['msg'] = '异常，请重设密码！';
      }
        
    }    
        return json($redata); 
    }






}
