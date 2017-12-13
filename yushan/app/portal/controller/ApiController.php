<?php
/**
 * Created by PhpStorm.
 * User: 李明团
 * Date: 2017/11/6
 * Time: 14:40
 */

namespace app\portal\controller;


use cmf\controller\HomeBaseController;

class ApiController extends HomeBaseController
{
    public function index(){
    	$this->assign('username',cmf_get_current_user()['user_login']);
        return $this->fetch(':api');
    }
}