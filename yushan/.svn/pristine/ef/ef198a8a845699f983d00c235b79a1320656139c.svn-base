<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author:  
// +----------------------------------------------------------------------
use think\Request;
use think\View;
use think\Db;
use think\Session;
use think\Loader; 
use jwt\JWT; 
define("TOKEN2","linxcABCDEFGHIJGJJ");
define("Appid2","wx3edf97fba911c055");
define("AppSecret2","069f867e0970e0d563abbbe80b84ffc3");
// 配置验证器
/**
 * minishop md5加密方法
 * @author wyl  
 */
function yscheck($data)
{
  
$rule = [
        'group_name' => 'require',
        ];


$msg = [
        'group_name.require'  => '用户组不能为空',
       ]; 


    $validate = Loader::validate($data,$rule,$msg);
    $validate->loadLang();
    // 验证
    if(!$validate->check($data)){ 
        echo json_encode(['code'=>'0','msg'=>$validate->getError()]);
        exit(); 
    } 

     
}


//封装设置token
function settoken($obj){
$key = config('tokenkey');    
return JWT::encode($obj, $key);
// sub: 该JWT所面向的用户
// iss: 该JWT的签发者
// iat(issued at): 在什么时候签发的token
// exp(expires): token什么时候过期
// nbf(not before)：token在此时间之前不能被接收处理
// jti：JWT ID为web token提供唯一标识
// $key = config('tokenkey');
// $token = array(
//     "iss" => "http://api.ysjianzhu.com",
//     "aud" => "http://zhaopin.ysjianzhu.com",
//     "iat" => 1356999524,
//     "nbf" => 1357000000
// );
// $jwt =  JWT::encode($token, $key);                     //对json进行加密
// $decoded = JWT::decode($jwt, $key, array('HS256'));    //对json进行解密
// print_r($decoded);  
}


//解析token
function explaintoken($str){
   $key = config('tokenkey');
   return JWT::decode($str, $key, array('HS256')); 

}

/**
 * 创建uuid,系统内唯一标识符
 * @author wyl <181984609@qq.com>
 */
function create_uuid()
{
    mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
    $charid = strtolower(md5(uniqid(rand(), true)));
    $hyphen = chr(45);// "-"
    $uuid = substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);
    return $uuid;
}


 

/**
 * 获取uuid,系统内唯一标识符
 * @author tangtanglove <dai_hang_love@126.com>
 */
function get_uuid($model,$map)
{
    return Db::name($model)->where($map)->value('uuid');
}




// 公共调用，使用rejson(参数，参数，参数)进行调用
function rejson($code=0,$msg='',$data='',$arr=''){
        return json(['code'=>$code,'msg'=>$msg,'data'=>$data,'arr'=>$arr]); 
    }











 //配置数据表
function gettable($sub=null)
{
    $where['tbnum'] = ['=',$sub];
    $data = get_data('system_conf',$where); 
    return ['tbn'=>$data['tbname'],'id'=>$data['tbid'],'kws'=>$data['tbkeywords']];  
}

 

    function p($array){
        dump($array,1,'<pre>',0,'</pre>');
        exit;
    }
 //配置各个页面的codeid
function set_comview()
{
   $data = get_datalist('system_conf'); 
   $obj = array();
   foreach ($data as $key => &$value) {
       $code = $value['tbnum'].'*';
       $obj[$value['tbcodestr']] = jiami($code);
   } 
    return $obj; 
}


 //配置后台的codeid
function set_comview_admin()
{
   $data = get_datalist('system_conf'); 
   $obj = array();
   foreach ($data as $key => &$value) {
       $code = $value['tbnum'].'*';
        $vx = 'c'.$value['tbnum'];
       $obj[$vx] = jiami($code);
   } 
    return $obj; 
}



 //提供给前台的  配置各个页面的codeid
function set_comview_index()
{
  
   $data = get_datalist('system_conf'); 
   $obj = array();
   foreach ($data as $key => &$value) {
       $code = $value['tbnum'].'*'; 
        $obj[$value['tbcodestr']] = $value['adminonly']==0?jiami($code):'';
       
       
   } 
    return $obj; 
}



 // 算法类——公共函数**************************************************************************************************
 
/**
 *通过url 获取json数据
 * @param    string   $address     "json/pc/admin/menu.json" 
 * @return   arr
 * @author  wyl <181984609@qq.com>
 */
function getjson($url){ 
	// 从文件中读取数据到PHP变量
	$json_string = file_get_contents($url); 
	// 把JSON字符串转成PHP数组
	$data = json_decode($json_string, true);
	return $data; 
}



/**
 *创建盐
 * @param    string   
 * @return   string
 * @author  wyl <181984609@qq.com>
 */
function create_salt($length=-6)
{
    //return '111111';
    return $salt = substr(uniqid(rand()), $length);
}

/**
 *宇杉md5加密
 * @param    string   
 * @return   string
 * @author  wyl <181984609@qq.com>
 */
function ys_md5($string,$salt)
{
    return md5(md5($string).$salt);
}

/**
 *用户信息存入session,从session拿出用户信息
 * @param    string   cookie("PHPSESSID")
 * @return   stringcookie("PHPSESSID")
 * @author  wyl <181984609@qq.com>
 */
function user_auth($data=null){  
    if($data===null){
        return session('admin_sessid'); 
    }else{
        session('admin_sessid',$data); 
        return true; 
    } 
}; 


//处理token
function check_token($token){
    $data=explaintoken($token);
    $where['uuid']=$data['uuid'];
    $d=get_data('templogin',$where);
    if(!$d)return false;
    if(ceil((time()-$d['createtime'])/86400)>3)return false;

    return true;
}

/**
 *宇杉 加密
 * @param    string   2*56    2是表的下标，56是表的id
 * @return   string
 * @author  wyl <181984609@qq.com>
 */
 function jiami($str){
     $userdata = user_auth();
     return encrypt($str,'E',$userdata['salt']); 
    }

/**
 *宇杉 解密
 * @param    string   
 * @return   string
 * @author  wyl <181984609@qq.com>
 */
function jiemi($str){
$userdata = user_auth(); 
return encrypt($str,'D',$userdata['salt']);
    }

function setdate($num=0,$all=null){ 
    //$a = strtotime('2015-12-26');1451059200 H:i:s
    if($all==null){
      $d = $num==0?'':date("Y-m-d", $num); 
    }else{
      $d = $num==0?'':date("Y-m-d H:i:s", $num);
    } 
    return $d;
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
$value['namestr'] = $parent['cststr'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/images/m'.$a.'.png">'.$value['namestr']; 
$value['cststr'] = $parent['cststr'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/images/m1.png">';
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
 *宇杉 生成codeid
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
        isset($value["createtime"])?$value['createtime'] = setdate($value['createtime'],true):"";
        isset($value["precreatetime"])?$value['precreatetime'] = setdate($value['precreatetime'],true):"";
        isset($value["addtime"])?$value['addtime'] = setdate($value['addtime'],false):"";
        isset($value["newstime"])?$value['newstime'] = date('m月n',$value['newstime']):"";
        isset($value["refreshtime"])?$value['refreshtime'] = setdate($value['refreshtime'],true):"";
        isset($value["starttime"])?$value['starttime'] = setdate($value['starttime'],true):"";
        isset($value["endtime"])?$value['endtime'] = setdate($value['endtime'],true):"";
        isset($value["zanTime"])?$value['zanTime'] = setdate($value['zanTime'],true):"";
        isset($value["pay_time"])?$value['pay_time'] = setdate($value['pay_time'],true):"";
        isset($value["order_time"])?$value['order_time'] = setdate($value['order_time'],true):"";
        isset($value["restatus_time"])?$value['restatus_time'] = setdate($value['restatus_time'],true):"";
  // p($value);      
        isset($value["updatetime"])?$value['updatetime'] = setdate($value['updatetime'],true):"";
        isset($value["last_search_time"])?$value['last_search_time'] = setdate($value['last_search_time'],true):"";
        // isset($value["last_logintime"])?$value['last_logintime'] = setdate($value['last_logintime'],true):"";
        isset($value["logintime"])?$value['logintime'] = setdate($value['logintime'],true):"";

        if(isset($value["content"])){
            $value["content"] = htmlspecialchars_decode($value["content"]);
        }

        if(isset($value["thumb"])){
            $value["thumbarr"] = explode(';',$value["thumb"]);

        }

    }  
    return $arr;
}
 
/**
 *宇杉 解析codeid
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
/**
 *宇杉 还原成真实的对象： codeid=989709ykhyku&name=guyuan ————————————>  [data=>[prid=>9,name=>guyuan],tbn=program]  
 * @param    string   
 * @return   arr
 * @author  wyl <181984609@qq.com>
 */
function real_data($post,$obj){
$tbn = $obj['tbn'];
$id = $obj['id'];
$idv = $obj['idv'];

unset($post['codeid']);  
unset($obj['tbn']);
unset($obj['id']);
unset($obj['idv']);
unset($obj['num']); 
$obj[$id] = $idv;
$newarr = array_merge($post,$obj); 
return array('tbn'=>$tbn,'data'=>$newarr);

}


/**
 *宇杉 还原成真实的对象： codeid=989709ykhyku&name=guyuan ————————————>  [data=>[prid=>9,name=>guyuan],tbn=program]  
 * @param    string   
 * @return   arr
 * @author  wyl <181984609@qq.com>
 */
function real_data_noid($post,$obj){
$tbn = $obj['tbn']; 

unset($post['codeid']); 
unset($post['tablecodeid']);
unset($obj['tbn']);
unset($obj['id']);
unset($obj['idv']);
unset($obj['num']); 
$newarr = array_merge($post,$obj); 
return array('tbn'=>$tbn,'data'=>$newarr);

}

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


function dealorder($id){
    $arr='';
    if(!$id)return $arr; 
    $arr=[
    '1'=>'company_addtime desc',
    '2'=>'createtime desc',
    '3'=>'reg_time desc',
    '4'=>'pay_time desc'
    ];


    return $arr[$id];
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



/**
 *发送邮件
 * @param    string   $address       地址
 * @param    string    $title 标题
 * @param    string    $message 邮件内容
 * @param    string $attachment 附件列表
 * @return   boolean
 */
function send_mail($address, $title, $message, $attachment = null)
{
    Vendor('PHPMailer.class#phpmailer');

    $mail = new PHPMailer;
    //$mail->Priority = 3;
    // 设置PHPMailer使用SMTP服务器发送Email
    $mail->IsSMTP();
    // 设置邮件的字符编码，若不指定，则为'UTF-8'
    $mail->CharSet   = 'UTF-8';
    $mail->SMTPDebug = 0; // 关闭SMTP调试功能
    $mail->SMTPAuth  = true; // 启用 SMTP 验证功能
    // $mail->SMTPSecure = 'ssl';  // 使用安全协议
    $mail->IsHTML(true); //body is html

    // 设置SMTP服务器。
    $mail->Host = C('CFG_EMAIL_HOST');
    $mail->Port = C('CFG_EMAIL_PORT') ? C('CFG_EMAIL_PORT') : 25; // SMTP服务器的端口号

    // 设置用户名和密码。
    $mail->Username = C('CFG_EMAIL_LOGINNAME');
    $mail->Password = C('CFG_EMAIL_PASSWORD');

    // 设置邮件头的From字段
    $mail->From = C('CFG_EMAIL_FROM');
    // 设置发件人名字
    $mail->FromName = C('CFG_EMAIL_FROM_NAME');

    // 设置邮件标题
    $mail->Subject = $title;
    // 添加收件人地址，可以多次使用来添加多个收件人
    $mail->AddAddress($address);
    // 设置邮件正文
    $mail->Body = $message;
    // 添加附件
    if (is_array($attachment)) {
        foreach ($attachment as $file) {
            is_file($file) && $mail->AddAttachment($file);
        }
    }

    // 发送邮件。
    //return($mail->Send());
    return $mail->Send() ? true : $mail->ErrorInfo;
}

 
/**
 * 格式化字节大小
 * @param  number $size      字节数
 * @param  string $delimiter 数字和单位分隔符
 * @return string            格式化后的带单位的大小
 */
function format_bytes($size, $delimiter = '') {
    $units = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
    for ($i = 0; $size >= 1024 && $i < 5; $i++) $size /= 1024;
    return round($size, 2) . $delimiter . $units[$i];
}











 //数据库类——公共函数*********************************************************************************************************
// 数据库增删改查一些方法


// 1、单表查询列表 返回数组[]；
    function get_datalist($tbn=null,$where=[],$field=null,$num=null,$sort=null){
        $data = Db::name($tbn);
        if($field){$data = $data->field($field);  }
        $where['isdel']=['=','0'];
        $data = $data->where($where);
        if($num){$data = $data->limit($num);}        
        if($sort){$data = $data->order($sort);}
        $re = $data->select();   
        return $re;
    }
// 2、单表查询列表分页 返回对象  {datalist:[],total:35}；

    function get_datalist_page($tbn=null,$where=null,$curPage=null,$listnum=null,$order=null){
    
    $where['isdel']=['=','0'];

    $total = Db::name($tbn)->where($where)->count();
   // p($total);
    $pages = ceil($total/$listnum); 
    $data=Db::name($tbn)->where($where)->page($curPage)->limit($listnum)->order($order)->select();
    $arr = array('pages'=>$pages,'datalist'=>$data,'total'=>$total);
    return $arr;
}   
// 3、单表查询1条记录 返回对象   {}；
    function get_data($tbn,$where=null,$field=null,$sort=null){
         $data = Db::name($tbn);
          if($field){$data = $data->field($field);}

           $where['isdel']=['=','0'];
           $data = $data->where($where); 
          if($sort){$data = $data->order($sort);}
          
          $re = $data->find(); 
          return $re; 
    }



 


// 7、增加 
function insert_data($tbn,$data){
      $re = Db::name($tbn)->insertGetId($data);
      return $re;
    };
// 删除采用物理删除 isdel字段， 0默认没删除，1已删除；
// 8、删除一条或者多条记录
    function delete_data($tbn,$id,$idarr){
        $re = Db::name($tbn)->where($id,'in',$idarr)->setField('isdel',1);
        return $re;
    };


// 9、更新一条记录
  function update_one($tbn,$where,$content){
    $data = Db::name($tbn)->where($where)->update($content); 
    return $data;
    };

// 10、更新多条记录

        function update_more($tbn,$id,$value){

        return true;
    };

 










    /**
 * 写基础配置文件
 * @param $data
 */
function writeConfig($data)
{
    $path = APP_ROOT . '/config/group.conf';
    @file_put_contents($path, serialize($data));
    return true;
}

//读配置文件
function readConfig()
{
    $path = APP_ROOT . '/config/group.conf';
    $conf = file_get_contents($path);
    if(empty($conf))
        return [];

    return unserialize($conf);
}

//写聊天配置
function writeCtConfig($data)
{
    $path = APP_ROOT . '/config/chat.conf';
    @file_put_contents($path, serialize($data));
    return true;
}

//读聊天配置文件
function readCtConfig()
{
    $path = APP_ROOT . '/config/chat.conf';
    $conf = file_get_contents($path);
    if(empty($conf))
        return [];

    return unserialize($conf);
}

//获取评论
function getComment($blogId)
{
    $list = db('comment')->where('blog_id', $blogId)->select();
    if(empty($list)){

        echo "";
    }else{

        $html = '';
        foreach($list as $key=>$vo){
            $html .= '<a href="javascript:;" class="pull-left"><img alt="image" src="' . $vo['com_avatar'] . '"></a>';
            $html .= '<div class="media-body"><a href="javascript:;" style="color:#337AB7">' . $vo['com_user'];
            $html .= '&nbsp;&nbsp;&nbsp;&nbsp;</a>' . $vo['content'] . '<br/>';
            $html .= '<small class="text-muted">' . date('Y-m-d H:i', $vo['com_time']) . '</small></div>';
        }

        echo $html;
    }

}

//将对象转换成数组
function objToArr($obj)
{
    return json_decode(json_encode($obj), true)['data'];
}

//将内容进行UNICODE编码，编码后的内容格式：\u56fe\u7247 （原始：图片）  
function unicode_encode($name)  
{  
    $name = iconv('UTF-8', 'UCS-2', $name);  
    $len = strlen($name);  
    $str = '';  
    for ($i = 0; $i < $len - 1; $i = $i + 2)  
    {  
        $c = $name[$i];  
        $c2 = $name[$i + 1];  
        if (ord($c) > 0)  
        {    // 两个字节的文字  
            $str .= 'u'.base_convert(ord($c), 10, 16).base_convert(ord($c2), 10, 16);  
        }  
        else  
        {  
            $str .= $c2;  
        }  
    }  
    return $str;  
} 

/**
 * 判断一个表是否已经存在
 * @param string $table_name 要判断的表名
 * @return boolean
 */
 
 
 
 /**
 * 获取表名
 * @param int    $moduleid  模型id
 * @param string $tablem    返回表名
 */
function gettbname($moduleid){
    $module=M('SystemModule');
    //获取数据表名称
    $table=$module->where('id='.$moduleid)->field('table_name')->find();
    $tablename=str_replace(C('DB_PREFIX'), '', $table['table_name']);
    $tablename=explode('_',$tablename);
    foreach($tablename as $k=>$v){
        $tablem.=ucfirst($v);
    }
    return $tablem;
}
function tableexist($table_name){ 
    $tableisexit=Db::query('SHOW TABLES LIKE \''.$table_name.'\'');
    if(count($tableisexit)){
        return true;
    }else{
        return false;
    }
}
/**
 * 生成创建表的sql语句
 * @param string $table_name  要创建的表名
 * @param array $default_value  默认有的字段,二维数组，每个子数组中需包含value_name字段名，value_title注释
 * @param string $table_description 表注释
 */
function createAddTableSql($table_name,$default_value,$table_description='无'){
    $varchar=array('input','radio','checkbox','select','image','date','datetime','time','file');
    $text=array('textarea','cleareditor','editor','imagelist','fileslist');
    $sql='CREATE TABLE IF NOT EXISTS `'.$table_name.'` (  
            `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
            `listorder` int(11) default 9999,
            `cloneid` int(11) default NULL,
            `url` varchar(200) default NULL,
            `createtime` char(20),
            `updatetime` char(20),
            `cateid` int(11) NOT NULL COMMENT \'所属栏目\',';
    foreach($default_value as $k=>$v){
        if(in_array($v['attr'],$varchar)){
            $sql.='`'.$v['value_name'].'` varchar(100) DEFAULT NULL COMMENT \''.$v['value_title'].'\',';
        }else if(in_array($v['attr'], $text)){
            $sql.='`'.$v['value_name'].'` text COMMENT \''.$v['value_title'].'\',';
        }
    }
    $sql.='  PRIMARY KEY (`id`)
            ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8  COMMENT=\''.$table_description.'\';';
    return $sql;
}
/**
 * 生成表字段的sql语句
 * @param string $table_name  要操作的表名
 * @param string $field_name  添加的字段名
 * @param string $table_type  字段类型
 * @param string $notnull   非空 
 * @param string $isunique  唯一值（）因现字段类型只有text 和varchar(100) 停用 
 * @param string $default   默认 
 * @param string $sql   返回sql语句 
 */
                            //表名，字段名，字段类型，非空，唯一，默认
function createAddFieldSql($table_name,$field_name,$table_type,$notnull,$isunique,$default){
    $varchar=array('input','radio','checkbox','select','image','date','datetime','time','file');
    $text=array('textarea','cleareditor','editor','imagelist','fileslist');
    //判断字段类型
    if(in_array($table_type,$varchar)){
        $table_type=' varchar(100) ';
    }else{
        $table_type=' text ';
        $default='';
    }
    //非空
    $notnull=($notnull==1)?' not null ':' ';
    //唯一
    $isunique=($isunique==1)?' unique ':' ';
    $sql='alter table '.$table_name.' add '.$field_name
    //类型
    .$table_type
    //非空
    .$notnull
    //唯一
    .$isunique
    //默认值
    .' default'.$default;
/*  .' default"'.$default.'"'; */
    $result['sql']=$sql;
    return $sql;
} 


/**
 * 获取 获取数组的id数组
 * @param 
 * @return   arr
 * @author  wyl
 */
function getids($data,$id){
    $narr = [];
    foreach ($data as $key => $value) {
         $narr[] = $value[$id];
    }
    return $narr;
}

/**
 * 获取 两个数组通过某个id进行拼接
 * @param 
 * @return   arr
 * @author  wyl
 */
function jointwoarr($arr1,$arr2,$id1,$id2){ 
    foreach ($arr1 as $key => &$value) {
         foreach ($arr2 as $k => $val) {
            if($value[$id1]==$val[$id2]){
                unset($val[$id2]);
                $value = array_merge($value, $val);
            }
         }
    }
    return $arr1;
}
 



/**
 * 设备 浏览器
 * @param 
 * @return   arr
 * @author  xubo
 */
function getAgentInfo(){  
    $agent = $_SERVER['HTTP_USER_AGENT'];  
    $brower = array(  
        'MSIE' => 1,  
        'Firefox' => 2,  
        'QQBrowser' => 3,  
        'QQ/' => 3,  
        'UCBrowser' => 4,  
        'MicroMessenger' => 9,  
        'Edge' => 5,  
        'Chrome' => 6,  
        'Opera' => 7,  
        'OPR' => 7,  
        'Safari' => 8,  
        'Trident/' => 1  
    );  
    $system = array(  
        'Windows Phone' => 4,  
        'Windows' => 1,  
        'Android' => 2,  
        'iPhone' => 3,  
        'iPad' => 5  
    );  
    $browser_num = 0;//未知  
    $system_num = 0;//未知  
    foreach($brower as $bro => $val){  
        if(stripos($agent, $bro) !== false){  
            $browser_num = $bro;  
            break;  
        }  
    }  
    foreach($system as $sys => $val){  
        if(stripos($agent, $sys) !== false){  
            $system_num = $sys;  
            break;  
        }  
    }  
    return array('sys' => $system_num, 'bro' => $browser_num);  
} 







/***********************微信*************************
/**
 * 判断重定向
 * @param    string   
 * @return   arr
 * @author  lxc
 */
function wechatRedirect($url){
    $url = str_replace("","%2f",$url);
    // if (Session::get('jsoninfo')) {
        $scope = 'snsapi_base';
    // }else{
        // $scope = 'snsapi_userinfo';
    // }
    $reurl = 'Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3edf97fba911c055&redirect_uri=http%3a%2f%2fwww.chenbaozhong.com%2findex.php%2fIndex%2f'.$url.'&response_type=code&scope='.$scope.'&state=1#wechat_redirect';
    return $reurl;
} 

/**
 * 获取微信用户信息
 * @param    string   
 * @return   arr
 * @author  lxc
 */
function getWxinfo($GET){
    if (!Session::get('jsoninfo')) {
        if (array_key_exists('code',$GET)||Session::get('wxopenid')) {
            if (Session::get('wxopenid')) {
                $openid = Session::get('wxopenid');
            }else{
                $code = $GET['code'];
                $oauth2url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".Appid2."&secret=".AppSecret2."&code={$code}&grant_type=authorization_code";
                $jsoninfo = http_curl($oauth2url,null);
                $access_token = $jsoninfo['access_token'];
                $openid = $jsoninfo['openid'];
            }
            $url = "https://api.weixin.qq.com/sns/userinfo?access_token={$access_token}&openid={$openid}&lang=zh_CN";      
            $jsoninfo =http_curl($url,null);        
            Session::set('jsoninfo',$jsoninfo); 
            Session::set('wxopenid',$openid);              
        }
        else{
            header(wechatRedirect('index'));   
            exit(); 
        }                
    }else{
        $jsoninfo = Session::get('jsoninfo');
    }
    return $jsoninfo;
} 



/**
 * 获取全局的access_token方法
 * @return [type] [description]
 */
function getAccessToken(){
    $field = 'access_token,modify_time';
    $condition = array('token'=>TOKEN,'appid'=>Appid,'appsecret'=>AppSecret);
    // $data = M('wechat')->field($field)->where($condition)->find();
    // if($data['access_token'] && time()-$data['modify_time']<7000){
    //  $access_token = $data['access_token'];
    // }else{
        $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.Appid.'&secret='.AppSecret.'';
        $jsoninfo = http_curl($url,null);
        if(!$jsoninfo){
            var_dump($jsoninfo);
        }else{
            $access_token = $jsoninfo['access_token'];
            $data = array('access_token' =>$access_token,'modify_time'=>time());
            // M('wechat')->where($condition)->save($data);
        }
    // }
    return $access_token;
}


/**
 * curl方法
 * @param  [type] $url  [description]
 * @param  [type] $data [description]
 * @return [type]       [description]
 */
function http_curl($url,$data=null){
    //1.初始化curl
    $ch = curl_init();
    //2.设置curl的参数
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
    if($data){
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: '.strlen($data)));
    }
    //3.采集
    $output = curl_exec($ch);
    //4.关闭
    curl_close($ch);
    $jsoninfo = json_decode($output, true);
    if(!$jsoninfo)$jsoninfo=xmlToArray($output);
    return $jsoninfo;
}


/**
 * 发送消息
 * @return [type] [description]
 */
function responseMsg(){
  $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];               
  $postObj = simplexml_load_string($postStr,"SimpleXMLElement",LIBXML_NOCDATA);//XML转String
//根据消息类型将信息分发
  if(strtolower( $postObj->MsgType) == 'event'){
      if(strtolower($postObj->Event) == 'subscribe'){
            $toUserName = $postObj->FromUserName;
            $fromUserName = $postObj->ToUserName;
            $createTime = time();
            $msgType = 'text';
            $content = "【私募招聘网】是一家专注私募行业求职、招聘的垂直平台；通过线上招聘+线下社交的创新模式为企业实现快速的人才战略。为私募企业和人才搭建桥梁；让招聘、求职变得更加简单、高效！
快速进入找工作：http://www.91smzpw.com/jobs
 【私募社群】是私募招聘网旗下专注私募行业的垂直社交平台；为用户提供人脉拓展、建立渠道合作、对接优质项目、交流学习的机会聚积地；我们的梦想是连接每一个私募人；在未来的道路上互相帮助、学习、成长！
 欢迎阁下加入；一起共创美好未来；点击下方的【私募社群】即可加入平台";
            $template ="<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]]></MsgType>
                        <Content><![CDATA[%s]]></Content>
                        </xml>";
            $info = sprintf($template, $toUserName, $fromUserName,$createTime, $msgType,$content);
            echo $info;
      }
  }
}
//***********************微信*************************
 





function fenye($temp,$listnum){
         $c=0;
         $result=[];
          $num=count($temp);
        for ($j=1; $j <=$num; $j++) { 
          $result[$c][]=$temp[$j-1];
          if($j!=0&&$j%$listnum==0&&$listnum!=1){$c++;}
          if ($listnum==1) {
            $c++;
          }
      }
      return $result;
}


//文件与图片上传不同路径 函数
 function _path($files) {       
        $file = explode('.',$files);
      $filepath = in_array($file[1], array('jpg','gif','png','jpeg')) ? 'image/' : 'file/';
      return $filepath;
 }




function nethref($value){
    $href = explode("href=\"",$value);
    $realhref = explode("\"",$href[1])[0];
    return $realhref;
}
function nettext($value){
    $text = preg_replace("/\<.*?\>|\<.*?\>/", '', $value);
    return $text;
} 
function nethtml($url){
    $html=curl_get($url);
    header('content-Type:text/html;charset=utf-8');
    $html = mb_convert_encoding($html,'utf-8','gb2312'); 
    $query = new \org\Vquery($html); 
    return $query;
}  
function filehtml($url){
    header('content-Type:text/html;charset=utf-8');
    $html = file_get_contents($url); 
    $query = new \org\Vquery($html); 
    return $query;
}  
function curl_get($url, $gzip=false){
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
    if($gzip) curl_setopt($curl, CURLOPT_ENCODING, "gzip"); // 关键在这里
    $content = curl_exec($curl);
    curl_close($curl);
    return $content;
}

// //时间处理
function time_handle($time){
    $t=(time()-$time)/60/60/24;
    if ($t<1) {//时间差小于一天
        (String)$t=floor($t*24);
        if($t<1){
            $m=floor((time()-$time)/60);
            $result=$m.'分钟前';
        }else{
        $result=$t.'小时前';
        }
    }elseif ($t<3) {//时间差小于三天
        (String)$t=floor($t);
        $result=$t.'天前';
    }else{//时间差大于三天
        $result=date('Y年m月d日',$time);
    }
    return $result;
}


function get_weidu($from_id,$to_id){
    $weidu=DB::name('chatlog')->where('from_id='.$from_id.' AND to_id='.$to_id.'')->whereOr('from_id='.$to_id.' AND to_id='.$from_id.'')->select();
          $weidushu=0;
          foreach ($weidu as $k => $v) {
            if($v['need_send']==1)$weidushu++;
          }
    return $weidushu;
}

function get_chatuser($id1,$id2){
    $temp='';
    if($id1>$id2){
        $temp=$id2.','.$id1;
    }else{
        $temp=$id1.','.$id2;
    }
    return $temp;
}

function get_uid($token){
      $token=explaintoken($token);
      $user = Db::name('admin_user')->where('uuid',$token->uuid)->find();
      $uid = $user['id'];
      return $uid;
}

function data_handle($data){
    if($data){
        foreach ($data as $key => &$value) {
            //isset($value["createtime"])?$value['createtime'] = setdate($value['createtime'],true):"";
            if ($value['createtime']-time()>3600*24) {
            $value['createtime'] = date('Y-n-d H:i',$value['createtime']);
          }else{
            $value['createtime'] = date('H:i',$value['createtime']);
          }
        }
    }
    return $data;
}

//获取验证码 判断这个手机号码是否被注册
function getphcode($tel,$content){
    $rearr = array('code'=>1,'msg'=>'','data'=>array());
    if(!$tel){
        $rearr['code']=0;
        $rearr['msg']='号码为空，发送失败';
    }
    if($content=='verificate'){
        $sendcode=cutcode(time(),4);
        cache('phcode',''.$tel.'+'.$sendcode.'',18000);
        $content = '尊敬的用户，您的验证码是：'.$sendcode.'。在30分钟内有效，共享泳圈工作人员不会向您索取，请勿泄露。';
    }
    $message = 'http://www.smswst.com/api/httpapi.aspx?action=send&account=15175168062&password=@x194375&mobile='.$tel.'&content='.$content.'&sendTime=&AddSign=Y';
    // $rearr['msg']=$message;
    // return $rearr;
    $re = file_get_contents($message);
    $obj = simplexml_load_string($re);
    $rearr['code']='1';
    $rearr['msg']='发送短信成功！';
   
    $rearr['data']=$obj;
    return $rearr;
}

function cutcode($str,$num){
    $ltrl = strlen($str);
     $start = $ltrl - $num; 
     $encoding = 'utf-8'; 
    $lstr = mb_substr($str,$start,$num,$encoding);
    return $lstr;
}

// function microtime_float()
// {
//     list($usec, $sec) = explode(" ", microtime());
//     return ((float)$usec + (float)$sec);
// }

// function get_total_millisecond()
// {
//     $time = microtime_float();
//     return round($time * 1000);
// }

// function buildQuery($params)
// {
//     $parts = array();
//     $params = $params ?: array();
//     foreach ($params as $key => $value) {
//         if (is_array($value)) {
//             foreach ($value as $item) {
//                 $parts[] = urlencode((string)$key) . '=' . urlencode((string)$item);
//             }
//         } else {
//             $parts[] = urlencode((string)$key) . '=' . urlencode((string)$value);
//         }
//     }
//     return implode('&', $parts);
// }
//野狗
function getcode($tel,$content,$data=null,$date=null)
{

    $rearr = array('code'=>1,'msg'=>'','data'=>array());
    if(!$tel){
        $rearr['code']=0;
        $rearr['msg']='号码为空，发送失败';
    }
    if($content=='verificate'){
        $sendcode=cutcode(time(),4);
        $temp='["'.$sendcode.'"]';
        cache('phcode',''.$tel.'+'.$sendcode.'',1800);
        // $content = '尊敬的用户，您的验证码是：'.$sendcode.'。在30分钟内有效，共享泳圈工作人员不会向您索取，请勿泄露。';
    }
    // $message = 'http://www.smswst.com/api/httpapi.aspx?action=send&account=15175168062&password=@x194375&mobile='.$tel.'&content='.$content.'&sendTime=&AddSign=Y';
$time=get_total_millisecond();
$appId='wd8531381122vmfkek';
$url = "https://sms.wilddog.com/api/v1/${appId}/notify/send";
$mobilestr="mobiles";
switch ($content) {
    case 'verificate':
        $templateId=100567;//?
        $url = "https://api.wilddog.com/sms/v1/${appId}/code/send";
        $mobilestr="mobile";
        break;
    case 'tobuy':
        $templateId=100569;//?
        $tel='["'.$tel.'"]';
        $temp='["'.$data.'"]';
        if(!$data)$temp='[]';
        break;
    case 'tosell':
        $templateId=100568;//?
        $tel='["'.$tel.'"]';
        $temp='[]';
        break;
    case 'toaccount':
        $templateId=100570;//?
        $tel='["'.$tel.'"]';
        if($data){
            $d=explode(',',($data));
            $temp='[';
            for ($i=0; $i <count($d) ; $i++) { 
                if($i!=count($d)-1){
                    $temp=$temp.'"'.$d[$i].'",';
                }else{
                    $temp=$temp.'"'.$d[$i].'"';
                }
            }
            $temp=$temp.',"'.$date.'"]';
        }
        if(!$data)$temp='[]';
        break;
    case 'toback':
        $templateId=100576;//?
        $tel='["'.$tel.'"]';
        if($data){
            $d=explode(',',($data));
            $temp='[';
            for ($i=0; $i <count($d) ; $i++) { 
                if($i!=count($d)-1){
                    $temp=$temp.'"'.$d[$i].'",';
                }else{
                    $temp=$temp.'"'.$d[$i].'"';
                }
            }

            $temp=$temp.',"'.$date.'"]';
        }
        if(!$data)$temp='[]';
        break;
    default:
        # code...
        break;
}

// p($temp);

$sign_key = 'di8i0WDfRF7ki8qBNoDmeWF5XKBl3lk9v7k036Ef';//?
$sign_data = array($mobilestr => $tel, 'templateId' =>$templateId, 'timestamp' => $time,
    "params"=>$temp);
// 以字母升序(A-Z)排列
ksort($sign_data);
// var_dump($sign_data);
$sign_str = http_build_query($sign_data) . '&'. $sign_key;
//DEBUG
//生成数字签名的方法 https://docs.wilddog.com/guide/sms/signature.html#生成数字签名的方法
$signature= hash("sha256", urldecode($sign_str));
// 不同接口参数不同， 详细参数请参见 https://docs.wilddog.com
$post_data = array ('signature' => $signature,$mobilestr => $tel,"timestamp" => $time,"templateId" => $templateId,"params"=>$temp);
$form_string= http_build_query($post_data);
// // DEBUG
// echo "打印sign_str\n";
// var_dump($sign_str);
// echo "打印signature\n";
// var_dump($signature);
// echo "打印发送的数据\n";
// var_dump($form_string);
$header = array(
    'Content-Type: application/x-www-form-urlencoded',
);
$ch = curl_init();
// DEBUG 打印curl请求和响应调试日志
curl_setopt($ch, CURLOPT_VERBOSE, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// post数据
curl_setopt($ch, CURLOPT_POST, 1);
// post的变量
curl_setopt($ch, CURLOPT_POSTFIELDS, $form_string);
$output = curl_exec($ch);
curl_close($ch);
// DEBUG
// echo "打印获得的数据\n";
$re = json_decode($output, true);

$rearr = [];
 $rearr['code']='0';
 $rearr['msg']='失败！';
if(isset($re['status'])&&$re['status']=='ok'){
    $rearr['code']='1';
 $rearr['msg']='成功！';
 return $rearr;
} 
p($re);

}

function get_total_millisecond()
{
    $time = microtime(true);
    return round($time * 1000);
}

function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

function buildQuery($params)
{
    $parts = array();
    $params = $params ?: array();
    foreach ($params as $key => $value) {
        if (is_array($value)) {
            foreach ($value as $item) {
                $parts[] = urlencode((string)$key) . '=' . urlencode((string)$item);
            }
        } else {
            $parts[] = urlencode((string)$key) . '=' . urlencode((string)$value);
        }
    }
    return implode('&', $parts);
}





/**----------搜索过滤-----------**/
function FilterSearch($keyword)  
{  
    global $cfg_soft_lang;  
    if($cfg_soft_lang=='utf-8')  
    {  
        $keyword = preg_replace("/[\"\r\n\t\$\\><']/", '', $keyword);  
        if($keyword != stripslashes($keyword))  
        {  
            return '';  
        }  
        else  
        {  
            return $keyword;  
        }  
    }  
    else  
    {  
        $restr = '';  
        for($i=0;isset($keyword[$i]);$i++)  
        {  
            if(ord($keyword[$i]) > 0x80)  
            {  
                if(isset($keyword[$i+1]) && ord($keyword[$i+1]) > 0x40)  
                {  
                    $restr .= $keyword[$i].$keyword[$i+1];  
                    $i++;  
                }  
                else  
                {  
                    $restr .= ' ';  
                }  
            }  
            else  
            {  
                if(preg_match("/[^0-9a-z@#\.]/",$keyword[$i]))  
                {  
                    $restr .= ' ';  
                }  
                else  
                {  
                    $restr .= $keyword[$i];  
                }  
            }  
        }  
    }  
    return $restr;  
}  



function editaddtime_format($data){
    if($data){
        isset($data["starttime"])?$data['starttime']=strtotime($data['starttime']):'';
        isset($data["endtime"])?$data['endtime']=strtotime($data['endtime']):'';
        isset($data["order_time"])?$data['order_time']=strtotime($data['order_time']):'';
        isset($data["pay_time"])?$data['pay_time']=strtotime($data['pay_time']):'';
        isset($data["deal_time"])?$data['deal_time']=strtotime($data['deal_time']):'';
        isset($data["cancel_time"])?$data['cancel_time']=strtotime($data['cancel_time']):'';
        isset($data["oupdatetime"])?$data['oupdatetime']=strtotime($data['oupdatetime']):'';
        isset($data["restatus_time"])?$data['restatus_time']=strtotime($data['restatus_time']):'';
    }
    return $data;
}



/////////////微信自定义分享模块////////////////////////
//获取token
function get_token() {
    $info=config('Wx');
    $token=$info['token'];
    session ( 'token', $token );
    return $token;
}
// 获取access_token，自动带缓存功能
function get_access_token($token = '') {
    empty ($token) && $token = get_token();
    $model = Db::name("access_token");
    $map['token'] = $token;
    $info = $model->where($map)->find();
    if(!$info)
    {
        $newaccess_token = getNowAccesstoken($token);
    }
    else
    {
        $nowtime = time();//现在时间
        $time = $nowtime - $info['lasttime'];
        $newaccess_token = $info['access_token'];
        if($time >= 1800){
            $newaccess_token = getNowAccesstoken($token);
            if($newaccess_token == 0){//重新再 调用一次
                $newaccess_token = getNowAccesstoken($token);
            }
        }
    }

    return $newaccess_token;
}
function getNowAccesstoken($token = ''){
    $nowtime = time();//现在时间
    empty ( $token ) && $token = get_token ();
    $info = get_token_appinfo ($token);
    if (empty ($info ['appid'] ) || empty ($info['secret'])) {
        return 0;
    }
    $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' . $info ['appid'] . '&secret=' . $info ['secret'];
    $ch1 = curl_init ();
    $timeout = 5;
    curl_setopt ( $ch1, CURLOPT_URL, $url );
    curl_setopt ( $ch1, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt ( $ch1, CURLOPT_CONNECTTIMEOUT, $timeout );
    curl_setopt ( $ch1, CURLOPT_SSL_VERIFYPEER, false );
    curl_setopt ( $ch1, CURLOPT_SSL_VERIFYHOST, false );
    $accesstxt = curl_exec ( $ch1 );
    curl_close ( $ch1 );
    $tempArr = json_decode ($accesstxt, true);
    // p($tempArr);
    if (!isset($tempArr['errmsg'])) {
        $model = Db::name("access_token");
        $map['token'] = $token;
        //保存新access_token到数据库，更新最后时间
        $data = array(
            'access_token'=>$tempArr ['access_token'],
            'lasttime'=>$nowtime
        );
        $info=$model->where($map)->find();
        if($info)
        {
            $model->where($map)->update($data);
        }
        else
        {
            $data['token'] = $token;
            $model->where($map)->insert($data);
        }
        return $tempArr ['access_token'];
    }else{
        return 0;
    }
}
// 获取jsapi_ticket，判断是不过期
function getJsapiTicket($token = '') {
    empty ($token) && $token = get_token();
    $model = Db::name("jsapi_ticket");
    $map['token'] = $token;
    $info = $model->where($map)->find();
    if(!$info)
    {
        $new_jsapi_ticket = getNowJsapiTicket($token);
    }
    else
    {
        $nowtime = time();//现在时间
        $time = $nowtime - $info['lasttime'];
        $new_jsapi_ticket = $info['ticket'];
        if($time>=1800){
            $new_jsapi_ticket = getNowJsapiTicket($token);
            if($new_jsapi_ticket == 0){//重新再 调用一次
                $new_jsapi_ticket = getNowJsapiTicket($token);
            }
        }
    }

    return $new_jsapi_ticket;
}
//获取jsapi_ticket
function getNowJsapiTicket($token='')
{
    empty ($token) && $token = get_token();
    $access_token=get_access_token();
    $url='https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' .$access_token. '&type=jsapi';
    $ch1 = curl_init ();
    $timeout = 5;
    curl_setopt ( $ch1, CURLOPT_URL, $url );
    curl_setopt ( $ch1, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt ( $ch1, CURLOPT_CONNECTTIMEOUT, $timeout );
    curl_setopt ( $ch1, CURLOPT_SSL_VERIFYPEER, FALSE );
    curl_setopt ( $ch1, CURLOPT_SSL_VERIFYHOST, false );
    $accesstxt = curl_exec ( $ch1 );
    curl_close ( $ch1 );
    $tempArr = json_decode ($accesstxt, true);
    $ext=$tempArr['errmsg'];
    if ($ext=='ok') {
        $model = Db::name("jsapi_ticket");
        $map['token'] = $token;
        $nowtime=time();
        //保存新jsapi_ticket到数据库，更新最后时间
        $data = array(
            'ticket'=>$tempArr ['ticket'],
            'lasttime'=>$nowtime
        );
        $info=$model->where($map)->find();
        if($info)
        {
            $model->where($map)->update($data);
        }
        else
        {
            $data['token'] = $token;
            $model->where($map)->insert($data);
        }
        return $tempArr['ticket'];
    }
    else
    {
        return 0;
    }
}
// 获取公众号的信息
function get_token_appinfo() {
    $info=config('Wx');
    return $info;
}
//获取signature的值 获取签名值数组
function get_signature()
{
    $url='http://'.$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
  //p($_SERVER);
    $ticket=getJsapiTicket();
    $noncestr=createNonceStr();
    $timestamp=time();
    $string='jsapi_ticket='.$ticket.'&noncestr='.$noncestr.'&timestamp='.$timestamp.'&url='.$url;
    $signature = sha1($string);
    $signPackage = array(
        "appId"     =>config('Wx.appid'),
        "nonceStr"  =>$noncestr,
        "timestamp" => $timestamp,
        "url"       => $url,
        "signature" => $signature,
        "string" => $string,
        "jsapi_ticket" => $ticket,
    );
    return  $signPackage;
}
//随机生成字符串
 function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
        $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
}
/////////////微信自定义分享模块////////////////////////





//生成随机订单
function ordersn(){
          $yCode = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
$orderSn = $yCode[intval(date('Y')) - 2011] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
return $orderSn;
}




function convertUrlQuery($query)
{
    $queryParts = explode('&', $query);
     
    $params = array();
    foreach ($queryParts as $param)
    {
        $item = explode('=', $param);
        $params[$item[0]] = $item[1];
    }
     
    return $params;
}
 
function getUrlQuery($array_query)
{
    $tmp = array();
    foreach($array_query as $k=>$param)
    {
        $tmp[] = $k.'='.$param;
    }
    $params = implode('&',$tmp);
    return $params;
}



function send_message($phone,$message){
    $url = 'http://www.smswst.com/api/httpapi.aspx?action=send&account=13877620240&password=55555&mobile='.$phone.'&content='.$message.'&sendTime=&AddSign=Y';
    // p($_POST['username']);

       $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);  
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ; // 获取数据返回    
      curl_setopt($ch, CURLOPT_BINARYTRANSFER, true) ; // 在启用 CURLOPT_RETURNTRANSFER 时候将获取数据返回    
      $r = curl_exec($ch);
      curl_close($ch); 
   //$a = getphcode($url,$_POST['username'],$sendcode);
   if($r){
    return'1';
   }else{
    return '0';
   }
}



//订单详情时间转换
function order_format($data){
    if($data['order_time']){
        $data['order_time_m']=date('m-d',$data['order_time']);
        $data['order_time_h']=date('H:i',$data['order_time']);
    }

    if($data['deliver_time']){
        $data['deliver_time_m']=date('m-d',$data['deliver_time']);
        $data['deliver_time_h']=date('H:i',$data['deliver_time']);
    }

    if($data['deal_time']){
        $data['deal_time_m']=date('m-d',$data['deal_time']);
        $data['deal_time_h']=date('H:i',$data['deal_time']);
    }

    if($data['cancel_time']){
        $data['cancel_time_m']=date('m-d',$data['cancel_time']);
        $data['cancel_time_h']=date('H:i',$data['cancel_time']);
    }

 if($data['sysdeal_time']){
        $data['sysdeal_time_m']=date('m-d',$data['sysdeal_time']);
        $data['sysdeal_time_h']=date('H:i',$data['sysdeal_time']);
    }


 if($data['over_time']){
        $data['over_time_m']=date('m-d',$data['over_time']);
        $data['over_time_h']=date('H:i',$data['over_time']);
    }




    return $data;
}




//订单详情时间转换
function product_format($data){
    if($data['order_time']){
        $data['order_time_m']=date('m-d',$data['order_time']);
        $data['order_time_h']=date('H:i',$data['order_time']);
    }

   

    if($data['deal_time']){
        $data['deal_time_m']=date('m-d',$data['deal_time']);
        $data['deal_time_h']=date('H:i',$data['deal_time']);
    }

 

 if($data['sysdeal_time']){
        $data['sysdeal_time_m']=date('m-d',$data['sysdeal_time']);
        $data['sysdeal_time_h']=date('H:i',$data['sysdeal_time']);
    }

 if($data['sysdeal_time2']){
        $data['sysdeal_time2_m']=date('m-d',$data['sysdeal_time2']);
        $data['sysdeal_time2_h']=date('H:i',$data['sysdeal_time2']);
    }

 if($data['over_time']){
        $data['over_time_m']=date('m-d',$data['over_time']);
        $data['over_time_h']=date('H:i',$data['over_time']);
    }

 if($data['restatus_time']){
        $data['restatus_time_m']=date('m-d',$data['restatus_time']);
        $data['restatus_time_h']=date('H:i',$data['restatus_time']);
    }

 


    return $data;
}





//测试短信
function  test_msg($tel,$content=''){

    $rearr = array('code'=>1,'msg'=>'','data'=>array());
    if(!$tel){
        $rearr['code']=0;
        $rearr['msg']='号码为空，发送失败';
    }
    
    $message = 'http://www.smswst.com/api/httpapi.aspx?action=send&account=aqchudao&password=ys000586.*yskj&mobile='.$tel.'&content='.$content.'&sendTime=&AddSign=Y';
    $re = file_get_contents($message);p($re);
    $obj = simplexml_load_string($re);
    $rearr['code']='1';
    $rearr['msg']='发送成功！';
   
    return $rearr;
}


function count_price($d,$uid){
    $prefix=substr($d['to'],0,2);
    $price=DB::name('my_message')->where("uid=".$uid." and status=1 and (prefix=".$prefix." or countryCode=".$prefix.")")->order('networkName,platform')->find();
    if($price){
        return $price['sellprice'];
    }else{
        return 0;
    }
}





function msg_param($d){
    $data=[];
    switch ($d['name']) {
        case 'nexmo':
        $data=[
            'api_key'=>$d['key'],
            'api_secret'=>$d['secret'],
            'to'=>$d['to'],
            'from'=>$d['name'],
            'text'=>$d['sender'].'-'.$d['text']
        ];
            break;
            
        case 'paasoo':
        $data=[
            'key'=>$d['key'],
            'secret'=>$d['secret'],
            'to'=>$d['to'],
            'from'=>$d['name'],
            'text'=>$d['sender'].'-'.str_replace(' ', ',', $d['text'])
        ];
            break;
             
        case 'yitongdao1':
        $data=[
            'action'=>'send',
            'userid'=>2340,
            'account'=>$d['key'],
            'password'=>$d['secret'],
            'mobile'=>$d['to'],
            'content'=>'【'.$d['sender'].'】'.$d['text'],
            'sendtime'=>'',
            'extno'=>''
        ];


        case 'yitongdao2':
        $data=[
            'action'=>'send',
            'userid'=>2347,
            'account'=>$d['key'],
            'password'=>$d['secret'],
            'mobile'=>$d['to'],
            'content'=>'【'.$d['sender'].'】'.$d['text'],
            'sendtime'=>'',
            'extno'=>''
        ];
            break;  

        default:
            # code...
            break;
    }
    return $data;
}





function deal_return($re,$d,$user,$sellprice,$type){
   
    switch ($d['name']) {
        case 'nexmo':
        if($re['messages']){
            if(isset($re['messages'][0]['status'])){
                if(!$re['messages'][0]['status']){
                    $insertdata=[
                        'uid'=>$user['id'],
                        'messageid'=>$re['messages'][0]['message-id'],
                        'price'=>$sellprice,
                        'to'=>$re['messages'][0]['to'],
                        'content'=>$d['text'],
                        'send_time'=>time(),
                        'create_time'=>time(),
                        'type'=>$type
                    ];
                    DB::name('msg_record')->insert($insertdata);

                    //扣用户的钱
                    DB::name('user')->where('id='.$user['id'])->setDec('balance',$sellprice);
                return $re['messages'][0]['to'];
                 }
            }
        }
            break;
            
        case 'paasoo':
            if(!$re['status']){
                $insertdata=[
                    'uid'=>$user['id'],
                    'messageid'=>$re['messageid'],
                    'price'=>$sellprice,
                    'to'=>$d['to'],
                    'content'=>$d['text'],
                    'send_time'=>time(),
                    'create_time'=>time(),
                    'type'=>$type
                ];
                DB::name('msg_record')->insert($insertdata);

                //扣用户的钱
                DB::name('user')->where('id='.$user['id'])->setDec('balance',$sellprice);
                return $re['messageid'];
            }
            break;
            
        case 'yitongdao1':
            if($re['returnstatus']=='Success'){
                $insertdata=[
                    'uid'=>$user['id'],
                    'messageid'=>$re['taskID'],
                    'price'=>$sellprice,
                    'to'=>$d['to'],
                    'content'=>$d['text'],
                    'send_time'=>time(),
                    'create_time'=>time(),
                    'type'=>$type
                ];
                DB::name('msg_record')->insert($insertdata);

                //扣用户的钱
                DB::name('user')->where('id='.$user['id'])->setDec('balance',$sellprice);
                return $re['taskID'];
            }
            break;     

           case 'yitongdao2':
            if($re['returnstatus']=='Success'){
                $insertdata=[
                    'uid'=>$user['id'],
                    'messageid'=>$re['taskID'],
                    'price'=>$sellprice,
                    'to'=>$d['to'],
                    'content'=>$d['text'],
                    'send_time'=>time(),
                    'create_time'=>time(),
                    'type'=>$type
                ];
                DB::name('msg_record')->insert($insertdata);

                //扣用户的钱
                DB::name('user')->where('id='.$user['id'])->setDec('balance',$sellprice);
                return $re['taskID'];
            }

            break;

           case 'infobip':
            if($re['messages'][0]['messageId']){
                $insertdata=[
                    'uid'=>$user['id'],
                    'messageid'=>$re['messages'][0]['messageId'],
                    'price'=>$sellprice,
                    'to'=>$d['to'],
                    'content'=>$d['text'],
                    'send_time'=>time(),
                    'create_time'=>time(),
                    'type'=>$type
                ];
                DB::name('msg_record')->insert($insertdata);

                //扣用户的钱
                DB::name('user')->where('id='.$user['id'])->setDec('balance',$sellprice);
                return $re['messages'][0]['messageId'];
            }

            break;      
        default:
            # code...
            break;
    }
    return 0;
}





function format_get($data){
    end($data);
    $key_last = key($data);
    $str='';
    foreach ($data as $key => $value) {
        if($key=='text'){
            $str.=$key.'='.urlencode($value);
        }else{
            $str.=$key.'='.$value;
        }
        if($key!=$key_last){
            $str.='&';
        }
    }

    return $str;
}


// function cost_sql($cost){
//     DB::name('user')->where(['id'=>])
// }

function xmlToArray($xml){ 
 
     //禁止引用外部xml实体 
     
    libxml_disable_entity_loader(true); 
     
    $xmlstring = simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA); 
     
    $val = json_decode(json_encode($xmlstring),true); 
     
    return $val; 
 
} 



//导出excel方法
function getExcel_order($fileName, $headArr, $data)
    {
        ob_end_clean();//清除缓冲区,避免乱码
        //导入PHPExcel类库，因为PHPExcel没有用命名空间，只能inport导入
        vendor("PHPExcel.PHPExcel");
        vendor("PHPExcel.PHPExcel.IOFactory");
        // $date = date("Ymd", time());
        $fileName .= ".xls";

        //创建PHPExcel对象，注意，不能少了\
        $objPHPExcel = new \PHPExcel();
        $objProps = $objPHPExcel->getProperties();//dump($objProps);exit;
        //设置表头
        $key = 0;
        //print_r($headArr);exit;
        foreach ($headArr as $v) {
            $colum = \PHPExcel_Cell::stringFromColumnIndex($key); // 从o开始
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($colum . '1', $v);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($colum . '1', $v);
            $key += 1;
        }

        $column = 2;
        $objActSheet = $objPHPExcel->getActiveSheet();
        //合并单元格
        //$objPHPExcel->getActiveSheet()->mergeCells('A18:E22');
        //设置单元格的宽度
        $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(16);
        $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(16);
        $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(16);
        $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(16);
        $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(16);
        $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(30);
        //    $objPHPExcel->getActiveSheet()->getColumnDimension('k')->setWidth(15);
//              $objActSheet ->getStyle('C')->getAlignment()->setShrinkToFit(true);//字体变小以适应宽
        $objActSheet->getStyle('F')->getAlignment()->setWrapText(true);//自动换行
        /*$objActSheet ->getStyle('G')->getAlignment()->setWrapText(true);//自动换行
        $objActSheet ->getStyle('H')->getAlignment()->setWrapText(true);//自动换行
        $objActSheet ->getStyle('I')->getAlignment()->setWrapText(true);//自动换行
        $objActSheet ->getStyle('J')->getAlignment()->setWrapText(true);//自动换行
        $objActSheet ->getStyle('K')->getAlignment()->setWrapText(true);//自动换行*/
        foreach ($data as $key => $rows) { //行写入
            $span = 0;
            foreach ($rows as $keyName => $value) {// 列写入
                $j = \PHPExcel_Cell::stringFromColumnIndex($span);
                $objActSheet->setCellValue($j . $column, $value);
                $span++;
            }
            $column++;
        }

        $fileName = iconv("utf-8", "gb2312", $fileName);
        //重命名表
        //$objPHPExcel->getActiveSheet()->setTitle('test');
        //设置活动单指数到第一个表,所以Excel打开这是第一个表
        $objPHPExcel->setActiveSheetIndex(0);
        header('Content-Type: application/vnd.ms-excel');
        header("Content-Disposition: attachment;filename=\"$fileName\"");
        header('Cache-Control: max-age=0');

        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save('php://output'); //文件通过浏览器下载
        exit;
    }


//infobip平台方法
function do_infobip($d){
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "http://api.infobip.com/sms/1/text/single",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => "{ \"from\":\"Hxdsms\", \"to\":\"".$d['to']."\", \"text\":\"".$d['text']."\" }",
      CURLOPT_HTTPHEADER => array(
        "accept: application/json",
        "authorization: Basic eXVhbnNpZGE6Q2QxMjM0NTY=",
        "content-type: application/json"
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);
    $jsoninfo = json_decode($response, true);

    if ($err) {
      return $err;
    } else {
      return $jsoninfo;
    }
}