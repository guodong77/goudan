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

class NotificationController extends HomeBaseController
{
    public function index(){
    	if(!cmf_get_current_user()){
    		$this->error("未登录","portal/index");
    	}
    	$userinfo=DB::name('user')->where(['id'=>cmf_get_current_user()['id']])->find();

    	$notification=DB::name('user_notification')->where(['uid'=>cmf_get_current_user()['id']])->find();

		$this->assign('notification',$notification); 
		$this->assign('emailstatus',$notification['emailstatus']);
     	$this->assign('userinfo',$userinfo); 
    	$this->assign('username',cmf_get_current_user()['user_login']);
        return $this->fetch(':notifications');
    }


    //编辑
    public function editPost()
    {
		$_POST['emailstatus']=isset($_POST['emailstatus'])?$_POST['emailstatus']:0;
		$_POST['smsstatus']=isset($_POST['smsstatus'])?$_POST['smsstatus']:0;
    	if(DB::name('user_notification')->where(['id'=>cmf_get_current_user()['id']])->find()){
    		update_one('user_notification',['id'=>cmf_get_current_user()['id']],$_POST);
    	}else{
    		$_POST['uid']=cmf_get_current_user()['id'];
    		insert_data('user_notification',$_POST);
    	}
        

        $this->success(lang("EDIT_SUCCESS"), url("index"));
    }  
}