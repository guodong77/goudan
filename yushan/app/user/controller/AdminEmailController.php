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
 * Class AdminEmailController
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
class AdminEmailController extends AdminBaseController
{

    /**
     * 后台本站用户列表
     * @adminMenu(
     *     'name'   => '本站用户',
     *     'parent' => 'default1',
     *     'display'=> true,
     *     'hasView'=> true,
     *     'order'  => 10000,
     *     'icon'   => '',
     *     'remark' => '本站用户',
     *     'param'  => ''
     * )
     */
    public function index()
    {

        $where   = [];
        $request = input('request.');

        if (!empty($request['name'])) {
            $where['name'] = $request['name'];
        }
        $msgQuery = Db::name('email');

        $list = $msgQuery->where($where)->order("id")->paginate(10);
        foreach ($list as $key => &$value) {
            // $value['create_time']=date('Y-m-d',$value['create_time']);
            $value['createtime']=date('Y-m-d',$value['create_time']);
        }

        // 获取分页显示
        $page = $list->render();
        $this->assign('list', $list);
        $this->assign('page', $page);
        // 渲染模板输出
        return $this->fetch();
    }

    public function add()
    {
        return $this->fetch();
    }


    public function addmsg()
    {
        if ($this->request->isPost()) {
            $_POST['create_time']=time();
            $result             = DB::name('email')->insertGetId($_POST);
            if ($result !== false) {
                $this->success("添加成功！", url("index"));
            } else {
                $this->error("添加失败！");
            }
        }
        return $this->fetch();
    }    

}
