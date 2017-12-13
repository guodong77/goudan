<?php
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2017 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: Powerless < wzxaini9@gmail.com>
// +----------------------------------------------------------------------

namespace app\user\controller;

use cmf\controller\AdminBaseController;
use think\Db;
use think\Validate;
use app\user\model\UserModel;
/**
 * Class AdminManagerController
 * @package app\user\controller
 *
 * @adminMenuRoot(
 *     'name'   =>'用户管理',
 *     'action' =>'default',
 *     'parent' =>'',
 *     'display'=> true,
 *     'order'  => 10,
 *     'icon'   =>'group',
 *     'remark' =>'用户管理'
 * )
 *
 * @adminMenuRoot(
 *     'name'   =>'用户组',
 *     'action' =>'default1',
 *     'parent' =>'user/AdminIndex/default',
 *     'display'=> true,
 *     'order'  => 10000,
 *     'icon'   =>'',
 *     'remark' =>'用户组'
 * )
 */
class AdminManagerController extends AdminBaseController
{

    public function index()
    {

        $where   = [];
        $request = input('request.');

        if (!empty($request['companyname'])) {
            $where['companyname'] = ['like','%'.$request['companyname'].'%'];
        }
        $msgQuery = Db::name('apply_log');

        $list = $msgQuery->where($where)->order("create_time DESC")->paginate(10);
        $temp=array();
        foreach ($list as $key => $value) {
            $value['create_time']=date('Y-m-d H:i:s',$value['create_time']);
            $temp[]=$value;
        }
        // 获取分页显示
        $page = $list->render();
        $this->assign('list', $temp);
        $this->assign('page', $page);
        // 渲染模板输出
        return $this->fetch();
    }

    public function del()
    {
        if(!cmf_is_user_login()){
            $this->error("未登录");
        }

        $re=DB::name('email')->where(['id'=>input('id')])->delete();
        if($re){
            $this->success("删除成功");
        }else{
            $this->error("未登录");
        }
    }
  




    public function statusSwitch(){
        $data['status']=input('status')?0:1;
        $re=DB::name('apply_log')->where(['id'=>input('id')])->update($data);
        if($re){
            $this->success("操作成功", "/user/admin_manager/index");
        }else{
            $this->error('操作失败');
        }
    }
}
