<?php
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2017 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 老猫 <thinkcmf@126.com>
// +----------------------------------------------------------------------
namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use think\DB;

class SettingController extends HomeBaseController
{
    public function index()
    {
    	if(!cmf_get_current_user()){
    		$this->error("未登录","portal/index");
    	}
    	$userinfo=DB::name('user')->where(['id'=>cmf_get_current_user()['id']])->find();
     	$this->assign('userinfo',$userinfo);   	
    	$this->assign('username',cmf_get_current_user()['user_nickname']);
        return $this->fetch(':accountsettings-1');
    }

    public function contact()
    {
    	if(!cmf_get_current_user()){
    		$this->error("未登录","portal/index");
    	}
    	$userinfo=DB::name('user')->where(['id'=>cmf_get_current_user()['id']])->find();
     	$this->assign('userinfo',$userinfo);    	
    	$this->assign('username',cmf_get_current_user()['user_nickname']);
        return $this->fetch(':accountsettings-12');
    }

  

    //编辑
    public function editPost()
    {

        $data['defaultSender']=input('sender');
        update_one('user',['id'=>cmf_get_current_user()['id']],$data);

        $this->success(lang("EDIT_SUCCESS"), url("index"));
    }  

    //编辑
    public function editPost2()
    {


        update_one('user',['id'=>cmf_get_current_user()['id']],$_POST);

        $this->success(lang("EDIT_SUCCESS"), url("contact"));
    }  
}
