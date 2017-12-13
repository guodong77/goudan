<?php
/**
 * Created by PhpStorm.
 * User: 李明团
 * Date: 2017/11/9
 * Time: 11:29
 */

namespace app\portal\controller;


use cmf\controller\HomeBaseController;
use think\db;

class ApplicationController extends HomeBaseController
{
    public function index(){
    	$user=DB::name('user')->where(['id'=>cmf_get_current_user()['id']])->find();

    	$store=DB::name('api_store')->where('status!=0')->find();
    
   		$this->assign('user',$user);
   		$this->assign('apiname',$store['name']);
        return $this->fetch(':application');
    }
}