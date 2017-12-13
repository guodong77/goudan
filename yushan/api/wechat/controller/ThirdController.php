<?php 
namespace api\wechat\controller;

use think\Controller;
use Com\Wechat;
use Com\WechatAuth;

class ThirdController extends Controller{
  
//通过com 获取pre_auth_code；
  public function getpreautcode(){
  		$data = M('weopen')->where(array('t_id'=>1))->find();
  		$ticket = $data['component_verify_ticket']; 
  		$component_appid = 'wx1c6d65669c69987b';
  		$component_appsecret = 'f068e59fbfe23187d87fcdd7b70bac09';

  		$url = 'https://api.weixin.qq.com/cgi-bin/component/api_component_token';
  		

  }


}
