<?php
/**
 * Created by PhpStorm.
 * User: 李明团
 * Date: 2017/11/6
 * Time: 15:40
 */

namespace app\portal\controller;


use cmf\controller\HomeBaseController;

class MoreController extends HomeBaseController
{
     public function index(){
         return $this->fetch(':more');
     }
}