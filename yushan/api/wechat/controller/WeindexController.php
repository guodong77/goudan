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

class WeindexController  extends CommonController{  


/**
 *  1.获取工程列表--子单位列表
 *  @author niepei
 *
 *
 */
public function  pro_list(){
  // $_POST = json_decode(file_get_contents('php://input'),true);
  $uid = getuser()['uid'];
  //$uid = 5;
  $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
    // 获取工程列表
    $tablename = 'program';
    $orderstr = 'prid desc'; 
    $arr = array('uid'=>$uid,'isdel'=>0);
    $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
    $listnum = $_POST['listnum']?$_POST['listnum']:100;
    // $field = 'prid,prname,uid,jiegou,cityid,cityv,kaigong,jungong';
    $sql = 'select city,prid,prname,uid,jiegou,cityid,cityv,kaigong,jungong from cy_program,cy_city where cy_city.ctid=cy_program.cityid and isdel=0 and uid='.$uid.' order by prid desc';
    $prodata['datalist'] = Db::connect("DB_Config_1")->name('program')->query($sql);
    // $prodata = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
    $dlist = $prodata['datalist'];
    $prolen = count($dlist); 
    // 设置子单位列表
    for($i=0;$i<$prolen;$i++){
        $dlist[$i]['sinchl'] = getallsin($dlist[$i]['prid']); 
    }
    $prodata['datalist'] = $dlist;
    //对返回id加密
    $prodata['datalist'] = setcodeid($prodata['datalist'],0);
    $redata['data'] = $prodata;
    $redata['post'] = $_POST;
    return json($redata);

 }





public function  pro_single_list(){
  // $_POST = json_decode(file_get_contents('php://input'),true);
  $uid = getuser()['uid'];

  $redata = array('code'=>1,'msg'=>'','data'=>array());//1、定义返回数据格式；
    // 获取工程列表

    $field1 = 'city,prid,prname,uid,jiegou,cityid,cityv,kaigong,jungong,isdel';
    $arr1 = array('uid'=>$uid,'isdel'=>'0');
    $orderstr = 'prid desc'; 
    $sql = 'select city,proimg,prid,prname,uid,jiegou,cityid,cityv,kaigong,jungong,cy_program.isdel from cy_program,cy_city where cy_city.ctid=cy_program.cityid and cy_program.isdel=0 and uid='.$uid.' order by prid desc';
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
    $field2 = 'sid,sname,cengshu,jiegou,jcriqi,jctime,ztjgriqi,ztjgtime,zxriqi,zxtime,wmriqi,wmtime,sqzriqi,sqztime,swqriqi,swqtime,snqriqi,snqtime,isdel';
   
// $redata['str'] = $arr2;
//  return json($redata);


    $sindata = Db::connect("DB_Config_1")->name('single')->where($arr2)->select();
    $sindata = setcodeid($sindata,2);

    foreach ($prodata as $key1 => &$value1) {
      $value1['sinchl']['datalist'] =array();
      foreach ($sindata as $key2 => $value2){
        // $value2['rd'] = rand(1,19);
        // $value2['ngclass'] = '';
        // $value2['type'] = 'single';
        $value2['check'] = 0;
        if(isset($value1['prid'])&&isset($value2['prid'])){
          if($value1['prid'] == $value2['prid']){
            $value1['sinchl']['datalist'][] = $value2;
          }
        }
      }
    }


}




    $a['datalist'] = setcodeid($prodata,0);

    $redata['data'] = $a;
    $redata['post'] = $_POST;
    return json($redata);

 }





/**
 *  2.获取工程基本信息
 *  @param codeid
 *  @author niepei
 *
 */
 public function pro_base(){
   // $_POST =  json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；          
      $arr = explaincodeid($_POST['codeid']);  
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
 }

/**
 *  3.获取工程技术信息
 *  @param codeid
 *  @author niepei
 *
 */
  Public function program_tecnology_info(){     
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；        
      $arr = explaincodeid($_POST['codeid']);  
      if ($arr) {
        $filed = 'prid,fangshui,qiangti,qiangtidj,qizhu,shuini,waijiaji,canheliao,peihebi,gere';
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))/*->field($field)*/->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
  }

/**
 *  4.获取施工单位信息
 *  @param codeid
 *  @author niepei
 *
 */
  Public function pro_shigong(){    
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；        
      $arr = explaincodeid(input('codeid'));
      $field = 'prid,sgname,sgdizhi,sgzizhi,sgdengji,sgzhucehao,sgxukehao,qyjishu,xmjishu,jingli,shigongyuan,zhiliangyuan,anquanyuan,diangong,jiazigong,siji,mugong,gangjingong,tonggong,qizhu,shuidian,lvhejin,fangshui,xiaofang,qyjishubh,qyjishudh,xmjishu,xmjishubh,xmjishudh,jinglibh,jinglidh,shigongyuanzh,shigongyuandh,zhiliangyuanzh,zhiliangyuandh,anquanyuanzh,anquanyuandh,sgfuzeren,sgfuzerendh,mohuigong,hangong,sgdianhua';
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->field($field)->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
  }



/**
 *  5.监理单位
 *  @param codeid
 *  @author niepei
 *
 */
  Public function pro_jianli(){
      //$_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；        
      $arr = explaincodeid($_POST['codeid']); 

     /* $field = 'prid,jlname,jsname,jsdianhua,jsfuze,jsphone,jldizhi,jldianhua,jlzizhi,jldengji,jlzhucehao,zongjian,Zjzhenghao,Zjdianhua,zhuanjian,jianliyuan,zhuanjianzh,zhuanjiandh,jianliyuandh,jlfuzeren,jlfuzerendh';*/
      $field = 'prid,jsname,jsfuze,jsphone,jlzizhi,jlname,jldengji,jlzhucehao,jldianhua,zongjian,zjzhenghao,zjdianhua,zhuanjian,zhuanjianzh,zhuanjiandh,jianliyuan,jianliyuandh,jlfuzeren,jlfuzerendh';
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->field($field)->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
  }


/**
 *  6.建设单位
 *  @param codeid
 *  @author niepei
 *
 */
  Public function pro_jianshe(){    
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；        
      $arr = explaincodeid($_POST['codeid']); 
      $field = 'prid,jlname,jsname,jsdianhua,jsfuze,jsphone,jldizhi,jldianhua,jlzizhi,jldengji,jlzhucehao,zongjian,Zjzhenghao,Zjdianhua,zhuanjian,jianliyuan,zhuanjianzh,zhuanjiandh,jianliyuandh,jlfuzeren,jlfuzerendh';
     
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->field($field)->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
  }


/**
 *  7.设计单位
 *  @param codeid
 *  @author niepei
 *
 */
  Public function pro_sheji(){      
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；        
      $arr = explaincodeid($_POST['codeid']); 

      $field = 'prid,sjname,sjzizhi,sjdengji,sjzhucehao,sjdianhua,sjfuze,sjphone';
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->field($field)->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
  }

/**
 *  8.勘察单位
 *  @param codeid
 *  @author niepei
 *
 */
  Public function pro_kancha(){
      //$_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；        
      $arr = explaincodeid($_POST['codeid']); 
      $field = 'prid,kcname,kcfuze,kcphone,kczizhi,kcdengji';
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->field($field)->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
  }

/**
 *  9.其他单位
 *  @param codeid
 *  @author niepei
 *
 */
  Public function pro_other(){    
      $redata = array('code'=>0,'msg'=>'','data'=>array());//定义返回数据格式；        
      $arr = explaincodeid($_POST['codeid']); 
      $field = 'prid,hntname,hntzizhi,hntphone,fbname,fenbao';
      if ($arr) {
        $data = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$arr['idv'],'isdel'=>0))->field($field)->select(); 
        if($data){
          $redata['code'] = 1;
          $redata['data'] = setcodeid($data,0)[0];
        }else{
          $redata['code'] = 0;
          $redata['msg'] = '参数错误';
        }        
      }else{
        $redata['code'] = 0;
        $redata['msg'] = '参数错误';
      }
      return json($redata);
  }



/**
 *  10.添加工程
 *  @param codeid
 *  @author niepei
 *
 */
  public function pro_add(){
    $redata = array('code'=>0,'msg'=>'','data'=>array());
    $uid = getuser()['uid'];  
    

//做出限制不超过工程上线 
if(chaoguomaxpro($uid)){
    $redata['msg'] = '您的工程数量已超过工程上限，创建失败！';
    return json($redata);
}

    $tablename = 'program'; 
    $_POST['uid']=$uid;
    $_POST['add_time']=time();
    $_POST['kaigong'] = strtotime($_POST['kaigong']);
      $_POST['jungong'] = strtotime($_POST['jungong']);
    $id=Db::connect("DB_Config_1")->name('program')->insert($_POST);  

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
       $redata = array('code'=>1,'msg'=>'添加成功','data'=>$id);     
      }

      return json($redata);



   


  }


/**
 *  11.删除工程
 *  @param codeid
 *  @author niepei
 *
 */
  public function pro_del(){
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

/**
 *  12.获取子单位列表
 *  @param codeid
 *  @author niepei
 *
 */
  public function sin_list(){
    $_POST = json_decode(file_get_contents('php://input'),true);
    $redata = array('code'=>1,'msg'=>'','data'=>array());
    $arr = explaincodeid($_POST['codeid']); 
    $prid = $arr['idv'];
    $tablename = 'single';
    $orderstr = 'sid desc'; 
    $arr = array('prid'=>$prid);
    $nowpage = $_POST['nowpage']?$_POST['nowpage']:1;
    $listnum = $_POST['listnum']?$_POST['listnum']:10;
    if($prid!=''){
    $field = 
    'sid,sname,prid,cengshu,type,fenqu,lastupdate,lasttime,jcriqi,jctime,
    ztjgriqi,ztjgtime,zxriqi,zxtime,wmriqi,wmtime,smyorder,jiegou';
    $mdata = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
    $mdata['datalist'] = setcodeid($mdata['datalist'],4);
    $mdata['codeid']=jiami(2*1);
    $redata['data'] = $mdata;
    }else{
      $redata['msg'] = '子单位参数错误';
    }
    $redata['post'] = $_POST;
    return json($redata);
  }

/**
 *  13.添加子工程
 *  @param codeid
 *  @author niepei
 *
 */
  public function sin_add(){   
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



/**
 *  15.删除子工程
 *  @param codeid
 *  @author niepei
 *
 */
  public function sin_del(){  
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

/**
 *  16.原材列表
 *  @param codeid
 *  @author niepei
 *
 */
  Public function yuancai_list(){
    //$_POST = json_decode(file_get_contents('php://input'),true);    
    $redata = array('code'=>0,'msg'=>'','data'=>array());
    $arr = explaincodeid(input('codeid')); 
    $prid = $arr['idv'];
    
    if($prid!=''){
    //获取原材送检
    $tablename = 'matter';
    $orderstr = 'morder asc'; 
    $arr = array('prid'=>$prid,'isdel'=>0);  
    if(input('yctype')>0){
      $arr['yctype']=input('yctype');
    }
    $nowpage = input('nowpage')?input('nowpage'):1;
    $listnum = input('listnum')?input('listnum'):10;
    $field = 'mid,mname,prid,morder,fid,buwei,stime,xinghao,jieguo,ycys,ypbh,changjia,intime,yczushu,yctype,qiangdu,guige,pinzhong,ccph,beizhu'; 
    $mdata = page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field);
    $mdata['datalist'] = setcodeid($mdata['datalist'],3);

    $mdata['codeid'] = jiami('3*1');
    $redata['data'] = $mdata;//$prid;
    $redata['code'] = 1;    
    }else{
      $redata['msg'] = '工程参数错误';
    }
    $redata['post'] = input();
    $redata['arr'] = $arr;
    return json($redata);
  }

/**
 *  17.添加原材
 *  @param codeid
 *  @author niepei
 */

  public function yuancai_add(){
    //$_POST = json_decode(file_get_contents('php://input'),true);
    $redata = array('code'=>0,'msg'=>'','data'=>array());
    $arr = explaincodeid($_POST['codeid']); 
    
    $prid = $arr['idv'];
    echo $prid;
    $_POST['prid']=$prid;
    $id=Db::connect("DB_Config_1")->name('matter')->data($_POST)->add();
    $redata['data'] = $id;
    return json($redata); 
  }


/**
 *  19.删除原材
 *  @param codeid
 *  @author niepei
 *
 */
  public function yuancai_del(){    
    $redata = array('code'=>1,'msg'=>'删除成功','data'=>array());
    $arr = explaincodeid($_POST['codeid']); 

    if ($arr) {
      //删除子单位
      $condition = array('mid'=>$arr['idv']);
      $tbn = 'matter';
      $data = comdel($tbn,$condition);
    }else{
      $redata['code'] = 0;
      $redata['msg'] = '参数错误';
    }
    return json($redata);
  }

/**
 *  20.获取送检部位列表
 *  @param  codeid
 *  @author niepei
 *
 */
  Public function songjian_list(){
     // $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $sid = $arr['idv'];  //真实id
      if ($sid!='') {
        $tablename = 'songjian'; //表名
        $orderstr = 'byriqi asc';
        $arr = array('sid'=>$sid,'isdel'=>0); //查询条件 

$filed = getsjtype($_POST['type']); 
        // $filed = $temparr[$_POST['type']] ;
        //echo  $filed;
        $data = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
        /*$data = nopage_select_byarr_($tablename,$orderstr,$arr);*/


foreach ($data['datalist'] as $key => &$value) {
    if($value['fid']){
      $value['fid']=explode(',',$value['fid']);
    }
}
// 如果是同养，则计算温度
if($_POST['type']=='ty'){
$today = time();

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

}
 

isset($tytemlist)?$data['tytemlist'] = $tytemlist:'';
        $data['datalist'] = setcodeid($data['datalist'],4); //将返回数据的id进行加密
        $data['codeid'] = jiami('4*1');
        $redata['data'] = $data;
      }
      else{
        $redata['code'] = 0;
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}



/**
 * 21.添加送检部位
 *@param  codeid
 *@author niepei
 *
 */
  Public function songjian_add(){
      $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $sid = $arr['idv'];  //真实id
      $id = Db::connect("DB_Config_1")->name('songjian')->data($_POST)->add();
      $redata['data']=$id;
      return json($redata);
}


/**
 * 23.删除送检
 *
 */
  public function songjian_del(){     
      $redata = array('code'=>1,'msg'=>'删除成功','data'=>array());
      $arr = explaincodeid($_POST['codeid']);
      if ($arr) {
      $condition = array('tid'=>$arr['idv']);
      $tbn = 'songjian';
      $data = comdel($tbn,$condition);
    }else{
      $redata['code'] = 0;
      $redata['msg'] = '参数错误';
    }
    return json($redata);
  }
  



/**
 * 24.送检汇总
 *
 *
 */
  public function hshz(){
  $_POST = json_decode(file_get_contents('php://input'),true);  
    if(!session('nowprid')>0){
      $art['reply']=0;
          $arxx['data']=$art;
        return json($arxx);
    }
    $ar = array(); 

    $ntime = strtotime(Date('Y-m-d',time()));
    $qtime = $ntime+7*24*60*60;   
    $btime = $_POST["btime"]==''?$ntime:strtotime($_POST["btime"]);
    $etime = $_POST["etime"]==''?$qtime:strtotime($_POST["etime"]); 

    $prid = session("nowprid");
    $table= "songjian";
     
    $order = "bytime asc"; 
    $str = "cy_songjian.prid=".$prid." and byys=0 and bytime>=".$btime." and bytime<=".$etime; 
    $art['by'] = ys_sel_hz($table,$str,$order);

    $order = "tytime asc"; 
    $str = "cy_songjian.prid=".$prid." and tyornot=1 and tyys=0 and tytime>=".$btime." and tytime<=".$etime; 
    $art['ty'] = ys_sel_hz($table,$str,$order);

    $order = "kstime asc"; 
    $str = "cy_songjian.prid=".$prid." and ksornot=1 and ksys=0 and kstime>=".$btime." and kstime<=".$etime; 
    $art['ks'] = ys_sel_hz($table,$str,$order);

    $order = "zttime asc"; 
    $str = "cy_songjian.prid=".$prid." and ztornot=1 and ztys=0 and zttime>=".$btime." and zttime<=".$etime; 
    $art['zt'] = ys_sel_hz($table,$str,$order);

    $order = "dztime asc"; 
    $str = "cy_songjian.prid=".$prid." and dzornot=1 and dzys=0 and dztime>=".$btime." and dztime<=".$etime; 
    $art['dz'] = ys_sel_hz($table,$str,$order);

    $order = "qztime asc"; 
    $str = "cy_songjian.prid=".$prid." and  qzornot=1 and qzys=0 and qztime>=".$btime." and qztime<=".$etime; 
    $art['qz'] = ys_sel_hz($table,$str,$order);

    $order = "nqtime asc"; 
    $str = "cy_songjian.prid=".$prid." and nqornot=1 and nqys=0 and nqtime>=".$btime." and nqtime<=".$etime; 
    $art['nq'] = ys_sel_hz($table,$str,$order);

    $order = "wqtime asc"; 
    $str = "cy_songjian.prid=".$prid." and wqornot=1 and wqys=0 and wqtime>=".$btime." and wqtime<=".$etime; 
    $art['wq'] = ys_sel_hz($table,$str,$order);

    $order = "zptime asc"; 
    $str = "cy_songjian.prid=".$prid." and zpornot=1 and zpys=0 and zptime>=".$btime." and zptime<=".$etime; 
    $art['zp'] = ys_sel_hz($table,$str,$order);

    $order = "stime asc";
    $str = "prid=".$prid." and ycys=0 and stime>=".$btime." and stime<=".$etime; 
    $table = 'matter';
    $art['yc'] = ys_sel_yc($table,$str,$order);
  
    $arxx['data'] = $art;
    $arxx['post'] = $_POST; 
    return json($arxx);
     //
    }


/**
 * 处理送检汇总的辅助方法
 * 
 */
private function dealAfter($field,$str,$order){
  $sql = "SELECT {$field} FROM cy_songjian t1 LEFT JOIN cy_single t2 ON t1.prid = t2.prid AND t1.sid = t2.sid WHERE  t1.sid = t2.sid AND t1.isdel = 0 AND  {$str} ORDER BY {$order}";
  $data = Db::connect("DB_Config_1")->name('songjian')->query($sql);
  if($data){
    $re = setcodeid($data,4); //将返回数据的id进行加密           
    return $re;
  }else{
    return array();
  }
}


/**
 * 送检汇总优化版本
 *
 */
public function songjianhuizong(){
    // $_POST = json_decode(file_get_contents('php://input'),true);  
    if(!session('nowprid')>0){
      $art['code']=0;
      $arxx['data']=$art;
      return json($arxx);
    }else{
      $prid = session("nowprid");
    }

    $art = array(); 
    $ntime = strtotime(Date('Y-m-d',time()));
    $qtime = $ntime+7*24*60*60;   
    $btime = $_POST["btime"]==''?$ntime:strtotime($_POST["btime"]);
    $etime = $_POST["etime"]==''?$qtime:strtotime($_POST["etime"]); 
    
    //标养 
    $field = 't2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byyl,t1.byzushu,t1.byriqi,t1.bytime,t1.byys,t1.byjg,t1.xinpian,t1.bybh';
    $str   = "t1.prid={$prid} AND t1.byys=0 AND t1.bytime>={$btime} AND t1.bytime<={$etime}"; 
    $order = "t1.bytime ASC";
    $art['by'] = $this->dealAfter($field,$str,$order); 


    //同养
    $field = 't2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.tyys,t1.tyzushu,t1.sumtemp,t1.gototime,t1.byriqi,t1.tytime,t1.tybh,t1.tyjg';
    $str   = "t1.prid={$prid} AND t1.tyornot=1 AND t1.tyys=0 AND t1.tytime>={$btime} AND t1.tytime<={$etime}"; 
    $order = "t1.tytime ASC"; 
    $art['ty'] = $this->dealAfter($field,$str,$order); 


    $field = 't2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byriqi,t1.kszushu,t1.ksdengji,t1.kstime,t1.ksys,t1.ksbh,t1.ksjg';
    $order = "t1.kstime ASC"; 
    $str   = "t1.prid=".$prid." AND t1.ksornot=1 AND t1.ksys=0 AND t1.kstime>={$btime} AND t1.kstime<={$etime}"; 
    $art['ks'] = $this->dealAfter($field,$str,$order); 


    $field = 't2.*,t1.tid,fid,myorder,bybuwei,byqiangdu,byriqi,ztzushu,zttime,ztys,ztbh,ztjg';
    $str   = "t1.prid={$prid} AND t1.ztornot=1 AND t1.ztys=0 AND t1.zttime>={$btime} AND t1.zttime<={$etime}";
    $order = "t1.zttime ASC";  
    $art['zt'] = $this->dealAfter($field,$str,$order); 


    $field = 't2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byriqi,t1.dzzushu,t1.dztime,t1.dzguige,t1.Dzys,t1.dzbh,t1.dzjg';
    $str   = "t1.prid={$prid} AND t1.dzornot=1 AND t1.dzys=0 AND t1.dztime>={$btime} AND t1.dztime<={$etime}";
    $order = "t1.dztime ASC";  
    $art['dz'] = $this->dealAfter($field,$str,$order); 

    
    $field = 't2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byriqi,t1.qzzushu,t1.qzriqi,t1.qztime,t1.qzqiangdu,t1.qzys,t1.qzbh,t1.qzjg';
    $str   = "t1.prid={$prid} AND  t1.qzornot=1 AND t1.qzys=0 AND t1.qztime>={$btime} AND t1.qztime<={$etime}"; 
    $order = "t1.qztime ASC"; 
    $art['qz'] = $this->dealAfter($field,$str,$order); 

    
    $field='t2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byriqi,t1.nqzushu,t1.nqriqi,t1.nqtime,t1.nqqiangdu,t1.Nqys,t1.nqbh,t1.nqjg';
    $str = "t1.prid={$prid} AND t1.nqornot=1 AND t1.nqys=0 AND t1.nqtime>={$btime} AND t1.nqtime<={$etime}";
    $order = "t1.nqtime ASC"; 
    $art['nq'] = $this->dealAfter($field,$str,$order); 


    $field = 't2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byriqi,t1.wqzushu,t1.wqriqi,t1.wqtime,t1.wqqiangdu,t1.Wqys,t1.wqbh,t1.wqjg';
    $order = "t1.wqtime ASC"; 
    $str = "t1.prid={$prid} AND t1.wqornot=1 AND t1.wqys=0 AND t1.wqtime>={$btime} AND t1.wqtime<={$etime}";
    $art['wq'] = $this->dealAfter($field,$str,$order); 


    $field = 't2.*,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byriqi,t1.zpzushu,t1.zpriqi,t1.zptime,t1.zpqiangdu,t1.Zpys,t1.zpbh,t1.zpjg';
    $order = "t1.zptime ASC"; 
    $str = "t1.prid={$prid} AND t1.zpornot=1 AND t1.zpys=0 AND t1.zptime>={$btime} AND t1.zptime<={$etime}";
    $art['zp'] = $this->dealAfter($field,$str,$order); 

    
    $sql = "SELECT  * FROM  cy_matter WHERE prid={$prid} AND ycys=0 AND stime>={$btime} AND stime<={$etime} ORDER BY stime ASC";
    $re = Db::connect("DB_Config_1")->name('matter')->query($sql);
    $re = setcodeid($re,3);
    $art['yc'] = $re;   
  

    $arxx['data'] = $art;
    $arxx['post'] = $_POST; 
    return json($arxx);
}



Public function program_gether(){
      // $_POST = json_decode(file_get_contents('php://input'),true);
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
      $redata['btime'] = $btime;
      $redata['etime'] = $etime;
      return json($redata);
}

  
  /**
 *  25.获取进度列表
 *  @param  codeid
 *  @author niepei
 *
 */
  public function jindu_list(){
      
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $prid = $arr['idv'];  //真实id
      if ($prid!='') {
        $tablename = 'jincheng'; //表名
        $orderstr = '';
        $field = 'jid,jorder,prid,fid,jname,jshuoming,jdyw,wtime';
        $arr = array('prid'=>$prid); //查询条件
        $data = nopage_select_byarr_field($tablename,$orderstr,$arr,$field);
        $data['datalist'] = setcodeid($data['datalist'],4); //将返回数据的id进行加密
        $data['codeid'] = jiami('4*1');
        $redata['data'] = $data;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata);
  }


//进度管理-子单位进度图详情
//  Public function program_work_sinimage(){      
//       $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
//       $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
//       $sid = $arr['idv'];  //真实id
//       if ($arr) {
//         $tablename = 'songjian'; //表名
//         $orderstr = 'myorder desc';
//         $arr = array('sid'=>$sid,'isdel'=>0); //查询条件
//         $filed = 'isdel,fid,bybuwei,byqiangdu,byriqi,bytime,byys,cmornot,cmtime,cmys,dzriqi,dztime,dzys,dzname,ksornot,kstime,ksys,nqornot,nqriqi,nqtime,nqys,wqornot,wqriqi,wqtime,wqys,zpornot,zpriqi,zptime,zpys,tyornot,tytime,tyys,ztornot,zttime,ztys';
//         $data = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
//         $ret = sinimage($data['datalist']);
//         $redata['data'] = $ret;
//       }
//       else{
//         $redata['msg'] = '参数有误';
//       }
//       return json($redata);
// }

//进度管理-子单位统计信息详情
// Public function program_work_sincount(){     
//       $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
//       $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
//       $prid = $arr['idv'];  //真实id
//     if ($arr){ 
//       $redata['data'] = procount($prid); 
//     }else{
//       $redata['code'] = 0;
//       $redata['msg'] = '参数有误';
//     }
//     return json($redata);
// }


 

 

//进度管理-子单位进度图详情
 Public function program_work_sinimage(){ 
      // $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；     
      $arr = explaincodeid($_POST['codeid']); //解密传过来的codeid，获取真实id
      $sid = $arr['idv'];  //真实id
      if ($arr) {
        $tablename = 'songjian'; //表名
        $orderstr = 'myorder desc';
        $arr = array('sid'=>$sid,'isdel'=>0); //查询条件
        $filed = 'isdel,fid,bybuwei,byqiangdu,byriqi,bytime,byys,cmornot,cmtime,cmys,dzriqi,dztime,dzys,dzname,ksornot,kstime,ksys,nqornot,nqriqi,nqtime,nqys,wqornot,wqriqi,wqtime,wqys,zpornot,zpriqi,zptime,zpys,tyornot,tytime,tyys,ztornot,zttime,ztys,byzushu,tyzushu,kszushu,ztzushu,cmzushu,dzzushu,qzzushu,wqzushu,nqzushu,zpzushu';
        $data = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
        $ret = sinimage($data['datalist']);
        $redata['data']['quanbu'] = qbcount($ret);
        $redata['data']['jichu'] = jichucount($ret);
        $redata['data']['zhuti'] = zhuticount($ret);
        $redata['data']['datalist'] = $ret;
      }
      else{
        $redata['msg'] = '参数有误';
      }
      return json($redata);
}

//进度管理-子单位统计信息详情
Public function program_work_matcount(){
      // $_POST = json_decode(file_get_contents('php://input'),true);
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


 



/**************************************公共方法********************************************/

//公共方法--add
public function com_ea(){
//$_POST = json_decode(file_get_contents('php://input'),true);

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
    $redata['arr'] = $arr;
    $redata['post'] = $_POST;
    $redata['msg'] = '参数错误';
    return json($redata);  
}

$_POST['create_time'] = time();

$d = addrealdata($_POST,$arr);  
$id = Db::connect("DB_Config_1")->name($d['tbn'])->insert($d['data']); 

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



 //公共方法--delete
public function com_ed(){
// $_POST = json_decode(file_get_contents('php://input'),true);
$redata = array('code'=>1,'msg'=>'删除成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$len = count(input('codeid'));
if($len>0){
  $tbn = '';
  $id = '';
  $idvstr = '';
  for ($i=0; $i < $len; $i++) { 
      $arr = explaincodeid(input('codeid')[$i]); 
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
$redata['post'] = input();
return json($redata);
}


//公共方法--update
public function com_em(){
//$_POST = json_decode(file_get_contents('php://input'),true);
$redata = array('code'=>1,'msg'=>'保存成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid(input('codeid'));
if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 
}else{
//还原成真正的数据,包含过滤敏感字段；
$d = realdata(input(),$arr); 
//存入数据库
$ad = Db::connect("DB_Config_1")->name($d['tbn'])->update($d['data']); 
$redata['code']=$ad?1:0;
$redata['msg']=$ad?'保存成功':'保存失败';
}
$redata['arr'] = $d;
$redata['post'] = input();
return json($redata);
}


//公共方法-- 查询原材一条记录
public function com_esyc(){ 
$redata = array('code'=>1,'msg'=>'成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid(input('codeid')); 
if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 
}else{
       $re = Db::connect("DB_Config_1")->name($arr['tbn'])->where(array($arr['id']=>$arr['idv']))->select();
       if($re){
        $redata['data'] =  setcodeid($re,$arr['num'])[0];
      }else{
        $redata['data'] = array();
      }
 

}
// $redata['arr'] = $arr;
// $redata['post'] = $_POST; 

return json($redata);
}




//公共方法-- 查询送检表  一条记录
public function com_essj(){ 
$redata = array('code'=>1,'msg'=>'成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid(input('codeid')); 
if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 
}else{

$filed = getsjtype(input('type'));

       $data = Db::connect("DB_Config_1")->name($arr['tbn'])->where(array($arr['id']=>$arr['idv']))->field($filed)->select();
      

foreach ($data as $key => &$value) {
  if($value['fid']){
    $value['fid']=explode(',',$value['fid']);
  }
}

if(input('type')=='ty'){
  $today = time(); 
     $tem = findtongyang($data);
  $tytemlist = $tem['datalist'];
    // 遍历，计算温度
    foreach ($data as $key => &$value) {
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
}
      


       if($data){
        isset($tytemlist)?$redata['tem'] = $tytemlist:'';
        $redata['data'] =  setcodeid($data,$arr['num'])[0];
      }else{
        $redata['data'] = array();
      }
 

}
// $redata['arr'] = $arr;
// $redata['post'] = $_POST; 

return json($redata);
}




public function wendu(){ 
$redata = array('code'=>1,'msg'=>'成功','data'=>array());//1、定义返回数据格式；
//对codeid 进行解密；
$arr = explaincodeid(input('codeid')); 
if(!$arr){
  $redata['code'] = 0;
  $redata['msg'] = '参数错误'; 
}else{

$filed = getsjtype(input('type'));

$data = Db::connect("DB_Config_1")->name($arr['tbn'])->where(array($arr['id']=>$arr['idv']))->field($filed)->select();
if($data){
  $redata['data'] = makewendulist($data); 
}else{
        $redata['data'] = array();
      }
 

}
// $redata['arr'] = $arr;
// $redata['post'] = $_POST; 

return json($redata);
}


/*
 * 解绑qq，微信，手机号
 */
public  function unbind(){
  // $_POST = json_decode(file_get_contents("php://input"),true);
  $redata = array('code' => 1,'msg'=>"",'data'=> array());
  $uid = getuser()['uid'];
  $type = $_POST['type'];

    //解绑手机
    if($type == '1'){
      $result = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->save(array('tel'=>''));
     // $sql = 'UPDATE cy_user SET tel = NULL WHERE uid = '.$uid.'';
    //解绑qq
    }else if ($type == '2') {
      $result = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->save(array('qqimg'=>'','qqopenid'=>'','qqnickname'=>''));
      // $sql = 'UPDATE cy_user SET qqimgurl = NULL,qqopenid=NULL, qq = NULL WHERE uid = '.$uid.'';
    //解绑微信公众号
    }else if ($type == '3') {
      $result = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->save(array('wechatimg'=>'','wechatopenid'=>'','wechatnickname'=>''));
      // $sql = 'UPDATE cy_user SET wechatopenid = NULL,weixin = NULL   WHERE uid = '.$uid.'';
    //解绑微信pc
    }else if ($type == '4') {
      $result = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->save(array('pcweimg'=>'','pcweopenid'=>'','pcwenickname'=>''));
      // $sql = 'UPDATE cy_user SET wechatopenid = NULL,weixin = NULL   WHERE uid = '.$uid.'';
    }

  // $result = Db::connect("DB_Config_1")->name('user')->execute($sql);
  if($result){
      $redata['code']='1';
      $redata['msg'] = 'success';
    }else{
      $redata['code']='0';
      $redata['code']='0';
    }
  return json($redata);
}







/**************************************微信功能********************************************/





/*
 *  001.个人信息
 */
public function getuserinfo(){
  $_POST = json_decode(file_get_contents('php://input'),true);
  $uid = getuser()['uid'];
  $redata = array('code'=>1,'msg'=>'','data'=>array());
  //nowadress 地址；workname 职业；nicheng 昵称；wechatimg 微信头像地址
  $field = 'username,realname,tel,email,nowadress,sex,workname,ctidv,nicheng,photourl,wechatimg,maxprogram,uid';
  $data = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid,'lockey'=>'0'))->field($field)->find();
  if($data){
$totalnum = sumtuijian($data['uid']);
  $data['totalnum'] = $totalnum;
  $data['tuijian'] = $data['uid'];  
  unset($data['uid']);      
  $redata['data']=$data; 
  $redata['msg']='success';    
  }else{
  $redata['code'] = 0;
  $redata['msg'] = '获取个人信息失败';
  }
  return json($redata);
}



/*
 * 002.通过openid获取微信用户的基本信息
 */
public function getWeChatUserInfo(){

  $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；
  $uid = getuser()['uid'];
  
 
  $appid = 'wx7f78ed44b12f996f';
  $appsecret = '7d9b489b921ac5276baf897507e04c60';
  
  $access_token = get_access_token($appid,$appsecret);
  $openid = session('openid');
  $url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN';

  $url = str_replace('ACCESS_TOKEN', $access_token, $url);
  $url = str_replace('OPENID', $openid, $url);
  echo $url;
  $jsoninfo = getcurl($url);

  if($jsoninfo['errcode']){
    var_dump($jsoninfo);
    $redata['code']='0';
  }else{
    $headimgurl = $jsoninfo['headimgurl'];
    $nickname = $jsoninfo['nickname'];
    $openid = $jsoninfo['openid']; 
    $sql = "UPDATE cy_user SET wechatimg = '.$headimgurl.',pcwenickname = '.$nickname.' WHERE uid = '.$uid.' AND wechatopenid ='.$openid.' ";
    M()->execute($sql);
    $redata['msg']='success';
    $redata['data'] = $jsoninfo;
  }
  return json($redata);
}

 

/*
 *  004.修改密码
 */ 
public  function password(){
  //$_POST = json_decode(file_get_contents('php://input'),true);
  $uid = getuser()['uid'];
  $redata = array('code'=>1,'msg'=>'','data'=>array());
  $field = 'password';
  $data = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid,'lockey'=>'0'))->field($field)->find();
  $password = input('oldpasswd','','md5');
  if($password != $data['password']){
    $redata['code'] = 0;
    $redata['msg'] = '请输入正确的原始密码';
  }else{
    $password = input('newpasswd','','md5');
    $data['password'] = $password ;
    $result = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->update($data);
    if($result>0){
      $redata['msg']='密码修改成功';
    }else{
      $redata['code']='0';
      $redata['msg']='密码修改失败';
    }
  }
  return json($redata);
}

  

/*
 *  005.编辑用户信息
 */ 
public function edituserinfo(){ 
  $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；   
  unset($_POST['uid']);
  $ad = Db::connect("DB_Config_1")->name('user')->where(['uid'=>getuser()['uid']])->update($_POST); 
  $redata['code']=$ad?1:0;
  $redata['msg']=$ad?'保存成功':'保存失败';
  return json($redata);
}


/*
 *  007.手机绑定--修改绑定手机
 */ 
public  function tel(){ 
 $redata = array('code'=>1,'msg'=>'','data'=>array());
 if(input('phcode') == session('phcode')&&input('tel')==session('tel')){
    $uid = getuser()['uid'];  
    $data['tel'] = input('tel');

    //先查该号码是否绑定过
    $re=Db::connect("DB_Config_1")->name('user')->where(['tel'=>input('tel')])->find();
    if($re)return json(['code'=>0,'msg'=>'该号码已经绑定过']);

    $ad = Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$uid))->update($data);
   $redata['code']=$ad?1:0;
   $redata['msg']=$ad?'保存成功':'保存失败';
  }else{
   $redata['code']=0;
   $redata['msg']='验证码有误';
  }
  $redata['post'] = input();
  $redata['post1'] = session('phcode').session('tel');
  return json($redata); 
}

  
 
//送检记录-保存送检记录
Public function program_gether_save(){ 
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

      $re = Db::connect("DB_Config_1")->name('jilu')->insert($savedata);
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









}