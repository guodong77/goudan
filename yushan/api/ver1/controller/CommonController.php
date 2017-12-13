<?php
/***
***公共验证控制器CommonController
***
***/
namespace api\ver1\controller;
use think\Controller;

class CommonController extends Controller {
	
	//_initialize自动运行方法，在每个方法前，系统会首先运动这个方法
	public function _initialize() {

		  $ln = lornot();
		if($ln['reply']==0){
			$arr = array("code"=>-1,'msg'=>'您未登录，请重新登录；');
			echo json_encode($arr);
			exit;
		}    

	}
}


?>