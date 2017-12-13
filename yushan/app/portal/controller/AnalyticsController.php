<?php
/**
 * Created by PhpStorm.
 * User: 李明团
 * Date: 2017/11/9
 * Time: 16:34
 */

namespace app\portal\controller;


use cmf\controller\HomeBaseController;

class AnalyticsController extends HomeBaseController
{
    public function index(){
        return $this->fetch(':analytics');
    }
}