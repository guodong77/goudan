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
class ZiliaoController extends CommonController {
 





//获取 资料数据
Public function getzldata(){
      // $_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式； 
           //构造 返回数据结构 
        
      //获取用户信息 
      $uid = 5;//getuser()['uid'];      
      //解析工程prid
      if(!input('prcodeid'))return rejson(0,'参数设置错误',[],input());
      $parr = explaincodeid(input('prcodeid'));
      $prid = $parr['idv'];
      $prdata = null;
      $sindata=null;
      if($prid){
        $prdata = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$prid))->find();
      }
     

     if(input('scodeid')){
        //子单位id
        $parr = explaincodeid(input('scodeid'));
        $sid = $parr['idv'];
        $sindata = null;
        if($sid){
          $sindata = Db::connect("DB_Config_1")->name('single')->where(array('sid'=>$sid))->find();
        }
      }
      
      $tidarr = array();

      if(input('codeid')){
        $tr = explode(',',input('codeid')); 
        for ($i=0; $i < count($tr); $i++) { 
            $tidarr[] = explaincodeid($tr[$i])['idv'];
        } 
      }


      if(input('bwid')){
        $tidarr = explode(',',input('bwid'));
      }

      $code = input('code');
      $tb = Db::connect("DB_Config_1")->name('tongbiao')->where(array('code'=>$code))->find();
      $tbid = $tb['tbid'];


      // 对codeid 进行判断
      // 多个codeid一张表；   多个codeid 多张表的情况；
      // 因此，调用方法，带code进去，让它自行判断；
      $redata['data'] = $this->findzlx(0,$code,$tidarr,$prdata,$sindata,input('type'));   
      // 最少返回 1个，或者 返回多个表 

    return json($redata); 
  }




private function findzlx($tbid=0,$code,$bwidarr,$prdata,$sindata,$type){
// 实体混凝土养护情况记录表    多-多
// 混凝土同条件养护试件日累计养护温度记录表    多-多
// 混凝土拆模申请 多-多
// 混凝土试块试验结果汇总表    多-1
// 混凝土抗压强度计算表  多-1
// 钢筋机械连接接头检验报告汇总表 多-1
// 钢筋(钢材、钢管、螺栓)连接检验报告汇总表   多-1
// 砂浆试块试验结果汇总表 多-1
// 砂浆抗压强度计算表   多-1
    
// 工程材料、构配件、设备报审表  多-1
// 质量证明文件汇总表   多-1
// 钢筋核查记录表 多-1
// 水泥出厂、复验质量证明文件汇总表    多-1
// 粗(细)骨料合格证、试验报告汇总表   多-1
// 原材料合格证、试验报告汇总表  多-1
// 墙体节能工程质量证明文件汇总表 多-1
// 墙体节能工程见证取样复验报告汇总表   多-1
    
// 门窗节能工程质量证明文件汇总表 多-1
// 门窗节能工程见证取样复验报告汇总表   多-1
    
// 屋面节能工程质量证明文件汇总表 多-1
// 屋面节能工程见证取样复验报告汇总表   多-1


   
    //获取用户信息 
    $uid = 5;//getuser()['uid']; 
    $re = array();

    switch ($code){ 
        







       //工程建设前期法定基建程序文件核查表
        case 'GD-A1-117': 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);
      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
// p($sarr);

      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['savestr']);
        $re['has']=1;
        $re['zlcodeid']=$zlcodeid['codeid'];
        $re['acodeid']=$aid[0]['codeid'];
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();

             $b[0] = $prdata['prname'];
             $b[1] = $prdata['gcdizhi'];
             $b[2] = '规模';
             $b[3] = '类别';
             $b[4] = $prdata['cengshu'];
             $b[5] = $prdata['dxcengshu'];
             $b[6] = $prdata['jsname'];
             $b[7] = $prdata['kcname'];
             $b[8] = $prdata['sjname'];
             $b[9] = $prdata['sgname'];
             $b[10] = $prdata['jlname'];
             $b[11] = '审图';




          for ($j=0; $j < 16; $j++) { 
              $d[$j] = '检查结果检查结果';
          } 

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>''); 
          }
    break; 



















       //施工现场质量管理检查记录 
        case 'GD-C1-318': 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);
      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
// p($sarr);

      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['savestr']);
        $re['has']=1;
        $re['zlcodeid']=$zlcodeid['codeid'];
        $re['acodeid']=$aid[0]['codeid'];
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();

             $b[0] = $prdata['prname'];
             $b[1] = $prdata['sgxukehao'];
             $b[2] = '监督';
             $b[3] = $prdata['jlname'];
             $b[4] = $prdata['zongjian'];
             $b[5] = $prdata['zhuanjian'];
             $b[6] = $prdata['sgname'];
             $b[7] = $prdata['sgfuzeren'];
             $b[8] = $prdata['xmjishu'];



          for ($j=0; $j < 15; $j++) { 
              $d[$j] = '记录记录记录';
          } 

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>''); 
          }
    break; 











       //施工层基线复核记录 
        case 'GD-C4-629': 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);
      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
// p($sarr);

      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['savestr']);
        $re['has']=1;
        $re['zlcodeid']=$zlcodeid['codeid'];
        $re['acodeid']=$aid[0]['codeid'];
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();

             $b[0] = '工程名称';
             $b[1] = $prdata['sgname'];
             $b[2] = '部位';
             $b[3] = '仪器';
             $b[4] = '引上轴线';
             $b[5] = '引测水准';



             $d[0]='示意图';
             $d[1]='结果';


            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>''); 
          }
    break; 






       //烟气(风)道工程检查记录表 
        case 'GD-C4-6356': 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);
      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
// p($sarr);

      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['savestr']);
        $re['has']=1;
        $re['zlcodeid']=$zlcodeid['codeid'];
        $re['acodeid']=$aid[0]['codeid'];
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();

             $b[0] = $sindata['sname'];
             $b[1] = $prdata['sgname'];
             $b[2] = '分部';
             $b[3] = '编号';

             //获取该子单位下的部位
             $buweidata=Db::connect("DB_Config_1")->name('songjian')->where(['sid'=>$sindata['sid']])->field('bybuwei')->select();
             foreach ($buweidata as $key => $value) {
               $c[$key][]=$key+1;
               $c[$key][]=$value['bybuwei'];
               $c[$key][]='';
               $c[$key][]='';
               $c[$key][]='';
               $c[$key][]='';
               $c[$key][]='';
               $c[$key][]='';
               $c[$key][]='';
               $c[$key][]='';
               $c[$key][]='';
             }

             $d=[];

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>''); 
          }
    break; 









       //钢筋加工检验批质量验收记录  
        case 'GD-C5-71160': 
    // 通过一个部位id 获取这个部位的  时间 和 城市，去获取温度   
    $weadata = getweatherbybuweiid($sindata['sid'],$prdata['cityid']);
    for ($i=0; $i < count($bwidarr); $i++) { 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);

      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $td = Db::connect("DB_Config_1")->name('songjian')->where(array('tid'=>$bwidarr[$i]))->find(); 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；

        $redata=json_decode($zlcodeid['savestr']);
        $redata->has=1;
        $redata->zlcodeid=$zlcodeid;
        $redata->acodeid=$aid[0]['codeid'];
        $re[] =  $redata;

      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();

             $a=$prdata;
             $a[0]=$prdata['sgname'];
             $a[1]=$prdata['sgfuzeren'];

             $b[0] = $prdata['prname'].'——'.$sindata['sname'];
             $b[1] = $td['bybuwei'];
             $b[2] = '分项';
             $b[3] = $prdata['sgname'];
             $b[4] = $prdata['sgfuzeren'];
             $b[5] = 10;
             $b[6] = $prdata['fbname'];
             $b[7] = '少字段';
             $b[8] = $td['bybuwei'];
             $b[9] = '施工';
             $b[10] = '验收';


           $bwea = getdaysweather($weadata,$td['byriqi']);
          for ($j=0; $j < 7; $j++) { 
              $d[$j] = '通过';
          } 

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>'');
          } 
    } 
    break; 




       //钢筋安装检验批质量验收记录  
        case 'GD-C5-71162': 
    // 通过一个部位id 获取这个部位的  时间 和 城市，去获取温度   
    $weadata = getweatherbybuweiid($sindata['sid'],$prdata['cityid']);
    for ($i=0; $i < count($bwidarr); $i++) { 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);

      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $td = Db::connect("DB_Config_1")->name('songjian')->where(array('tid'=>$bwidarr[$i]))->find(); 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；

        $redata=json_decode($zlcodeid['savestr']);
        if($redata){
         $redata->has=1;
          $redata->zlcodeid=$zlcodeid;
          $redata->acodeid=$aid[0]['codeid'];         
        }
        $re[] =  $redata;
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();

             $a=$prdata;
             $a[0]=$prdata['sgname'];
             $a[1]=$prdata['sgfuzeren'];

             $b[0] = $prdata['prname'].'——'.$sindata['sname'];
             $b[1] = $td['bybuwei'];
             $b[2] = '分项';
             $b[3] = $prdata['sgname'];
             $b[4] = $prdata['sgfuzeren'];
             $b[5] = 10;
             $b[6] = $prdata['fbname'];
             $b[7] = '少字段';
             $b[8] = $td['bybuwei'];
             $b[9] = '施工';
             $b[10] = '验收';


           $bwea = getdaysweather($weadata,$td['byriqi']);
          for ($j=0; $j < 7; $j++) { 
              $d[$j] = '通过';
          } 

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>'');
          } 
    } 
    break; 







       //地基与基础汇总表
        case 'GD-C5-7312': 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);
      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
// p($sarr);

      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['savestr']);
        $re[0]['has']=1;
        $re[0]['zlcodeid']=$zlcodeid['codeid'];
        $re[0]['acodeid']=$aid[0]['codeid'];
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();
            
             $b[0] = $prdata['prname'].'——'.$sindata['sname'];
             $b[1] = $prdata['sgname'];
             $b[2] = $prdata['xmjishu'];
             $b[3] = $prdata['sgfuzeren'];
             $b[4] = '单位技术';
             $b[5] = $prdata['fbname'];
             $b[6] = '项目技术';
             $b[7] = '项目负责';
             $b[8] = '单位技术';

            //查该分部的子分部
            $fenbu=DB::connect("DB_Config_1")->name('archive_tree')->field('hzid')->where(['code'=>$code,'isdel'=>0])->find();
            $zifenbu=DB::connect("DB_Config_1")->name('archive_tree')->where(['pid'=>$fenbu['hzid'],'isdel'=>0])->select();

            foreach ($zifenbu as $key => $value) {
              $c[5*$key]=$key+1;
              $c[5*$key+1]=$value['name'];

              //查子分部的分项数
              $num=DB::connect("DB_Config_1")->name('archive_tree')->where(['pid'=>$value['id'],'isdel'=>0])->count();

              $c[5*$key+2]=$num;
              $c[5*$key+3]='';
              $c[5*$key+4]='';
            }

             
             $d=[];

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>''); 
          }
    break; 





       //基础汇总表
        case 'GD-C5-7311': 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；

      //先通过code去找aid
      $aid=Db::connect("DB_Config_1")->name('archive_tree')->where(['code'=>$code])->find();

      $aid=setcodeid([$aid],20,false);
      $sarr = array(
        'uid'=>$uid,
        'aid'=>$aid[0]['id'],
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
// p($sarr);

      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      $zlcodeid=setcodeid([$udata],19)[0];
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['savestr']);
        $re['has']=1;
        $re['zlcodeid']=$zlcodeid['codeid'];
        $re['acodeid']=$aid[0]['codeid'];
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();

             $b[0] = $prdata['prname'].'——'.$sindata['sname'];
             $b[1] = $prdata['sgname'];
             $b[2] = $prdata['xmjishu'];
             $b[3] = $prdata['sgfuzeren'];
             $b[4] = '单位技术';
             $b[5] = $prdata['fbname'];
             $b[6] = '项目技术';
             $b[7] = '项目负责';
             $b[8] = '单位技术';


            //找该子分部的分项
            $zifenbu=DB::connect("DB_Config_1")->name('archive_tree')->field('hzid')->where(['code'=>$code,'isdel'=>0])->find();
            $fenxiang=DB::connect("DB_Config_1")->name('archive_tree')->where(['pid'=>$zifenbu['hzid'],'isdel'=>0])->select();

            //查部位
            $bwnum=DB::connect("DB_Config_1")->name('songjian')->where(['sid'=>$sindata['sid'],'isdel'=>0])->count();


            foreach ($fenxiang as $key => $value) {
              $c[5*$key]=$key+1;
              $c[5*$key+1]=$value['name'];

              $c[5*$key+2]=$bwnum; 
              $c[5*$key+3]='';
              $c[5*$key+4]='';             
            }

             $d=[];

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c,'d'=>$d,'has'=>0,'zlcodeid'=>''); 
          }
    break; 











//亮-------------------------------------------------------------------------------------

        //混凝土实体养护记录   多-多
        case 'GD2301039': 
    // 通过一个部位id 获取这个部位的  时间 和 城市，去获取温度   
    $weadata = getweatherbybuweiid($sindata['sid'],$prdata['cityid']);
    for ($i=0; $i < count($bwidarr); $i++) { 
      // p($bwidarr);
      // 1、先去获取资料 zltable表 找看有没有；
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $td = Db::connect("DB_Config_1")->name('songjian')->where(array('tid'=>$bwidarr[$i]))->find(); 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();
             $b[0] = $prdata['prname'].'——'.$sindata['sname'];
             $b[1] = $td['bybuwei'];
             $b[2] = $td['byqiangdu']?'C'.$td['byqiangdu']:"";
             $b[3] = $td['ksdengji']?$td['ksdengji']:'/';
             $b[4] = '/';
             $b[5] = $prdata['shuini'];
             $b[6] = $prdata['waijiaji'];
             $b[7] = $prdata['canheliao'];
             $b[17] = "14天";


            $b[8] = $td['byriqi']==0?'':date("Y年m月d日",$td['byriqi']);
            $b[9] = $td['byriqi']==0?'':date("Y年m月d日",$td['byriqi']);
            $b[10] = $td['byriqi']==0?'':date("Y年m月d日",$td['byriqi']+24*60*60);
            // $b[3] = "";
            // $b[4] = "";
           $bwea = getdaysweather($weadata,$td['byriqi']);
          // p($bwea);
           if($bwea)
          for ($j=0; $j < 14; $j++) { 
            if ($bwea[$j]['wdate']) {
              $c[$j][0] = date("Y年m月d日",$bwea[$j]['wdate']);
              $c[$j][1] = $bwea[$j]['vtem'].'℃';
              $c[$j][2] = '浇水养护';

            }
          } 
            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $a['test']= $bwea;
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
          } 
    } 
    break; 





    // 混凝土同条件养护试件日累计养护温度记录表    多-多
    case 'GD2301065': 
    // 通过一个部位id 获取这个部位的  时间 和 城市，去获取温度   
    $weadata = getweatherbybuweiid($sindata['sid'],$prdata['cityid']);

   for ($i=0; $i < count($bwidarr); $i++) { 
      // 1、先去获取资料 zltable表 找看有没有；
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $td = Db::connect("DB_Config_1")->name('songjian')->where(array('tid'=>$bwidarr[$i]))->find(); 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] = json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据； 
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
             
            $b = array();
            $c = array();
            // p($td);
            $b[0] = $prdata['prname'].'——'.$sindata['sname'];
            $b[1] = $td['tyname']?$td['tyname']:$td['bybuwei'];
            $b[2] = $td['tyxinpian'];
            $b[3] = $td['tybh'];  
         
          $v = 0;$w = 0;$tem = 0;
          for ($j=0; $j < count($weadata); $j++) {
            $lastday = $td['tytime']==0?time():$td['tytime'];
            if($weadata[$j]['wdate']>$td['byriqi']&&$weadata[$j]['wdate']<=$lastday){ 
              $c[$v][0] = date("Y年m月d日",$weadata[$j]['wdate']);
              $c[$v][1] = $weadata[$j]['ltem'];
              $c[$v][2] = $weadata[$j]['htem'];
              $c[$v][3] = $weadata[$j]['vtem'];
              $c[$v][4] = '√';
              $c[$v][5] = $v+1;
              $tem += $weadata[$j]['vtem'];
              $c[$v][6] = $tem;
              $c[$v][7] = '';
              $v++;$w++;
            }
             
          } 

            $redata['has'] = 0;//默认设置 是没有用户数据的； 
            $a['test']= $weadata;
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
          } 
    } 
    break;





// 混凝土试块试验结果汇总表    多-1
    case 'GD2301042': 



     // 1、先去获取资料 zltable表 找看有没有；
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[0] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                    
            $b = array();
            $c = array(); 
 
       $bwidarr = implode(",", $bwidarr);  //[1,2]转"1,2"
       $sql = 'tid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('songjian')->where($sql)->select(); 

     if($type=='byornot'){
      //标准养护
         //对多组进行处理
         $data = dealbyzushu($data);
      }
if($type=='tyornot'){
  //同条件养护
  //对多组进行处理
   $data = dealtyzushu($data);
}  

//多对一 都采用这种模式
         $nre = array();
         for($i=0;$i<count($data);$i++){
            $q = floor($i/21);
            $v =$i%21; 
// strpos($string,"你要查找的字符串")
if(strstr($data[$i]['bybuwei'],'墙')||strstr($data[$i]['bybuwei'],'柱')){
      $mk = '墙柱';
    }else if(strstr($data[$i]['bybuwei'],'垫层')){
      $mk = '垫层';
    }else{
      $mk = '梁板';
    }

$baifenbi = round($data[$i]['jg']/$data[$i]['byqiangdu']*100,2);
$tianshu = $data[$i]['byriqi']==0||$data[$i]['bytime']==0?'':($data[$i]['bytime']-$data[$i]['byriqi'])/86400; 

            $nre[$q][$v][0] = $i+1;
            $nre[$q][$v][1] = $data[$i]['fid']==3?'基础':'主体'; 
            $nre[$q][$v][2] = $mk;
            $nre[$q][$v][3] = $data[$i]['bybuwei'];
            $nre[$q][$v][4] = $data[$i]['bh'];//str_replace(","," ",)
            $nre[$q][$v][5] = $data[$i]['byqiangdu']==0?'':'C'.$data[$i]['byqiangdu'];
            $nre[$q][$v][6] = $data[$i]['byriqi']==0?'':date("Y年m月d日",$data[$i]['byriqi']);
            $nre[$q][$v][7] = $tianshu?$tianshu:'';
            $nre[$q][$v][8] = $data[$i]['jg'];
            $nre[$q][$v][9] = $baifenbi==0?'':$baifenbi;
            
         } 
          

          //拼返回的数据
            $b = array();
            $c = array();
            $b[0] = $prdata['prname'].'——'.$sindata['sname'];
            $b[1] = $prdata['sgname'];
            // $b[2] = "123";
            // $b[3] = " ";
            // $b[4] = "byqiangdu";



            $redata['has'] = 0;//默认设置 是没有用户数据的；
            
            foreach ($nre as $key => $value) {
              $re[] = array('showfild'=>$nre,'bwidarr'=>$bwidarr,'b'=>$b,'c'=>$value); 
            }  
            
          } 

    break;
    // 混凝土抗压强度计算表  多-1
    case 'GD2301044': 

    // 混凝土计算表：
    // 1、按照标养 和同养分开计算
    // 2、通过强度分组；
    // 2、非统计方法：某强度，10组以下；
    // 3、统计方法：某强度，10及以上
 
      //标准养护
      //查询所有传进来的组数，然后进行分组；
      $bwidstr = implode(",", $bwidarr);  //[1,2]转"1,2"
      $sql = 'tid IN ('.$bwidstr.') and byqiangdu>0';
      $dataone = Db::connect("DB_Config_1")->name('songjian')->where($sql)->order('byqiangdu asc')->select();

if($type=='byornot'){
       $data = dealbyzushu($dataone); 
}

if($type=='tyornot'){
       $data = dealtyzushu($dataone); 
}


//通过强度进行分组；
$Cqd = array();
for ($i=0; $i < count($data); $i++) { 
  $byqiangdu = $data[$i]['byqiangdu'];
  $Cqd[$byqiangdu][] = $data[$i];
}

//多对一 都采用这种模式
$nre = array();
$i = 0;
foreach ($Cqd as $key => $value) {
   $q = floor($i/6);
   $v =$i%6;

   //对每一个强度进行计算；
   $qiangdu = $key;
   $zushu = count($value);
   $bit1 = '';
   $bit2 = '';
   $bit3 = '';
   $bit4 = '';
   $mfcu = '';
   $fcumin = '';
   $sfcu = '';
   $mfcusfcu = '';
    //标准值，就是设计值
   $fcuk = $qiangdu;

   $fcuk1 = '';
   $fcuk2 = '';
   $fcuk3 = '';
   $fcuk4 = '';
   $fcuk5 = '';
   $fcuk6 = '';

$hege = 0;
$pd0 = '';
$pd1 = '';
$pd2 = '';
$pd = '';
  

   //把强度先拿出来
   $qdarr = array();
   $sumqd = 0;
   foreach ($value as $key => $vl) {
      $sumqd += $vl['jg'];
      if($vl['jg']){ $qdarr[] = $vl['jg'];}
     
   }


   //------------------------------------------------------------------------------
   //  mfcu ---混凝土立方体抗压强度平均值值
   //  fcu,k ---同一检验批混凝土立方体抗压强度标准值 
  // n--样本容量
  // 入1-----合格判定系数  

  $nummm = $sumqd/count($value);
  $mfcu = round($nummm,1);
  // fcu,min ---同一检验批混凝土立方体抗压强度最小值
   sort($qdarr);
   $fcumin = $qdarr[0];



//采取统计方法或者非统计方法  1~9组，非统计方法；  10组以上统计方法；
if($zushu<10){
   $fangfa = '按非统计方法评定：';
 //非统计方法  
if($qiangdu<60){
    $bit3 = 1.15; 
    $fcuk6 = 1.15*$fcuk; 
}
if($qiangdu>=60){
    $bit3 = 1.10;
    $fcuk5 = 1.10*$fcuk;
}
    $bit4 = 0.95; 
    $fcuk3 = 0.95*$fcuk;

// 做出评定,非统计方法有两个评定条件：mfcu≥λ3·fcu,k  并且   fcu,min≥λ4·fcu,k 评定合格
 
if($mfcu>=$bit3*$fcuk){
 $pd1 = 'mfcu ≥ λ3·fcu,k;  ';
}else{
  $pd1 = 'mfcu < λ3·fcu,k;  ';
  $hege++ ;
}

if($fcumin>=$bit4*$fcuk){
 $pd2 = 'fcu,min ≥ λ4·fcu,k;  ';
}else{
  $pd2 = 'fcu,min < λ4·fcu,k;  ';
  $hege++;
}
$hegestr = $hege==0?'评定合格':'评定不合格';

$pd = $pd1.$pd2.$hegestr;



}

if($zushu>=10){
  $fangfa = '按统计方法评定：';
 //统计方法
  if($zushu>=10&&$zushu<=14){
    $bit1 = 1.15;
    $fcuk6 = 1.15*$fcuk;  
  }
  if($zushu>=15&&$zushu<=19){
    $bit1 = 1.05;
     $fcuk4 = 1.05*$fcuk; 
    
  }
  if($zushu>=20){
    $bit1 = 0.95;
    $fcuk3 = 0.95*$fcuk; 
    
  }

  
  if($zushu>=10&&$zushu<=14){
    $bit2 = 0.90;
    $fcuk2 = 0.90*$fcuk; 
     
  }
  if($zushu>=15){
    $bit2 = 0.85;
     $fcuk1 = 0.85*$fcuk; 
    
  }


  // sfcu--同一检验批混凝土立方体抗压强度标准差 
  $num = getVariance($mfcu, $qdarr);
  $sfcu = round($num,2);



//做出评定,统计方法有两个评定条件：mfcu≥λ3·fcu,k  并且   fcu,min≥λ4·fcu,k 评定合格 
if($sfcu<2.5){ 
    //$pd0 = 'Sfcu= '.$sfcu.' 小于 2.5,取Sfcu=2.50; ';
    $pd0 = '取Sfcu=2.50; ';
    $temsfcu = 2.50;
}

if($sfcu==2.5){
    $pd0 = 'Sfcu= '.$sfcu.' 等于 2.5,取Sfcu='.$sfcu.'; ';
    $temsfcu = $sfcu;
}

if($sfcu>2.5){
   $pd0 = 'Sfcu= '.$sfcu.' 大于 2.5,取Sfcu='.$sfcu.'; ';
    $temsfcu = $sfcu;
}



$xx = $mfcu - $bit1*$temsfcu;
$mfcusfcu = round($xx,2); 


if($mfcu>=$bit1*$temsfcu){
 $pd1 = 'mfcu='.$mfcu.' ≥ fcu,k+λ1*Sfcu='.($fcuk+$bit1*$temsfcu).'; ';
}else{
  $pd1 = 'mfcu='.$mfcu.' < fcu,k+λ1*Sfcu='.($fcuk+$bit1*$temsfcu).'; ';
  $hege++ ;
}

if($fcumin>=$bit2*$fcuk){
 $pd2 = 'fcu,min='.$fcumin.' ≥ λ2*fcu,k='.$bit2*$fcuk.'; ';
}else{
  $pd2 = 'fcu,min='.$fcumin.' < λ2*fcu,k='.$bit2*$fcuk.'; ';
  $hege++;
}
$hegestr = $hege==0?'评定合格':'评定不合格';

$pd = $pd0.$pd1.$pd2.$hegestr;
 
$sfcu = sprintf("%.2f",$temsfcu);

}



$str1 = '设计强度等级：C'.$qiangdu;
$str2 = $fangfa .$pd;


   $nre[$q][$v][0] = 'C'.$qiangdu;
   $nre[$q][$v][1] = $zushu;
   $nre[$q][$v][2] = $bit1;
   $nre[$q][$v][3] = $bit2;
   $nre[$q][$v][4] = $bit3;
   $nre[$q][$v][5] = $bit4;
   $nre[$q][$v][6] = sprintf("%.1f",$mfcu);
   $nre[$q][$v][7] = sprintf("%.1f",$fcumin);
   $nre[$q][$v][8] = $sfcu;
   $nre[$q][$v][9] = $mfcusfcu;
   $nre[$q][$v][10] = $fcuk1;
   $nre[$q][$v][11] = $fcuk2;
   $nre[$q][$v][12] = $fcuk3;
   $nre[$q][$v][13] = $fcuk4; 
   $nre[$q][$v][14] = $fcuk5;
   $nre[$q][$v][15] = $fcuk6;
   $nre[$q][$v][16] = $str1;
   $nre[$q][$v][17] = $str2;
   

$i++;
} 


       //拼返回的数据
            $b = array();
            $c = array();
            $b[0] = $prdata['prname'].'——'.$sindata['sname'];
            $b[1] = $prdata['sgname'];
            $b[2] = "123";
            $b[3] = " ";
            $b[4] = "byqiangdu";
            $b[5] = "";
            $b[6] = "";  
            
      foreach ($nre as $key => $value) {
        $re[] = array('showfild'=>$Cqd,'bwidarr'=>$bwidarr,'b'=>$b,'c'=>$value); 
      } 
        

    break;
//亮-------------------------------------------------------------------------------------

  































//聂佩-------------------------------------------------------------------------------------
// 混凝土拆模申请 多-多   
    case 'GD2301067': 
    for ($i=0; $i < count($bwidarr); $i++) { 
      // 1、先去获取资料 zltable表 找看有没有；
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $td = Db::connect("DB_Config_1")->name('songjian')->where(array('tid'=>$bwidarr[$i]))->find(); 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();
            $b[0] = $prdata['prname'].'——'.$sindata['sname'];
            $b[1] = $prdata['sgname'];
            $b[2] = $td['bybuwei'];
            $b[3] = $td['byriqi']==0?'':date("Y年m月d日",$td['byriqi']);
            $b[4] = $td['byriqi']==0?'':date("Y年m月d日",$td['byriqi']+(7*24*60*60));
            $b[5] = $td['byqiangdu'];
            $b[6] = $td['cmjg'];
            // p($td['cmtime']-$td['byriqi']);
            $b[7] = ($td['cmtime']-$td['byriqi'])/3600/24;
            $b[8] = $td['cmbh'];
            $c[0][0] = "";
            $c[1][0] = "";
            
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
          } 
    } 
    break;






// 钢筋机械连接接头检验报告汇总表 多-1
    case 'GB2301051': 
    // $sql = "prid = ${prid} and sid = ${sid} and  mid in (";
    // for ($i=0; $i < count($bwidarr); $i++) { 
    // $sql = $sql.$bwidarr[$i].",";
    // }
    // $sql = substr($sql, 0,-1).")";//截取0到倒数第二位，也就是去掉最后的逗号，然后加上右括号
    // 1、先去获取资料 zltable表 找看有没有；
    if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
    if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }  
    $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
    if($udata){ 
      //去获取用户数据直接赋值；
      $re[] =  json_decode($udata['temjson']);
      $redata['has'] = 1; 
    }else{
      //没有用户数据；去造系统数据；
      //b数据 —— 一维数组  ，无法从program里拿的；
      //c数据 —— 二维数组类型； c[0][0] 
      $b = array();
      $c = array();

      $b[0] = $prdata['prname'].'——'.$sindata['sname'];
      //查询所有传进来的组数，然后进行分组；
      $bwidstr = implode(",", $bwidarr);  //[1,2]转"1,2"
      $sql = 'tid IN ('.$bwidstr.')';
      $dataone = Db::connect("DB_Config_1")->name('songjian')->where($sql)->order('myorder asc')->select();
      $data = dealhjzushu($dataone);
      // p($data);

      for($j=0;$j<sizeof($data);$j++){
        $c[$j][0] = $j+1;//规格
        $c[$j][1] = $data[$j]['dzguige'];
        $c[$j][2] = $data[$j]['dzname']?$data[$j]['dzname']:$data[$j]['bybuwei'];//使用部位
        $c[$j][3] = $data[$j]['dztime']==0?'':date("Y年m月d日",$data[$j]['dztime']);
        $c[$j][4] = "";//代表数量
        $c[$j][5] = "";//备注
      }


//多对一 都采用这种模式
         $nre = array();
         for($i=0;$i<count($data);$i++){
            $q = floor($i/21);
            $v =$i%21; 

            $nre[$q][$v][0] = $i+1;
            $nre[$q][$v][1] = $data[$i]['dzguige']; 
            $nre[$q][$v][2] = $data[$i]['dzname']?$data[$i]['dzname']:$data[$i]['bybuwei'];
            $nre[$q][$v][3] = '';
            $nre[$q][$v][4] = $data[$i]['dztime']==0?'':date("Y年m月d日",$data[$i]['dztime']);
            $nre[$q][$v][5] = '';
            $nre[$q][$v][6] = '';            
         } 
          
      $redata['has'] = 0;//默认设置 是没有用户数据的； 
      // $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
      foreach ($nre as $key => $value) {
        $re[] = array('showfild'=>$nre,'bwidarr'=>$bwidarr,'b'=>$b,'c'=>$value); 
      }  

    } 
 
    break;





// 钢筋(钢材、钢管、螺栓)连接检验报告汇总表   多-1    *** 暂时跳过 ***
    case 'GD2301047': 
    if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
    if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }  
    $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
    if($udata){ 
      //去获取用户数据直接赋值；
      $re[] =  json_decode($udata['temjson']);
      $redata['has'] = 1; 
    }else{
      //没有用户数据；去造系统数据；
      //b数据 —— 一维数组  ，无法从program里拿的；
      //c数据 —— 二维数组类型； c[0][0] 
      $b = array();
      $c = array();

      $b[0] = $prdata['prname'].'——'.$sindata['sname'];
      //查询所有传进来的组数，然后进行分组；
      $bwidstr = implode(",", $bwidarr);  //[1,2]转"1,2"
      $sql = 'tid IN ('.$bwidstr.')';
      $dataone = Db::connect("DB_Config_1")->name('songjian')->where($sql)->order('myorder asc')->select();
      $data = dealhjzushu($dataone);
      // p($data);

//多对一 都采用这种模式
         $nre = array();
         for($i=0;$i<count($data);$i++){
            $q = floor($i/21);
            $v =$i%21; 
            $nre[$q][$v][0] = $i+1;
            $nre[$q][$v][1] = $data[$i]['dzbh']; //实验单号
            $nre[$q][$v][2] = '';
            $nre[$q][$v][3] = $data[$i]['dzguige'];//规格
            $nre[$q][$v][4] = '';
            $nre[$q][$v][5] = $data[$i]['dzriqi'];
            $nre[$q][$v][6] = $data[$i]['dztime'];    
            $nre[$q][$v][7] = '';
            $nre[$q][$v][8] = '';
            $nre[$q][$v][9] = $data[$i]['bybuwei'];   
            $nre[$q][$v][10] = '';
            $nre[$q][$v][11] = $data[$i]['dzjg'];          
         } 
          
      $redata['has'] = 0;//默认设置 是没有用户数据的； 
      // $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
      foreach ($nre as $key => $value) {
        $re[] = array('showfild'=>$nre,'bwidarr'=>$bwidarr,'b'=>$b,'c'=>$value); 
      }  
      }    
    break;





// 砂浆试块试验结果汇总表 多-1
    case 'GD2301043': 
    $prid=$prdata['prid'];
    $sid=$sindata['sid'];
    // 1、先去获取资料 zltable表 找看有没有；
    $sql = "prid = {$prid} and sid = ${sid} and  tid in (";
    for ($i=0; $i < count($bwidarr); $i++) { 
    $sql = $sql.$bwidarr[$i].",";
    }
    $sql = substr($sql, 0,-1).")";//截取0到倒数第二位，也就是去掉最后的逗号，然后加上右括号
    // 1、先去获取资料 zltable表 找看有没有；
    if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
    if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }  
    $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
    if($udata){ 
      //去获取用户数据直接赋值；
      $re[] =  json_decode($udata['temjson']);
      $redata['has'] = 1; 
    }else{
      //没有用户数据；去造系统数据；
      //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
      //b数据 —— 一维数组  ，无法从program里拿的；
      //c数据 —— 二维数组类型； c[0][0] 
      $a = array();
      $b = array();
      $c = array();

      $b[0] = $prdata['prname'].'——'.$sindata['sname'];
      $b[1] = $prdata['sgname'];

      $data = Db::connect("DB_Config_1")->name('songjian')->where($sql)->select();

      for($j=0;$j<sizeof($data);$j++){
        $c[$j][0] = $data[$j]['bybuwei'];
        $c[$j][1] = "";
        $c[$j][2] = $data[$j]['byqiangdu'];
        $c[$j][3] = "";
        $c[$j][4] = "";
        $c[$j][5] = "";
        $c[$j][6] = "";
      }

      $redata['has'] = 0;//默认设置 是没有用户数据的； 
      $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
      } 
    break;





// 砂浆抗压强度计算表   多-1  *** 尚未完成 ***
    case 'GD2301045': 
    $prid=$prdata['prid'];
    $sid=$sindata['sid'];
    // 1、先去获取资料 zltable表 找看有没有；
    $sql = "prid = {$prid} and sid = ${sid} and  tid in (";
    for ($i=0; $i < count($bwidarr); $i++) { 
    $sql = $sql.$bwidarr[$i].",";
    }
    $sql = substr($sql, 0,-1).")";//截取0到倒数第二位，也就是去掉最后的逗号，然后加上右括号
    // 1、先去获取资料 zltable表 找看有没有；
    if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
    if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }  
    $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
    if($udata){ 
      //去获取用户数据直接赋值；
      $re[] =  json_decode($udata['temjson']);
      $redata['has'] = 1; 
    }else{
      //没有用户数据；去造系统数据；
      //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
      //b数据 —— 一维数组  ，无法从program里拿的；
      //c数据 —— 二维数组类型； c[0][0] 
      $a = array();
      $b = array();
      $c = array();

      $b[0] = $prdata['prname'].'——'.$sindata['sname'];
      $b[1] = "";//结构层数及部位
      $b[2] = "";//养护条件及温度
      $b[3] = "";//砂浆设计强度等级
      $data = Db::connect("DB_Config_1")->name('songjian')->where($sql)->select();

      for($j=0;$j<sizeof($data);$j++){
        $c[$j][0] = "";
      }

      $redata['has'] = 0;//默认设置 是没有用户数据的； 
      $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
      } 
    break; 
//聂佩-------------------------------------------------------------------------------------



































//小创-------------------------------------------------------------------------------------
// 工程材料、构配件、设备报审表  多-1
    case 'GD220209':
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[0] 
      ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{
            //没有用户数据；去造系统数据；
            //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
            //b数据 —— 一维数组  ，无法从program里拿的；
            //c数据 —— 二维数组类型； c[0][0] 
            $a = array();
            $b = array();
            $c = array();
            $bwidarr = implode(",", $bwidarr);  //[1,2]转"1,2"
            $sql = 'mid IN ('.$bwidarr.')';
            $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();
            $b[0] = $sindata['sname'];  //子单位名字
            $b[1] = $prdata['jlname']; //监理项目机构
            for ($j=0; $j < count($data); $j++) {
               if ($data[$j]['intime']) {
                  $date = $data[$j]['intime']==0?"":date("Y/m/d",$data[$j]['intime']);
                  $datestr = explode('/',$date);
                  $b[2] = $datestr[0]?$datestr[0]:""; //年
                  $b[3] = $datestr[1]?$datestr[1]:""; //月
                  $b[4] = $datestr[2]?$datestr[2]:""; //日 
                  $b[5] = $data[$j]['buwei']; //部位                 
               }
               // $b[5] = !$b[5]?$data[$j]['buwei']:$b[5].','.$data[$j]['buwei']; //部位
            }
            $re[] = array('a'=>$a,'b'=>$b,'c'=>$c); 
      } 
    break;
// 质量证明文件汇总表   多-1
    case 'GD2301052': 
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[0] 
      ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{
            $b = array();
            $c = array();
            $b[0] = ""; 
            $b[1] = $prdata['prname'].'——'.$sindata['sname']; //项目名字 
            $bwidarr = implode(",", $bwidarr);  //[1,2]转"1,2"
            $sql = 'mid IN ('.$bwidarr.')';
            $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();

      //多对一 都采用这种模式
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/13);
            $v =$i%13; 
            $nre[$q][$v][0] = $i+1;
            $nre[$q][$v][1] = $data[$i]['mname'];
            $nre[$q][$v][2] = $data[$i]['guige'];
            $nre[$q][$v][3] = $data[$i]['changjia'];             
            $nre[$q][$v][4] = $data[$i]['ccph'];
            $nre[$q][$v][5] = "";
            $nre[$q][$v][6] = $data[$i]['buwei'];
            $nre[$q][$v][7] = $data[$i]['number'];
            $nre[$q][$v][8] = $data[$i]['stime']==0?'':date("Y年m月d日",$data[$i]['stime']);
            $nre[$q][$v][9] = "";
         }    
         $redata['has'] = 0;//默认设置 是没有用户数据的；            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
           
        }



      } 
    break;
// 钢筋核查记录表 多-1
    case 'GD2301046': 
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[0] 
      ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{
            $b = array();
            $b[0] = $sindata['sname'];  //子单位名字
            $b[1] = $prdata['sgname']; //总承包施工单位
            $b[2] = ""; //编号
            $bwidarr = implode(",", $bwidarr);  //[1,2]转"1,2"
            $sql = 'mid IN ('.$bwidarr.')';
            $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();

      //多对一 都采用这种模式
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/8);
            $v =$i%8; 
            $nre[$q][$v][0] = $prdata['sgname'];
            $nre[$q][$v][1] = "原件";
            $nre[$q][$v][2] = $data[$i]['guige'];
            $nre[$q][$v][3] = $data[$i]['intime']==0?'':date("Y年m月d日",$data[$i]['intime']);             
            $nre[$q][$v][4] = $data[$i]['number'];
            $nre[$q][$v][5] = '相符';
            $nre[$q][$v][6] = $data[$i]['baogao'];
            $nre[$q][$v][7] = "原件";
            $nre[$q][$v][8] = $data[$i]['guige'];
            $nre[$q][$v][9] = $data[$i]['stime']==0?'':date("Y年m月d日",$data[$i]['stime']);
            $nre[$q][$v][10] = $data[$i]['number'];
            $nre[$q][$v][11] = "相符";
         }    
         $redata['has'] = 0;//默认设置 是没有用户数据的；            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
           
        }
      } 
    break;
// 水泥出厂、复验质量证明文件汇总表    多-1
    case 'GD2301048': 
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[0] 
      ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; } 
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{
            $b = array();
            $b[0] = $sindata['sname'];  //子单位名字
            $b[1] = $prdata['sgname']; //总承包施工单位
            $b[2] = ""; //编号
            $bwidarr = implode(",", $bwidarr);  //[1,2]转"1,2"
            $sql = 'mid IN ('.$bwidarr.')';
            $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();

      //多对一 都采用这种模式
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/8);
            $v =$i%8; 
            $nre[$q][$v][0] = $prdata['sgname'];
            $nre[$q][$v][1] = '原件';
            $nre[$q][$v][2] = $data[$i]['changjia'];
            $nre[$q][$v][3] = $data[$i]['pinzhong'];             
            $nre[$q][$v][4] = $data[$i]['number'];
            $nre[$q][$v][5] = '';
            $nre[$q][$v][6] = $data[$i]['qiangdu'];

            $nre[$q][$v][7] = $prdata['sgname'];
            $nre[$q][$v][8] = '原件';
            $nre[$q][$v][9] = $data[$i]['changjia'];
            $nre[$q][$v][10] = $data[$i]['stime']==0?'':date("Y年m月d日",$data[$i]['stime']);
            $nre[$q][$v][11] = $data[$i]['number'];
            $nre[$q][$v][12] = '';
            $nre[$q][$v][13] = $data[$i]['qiangdu'];            
         }    
         $redata['has'] = 0;//默认设置 是没有用户数据的；            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
           
        }
      } 
    break;
//小创-------------------------------------------------------------------------------------






































//阳-------------------------------------------------------------------------------------
//------------------------------------------
// 粗(细)骨料合格证、试验报告汇总表   多-1
    case 'GD2301049': 
      
      // 1、先去获取资料 zltable表 找看有没有；
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[0] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                    
            $b = array();
            $c = array(); 
 
       $bwidarr = implode(",", $bwidarr);  //[1,2]转"1,2"
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();
      //多对一 都采用这种模式
         $nre = array();
         for($i=0;$i<count($data);$i++){         	
            $q = floor($i/10);
            $v =$i%10; 
            $nre[$q][$v][0] = $i+1;
            $nre[$q][$v][1] = $data[$i]['changjia']; 
            $nre[$q][$v][2] = $data[$i]['guige'];
            $nre[$q][$v][3] = $data[$i]['intime']==0?'':date("Y年m月d日",$data[$i]['intime']) ;             
            $nre[$q][$v][4] = "";
            $nre[$q][$v][5] = $data[$i]['ypbh'];
            $nre[$q][$v][6] = $data[$i]['number'];
            $nre[$q][$v][7] = "";
            $nre[$q][$v][8] = "";
            $nre[$q][$v][9] = "";
            $nre[$q][$v][10]= ""; 
         }    
         $redata['has'] = 0;//默认设置 是没有用户数据的；            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
        }
    break;
//--------------------------------------------------------------------------------------------
// 原材料合格证、试验报告汇总表  多-1
    case 'GD2301050': 
    	 
      $sarr = array(
        'uid'=>$uid,
        'tid'=>$bwidarr[0] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                    
            $b = array();
            $c = array(); 

            $b[1] = $prdata['prname'].'——'.$sindata['sname']; 
 
       $bwidarr = implode(",", $bwidarr);
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();
        
         $nre = array();
         for($i=0;$i<count($data);$i++){         	
            $q = floor($i/25);
            $v =$i%25; 
              $nre[$q][$v][0] = $i+1;
              $nre[$q][$v][1] = $data[$i]['ypbh'];
              $nre[$q][$v][2] = $data[$i]['pinzhong'];
              $nre[$q][$v][3] = $data[$i]['qiangdu'];               
              $nre[$q][$v][4] = $data[$i]['number'];
              $nre[$q][$v][5] = $data[$i]['intime']==0?'':date("Y年m月d日",$data[$i]['intime']);            
            $nre[$q][$v][6] = "";
            $nre[$q][$v][7] = '';//$data[$i]['number'];
            $nre[$q][$v][8] = $data[$i]['buwei'];            
         }    
         $redata['has'] = 0;            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
          } 
    break;
//------------------------------------------------------------------------------------------
// 墙体节能工程质量证明文件汇总表 多-1
    case 'GD23020201': 
     
      $sarr = array(
        'uid'=>$uid,
        'tbid'=>$tbid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                   
            $b = array();
            $c = array(); 

            $b[0] = $prdata['prname'].'——'.$sindata['sname']; 
            $b[1] = '';
            $b[2] = $prdata['sgname'];  
 
       $bwidarr = implode(",", $bwidarr);
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();         
          
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/10);
            $v =$i%10; 
              $nre[$q][$v][0] = $i+1;
              $nre[$q][$v][1] = '';
              $nre[$q][$v][2] = '';
              $nre[$q][$v][3] = '';               
              $nre[$q][$v][4] = '';
              $nre[$q][$v][5] = ''; 
         }    
         $redata['has'] = 0;            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
          } 
    break;
//----------------------------------------------------------------------------------
// 墙体节能工程见证取样复验报告汇总表   多-1
    case 'GD23020202': 
    	
      $sarr = array(
        'uid'=>$uid,
        'tbid'=>$tbid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                   
            $b = array();
            $c = array();             
 
       $bwidarr = implode(",", $bwidarr);
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();
          
         
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/10);
            $v =$i%10; 
              $nre[$q][$v][0] = $i+1;
              $nre[$q][$v][1] = '';
              $nre[$q][$v][2] = '';
              $nre[$q][$v][3] = '';               
              $nre[$q][$v][4] = '';
              $nre[$q][$v][5] = ''; 
         }    
         $redata['has'] = 0;            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
          }
    break;    
//----------------------------------------------------------------------------------
// 门窗节能工程质量证明文件汇总表 多-1
    case 'GD23020401': 
    		 
      $sarr = array(
        'uid'=>$uid,
        'tbid'=>$tbid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                    
            $b = array();
            $c = array(); 

            $b[0] = $prdata['prname'].'——'.$sindata['sname']; 
            $b[1] = '';
            $b[2] = $prdata['sgname'];  
 
       $bwidarr = implode(",", $bwidarr);
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();
             
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/15);
            $v =$i%15;               

              $nre[$q][$v][0] = $i+1;
              $nre[$q][$v][1] = $data[$i][ypbh];
              $nre[$q][$v][2] = $data[$i][pinzhong];
              $nre[$q][$v][3] = $data[$i][qiangdu];               
              $nre[$q][$v][4] = $data[$i][number];
              $nre[$q][$v][5] = $data[$i][intime]==0?'':date("Y年m月d日",$data[$j][intime]);
         }    
         $redata['has'] = 0;            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
          } 
    break;
//---------------------------------------------------------------------------
// 门窗节能工程见证取样复验报告汇总表   多-1
    case 'GD23020402': 
           
      $sarr = array(
        'uid'=>$uid,
        'tbid'=>$tbid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                    
            $b = array();
            $c = array(); 

           // $b[0] = $prdata['prname'].'——'.$sindata['sname']; 
 
       $bwidarr = implode(",", $bwidarr);
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();

         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/10);
            $v =$i%10; 
              $nre[$q][$v][0] = $i+1;
              $nre[$q][$v][1] = '';
              $nre[$q][$v][2] = '';
              $nre[$q][$v][3] = '组';               
              $nre[$q][$v][4] = '组';
              $nre[$q][$v][5] = ''; 
         }    
         $redata['has'] = 0;            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
          } 
    break;    
//----------------------------------------------------------------------------------------
// 屋面节能工程质量证明文件汇总表 多-1
    case 'GD23020501': 
    	       
      $sarr = array(
        'uid'=>$uid,
        'tbid'=>$tbid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                    
            $b = array();
            $c = array(); 

            $b[0] = $prdata['prname'].'——'.$sindata['sname']; 
            $b[1] = '';
            $b[2] = $prdata['sgname']; 

 
       $bwidarr = implode(",", $bwidarr);
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();  
        
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/15);
            $v =$i%15; 
              $nre[$q][$v][0] = $i+1;
              $nre[$q][$v][1] = '';
              $nre[$q][$v][2] = '';
              $nre[$q][$v][3] = '';               
              $nre[$q][$v][4] = '';
              $nre[$q][$v][5] = ''; 
         }    
         $redata['has'] = 0;            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
          } 
    break;
//---------------------------------------------------------------------------
// 屋面节能工程见证取样复验报告汇总表   多-1
    case 'GD23020502': 
    	     
      $sarr = array(
        'uid'=>$uid,
        'tbid'=>$tbid,
        'tid'=>$bwidarr[$i] 
        ); 
      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }      
      $udata = Db::connect("DB_Config_1")->name('zltable')->where($sarr)->find();
      if($udata){ 
        
        $re[] =  json_decode($udata['temjson']);
        $redata['has'] = 1; 
      }else{                                    
            $b = array();
            $c = array(); 

           // $b[0] = $prdata['prname'].'——'.$sindata['sname']; 
 
       $bwidarr = implode(",", $bwidarr);
       $sql = 'mid IN ('.$bwidarr.')';
       $data = Db::connect("DB_Config_1")->name('matter')->where($sql)->select();
        
         $nre = array();
         for($i=0;$i<count($data);$i++){          
            $q = floor($i/10);
            $v =$i%10; 
              $nre[$q][$v][0] = $i+1;
              $nre[$q][$v][1] = '';
              $nre[$q][$v][2] = '';
              $nre[$q][$v][3] = '组';               
              $nre[$q][$v][4] = '组';
              $nre[$q][$v][5] = ''; 
         }    
         $redata['has'] = 0;            
          foreach ($nre as $key => $value) {
              $re[] = array('b'=>$b,'c'=>$value); 
          } 
          } 
    break; 
//阳-------------------------------------------------------------------------------------
 



    } 
return $re; 
}


















//获取 资料数据
Public function getzltabletwo(){
      //$_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式； 
           //构造 返回数据结构
    //判断数据完整性；
     

 


      //获取用户信息 
      $uid = getuser()['uid'];      
      //解析工程prid
      $parr = explaincodeid(input('prcodeid'));
      $prid = $parr['idv'];

      //查询工程信息
      $p = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$prid,'isdel'=>0))->find();
     //接受请求 判断是工程表   或者   部位表；
     $tbid = input('id'); 
     $bwid = input('bwid');
     if($bwid){ 
      //查询部位的信息
      $bwdata = Db::connect("DB_Config_1")->name('songjian')->where(array('tid'=>$bwid,'isdel'=>0))->find();
      $s = Db::connect("DB_Config_1")->name('single')->where(array('sid'=>$bwdata['sid'],'isdel'=>0))->find(); 
      $bwsql = ' and tid='.$bwid;
     }
     //拼接sql  去查询 资料数据表zltable ,有数据，则是用户数据；没数据，则需要系统数据
     
     // $sql = 'select * from cy_zltable where uid='.$uid.' and isdel=0 and tbid='.$tbid.' and prid='.$prid.$bwsql;
     // $zltable = Db::connect("DB_Config_1")->name('zltable')->query($sql);
     
     // $userdata = array();
     // if($zltable){
     // //存在用户数据，对头进行解析
     //  $userdata['head'] = json_decode($zltable['headjson']);
     //  $userdata['body'] = json_decode($zltable['bodyjson']);
     //  $userdata = 1;
     // }
     // $redata['data']['user'] = $userdata;
 
      
     //根据,code 去查找对应的表数据；头部一样；
     $code = $_POST['code'];
     switch ($code){

       //法定建设前期检查表
       case 'GD2401010111':
          
         break;


         //单位工程坐标定位
        case 'GD2401010133':
        
          
         break;


//第四节 土建、装修各检验批质量记录
//01 地基与基础工程用表
//01 无支护土方
         //土方开挖工程检验批质量验收记录表
        case 'GD24010101':
        
          
         break;

         //土方回填工程检验批质量验收记录表
        case 'GD24010102':
        
          
         break;


         //排桩墙支护工程检验批质量验收记录表(重复使用钢板桩)(Ⅰ)
        case 'GD24010201':
        
          
         break;

//02 有支护土方
         //排桩墙支护工程检验批质量验收记录表(混凝土板桩)(Ⅱ)
        case 'GD24010202':
        
          
         break;


         //降水与排水工程检验批质量验收记录表
        case 'GD24010203':
        
          
         break;


         //混凝土灌注桩钢筋笼制作工程检验批质量验收记录表
        case 'GD24010204':
        
          
         break;
         //地下连续墙工程检验批质量验收记录表
        case 'GD24010205':
        
          
         break;


         //锚杆及土钉墙支护工程检验批质量验收记录表
        case 'GD24010206':
        
          
         break;


         //加筋水泥土桩墙支护工程检验批质量验收记
        case 'GD24010208':
        
          
         break;


         //沉井与沉箱工程检验批质量验收记录表
        case 'GD24010207':
        
          
         break;

         //钢或混凝土内支撑工程检验批质量验收记录表
        case 'GD24010209':
        
          
         break;


         //支护工程钢腰梁、混凝土腰梁检验批质量验收记录表
        case 'GD24010210':
        
          
         break;

//03 地基及基础处理
         //灰土地基工程检验批质量验收记录表
        case 'GD24010301':
        
          
         break;


         //砂和砂石地基工程检验批质量验收记录表
        case 'GD24010302':
        
          
         break;
         //土工合成材料地基工程检验批质量验收记录表
        case 'GD24010303':
        
          
         break;


         //粉煤灰地基工程检验批质量验收记录表
        case 'GD24010304':
        
          
         break;


         //强夯地基工程检验批质量验收记录表
        case 'GD24010305':
        
          
         break;


         //振冲地基工程检验批质量验收记录表
        case 'GD24010306':
        
          
         break;
         //砂石桩地基工程检验批质量验收记录表
        case 'GD24010307':
        
          
         break;


         //预压地基工程检验批质量验收记录表
        case 'GD24010308':
        
          
         break;


         //高压喷射注浆地基工程检验批质量验收记录表
        case 'GD24010309':
        
          
         break;


         //土和灰土挤密桩复合地基工程检验批质量验收记录表
        case 'GD24010310':
        
          
         break;

         //注浆地基工程检验批质量验收记录表
        case 'GD24010311':
        
          
         break;


         //水泥粉煤灰碎石桩复合地基工程检验批质量验收记录表
        case 'GD24010312':
        
          
         break;


         //夯实水泥土桩复合地基工程检验批质量验收记录表
        case 'GD24010313':
        
          
         break;


         //水泥土搅拌桩地基工程检验批质量验收记录表
        case 'GD24010314':
        
 //04 桩基         
         break;
         //非预应力混凝土预制桩制作工程检验批质量验收记录表
        case 'GD24010401':
        
          
         break;


         //非预应力混凝土预制桩质量检查及外观质量检验批验收记录表
        case 'GD24010402':
        
          
         break;


         //先张法预应力混凝土管桩质量检查及外观质量检验批验收记录表
        case 'GD24010403':
        
          
         break;


         //钢桩(成品)外观质量检验批验收记录表
        case 'GD24010404':
        
          
         break;
         //锤击、静压混凝土预制桩工程检验批质量验收记录表
        case 'GD24010405':
        
          
         break;


         //锤击、静压钢桩工程检验批质量验收记录表
        case 'GD24010406':
        
          
         break;


         //混凝土灌注桩钢筋笼制作工程检验批质量验
        case 'GD24010407':
        
          
         break;


         //混凝土灌注桩工程检验批质量验收记录表
        case 'GD24010408':
        
          
         break;

         //混凝土板桩检验批质量验收记录表
        case 'GD24010409':
        
          
         break;


         //重复使用钢桩检验批质量验收记录表
        case 'GD24010410':
        
          
         break;

//05 地下防水
         //防水混凝土工程检验批量验收记录表
        case 'GD24010501':
        
          
         break;


         //水泥砂浆防水层工程检验批质量验收记录表
        case 'GD24010502':
        
          
         break;
         //卷材防水层工程检验批质量验收记录表
        case 'GD24010503':
        
          
         break;


         //涂料防水层工程检验批质量验收记录表
        case 'GD24010504':
        
          
         break;


         //金属板防水层工程检验批质量验收记录表
        case 'GD24010505':
        
          
         break;


         //塑料板防水层工程检验批质量验收记录表
        case 'GD24010506':
        
          
         break;
         //细部构造检验批质量验收记录表
        case 'GD24010507':
        
          
         break;


         //锚喷支护工程检验批质量验收记录表
        case 'GD24010508':
        
          
         break;


         //复合式衬砌工程检验批质量验收记录表
        case 'GD24010509':
        
          
         break;


         //盾构法隧道工程检验批质量验收记录表
        case 'GD24010510':
        
          
         break;

         //渗排水、盲沟排水工程检验批质量验收记录表
        case 'GD24010511':
        
          
         break;


         //隧道、坑道排水工程检验批质量验收记录表
        case 'GD24010512':
        
          
         break;


         //预注浆、后注浆工程检验批质量验收记录表
        case 'GD24010513':
        
          
         break;


         //衬砌裂缝注浆工程检验批质量验收记录表
        case 'GD24010514':
        
  
         break;


  //06 混凝土基础
         //现浇结构模板安装工程检验批质量验收记录表(Ⅰ)
        case 'GD24010601':
        
          
         break;


         //预制构件模板工程检验批质量验收记录表(Ⅱ)
        case 'GD24010602':
        
          
         break;


         //模板拆除工程检验批质量验收记录表(Ⅲ)
        case 'GD24010603':
        
          
         break;


         //钢筋加工工程检验批质量验收记录表(Ⅰ)
        case 'GD24010604':
        
          
         break;
         //钢筋安装工程检验批质量验收记录表(Ⅱ)
        case 'GD24010605':
        
          
         break;


         //混凝土原材料及配合比设计检验批质量验收记录表(Ⅰ)
        case 'GD24010606':
        
          
         break;


         //混凝土施工工程检验批质量验收记录表(Ⅱ)
        case 'GD24010607':
        
          
         break;


         //现浇混凝土结构观感质量及尺寸偏差检验批验收记录表(Ⅰ)
        case 'GD24010608':
        
          
         break;

         //混凝土设备基础外观及尺寸偏差检验批验收记录表(Ⅱ)
        case 'GD24010609':
        
          
         break;

//07 砌体基础
         //砖砌体工程检验批质量验收记录表
        case 'GD24010701':
        
          
         break;


         //混凝土小型空心砌块砌体工程检验批质量验收记录表
        case 'GD24010702':
        
          
         break;


         //配筋砌体工程检验批质量验收记录表
        case 'GD24010703':
        
          
         break;


         //石砌体工程检验批质量验收记录表
        case 'GD24010704':
        
          
         break;

//02 主体结构工程用表
//01 混凝土结构

         //现浇结构模板安装工程检验批质量验收记录表(Ⅰ)
        case 'GD24020101':
        
          
         break;


         //预制构件模板工程检验批质量验收记录表(Ⅱ)
        case 'GD24020102':
        
          
         break;


         //模板拆除工程检验批质量验收记录表(Ⅲ)
        case 'GD24020103':
        
          
         break;


         //钢筋加工工程检验批质量验收记录表(Ⅰ)
        case 'GD24020104':
        
          
         break;


         //钢筋安装工程检验批质量验收记录表(Ⅱ)
        case 'GD24020105':
        
          
         break;

         //混凝土原材料及配合比设计检验批质量验收记录表(Ⅰ)
        case 'GD24020106':
        
          
         break;


         //混凝土施工工程检验批质量验收记录表(Ⅱ)
        case 'GD24020107':
        
          
         break;


         //预应力筋用锚具、夹具和连接器质量检验批验收记录表(Ⅰ)
        case 'GD24020108':
        
          
         break;


         //预应力筋、螺旋管、水泥和外加剂原材料检验批质量验收记录表(Ⅱ)
        case 'GD24020109':
        
          
         break;


         //预应力筋制作与安装工程检验批质量验收记录表(Ⅲ)
        case 'GD24020110':
        
          
         break;


         //预应力张拉、放张、灌浆及封锚检验批质量验收记录表(Ⅳ)
        case 'GD24020111':
        
          
         break;
         //现浇混凝土结构观感质量及尺寸偏差检验批验收记录表(Ⅰ)
        case 'GD24020112':
        
          
         break;


         //混凝土设备基础外观及尺寸偏差检验批验收记录表(Ⅱ)
        case 'GD24020113':
        
          
         break;


         //预制构件检验批质量验收记录表(Ⅰ)
        case 'GD24020114':
        
          
         break;


         //装配式结构施工工程检验批质量验收记录表(Ⅱ)
        case 'GD24020115':
        
          
         break;

//02 砌体结构
         //砖砌体工程检验批质量验收记录表
        case 'GD24020201':
        
          
         break;


         //混凝土小型空心砌块砌体工程检验批质量验
        case 'GD24020202':
        
          
         break;
         //石砌体工程检验批质量验收记录表
        case 'GD24020203':
        
          
         break;


         //填充墙砌体工程检验批质量验收记录表
        case 'GD24020204':
        
          
         break;


         //配筋砌体工程检验批质量验收记录表
        case 'GD24020205':
        
          
         break;

//03 钢结构工程
         //钢结构制作(安装)焊接工程检验批质量验收记录表(Ⅰ)
        case 'GD24020301':
        
          
         break;
         //焊钉(栓钉)焊接工程检验批质量验收记录表(Ⅱ)
        case 'GD24020302':
        
          
         break;


         //普通紧固件连接工程检验批质量验收记录表(Ⅰ)
        case 'GD24020303':
        
          
         break;


         //高强度螺栓连接工程检验批质量验收记录表(Ⅱ)
        case 'GD24020304':
        
          
         break;


         //钢结构零、部件加工工程检验批质量验收记录表(Ⅰ)
        case 'GD24020305':
        
          
         break;

         //钢网架制作工程检验批质量验收记录表(Ⅱ)
        case 'GD24020306':
        
          
         break;


         //单层钢结构安装工程检验批质量验收记录表
        case 'GD24020307':
        
          
         break;


         //多层及高层钢结构安装工程检验批质量验收表
        case 'GD24020308':
        
          
         break;


         //钢构件组装工程检验批质量验收记录表
        case 'GD24020309':
        
          
         break;


         //钢构件预拼装工程检验批质量验收记录表
        case 'GD24020310':
        
          
         break;


         //钢网架安装工程检验批质量验收记录表
        case 'GD24020311':
        
          
         break;


         //压型金属板工程检验批质量验收记录表
        case 'GD24020312':
        
          
         break;


         //钢结构防腐涂料涂装工程检验批质量验收记录表
        case 'GD24020313':
        
          
         break;


         //钢结构防火涂料涂装工程检验批质量验收记录表
        case 'GD24020314':
        
          
         break;


         //网架结构总拼装工程检验批质量验收记录表
        case 'GD24020315':
        
          
         break;

         //钢结构钢材质量检查及外观质量检验批质量验收记录表
        case 'GD24020316':
        
          
         break;


         //钢结构焊接材料质量检查及外观质量检验批质量验收记录表
        case 'GD24020317':
        
          
         break;


         //钢结构焊接球质量检查及外观质量检验批质量验收记录表
        case 'GD24020318':
        
          
         break;


         //钢结构螺栓球质量检查及外观质量检验批质量验收记录表
        case 'GD24020319':
        
          
         break;


         //钢结构封板、锥头和套筒质量检查及外观质量检验批质量验收记录表
        case 'GD24020320':
        
          
         break;


         //钢结构金属压型板质量检查及外观质量检验批质量验收记录表
        case 'GD24020321':
        
          
         break;

 //04 木结构工程
         //木屋盖工程检验批质量验收记录表
        case 'GD24020401':
        
          
         break;


         //胶合木工程检验批质量验收记录表
        case 'GD24020402':
        
          
         break;


         //轻型木结构(规格材、钉连接)工程检验批质量验收记录表
        case 'GD24020403':
        
          
         break;


         //木结构防腐、防虫、防火工程检验批质量验收记录表
        case 'GD24020404':
        
          
         break;
//03 装修装饰工程用表
//01 建筑地面工程
         //基土垫层检验批质量验收记录表(Ⅰ)
        case 'GD24030101':
        
          
         break;


         //灰土垫层检验批质量验收记录表(Ⅱ)
        case 'GD24030102':
        
          
         break;


         //砂垫层和砂石垫层检验批质量验收记录表(Ⅲ)
        case 'GD24030103':
        
          
         break;


         //碎石垫石和碎砖垫层检验批质量验收记录表(Ⅳ)
        case 'GD24030104':
        
          
         break;


         //三合土垫层检验批质量验收记录表(Ⅴ)
        case 'GD24030105':
        
          
         break;


         //炉渣垫层检验批质量验收记录表(Ⅵ)
        case 'GD24030106':
        
          
         break;
         //水泥混凝土垫层检验批质量验收记录表(Ⅶ)
        case 'GD24030107':
        
          
         break;


         //找平层检验批质量验收记录表(Ⅷ)
        case 'GD24030108':
        
          
         break;


         //隔离层检验批质量验收记录表(Ⅸ)
        case 'GD24030109':
        
          
         break;


         //填充层检验批质量验收记录表(Ⅹ)
        case 'GD24030110':
        
          
         break;

         //绝热层检验批质量验收记录表
        case 'GD24030111':
        
          
         break;


         //水泥混凝土面层检验批质量验收记录表
        case 'GD24030112':
        
          
         break;
         //水泥砂浆面层检验批质量记录表
        case 'GD24030113':
        
          
         break;


         //水磨石面层检验批质量验收记录表
        case 'GD24030114':
        
          
         break;


         //硬化耐磨面层检验批质量验收记录表
        case 'GD24030115':
        
          
         break;


         //防油渗面层检验批质量验收记录表
        case 'GD24030116':
        
          
         break;
         //不发火(防爆)面层工程检验批质量验收记录表
        case 'GD24030117':
        
          
         break;


         //自流平面层检验批质量验收记录表
        case 'GD24030118':
        
          
         break;


         //涂料面层检验批质量验收记录表
        case 'GD24030119':
        
          
         break;


         //塑胶面层检验批质量验收记录表
        case 'GD24030120':
        
          
         break;

         //地面辐射供暖的整体面层检验批质量验收记录表(Ⅰ水泥混凝土整体面层)
        case 'GD24030121':
        
          
         break;


         //地面辐射供暖的整体面层检验批质量验收记录表(Ⅱ水泥砂浆整体面层)
        case 'GD24030122':
        
          
         break;
         //砖面层检验批质量验收记录表
        case 'GD24030123':
        
          
         break;


         //大理石和花岗石面层检验批质量验收记录表
        case 'GD24030124':
        
          
         break;


         //预制板块面层检验批质量验收记录表
        case 'GD24030125':
        
          
         break;


         //料石面层工程检验批质量验收记录表
        case 'GD24030126':
        
          
         break;
         //塑料板面层检验批质量验收记录表
        case 'GD24030127':
        
          
         break;


         //活动地板面层检验批质量验收记录表
        case 'GD24030128':
        
          
         break;


         //金属板面层检验批质量验收记录表
        case 'GD24030129':
        
          
         break;


         //地毯面层检验批质量验收记录表
        case 'GD24030130':
        
          
         break;

         //地面辐射供暖的板块面层检验批质量验收记录表(Ⅰ砖整体面层)
        case 'GD24030131':
        
          
         break;


         //地面辐射供暖的板块面层检验批质量验收记录表(Ⅱ大理石和花岗石整体面层)
        case 'GD24030132':
        
          
         break;
         //地面辐射供暖的板块面层检验批质量验收记录表(Ⅲ预制板块整体面层)
        case 'GD24030133':
        
          
         break;


         //地面辐射供暖的板块面层检验批质量验收记录表(Ⅳ塑料板整体面层)
        case 'GD24030134':
        
          
         break;


         //实木地板实木集成地板、竹地板面层检验批质量验收记录表
        case 'GD24030135':
        
          
         break;


         //实木复合地板面层检验批质量验收记录表
        case 'GD24030136':
        
          
         break;


         //浸渍纸层压木质地板面层检验批质量验收记录表
        case 'GD24030137':
        
          
         break;


         //软木类地板面层检验批质量验收记录表
        case 'GD24030138':
        
          
         break;


         //地面辐射供暖的木板面层检验批质量验收记录表(Ⅰ实木复合地板整体面层)
        case 'GD24030139':
        
          
         break;


         //地面辐射供暖的木板面层检验批质量验收记录表(Ⅱ浸渍纸层压木质地板整体面层)
        case 'GD24030140':
        
          
         break;

//02 抹灰工程

         //一般抹灰工程检验批质量验收记录表
        case 'GD24030201':
        
          
         break;


         //装饰抹灰工程检验批质量验收记录表
        case 'GD24030202':
        
          
         break;
         //清水砌体勾缝工程检验批质量验收记录表
        case 'GD24030203':
        
          
         break;

//03 门窗工程
         //木门窗制作工程检验批质量验收记录表(Ⅰ)
        case 'GD24030301':
        
          
         break;


         //木门窗安装工程检验批质量验收记录表(Ⅱ)
        case 'GD24030302':
        
          
         break;


         //金属门窗安装工程检验批质量验收记录表(钢门窗)(Ⅰ)
        case 'GD24030303':
        
          
         break;


         //金属门窗安装工程检验批质量验收记录表(铝合金门窗)(Ⅱ)
        case 'GD24030304':
        
          
         break;


         //金属门窗安装工程检验批质量验收记录表(涂色镀锌钢板门窗)(Ⅲ)
        case 'GD24030305':
        
          
         break;


         //塑料门窗安装工程检验批质量验收记录表
        case 'GD24030306':
        
          
         break;


         //特种门安装工程检验批质量验收记录表
        case 'GD24030307':
        
          
         break;


         //门窗玻璃安装工程检验批质量验收记录表
        case 'GD24030308':
        
          
         break;

//04 吊顶工程
         //暗龙骨吊顶工程检验批质量验收记录表
        case 'GD24030401':
        
          
         break;
         //明龙骨吊顶工程检验批质量验收记录表
        case 'GD24030402':
        
          
         break;

//05 轻质隔墙工程
         //板材隔墙工程检验批质量验收记录表
        case 'GD24030501':
        
          
         break;


         //骨架隔墙工程检验批质量验收记录表
        case 'GD24030502':
        
          
         break;


         //活动隔墙工程检验批质量验收记录表
        case 'GD24030503':
        
          
         break;
         //玻璃隔墙工程检验批质量验收记录表
        case 'GD24030504':
        
          
         break;

//06 饰面板（砖）工程
         //饰面板安装工程检验批质量验收记录表
        case 'GD24030601':
        
          
         break;


         //饰面砖粘贴工程检验批质量验收记录表
        case 'GD24030602':
        
          
         break;

//07 幕墙工程
         //玻璃幕墙工程检验批质量验收记录表
        case 'GD24030701':
        
          
         break;

         //金属幕墙工程检验批质量验收记录表
        case 'GD24030702':
        
          
         break;


         //石材幕墙工程检验批质量验收记录表
        case 'GD24030703':
        
       
         break;

 //08 涂饰工程 
         //水性涂料涂饰工程检验批质量验收记录表
        case 'GD24030801':
        
          
         break;


         //溶剂型涂料涂饰工程检验批质量验收记录表
        case 'GD24030802':
        
          
         break;


         //美术涂饰工程检验批质量验收记录表
        case 'GD24030803':
        
          
         break;

//09 裱糊与软包工程
         //裱糊工程检验批质量验收记录表
        case 'GD24030901':
        
          
         break;


         //软包工程检验批质量验收记录表
        case 'GD24030902':
        
          
         break;

//10 细部工程
         //橱柜制作与安装工程检验批质量验收记录表
        case 'GD24031001':
        
          
         break;


         //窗帘盒﹑窗台板和散热器罩制作与安装工程检验批质量验收记录表
        case 'GD24031002':
        
          
         break;


         //门窗套制作与安装工程检验批质量验收记录表
        case 'GD24031003':
        
          
         break;

         //护栏和扶手制作与安装工程检验批质量验收记录表
        case 'GD24031004':
        
          
         break;


         //花饰制作与安装工程检验批质量验收记录表
        case 'GD24031005':
        
          
         break;

 //04 屋面工程
 //01 卷材防水屋面工程
         //屋面保温层检验批质量验收记录表
        case 'GD24040101':
        
          
         break;


         //屋面找平层检验批质量验收记录表
        case 'GD24040102':
        
          
         break;


         //卷材防水层检验批质量验收记录表
        case 'GD24040103':
        
          
         break;


         //屋面细部构造检验批质量验收记录表
        case 'GD24040104':
        
          
         break;

 //02 涂抹防水屋面工程
         //屋面保温层检验批质量验收记录表
        case 'GD24040201':
        
          
         break;


         //屋面找平层检验批质量验收记录表
        case 'GD24040202':
        
          
         break;


         //涂膜防水层检验批质量验收记录表
        case 'GD24040203':
        
          
         break;


         //屋面细部构造检验批质量验收记录表
        case 'GD24040204':
        
          
         break;

//03 刚性防水屋面工程
         //细石混凝土防水层检验批质量验收记录表
        case 'GD24040301':
        
          
         break;


         //密封材料嵌缝检验批质量验收记录表
        case 'GD24040302':
        
          
         break;


         //屋面细部构造检验批质量验收记录表
        case 'GD24040303':
        
          
         break;

//04 瓦屋面工程
         //平瓦屋面检验批质量验收记录表
        case 'GD24040401':
        
          
         break;


         //油毡瓦屋面检验批质量验收记录表
        case 'GD24040402':
        
          
         break;


         //金属板材屋面检验批质量验收记录表
        case 'GD24040403':
        
          
         break;


         //屋面细部构造检验批质量验收记录表
        case 'GD24040404':
        
          
         break;

//05 隔热屋面工程
         //架空屋面检验批质量验收记录表
        case 'GD24040501':
        
          
         break;


         //蓄水、种植屋面检验批质量验收记录表
        case 'GD24040502':
        
          
         break;


       
 


         //混凝土实体养护记录
        case 'GD2301039':
        //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
        //b数据 —— 一维数组  ，无法从program里拿的；
        //c数据 —— 二维数组类型； c[0][0]
        
        $a['prname'] = $p['prname'];
        $a['bybuwei'] = '三层梁板';
        $a['byqiangdu'] = 'C25';
        $a['ksdengji'] = '/';
        $a['kzqiangdu'] = '/';
        $a['shuini'] = '三星水泥 M32.5';
        $a['waijiaji'] = '粉煤灰';
        $a['canhuo'] = '参和料';

        $b[0] = "2012年12月23日";
        $b[1] = "2012年12月23日";
        $b[2] = "2012年12月24日";
        $b[3] = "14天";
        $b[4] = "";

      
        $c[0][0] = '2012年12月26日';
        $c[0][1] = '25℃';
        $c[0][2] = '浇水';
        $c[0][3] = '浇水';


        $redata['data'][0]['a'] =$a;
        $redata['data'][0]['b'] =$b;
        $redata['data'][0]['c'] =$c; 
        $redata['data'][0]['hasuser'] = 0;
      
        $redata['hasuser'] = 0;

          
         break; 
       
       default: 
         break;
     }










      // $redata['data'] = $_POST; 
      return json($redata); 
}





// 更新资料数据
Public function updatezltable(){
      //$_POST = json_decode(file_get_contents('php://input'),true);
      $redata = array('code'=>1,'msg'=>'','data'=>array());//定义返回数据格式；           
     
    


      $redata['data'] = $_POST; 
      return json($redata); 
}





    


}