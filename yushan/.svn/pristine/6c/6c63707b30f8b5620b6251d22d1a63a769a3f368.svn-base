<?php
/**
 * Created by PhpStorm.
 * User: 李明团
 * Date: 2017/11/6
 * Time: 14:40
 */

namespace app\portal\controller;


use cmf\controller\HomeBaseController;
use think\Db;

class AppcenterController extends HomeBaseController
{
    public function index(){
    	if(!cmf_get_current_user()){
    		$this->error("未登录","portal/index");
    	}
    	$userinfo=DB::name('user')->where(['id'=>cmf_get_current_user()['id']])->find();
     	$this->assign('userinfo',$userinfo); 
    	$this->assign('username',cmf_get_current_user()['user_login']);
        return $this->fetch(':appcenter');
    }
}