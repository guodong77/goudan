<?php


use think\Request;
use think\View;
use think\Db;
use think\Session;

	function p($array){
		dump($array,1,'<pre>',0,'</pre>');
		exit();
	}
/*做一个业务流*/
//1、数据表枚举、表Id的枚举;
//2、访问逻辑层方法的枚举；
//3、字段过滤函数；
 
//1、加密解密函数； 
//2、redis操作函数
//3、redis基本资料的存储； 
//5、栏目设置；
//

//
//6、sql 公共函数；
//7、sql拼接函数；
 
//8、对土建资料安全资料的设置；
//9、对数据格式的约定；


//数据表、主键id枚举；
function gettable_id($num){ 
	$arr = array(
		"t0"=>'program',
		'i0'=>'prid',
		"t1"=>'jixie',
		'i1'=>'jid',
		"t2"=>'single',
		'i2'=>'sid',
		"t3"=>'matter',
		'i3'=>'mid',
		"t4"=>'songjian',
		'i4'=>'tid',	
		"t5"=>'hengdaotu',//横道图
		'i5'=>'hid',	
		"t6"=>'renwu',//横道图-作业列表
		'i6'=>'rid',	
		"t7"=>'province', //省市列表  
		'i7'=>'pid',			
		"t8"=>'weather', //城市气温列表  
		'i8'=>'wid',			
		// "t9"=>'user', //运营管理-用户列表
		// 'i9'=>'wid',
		"t10"=>'login', //运营管理-登陆列表
		'i10'=>'cid',	
		"t11"=>'company', //运营管理-公司列表 
		'i11'=>'cid',	
		"t12"=>'user', //个人中心
		'i12'=>'uid',	
		"t13"=>'mtemp',
		"i13"=>'mid',
		"t14"=>'tongbiaotype',
		"i14"=>'tpid',
		"t15"=>'tongbiao',
		"i15"=>'tbid',
		"t16"=>'city',
		'i16'=>'pid',
		"t17"=>'jilu',
		'i17'=>'jlid',
		't18'=>'major',
		'i18'=>'mid',
		't19'=>'zldata',
		'i19'=>'id',
		't20'=>'archive_tree',
		'i20'=>'id'

		);
		$table = 't'.$num;
		$id = 'i'.$num; 
return	array('tbn'=>$arr[$table],'id'=>$arr[$id]); 
}


//简单插入的表过滤
function fillterdata($tbn,$arr){
	// $arr = array(
	// 	'matter':true,
	// 	'songjian':true,		
	// 	);
	// return $arr[$tbn];

}




// 生成codeid， 
function setcodeid($arr,$num,$isdel=true){
	$id = gettable_id($num)['id'];
	/*生成codeid同时，删除原始ID； 0*6  */
	foreach ($arr as &$value) {
		$value['codeid'] = jiami($num.'*'.$value[$id]);
		if($isdel){
			unset($value[$id]); 
		}
		if(isset($value['uid'])){
			unset($value['uid']); 
		}
		

				//时间戳遍历的时候顺便改变
				if($num==0){
					if(isset($value['kaigong']))
					$value['kaigong'] =$value['kaigong']==0?'': setdate($value['kaigong']);
					if(isset($value['jungong']))
					$value['jungong'] =$value['jungong']==0?'': setdate($value['jungong']); 

				}


				if($num==2){
					$value['jcriqi'] =$value['jcriqi']==0?'': setdate($value['jcriqi']);
					$value['jctime'] =$value['jctime']==0?'': setdate($value['jctime']); 
					$value['ztjgriqi'] =$value['ztjgriqi']==0?'': setdate($value['ztjgriqi']);
					$value['ztjgtime'] =$value['ztjgtime']==0?'': setdate($value['ztjgtime']); 
					$value['zxriqi'] =$value['zxriqi']==0?'': setdate($value['zxriqi']);
					$value['zxtime'] =$value['zxtime']==0?'': setdate($value['zxtime']);  
					$value['sqzriqi'] =$value['sqzriqi']==0?'': setdate($value['sqzriqi']);
					$value['sqztime'] =$value['sqztime']==0?'': setdate($value['sqztime']); 
					$value['swqriqi'] =$value['swqriqi']==0?'': setdate($value['swqriqi']);
					$value['swqtime'] =$value['swqtime']==0?'': setdate($value['swqtime']); 
					$value['snqriqi'] =$value['snqriqi']==0?'': setdate($value['snqriqi']);
					$value['snqtime'] =$value['snqtime']==0?'': setdate($value['snqtime']); 
					$value['wmriqi'] =$value['wmriqi']==0?'': setdate($value['wmriqi']);
					$value['wmtime'] =$value['wmtime']==0?'': setdate($value['wmtime']); 
				}
				//送检表
				if($num==3){
					$value['intime'] = $value['intime']==0?'':setdate($value['intime']);
					$value['stime'] =$value['stime']==0?'': setdate($value['stime']); 

      // $ftype = array('','','','基础','主体','装修','幕墙','屋面','节能','给排水','电气');
      // $value['fenbu'] = $ftype[$value['fid']];
					// 拆分结果
					// $jgarr = array();
					// if($value['jieguo']){
					// $tem = explode(",",$value['jieguo']);					
					// 	for ($i=0; $i < count($tem); $i++) { 
					// 		 array_push($jgarr,array('val'=>$tem[$i]));
					// 	} 					
					// }
					// $value['jieguoarr'] = $jgarr; 	
					

					// // 拆分样品编号
					// $jgarr = array();
					// if($value['ypbh']){
					// $tem = explode(",",$value['ypbh']);					
					// 	for ($i=0; $i < count($tem); $i++) { 
					// 		 array_push($jgarr,array('val'=>$tem[$i]));
					// 	}					
					// }
					// $value['ypbharr'] = $jgarr;	
					$value['check'] = 0;
					$value['isdel'] = 0;
					
				}

				if($num==4){
					 
					isset($value['byriqi'])?$value['byriqi']=setdate($value['byriqi']):"";
					isset($value["bytime"])?$value['bytime'] = setdate($value['bytime']):""; 
					isset($value["tytime"])?$value['tytime'] = setdate($value['tytime']):""; 
					isset($value["kstime"])?$value['kstime'] = setdate($value['kstime']):""; 
					isset($value["cmtime"])?$value['cmtime'] = setdate($value['cmtime']):"";
					isset($value["zttime"])?$value['zttime'] = setdate($value['zttime']):"";

					isset($value["dzriqi"])?$value['dzriqi'] = setdate($value['dzriqi']):"";
					isset($value["dztime"])?$value['dztime'] = setdate($value['dztime']):"";

					isset($value["qzriqi"])?$value['qzriqi'] = setdate($value['qzriqi']):"";
					isset($value["qztime"])?$value['qztime'] = setdate($value['qztime']):""; 

					isset($value["wqriqi"])?$value['wqriqi'] = setdate($value['wqriqi']):"";
					isset($value["wqtime"])?$value['wqtime'] = setdate($value['wqtime']):""; 

					isset($value["nqriqi"])?$value['nqriqi'] = setdate($value['nqriqi']):"";
					isset($value["nqtime"])?$value['nqtime'] = setdate($value['nqtime']):"";

					isset($value["zpriqi"])?$value['zpriqi'] = setdate($value['zpriqi']):"";
					isset($value["zptime"])?$value['zptime'] = setdate($value['zptime']):"";

					//重命名
					if(isset($value["bybuwei"])){
					$value["byname"]=$value['bybuwei']; 
					$value["byornot"]=1;
					// 同养
					if(isset($value["tyname"]))
					if($value["tyname"]===''){
						 $value["tyname"]=$value['bybuwei']; 
					}
					// 抗渗
					if(isset($value["ksname"]))
					if($value["ksname"]===''){
						$value["ksname"]=$value['bybuwei'];
					}
					// 焊接
					if(isset($value["dzname"]))
					if($value["dzname"]===''){
						$axx = explode("层",$value["bybuwei"]);
						$value["dzname"] = $axx[0].'层-焊接';
					}
					// 柱头
					if(isset($value["ztname"]))
					if($value["ztname"]===''){ 
						$value["ztname"] = $value["bybuwei"].'-柱头';
					}
					//拆模板
					if(isset($value["cmname"]))
					if($value["cmname"]===''){ 
						$value["cmname"] = $value["bybuwei"].'-拆模';
					}
					// 砌筑
					if(isset($value["qzname"]))
					if($value["qzname"]===''){
						$axx = explode("层",$value["bybuwei"]);
						$value["qzname"] = $axx[0].'层-砌体';
					}
					// 外墙
					if(isset($value["wqname"]))
					if($value["wqname"]===''){
						$axx = explode("层",$value["bybuwei"]);
						$value["wqname"] = $axx[0].'层-外墙';
					}
					// 内墙
					if(isset($value["nqname"]))
					if($value["nqname"]===''){
						$axx = explode("层",$value["bybuwei"]);
						$value["nqname"] = $axx[0].'层-内墙';
					}
					// 找平
					if(isset($value["zpname"]))
					if($value["zpname"]===''){
						$axx = explode("层",$value["bybuwei"]);
						$value["zpname"] = $axx[0].'层-找平';
					}
				}
					//强度
					if(isset($value["byqiangdu"]))
					if($value["byqiangdu"]==='0'){ $value["byqiangdu"]=''; }

					// 组数
					if(isset($value["byzushu"]))if($value["byzushu"]==='0'){ $value["byzushu"]=''; }
					if(isset($value["tyzushu"]))if($value["tyzushu"]==='0'){ $value["tyzushu"]=''; }
					if(isset($value["kszushu"]))if($value["kszushu"]==='0'){ $value["kszushu"]=''; }
					if(isset($value["ztzushu"]))if($value["ztzushu"]==='0'){ $value["ztzushu"]=''; }
					if(isset($value["cmzushu"]))if($value["cmzushu"]==='0'){ $value["cmzushu"]=''; }
					if(isset($value["dzzushu"]))if($value["dzzushu"]==='0'){ $value["dzzushu"]=''; }
					if(isset($value["qzzushu"]))if($value["qzzushu"]==='0'){ $value["qzzushu"]=''; }
					if(isset($value["wqzushu"]))if($value["wqzushu"]==='0'){ $value["wqzushu"]=''; }
					if(isset($value["nqzushu"]))if($value["nqzushu"]==='0'){ $value["nqzushu"]=''; }
					if(isset($value["zpzushu"]))if($value["zpzushu"]==='0'){ $value["zpzushu"]=''; }

					$value['check'] = 0;
					$value['isdel'] = 0;

				}
				if($num==5){
					$value['btime'] =$value['btime']==0?'': setdate($value['btime']);
					$value['etime'] =$value['etime']==0?'': setdate($value['etime']);
					$value['creat_time'] =$value['creat_time']==0?'': setdate($value['creat_time']);
				}

				if($num==6){ 
					 $value['rbtime'] =$value['rbtime']==0?'': setdate($value['rbtime']);
					 $value['retime'] =$value['retime']==0?'': setdate($value['retime']);  
				}

				if($num==8){ 
					 $value['lastupdate'] =$value['lastupdate']==0?'': setdate($value['lastupdate']);
					 $value['wdate'] =$value['wdate']==0?'': setdate($value['wdate']);  
				}
				//用户登陆统计表
				if($num==10){
					$value['logintime'] = !$value['logintime']?'':date("Y-m-d h:m:s", $value['logintime']);
				}	
				//用户统计表
				if($num==12){
					$value['add_time'] = !$value['add_time']?'':date("Y-m-d H:i:s", $value['add_time']);
					$value['qqopenid'] = $value['qqopenid']?1:0;
					$value['wechatopenid'] = $value['wechatopenid']?1:0;
					$value['pcweopenid'] = $value['pcweopenid']?1:0; 
				}			
				if($num==16){
					$value['lastupdate'] = !$value['lastupdate']?'':setdate($value['lastupdate']);
				}

				//记录表
				if($num==17){
					$value['addtime'] = !$value['addtime']?'':date("Y-m-d h:m:s", $value['addtime']);
				}

	}; 

 
 return $arr;
} 









   /**
     * 通过递归获取当前节点的所有子节点
     * @param  [type] $parent     [description]
     * @param  [type] $list       [description]
     * @param  [type] $data       [description]
     * @return [type]             [description]
     */
    function getSons($parent,$list,$data){
        if(hasSon($parent,$list)){
        	 
            //数有几个孩子
            $v = 0;
            foreach ($list as $key => $value) {

                if($parent['id'] == $value['pid']){
                    $v++;
                }
            }

            $j = 0;//计数用的
            foreach ($list as $key => &$value){

                if($parent['id'] == $value['pid']){
                    $j++;
                    $a = 2;
                    if($j==$v){ $a = 3;}  
$value['namelip'] = $parent['cstlip'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--'.$value['namelip']; 
$value['namestr'] = $parent['cststr'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/main/images/m'.$a.'.png">'.$value['namestr']; 
$value['cststr'] = $parent['cststr'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/main/images/m1.png">';
$value['cstlip'] = $parent['cstlip'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--';

                     
                    $data[] = $value;
                    $data = getSons($value,$list,$data);
                }
            }
        }
        return $data;
    }

    /**
     * 判断是否有次级菜单
     * @param  [type]  $parent [description]
     * @param  [type]  $list   [description]
     * @return boolean         [description]
     */
    function hasSon($parent,$list){
        foreach ($list as $key => &$value) {
            if($parent['id']==$value['pid']){
                return true;
            }
        }
        return false;
    }


/**
 *河狸建筑 生成codeid
 * @param    string   
 * @return   arr
 * @author  wyl <181984609@qq.com>
 */ 
function set_codeid($arr,$num){
    $id = gettable($num)['id'];
    /*生成codeid同时，删除原始ID； 0*6  */ 
    foreach ($arr as &$value) {

        $value['codeid'] = jiami($num.'*'.$value[$id]); 


        //对各个表时间戳进行转换
        if(isset($value["createtime"])){
            if($value['createtime']){
                $value['createtime'] = setdate($value['createtime'],true);
                $value['MDtime']=date('n月d日',intval($value['createtime']));
                }
        }


  // p($value);      
        isset($value["timeline"])?$value['timeline'] = setdate($value['timeline'],1):"";
        isset($value["updatetime"])?$value['updatetime'] = setdate($value['updatetime'],true):"";
        isset($value["vipapplytime"])?$value['vipapplytime'] = setdate($value['vipapplytime'],true):"";
        isset($value["applyteachertime"])?$value['applyteachertime'] = setdate($value['applyteachertime'],true):"";
        isset($value["classtime"])?$value['classtime'] = setdate($value['classtime'],true):"";
        isset($value["last_search_time"])?$value['last_search_time'] = setdate($value['last_search_time'],true):"";
        // isset($value["last_logintime"])?$value['last_logintime'] = setdate($value['last_logintime'],true):"";
        isset($value["logintime"])?$value['logintime'] = setdate($value['logintime'],true):"";
        isset($value["certifytime"])?$value['certifytime'] = setdate($value['certifytime'],true):"";
         isset($value["time"])?$value['time'] = setdate($value['time'],true):"";
        if (isset($value["livestart"])&&isset($value["liveend"])) {
            if($value["livestart"]&&$value["liveend"]){
                if($value["liveend"]-$value["livestart"]<(3600*24)){
                    $value['livetimeformat']=date('n月d日 H:i',$value["livestart"]).'-'.date('H:i',$value["liveend"]);
                }else{
                    $value['livetimeformat']=date('n月d日',$value["livestart"]).'-'.date('n月d日',$value["liveend"]);
                }
            }
        }
        if(isset($value['activitystime'])&&isset($value['activityotime'])){
            if($value["activitystime"]&&$value["activityotime"]) 
                if($value["activityotime"]-$value["activitystime"]<(3600*24)){
                    $value['activitystr']=date('n月d日 H:i',$value["activitystime"]).'-'.date('H:i',$value["activityotime"]);
                }else{
                    $value['activitystr']=date('n月d日',$value["activitystime"]).'-'.date('n月d日',$value["activityotime"]);
                }
        }

        if(isset($value['dealtime'])){$value['dealtime']=@date('Y-m-d H:i',$value['dealtime']);}
        if(isset($value['activitystime'])){$value['activitystime']=@date('Y-m-d H:i',$value['activitystime']);}
        if(isset($value['activityotime'])){$value['activityotime']=@date('Y-m-d H:i',$value['activityotime']);}
        if(isset($value['overtime'])){$value['overtime']=@date('Y-m-d H:i',$value['overtime']);}
        if(isset($value['livestart'])){$value['livestart']=@date('Y-m-d H:i',$value['livestart']);}
        if(isset($value['liveend'])){$value['liveend']=@date('Y-m-d H:i',$value['liveend']);}
        if(isset($value['approvedtime'])){$value['approvedtime']=@date('Y-m-d',$value['approvedtime']);}
       

        

        if (isset($value["lessonstart"])&&isset($value["lessonend"])) {
            if($value["lessonstart"]&&$value["lessonend"]) 
                if($value["lessonend"]-$value["lessonstart"]<(3600*24)){
                    $value['timestr']=date('n月d日 H:i',$value["lessonstart"]).'-'.date('H:i',$value["lessonend"]);
                }else{
                    $value['timestr']=date('n月d日',$value["lessonstart"]).'-'.date('n月d日',$value["lessonend"]);
                }
        }


   

        if(isset($value['lessonstart'])){$value['lessonstart']=@date('Y-m-d H:i',$value['lessonstart']);}
        if(isset($value['lessonend'])){$value['lessonend']=@date('Y-m-d H:i',$value['lessonend']);}


        if(isset($value["content"])){
            $value["content"] = htmlspecialchars_decode($value["content"]);
        }

         if(isset($value["time1"])){
            $value["time1"] =@date('Y-m-d H:i',$value['time1']);
             $value["time2"] =@date('Y-m-d H:i',$value['time2']);;
        }

        //  if (isset($value["time1"])&&isset($value["time2"])) {
        //     if($value["time1"]&&$value["time2"]) 
        //     $value['timestr']=date('n.d',$value["time1"]).'('.(week_handle(date('w',$value["time1"]))).')'.date('H:i',$value["time1"]).'-'.date('H:i',$value["time2"]);
        // }

        if(isset($value["thumb"])){
            $temp=array();


           $v =explode(',',$value["thumb"]);
            $value['thumbarr'] = [];
            foreach ($v as $key => $val) {
              $value['thumbarr'][] = ['img'=>$val];   
            }
            $value['thnum']=count($value["thumbarr"]);

        }



    }  
    return $arr;
}















function lgfun($user,$logintype=0){ 
/* 无  0
PC普通登陆  1，
PC微信      2，
PC QQ登陆   3，
微信公众号   4，
移动安卓     5，
移动IOS     6
移动wap端     7

*/ 
// $img = '';
// $name = '';
// if($logintype==0||$logintype==1){
// 	$img = $user['photourl'];
// 	$name = $user['realname']==''?$user['username']:$user['realname'];
// } 
// if($logintype==2){
// 	$img = $user['pcweimg'];
// 	$name = $user['pcwenickname'];
// } 
// if($logintype==3){
// 	$img = $user['qqimg'];
// 	$name = $user['qqnickname'];
// } 
// if($logintype==4){
// 	$img = $user['wechatimg'];
// 	$name = $user['wechatnickname'];
// } 

$code = isset($user['username'])?setscode($user['username']):'';  
$nicheng=isset($user['nicheng'])?$user['nicheng']:'';
$data = array(
'uid'=>$user['uid'],
'name'=>$nicheng, 
'code'=>$code,
'usertype'=>$user['usertype'],
'lointype'=>$logintype,
'headimg'=>$user['photourl'], 
'tel'=>$user['tel'], 
'sex'=>$user['sex'], 
'maxprogram'=>$user['maxprogram'], 
);
//存入redis
  $ln= inserredis($data); 

// 2、存入log登录信息
$data = array(
	'uid' => $user['uid'],
	'logintime' => time(),
	'loginip' => get_client_ip(),
	'logtype' =>$logintype
);
Db::connect("DB_Config_1")->name('log')->insert($data); 
}


function setdate($num){ 
	//$a = strtotime('2015-12-26');1451059200 H:i:s
	$d = $num==0?'':date("Y-m-d", $num); 
	return $d;
}
 

//解析codeid
function explaincodeid($codeid){ 
	$code = jiemi($codeid); 
	if($code=='')return false;
		$axx = explode("*",$code);
		$num = $axx[0]; 
        $a = gettable_id($num); 
 		$arr =array(
 		'tbn'=>$a['tbn'],
 		'id'=>$a['id'],
 		'idv'=>intval($axx[1]),
 		'num'=>$num
 		); //,'code'=>$code,'axx'=>$axx      
 
return $arr;
} 

//还原数据 codeid=989709ykhyku&name=guyuan ===>  prid=9  name=guyuan tbn=program  
function realdata($p,$obj){
$tbn = $obj['tbn'];
$id = $obj['id'];
$idv = $obj['idv'];
unset($p['codeid']); 
unset($obj['tbn']);
unset($obj['id']);
unset($obj['idv']);
unset($obj['num']);
$obj[$id] = $idv;
//对p中的 时间进行转换 送检表
if(isset($p['byriqi'])){$p['byriqi'] = strtotime($p['byriqi']);}
if(isset($p['bytime'])){$p['bytime'] = strtotime($p['bytime']);}
if(isset($p['tytime'])){$p['tytime'] = strtotime($p['tytime']);}
if(isset($p['kstime'])){$p['kstime'] = strtotime($p['kstime']);}
if(isset($p['zttime'])){$p['zttime'] = strtotime($p['zttime']);}
if(isset($p['dztime'])){$p['dztime'] = strtotime($p['dztime']);}
if(isset($p['cmtime'])){$p['cmtime'] = strtotime($p['cmtime']);}
if(isset($p['qztime'])){$p['qztime'] = strtotime($p['qztime']);}
if(isset($p['wqtime'])){$p['wqtime'] = strtotime($p['wqtime']);}
if(isset($p['nqtime'])){$p['nqtime'] = strtotime($p['nqtime']);}
if(isset($p['zptime'])){$p['zptime'] = strtotime($p['zptime']);}

if(isset($p['dzriqi'])){$p['dzriqi'] = strtotime($p['dzriqi']);}
if(isset($p['qzriqi'])){$p['qzriqi'] = strtotime($p['qzriqi']);}
if(isset($p['wqriqi'])){$p['wqriqi'] = strtotime($p['wqriqi']);}
if(isset($p['nqriqi'])){$p['nqriqi'] = strtotime($p['nqriqi']);}
if(isset($p['zpriqi'])){$p['zpriqi'] = strtotime($p['zpriqi']);}


//原材表
if(isset($p['intime'])){$p['intime'] = strtotime($p['intime']);}
if(isset($p['stime'])){$p['stime'] = strtotime($p['stime']);}

// 工程表program
if(isset($p['kaigong'])){$p['kaigong'] = strtotime($p['kaigong']);}
if(isset($p['jungong'])){$p['jungong'] = strtotime($p['jungong']);}

// 工程表子单位
if(isset($p['jcriqi'])){$p['jcriqi'] = strtotime($p['jcriqi']);}
if(isset($p['jctime'])){$p['jctime'] = strtotime($p['jctime']);}
if(isset($p['ztjgriqi'])){$p['ztjgriqi'] = strtotime($p['ztjgriqi']);}
if(isset($p['ztjgtime'])){$p['ztjgtime'] = strtotime($p['ztjgtime']);}
if(isset($p['zxriqi'])){$p['zxriqi'] = strtotime($p['zxriqi']);}
if(isset($p['zxtime'])){$p['zxtime'] = strtotime($p['zxtime']);}

if(isset($p['wmriqi'])){$p['wmriqi'] = strtotime($p['wmriqi']);}
if(isset($p['wmtime'])){$p['wmtime'] = strtotime($p['wmtime']);}
if(isset($p['snqriqi'])){$p['snqriqi'] = strtotime($p['snqriqi']);}
if(isset($p['snqtime'])){$p['snqtime'] = strtotime($p['snqtime']);}
if(isset($p['swqriqi'])){$p['swqriqi'] = strtotime($p['swqriqi']);}
if(isset($p['swqtime'])){$p['swqtime'] = strtotime($p['swqtime']);}
if(isset($p['sqzriqi'])){$p['sqzriqi'] = strtotime($p['sqzriqi']);}
if(isset($p['sqztime'])){$p['sqztime'] = strtotime($p['sqztime']);}
// 工程表program
if(isset($p['rbtime'])){$p['rbtime'] = strtotime($p['rbtime']);}
if(isset($p['retime'])){$p['retime'] = strtotime($p['retime']);}

if(isset($p['wdate'])){$p['wdate'] = strtotime($p['wdate']);}

$newarr = array_merge($p,$obj); 
return array('tbn'=>$tbn,'data'=>$newarr);

}

function addrealdata($p,$obj){
$tbn = $obj['tbn'];
 
unset($p['codeid']); 
unset($obj['tbn']);
unset($obj['id']);
unset($obj['idv']); 
unset($obj['num']);
$newarr = array_merge($p,$obj); 
return array('tbn'=>$tbn,'data'=>$newarr);

}

//数据表枚举；
/*function getcase($num){ 
	$casearr = array(
		"0"=>'program',	   //方法…………
		); 
return $casearr[$num]; 
}*/

//字段过滤；
function delkey($data){ 
	  
return $newdata; 
}


// 解析openid，重组arr
/*function resetarr($arr){
	$openid = $arr['openid'];
	$opstr = jiemi($openid); 
return $newarr;
}*/



// 为加密做准备，截取字段倒数几位
function cutcode($str,$num){
	$ltrl = strlen($str);
	 $start = $ltrl - $num; 
	 $encoding = 'utf-8'; 
	$lstr = mb_substr($str,$start,$num,$encoding);
	return $lstr;
	}

//组合超级密码，存入session
function setscode($str){
	$time = time();
	$code1=cutcode($str,2);
    $code2=cutcode($time,4);
	$super = $code1.$code2;
	return $super;
	
	}

 function jiami($str){
     $code = getcode();
	 return encrypt($str,'E',$code);
	 
	}
function jiemi($str){
	$code = getcode();
	return encrypt($str,'D',$code);
	}
/*********************************************************************
函数名称:encrypt
函数作用:加密解密字符串
使用方法:
加密 :encrypt('str','E','qingdou');
解密 :encrypt('被加密过的字符串','D','qingdou');
参数说明:
$string   :需要加密解密的字符串
$operation:判断是加密还是解密:E:加密   D:解密
$key  :加密的钥匙(密匙);
*********************************************************************/
function encrypt($string,$operation,$key='')
{
$src  = array("/","+","=");
$dist = array("_a","_b","_c");
if($operation=='D'){$string  = str_replace($dist,$src,$string);}
$key=md5($key);
$key_length=strlen($key);
$string=$operation=='D'?base64_decode($string):substr(md5($string.$key),0,8).$string;
$string_length=strlen($string);
$rndkey=$box=array();
$result='';
for($i=0;$i<=255;$i++)
{
$rndkey[$i]=ord($key[$i%$key_length]);
$box[$i]=$i;
}
for($j=$i=0;$i<256;$i++)
{
$j=($j+$box[$i]+$rndkey[$i])%256;
$tmp=$box[$i];
$box[$i]=$box[$j];
$box[$j]=$tmp;
}
for($a=$j=$i=0;$i<$string_length;$i++)
{
$a=($a+1)%256;
$j=($j+$box[$a])%256;
$tmp=$box[$a];
$box[$a]=$box[$j];
$box[$j]=$tmp;
$result.=chr(ord($string[$i])^($box[($box[$a]+$box[$j])%256]));
}
if($operation=='D')
{
if(substr($result,0,8)==substr(md5(substr($result,8).$key),0,8))
{
return substr($result,8);
}
else
{
return'';
}
}
else
{
$rdate  = str_replace('=','',base64_encode($result));
$rdate  = str_replace($src,$dist,$rdate);
return $rdate;
}
}


//验证用户是否登录，如果未登录，返回reply：0；  如果登录reply：1，userdata 用户登录json信息；
		function lornot(){ 
			$sid = cookie("PHPSESSID");

			// $data = S($sid);
			$data = session($sid);
			$reply = $data==false?0:1;
			  if($reply==1){ session($sid,$data); }
			return array('reply'=>$reply,'userdata'=>$data); 
		};

		function getuser(){ 
			$sid = cookie("PHPSESSID");
			// $data = S($sid);
			$data = session($sid);
			$re = $data==false?array():$data; 
			return $re; 
		};

		//退出登录；
		function lout(){ 
			$sid = cookie("PHPSESSID");
			// S($sid,null);
			session($sid,null);
			// $data = S($sid);
			$data = session($sid);
			$reply = $data==false?1:0; 
			return array('reply'=>$reply,'userdata'=>$data); 
		};

		//获取用户信息；
		function getuserdata(){ 
			$sid = cookie("PHPSESSID"); 
			// $data = S($sid);
			$data = session($sid);
			$reply = $data==false?1:0; 
			return array('reply'=>$reply,'userdata'=>$data); 
		};

		//获取超级密钥；
		function getcode(){ 
			$sid = cookie("PHPSESSID"); 
			// $data = S($sid); 
			$data = session($sid);
			
			return $data['code']; 
		};


		//存入redis；
		function inserredis($data){ 
			try{
			$sid = cookie("PHPSESSID"); 
			// $reply = S($sid,$data,3600);
			if($sid){
				$reply = session($sid,$data);
			}else{
				$reply =0;
			}
			//$reply = $data==false?1:0; 
			return $reply; 
			}catch(\Exception $e){
				p('redis');
			}
		};

		//获取 自己的redis；
		function getredis(){ 
			$sid = cookie("PHPSESSID"); 
			// $reply = S($sid);
			$reply = session($sid);
			//$reply = $data==false?1:0; 
			return $reply; 
		};

		 	 
 



/*返回前端的数据格式
将查询结果传入函数；
1、获取 总条数，列表数据；
2、对列表数据进行重组 openid；
返回  前端需要的格式；
*/
/*function returnarr_main($arr=array(),$num){ 
	if($arr['reply']==1){
			$dl = setcodeid($arr['datalist'],$num);
			$maindata = array('total'=>$arr['total'],'datalist'=>$dl);
	}else{
		$dl = array();
		$maindata = array('total'=>$arr['total'],'datalist'=>$dl);
	}
return array(
	'reply'=>$arr['reply'],
	'msg'=>'',
	'data'=>array('maindata'=>$maindata)
	);
}*/





//数据库公共函数
//
//3、只查询一条记录
	function ys_find($table,$arr){
		$re = Db::connect("DB_Config_1")->name($table)->where($arr)->find();
		if($re){
			return array('code'=>1,'data'=>$re);
		}else{
			return array('code'=>0,'data'=>array());
		}
			
		}

		//3、只查询一条记录
	function findone($table,$arr){
		$re = Db::connect("DB_Config_1")->name($table)->where($arr)->find();
		return $re; 
		}

//3、 查询多条记录
	function ys_findmore($table,$arr){
		$re = Db::connect("DB_Config_1")->name($table)->where($arr)->select();
		if($re){
			return array('code'=>1,'datalist'=>$re);
		}else{
			return array('code'=>0,'datalist'=>array());
		}
			
		}

//4、新的查询方法 所有字段;
function nopage_select($tablename,$orderstr,$arr){

$ad = Db::connect("DB_Config_1")->name($tablename)->select(); 
				if($ad){ 
				 return array('datalist'=>$ad);  		      
				}else{
			     return array('datalist'=>array());
				}
		}
//4、新的查询方法 非分页的查询方法 所有字段;
function nopage_select_byarr($tablename,$orderstr,$arr){

$ad = Db::connect("DB_Config_1")->name($tablename)->where($arr)->order($orderstr)->select(); 
				if($ad){ 
				 return array('datalist'=>$ad);  		      
				}else{
			     return array('datalist'=>array());
				}
		}

//4、新的查询方法 非分页的查询方法 部分字段;
function nopage_select_byarr_field($tablename,$orderstr,$arr,$filed){

$ad = Db::connect("DB_Config_1")->name($tablename)->where($arr)->field($filed)->order($orderstr)->select(); 
				if($ad){ 
				 return array('datalist'=>$ad);  		      
				}else{
			     return array('datalist'=>array());
				}
		}
// 5、分页查询方法 查询所有字段 
function page_select_byarr($tablename,$orderstr,$arr,$nowpage,$listnum){

$begin = ($nowpage-1)*$listnum;
 $total = Db::connect("DB_Config_1")->name($tablename)->where($arr)->count(); 

if($total>0){
	$pages = ceil($total/$listnum);
	 $ad = Db::connect("DB_Config_1")->name($tablename)->where($arr)->order($orderstr)->limit($begin,$listnum)->select(); 
  	   return  array('total'=>$total,'datalist'=>$ad,'pages'=>$pages);  		      
				 
}else{
	return array('total'=>0,'datalist'=>array(),'pages'=>0);
} 
} 
// 5、分页查询方法  __查询部分字段 
function page_select_byarr_field($tablename,$orderstr,$arr,$nowpage,$listnum,$field){

$begin = ($nowpage-1)*$listnum;
 $total = Db::connect("DB_Config_1")->name($tablename)->where($arr)->count(); 
if($total>0){
	$pages = ceil($total/$listnum);
	 $ad = Db::connect("DB_Config_1")->name($tablename)->where($arr)->field($field)->order($orderstr)->limit($begin,$listnum)->select(); 
  	   if($ad){
  	   	return array('total'=>$total,'datalist'=>$ad,'pages'=>$pages); 
  	   }else{
  	   	return array('total'=>0,'datalist'=>array(),'pages'=>0); 
  	   } 		      
				 
}else{
	return array('total'=>0,'datalist'=>array(),'pages'=>0);
} 
} 
 



// 更新某一个字段
function updateone($tablename,$where,$newstr){
  $re = Db::connect("DB_Config_1")->name($tablename)->where($where)->setField($newstr);
  return $re;
} 











// 通过prID 获取  子单位
function getallsin($prid=0){
		if($prid!=0){
			$tablename = 'single';
			$orderstr ='';
			$arr = array('prid'=>$prid,'isdel'=>0);
			$filed = 'sid,sname,cengshu,jiegou,jcriqi,jctime,ztjgriqi,ztjgtime,zxriqi,zxtime,wmriqi,wmtime';
			$sdata = nopage_select_byarr_field($tablename,$orderstr,$arr,$filed);
			$sdata['datalist'] = setcodeid($sdata['datalist'],2);
			$len = count($sdata['datalist']);
			for($i=0;$i<$len;$i++){
				$sdata['datalist'][$i]['rd'] = rand(1,19);
				$sdata['datalist'][$i]['ngclass'] = '';
				$sdata['datalist'][$i]['type'] = 'single';
			}
			return $sdata;
		}
	}



	//切换当前工程
 function changenowprogram($prid=''){
       if($prid!=''){
    $uid = getuser()['uid'];
    Db::connect("DB_Config_1")->name('program')->where(array("uid"=>$uid))->save(array("dangqian"=>0));
    $pd = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$prid))->save(array("dangqian"=>1));

    $pc = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$prid))->find();
    cookie('nowprname',$pc['prname']);
    //切换子单位 
    $sd = Db::connect("DB_Config_1")->name('single')->where(array('prid'=>$prid,"dangqian"=>1))->find();
    //更新redis
    if($pd){
        $data = getuser();
        $data['nowprid'] = $prid;
        $data['nowsid'] = $sd['sid'];
        inserredis($data);
    } 
  } 
   };

 


function curl_file_get_contents($durl){  
    $ch = curl_init();  
    curl_setopt($ch, CURLOPT_URL, $durl);  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ; // 获取数据返回    
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, true) ; // 在启用 CURLOPT_RETURNTRANSFER 时候将获取数据返回    
    $r = curl_exec($ch);  
    curl_close($ch);  
    return $r;  
} 


function getcurlstr($url){
	  	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$output = curl_exec($ch);
	curl_close($ch);
	return $output;
}


function getcurl($url){
	if($url!=''){
	 $ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    $output = curl_exec($ch);
	    curl_close($ch);
	$jsoninfo = json_decode($output, true);
	return $jsoninfo;
}

}


function ys_head($str="utf-8"){
	header("Content-type: text/html; charset=".$str); 
}
 
function weathercon($tablename,$arr,$send,$post,$nowpage,$listnum){
 
	$value = explode(',',$send);
	for ($i=0; $i < count($value); $i++) { 
		$val = $value[$i];
		if ($val == 'wdate'&&$val) {
			$post[$val] = strtotime($post[$val]);
		}
		if (isset($post[$val])) {
			if($post[$val])
			$arr = ''.$arr.' AND cy_weather.'.$val.' = '.$post[''.$val.''].''; 
		}
	}
	$begin = ($nowpage-1)*$listnum;
	$end = $begin+$listnum;
	$sqlleng = 'select * from cy_city,cy_weather where cy_city.ctid = cy_weather.ctid AND cy_weather.isdel=0 '.$arr.'';
	$sql = ''.$sqlleng.' order by wdate desc LIMIT '.$begin.' , '.$listnum.'';
	$re['total'] = count(Db::connect("DB_Config_1")->name($tablename)->query($sqlleng));
	$re['pages'] = $re['total']/$listnum;
	$re['datalist'] = Db::connect("DB_Config_1")->name($tablename)->query($sql);
	return $re;
}
//运营用户表关联查询
function userconnect($tablename,$nowpage,$listnum,$filed){
	$begin = ($nowpage-1)*$listnum;
	$end = $begin+$listnum;
	$sqlleng = 'select * from cy_user';
	$re['total'] = count(Db::connect("DB_Config_1")->name($tablename)->query($sqlleng));
	$re['pages'] = $re['total']/$listnum;
	$re['datalist'] = Db::connect("DB_Config_1")->name($tablename)->field($filed)->limit($begin,$listnum)->order('uid desc')->select();
	return $re;
}
//运营项目表关联查询
function proconnect($tablename,$nowpage,$listnum,$pid,$cityid){
	$begin = ($nowpage-1)*$listnum;
	$end = $begin+$listnum;
	$a = '';
	if ($pid) {
		$a = 'where cy_program.pid = '.$pid;
	}
	if ($cityid) {
		$a = 'where cy_program.cityid = '.$cityid;
	}

	$sqlleng = 'select cy_program.*,cy_user.*,cy_city.* from cy_program left join cy_user on cy_program.uid = cy_user.uid left join cy_city on cy_city.ctid = cy_program.cityid '.$a.'';
	$sql = ''.$sqlleng.' order by cy_program.add_time desc LIMIT '.$begin.' , '.$listnum.'';
	$re['total'] = count(Db::connect("DB_Config_1")->name($tablename)->query($sqlleng));
	$re['pages'] = $re['total']/$listnum;
	$re['datalist'] = Db::connect("DB_Config_1")->name($tablename)->query($sql);
	return $re;

}
//公用运营表关联查询
function comconnect($tablename,$nowpage,$listnum){
	$begin = ($nowpage-1)*$listnum;
	$end = $begin+$listnum;
	$sqlleng = 'select cy_user.uid,username,realname,logintime,loginip,logtype,cid from cy_user,cy_'.$tablename.' where cy_user.uid = cy_'.$tablename.'.uid';
	$sql = ''.$sqlleng.' order by logintime desc LIMIT '.$begin.' , '.$listnum.'';
	$re['total'] = count(Db::connect("DB_Config_1")->name($tablename)->query($sqlleng));
	$re['pages'] = $re['total']/$listnum;
	$re['datalist'] = Db::connect("DB_Config_1")->name($tablename)->query($sql);
	return $re;
}
//横道图作业关联查询
function hdtconnect($tablename,$hid){
	$sql = 'select hid,beizhu,btime,comtitle,creat_time,etime,ftitle,htitle from cy_hengdaotu where cy_hengdaotu.hid = '.$hid.'';
	return Db::connect("DB_Config_1")->name($tablename)->query($sql);
}


//公共删除方法
function commondelect($delarr,$num){
	$tablename = gettable_id($num)['tbn'];  
	$id = gettable_id($num)['id'];  
    $length = count($delarr);
    $update = array(
    	'isdel' => 1
    );
    for ($i=0; $i < $length; $i++) { 
      $arr = explaincodeid($delarr[$i]);
      
    } 

	Db::connect("DB_Config_1")->name($tablename)->where(array('prid' => '292'))->save($update);
	return explaincodeid($delarr[1]);
}


//公共单条记录 更新方法
function comupdate($tbn,$data){
	$re = Db::connect("DB_Config_1")->name($tbn)->save($data);
	if($re==false){
		 return array('code'=>0,'msg'=>'保存失败！');
	}else{
		return array('code'=>1,'msg'=>'保存成功！');
	}
}

//公共删除方法单个删除，多个删除
function comdel($tbn,$arr){
	$re = Db::connect("DB_Config_1")->name($tbn)->where($arr)->update(array('isdel'=>1));
	if($re==false){
		 return array('code'=>0,'msg'=>'删除失败！');
	}else{
		return array('code'=>1,'msg'=>'删除成功！');
	}	
}

//公共验证的方法
function prove($post,$arr){
	$re = '1';
	for ($i=0; $i < count($arr); $i++) { 
		if(!$post[$arr[$i]]){
			$re = '0';			
		};
	}
	if($re==0){
		return array('code'=>0,'msg'=>'填写不完整');
	}else{
		return 1;
	}		
}

























//普通用户
//今后采取菜单配置化
//超级管理员用户；
function menu($power){  
	$arr[0] = array(
		"ngclass"=>"",
            "title"=>"我的工程",
            "url"=>"program/pro",
            "icon"=>"icon1",
            "tap"=>"program",
            "chl"=>array(
		            	0=>array(
		            		"ngclass"=>"",
							    "title"=>"工程列表", 
							    "show"=>"dpn",
							    "tap"=>"pro",
							    "chl"=>array()
		            		),
		            	1=>array(
		            		"ngclass"=>"",
							    "title"=>"进度管理", 
							    "show"=>"",
							    "tap"=>"work",
							    "chl"=>array()
		            		),
		            	2=>array(
		            		"ngclass"=>"",
							    "title"=>"送检计划", 
							    "show"=>"",
							    "tap"=>"plan",
							    "chl"=>array()
		            		),
		            	3=>array(
		            		"ngclass"=>"",
							    "title"=>"七天送检", 
							    "show"=>"",
							    "tap"=>"gether",
							    "chl"=>array()
		            		),
		            	4=>array(
		            		"ngclass"=>"",
							    "title"=>"土建资料", 
							    "show"=>"",
							    "tap"=>"struct",
							    "chl"=>array()
		            		),
		            	5=>array(
		            		"ngclass"=>"",
							    "title"=>"安全资料", 
							    "show"=>"",
							    "tap"=>"safe",
							    "chl"=>array()
		            		),
		            	6=>array(
		            		"ngclass"=>"",
							    "title"=>"横道图管理", 
							    "show"=>"",
							    "tap"=>"gantt",
							    "chl"=>array()
		            		),
		            	7=>array(
		            		"ngclass"=>"",
							    "title"=>"横道图详情", 
							    "show"=>"dpn",
							    "tap"=>"ganttdetail",
							    "chl"=>array()
		            		)
            	)
		);

			$arr[1] = array(
					"ngclass"=>"",
			            "title"=>"个人中心",
			            "url"=>"user/info",
			            'icon'=>'iconx',
			            "show"=>"",
			            "tap"=>"user",
			            "chl"=>array(
					            	0=>array(
					            		"ngclass"=>"",
										    "title"=>"个人中心", 
										    "show"=>"dpn",
										    "tap"=>"info",
										    "chl"=>array()
					            		)
			            	)
					);



if($power>2){ return $arr; } 



$arr[2] = array(
		"ngclass"=>"",
            "title"=>"系统配置",
            "url"=>"system/city",
            "icon"=>"icon2",
            "tap"=>"system",
            "chl"=>array(
		            	0=>array(
		            		"ngclass"=>"",
							    "title"=>"城市管理", 
							    "show"=>"",
							    "tap"=>"city",
							    "chl"=>array()
		            		),
		            	1=>array(
		            		"ngclass"=>"",
							    "title"=>"原材模板", 
							    "show"=>"",
							    "tap"=>"mattertpl",
							    "chl"=>array()
		            		),
		            	2=>array(
		            		"ngclass"=>"",
							    "title"=>"统表类型", 
							    "show"=>"",
							    "tap"=>"tbtype",
							    "chl"=>array()
		            		),
		            	3=>array(
		            		"ngclass"=>"",
							    "title"=>"统表管理", 
							    "show"=>"",
							    "tap"=>"tongbiao",
							    "chl"=>array()
		            		)  
            	)
		);



	$arr[3] = array(
		"ngclass"=>"",
            "title"=>"业务管理",
            "url"=>"service/weather",
            "icon"=>"icon3",
            "tap"=>"service",
            "chl"=>array(
		            	0=>array(
		            		"ngclass"=>"",
							    "title"=>"温度管理", 
							    "show"=>"",
							    "tap"=>"weather",
							    "chl"=>array()
		            		)
		         //    	1=>array(
		         //    		"ngclass"=>"",
							    // "title"=>"微信管理", 
							    // "show"=>"",
							    // "tap"=>"work",
							    // "chl"=>array()
		         //    		),
		            	 
            	)
		);

	$arr[4] = array(
		"ngclass"=>"",
            "title"=>"运营管理",
            "url"=>"operate/user",
            "icon"=>"icon4",
            "tap"=>"operate",
            "chl"=>array(
		            	0=>array(
		            		"ngclass"=>"",
							    "title"=>"用户统计", 
							    "show"=>"",
							    "tap"=>"user",
							    "chl"=>array()
		            		),
		            	1=>array(
		            		"ngclass"=>"",
							    "title"=>"登陆统计", 
							    "show"=>"",
							    "tap"=>"logincount",
							    "chl"=>array()
		            		),
		            	2=>array(
		            		"ngclass"=>"",
							    "title"=>"公司列表", 
							    "show"=>"",
							    "tap"=>"com",
							    "chl"=>array()
		            		),
		            	3=>array(
		            		"ngclass"=>"",
							    "title"=>"项目列表", 
							    "show"=>"",
							    "tap"=>"pro",
							    "chl"=>array()
		            		),
		            	4=>array(
		            		"ngclass"=>"",
							    "title"=>"用户汇总登陆", 
							    "show"=>"",
							    "tap"=>"usergather",
							    "chl"=>array()
		            		)  
            	)
		);

 return $arr;
}

/*查询七天送检统计中的  原材送检mid,mname,intime,stime,ycys*/
function ys_sel_yc($table,$str,$order){
	$sql = "select * from cy_matter where ";
	$sql .= $str." order by ".$order;  
	$data = Db::connect("DB_Config_1")->name($table)->query($sql);
	// return $sql;
 	if($data){       
	$re = setcodeid($data,3); //将返回数据的id进行加密 			 
	return $re;
	}else{
		return array();
	}
}

//查询七天送检统计
function ys_sel_hz($table,$str,$order){
	$sql = "select * from cy_songjian,cy_single where cy_songjian.sid = cy_single.sid and cy_songjian.isdel=0 and ";
	$sql .= $str." order by ".$order; 
// return $sql;
	$data = Db::connect("DB_Config_1")->name($table)->query($sql);
 	if($data){
		$re = setcodeid($data,4); //将返回数据的id进行加密           
		return $re;
	}else{
		return array();
	}
}


function gether($prid,$btime,$etime)
{
	$nowsm = strtotime(date('Y-m-d',time()));
	$arr = array();
	$artyc = array();
	$artby = array();
	$artty = array();
	$artks = array();
	$artzt = array();
	$artdz = array();
	$artcm = array();
	$artqz = array();
	$artwq = array();
	$artnq = array();
	$artzp = array();
	// 原材汇总 
	$str = "prid=".$prid." and ycys=0 and intime>0 and stime>=".$btime." and stime<=".$etime;  
	$artyc['hzlist'] = ys_sel_yc('matter',$str,"stime asc");
	//原材漏送 
	$str = "prid=".$prid." and ycys=0 and intime>0 and stime>0 and stime<".$nowsm;
	$artyc['lslist'] = ys_sel_yc('matter',$str,"stime asc");
	$arr['yc'] = $artyc;



	//标准养护 
	$table = 'songjian';
	$str = "cy_songjian.prid=".$prid." and byys=0 and bytime>=".$btime." and bytime<=".$etime; 
	$artby['hzlist'] = ys_sel_hz($table,$str,"bytime asc");
 
	$str = "cy_songjian.prid=".$prid." and byys=0 and byriqi>0 and bytime>0 and bytime<".$nowsm; 
	$artby['lslist'] = ys_sel_hz($table,$str,"bytime asc");
	$arr['by'] = $artby;


	//同养 
	$str = "cy_songjian.prid=".$prid." and tyornot=1 and tyys=0 and tytime>=".$btime." and tytime<=".$etime; 
	$artty['hzlist'] = ys_sel_hz($table,$str,"tytime asc");
	$str = "cy_songjian.prid=".$prid." and tyornot=1 and tyys=0 and tytime>0 and tytime<".$nowsm; 
	$artty['lslist'] = ys_sel_hz($table,$str,"tytime asc");
	$arr['ty'] = $artty;
	 
	 //抗渗
	$str = "cy_songjian.prid=".$prid." and ksornot=1 and ksys=0 and kstime>=".$btime." and kstime<=".$etime; 
	$artks['hzlist'] = ys_sel_hz($table,$str,"kstime asc");	 
	$str = "cy_songjian.prid=".$prid." and ksornot=1 and ksys=0 and kstime>0 and kstime<".$nowsm; 
	$artks['lslist'] = ys_sel_hz($table,$str,"kstime asc");
	$arr['ks'] = $artks;
	 
	 //柱头
	$str = "cy_songjian.prid=".$prid." and ztornot=1 and ztys=0 and zttime>=".$btime." and zttime<=".$etime; 
	$artzt['hzlist'] = ys_sel_hz($table,$str,"zttime asc");
	$str = "cy_songjian.prid=".$prid." and ztornot=1 and ztys=0 and zttime>0 and zttime<".$nowsm; 
	$artzt['lslist'] = ys_sel_hz($table,$str,"zttime asc");
	$arr['zt'] = $artzt;
	 
	 //焊接
	$str = "cy_songjian.prid=".$prid." and dzornot=1 and dzys=0 and dztime>=".$btime." and dztime<=".$etime; 
	$artdz['hzlist'] = ys_sel_hz($table,$str,"dztime asc");
	$str = "cy_songjian.prid=".$prid." and dzornot=1 and dzys=0 and dztime>0 and dztime<".$nowsm; 
	$artdz['lslist'] = ys_sel_hz($table,$str,"dztime asc");
	$arr['dz'] = $artdz;

	//拆模
	$str = "cy_songjian.prid=".$prid." and cmornot=1 and cmys=0 and cmtime>=".$btime." and cmtime<=".$etime; 
	$artcm['hzlist'] = ys_sel_hz($table,$str,"cmtime asc");
	$str = "cy_songjian.prid=".$prid." and cmornot=1 and cmys=0 and cmtime>0 and cmtime<".$nowsm; 
	$artcm['lslist'] = ys_sel_hz($table,$str,"cmtime asc");
	$arr['cm'] = $artcm;
 	
 	//砌筑
	$str = "cy_songjian.prid=".$prid." and  qzornot=1 and qzys=0 and qztime>=".$btime." and qztime<=".$etime; 
	$artqz['hzlist'] = ys_sel_hz($table,$str,"qztime asc");
	$str = "cy_songjian.prid=".$prid." and  qzornot=1 and qzys=0 and qztime>0 and qztime<".$nowsm; 
	$artqz['lslist'] = ys_sel_hz($table,$str,"qztime asc");
	$arr['qz'] = $artqz;
	 
	//内墙
	$str = "cy_songjian.prid=".$prid." and nqornot=1 and nqys=0 and nqtime>=".$btime." and nqtime<=".$etime; 
	$artnq['hzlist'] = ys_sel_hz($table,$str,"nqtime asc");
	$str = "cy_songjian.prid=".$prid." and nqornot=1 and nqys=0 and nqtime>0 and nqtime<".$nowsm; 
	$artnq['lslist'] = ys_sel_hz($table,$str,"nqtime asc");
	$arr['nq'] = $artnq;
 
 	//外墙
	$str = "cy_songjian.prid=".$prid." and wqornot=1 and wqys=0 and wqtime>=".$btime." and wqtime<=".$etime; 
	$artwq['hzlist'] = ys_sel_hz($table,$str,"wqtime asc");
	$str = "cy_songjian.prid=".$prid." and wqornot=1 and wqys=0 and wqtime>0 and wqtime<".$nowsm; 
	$artwq['lslist'] = ys_sel_hz($table,$str,"wqtime asc");
	$arr['wq'] = $artwq;
	 
	 //找平
	$str = "cy_songjian.prid=".$prid." and zpornot=1 and zpys=0 and zptime>=".$btime." and zptime<=".$etime; 
	$artzp['hzlist'] = ys_sel_hz($table,$str,"zptime asc");
	$str = "cy_songjian.prid=".$prid." and zpornot=1 and zpys=0 and zptime>0 and zptime<".$nowsm; 
	$artzp['lslist'] = ys_sel_hz($table,$str,"zptime asc");
	$arr['zp'] = $artzp; 

	return $arr; 
}



/**
 * 处理七天送检的辅助方法
 * 
 */
function getDataFromSQL($field,$str,$order){
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
 * 处理七天送检的辅助方法_ 私有方法，针对同养，获取温度；
 * 
 */
function getDataFromSQLtongyang($field,$str,$order){
  $sql = "SELECT {$field} FROM cy_songjian t1 LEFT JOIN cy_single t2 ON t1.prid = t2.prid AND t1.sid = t2.sid WHERE  t1.sid = t2.sid AND t1.isdel = 0 AND  {$str} ORDER BY {$order}";
  $data = Db::connect("DB_Config_1")->name('songjian')->query($sql);
  if($data){
$today = time(); 
   //对数据进行同养设置
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




    $re = setcodeid($data,4); //将返回数据的id进行加密           
    return $re;
  }else{
    return array();
  }
}


/**
 * 七天送检--修改版本1
 * @param $btime 开始时间
 * @param $etime 结束时间
 * @param $prid 工程id
 *
 */
function songjianhuizong($prid,$btime,$etime)
{
	$nowsm = strtotime(date('Y-m-d',time()));
	$arr = array();
	$artyc = array();
	$artby = array();
	$artty = array();
	$artks = array();
	$artzt = array();
	$artdz = array();
	$artcm = array();
	$artqz = array();
	$artwq = array();
	$artnq = array();
	$artzp = array();

	/* ==============================  原材汇总  begin =============================== */

	// 原材汇总 
 	$sql = "select  * from  cy_matter where prid={$prid} and ycys=0 and intime > 0 and stime>={$btime} and stime<={$etime} order by stime asc";
    $re = Db::connect("DB_Config_1")->name('matter')->query($sql);
    if($re){
    	$re = setcodeid($re,3);//将返回数据的id进行加密
    }else{
    	$re = array();
    }
    $artyc['hzlist'] = $re;


    //原材漏送 
    $sql = "select  * from  cy_matter where prid={$prid} and ycys=0 and intime > 0 and stime>= 0 and stime<{$nowsm} order by stime asc";
    $re = Db::connect("DB_Config_1")->name('matter')->query($sql);
    if($re){
    	$re = setcodeid($re,3);//将返回数据的id进行加密
    }else{
    	$re = array();
    }
    $artyc['lslist'] = $re;
    $arr['yc'] = $artyc;

    /* ==============================  七天送检  begin  =============================== */


    // 标养 -- 1
    $field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.bybh,t1.bybuwei,t1.byjg,t1.byqiangdu,t1.byriqi,t1.bytem,t1.bytime,t1.byxinpian,t1.byyl,t1.byys,t1.byzushu';
    $str   = "t1.prid={$prid} AND t1.byys=0 AND t1.bytime>={$btime} AND t1.bytime<={$etime}"; 
    $order = "t1.bytime ASC";
    $artby['hzlist'] = getDataFromSQL($field,$str,$order); 

    $str   = "t1.prid={$prid} AND t1.byys=0 AND t1.byriqi>0 and t1.bytime>0 and t1.bytime<{$nowsm}"; 
	$artby['lslist'] = getDataFromSQL($field,$str,$order); 
	$arr['by'] = $artby;

	// 同养 -- 2
	$field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.tybh,t1.bybuwei,t1.byriqi,t1.prid,t1.byqiangdu,t1.tyname,t1.tyornot,t1.tytem,t1.tytime,t1.tyxinpian,t1.tyys,t1.tyzushu,t1.byriqi';
    $str   = "t1.prid={$prid} AND t1.tyornot=1 AND t1.tyys=0 AND t1.tytime>={$btime} AND t1.tytime<={$etime}"; 
    $order = "t1.tytime ASC"; 
    $artty['hzlist'] = getDataFromSQLtongyang($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.tyornot=1 AND t1.tyys=0 AND t1.tytime>0 and t1.tytime<{$nowsm}";
    $artty['lslist'] = getDataFromSQLtongyang($field,$str,$order); 
	$arr['ty'] = $artty;

	// 抗渗  -- 3
	$field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.bybuwei,t1.byqiangdu,t1.byriqi,t1.ksname,t1.ksornot,t1.kszushu,t1.ksdengji,t1.kstime,t1.ksys,t1.ksbh,t1.ksjg';
    $order = "t1.kstime ASC"; 
    $str   = "t1.prid={$prid} AND t1.ksornot=1 AND t1.ksys=0 AND t1.kstime>={$btime} AND t1.kstime<={$etime}"; 
    $artks['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.ksornot=1 AND t1.ksys=0 AND t1.kstime>0 and t1.kstime<{$nowsm}";
    $artks['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['ks'] = $artks;
	 
    // 柱头 -- 4
    $field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.byriqi,t1.byqiangdu,t1.ztbh,t1.ztjg,t1.ztname,t1.ztornot,t1.ztriqi,t1.zttime,t1.ztxinpian,t1.ztys,t1.ztzushu';
    $str   = "t1.prid={$prid} AND t1.ztornot=1 AND t1.ztys=0 AND t1.zttime>={$btime} AND t1.zttime<={$etime}";
    $order = "t1.zttime ASC";
    $artzt['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.ztornot=1 AND t1.ztys=0 AND t1.zttime>0 and t1.zttime<{$nowsm}";
    $artzt['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['zt'] = $artzt; 
		 
	// 焊接 -- 5
    $field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.byriqi,t1.dzbh,t1.dzchangjia,t1.dzguige,t1.dzjg,t1.dzname,t1.dzornot,t1.dzpaihao,t1.dzriqi,t1.dztime,t1.dzys,t1.dzzushu';
    $str   = "t1.prid={$prid} AND t1.dzornot=1 AND t1.dzys=0 AND t1.dztime>={$btime} AND t1.dztime<={$etime}";
    $order = "t1.dztime ASC";  
    $artdz['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.dzornot=1 AND t1.dzys=0 AND t1.dztime>0 and t1.dztime<{$nowsm}";
    $artdz['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['dz'] = $artdz; 


    // 拆模 -- 6 --no
    $field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.byriqi,t1.byqiangdu,t1.cmbh,t1.cmjg,t1.cmname,t1.cmornot,t1.cmtime,t1.cmys,t1.cmzushu';
    $str   = "t1.prid={$prid} AND t1.cmornot=1 AND t1.cmys=0 AND t1.cmtime>={$btime} AND t1.cmtime<={$etime}";
    $order = "t1.cmtime ASC";  
    $artcm['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.cmornot=1 AND t1.cmys=0 AND t1.cmtime>0 and t1.cmtime<{$nowsm}";
    $artcm['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['cm'] = $artcm; 

    // 砌筑 -- 7
    $field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.qzbh,t1.qzjg,t1.qzname,t1.qzornot,t1.qzqiangdu,t1.qzriqi,t1.qztem,t1.qztime,t1.qzys,t1.qzzushu';
    $str   = "t1.prid={$prid} AND  t1.qzornot=1 AND t1.qzys=0 AND t1.qztime>={$btime} AND t1.qztime<={$etime}"; 
    $order = "t1.qztime ASC"; 
    $artqz['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.qzornot=1 AND t1.qzys=0 AND t1.qztime>0 and t1.qztime<{$nowsm}";
    $artqz['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['qz'] = $artqz; 
	
 	// 内墙 -- 8
	$field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.nqbh,t1.nqjg,t1.nqname,t1.nqornot,t1.nqqiangdu,t1.nqriqi,t1.nqtem,t1.nqtime,t1.nqys,t1.nqzushu';
    $str   = "t1.prid={$prid} AND t1.nqornot=1 AND t1.nqys=0 AND t1.nqtime>={$btime} AND t1.nqtime<={$etime}";
    $order = "t1.nqtime ASC"; 
    $artnq['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.qzornot=1 AND t1.qzys=0 AND t1.nqtime>0 and t1.nqtime<{$nowsm}";
    $artnq['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['nq'] = $artnq;

	// 外墙 -- 9 -- no
	$field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.wqbh,t1.wqjg,t1.wqname,t1.wqornot,t1.wqqiangdu,t1.wqriqi,t1.wqtem,t1.wqtime,t1.wqys,t1.wqzushu';
    $str   = "t1.prid={$prid} AND t1.wqornot=1 AND t1.wqys=0 AND t1.wqtime>={$btime} AND t1.wqtime<={$etime}";
    $order = "t1.wqtime ASC"; 
    $artwq['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.wqornot=1 AND t1.wqys=0 AND t1.wqtime>0 and t1.wqtime<{$nowsm}";
    $artwq['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['wq'] = $artwq;
 	
    // 找平 -- 10
 	$field = 't2.sname,t1.tid,t1.fid,t1.myorder,t1.zpbh,t1.zpjg,t1.zpname,t1.zpornot,t1.zpqiangdu,t1.zpriqi,t1.zptem,t1.zptime,t1.zpys,t1.zpzushu';
 	$str   = "t1.prid={$prid} AND t1.zpornot=1 AND t1.zpys=0 AND t1.zptime>={$btime} AND t1.zptime<={$etime}";
    $order = "t1.zptime ASC"; 
    $artzp['hzlist'] = getDataFromSQL($field,$str,$order); 
    $str   = "t1.prid={$prid} AND t1.zpornot=1 AND t1.zpys=0 AND t1.zptime>0 and t1.zptime<{$nowsm}";
    $artzp['lslist'] = getDataFromSQL($field,$str,$order); 
    $arr['zp'] = $artzp;
    
	return $arr; 
}



//工程统计-原材送检统计
function ys_mtr_sum($table,$arr,$key){
$d = Db::connect("DB_Config_1")->name($table)->where($arr)->sum($key);
return $d;
};
 

// 统计汇总信息
function procount2($prid){ 
 

    //查询工程基本信息
    $prodata = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$prid,'isdel'=>0))->find(); 
    $pr['kaigong'] = setdate($prodata['kaigong']);
    $pr['jungong'] = setdate($prodata['jungong']);
    $pr['prname'] = $prodata['prname'];  
	$sql = "select 	t1.yctype,SUM(t1.yczushu) yczushu,SUM(CASE WHEN t1.ycys = 1 THEN t1.yczushu ELSE 0 	END	 
	       )  ycys  FROM	cy_matter t1  WHERE t1.prid = '.$prid.' GROUP BY 	t1.yctype
           UNION 
           SELECT	'0',SUM(yczushu) yczushu,SUM(CASE	WHEN ycys = 1 THEN yczushu ELSE 0 END	) ycys
           FROM	cy_matter WHERE  prid = '.$prid.' ";
 	$mat = Db::connect("DB_Config_1")->name('matter')->query($sql);

 	/*$prowork = array();
 	$sql = "select t1.prid,t1.sid,t2.sname,t1.bybuwei,t1.byriqi from 
 			(select prid,sid,bybuwei,byriqi from cy_songjian where prid = '.$prid.' and sid= '.$sid.') t1  
			LEFT JOIN (select sid,prid,sname from cy_single WHERE prid = '.$prid.' and sid = '.$sid.') t2
			on t1.prid = t2.prid AND t1.sid = t2.sid
			ORDER BY t1.byriqi DESC LIMIT 1";
 	$singlearr = Db::connect("DB_Config_1")->name('single')->where(array('prid'=>$prid,'isdel'=>0))->field('sid,sname,prid')->select();
 		foreach ($singlearr as $value) {
 			$sid = $value['sid'];			
 			$prowork[]=Db::connect("DB_Config_1")->name('songjian')->query($sql);
 		}*/

	$re = array( 
			'base'=>$pr,
			'work'=>$prowork,
			'matter'=>$mat, 
		);

    return $re; 

}






//进度管理统计信息

function procount($prid){
	$re = Db::connect("DB_Config_1")->name('matter')->where(array('prid'=>$prid,'isdel'=>0))->select();
	$nowsm = strtotime(date('Y-m-d',time()));
	//遍历
	$ys = array(
		'0'=>0,
		'1'=>0,
		'2'=>0,
		'3'=>0,
		'4'=>0,
		'5'=>0,
		'6'=>0,
		'7'=>0,
		'8'=>0,
		'9'=>0
		);

		$ws = array(
		'0'=>0,
		'1'=>0,
		'2'=>0,
		'3'=>0,
		'4'=>0,
		'5'=>0,
		'6'=>0,
		'7'=>0,
		'8'=>0,
		'9'=>0
		);

	$ls = array(
		'0'=>0,
		'1'=>0,
		'2'=>0,
		'3'=>0,
		'4'=>0,
		'5'=>0,
		'6'=>0,
		'7'=>0,
		'8'=>0,
		'9'=>0
		);

	foreach ($re as $k=>&$value){
		for ($i=1; $i < 10; $i++) {  
			if($value['yctype']==$i){
				//已送
				if($value['ycys']==1){$ys[$i]+=$value['yczushu'];}
				//未送
				if($value['ycys']==0){$ws[$i]+=$value['yczushu'];}
				//漏送
				if($value['ycys']==0&&$value['stime']<$nowsm&&$value['intime']>0){$ls[$i]+=$value['yczushu'];} 
			} 
		} 

		//全部
			if($value['ycys']==1){$ys[0]+=$value['yczushu'];}
	 		if($value['ycys']==0){$ws[0]+=$value['yczushu'];}
	 if($value['ycys']==0&&$value['stime']<$nowsm&&$value['intime']>0){$ls[0]+=$value['yczushu'];}
		
	}
$v = array('0'=>'全部','1'=>'钢筋','2'=>'水泥','3'=>'砂','4'=>'砖','5'=>'装饰','6'=>'节能','7'=>'防水','8'=>'水电','9'=>'安全');
$arr = array(
	'name'=>array_splice($v,1),
	'ys'=>array_splice($ys,1),
	'ws'=>array_splice($ws,1),
	'ls'=>array_splice($ls,1)
	);


	return $arr; 
}










//查找字符串$str中，是否含有$c
function indexof($str,$c){
	$re = strpos($str, $c)!==false?true:false;
	return $re;
}





//子单位统计图标   全部
function qbcount($arr){
	$name = array('标养','同养','抗渗','柱头','焊接','拆模','砌筑','外墙','内墙','找平');
	$ys = array(0,0,0,0,0,0,0,0,0,0);
	$ws = array(0,0,0,0,0,0,0,0,0,0);
	$ls = array(0,0,0,0,0,0,0,0,0,0);
	$yc = array(0,0,0,0,0,0,0,0,0,0);
	foreach ($arr as $k=>&$value){
		//标准养护  0未送，1已送，2漏送，3异常；
		
		if($value['by']==1){$ys[0] += $value['byzushu'];}//已送		
		if($value['by']==0){$ws[0] += $value['byzushu'];}//未送		
		if($value['by']==2){$ls[0] += $value['byzushu'];}//漏送		
		if($value['by']==3){$yc[0] += $value['byzushu'];}//异常 

		if($value['ty']==1){$ys[1] += $value['tyzushu'];}//已送		
		if($value['ty']==0){$ws[1] += $value['tyzushu'];}//未送		
		if($value['ty']==2){$ls[1] += $value['tyzushu'];}//漏送		
		if($value['ty']==3){$yc[1] += $value['tyzushu'];}//异常 
		
		if($value['ks']==1){$ys[2] += $value['kszushu'];}//已送		
		if($value['ks']==0){$ws[2] += $value['kszushu'];}//未送		
		if($value['ks']==2){$ls[2] += $value['kszushu'];}//漏送		
		if($value['ks']==3){$yc[2] += $value['kszushu'];}//异常 
		
		if($value['zt']==1){$ys[3] += $value['ztzushu'];}//已送		
		if($value['zt']==0){$ws[3] += $value['ztzushu'];}//未送		
		if($value['zt']==2){$ls[3] += $value['ztzushu'];}//漏送		
		if($value['zt']==3){$yc[3] += $value['ztzushu'];}//异常 	

		if($value['dz']==1){$ys[4] += $value['dzzushu'];}//已送		
		if($value['dz']==0){$ws[4] += $value['dzzushu'];}//未送		
		if($value['dz']==2){$ls[4] += $value['dzzushu'];}//漏送		
		if($value['dz']==3){$yc[4] += $value['dzzushu'];}//异常 

		if($value['cm']==1){$ys[5] += $value['cmzushu'];}//已送		
		if($value['cm']==0){$ws[5] += $value['cmzushu'];}//未送		
		if($value['cm']==2){$ls[5] += $value['cmzushu'];}//漏送		
		if($value['cm']==3){$yc[5] += $value['cmzushu'];}//异常 
		
		if($value['qz']==1){$ys[6] += $value['qzzushu'];}//已送		
		if($value['qz']==0){$ws[6] += $value['qzzushu'];}//未送		
		if($value['qz']==2){$ls[6] += $value['qzzushu'];}//漏送		
		if($value['qz']==3){$yc[6] += $value['qzzushu'];}//异常 
		
		if($value['wq']==1){$ys[7] += $value['wqzushu'];}//已送		
		if($value['wq']==0){$ws[7] += $value['wqzushu'];}//未送		
		if($value['wq']==2){$ls[7] += $value['wqzushu'];}//漏送		
		if($value['wq']==3){$yc[7] += $value['wqzushu'];}//异常 	

		if($value['nq']==1){$ys[8] += $value['nqzushu'];}//已送		
		if($value['nq']==0){$ws[8] += $value['nqzushu'];}//未送		
		if($value['nq']==2){$ls[8] += $value['nqzushu'];}//漏送		
		if($value['nq']==3){$yc[8] += $value['nqzushu'];}//异常 	

		if($value['zp']==1){$ys[9] += $value['zpzushu'];}//已送		
		if($value['zp']==0){$ws[9] += $value['zpzushu'];}//未送		
		if($value['zp']==2){$ls[9] += $value['zpzushu'];}//漏送		
		if($value['zp']==3){$yc[9] += $value['zpzushu'];}//异常  
	} 
	$rearr = array(
			'name'=>$name,
			'ys'=>$ys,
			'ws'=>$ws,
			'ls'=>$ls,
			'yc'=>$yc,
		);
	return $rearr; 
}

//子单位统计图标 
function jichucount($arr){
	$name = array('标养','同养','抗渗','柱头','焊接','拆模','砌筑','外墙','内墙','找平');
	$ys = array(0,0,0,0,0,0,0,0,0,0);
	$ws = array(0,0,0,0,0,0,0,0,0,0);
	$ls = array(0,0,0,0,0,0,0,0,0,0);
	$yc = array(0,0,0,0,0,0,0,0,0,0);
	foreach ($arr as $k=>&$value){
		//标准养护  0未送，1已送，2漏送，3异常；
		if($value['fid']==3){

        if($value['by']==1){$ys[0] += $value['byzushu'];}//已送		
		if($value['by']==0){$ws[0] += $value['byzushu'];}//未送		
		if($value['by']==2){$ls[0] += $value['byzushu'];}//漏送		
		if($value['by']==3){$yc[0] += $value['byzushu'];}//异常 

		if($value['ty']==1){$ys[1] += $value['tyzushu'];}//已送		
		if($value['ty']==0){$ws[1] += $value['tyzushu'];}//未送		
		if($value['ty']==2){$ls[1] += $value['tyzushu'];}//漏送		
		if($value['ty']==3){$yc[1] += $value['tyzushu'];}//异常 
		
		if($value['ks']==1){$ys[2] += $value['kszushu'];}//已送		
		if($value['ks']==0){$ws[2] += $value['kszushu'];}//未送		
		if($value['ks']==2){$ls[2] += $value['kszushu'];}//漏送		
		if($value['ks']==3){$yc[2] += $value['kszushu'];}//异常 
		
		if($value['zt']==1){$ys[3] += $value['ztzushu'];}//已送		
		if($value['zt']==0){$ws[3] += $value['ztzushu'];}//未送		
		if($value['zt']==2){$ls[3] += $value['ztzushu'];}//漏送		
		if($value['zt']==3){$yc[3] += $value['ztzushu'];}//异常 	

		if($value['dz']==1){$ys[4] += $value['dzzushu'];}//已送		
		if($value['dz']==0){$ws[4] += $value['dzzushu'];}//未送		
		if($value['dz']==2){$ls[4] += $value['dzzushu'];}//漏送		
		if($value['dz']==3){$yc[4] += $value['dzzushu'];}//异常 

		if($value['cm']==1){$ys[5] += $value['cmzushu'];}//已送		
		if($value['cm']==0){$ws[5] += $value['cmzushu'];}//未送		
		if($value['cm']==2){$ls[5] += $value['cmzushu'];}//漏送		
		if($value['cm']==3){$yc[5] += $value['cmzushu'];}//异常 
		
		if($value['qz']==1){$ys[6] += $value['qzzushu'];}//已送		
		if($value['qz']==0){$ws[6] += $value['qzzushu'];}//未送		
		if($value['qz']==2){$ls[6] += $value['qzzushu'];}//漏送		
		if($value['qz']==3){$yc[6] += $value['qzzushu'];}//异常 
		
		if($value['wq']==1){$ys[7] += $value['wqzushu'];}//已送		
		if($value['wq']==0){$ws[7] += $value['wqzushu'];}//未送		
		if($value['wq']==2){$ls[7] += $value['wqzushu'];}//漏送		
		if($value['wq']==3){$yc[7] += $value['wqzushu'];}//异常 	

		if($value['nq']==1){$ys[8] += $value['nqzushu'];}//已送		
		if($value['nq']==0){$ws[8] += $value['nqzushu'];}//未送		
		if($value['nq']==2){$ls[8] += $value['nqzushu'];}//漏送		
		if($value['nq']==3){$yc[8] += $value['nqzushu'];}//异常 	

		if($value['zp']==1){$ys[9] += $value['zpzushu'];}//已送		
		if($value['zp']==0){$ws[9] += $value['zpzushu'];}//未送		
		if($value['zp']==2){$ls[9] += $value['zpzushu'];}//漏送		
		if($value['zp']==3){$yc[9] += $value['zpzushu'];}//异常  

		}
		
	} 
	$rearr = array(
			'name'=>$name,
			'ys'=>$ys,
			'ws'=>$ws,
			'ls'=>$ls,
			'yc'=>$yc,
		);
	return $rearr; 
}


//子单位统计图标 
function zhuticount($arr){
	$name = array('标养','同养','抗渗','柱头','焊接','拆模','砌筑','外墙','内墙','找平');
	$ys = array(0,0,0,0,0,0,0,0,0,0);
	$ws = array(0,0,0,0,0,0,0,0,0,0);
	$ls = array(0,0,0,0,0,0,0,0,0,0);
	$yc = array(0,0,0,0,0,0,0,0,0,0);
	foreach ($arr as $k=>&$value){
		//标准养护  0未送，1已送，2漏送，3异常；
		if($value['fid']==4){
			
        if($value['by']==1){$ys[0] += $value['byzushu'];}//已送		
		if($value['by']==0){$ws[0] += $value['byzushu'];}//未送		
		if($value['by']==2){$ls[0] += $value['byzushu'];}//漏送		
		if($value['by']==3){$yc[0] += $value['byzushu'];}//异常 

		if($value['ty']==1){$ys[1] += $value['tyzushu'];}//已送		
		if($value['ty']==0){$ws[1] += $value['tyzushu'];}//未送		
		if($value['ty']==2){$ls[1] += $value['tyzushu'];}//漏送		
		if($value['ty']==3){$yc[1] += $value['tyzushu'];}//异常 
		
		if($value['ks']==1){$ys[2] += $value['kszushu'];}//已送		
		if($value['ks']==0){$ws[2] += $value['kszushu'];}//未送		
		if($value['ks']==2){$ls[2] += $value['kszushu'];}//漏送		
		if($value['ks']==3){$yc[2] += $value['kszushu'];}//异常 
		
		if($value['zt']==1){$ys[3] += $value['ztzushu'];}//已送		
		if($value['zt']==0){$ws[3] += $value['ztzushu'];}//未送		
		if($value['zt']==2){$ls[3] += $value['ztzushu'];}//漏送		
		if($value['zt']==3){$yc[3] += $value['ztzushu'];}//异常 	

		if($value['dz']==1){$ys[4] += $value['dzzushu'];}//已送		
		if($value['dz']==0){$ws[4] += $value['dzzushu'];}//未送		
		if($value['dz']==2){$ls[4] += $value['dzzushu'];}//漏送		
		if($value['dz']==3){$yc[4] += $value['dzzushu'];}//异常 

		if($value['cm']==1){$ys[5] += $value['cmzushu'];}//已送		
		if($value['cm']==0){$ws[5] += $value['cmzushu'];}//未送		
		if($value['cm']==2){$ls[5] += $value['cmzushu'];}//漏送		
		if($value['cm']==3){$yc[5] += $value['cmzushu'];}//异常 
		
		if($value['qz']==1){$ys[6] += $value['qzzushu'];}//已送		
		if($value['qz']==0){$ws[6] += $value['qzzushu'];}//未送		
		if($value['qz']==2){$ls[6] += $value['qzzushu'];}//漏送		
		if($value['qz']==3){$yc[6] += $value['qzzushu'];}//异常 
		
		if($value['wq']==1){$ys[7] += $value['wqzushu'];}//已送		
		if($value['wq']==0){$ws[7] += $value['wqzushu'];}//未送		
		if($value['wq']==2){$ls[7] += $value['wqzushu'];}//漏送		
		if($value['wq']==3){$yc[7] += $value['wqzushu'];}//异常 	

		if($value['nq']==1){$ys[8] += $value['nqzushu'];}//已送		
		if($value['nq']==0){$ws[8] += $value['nqzushu'];}//未送		
		if($value['nq']==2){$ls[8] += $value['nqzushu'];}//漏送		
		if($value['nq']==3){$yc[8] += $value['nqzushu'];}//异常 	

		if($value['zp']==1){$ys[9] += $value['zpzushu'];}//已送		
		if($value['zp']==0){$ws[9] += $value['zpzushu'];}//未送		
		if($value['zp']==2){$ls[9] += $value['zpzushu'];}//漏送		
		if($value['zp']==3){$yc[9] += $value['zpzushu'];}//异常  

		}
		
	} 
	$rearr = array(
			'name'=>$name,
			'ys'=>$ys,
			'ws'=>$ws,
			'ls'=>$ls,
			'yc'=>$yc,
		);
	return $rearr; 
}



















//工程进度 形象进度数据重构
function sinimage($arr){




//今天的事件戳；
$nowsm = strtotime(date('Y-m-d',time()));
foreach ($arr as $k=>&$value){ 

$today = strtotime(setdate(time()));
//1、转换时间戳
		$value['cbyriqi'] = $value['byriqi']==0?'':setdate($value['byriqi']);
		$value['cbytime'] = $value['bytime']==0?'':setdate($value['bytime']);


		//送检情况   0未送存在漏送，1已送存在异常，2漏送，3异常；//默认未施工，就未送；
		$value['by'] = 0;
		$value['ty'] = 0;
		$value['ks'] = 0;
		$value['zt'] = 0;
		$value['dz'] = 0;
		$value['cm'] = 0;
		$value['qz'] = 0;
		$value['wq'] = 0;
		$value['nq'] = 0;
		$value['zp'] = 0;

		//2、设置梁板或者墙柱
		if(indexof($value['bybuwei'],'柱')){
			$value['bwtype'] = $value['byriqi']==0?'zhu0':'zhu1';
		}else{
			$value['bwtype'] = $value['byriqi']==0?'ban0':'ban1';
		}

		//3、验证标养的   0未送，1已送，2漏送，3异常；
	 	if($value['byriqi']>0){ 
	 		//已经施工了；
	 		//未送
	 		if($value['byys']==0){	
	 			$jf = ($nowsm-$value['byriqi'])/86400;
	 			if($jf>28){
	 				$value['by']=2;
	 				if (isset($value['bydesc'])) 
	 				$value['bydesc']='【'.$value['bybuwei'].'】'.':标养漏送';  
	 			}
	 			//未送，但设置送检龄期超过28的，不符合规范；
	 			if($value['bytime']>0){
					$bylq = ($value['bytime']-$value['byriqi'])/86400;
					if($bylq!=28){
						$value['by']=3;
	 				if (isset($value['bybuwei'])) 
	 				$value['bydesc']='【'.$value['bybuwei'].'】'.':您送检计划中设置的标养送检龄期不是28天;';  
					}
	 			} 

	 		}
	 		//已送
	 		if($value['byys']==1){
	 			$value['by']=1;
	 			//$value['bydesc']='【'.$value['bybuwei'].'】'.':标养已送';
	 			 //龄期超出异常
	 			 $jf = ($value['bytime']-$value['byriqi'])/86400;	
 				if (isset($value['bybuwei'])) 
	 			 if($jf!=28){$value['by']=3;$value['bydesc'].='【'.$value['bybuwei'].'】'.'您送检计划中设置的标养送检龄期不是28天;';};
	 			  //此部位浇筑日期与焊接日期冲突；
	 			  // if($value['byriqi']<=$value['dztime']&&$value['dzornot']===1){
	 			  // 	$value['by']=3;
	 			  // $value['bydesc'] .='【'.$value['bybuwei'].'】'."焊接送检日期必须早于浇筑日期;";}
	 			  //墙柱浇筑日期 必须大于 上一部位浇筑日期；
    			// if($value['byriqi']<$arr[$k+1]['byriqi']){
    			// 	$value['by']=3;
	 			  // $value['bydesc'] .='【'.$value['bybuwei'].'】'."浇筑日期".$value['cbyriqi']."与".'【'.$arr[$k+1]['bybuwei'].'】'."浇筑日期".setdate($arr[$k+1]['byriqi'])."有冲突;";
    			// }
	 			 //此部位浇筑日期 必须大于上一部位焊接日期；
	 			 // if($value['byriqi']<$arr[$k+1]['dztime']&&$arr[$k+1]['dzornot']==1){
	 			 // 	$value['by']=3;
	 			 // 	$value['bydesc'] .='【'.$value['bybuwei'].'】'."浇筑日期与".'【'.$arr[$k+1]['bybuwei'].'】'."焊接日期有冲突;";}
	 		}

	 	} //默认未施工，就未送；



//验证同养的   0未送，1已送，2漏送，3异常；
if(isset($value['byriqi'])&&isset($value['tyornot'])){
if($value['byriqi']>0&&$value['tyornot']==1){
	if($value['tyys']==0){
    /*未送 漏送*/ 
        $tysj = ($today - $value['tytime'])/86400;
        if($tysj>0){ 
        $value['ty']=2;//漏送
        if(isset($value['tydesc']))
        $value['tydesc'] .='【'.$value['bybuwei'].'】'."同条件养护漏送;";
         }  
  }else{
    /*已送 异常*/
    $value['ty']=1;
    //同条件温度超过规范值
    //if(tysj>28){$value.tystatus='4';$value.tydesc +="同条件养护温度超过600度;";}
     }
}
}




//验证抗渗的   0未送，1已送，2漏送，3异常；
if(isset($value['byriqi'])&&isset($value['ksornot'])){
if($value['byriqi']>0&&$value['ksornot']==1){	
		if($value['ksys']==0){
    /*未送 漏送*/  
    $kslq = ($today - $value['byriqi'])/86400;
     if($kslq>90){ 
        $value['ks']=3;//异常
       if(isset($value['ksdesc']))
        $value['ksdesc'] .='【'.$value['bybuwei']."】抗渗试块龄期超过90天;";
         } 

    $kssj = ($today - $value['kstime'])/86400; 
        if($kssj>0){ 
        $value['ks']=2;//漏送
       if(isset($value['ksdesc']))
        $value['ksdesc'] .='【'.$value['bybuwei']."】抗渗试块漏送;";
         }  
  }else{

    /*已送 异常*/
    $value['ks']=1;
    $kst = ($value['kstime'] - $value['byriqi'])/86400;
    //抗渗送检日期超过规范值
    if($kst<28){$value['ks']=3;
       if(isset($value['ksdesc']))$value['ksdesc'] .='【'.$value['bybuwei']."】抗渗龄期小于28天，不符合规范值;";}
    if($kst>90){$value['ks']=3;
       if(isset($value['ksdesc']))$value['ksdesc'] .='【'.$value['bybuwei']."】抗渗龄期大于90天，不符合规范值;";}

     }
}
}



//验证柱头的   0未送，1已送，2漏送，3异常；
if(isset($value['byriqi'])&&isset($value['ztornot'])){
if($value['byriqi']>0&&$value['ztornot']==1){
   $ztsj = ($today-$value['zttime'])/86400;
   $ztlq = ($today-$value['byriqi'])/86400;
  $value['ztdesc'] = '';
  if($value['ztys']==0){
    /*未送 漏送*/  
        if($ztlq>28||$ztsj>0){ 
        $value['zt']=2;//漏送
        $value['ztdesc'] .='【'.$value['bybuwei']."】柱头标养漏送;";
         }  
  }else{
    /*已送 异常*/
    $value['zt']=1;
    //柱头 龄期异常
    $ztlq = ($value['zttime']-$value['byriqi'])/86400;
    if($ztlq!=28){
    	$value['zt']=3;
    	$value['ztdesc'] .='【'.$value['bybuwei']."】柱头标养龄期不是28天;";}
     } 
}
}


//拆模 的   0未送，1已送，2漏送，3异常；
if(isset($value['byriqi'])&&isset($value['cmornot'])){
if($value['byriqi']>0&&$value['cmornot']==1){
   $cmsj =($today-$value['cmtime'])/86400;
  //var lq = (parseInt(ftime())/1000-parseInt($value.byriqi))/86400;
 
  if($value['cmys']==0){
    /*未送 漏送*/  
  if($cmsj>0){
   $value['cm']=2;//漏送
   if(isset($value['cmdesc']))
   $value['cmdesc'] .='【'.$value['bybuwei']."】拆模漏送;";
         } 
  }else{
    /*已送 异常*/
    $value['cm']=1;
    //拆模
    $cmlq = ($value['cmtime']-$value['byriqi'])/86400;
    if($cmlq>7){
    $value['cm']=3;
   if(isset($value['cmdesc']))
    $value['cmdesc'] .="拆模龄期超过7天;";
	}
	if($cmlq<7){
    $value['cm']=3;
       if(isset($value['cmdesc']))
    $value['cmdesc'] .="拆模龄期小于7天;";
	}
     } 
}
}



//焊接 的   0未送，1已送，2漏送，3异常；
if(isset($value['byriqi'])&&isset($value['dzornot'])){
if($value['dzriqi']>0&&$value['dzornot']==1){
   $dzsj =($today-$value['dztime'])/86400;
    $dzlq =($value['dztime']-$value['dzriqi'])/86400; 
 
  if($value['dzys']==0){
    /*未送 漏送*/  
  if($dzsj>0){ 
   $value['dz']=2;//漏送
   if(isset($value['dzdesc']))
   $value['dzdesc'] .= '【'.$value['bybuwei']."】焊接漏送;";     
         }

    if($dzlq>3){ 
   $value['dz']=3;//超过3天未送焊接
   if(isset($value['dzdesc']))
   $value['dzdesc'] .='【'.$value['bybuwei']."】焊接制作和送检日期超过3天;";     
         }

    $dzhntlq = $value['dzriqi']-$value['byriqi'];
    if($dzhntlq>0){
    $value['dz']=3;
   if(isset($value['dzdesc']))
    $value['dzdesc'] .='【'.$value['bybuwei']."】焊接日期必须在混凝土施工日期之前;";}
     



  }else{
    /*已送 异常*/
    $value['dz']=1;
    //拆模
    $dzlq = $value['dzriqi']-$value['byriqi'];
    if($dzlq>0){
    $value['dz']=3;
   if(isset($value['dzdesc']))
    $value['dzdesc'] .='【'.$value['bybuwei']."】焊接日期必须在混凝土施工之前;";}
     } 
}
}


 /*  砌筑的   0未送，1已送，2漏送，3异常；*/
if(isset($value['byriqi'])&&isset($value['qzornot'])){
if($value['qzriqi']>0&&$value['qzornot']==1){
   $qzsj =($today-$value['dztime'])/86400;
   $qzlq = ($today-$value['qzriqi'])/86400; 
  if($value['qzys']==0){
    /*未送 漏送*/ 
        if($qzsj>0||$qzlq>28){ 
        $value['qz']=2;//漏送
  		 if(isset($value['qzdesc']))
        $value['qzdesc'] .= '【'.$value['bybuwei']."】砌筑漏送;";
         }  
  }else{
    /*已送 异常*/
    $value['qz']=1;
    //砌筑
    $qzl = ($value['qztime']-$value['qzriqi'])/86400;
    if($qzl!=28){
    	$value['qz']=3;
  		 if(isset($value['qzdesc']))
    	$value['qzdesc'] .='【'.$value['bybuwei']."】砌筑龄期不是28天;";
    }
     } 
}
}

/*  外墙抹灰 0未送，1已送，2漏送，3异常；*/
if(isset($value['wqriqi'])&&isset($value['wqornot'])){
if($value['wqriqi']>0&&$value['wqornot']==1){
   $wqsj =($today-$value['wqtime'])/86400;
   $wqlq = ($today-$value['wqriqi'])/86400; 
  if($value['wqys']==0){
    /*未送 漏送*/ 
        if($wqsj>0||$wqlq>28){ 
        $value['wq']=2;//漏送
  		 if(isset($value['wqdesc']))
        $value['wqdesc'] .= '【'.$value['bybuwei']."】外墙抹灰漏送;";
         } 
  }else{
    /*已送 异常*/
    $value['wq']=1;
    //砌筑
    $wqzl = ($value['wqtime']-$value['wqriqi'])/86400;
    if($wqzl!=28){
    	$value['wq']=3;
  		 if(isset($value['wqdesc']))
    	$value['wqdesc'] .='【'.$value['bybuwei']."】外墙抹灰龄期不是28天;";}
     } 
}
}

/*  内墙抹灰 0未送，1已送，2漏送，3异常；*/
if(isset($value['nqriqi'])&&isset($value['nqornot'])){
if($value['nqriqi']>0&&$value['nqornot']==1){
   $nqsj =($today-$value['nqtime'])/86400;
   $nqlq = ($today-$value['nqriqi'])/86400; 
  if($value['nqys']==0){
    /*未送 漏送*/ 
        if($nqsj>0||$nqlq>28){ 
        $value['nq']=2;//漏送
  		 if(isset($value['nqdesc']))
        $value['nqdesc'] .='【'.$value['bybuwei']."】内墙抹灰漏送;";
         } 
  }else{
    /*已送 异常*/
    $value['nq']=1;
    //内墙
    $nqzl = ($value['nqtime']-$value['nqriqi'])/86400;
    if($nqzl!=28){
    	$value['nq']=3;
  		 if(isset($value['nqdesc']))
    	$value['nqdesc'] .='【'.$value['bybuwei']."】内墙抹灰龄期不是28天;";}
     } 
}
}


/*  找平抹灰 0未送，1已送，2漏送，3异常；*/
if(isset($value['zpriqi'])&&isset($value['zpornot'])){
if($value['zpriqi']>0&&$value['zpornot']==1){
   $zpsj =($today-$value['zptime'])/86400;
   $zplq = ($today-$value['zpriqi'])/86400; 
  if($value['zpys']==0){
    /*未送 漏送*/ 
        if($zpsj>0||$zplq>28){ 
        $value['zp']=2;//漏送
  		 if(isset($value['zpdesc']))
        $value['zpdesc'] .='【'.$value['bybuwei']."】找平漏送;";
         } 
  }else{
    /*已送 异常*/
    $value['zp']=1;
    //找平
    $zpzl = ($value['zptime']-$value['zpriqi'])/86400;
    if($zpzl!=28){
    	$value['zp']=3;
  		 if(isset($value['zpdesc']))
    	$value['zpdesc'] .='【'.$value['bybuwei']."】找平龄期不是28天;";}
     } 
}
}

        
    } 








return $arr;
}


//获取验证码 判断这个手机号码是否被注册
function  getphcode($tel){

	$rearr = array('code'=>1,'msg'=>'','data'=>array());
    if(!$tel){
    	$rearr['code']=0;
    	$rearr['msg']='号码为空，发送失败';
    }
    
    	$sendcode=cutcode(time(),4);
    	session('tel',$tel);
	    session('phcode',$sendcode);
	    $content = '尊敬的用户，您的验证码是：'.$sendcode.'。在30分钟内有效，河狸建筑工作人员不会向您索取，请勿泄露。';
 	    $message = 'http://www.smswst.com/api/httpapi.aspx?action=send&account=aqchudao&password=ys000586.*yskj&mobile='.$tel.'&content='.$content.'&sendTime=&AddSign=Y';
		$re = file_get_contents($message);
		$obj = simplexml_load_string($re);
		$rearr['code']='1';
    	$rearr['msg']='获取验证码成功！';
    	$rearr['test']=$sendcode;
   
    return $rearr;
}


// //获取验证码
// function  getphcodetwo($tel){
//     $uid = getuser()['uid'];
// 	$rearr = array('code'=>1,'msg'=>'','data'=>array());
//     if(!$tel){
//     	$rearr['code']=0;
//     	$rearr['msg']='号码为空，发送失败';
//     }
//     $user = Db::connect("DB_Config_1")->name('user')->where(array('tel'=>$_POST['tel']))->find();
//     if($user&&$user['uid']==$uid){
//     	$rearr['code']=0;
//     	$rearr['msg']='该手机已绑定,无需重复绑定';
//     	return $rearr;
//     }else if($user&&$user['uid']!=$uid){
//     	$rearr['code']=0;
//     	$rearr['msg']='该手机其他用户绑定';
//     	return $rearr;
//     }
//     else{
//     	$sendcode=cutcode(time(),6);
//     	session('tel',$tel);
// 	    session('phcode',$sendcode);
// 	    $content = '尊敬的用户，您的验证码是：d'.$sendcode.'。在30分钟内有效，河狸建筑工作人员不会向您索取，请勿泄露。';
//  	    $message = 'http://www.smswst.com/api/httpapi.aspx?action=send&account=aqchudao&password=ys000586.*yskj&mobile='.$tel.'&content='.$content.'&sendTime=&AddSign=Y';
// 		$re = file_get_contents($message);
// 		$obj = simplexml_load_string($re);
// 		$rearr['code']='1';
//     	$rearr['msg']='获取验证码成功！';
//     }
//     return $rearr;
// }


function generateusername(){
	$str = 'ys';
	
	$sql = "select MAX(SUBSTRING(username,3,10))+1 AS code from cy_user WHERE SUBSTRING(username,1,2) = 'ys' AND SUBSTRING(username,3,10)>10000";
	$code = Db::connect("DB_Config_1")->name('user')->query($sql);
	$code = $code[0]['code'];
    if($code==null){
      $code = 10001;
    }
	return $str.$code;
}


// 检测输入的验证码是否正确，$code为用户输入的验证码字符串
function check_verify($code, $id = ''){
    $verify = new think\Verify();
    return $verify->check($code, $id);
}
/************************************微信公共方法*******************************************/



/*
 * 传入授权code获取openid
 */

function getopenid($code,$appid,$appsecret){

  
  $oauth2url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appid}&secret={$appsecret}&code={$code}&grant_type=authorization_code";     
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $oauth2url);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
  $output = curl_exec($ch);
  curl_close($ch);
  $jsoninfo = json_decode($output, true);
  //如果微信服务器报错，则打印错误信息
  if(isset($jsoninfo['errcode'])){
  	var_dump($jsoninfo['errmsg']);
  }else{
  	$openid = $jsoninfo['openid'];     
    return $openid;
  }
}


/*
 * 传入appid和appsecret获取access——token
 */
function get_access_token($appid,$appsecret){
  $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appid.'&secret='.$appsecret.'';
  $wechat_access_token = session('wechat_access_token');
  if(!$wechat_access_token['access_token'] || time()-$wechat_access_token['time']>7000){	
  	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$output = curl_exec($ch);
	curl_close($ch);
	$jsoninfo = json_decode($output, true);
	if(isset($jsoninfo['errcode'])){
  		var_dump($jsoninfo['errmsg']);
    }
	$jsoninfo['time'] = time(); 
	session('wechat_access_token',$jsoninfo);
	return $jsoninfo['access_token'];
  }else{
  	return $wechat_access_token['access_token'];
  }
}



//分页查询天气 方法
function page_weather($tablename,$orderstr,$ctid='',$nowpage,$listnum,$startime='',$endtime='',$vtem=''){
	$tablename = 'weather';
	$begin = ($nowpage-1)*$listnum;
	$sql = 'select * from cy_weather,cy_city where cy_weather.ctid=cy_city.ctid';
	if($ctid!=''){
		$sql = $sql . ' and cy_weather.ctid='.$ctid;
	}

	if($startime!=''){
		$sql = $sql . ' and cy_weather.wdate>='.$startime;
	}

	if($endtime!=''){
		$sql = $sql . ' and cy_weather.wdate<='.$endtime;
	}


	$adtotal = Db::connect("DB_Config_1")->name($tablename)->query($sql);
	$total = count($adtotal);
	if($adtotal){
		$sql = $sql .' order by '. $orderstr.' limit '.$begin.','.$listnum;
		$ad = Db::connect("DB_Config_1")->name($tablename)->query($sql); 
	  	   return array("reply"=>1,'total'=>$total,'datalist'=>$ad);			 
	}else{
		return array("reply"=>0);
	}
}


// //设置同养温度
// function settongyang($data){
// 	$newarr = [];
// 	if(count($data)>0){
// 		//遍历找出所有同养； 
// 		$bd = 0;
// 		foreach ($data as $key => $value) {
// 			if($value['tyornot']==1&&$value['byriqi']>0){
// 				if($bd==0){$bd = $value['byriqi'];} 
// 			}
// 		}


// 		//有记录，就拿出prid ，去找城市；
// 		$prid = $data[0]['prid'];
// 		$city = Db::connect("DB_Config_1")->name('program')->where(array('prid'=>$prid))->find();
// 		$cityid = $city['cityid'];
// 		//找出 最早日期的那天天；
// 		$pretime =$bd;
// 		$nowtime = time();


// 		//通过城市去查找温度记录
// 		if($cityid>0){
// 	$sql = 'select ctid,wdate,htem,ltem,vtem from cy_weather where wdate>='.$pretime.' and wdate=<'.$nowtime.' orderby wdate asc';
// 	$temlist = Db::connect("DB_Config_1")->name('weather')->query($sql);

// 	//遍历数组
// 	foreach ($data as $key => &$value) {
// 		//有同养，并且施工日期不为0
// 		if($value['tyornot']==1&&$value['byriqi']>0){
// 			//情况1，未送检 wstemarr
// 			if(){}
// 			//情况2，已送检 ystemarr

// 		}
// 	}


// 		}



// 	}



// 	return $newarr;
// }

//同养温度  换一种方案，放到前端计算
function findtongyang($data){
	$newarr = array('city'=>'','datalist'=>array());
	if(count($data)>0){
		//遍历找出第一个同养 日期； 
		$bd = 0;
		foreach ($data as $key => $value) {
			if($value['byriqi']>0){
				if($bd==0){$bd = $value['byriqi'];} 
			}
		}


		//有记录，就拿出prid ，去找城市；
		$prid = $data[0]['prid'];
		$sql = 'select cityid,city,ctid from cy_program,cy_city where cy_program.cityid=cy_city.ctid and prid='.$prid;
		$city = Db::connect("DB_Config_1")->name('program')->query($sql);
		$newarr['city'] = $city[0]['city'];
		$cityid = $city[0]['cityid'];
		//找出 最早日期的那天 
		$pretime =$bd-86400;
		$nowtime = time()+3*86400;


		//通过城市去查找温度记录
		if($cityid>0){
	$sql = 'select wid,ctid,wdate,htem,ltem,vtem from cy_weather where wdate>='.$pretime.' and wdate<='.$nowtime.' and ctid='.$cityid.' order by wdate asc';
	$newarr['datalist'] = Db::connect("DB_Config_1")->name('weather')->query($sql); 
		} 
	} 

	return $newarr;
}

//送检表字段类型
function getsjtype($type){
 $temparr['by'] = 'tid,fid,myorder,bybuwei,byqiangdu,byyl,byzushu,byriqi,bytime,byys,byjg,byxinpian,bybh';       
        $temparr['ty'] = 'tid,fid,myorder,bybuwei,tyname,byqiangdu,tyys,tyzushu,sumtemp,gototime,byriqi,tytime,tybh,tyjg,tyornot,prid,sid,tyxinpian';
        $temparr['ks'] = 'tid,fid,myorder,bybuwei,ksname,byqiangdu,byriqi,kszushu,ksdengji,kstime,ksys,ksbh,ksjg,ksornot';
        $temparr['zt'] = 'tid,fid,myorder,bybuwei,ztname,byqiangdu,byriqi,ztzushu,zttime,ztys,ztbh,ztjg,ztornot,ztxinpian';
        $temparr['cm'] = 'tid,fid,myorder,bybuwei,cmname,byqiangdu,byriqi,cmzushu,cmtime,cmys,cmbh,cmornot';
        $temparr['dz'] = 'tid,fid,myorder,bybuwei,dzname,byriqi,dzzushu,dztime,dzguige,Dzys,dzbh,dzjg,dzornot';

        // $temparr['sm'] = 'tid,fid,myorder,bybuwei,byqiangdu,byriqi,smtime,smguige,smbh,smjg';
        // $temparr['jx'] = 'tid,fid,myorder,bybuwei,byqiangdu,byriqi,jxtime,smguige,Jxys,jxbh,jxjg';
        // $temparr['jg'] = 'tid,fid,myorder,bybuwei,byqiangdu,byriqi,jgtime,Jgys,jgbh,jgjg';

        $temparr['qz'] = 'tid,fid,myorder,bybuwei,qzname,byriqi,qzzushu,qzriqi,qztime,qzqiangdu,qzys,qzbh,qzjg,qzornot';
        $temparr['nq'] = 'tid,fid,myorder,bybuwei,nqname,byriqi,nqzushu,nqriqi,nqtime,nqqiangdu,Nqys,nqbh,nqjg,nqornot';
        $temparr['wq'] = 'tid,fid,myorder,bybuwei,wqname,byriqi,wqzushu,wqriqi,wqtime,wqqiangdu,Wqys,wqbh,wqjg,wqornot';
        $temparr['zp'] = 'tid,fid,myorder,bybuwei,zpname,byriqi,zpzushu,zpriqi,zptime,zpqiangdu,Zpys,zpbh,zpjg,zpornot';

        return $temparr[$type];
}


//统计 所有的 推荐用户
function sumtuijian($uid){ 
	$field = 'username';
		$re =0;
	$sql = "select COUNT(*) AS totalnum FROM cy_user where fromuid =".$uid;
	$data = Db::connect("DB_Config_1")->name('user')->query($sql); 
	if($data){
		$re = $data[0]['totalnum'];
	}
	return $re; 
}

//处理fromuid 推荐人
function dealfrom($from){
	if($from!=''){ 
      $sum = sumtuijian($from);
      if($sum>30){ 
          $data = array('maxprogram'=>floor($sum/10));
          Db::connect("DB_Config_1")->name('user')->where(array('uid'=>$from))->save($data);
      }
  }
}

//验证工程上限
function chaoguomaxpro($u){
$re = false;
	$maxpro = getuser()['maxprogram'];  
	$pd = Db::connect("DB_Config_1")->name('program')->where(array('uid'=>$u,'isdel'=>0))->select();
	if($pd){
		if($maxpro <= count($pd)){$re=true;}
	} 
return $re;	
}

//统计汇总 个人登录
function countlogin($nowpage,$listnum,$orderstr,$constr){
  $sql = 'select cy_user.realname,cy_user.add_time,cy_user.username,cy_user.update_time,cy_log.uid,cy_log.logtype,count(cid) as logvalue from cy_log,cy_user where cy_user.uid=cy_log.uid'.$constr. ' group by uid ';
  $data = Db::connect("DB_Config_1")->name('jifen')->query($sql);
  $total = count($data); 
  $begin = ($nowpage-1)*$listnum; 
  $pages = ceil($total/$listnum);
  if($data){
    $sql = $sql .' order by '. $orderstr.' limit '.$begin.','.$listnum;
      $ad = Db::connect("DB_Config_1")->name('jifen')->query($sql);
    return array('reply'=>1,'desc'=>'有数据','datalist'=>$ad,'total'=>$total,'pages'=>$pages,'sql'=>$sql); 
  }else{
    return array('reply'=>0,'desc'=>'无数据','total'=>$total,'pages'=>$pages);  
  }
  
}





/*        
说明   
*/        
        //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
        //b数据 —— 一维数组  ，无法从program里拿的；
        //c数据 —— 二维数组类型； c[0][0]

// 返回一个数组，一个表或者多个表；[{},{}]
function findzl($tbid,$code,$bwidarr,$prdata,$sindata){
   
    //获取用户信息 
    $uid = getuser()['uid']; 
    $re = array();

    switch ($code){ 
        //混凝土实体养护记录
        case 'GD2301039':

for ($i=0; $i < count($bwidarr); $i++) { 
      // 1、先去获取资料 zldata表 找看有没有；
      $sarr = array(
        'uid'=>$uid,
        'tbid'=>$tbid,
        'tid'=>$bwidarr[$i] 
        );

      if($prdata['prid']){ $sarr['prid'] = $prdata['prid'];}
      if($sindata['sid']){ $sarr['sid'] = $sindata['sid']; }

      $td = Db::connect("DB_Config_1")->name('songjian')->where(array('tid'=>$bwidarr[$i]))->find();

      $udata = Db::connect("DB_Config_1")->name('zldata')->where($sarr)->find();
      if($udata){ 
        //去获取用户数据直接赋值；
        $re[] = $udata['temjson'];
        $redata['has'] = 1;

      }else{
        //没有用户数据；去造系统数据；
        //a数据 —— 一维数组    基本信息 program 里面能拿到的，都当作a数据
        //b数据 —— 一维数组  ，无法从program里拿的；
        //c数据 —— 二维数组类型； c[0][0] 
        $a = array();
        $b = array();
        $c = array();
        $a['prname'] = $prdata['prname'].'——'.$sindata['sname'];
        $a['bybuwei'] = $td['bybuwei'];
        $a['byqiangdu'] = 'C'.$td['byqiangdu'];
        $a['ksdengji'] = $td['ksdengji']?$td['ksdengji']:'/';
        $a['kzqiangdu'] = '/';
        $a['shuini'] = $prdata['shuini'];
        $a['waijiaji'] = $prdata['waijiaji'];
        $a['canhuo'] = $prdata['canhuoliao'];

        $b[0] = "2012年12月23日";
        $b[1] = "2012年12月23日";
        $b[2] = "2012年12月24日";
        $b[3] = "14天";
        $b[4] = "";
      
        $c[0][0] = '2012年12月26日';
        $c[0][1] = '25℃';
        $c[0][2] = '浇水';
        $c[0][3] = '浇水'; 
         $redata['has'] = 0;//默认设置 是没有用户数据的；

$a['test']= $bwidarr;
        $re[] = array('a'=>$a,'b'=>$b,'c'=>$c);

      }
      
} 

          
         break; 
     }

return $re;

}




//通过城市id 和  子单位sid 获取 天气温度 数组；
function getweatherbybuweiid($id,$ctid)
{
	$a = Db::connect("DB_Config_1")->name('songjian')->where('sid='.$id.' and isdel=0 and byriqi>0 ')->order('byriqi asc')->limit(1)->select();
	$btime = $a[0]['byriqi'];
	if ($btime) {
	 $sql = 'wdate>='.$btime.' and ctid='.$ctid;
	 $wea = Db::connect("DB_Config_1")->name('weather')->where($sql)->order('wdate asc')->select();
	}
	 if($wea){
	 	return $wea;
	 }else{
	 	return array();
	 } 
}

//获取14天的天气记录
 function getdaysweather($arr,$btime){
 	$re =array();
 	$i = 0;
 	for ($x=0; $x < count($arr); $x++) { 
 		if($arr[$x]['wdate']>$btime&&$arr[$x]['wdate']<time()&&$btime){
 			$re[] = $arr[$x];
 			$i++;
 		} 
 	}
 	return $re;
 }


 //标养送检多组的时候，进行拆分
 function dealbyzushu($arr){
      $data = array();
	  foreach ($arr as $ke => $valu) { 
	     	$byjgarr = explode(",",$valu['byjg']); 
	     	$bharr = explode(",",$valu['bybh']); 
	     	$xparr = explode(",",$valu['byxinpian']); 
	     	for ($i=0; $i < $valu['byzushu']; $i++) { 
	     		$qv = $valu;
	     		$qv['jg'] = $byjgarr[$i]; 
	     		$qv['bh'] = $bharr[$i];
	     		$qv['xp'] = $xparr[$i];  
	     		$qv['byzushu'] = 1; 
	     		$data[] = $qv;	 
	     	} 
	     	//看看有没有柱头
	     	if($valu['ztornot']==1){
	     		$ztbyjgarr = explode(",",$valu['ztjg']); 
		     	$ztbharr = explode(",",$valu['ztbh']); 
		     	$ztxparr = explode(",",$valu['ztxinpian']); 
		     	for ($j=0; $j < $valu['ztzushu']; $j++) { 
	     		$qv = $valu;
	     		$qv['bybuwei'] = $valu['ztname']==''? $valu['bybuwei'].'柱头':$valu['ztname'];
	     		$qv['jg'] = $ztbyjgarr[$j]; 
	     		$qv['bh'] = $ztbharr[$j];
	     		$qv['xp'] = $ztxparr[$j];  
	     		$qv['byzushu'] = 1; 
	     		$data[] = $qv;	 
	     	}
	     	}




	  }
	  return $data;
 }

  //同养送检多组的时候，进行拆分
 function dealtyzushu($arr){
      $data = array();
	  foreach ($arr as $ke => $valu) { 
	     	$tyjgarr = explode(",",$valu['tyjg']); 
	     	$bharr = explode(",",$valu['tybh']);
	     	$xparr = explode(",",$valu['tyxinpian']);  
	     	for ($i=0; $i < $valu['tyzushu']; $i++) { 
	     		$qv = $valu;
	     		$qv['jg'] = $tyjgarr[$i]; 
	     		$qv['bh'] = $bharr[$i];
	     		$qv['xp'] = $xparr[$i];
	     		$qv['tyzushu'] = 1; 
	     		$data[] = $qv;	 
	     	} 
	  }
	  return $data;
 }

  //焊接送检多组的时候，进行拆分
 function dealhjzushu($arr){
      $data = array();
	  foreach ($arr as $ke => $valu) { 
	     	$dzguigearr = explode(",",$valu['dzguige']); 
	     	$dzjgarr = explode(",",$valu['dzjg']); 
			$dzpaihaoarr = explode(",",$valu['dzpaihao']); 
			$dzbharr = explode(",",$valu['dzbh']); 
			$dzchangjiaarr = explode(",",$valu['dzchangjia']); 
	     	for ($i=0; $i < $valu['dzzushu']; $i++) { 
	     		$qv = $valu;
	     		$qv['dzguige'] = $dzguigearr[$i]; 
	     		$qv['dzjg'] = $dzjgarr[$i]; 
	     		$qv['dzpaihao'] = $dzpaihaoarr[$i]; 
	     		$qv['dzbh'] = $dzbharr[$i]; 
	     		$qv['dzchangjia'] = $dzchangjiaarr[$i]; 
	     		$qv['dzzushu'] = 1; 
	     		$data[] = $qv;	 
	     	} 
	  }
	  return $data;
 }

 /**
* 计算标准差
* @param float $avg 平均值
* @param Array $list 队列数组
* @return float 标准差值
*/
function getVariance($avg, $list){
		$total_var = 0;
	foreach ($list as $lv){
		$total_var += pow( ($lv - $avg), 2 );
	}

return sqrt( $total_var / (count($list) - 1 ) );
}



//权限验证
function quanxian(){
	//验证权限
$usertype =  getuser()['usertype'];
    if($usertype>=3){ 
        $redata = array('code'=>0,'msg'=>'无权限！','data'=>array()); 
        echo json_encode($redata); 
        exit;
    }
     
}
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

function dealExecl($file,$excelstr){
  $upload_path = "./excelUpload/"; //上传文件的存放路径.
  $str = explode('.',$file['name']);
  $type = $str[count($str)-1];  //获取上传excal类型         
  $file['name'] = time().$file['name'];
  move_uploaded_file($file['tmp_name'],$upload_path.$file['name']);
  $PHPReader= $type == 'xls'?new \PHPExcel_Reader_Excel5():new \PHPExcel_Reader_Excel2007();
  $PHPExcel=$PHPReader->load('./excelUpload/'.$file['name']);
  $currentSheet=$PHPExcel->getSheet(0);
  $highestRow = $currentSheet->getHighestRow(); // 取得总行数
  $highestColumn = $currentSheet->getHighestColumn(); // 取得总列数   
  //循环读取excel文件,读取一条,插入数组一条
  for($j=2;$j<=$highestRow;$j++)
  {
      for($k='A';$k<=$highestColumn;$k++)
      {
          $val = $excelstr[getalphnum($k)]; 
          //读取单元格
          $ExamPaper_arr[$j-2][$val]= $PHPExcel->getActiveSheet()->getCell("$k$j")->getValue();
      }
  }
  for ($i=0; $i < count($ExamPaper_arr); $i++) { 
  		$ExamPaper_arr = filterExecl($excelstr,$ExamPaper_arr);
  }
  if($ExamPaper_arr) {
	  $redata['msg'] = 'success';
	  $redata['code'] = 1;
	  $redata['data']['datalist'] = $ExamPaper_arr;
  }else{
	  $redata['code'] = 0;
	  $redata['data']['datalist'] = array();
	  $redata['msg'] = 'failed!';
  }  
  return  $redata;
}
//过滤导入excal不需要的字段
function filterExecl($excelstr,$ExamPaper_arr){
	for ($j=0; $j < count($ExamPaper_arr); $j++) { 
		for ($i=0; $i < count($excelstr); $i++) {
			$keyname = $excelstr[$i];
			if (strpos($keyname,'zushu')||$keyname == 'zushu') {  //判断字符中是否包含这个字符串
				$ExamPaper_arr[$j][$keyname] = str_replace('组','',$ExamPaper_arr[$j][$keyname]);//替换
			}
			if (strpos($keyname,'qiangdu')||$keyname == 'qiangdu') {
				$ExamPaper_arr[$j][$keyname] = str_replace('C','',$ExamPaper_arr[$j][$keyname]);
			}
		}
	}
	return $ExamPaper_arr;
}


// 生产温度列表  公共方法

function makewendulist($data){
        $value = $data[0];
        $today = strtotime(setdate(time()));
         
      $tem = findtongyang($data);
      $tytemlist = $tem['datalist'];

      $value['city'] = $tem['city']; 
        // 遍历，计算温度
        $newtem[0] = array(
          'wdatestr'=>setdate($value['byriqi']),
          'htem'=>"0",
          'leiji'=>'0',
          'ltem'=> "0",
          'vtem'=> "0",
          'tip'=>'浇'
          );
            if($value['tyornot']==1&&$value['byriqi']>0){ 
              $leiji = 0; 
              // 已送
              if($value['tyys']==1){
                  // 遍历
                            foreach($tytemlist as $k => &$v){
                              if($v['wdate']>$value['byriqi']&&$v['wdate']<=$value['tytime']){  
                                $leiji += $v['vtem'];
                              $v['leiji'] = $leiji;
                              $v['wdatestr'] = setdate($v['wdate']);

 							  $v['tip'] = $v['wdate']==$value['tytime']?'送':'';
 							  if(strtotime(setdate($v['wdate']))==$today){
 							  	 $v['tip'] ='今';
 							  } 
                               $newtem[] = $v;
                              } 

                             

                             
                            } 
              }

              if($value['tyys']==0){
                 // 遍历
                            foreach($tytemlist as $k => &$v){
                              if($v['wdate']>$value['byriqi']){  
                                $leiji += $v['vtem'];
                              $v['leiji'] = $leiji;
                              $v['wdatestr'] = setdate($v['wdate']);
                              $v['tip'] = ''; 

                              if(strtotime(setdate($v['wdate']))==$today){
 									$v['tip'] = '今';
                              }
                              if($v['wdate']>$today){
                              		$v['tip'] = '预';
                              }
 							  
 							 

                               $newtem[] = $v;
                              } 
                            }
              }
              // 未送 
            }


      return array('datalist'=>$newtem,'tyinfo'=>$value,'dd'=>'','vv'=>$today);      
}





//积分 调用函数
function jifen($uid,$time,$jtype){
	//time  是1  和 2
	//积分的名字 有一个枚举
	$jifen = array(
		'LOGIN'=>20,
		'SHARE_QZONE'=>15,
		'SHARE_FRIENT'=>15,
		'SHARE_WECHAT'=>15,
		'SHARE_SINA'=>15,
		'SHARE_BAIDU'=>15,
		'SHARE_QQWEBO'=>15,
		'REG_OWN'=>2000,
		'REG_FRIENT'=>30,
		'HUIZONG'=>-2,
		'NEWPRO'=>-500,
		'NEWSIN'=>-10,
		'ZHINENG'=>-10,
		'HUODONG'=>1000
		);
//积分的名字 有一个枚举
	$jifenname = array(
		'LOGIN'=>'每日登录',
		'SHARE_QZONE'=>'分享空间',
		'SHARE_FRIENT'=>'分享好友',
		'SHARE_WECHAT'=>'分享微信',
		'SHARE_SINA'=>'分享新浪微博',
		'SHARE_BAIDU'=>'分享百度',
		'SHARE_QQWEBO'=>'分享腾讯微博',
		'REG_OWN'=>'个人注册',
		'REG_FRIENT'=>'推荐注册',
		'HUIZONG'=>'送检汇总',
		'NEWPRO'=>'新创建工程',
		'NEWSIN'=>'增加子单位',
		'ZHINENG'=>'智能生成',
		'HUODONG'=>'管理员赠活动积分'
		);
	//获取当前时间戳
	$nowtime = time();

	//获取当前日期
	$date = Date('Y-m-d',$nowtime);
	$todaystr = strtotime($date);

	$arr = array(
		'uid'=>$uid,
		'jfname'=>$jifenname[$jtype],
		'jtime'=>$nowtime,
		'jvalue'=>$jifen[$jtype],
		'jtype'=>$jtype,
		'jdate'=>$todaystr
		);
//return $arr;
// 判断是什么是多次还是单次添加积分；
	//每日单次
	if($time==1){

		if($uid!=''&&$jifen[$jtype]!=''){
			   $fd = Db::connect("DB_Config_1")->name('jifen')->where(array('uid'=>$uid,'jdate'=>$todaystr,'jtype'=>$jtype))->find();
					if($fd){						
						return array('reply'=>0,'desc'=>'今日本类型积分已存在');
					}else{
						$ad = Db::connect("DB_Config_1")->name('jifen')->insert($arr);
						if($ad){
							return array('reply'=>1,'desc'=>'添加单次积分成功','jifen'=>$arr);
						}else{
							return array('reply'=>0,'desc'=>'添加单次积分失败');
						}
						
					}
		}else{
			return array('desc'=>'错误代码1','arr'=>$arr);
		}

		
	} 
// 每日多次
	if($time==2){
		if($uid!=''&&$jifen[$jtype]!=''){
			   $ad = Db::connect("DB_Config_1")->name('jifen')->insert($arr);
						if($ad){
							return array('reply'=>1,'desc'=>'添加复次积分成功');
						}else{
							return array('reply'=>0,'desc'=>'添加复次积分失败');
						}
		}else{
			return array('desc'=>'错误代码3','arr'=>$arr);
		}
	
	}
	 
 


}


// 公共调用，使用rejson(参数，参数，参数)进行调用
function rejson($code=0,$msg='',$data='',$arr=''){
        return json(['code'=>$code,'msg'=>$msg,'data'=>$data,'arr'=>$arr]); 
    }


// 1、单表查询列表 返回数组[]；
    function get_datalist($tbn=null,$where=[],$field=null,$num=null,$sort=null){
        $data = Db::connect("DB_Config_1")->name($tbn);
        if($field){$data = $data->field($field);  }
        $where['isdel']=['=','0'];
        $data = $data->where($where);
        if($num){$data = $data->limit($num);}        
        if($sort){$data = $data->order($sort);}
        $re = $data->select();   
        return $re;
    }
// 3、单表查询1条记录 返回对象   {}；
    function get_data($tbn,$where=null,$field=null,$sort=null){
         $data = Db::connect("DB_Config_1")->name($tbn);
          if($field){$data = $data->field($field);}

           $where['isdel']=['=','0'];
           $data = $data->where($where); 
          if($sort){$data = $data->order($sort);}
          
          $re = $data->find(); 
          return $re; 
    }


 
/**
 *河狸建筑 解析codeid
 * @param    string   
 * @return   arr
 * @author  wyl <181984609@qq.com>
 */
function explain_codeid($codeid){ 
    $code = jiemi($codeid); 
    if($code=='')return false;
        $num_star_idv_arr = explode("*",$code);
        $num = $num_star_idv_arr[0]; 
        $a = gettable($num); 
        $arr =array(
        'tbn'=>$a['tbn'],
        'id'=>$a['id'],
        'kws'=>$a['kws'],
        'idv'=>intval($num_star_idv_arr[1]),
        'num'=>$num, 
        ); 
return $arr;
} 



 //配置数据表
function gettable($sub=null)
{
    $where['tbnum'] = ['=',$sub];
    $data = get_data('system_conf',$where); 
    return ['tbn'=>$data['tbname'],'id'=>$data['tbid'],'kws'=>$data['tbkeywords']];  
}


// 8、删除一条或者多条记录
    function delete_data($tbn,$id,$idarr){
        $re = Db::connect("DB_Config_1")->name($tbn)->where($id,'in',$idarr)->setField('isdel',1);
        return $re;
    };




//加工查询条件
function dealwhere($p=[]){
    $where = array();
    if(isset($p['name'])){unset($p['name']);}
    if(isset($p['top'])){unset($p['top']);}
    if(isset($p['listnum'])){unset($p['listnum']);}
    if(isset($p['curPage'])){unset($p['curPage']);}
    if(isset($p['keyword'])){unset($p['keyword']);}
    if(isset($p['orderstrid'])){unset($p['orderstrid']);}
    if(isset($p['codeid'])){unset($p['codeid']);}
    if(isset($p['debug'])){unset($p['debug']);}
    if(isset($p['debugkey'])){unset($p['debugkey']);}
    foreach ($p as $key => $value) { 
        $where[$key]=$value;
    }
    return $where; 
}




// function archivetree_recursive($list,$arr,$single=null){
//     foreach ($arr as $key => &$value) { 
// 	    foreach ($list as $k => $val) {
// 	      if($value['id']==$val['pid']){
// 	        if($val['type']=='dir'){



// 	        	if($value['note']=='single'){
		       		

	        		
// 		       		foreach ($single as $sk => $sv) {
// 	        			$ttemp=[
// 	        				'id'=>$value['id'],
// 	        				'pid'=>0,
// 	        				'name'=>$sv['sname'],
// 	        				'visible'=>1,
// 	        				'type'=>'dir',
// 	        				'note'=>'',
// 	        				'sid'=>$sv['sid']
// 	        			];
// 	        			$value['children'][]=archivetree_recursive($list,[$ttemp],$single);
// 	        		}

// 	        		continue 2;
// 	        	}


// 	        	isset($value['sid'])?$val['sid']=$value['sid']:'';



// 	        	// if($val['note']=='songjian'){

// 	        	// 	$data=Db::connect("DB_Config_1")->name('songjian')->where(['sid'=>$val['sid']])->select();
// 	        	// 	$children=temp_recursive($list,[$val],$single=null);
// 	        	// 	$value['children']=$children;
// 	        	// 	$temp=array();
// 	        	// 	foreach ($value['children'] as $kk => &$vv) {
// 		        // 		isset($vv['children'])?$temp=$vv['children']:[];
// 		        // 		$vv['children']=array();
// 		        // 		foreach ($data as $songk => $songv) {
// 		        // 			$vv['children'][]=[
// 		        // 				'id'=>$value['id'],
// 		        // 				'pid'=>0,
// 		        // 				'name'=>$songv['bybuwei'],
// 		        // 				'visible'=>1,
// 		        // 				'type'=>'dir',
// 		        // 				'note'=>'',
// 		        // 				'children'=>$temp
// 		        // 			];
// 		        // 		}	        			
// 	        	// 	}

// 	        	// 	continue 2;

// 	        	// }



// 	        	$val=archivetree_recursive($list,[$val],$single);

// 	        }

// 	        $value['children222'] = $val;

// 	      }  
// 	    } 
// 	}
// 	return $arr;
// }





// function temp_recursive($list,$arr,$single=null){
//     foreach ($arr as $key => &$value) { 
// 	    foreach ($list as $k => $val) {
// 	      if($value['id']==$val['pid']){
// 	        if($val['type']=='dir'){
// 	        	$val=archivetree_recursive($list,[$val],$single);
// 	        }
// 	        $value['children'][] = $val;

// 	      }  
// 	    } 
// 	}
// 	return $arr;
// }









function arr2tree($tree, $rootId = 0,$single=null,$sid=0) { 
  $return = array(); 
  foreach($tree as &$leaf) { 
    if($leaf['pid'] == $rootId) { 
      foreach($tree as &$subleaf) { 
        if($subleaf['pid'] == $leaf['id']) { 

	        	if($leaf['note']=='single'){

		       		foreach ($single as $sk => $sv) {
	        			$leaf['children'][]=[
	        				'id'=>$leaf['id'],
	        				'pid'=>0,
	        				'name'=>$sv['sname'],
	        				'visible'=>1,
	        				'type'=>'dir',
	        				'note'=>'',
	        				'sid'=>$sv['sid'],
	        				'scodeid'=>$sv['codeid']
	        			];
	        			$leaf['children'][$sk]['children']=arr2tree($tree,$leaf['id'],$single,$sv['sid']);
	        		}

	        		$return[] = $leaf; 
	        		continue 2;
	        	}

	        		$sid?$subleaf['sid']=$sid:'';


	        	if($leaf['note']=='songjian'){
	        		$data=Db::connect("DB_Config_1")->field('tid,bybuwei')->name('songjian')->where(['sid'=>$leaf['sid']])->select();
	        		$data=setcodeid($data,4);
	        		$children=arr2tree($tree,$leaf['id'],$single);

	        		foreach ($data as $kk => $vv) {
	        			$leaf['children'][]=[
	        				'name'=>$vv['bybuwei'],
	        				'codeid'=>$vv['codeid'],
	        				'children'=>$children,
	        			];
	        			
	        		}
					$return[] = $leaf; 
	        		continue 2;

	        	}




          $leaf['children'] = arr2tree($tree, $leaf['id'],$single); 
          break; 
        } 
      } 
      $return[] = $leaf; 
    } 
  } 
  return $return; 
} 





















?>








