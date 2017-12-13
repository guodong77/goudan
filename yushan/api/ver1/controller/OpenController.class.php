<?php 
namespace api\ver1\controller;

use think\Controller;
use think\Request;
use think\View;
use think\Session;
use think\Db;
use plug\myheader;
use plug\ossupload;
use think\cache\driver\Redis;
// 本类由系统自动生成 
class OpenController extends Controller {
 
 public function wechatsdk(){
        $jssdk = new  \Org\Util\Jssdk("wx7f78ed44b12f996f", "6a495b5da12c66e375954ace6389b595");
        $signPackage = $jssdk->GetSignPackage();
        $this->assign('signpackage', $signPackage);
       // var_dump($signPackage);
        return json($signPackage);
 
    }











//获取省份 
public function prov(){  
  $_POST = json_decode(file_get_contents('php://input'),true);
  $re = array('code'=>'1','msg'=>''); 
$table = 'province';
$arr = '';
$p = ys_findmore($table,$arr); 
$re['data'] = $p['datalist'];
    return json($re); 
}

 //获取城市
public function city(){  
  $_POST = json_decode(file_get_contents('php://input'),true);
  $re = array('code'=>'1','msg'=>''); 
	
	$table = 'city';
	$arr = array('pid'=>$_POST['pid']);
	$c = ys_findmore($table,$arr); 
	$re['data'] = $c['datalist']; 
	$re['post'] = $_POST;
	    return json($re); 
	}

//获取省份 
public function provwe(){  
   
  $re = array('code'=>'1','msg'=>''); 
$table = 'province';
$arr = '';
$p = ys_findmore($table,$arr); 
$re['data'] = $p['datalist'];
    return json($re); 
}

 //获取城市
public function citywe(){  
 
  $re = array('code'=>'1','msg'=>''); 
  
  $table = 'city';
  $arr = array('pid'=>$_POST['pid']);
  $c = ys_findmore($table,$arr); 
  $re['data'] = $c['datalist']; 
  $re['post'] = $_POST;
      return json($re); 
  }



 
  //获取区县
public function dist(){  
  $_POST = json_decode(file_get_contents('php://input'),true);
  $re = array('reply'=>'1','msg'=>''); 
	
	$table = 'district';
	$arr = 'ctid='.$_POST['ctid'];
	$re['data'] = ys_findmore($table,$arr); 
	    return json($re); 
	}



	//运营管理-用户列表
Public function operate_user_list(){
      $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'user'; //表名
      $orderstr = 'uid';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $data = userconnect($tablename,$nowpage,$listnum);
     // $data['datalist'] = setcodeid($data,9); //将返回数据的id进行加密
      $redata['data'] = $data;
      return json($redata); 
}
//运营管理-登陆列表
Public function operate_login_list(){
      $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'log'; //表名
      $orderstr = 'logintime';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
     // $data['datalist'] = setcodeid($data['datalist'],10); //将返回数据的id进行加密
      $redata['data'] = $data;
      return json($redata); 
}

//运营管理-公司列表 
Public function operate_com_list(){
      $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'company'; //表名
      $orderstr = 'comid';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
    //  $data['datalist'] = setcodeid($data['datalist'],11); //将返回数据的id进行加密
      $redata['data'] = $data;
      return json($redata); 
}

//运营管理-项目列表 program
Public function operate_pro_list(){
      $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'program'; //表名
      $orderstr = 'prid';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
     // $data['datalist'] = setcodeid($data['datalist'],1); //将返回数据的id进行加密
      $redata['data'] = $data;
      return json($redata); 
}


//省市管理-市列表  
Public function service_city_list(){
      $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'city'; //表名
      $orderstr = 'ctid';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
      //$data['datalist'] = setcodeid($data['datalist'],7); //将返回数据的id进行加密
      $redata['data'] = $data;
      return json($redata); 
}




function adfeed(){
  if(count($_POST)==0){
     $_POST = json_decode(file_get_contents('php://input'),true);
  }
$arr = $_POST;
if($arr['content']==''){ $rearr = array('code'=>0,'msg'=>'未填写内容');  return json($rearr);}; 
$arr['add_time'] = time(); 
$uid = getuser()['uid'];

if($uid){  $arr['uid'] = $uid;   } 
$ad = M('feed')->add($arr);
if($ad){
  $rearr = array('code'=>1,'msg'=>'提交成功');
}else{
$rearr = array('code'=>0,'msg'=>'提交超时');
}

 return json($rearr);
}




	
}
 