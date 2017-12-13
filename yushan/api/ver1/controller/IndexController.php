<?php
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2017 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Dean <zxxjjforever@163.com>
// +----------------------------------------------------------------------
namespace api\ver1\controller;

use think\Controller;
use think\Request;
use think\View;
use think\Session;
use think\Db;
use plug\myheader;
use plug\ossupload;
use think\cache\driver\Redis;

class IndexController extends CommonController
{

    public function index(){


    }


//获取基本信息
Public function userinfo(){
      // $_POST = input();p($_POST);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；           
      $data = getuserdata()['userdata'];
      $sex = '保密';
     // p($data);
      if($data['sex']==1){ $sex = '男';}
      if($data['sex']==2){ $sex = '女';}

      $a = array('','系统管理员','普通管理员','资料员','公司管理员');

      $imgurlx = $data['headimg']==''?'/main/images/user.png':$data['headimg'];
      $v =  $imgurlx ;

      $userdata = array(
        'name'=>$data['name'],
        'imgurl'=>$v,
        'sex'=>$sex,
        'usertype'=>$a[$data['usertype']],
        'tuijian'=>$data['uid']
        );
       
      $redata['data'] = $userdata;
      return json($redata); 
}


    public function menu(){
 $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
      $usertype = getuser()['usertype'];
      
      $redata['data'] = menu($usertype);
     return json($redata);
      

    }

//我的工程列表
public function getprolist(){
    $_POST = input();
    $uid = getuser()['uid'];

$redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；


    //获取工程列表
    $tablename = 'program';$orderstr = ''; 
    $arr = array('uid'=>$uid);
    $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
    $listnum = $_POST['listnum']?$_POST['listnum']:10;
    $field = 'prid,prname,uid';
    $prodata = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
    
    $dlist = $prodata['datalist'];
    $prolen = count($dlist); 
    for($i=0;$i<$prolen;$i++){
        $dlist[$i]['sinchl'] = getallsin($dlist[$i]['prid']); 
    }
     $prodata['datalist'] = $dlist;

     $prodata['datalist'] = setcodeid($prodata['datalist'],0);
     $redata['data'] = $prodata;

$redata['post'] = $_POST;



      return json($redata);
}


/*切换当前工程项目*/
/*public function changepro(){
    $_POST = input();
    $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式； 
    //对codeid 进行解密；
    $arr = explaincodeid($_POST['codeid']); 
   //将用户的所有项目设置当前 为 0 
   $prid = $arr['idv'];
   $table = $arr['tbn'];
   if($prid!=''&&$table=='program'){
    changenowprogram($prid);
  }else{
    $redata['reply'] = 0;
    $redata['msg'] = '参数错误';
  }; 


$redata['arr'] = $arr;
$redata['post'] = $_POST; 
return json($redata);
}*/


/*切换当前子单位工程*/
/*public function changesin(){
    $_POST = input();
    $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式； 
    //对codeid 进行解密；
    $arr = explaincodeid($_POST['codeid']); 
   //将用户的所有 子单位设置当前 为 0 
   $sid = $arr['idv'];
   $table = $arr['tbn'];
   if($sid!=''&&$table=='single'){
    changenowsingle($sid);
  }else{
    $redata['reply'] = 0;
    $redata['msg'] = '参数错误';
  }; 

$redata['arr'] = $arr;
$redata['post'] = $_POST; 
return json($redata);
}*/

//获取当前项目 原材送检列表
public function getmatterlist(){
    $_POST = input();
 


$redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
   
   //对codeid 进行解密；
    $arr = explaincodeid($_POST['codeid']); 
    $prid = $arr['idv'];

if($prid!=''){
      //获取原材送检
    $tablename = 'matter';$orderstr = 'morder asc'; 
    $arr = array('prid'=>$prid);
    $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
    $listnum = $_POST['listnum']?$_POST['listnum']:10;
    $field = 'mid,mname,morder,fid,buwei,stime,xinghao,jieguo,ycys,ypbh,changjia,intime,yczushu';
    $mdata = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
    $mdata['datalist'] = setcodeid($mdata['datalist'],3);
    $redata['data'] = $mdata;//$prid;
}else{
  $redata['msg'] = '工程参数错误';
}


$redata['post'] = $_POST;
return json($redata);
}



//获取当前项目 当前子单位 列表
public function getsjlist(){
    $_POST = input();
    

$redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
   //对codeid 进行解密；
    $arr = explaincodeid($_POST['codeid']); 
    $sid = $arr['idv'];

if($sid!=''){
    //获取原材送检
    $tablename = 'songjian';$orderstr = 'myorder '.$_POST['order']; 
    $arr = array('sid'=>$sid);
    $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
    $listnum = $_POST['listnum']?$_POST['listnum']:10;
    $field = 'tid,fid,sid,bybuwei,myorder,tyornot,tytime,tyzushu,tyys,tybh,tyjg,ksornot,kszushu,ksdengji,kstime,ksbh,ksjg,ztornot,ztzushu,zttime,ztys,ztbh,ztjg,dzornot,dzriqi,dzname,dztime,dzguige,dzys,dzjg,dzchangjia,dzzushu,qzornot,qzzushu,qzriqi,qztime,qzqiangdu,qzys,qzbh,qzjg,nqornot,nqzushu,nqriqi,nqtime,nqqiangdu,nqys,nqbh,nqjg,wqornot,wqzushu,wqriqi,wqtime,wqqiangdu,wqys,wqbh,wqjg,zpornot,zpzushu,zpriqi,zptime,zpqiangdu,zpbh,zpys,zpjg,byqiangdu,byyl,byriqi,bytime,byzushu,byys,bybh,byjg,qzname,wqname,nqname,zpname,xinpian';
    $mdata = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
    $mdata['datalist'] = setcodeid($mdata['datalist'],4);
    $redata['data'] = $mdata;

}else{
    $redata['msg'] = '子单位参数错误';
}
 

$redata['post'] = $_POST;
return json($redata);
}


//获取当前项目 当前子单位 列表
public function getsinlist(){
    $_POST = input();
    

$redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
   //对codeid 进行解密；
    $arr = explaincodeid($_POST['codeid']); 
    $prid = $arr['idv'];

if($prid!=''){
    //获取原材送检 
    $redata['data'] = getallsin($prid);

}else{
    $redata['msg'] = '子单位参数错误';
}
 

$redata['post'] = $_POST;
return json($redata);
}




        public function yuancai(){  
// 1、接收post、get 参数，对参数进行重组；生成arr；
// 对sql 进行重组；
// 2、查询数据库；
/*$data = Db::connect("DB_Config_1")->name('matter')->limit(0,300)->select();
// 3、对查询结果进行删除原始id，并设置openid，返回；
if($data){
            $newdata = setcodeid($data,1); 
          }else{

          }*/
 
//$rearr = returnarr_main($data,1);
 
//3、返回给前端  
 //return json($rearr);   
// 4、
//  
//1、查询数据库；

//2、拿到数据后，生成去除ID，生成openid；

//3、返回给前端；
//4、前段带openid 进行修改；删除操作；
 
      $data = array("name"=>"weiyuliang","sex"=>"11",'data'=>111111);
      return json($data);
      

    }


 


public function example(){  
                //1、定义返回数据格式；
                $redata = array('code'=>1,'msg'=>'','data'=>array());
                //2、对条件进行判断； 
                 if($_POST['name']==''){
                  $redata['status']=0;$redata['msg']='名字不能为空';
                 }
   
                 if($redata['status']==1){
                //1、接收post、get 数据，对参数进行重组；生成arr；
                //2、对sql 进行重组；
                //3、调用模型层————查询数据库；
                $tablename = 'matter'; //表名
                $orderstr = 'order by mid'; //排序；
                $arr = 'prid=9'; //查询条件
                $nowpage = 1; //当前页
                $listnum = 30; //显示条数；
                $field = 'mid,mname'; //查询字段
                $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
                //4、拿到数据后，生成去除ID，生成setcodeid；
                $redata['data'] = setcodeid($data,$num);    
                 } 
      //5、返回给前端；
      return json($redata); 
    }


public function getuserinfo(){  
      //1、定义返回数据格式；
      $redata = array('code'=>1,'msg'=>'','data'=>array());
      $uid = getuser()['uid'];
      $user = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->find();
      $logintype = getuser()['logintype'];
if($logintype==0){
   $redata['data'] = array(
        'realname'=>$user['realname'],
        'username'=>$user['username'],
        'imgurl'=>$user['imgurl'],
        'nickname'=>$user['nickname']
        ); 
}
if($logintype==1){
     $redata['data'] = array(
        'realname'=>$user['realname'],
        'username'=>$user['username'],
        'imgurl'=>$user['qqimgurl'],
        'nickname'=>$user['qqnickname']
        ); 
}
if($logintype==2){
     $redata['data'] = array(
        'realname'=>$user['realname'],
        'username'=>$user['username'],
        'imgurl'=>$user['weimgurl'],
        'nickname'=>$user['wenickname']
        ); 

}
     
      //5、返回给前端；
      return json($redata); 
    }



    //简单插入 
    public function com_ea(){
    $_POST = input();
$redata = array('code'=>1,'msg'=>'添加成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
if(isset($_POST['codeid']))$arr = explaincodeid($_POST['codeid']);
if(isset($_POST['prcodeid']))$parr = explaincodeid($_POST['prcodeid']);
if(isset($_POST['scodeid']))$sarr = explaincodeid($_POST['scodeid']);
if(isset($_POST['hcodeid']))$harr = explaincodeid($_POST['hcodeid']);


//对公共方法进行 特殊表验证  1、试块送检表要sid和prid；uid？
//2、原材表要prid；uid？
//3、横道图的任务表 要hid； 
//转码以后，如果存在prcodeid就删除
if(isset($_POST['prcodeid'])){unset($_POST['prcodeid']);}
if(isset($_POST['scodeid'])){unset($_POST['scodeid']);}
if(isset($_POST['hcodeid'])){unset($_POST['hcodeid']);}
 
//如果存在，就把真实的值还原赋值；
if(isset($parr)){
  $_POST['prid'] = $parr['idv'];
}

if(isset($sarr)){
  $_POST['sid'] = $sarr['idv'];
}

if(isset($harr)){
  $_POST['hid'] = $harr['idv'];
}


//验证：送检表
if($arr['tbn']=='songjian'){
  if($parr==false||$sarr==false){
    $redata['code'] = 0;
    $redata['msg'] = '送检部位添加失败';
    return json($redata);
  }
}


//验证：原材表
if($arr['tbn']=='matter'){
  if($parr==false){
    $redata['code'] = 0;
    $redata['msg'] = '原材添加失败';
    return json($redata);
  }
}

//验证：任务表
if($arr['tbn']=='renwu'){
  if($harr==false){
    $redata['code'] = 0;
    $redata['msg'] = '任务添加失败';
    return json($redata);
  }
}

//验证：表不能为空
if($arr['tbn']==null){ 
    $redata['code'] = 0;
    $redata['msg'] = '参数错误';
    return json($redata);
  
}

//验证：当为温度表时,生成温度表创建时间且判断有没有选城市
if($arr['tbn']=='weather'){ 
  $_POST['wdate'] = time();
  if(!$_POST['ctid']){
    $redata['code'] = 0;
    $redata['msg'] = '请选择城市';
    return json($redata);
  }
  // unset($_POST['city']);
}
$_POST['create_time'] = time();
$d = addrealdata($_POST,$arr);
// p($d['data']);
$id = Db::connect("DB_Config_1")->name($d['tbn'])->insertGetId($d['data']); 
if($id){
$codeid = $arr['num'].'*'.$id; 
$redata['data'] = array('codeid'=>jiami($codeid));
}else{
$redata['code'] = 0;
$redata['msg'] = '添加失败';
}


$redata['rdata'] = $d;
$redata['arr'] = $arr;
$redata['post'] = $_POST;
return json($redata);


    }



     //简单删除
    public function com_ed(){
    $_POST = input();

$redata = array('code'=>1,'msg'=>'删除成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$len = count($_POST['codeid']);
if($len>0){
  $tbn = '';
  $id = '';
  $idvstr = '';
  for ($i=0; $i < $len; $i++) { 
      $arr = explaincodeid($_POST['codeid'][$i]); 
      $tbn = $arr['tbn'];
      $id =  $arr['id'];
      if($i<$len-1){
        $idvstr .= $arr['idv'] . ',';
      }else{
        $idvstr .= $arr['idv'];
      }
      

  }

 
$condition = $id.' in ('.$idvstr.')'; 
$redata = comdel($tbn,$condition); 
//$sql = 'update ys_'.$tbn.' set isdel= where id=1; '


}else{
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 
}
 
$redata['arr'] = $condition;//$arr
$redata['post'] = $_POST;
return json($redata);
}


    //简单修改 
public function em(){
    $_POST = input();

$redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid($_POST['codeid']); 

if(!$arr){
  $redata['reply'] = 0;
  $redata['msg'] = '参数错误'; 

}else{
//还原成真正的数据,包含过滤敏感字段；
$d = realdata($_POST,$arr); 

//存入数据库
$ad = Db::connect("DB_Config_1")->name($d['tbn'])->update($d['data']); 
$ad?$redata['reply'] = 1:$redata['reply'] = 0;
}

$redata['arr'] = $d;//$arr
$redata['post'] = $_POST;
return json($redata);
} 

    /*//简单查询，不分页；
    public function es(){}
    //简单查询，带分页；
    public function es_page(){}*/

//简单修改 公共方法
public function com_em(){
    $_POST = input();

$redata = array('code'=>1,'msg'=>'保存成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid($_POST['codeid']); 

if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 

}else{
//还原成真正的数据,包含过滤敏感字段；
$d = realdata($_POST,$arr); 
// p($d);
//存入数据库
$ad = Db::connect("DB_Config_1")->name($d['tbn'])->where([$arr['id']=>$arr['idv']])->update($d['data']); 

$redata['code']=$ad?1:0;
$redata['msg']=$ad?'保存成功':'保存失败';
}

$redata['arr'] = $d;
$redata['post'] = $_POST;
return json($redata);
}


public function es(){
 $_POST = input();
$redata = array('code'=>1,'msg'=>'成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid($_POST['codeid']); 
if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 
}else{

$filed = 'jlid,temjson,addtime,jlname';
$data = Db::connect("DB_Config_1")->name($arr['tbn'])->where(array($arr['id']=>$arr['idv']))->field($filed)->find();
      
   if($data){
        $redata['jlname'] = $data['jlname'];
        $redata['data'] = json_decode($data['temjson']);
      }else{
        $redata['data'] = array();
      } 
}
 

return json($redata);
}











//工程列表
Public function program_pro_listbeifen(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
      $uid = getuser()['uid'];//去登陆的cookie里面拿到他的uid
      if ($uid!='') {
        $tablename = 'program'; //表名
        $filed = array('prid,prname,uid,gcdizhi');//只需要返回的字段
        $orderstr = 'prid desc';
        $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
        $listnum = $_POST['listnum']?$_POST['listnum']:10;
        $arr = array('uid'=>$uid,'isdel'=>0); //查询条件
        $field = 'prid,prname,uid,cityid';
        $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
        $dlist = $data['datalist'];
        $prolen = count($dlist); 
        for($i=0;$i<$prolen;$i++){
            $dlist[$i]['sinchl'] = getallsin($dlist[$i]['prid']); //给每个项目拼上他的子单位
        }
         $data['datalist'] = $dlist;
         $data['datalist'] = setcodeid($data['datalist'],0);
         $redata['data'] = $data;
      }else{
        $redata['code'] = '0';
        $redata['msg'] = '失败';
      }
      return json($redata);
}



public function  program_pro_list(){
  $_POST = input();
  $uid = getuser()['uid'];

  $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
    // 获取工程列表

    $field1 = 'city,prid,prname,uid,jiegou,cityid,cityv,kaigong,jungong,isdel';
    $arr1 = array('uid'=>$uid,'isdel'=>'0');
    $orderstr = 'prid desc'; 
    $sql = 'select weixin,message,city,prid,prname,proimg,uid,jiegou,cityid,cityv,kaigong,jungong,cy_program.isdel from cy_program,cy_city where cy_city.ctid=cy_program.cityid and cy_program.isdel=0 and uid='.$uid.' order by prid desc';
    $prodata = Db::connect("DB_Config_1")->name('program')->query($sql);
    // $prodata = Db::connect("DB_Config_1")->name('program')->where($arr1)->field($field1)->order($orderstr)->select(); 
    
if($prodata){



    $str = '(';
    foreach ($prodata as $key => $value) {
      $str = $str.$value['prid'].',';
    }
    $str = substr($str , 0 , strlen($str)-1);
    $str = $str.')';
  
    $arr2 = 'isdel = 0 and prid in '.$str;
    $filed2 = 'sid,sname,cengshu,jiegou,jcriqi,jctime,ztjgriqi,ztjgtime,zxriqi,zxtime,wmriqi,wmtime,sqzriqi,sqztime,swqriqi,swqtime,snqriqi,snqtime,isdel';
   
// $redata['str'] = $arr2;->field($filed2)
//  return json($redata);


    $sindata = Db::connect("DB_Config_1")->name('single')->where($arr2)->select();
    $sindata = setcodeid($sindata,2);


    foreach ($prodata as $key1 => &$value1) {
      $value1['sinchl']['datalist'] =array();
      foreach ($sindata as $key2 => $value2){
        $value2['rd'] = rand(1,19);
        $value2['ngclass'] = '';
        $value2['type'] = 'single';
        $value2['check'] = 0;
        if($value1['prid'] == $value2['prid']){
          $value1['sinchl']['datalist'][] = $value2;
        }
      }
    } 
} 
    $a['datalist'] = setcodeid($prodata,0);

    $redata['data'] = $a;
    $redata['post'] = $_POST;
    return json($redata);

 }






//添加工程
Public function program_pro_add(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
      $uid = getuser()['uid'];//去登陆的cookie里面拿到他的uid     
      
//做出限制不超过工程上线 
if(chaoguomaxpro($uid)){
    $redata['code'] = 0;
    $redata['msg'] = '您的工程数量已超过工程上限，创建失败！';
    return json($redata);
}


      $tablename = 'program'; //表名
      $_POST['uid']=$uid;
      $_POST['add_time']=time();
      $_POST['kaigong'] = strtotime($_POST['kaigong']);
      $_POST['jungong'] = strtotime($_POST['jungong']);
     
$newarr = array(
    'uid'=>$uid,
    'add_time'=>time(),
    'kaigong'=>strtotime($_POST['kaigong']),
    'jungong'=>strtotime($_POST['jungong']),
    'jiegou'=>$_POST['jiegou'],
    'pid'=>$_POST['pid'],
    'cityid'=>$_POST['cityid'],
    'prname'=>$_POST['prname'],
    'proimg'=>$_POST['proimg'],
  );

      $id=Db::connect("DB_Config_1")->name('program')->insertGetId($newarr);
      //$redata['data'] = $id;
     
      if($id){
       //添加原材
        $Mdata = Db::connect("DB_Config_1")->name('mtemp')->where(array('isdel'=>0))->field('mname,fid,yctype,morder,buwei,guige,xinghao,qiangdu,number')->select();
      foreach ($Mdata as &$value) {
        $value['prid']= $id;
        $value['yczushu']= 1;
        $value['create_time']=time();
      }

      $red = Db::connect("DB_Config_1")->name('matter')->insertAll($Mdata);

      //从资料类型表中，拿出非分部，插入prosintype  单位-子单位目录存储 表；
      $struct = Db::connect("DB_Config_1")->name('tongbiaotype')->where(array('isfenbu'=>3))->select();

      foreach ($struct as $key => &$value) {
        $value['prid'] = $id;
      }
      $redtwo = Db::connect("DB_Config_1")->name('prosintype')->insertAll($struct);





      }
      $redata['data'] = $Mdata;
      $redata['v'] = $red;


      return json($redata); 
}
//工程列表--删除工程项目 
Public function program_pro_del(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'删除成功','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);  
      if ($arr) {
        $has = Db::connect("DB_Config_1")->name('single')->where(array('prid'=>$arr['idv'],'isdel'=>0))->find();
        if($has){
          $redata['code'] = 0;
          $redata['msg'] = '请先删除子单位工程';
        }else{
            Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv']))->update(array('isdel'=>1));
        } 
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
}

//获取单个工程基本信息 
Public function program_pro_info(){
      $_POST = input();
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);  
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->select(); 
        
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0);
        }else{ 
          $redata['msg'] = '参数错误';
        }        
      }else{ 
        $redata['msg'] = '参数错误';
      }
      return json($redata);
}


//工程列表--编辑工程
// Public function program_pro_survey(){
//       $_POST = input();
//       $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；          
//       $arr = explaincodeid($_POST['codeid']); 
//       $tablename = 'program';  
//       $id = 'prid'; 
//       $idv = $arr['idv'];      
//       if ($arr!='') {
//         $data = delectprogram($tablename,$id,$idv,$arr);
//         p($data);
//         $redata['msg'] = $data==1?'删除成功':'请先把子单位删除';
//       }else{
//         $redata['code'] = '0';
//         $redata['msg'] = '失败';
//       }
//       return json($redata);
// }


//添加子单位
Public function program_pro_sinadd(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'添加成功','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);  
       if(!$arr){
      $redata['code'] = 0;
      $redata['msg'] = '参数错误'; 
    }else{
    //还原成真正的数据,包含过滤敏感字段；
    $d = realdata($_POST,$arr); 
    //数据转格式   

    $jichu = trim($d['data']['jichu']);
    $jcarr = explode("\n", $jichu);

    $zhuti = trim($d['data']['zhuti']);
    $ztarr = explode("\n", $zhuti);
    $prid = $d['data']['prid'];
    //验证子单位名称不能为空
    if($_POST['sname'] == null || $_POST['sname'] == ""){
      $redata['code'] = 0;
      $redata['msg'] = '子单位名称不能为空！';
      return json($redata);
    }
    //验证该项目是否已有此子单位名字
    $name = array('sname'=>$_POST['sname'],'prid'=>$prid,'isdel'=>0); //查询条件
    $vd = Db::connect("DB_Config_1")->name('single')->where($name)->find();
    if ($vd) {
       $redata['code'] = 0;
       $redata['msg'] = '该子单位已存在'; 
    }else{    
    //存入数据库
    unset($d['data']['jichu']);
    unset($d['data']['zhuti']);
    $sid = Db::connect("DB_Config_1")->name('single')->insertGetId($d['data']); 
    $redata['code']=$sid?1:0;
    $createtime = time();
    //生成送检计划--基础
$i = 1;
foreach ($jcarr as $k=>$value){ 
   $dataList[] = array('sid'=>$sid,'prid'=>$prid,'fid'=>3,'bybuwei'=>$value,'myorder'=>$i,'byzushu'=>1);
   $i++;
}

foreach ($ztarr as $k=>$value){ 
   $dataList[] = array('sid'=>$sid,'prid'=>$prid,'fid'=>4,'bybuwei'=>$value,'myorder'=>$i,'byzushu'=>1); 
   $i++;
}

    // for ($i=0; $i < count($jcarr); $i++) { 
    //    $dataList[] = array('sid'=>$sid,'prid'=>$prid,'fid'=>3,'bybuwei'=>$jcarr[$i],'myorder'=>$i); 
    // }
    //生成送检计划--主体
  //   $j = count($ztarr) + $i;
    // for (; $i < $j; $i++) { 
    //    $dataList[] = array('sid'=>$sid,'prid'=>$prid,'fid'=>4,'bybuwei'=>$ztarr[$i],'myorder'=>$i); 
    // }

    $redata['data']['codeid'] = jiami('2*'.$sid);
    $redata['data']['rd'] = rand(1,19);
    $redata['data']['dataList'] = $dataList;
    $redata['data']['d'] = $d;

    $red = Db::connect("DB_Config_1")->name('songjian')->insertAll($dataList); 

  //从资料类型表中，拿出 分部 子分部，插入prosintype  单位-子单位目录存储 表；
      $struct = Db::connect("DB_Config_1")->name('tongbiaotype')->where('isfenbu=1 or isfenbu=2')->select();

      foreach ($struct as $key => &$value) {
        $value['sid'] = $sid;
        $value['prid'] = $prid;
      }
      $redtwo = Db::connect("DB_Config_1")->name('prosintype')->insertAll($struct);





      }
    } 

      return json($redata);
}


//编辑子单位
Public function program_pro_sinedit(){
      $_POST = input();
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);  

      if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 

}else{
//还原成真正的数据,包含过滤敏感字段；
$d = realdata($_POST,$arr); 
//数据转格式 
//   {
  // "codeid":"表ID加密串",
  // "cengshu":"14",
  // "jcriqi":"基础开工日期",
  // "jctime":"基础完工日期",
  // "ztjgriqi":"主体开工日期",
  // "ztjgtime":"主体完工日期",
  // "zxriqi":"装修开工日期",
  // "zxtime":"装修完工日期",
  // "wmriqi":"屋面开工日期",
  // "wmtime":"屋面完工日期"
  // }

$d['data']['jcriqi'] = strtotime($d['data']['jcriqi']);
$d['data']['jctime'] = strtotime($d['data']['jctime']);
$d['data']['ztjgriqi'] = strtotime($d['data']['ztjgriqi']);
$d['data']['ztjgtime'] = strtotime($d['data']['ztjgtime']);
$d['data']['zxriqi'] = strtotime($d['data']['zxriqi']);
$d['data']['zxtime'] = strtotime($d['data']['zxtime']);
$d['data']['wmriqi'] = strtotime($d['data']['wmriqi']); 

//存入数据库
$ad = Db::connect("DB_Config_1")->name($d['tbn'])->update($d['data']); 
$redata['code']=$ad?1:0;
}
      return json($redata);
}

//删除子单位
Public function program_pro_sindel(){
      $_POST = input();
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);

      if ($arr) {
        //删除子单位
        $condition = array('sid'=>$arr['idv']);
        $tbn = 'single';
        $data = comdel($tbn,$condition);

        //删除送检列表
        $condition2 = array('sid'=>$arr['idv']); 
        $tbn2 = 'songjian';
        $data2 = comdel($tbn2,$condition2);

        $redata = $data;
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
}

//送检计划-原材列表 
Public function program_plan_matterlist(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
      if ($prid!='') {
        $tablename = 'matter'; //表名
        $orderstr = 'morder asc';
        $arr = array('prid'=>$prid,'isdel'=>0); //查询条件
        $data = nopage_select_byarr($tablename,$orderstr,$arr);
        foreach ($data['datalist'] as $key => &$value) {
          if(isset($value['fid'])){
            if($value['fid']){
              $value['fid']=explode(',',$value['fid']);
            }else{
              $value['fid']=array();
            }
          }
        }
        $data['datalist'] = setcodeid($data['datalist'],3);//将返回数据的id进行加密
        $data['codeid'] = jiami('3*1');
        $redata['data'] = $data;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}
//送检计划-原材增加-走公共方法com_ea
//送检计划-原材删除-走公共方法com_ed
//送检计划-原材编辑-走公共方法com_em

//送检计划-部位送检列表 
Public function program_plan_betonlist(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $sid = $arr['idv'];  //真实id
      if ($sid!='') {
        $tablename = 'songjian'; //表名
        $orderstr = 'byriqi asc';
        $arr = array('sid'=>$sid,'isdel'=>0); //查询条件
        $data = nopage_select_byarr($tablename,$orderstr,$arr);
      
         foreach ($data['datalist'] as $key => &$value) {
          if(isset($value['fid'])){
            if($value['fid']){
              $value['fid']=explode(',',$value['fid']);
            }else{
              $value['fid']=array();
            }
          }
        }     

if(isset($_POST['type'])){
// 如果是同养，则计算温度
if($_POST['type']=='tyornot'){
$today = time(); 
   //对数据进行同养设置
        $tem = findtongyang($data['datalist']);
  $tytemlist = $tem['datalist'];
  // 遍历，计算温度
  foreach ($data['datalist'] as $key => &$value) {
      if($value['tyornot']==1&&$value['byriqi']>0){

        //已送，计算温度                
        $value['ystem'] = 0;

           //未送，计算温度 
        $value['wstem'] = 0;
          // 遍历
          foreach($tytemlist as $k => $v){
            // 已送
            if($v['wdate']>$value['byriqi']&&$v['wdate']<=$value['tytime']){
              $value['ystem'] += $v['vtem'];
            }
            // 未送
            if($v['wdate']>$value['byriqi']&&$v['wdate']<=$today){
              $value['wstem'] += $v['vtem'];
            }

          } 

      }
    }
        $data['tytemlist'] = $tem['datalist'];
}
}



        $data['datalist'] = setcodeid($data['datalist'],4); //将返回数据的id进行加密
        $data['codeid'] = jiami('4*1');
        $redata['data'] = $data;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}
//送检计划-部位增加-走公共方法com_ea
//送检计划-部位删除-走公共方法com_ed
//送检计划-部位编辑-走公共方法com_em


public function wendu(){ 
   $_POST = input();
$redata = array('code'=>1,'msg'=>'成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid($_POST['codeid']); 
if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 
}else{

$filed = getsjtype($_POST['type']);

$data = Db::connect("DB_Config_1")->name($arr['tbn'])->where(array($arr['id']=>$arr['idv']))->field($filed)->select();
if($data){ 
$redata['data'] = makewendulist($data);
}else{
  $redata['data'] = array();
}
 

}
 $redata['arr'] = $arr;
// $redata['post'] = $_POST; 

return json($redata);
}



















//送检汇总-送检列表
Public function program_gether(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id


    $ntime = strtotime(Date('Y-m-d',time()));
    $qtime = $ntime+7*24*60*60;   
    $btime = $_POST["btime"]==''?$ntime:strtotime($_POST["btime"]);
    $etime = $_POST["etime"]==''?$qtime:strtotime($_POST["etime"]); 

      if ($arr) { 
        $redata['data'] = songjianhuizong($prid,$btime,$etime);
      }
      else{
        $redata['code'] = 0;
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}

//送检记录-送检列表
Public function program_gether_jilu(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id


    // $ntime = strtotime(Date('Y-m-d',time()));
    // $qtime = $ntime+7*24*60*60;   
    // $btime = $_POST["btime"]==''?$ntime:strtotime($_POST["btime"]);
    // $etime = $_POST["etime"]==''?$qtime:strtotime($_POST["etime"]); 

      if ($arr) {
      $tablename = 'jilu'; //表名
      $orderstr = 'addtime desc';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = array('prid'=>$prid,'isdel'=>0); 
      $field = 'jlid,jlname,addtime,prid';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
      $data['datalist'] = setcodeid($data['datalist'],17); //将返回数据的id进行加密


        $redata['data'] = $data;
      }
      else{
        $redata['code'] = 0;
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}

//送检记录-保存送检记录
Public function program_gether_save(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
      $uid = getuser()['uid'];

    $ntime = strtotime(Date('Y-m-d',time()));
    $qtime = $ntime+7*24*60*60;   
    $btime = $_POST["btime"]==''?$ntime:strtotime($_POST["btime"]);
    $etime = $_POST["etime"]==''?$qtime:strtotime($_POST["etime"]); 

if($_POST["btime"]==''){
  $redata['code'] = 0;
  $redata['msg'] = '起始日期不能为空';
  return json($redata);
}
if($_POST["etime"]==''){
  $redata['code'] = 0;
  $redata['msg'] = '结束日期不能为空';
  return json($redata);
}

      if ($arr) { 
        $sad =json_encode(songjianhuizong($prid,$btime,$etime));



        $savedata = array(
            'uid'=>$uid,
            'prid'=>$prid,
            'temjson'=>$sad,
            'addtime'=>time(),
            'jlname'=>$_POST["btime"].'至'.$_POST["etime"].'送检记录'
          );

      $re = Db::connect("DB_Config_1")->name('jilu')->insertGetId($savedata);
if($re){
  $redata['msg'] ='保存成功';
}


      }
      else{
        $redata['code'] = 0;
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}




//进度管理-子单位列表 
Public function program_sinlist(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
      if ($prid!='') {
        $tablename = 'single'; //表名
        $orderstr = '';
        $arr = array('prid'=>$prid,'isdel'=>0); //查询条件
        $filed = 'sid,sname,cengshu,jiegou,jcriqi,jctime,ztjgriqi,ztjgtime,zxriqi,zxtime,sqzriqi,sqztime,swqriqi,swqtime,snqriqi,snqtime,wmriqi,wmtime,sinimg';
        $data = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
        $data['datalist'] = setcodeid($data['datalist'],2); //将返回数据的id进行加密
        $redata['data'] = $data;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}

//进度管理-节点进度情况列表 
Public function program_work_nodelist(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
      if ($prid!='') {
        $tablename = 'songjian'; //表名
        $orderstr = '';
        $arr = array('prid'=>$prid); //查询条件
        $data = nopage_select_byarr($tablename,$orderstr,$arr);
        $data['datalist'] = setcodeid($data['datalist'],4); //将返回数据的id进行加密
        $redata['data'] = $data;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}

//进度管理-子单位进度图详情
 Public function program_work_sinimage(){ 
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $sid = $arr['idv'];  //真实id
      if ($arr) {
        $tablename = 'songjian'; //表名
        $orderstr = 'myorder desc';
        $arr = array('sid'=>$sid,'isdel'=>0); //查询条件
        $filed = 'isdel,fid,bybuwei,byqiangdu,byriqi,bytime,byys,cmornot,cmtime,cmys,dzriqi,dztime,dzys,dzname,ksornot,kstime,ksys,nqornot,nqriqi,nqtime,nqys,wqornot,wqriqi,wqtime,wqys,qzornot,qzriqi,qztime,qzys,zpornot,zpriqi,zptime,zpys,tyornot,tytime,tyys,ztornot,zttime,ztys,byzushu,tyzushu,kszushu,ztzushu,cmzushu,dzornot,dzzushu,qzzushu,wqzushu,nqzushu,zpzushu';
        $data = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
        $ret = sinimage($data['datalist']);
        $redata['quanbu'] = qbcount($ret);
        $redata['jichu'] = jichucount($ret);
        $redata['zhuti'] = zhuticount($ret);
        $redata['data'] = $ret;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}

//进度管理-子单位统计信息详情
Public function program_work_matcount(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
    if ($arr){ 
      $redata['data'] = procount($prid); 
    }else{
      $redata['code'] = 0;
      $redata['msg'] = '参数有误';
    }
    return json($redata);
}


//横道图列表
Public function program_gantt_list(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      // p($arr);
      $prid = $arr['idv'];  //真实id
      if ($prid) {
        $tablename = 'hengdaotu'; //表名
        $orderstr = '';
        $filed = "hid,beizhu,btime,comtitle,creat_time,etime,ftitle,htitle"; 
        $arr = array('prid'=>$prid); //查询条件
        $data = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
        $data['datalist'] = setcodeid($data['datalist'],5); //将返回数据的id进行加密
        
        $redata['data'] = $data;
      }
      else{
        $redata['code'] = 0 ;
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}

//横道图添加
Public function program_gantt_add(){
      $_POST = input();
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);  
      if(!$arr){
        $redata['code'] = 0;
        $redata['msg'] = '参数错误'; 
      }else{
      //还原成真正的数据,包含过滤敏感字段；
      $d = realdata($_POST,$arr); 
      //数据转格式 
      $d['data']['btime'] = strtotime($d['data']['btime']);
      $d['data']['etime'] = strtotime($d['data']['etime']);
      $d['data']['hadd_time'] =  time(); 
      $d['data']['creat_time'] =time();
      $d['data']['uid'] = getuser()['uid'];
      //存入数据库
      $hid = Db::connect("DB_Config_1")->name('hengdaotu')->insertGetId($d['data']); 
      $redata['code']=$hid?1:0;
      if($hid){
        $redata['msg'] = '横道图添加成功';
        $codeid = '5*'.$hid; 
      $redata['data'] = array('codeid'=>jiami($codeid)); 
      }else{
        $redata['msg'] = '横道图添加失败'; 
      }
            
      } 
      return json($redata);
}

//编辑横道图保存
Public function program_gantt_edit(){
      $_POST = input();
      $redata = array('code'=>0,'msg'=>'保存失败','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);  

      if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 

}else{
//还原成真正的数据,包含过滤敏感字段；
$d = realdata($_POST,$arr); 
//数据转格式 
$d['data']['btime'] = strtotime($d['data']['btime']);
$d['data']['etime'] = strtotime($d['data']['etime']);
$d['data']['creat_time'] = strtotime($d['data']['creat_time']); 
 
//存入数据库
$ad = Db::connect("DB_Config_1")->name($d['tbn'])->update($d['data']); 
$redata['code']=$ad?1:0;
$redata['msg']=$ad?'保存成功':'保存失败';
}

$redata['data'] = $d;
  return json($redata);
}


//删除横道图
Public function program_gantt_del(){
      $_POST = input();
      $redata = array('code'=>0,'msg'=>'参数错误','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']); 
      if ($arr) {
        //删除横道图
        $condition = array('hid'=>$arr['idv']);
        $tbn = 'hengdaotu';
        $data = comdel($tbn,$condition);

        // //删除任务列表
        $condition2 = array('rid'=>$arr['idv']); 
        $tbn2 = 'renwu';
        $data2 = comdel($tbn2,$condition2);


        $redata = $data; 
      }
$redata['POST'] = $arr;
      return json($redata);
}


//横道图-作业列表
Public function program_gantt_worklist(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $hid = $arr['idv'];  //真实id
      if ($hid!='') {
        $tablename = 'renwu'; //表名
        $orderstr = '';
        $arr = array('hid'=>$hid,'isdel'=>0); //查询条件
        $hdata = hdtconnect($tablename,$hid);
        $data = nopage_select_byarr($tablename,$orderstr,$arr);
        $data['datalist'] = setcodeid($data['datalist'],6); //将返回数据的id进行加密
        $data['codeid'] = jiami('6*1');
        $data['hdata'] = setcodeid($hdata,5);
        $redata['data'] = $data;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata); 
}
// //横道图-作业增加-走公共方法com_ea

//横道图-作业删除-走公共方法com_ed
//横道图-作业编辑-走公共方法com_em


//土建资料模块-资料目录
Public function program_struct_mulu111(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
      if ($prid!='') {
        $tablename = 'program'; //表名 
        $arr = array('prid'=>$prid,'isdel'=>0); //查询条件        
        $prodata = findone($tablename,$arr);      

        //查询所有的统表
        $tblist = Db::connect("DB_Config_1")->name('tongbiao')->where(array('isdel'=>0))->select(); 

        //获取 属于工程的子；
        $sql = 'select * from cy_prosintype,cy_tongbiaotype where cy_prosintype.tpid = cy_tongbiaotype.tpid and isfenbu=3 order by cy_prosintype.torder asc';
        $protype = Db::connect("DB_Config_1")->name('prosintype')->query($sql); 
        
        $prot = array();
        if($protype){
          foreach ($protype as $key => $value) { 
            $prot[$key]['name'] = $value['tpname'];
            $prot[$key]['chl'] =array();
            $tpid = $value['tpid'];

            for($i=0;$i<count($tblist);$i++){
                if($tpid==$tblist[$i]['tpid']){
                  $p =array(
                    'name'=>$tblist[$i]['tbname'],
                    'chl'=>array()
                    ); 
                  array_push($prot[$key]['chl'],$p); 
                }
            } 
          }
        }
         //获取所有的子单位
        $sindata = Db::connect("DB_Config_1")->name('single')->where($arr)->select(); 
        for($j=0;$j<count($sindata);$j++){
          $v = array(
            'name'=>$sindata[$j]['sname'],
                    'chl'=>array()
            );
            array_push($prot,$v);
        }




        //查询对应的统表


        //组建目录
        $arrmulu[0] = array(
          'name'=> $prodata['prname'],
          'chl' => $prot
          );







        $redata['data'] = $arrmulu;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata); 




//1、获取工程



//2、获取工程资料类型


//3、获取工程的   所有子单位


//4、获取工程的所有 子单位的送检部位


//5、获取  工程所在省份  所有的资料表























}




//土建资料模块-资料目录
Public function program_struct_mulu(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
      if ($prid!='') {
        $tablename = 'program'; //表名 
        $arr = array('prid'=>$prid,'isdel'=>0); //查询条件        


//一、获取相应的列表   
      //1、获取工程
      $prodata = findone($tablename,$arr);
      //2、获取工程资料类型  联表prosintype+tongbiaotype
      $sql = 'select cy_prosintype.*,cy_tongbiaotype.isfenbu,cy_tongbiaotype.code,cy_tongbiaotype.tpname,cy_tongbiaotype.parentid,cy_tongbiaotype.ftype from cy_prosintype,cy_tongbiaotype where cy_prosintype.tpid = cy_tongbiaotype.tpid and cy_prosintype.isdel=0 and prid='.$prid.' order by sid,cy_prosintype.torder asc';
        $typedata = Db::connect("DB_Config_1")->name('prosintype')->query($sql);    


      //3、获取工程的   所有子单位
      $sindata = Db::connect("DB_Config_1")->name('single')->where($arr)->select(); 

      //4、获取工程的所有 子单位的送检部位
      $buweidata = Db::connect("DB_Config_1")->name('songjian')->where($arr)->select();
     

      //5、获取  工程所在省份  所有的资料表
      $ziliaodata = Db::connect("DB_Config_1")->name('tongbiao')->where(array('isdel'=>0,'isshow'=>1))->select();


//二、进行数据组合
      // 1、先组合子单位的目录
      //1)配置工程的前期，管理，竣工；
      $prov = array();
      foreach ($typedata as $k => $value){
        if($value['isfenbu']==3){
          $value['name'] = $value['tpname'];
          $value['chl'] = array(); 
          $value['o'] = ''; 
            //配置对应的资料表格
            foreach ($ziliaodata as $ke => $val) {
              if($val['tpid']==$value['tpid']){
                $val['name'] = $val['tbname'];
                $val['c'] = 1;
                
                $a =explode(",",$value['temjson']);
                $t =0;
                for ($v=0; $v < count($a); $v++) { 
                  if($a[$v]==$val['tbid']){
                    $t =1;
                  }
                }
                //重设字段;
                $newval = array(
                  'name'=> $val['name'], 
                  'c'=>$t,
                  'code' =>$val['code'],
                  'id'=> $val['tbid']  
                  );

                array_push($value['chl'],$newval);
              }              
            }
            //重设字段
            $newvalue = array(
              'name'=> $value['name'],
              'chl'=> $value['chl'],
              'o'=> $value['o'], 
              'id'=> $value['fbid'],
              't'=> 'type' 
              );


           array_push($prov,$newvalue);
        }
      }


      
      $sinv = array();
      // 2、配置所有子单位
      foreach ($sindata as $key => $sinvalue) {
        $sinvalue['name'] = $sinvalue['sname'];
        

       
        $sinvalue['chl'] = array();
         $sinvalue['o'] = '';
         $sinvalue['c'] = 1;
          //配置所有分部
        foreach ($typedata as $k => $fbval) {
         if($fbval['isfenbu']==1&& $sinvalue['sid']==$fbval['sid']){
          $fbval['name']=$fbval['tpname'];

             
              $fbval['o'] = '';
              $fbval['c'] = 1;
              $fbval['chl'] = array();
               //配置所有的子分部
              foreach ($typedata as $ke => $zfbva) {
                  if($zfbva['isfenbu']==2&&$fbval['tpid']==$zfbva['parentid']&&$sinvalue['sid']==$zfbva['sid']){

                    $zfbva['name'] = $zfbva['tpname']; 
                    $zfbva['chl'] = array();
                    $zfbva['o'] = '';
                    $zfbva['c'] = 1;
                    //配置部位
                     foreach ($buweidata as $bwkey => $bwvalue) {                     
                            if($bwvalue['sid']==$value['sid']&&$bwvalue['fid']==$fbval['ftype']){
                              $bwvalue['name'] = $bwvalue['bybuwei'];

                              $key = $zfbva['code'];


                              
                              $bwvalue['chl'] = array();
                              $bwvalue['o'] = '';
                              $bwvalue['c'] = 1;
                              //配置部位所有需要做的表格
                              foreach ($ziliaodata as $zlkey => $zlvalue) {
                                if($zlvalue['tpid']==$zfbva['tpid']){
                                  $zlvalue['name'] = $zlvalue['tbname'];


                                          $a =explode(",",$bwvalue[$key]);
                                $t =0;
                                for ($v=0; $v < count($a); $v++) { 
                                  if($a[$v]==$zlvalue['tbid']){
                                    $t =1;
                                  }
                                }

                                  //重设字段
                                  $newzlvalue = array(
                                    'name'=> $zlvalue['name'], 
                                    'c'=>$t,
                                    'id'=> $zlvalue['tbid'],
                                    'code'=> $zlvalue['code'],
                                    'bwid'=> $bwvalue['tid']
                                    ); 
                                  array_push($bwvalue['chl'],$newzlvalue); 
                                }
                              }

                                $a =explode(",",$zfbva['temjson']);
                        $t =0;
                        for ($v=0; $v < count($a); $v++) { 
                          if($a[$v]==$bwvalue['tid']){
                            $t =1;
                          }
                        }

                              //重设字段
                                  $newbwvalue = array(
                                    'name'=> $bwvalue['name'], 
                                    'chl'=>$bwvalue['chl'],
                                    'c'=>$t,
                                    'id'=> $bwvalue['tid'],
                                    'o'=>'',
                                    't'=> 'song',
                                    'zf'=> $zfbva['code']                                      
                                    ); 
                              array_push($zfbva['chl'],$newbwvalue); 
                             } 
                     }

                        $a =explode(",",$fbval['temjson']);
                      $t =0;
                      for ($v=0; $v < count($a); $v++) { 
                        if($a[$v]==$zfbva['fbid']){
                          $t =1;
                        }
                      }

                                //重设字段
                                  $newzfbva = array(
                                    'name'=> $zfbva['name'], 
                                    'chl'=>$zfbva['chl'],
                                    'c'=>$t,
                                    'id'=> $zfbva['fbid'],
                                    'o'=>'',
                                    't'=> 'type'
                                    ); 
                    array_push($fbval['chl'],$newzfbva);
                  }
                }  

                $a =explode(",",$sinvalue['temjson']);
                $t =0;
                for ($v=0; $v < count($a); $v++) { 
                  if($a[$v]==$fbval['fbid']){
                    $t =1;
                  }
                }
                //重设字段
                                  $newfbval = array(
                                    'name'=> $fbval['name'], 
                                    'chl'=>$fbval['chl'],
                                    'c'=>$t,
                                    'id'=> $fbval['fbid'],
                                    'o'=>'',
                                    't'=> 'type',
                                    'cankao'=>$typedata   
                                    ); 
              array_push($sinvalue['chl'],$newfbval);
          }
        }


            

        //重设字段
        $newvalue = array(
          'name'=> $sinvalue['name'], 
          'chl'=>$sinvalue['chl'],
          'c'=>1,
          'id'=> $sinvalue['sid'],
          'o'=>'',
          't'=> 'sin',
          // 'cankao'=>$a   
          );
          array_push($sinv,$newvalue);
      }
      
      

      // 2、组合工程目录 
        $arrmulu = array(
          'name'=> $prodata['prname'],
          'chl' => $prov,
          );

$arrmulu['chl'] = array_merge($prov,$sinv); 
      


        $redata['data'] = $arrmulu;
        //$redata['cankao'] = $typedata;
     











      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata); 


































}

//土建资料模块-获取模块列表、资料列表
Public function program_struct_ziliaodata(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $hid = $arr['idv'];  //真实id
      if ($hid!='') {
        $tablename = 'renwu'; //表名
        $orderstr = '';
        $arr = array('hid'=>$hid,'isdel'=>0); //查询条件
        $hdata = hdtconnect($tablename,$hid);
        $data = nopage_select_byarr($tablename,$orderstr,$arr);
        $data['datalist'] = setcodeid($data['datalist'],6); //将返回数据的id进行加密
        $data['codeid'] = jiami('6*1');
        $data['hdata'] = setcodeid($hdata,5);
        $redata['data'] = $data;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata); 
}


//土建资料模块- 资料目录的保存列表
Public function program_struct_edit(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'保存成功','data'=>array());//定义返回数据格式；     
      
      $type = $_POST['t'];  //存入数据类型：  存入 prosintype，single，songjian； 
      $_POST['code'] = $_POST['code']==''?'-':$_POST['code'];

      if ($type!=''&&$_POST['id']!=''){
        //存入送检表 songjian
        if($type=='song'){
          $key = $_POST['zf'];
          $data = array(
            'tid'=>$_POST['id'], 
            );
          $data[$key] = $_POST['code']; 
          $da = Db::connect("DB_Config_1")->name('songjian')->update($data);
        }

        //存入  工程子单位资料类型表 prosintype
        if($type=='type'){
           $data = array(
            'fbid'=>$_POST['id'],
            'temjson'=>$_POST['code'] 
            );  
          $da = Db::connect("DB_Config_1")->name('prosintype')->update($data);
        }

        //存入  子单位表 single
        if($type=='sin'){
          $data = array(
            'sid'=>$_POST['id'],
            'temjson'=>$_POST['code'] 
            );  
          $da = Db::connect("DB_Config_1")->name('single')->update($data);
        }

if(!$da){
  $redata['msg'] = '参数有误';
} 
        
      }else{
        $redata['msg'] = '参数有误';
      }
      return json($redata); 
}




// 个人中心
// 获取个人信息
Public function user_password_info(){ 
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；           
      $data = getuserdata();
      // $data['userdata']['codeid'] = jiami(12*$data['userdata']['uid']);
      $arr = array('uid'=>$data['userdata']['uid']); //查询条件
      $orderstr ='';
      $tablename = 'user';
      $filed = 'sex,ctid,pid,yixiang,nicheng,photourl,tel,username,pcweopenid,qqopenid,qqnickname,pcwenickname,pcweimg,qqimg,maxprogram';      
      $datax = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
      $usd = $datax['datalist'][0];
      $usd['tuijian'] = $data['userdata']['uid'];
      $usd['leiji'] = sumtuijian($data['userdata']['uid']);


      $usd['hasweopenid'] = 0;
      if ($usd['pcweopenid']) {
        $usd['hasweopenid'] = 1;
        unset($usd['pcweopenid']);
      }  

       $usd['hasqqopenid'] = 0; 
      if ($usd['qqopenid']) {
        $usd['hasqqopenid'] = 1;
        unset($usd['qqopenid']);
      }            
      unset($usd['qqopenid']); 
      unset($usd['pcweopenid']);

      $usd['tel'] = substr_replace($usd['tel'],"****",3,4);
      $redata['data'] = $usd;
      return json($redata); 
}

// 同步头像
Public function sameimg(){ 
    $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；
    $data = getuserdata();
    $where['uid'] = $data['userdata']['uid'];
    $tablename = 'user'; //表名
    $newstr = $_POST;
    $re = updateone($tablename,$where,$newstr);
    if($re) {
      $redata['code'] = 1 ;$redata['msg']='修改成功';
    }else{
      $redata['code'] = 0 ;$redata['msg']='修改失败';
    }   
    return json($redata); 
}


//保存个人信息
Public function user_info_save(){
    $_IMG = input();
    $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；
    $data = getuserdata();
    $where['uid'] = $data['userdata']['uid'];
    $tablename = 'user'; //表名
    $newstr ='';
    if ($_IMG) {  //同步头像  如果有值就走同步
      $newstr = $_IMG;
      $data['userdata']['photourl'] = $_IMG['photourl']; 
    }else{
      $newstr = $_POST; 
      $data['userdata']['photourl'] = $_POST['photourl']; 
    }
    lgfun($data['userdata']);  
    unset($newstr['file']);
    $re = updateone($tablename,$where,$newstr);

    //得到文件名称
    // $savename = time().'.jpg';
    // $upload_path = 'Public/Uploads/'; //上传文件的存放路径
    // if ($file['name']) {
    //    $savepath = $upload_path.''.$savename; //图片地址
    //    $saveimg = move_uploaded_file($file['tmp_name'],$upload_path.$savename);//移动文件到相应的文件夹
    //    $imgpath =array('photourl'=>$savepath);
    //    $retwo = updateone($tablename,$where,$imgpath);
    //    if ($saveimg&&$retwo) {$re = 1;}
    //    else{ $re = 0;}
    // }
    if($re) {
      $redata['code'] = 1 ;$redata['msg']='修改成功';
    }else{
      $redata['code'] = 0 ;$redata['msg']='未修改';
    }   
    return json($redata); 
}
//保存修改密码
Public function user_password_change(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；
      $data = getuserdata();
      $where = array(
          'uid'=> $data['userdata']['uid'],
          'password' => md5($_POST['oldpasswd'])
      );   
      $newstr['password'] = md5($_POST['newpasswd']);  
      $tablename = 'user'; //表名
      $userdata = Db::connect("DB_Config_1")->name($tablename)->where($where)->select();
      if ($userdata) {
        $re = updateone($tablename,$where,$newstr);
        if ($re) {
          $redata['code'] = 1 ;$redata['msg']='修改成功';
        }else{
          $redata['code'] = 0 ;$redata['msg']='修改失败';
        }        
      }else{
          $redata['code'] = 0 ;$redata['msg']='旧密码错误！';
      }
      return json($redata); 
}
//保存修改手机
Public function user_password_phone(){
      $_POST = input();
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；
      $data = getuserdata();
      $tablename = 'user'; //表名
      $where = array(
          'uid'=> $data['userdata']['uid'],
          'password' => md5($_POST['oldpasswd'])
      );       
      $userdata = Db::connect("DB_Config_1")->name($tablename)->where($where)->select();
      $phcode = $_POST['phcode'];
      if (!$userdata){ 
        $redata['msg']='旧密码错误';
      }    
      else if($userdata[0]['tel']==$_POST['tel']){
        $redata['msg']='该手机已经绑定,无需重复绑定';
      }    
      else if ($phcode==''||$phcode!=session('phcode')){
        $redata['msg']='手机验证码错误';
      }else{     
        $newstr['tel'] = $_POST['tel'];  
        $re = updateone($tablename,$where,$newstr);
        if ($re) {
          $redata['code'] = 1 ;$redata['msg']='修改成功';
        }else{
          $redata['msg']='修改失败';
        }
      }  
      return json($redata); 
}

//省市管理-省列表  
Public function service_province_list(){
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'province'; //表名
      $orderstr = 'pid';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
      $data['datalist'] = setcodeid($data['datalist'],7); //将返回数据的id进行加密
      $redata['data'] = $data;
      return json($redata); 
}

//省市管理-市列表  
Public function system_city_list(){
       quanxian();
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'city'; //表名
      $orderstr = '';
      $arr = '';  

     
      if (isset($_POST['pid'])) {
       $arr = array('pid'=>$_POST['pid']);  
      }
      $field = '';


      $data =nopage_select_byarr($tablename,$orderstr,$arr);
      //$data = page_weather($tablename,$orderstr,$ctid,$nowpage,$listnum,$startime,$endtime,$vtem);
      $data['datalist'] = setcodeid($data['datalist'],16); //将返回数据的id进行加密
      $redata['data'] = $data;
      return json($redata); 
}
//城市管理  温度采集
  public function temurl(){ 
    $_POST = input();
   $url = $_POST['temurl'];
     // $url = 'https://tianqi.2345.com/tianjin/54527.htm';
    $string = file_get_contents($url);
    header('content-Type:text/html;charset=utf-8');
    $c = mb_convert_encoding($string,'utf-8','gb2312'); 
    return json(array('code'=>1,'html'=>$c,'post'=>$_POST));
    }
  //城市采集温度后更新数据库
  public function setweather(){ 
    $_POST = input();
    $postdata = $_POST['temdata']; 
    $cityid = (int)$_POST['cityid'];
    $len = count($postdata);

    if($len==0){
      return json(array('code'=>0,'msg'=>'没有温度记录，更新失败'));
    }else{
            $x =0;    
          for ($i=0; $i < $len; $i++) { 
            $wdate = (int)$postdata[$i]['time'];
            $arr = array(
              'htem'=>(int)$postdata[$i]['htem'],
              'ltem'=>(int)$postdata[$i]['ltem'],
              'vtem'=>(float)$postdata[$i]['vtem'], 
              'lastupdate'=>time()
              );
            $lastupdate = array(        
              'lastupdate'=>time()
              );
            $h = Db::connect("DB_Config_1")->name('weather')->where(array('ctid'=>$cityid,'wdate'=>$wdate))->find();
            if($h){
              //存在，进行更新
                  Db::connect("DB_Config_1")->name('weather')->where(array('ctid'=>$cityid,'wdate'=>$wdate))->update($arr);
                  Db::connect("DB_Config_1")->name('city')->where(array('ctid'=>$cityid))->update($lastupdate);
                  $x = 1;
            }else{
              $x = 2;
              //不存在，进行增加操作
              $arr['ctid'] = $cityid;
              $arr['isdel'] = 0;
              $arr['wdate'] = (int)$postdata[$i]['time'];
              $ad = Db::connect("DB_Config_1")->name('weather')->insertGetId($arr); 
            }
          }


          //更新完成，插入最后更新日期到当前城市
          $data = array('lastupdate'=>time());
         $a = Db::connect("DB_Config_1")->name('city')->where(array('ctid'=>$cityid))->data($data)->update();
    }

    


    return json(array('code'=>1,'postdata'=>$postdata,'cityid'=>$cityid,'x'=>$data,'ad'=>$a));
    }
//
Public function system_mattertpl_list(){
  quanxian();
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'mtemp'; //表名
      $orderstr = 'morder asc';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:100;
      $arr = array('isdel'=>0); 
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
      $data['datalist'] = setcodeid($data['datalist'],13); //将返回数据的id进行加密
      $data['codeid'] = jiami('13*1');
      $redata['data'] = $data;
      return json($redata); 
}

//系统配置 -统表类型管理列表表  
Public function system_tbtype_list(){
  quanxian();
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'tongbiaotype'; //表名
      $orderstr = 'torder asc';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:100;
      $arr = array('isdel'=>0); 
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
      $data['datalist'] = setcodeid($data['datalist'],14,false); //将返回数据的id进行加密
      $ln = count($data['datalist']);
      foreach ($data['datalist'] as $key => &$value) { 
        $re = Db::connect("DB_Config_1")->name('tongbiao')->where(array('tpid'=>$value['tpid']))->select();
        if($re){
          foreach ($re as $k => &$val) {
        
          //切分字段temjson 是否有 tbid；
          $a = explode(",",$value['temjson']);
          $t =0;
          for ($v=0; $v < count($a); $v++) { 
            if($a[$v]==$val['tbid']){
              $t =1;
            }
          }
          $val['check'] = $t;  
        }
          $value['chltemlist'] = $re;
        }
        

       }

      $data['codeid'] = jiami('14*1');
      $redata['data'] = $data;
      return json($redata); 
}


//系统配置 -统表管理列表表  
Public function system_tongbiao_list(){
  quanxian();
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'tongbiao'; //表名
      $orderstr = 'torder asc';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:100;
      $arr = array('isdel'=>0); 
      $field = '';
      $data = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
      $data['datalist'] = setcodeid($data['datalist'],15,false); //将返回数据的id进行加密
      $data['codeid'] = jiami('15*1');
      $redata['data'] = $data;
      return json($redata); 
}

//微信管理-文章列表
Public function service_art_list(){
      $_POST = input();
      $uid = getuser()['uid'];//去登陆的cookie里面拿到他的uid
      $tablename = 'program'; //表名
      $orderstr = '';
      $arr = array('uid'=>$uid); //查询条件
      $data = nopage_select_byarr($tablename,$orderstr,$arr);
      $dlist = $data['datalist'];  
}


//业务管理-城市气温列表
Public function service_weather_list(){
      $_POST = input();
      $_POST['ctid'] = input('cityid');    
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'weather'; //表名
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $send = 'ctid,wdate,htem,ltem,vtem';
      $re = weathercon($tablename,$arr,$send,$_POST,$nowpage,$listnum);
      $re['datalist'] = setcodeid($re['datalist'],8); //将返回数据的id进行加密
      $re['codeid'] = jiami('8*1');
      $redata['data'] = $re;
      return json($redata); 
}
//业务管理-城市气温增加-走公共方法com_ea
//业务管理-城市气温删除-走公共方法com_ed
//业务管理-城市气温编辑-走公共方法com_em

//运营管理-用户列表
Public function operate_user_list(){
   quanxian();
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'user'; //表名
      $orderstr = 'uid';
      $filed = 'uid,username,realname,tel,usertype,lockey,qq,email,add_time,maxprogram,qqopenid,wechatopenid,pcweopenid';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $re = userconnect($tablename,$nowpage,$listnum,$filed);
      $re['datalist'] = setcodeid($re['datalist'],12); //将返回数据的id进行加密
      $redata['data'] = $re;    
      return json($redata); 
}

//运营管理-登陆列表
Public function operate_login_list(){
  quanxian();
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'log'; //表名
      $orderstr = 'logintime';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $re = comconnect($tablename,$nowpage,$listnum);
      // p($re);
      $re['datalist'] = setcodeid($re['datalist'],10); //将返回数据的id进行加密
      $redata['data'] = $re;         
      return json($redata); 
}

//运营管理-公司列表 
Public function operate_com_list(){
   quanxian();
      $_POST = input();
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $tablename = 'company'; //表名
      $orderstr = 'comid';
      $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
      $listnum = $_POST['listnum']?$_POST['listnum']:30;
      $arr = '';
      $field = '';
      $re = comconnect($tablename,$nowpage,$listnum);
      $re['datalist'] = setcodeid($re['datalist'],11); //将返回数据的id进行加密
      $redata['data'] = $re; 
      return json($redata); 
}

//运营管理-项目列表 program
// Public function operate_pro_list(){
//    quanxian();
//       $_POST = input();
//       $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
//       $tablename = 'program'; //表名
//       $orderstr = 'prid';
//       $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
//       $listnum = $_POST['listnum']?$_POST['listnum']:30;
//       $arr = '';
//       $field = '';
//       $cityid = $_POST['cityid'];
//       $pid = $_POST['pid'];
//       $re = proconnect($tablename,$nowpage,$listnum,$pid,$cityid);
//       $re['datalist'] = setcodeid($re['datalist'],1); //将返回数据的id进行加密
//       $redata['data'] = $re;       
//       return json($redata); 
// }


public function operate_pro_list(){
    quanxian();
    $_POST = input();
    $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     

    $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
    $listnum = $_POST['listnum']?$_POST['listnum']:30;
  
    $begin = ($nowpage-1)*$listnum;
    $end   = $listnum;
    $sql = "select  t1.cityid,t3.city,t1.prid,t1.prname,t2.username,t2.realname,t1.sgname,t1.gcdizhi,
                    FROM_UNIXTIME(t1.add_time) add_time 
            FROM      cy_program t1
            LEFT JOIN cy_user t2 ON t1.uid = t2.uid
            LEFT JOIN cy_city t3 ON t1.cityid = t3.ctid
            WHERE  1=1 ";
    if ($_POST['pid']) {
      $sql = $sql." AND t1.pid = {$_POST['pid']} ";
    }
    if ($_POST['cityid']) {
      $sql = $sql." AND t1.cityid = {$_POST['cityid']} ";
    }
    $sql = $sql." and t1.isdel=0 ORDER BY t1.add_time DESC";
    $re['total'] = count(Db::connect("DB_Config_1")->name('program')->query($sql));
    $re['pages'] = $re['total']/$listnum;
    $sql = $sql." LIMIT {$begin},${end} ";
    $re['datalist'] = Db::connect("DB_Config_1")->name('program')->query($sql);
    // p($re);
    // $re['datalist'] = setcodeid($re['datalist'],1); //将返回数据的id进行加密
    $redata['data'] = $re;       
    return json($redata); 
}
































/********************************************************************************/    

//上传图片
 public function uploadImage(){
  header("Content-Type:text/html; charset=utf-8"); //不然返回中文乱码
  $redata = array('code'=>1,'msg'=>'','data'=>array());
  $file = $_FILES['file'];//得到传输的数据
  //得到文件名称
  $name = $file['name'];
  $type = strtolower(substr($name,strrpos($name,'.')+1)); //得到文件类型，并且都转化成小写
  $allow_type = array('jpg','jpeg','gif','png'); //定义允许上传的类型
  //判断文件类型是否被允许上传
  if(!in_array($type, $allow_type)){
    $redata['code'] = 0;
    $redata['msg'] = '文件类型不支持';
    return json($redata); 
  }

  // $baseUrl = $_SERVER['DOCUMENT_ROOT']."/php";
  // $folder =  "upload";//此参数为目标文件夹，根据需要作为参数传递过来
  // $upload_path = $baseUrl."/$folder";
  
  // $upload_path = '/upload/';
  // if (!is_readable($upload_path)){
  //   $iscreate = mkdir($upload_path,0777); 
  // }
  //使用时间戳对文件重命名
  $name = time().".".$type;
  //开始移动文件到相应的文件夹
  $returnUrl = str_replace("/", "\\", /*$upload_path.*/$name);
  if(move_uploaded_file($file['tmp_name'],$returnUrl)){
    $redata['msg'] = 'success';
    $redata['url'] =  '/api/'.$returnUrl;
  }else{
    $redata['code'] = '0';
    $redata['msg'] = 'failed!';
  }
  return json($redata); 
}


//温度统计
public function tempStatistic(){
  $_POST = input();
  $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；
  
  $sid = $_POST['sid'];
  $prid =$_POST['prid'];

  $sql = 'select sid,prid,tid,fid,myorder,bybuwei,byqiangdu,byyl,byzushu,byriqi,bytime,byys,byjg,xinpian,bybh from  cy_songjian WHERE sid = '.$sid.'';
  $songjiandata = Db::connect("DB_Config_1")->name()->query($sql);
  
  $prid = $songjiandata[0]['prid'];
  
  $sql= 'select t1.*,t2.prid from cy_weather t1 LEFT JOIN cy_program t2 ON t1.ctid = t2.cityid  WHERE t1.isdel = 0 AND t2.prid = '.$prid.'';
  $weatherdata = Db::connect("DB_Config_1")->name()->query($sql);

  $returnarr = array();
  foreach ($songjiandata as $key1 => &$value1) {
    $value1['sumtemp'] = 0;
    foreach ($weatherdata as $key2 => $value2) {   
      //未送，送检日期未填
     if($value1['byys']==0 && $value1['bytime'] == null){
      //计算浇筑日期到当前日期的温度
        if($value2['wdate'] >= $value1['byriqi'] && $value2['wdate'] < time() ) {
          $value1['sumtemp'] += $value2['vtem'];
        }
      //未送，送检日期已填
     }else if($value1['byys']==0 && $value1['bytime'] != null){
        //计算浇筑日期到送检日期的温度
        if( $value2['wdate'] >= $value1['byriqi'] && $value2['wdate'] <= $value1['bytime'] ) {
          $value1['sumtemp'] += $value2['vtem'];
        }
      //已送，送检日期未填
     }else if($value1['byys']==1 && $value1['bytime'] == null){
        //计算浇筑日期到当前日期的温度
        if($value2['wdate'] >= $value1['byriqi'] && $value2['wdate'] < time() ) {
          $value1['sumtemp'] += $value2['vtem'];
        }
      //已送，送检日期已填
     }else if($value1['byys']==1 && $value1['bytime'] != null){
        //计算浇筑日期到送检日期的温度
        if( $value2['wdate'] >= $value1['byriqi'] && $value2['wdate'] <= $value1['bytime'] ) {
          $value1['sumtemp'] += $value2['vtem'];
        }
     }
      
    }//结束内层循环
    $returnarr[] = $value1; 
  }//结束外层循环
  setcodeid($songjiandata,4);
  if($songjiandata){
    $redata['data'] = $returnarr;
    $redata['msg'] = 'success';
  }else{
    $redata['code'] = '0';
    $redata['msg'] = 'success';
  } 
  return json($redata);
}


/*
 * 解绑qq，微信，手机号
 */
public  function unbind(){
  $_POST = json_decode(file_get_contents("php://input"),true);
  $redata = array('code' => 1,'msg'=>"",'data'=> array());
  $uid = getuser()['uid'];
  $type = $_POST['type'];

  $data = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid,'lockey'=>'0'))->find();
  $password = I('POST.oldpassword','','md5');
  if($password != $data['password']){
    $redata['code'] = 0;
    $redata['msg'] = '请输入正确的原始密码';
  }else{
    //解绑手机
    if($type == '1'){
     $sql = 'UPDATE cy_user SET tel = NULL WHERE uid = '.$uid.'';
    //解绑qq
    }else if ($type == '2') {
      $sql = 'UPDATE cy_user SET qqimgurl = NULL,qqopenid=NULL, qq = NULL WHERE uid = '.$uid.'';
    //解绑微信
    }else if ($type == '3') {
      $sql = 'UPDATE cy_user SET wechatopenid = NULL,weixin = NULL   WHERE uid = '.$uid.'';
    }
  }
  $result = Db::connect("DB_Config_1")->name('user')->execute($sql);
  if($result){
      $redata['code']='1';
      $redata['msg'] = '解绑成功';
    }else{
      $redata['code']='0';
    }
  return json($redata);
}

/*
 * pc端解绑qq，微信，手机号不需要验证原密码
 */
public  function unbindtwo(){
  $_POST = json_decode(file_get_contents("php://input"),true);
  $redata = array('code' => 1,'msg'=>"",'data'=> array());
  $uid = getuser()['uid'];
  $type = $_POST['type'];
  //解绑手机
  if($type == '1'){
   $sql = 'UPDATE cy_user SET tel = NULL WHERE uid = '.$uid.'';
  //解绑qq
  }else if ($type == '2') {
    $sql = 'UPDATE cy_user SET qqimg = NULL,qqopenid=NULL, qqnickname = NULL WHERE uid = '.$uid.'';
  //解绑微信
  }else if ($type == '3') {
    $sql = 'UPDATE cy_user SET pcweopenid = NULL,pcwenickname = NULL,pcweimg = NULL   WHERE uid = '.$uid.'';
  }
  $result = Db::connect("DB_Config_1")->name('user')->execute($sql);
  if($result){
      $redata['code']='1';$redata['msg'] = '解绑成功';
    }else{
      $redata['code']='0';
    }
  return json($redata);
}




/**
 * 登录统计--带分页功能
 * 请求示例：
 * {
 *  "btime":"2014/11/27 14:56:56",
 *  "etime":"2016/11/27 14:59:5",
 *  "nowpage":1,
 *  "listnum":30
 * } 
 */
public function loginStatistic(){
  $_POST = json_decode(file_get_contents("php://input"),true);
  $redata = array('code' => 1,'msg'=>"",'data'=> array());
  $nowpage = $_POST['nowpage']==''?1:$_POST['nowpage'];//当前页
  $listnum = $_POST['listnum']==""?100:$_POST['listnum'];//每页记录数
  $begin = ($nowpage-1)*$listnum;
  $btime = '';
  $etime = '';
  if(input('btime')){$btime = input('btime');}
  if(input('etime')){$etime = input('etime');}
  
 
  $sql = "SELECT t1.uid,t2.username,t2.realname,"."\"".$btime."\"". " AS btime,"."\"".$etime."\"". " AS etime ,COUNT(*) AS logintimes FROM cy_log t1 LEFT JOIN cy_user t2 ON t1.uid = t2.uid WHERE t1.logintime BETWEEN    UNIX_TIMESTAMP("."\"".$btime."\"". ") AND UNIX_TIMESTAMP("."\"".$etime."\"". ")  GROUP BY t1.uid ORDER BY logintimes DESC LIMIT $begin,$listnum";
  $data = Db::connect("DB_Config_1")->name('log')->query($sql);
  $redata['msg'] = '查询成功';
  $redata['data'] = $data;
  return json($redata);
}




//统计登录
      public function FunctionName()
      {
        
         $jsoninfo = getuser();
         if($jsoninfo['uid']>0&&$jsoninfo['usertype']==1){
            $nowpage = $_POST['nowpage']==''?1:$_POST['nowpage'];
            $listnum = $_POST['listnum']==""?30:$_POST['listnum'];
            $orderstr = 'logvalue desc';
            $constr = '';
            if($_POST['btime']!=''&&$_POST['etime']!=''){
              $constr = ' and logintime>='.strtotime($_POST['btime']).' and logintime<='.strtotime($_POST['etime']);
            } 
 
            $re = countlogin($nowpage,$listnum,$orderstr,$constr);
            if($re['reply']==1){
              $result = array('code'=>1,'desc'=>'有数据','data'=>$re);
            }else{
              $result = array('code'=>0,'desc'=>'没有数据','re'=>$re);
            }
          }else{
            $result = array('code'=>0,'desc'=>'非法操作');
          } 
          return json($result);
      }

           
 
  //分享朋友圈
public function share(){  
  $_POST = input();
  $re = array('code'=>1,'msg'=>''); 
  $uid = getuser()['uid']; 

$fx = array(
  'sqq'=>'SHARE_FRIENT',
  'weixin'=>'SHARE_WECHAT',
  'qzone'=>'SHARE_QZONE',
  'tsina'=>'SHARE_SINA',
  'bdhome'=>'SHARE_BAIDU',
  'tqq'=>'SHARE_QQWEBO', 
  );

  jifen($uid,1,$fx[$_POST['type']]); 
  
  return json($re); 
  }  








  //xls导入
  
public function excal2(){
        //转化大写字母为数字的方法
        function getalphnum($char){
        $array=array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        $len=strlen($char);
        for($i=0;$i<$len;$i++){
        $index=array_search($char[$i],$array);
        $sum+=($index+1)*pow(26,$len-$i-1);
        }
        return $sum;
        }

        $file = $_FILES['FILE'];//得到传输的数据
        $upload_path = "./Public/"; //上传文件的存放路径.
        $str = explode('.',$file['name']);
        $type = $str[count($str)-1];  //获取上传excal类型         
        $file['name'] = time().$file['name'];
        move_uploaded_file($file['tmp_name'],$upload_path.$file['name']);
        import("Org.Util.PHPExcel");
        import("Org.Util.PHPExcel.IOFactory");
        import("Org.Util.PHPExcel.Reader.Excel5");
        import("Org.Util.PHPExcel.Reader.Excel2007");
        $PHPReader= $type == 'xls'?new \PHPExcel_Reader_Excel5():new \PHPExcel_Reader_Excel2007();
        $PHPExcel=$PHPReader->load('./Public/'.$file['name']);
        $currentSheet=$PHPExcel->getSheet(0);
        $highestRow = $currentSheet->getHighestRow(); // 取得总行数
        $highestColumn = $currentSheet->getHighestColumn(); // 取得总列数     

        $str =  array(1=>'bybuwei',2=>'byriqi',3=>'bytime',4=>'byzushu',5=>'byjg',6=>'bybh'); 
        //循环读取excel文件,读取一条,插入数组一条
        for($j=2;$j<=$highestRow;$j++)
        {
            for($k='A';$k<=$highestColumn;$k++)
            {
                $val = $str[getalphnum($k)]; 
                //读取单元格
                $ExamPaper_arr[$j-2][$val]= $PHPExcel->getActiveSheet()->getCell("$k$j")->getValue();
            }
        }
        p($ExamPaper_arr);
}    
    


//导入送检
 public function exportxlssongjian(){
    header("Content-Type:text/html; charset=utf-8"); //不然返回中文乱码
    import("Org.Util.PHPExcel");
    import("Org.Util.PHPExcel.IOFactory");
    import("Org.Util.PHPExcel.Reader.Excel5");
    import("Org.Util.PHPExcel.Reader.Excel2007");
    $file = $_FILES['FILE'];//得到传输的数据
    $excelstr =  array(1=>'bybuwei',2=>'byqiangdu',3=>'ksdengji',4=>'byriqi',5=>'bytime',6=>'byzushu',7=>'byxinpian',8=>'byjg',9=>'bybh');  
    $redata = dealExecl($file,$excelstr);
    return json($redata); 
}

//导入原材
 public function exportxlsmatter(){
    header("Content-Type:text/html; charset=utf-8"); //不然返回中文乱码
    import("Org.Util.PHPExcel");
    import("Org.Util.PHPExcel.IOFactory");
    import("Org.Util.PHPExcel.Reader.Excel5");
    import("Org.Util.PHPExcel.Reader.Excel2007");
    $file = $_FILES['FILE'];//得到传输的数据
    $excelstr =  array(1=>'mname',2=>'buwei',3=>'xinghao',4=>'guige',5=>'pinzhong',6=>'qiangdu',7=>'changjia',8=>'yczushu',9=>'intime',10=>'stime',11=>'jieguo',12=>'ypbh');  
    $redata = dealExecl($file,$excelstr);
    return json($redata); 
}








//获取资料目录

/**
 *菜单增加
 * @param    string   $address     "json/pc/admin/menu.json" 
 * @return   arr
 * @author  wyl  
 */
public function archive_insert(){   
  if(!$_POST)return rejson(0,'错误');

  $mid=Db::connect("DB_Config_1")->name('archive_tree')->where(['id'=>input('id')])->find()['mid'];

   $data=[
    'pid'=>input('id'),
    'mid'=>$mid,
    'name'=>input('name'),
    'icon'=>input('inco'),
    'visible'=>input('visible'),
    'code'=>input('code'),
    'type'=>input('type'),
   ];

   $data['open']=input('type')=='dir'?'true':'false';

   $re=Db::connect("DB_Config_1")->name('archive_tree')->insertGetId($data);
   if($re){
     return rejson(1,'插入成功',$data); 
   }else{
    return rejson(0,'插入失败');
   }

}

/**
 *菜单删除
 * @param    string   $address     "json/pc/admin/menu.json" 
 * @return   arr
 * @author  wyl  
 */
public function archive_del(){ 
  if(!input('id')){return rejson(0,'参数错误');}
  $ids = input('id');
  $arr = explode(',',$ids); 
  //查找下面是否有子栏目
  $v = 0;
  foreach ($arr as $key => $value) {
    $where['isdel'] = ['=','0']; 
    $where['pid'] = ['=',$value];
    $checkhasson = get_data('archive_tree',$where); 
    if($checkhasson){$v++;}
   } 
   if($v>0){return rejson(0,'请先删除子栏目');}
  $re = delete_data('archive_tree','id',$arr);
  $code = $re?1:0; 
  $msg = $re?'菜单删除成功':'菜单删除失败';
  return rejson($code,$msg);
}



/**
 *菜单修改更新
 * @param    string   $address     "json/pc/admin/menu.json" 
 * @return   arr
 * @author  wyl  
 */
public function archive_update(){ 
  if(!input('id')){return rejson(0,'参数错误');}
  $data=array();
  input('listorder')||input('listorder')==='0'?$data['listorder']=input('listorder'):'';
  input('name')||input('listorder')==='0'?$data['name']=input('name'):'';
$data['icon']=input('icon');
  
  // input('icon')||input('listorder')==='0'?$data['icon']=input('icon'):'';
  input('code')||input('listorder')==='0'?$data['code']=input('code'):'';
  $data['visible']=input('visible');
  input('type')||input('listorder')==='0'?$data['type']=input('type'):'';
  input('note')||input('listorder')==='0'?$data['note']=input('note'):'';
  
  $re=Db::connect("DB_Config_1")->name('archive_tree')->where(['id'=>input('id')])->update($data);
  $msg = $re?'菜单更新成功':'菜单更新失败';
  if($re){
    return rejson(1,$msg);    
  }else{
    return rejson(0,$msg);
  }

}



/**
 *菜单查询列表或者一条
 * @param    string   $address     "json/pc/admin/menu.json" 
 * @return   arr
 * @author  wyl  
 */
public function archive_select(){  
    $code=explaincodeid(input('codeid'));
    if(input('id')){
      $where['id']=['=',input('id')];
      $data = get_data('archive_tree',$where);
    }else{

      $sort = 'listorder asc';
      $list = get_datalist('archive_tree',['mid'=>$code['idv']],'','',$sort);
      foreach ($list as $key => &$value) {
        $value['namestr'] = $value['name'];
        $value['namelip'] = $value['name'];
      }
      $data = array();
        foreach ($list as $key => &$value) {
            if($value['pid']==0){
                $data[] = $value;
                $value['hasc'] = 0;
                $value['cststr'] = '';
                $value['cstlip'] = '';
                $data = getSons($value,$list,$data);
            } 
        } 
    } 
    $data = set_codeid($data,48);
  return rejson(1,'查询成功',$data);
}


/**
 *菜单查询列表或者一条
 * @param    string   $address     "json/pc/admin/menu.json" 
 * @return   arr
 * @author  wyl  
 */
public function archivetree_select(){   
    $program=Db::connect("DB_Config_1")->name('program')->where(['prid'=>809])->find();
    $single=Db::connect("DB_Config_1")->name('single')->where(['prid'=>809])->select();
    $program=setcodeid([$program],0,false)[0];
    $single=setcodeid($single,2,false);
  // p($single);
      $sort = 'listorder asc';
      $list = get_datalist('archive_tree',['visible'=>1,'isdel'=>0],'',$sort);
      $list=setcodeid($list,20,false,'acodeid');

      $redata=[
        'id'=>$program['prid'],
        'name'=>$program['prname'],
        'prcodeid'=>$program['codeid'],
        'visible'=>1,
        'open'=>'true',
        'icon'=>'main/images/documents.png'
      ];

      $redata['children']=arr2tree($list,0,$single,0,$program['codeid']);
      // return json($redata['children'][2]);
  return rejson(1,'查询成功',$redata);
}






//获取专业列表
public function major_select(){
  $data=Db::connect("DB_Config_1")->name('major')->where(['isdel'=>0])->select();
  if($data){
    foreach ($data as $key => &$value) {
      $province=Db::connect("DB_Config_1")->name('province')->where(['pid'=>$value['pid']])->find();
      if($province)
      $value['province']=$province['province'];
      $value['listorder']=$value['mid'];
      $value['create_time']=date('Y-m-d');
      $value['update_time']=date('Y-m-d');
    }
    $data=setcodeid($data,18);
    return rejson(1,'查询成功',$data);
  }else{
    return rejson(0,'无数据');
  }
}


//添加专业
public function major_add(){
// p($_POST);
  if(!$_POST)return rejson(0,'错误');
  $data['name']=$_POST['name'];
  $data['pid']=$_POST['pid'];
  $data['visible']=$_POST['visible'];
  $data['create_time']=time();
  $data['update_time']=time();

  $re=Db::connect("DB_Config_1")->name('major')->insertGetId($data);
  if($re){
    return rejson(1,'添加成功');
  }else{
    return rejson(0,'添加失败');
  }
}

//删除专业
public function major_del(){
      if(!input('codeid')){return rejson(0,'参数错误');} 
      $codeid=explode(",",input('codeid'));
      $str=['tbn'=>'','id'=>'','idv'=>[]];
      foreach ($codeid as $key => $value) { 
        $str = explaincodeid($value);
        $arr['tbn'] = $str['tbn'];
        $arr['id']=$str['id'];
        $arr['idv'][]=$str['idv'];
      }  

  $re=Db::connect("DB_Config_1")->name($arr['tbn'])->where($arr['id'],'in',$arr['idv'])->setField('isdel',1);
  if($re){
    return rejson(1,'删除成功');
  }else{
    return rejson(0,'删除失败');
  }
}



//获取模板表数据
public function get_template_data(){
    if(!input('aid'))return rejson('0','参数错误');
    $where['aid']=input('aid');
    $where['uid']=getuser()['uid'];
    input('prid')?$where['prid']=input('prid'):'';
    input('tid')?$where['tid']=input('tid'):'';
    input('sid')?$where['sid']=input('sid'):'';
    input('mid')?$where['mid']=input('prid'):'';

    $data=Db::connect("DB_Config_1")->name('zltable')->where($where)->find();
    if($data){
      return rejson(1,'查询成功',$data);
    }else{
      return rejson(0,'无数据',[]);
    }
}




//编辑添加模板表数据
public function template_editadd(){
  // if(!input('aid'))return rejson(0,'参数设置错误');
      $id=0;
      $uid=getuser()['uid'];
      if(input('prcodeid'))$data['prid']=explaincodeid(input('prcodeid'))['idv'];
      if(input('codeid'))$data['tid']=explaincodeid(input('codeid'))['idv'];
      if(input('scodeid'))$data['sid']=explaincodeid(input('scodeid'))['idv'];
      if(input('acodeid'))$data['aid']=explaincodeid(input('acodeid'))['idv'];
      if(input('zlcodeid'))$id=explaincodeid(input('zlcodeid'))['idv'];
      $data['savestr']=input('savestr');
      $data['uid']=$uid;

      $data['createtime']=time();
    if($id){//编辑
      $data['updatetime']=time();
      $re=Db::connect("DB_Config_1")->name('zltable')->where(['id'=>$id])->update($data);
    }else{//添加
      $re=Db::connect("DB_Config_1")->name('zltable')->insertGetId($data);
    }

    
    if($re){
      return rejson(1,'成功',$re);
    }else{
      return rejson(0,'失败');
    }
}

//编辑添加模板表数据
public function template_delete(){
  if(!input('codeid'))return rejson(0,'参数设置错误');

    $id=explaincodeid(input('codeid'))['idv'];
    $re=Db::connect("DB_Config_1")->name('zltable')->where(['id'=>$id])->delete();

    if($re){
      return rejson(1,'成功',$re);
    }else{
      return rejson(0,'失败');
    }
}






//查询用户工程的漏送情况并发送短信
public function check_lousong(){

  $program=Db::connect("DB_Config_1")->name('program')->where(['isdel'=>0])->select();
  if($program){
  foreach ($program as $key => $value) {
    $result=array();
    //只有勾选了短信提醒才做以下操作
    if($value['message']){
    //获取工程负责人联系电话
    $user=DB::connect("DB_Config_1")->name('user')->where(['uid'=>$value['uid']])->find();
    $tel=$user['tel'];

    //查每个工程下的子单位
    $single=Db::connect("DB_Config_1")->name('single')->where(['prid'=>$value['prid'],'isdel'=>0])->select();
    foreach ($single as $k => $v) {
      //查每个子单位的部位
      $buwei=Db::connect("DB_Config_1")->name('songjian')->where(['sid'=>$v['sid'],'isdel'=>0])->select();;
      $re=sinimage($buwei);
      foreach ($re as $kk => $vv) {
        //标养
        if($vv['by']==2){
          $result[]=$vv['bydesc'];
          if(count($result)>2)break 2;
        }

        //同养
        if($vv['ty']==2){
          $result[]=$vv['tydesc'];
          if(count($result)>2)break 2;
        }   
        
        //抗渗
        if($vv['ks']==2){
          $result[]=$vv['ksdesc'];
          if(count($result)>2)break 2;
        } 

        //柱头
        if($vv['zt']==2){
          $result[]=$vv['ztdesc'];
          if(count($result)>2)break 2;
        } 

        //dz
        if($vv['dz']==2){
          $result[]=$vv['dzdesc'];
          if(count($result)>2)break 2;
        } 

        //cm
        if($vv['cm']==2){
          $result[]=$vv['cmdesc'];
          if(count($result)>2)break 2;
        } 

        //砌筑
        if($vv['qz']==2){
          $result[]=$vv['qzdesc'];
          if(count($result)>2)break 2;
        } 

        //wq
        if($vv['wq']==2){
          $result[]=$vv['wqdesc'];
          if(count($result)>2)break 2;
        } 

        //nq
        if($vv['nq']==2){
          $result[]=$vv['nqdesc'];
          if(count($result)>2)break 2;
        } 

        //zp
        if($vv['zp']==2){
          $result[]=$vv['zpdesc'];
          if(count($result)>2)break 2;
        } 

      }


        }

        if($result){ 
            $str=$value['prname'];//工程名
            $str.='有送检部位漏送';

            $re=test($tel,$str,'100687');
        }

      }

    }
  }



}






















}
