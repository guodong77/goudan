<?php
/***
***公共验证控制器CommonController
***
***/
namespace api\wechat\controller;
use think\Controller;

class CommonController extends Controller {
	
	// _initialize自动运行方法，在每个方法前，系统会首先运动这个方法
	// public function _initialize() {
	// 	    $openid = session('openid'); 		     
 //       if($openid){			
	// 		$this->ajaxReturn(array('id'=>$openid));
	// 	   }else{
	// 	   	//如果未登录
	// 	   	$this->ajaxReturn(array('code'=>-1,'msg'=>'未登录'));
	// 	   }
	// }
	public function _initialize() { 
		$ln = lornot();
		if($ln['reply']==0){
			$arr = array("code"=>-1,'msg'=>'您未登录，请重新登录；');
			return json($arr);
		}    

	}
}


?>