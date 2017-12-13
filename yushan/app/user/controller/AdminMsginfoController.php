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
 * Class AdminMsginfoController
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
class AdminMsginfoController extends AdminBaseController
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
        $sort='countryName';

        if (!empty($request['countryName'])) {
            $where['countryName'] = $request['countryName'];
        }
        if (!empty($request['platform'])) {
            $where['platform'] = $request['platform'];
        }
        if(input('sort')){
            switch (input('sort')) {
                case 'countryName':
                    $sort='countryName';
                    break;
                case 'price':
                    $sort='price';
                    break;
                case 'networkName':
                    $sort='networkName';
                    break;
                
                default:
                    # code...
                    break;
            }
        }
        $sort.=",networkName";
        $msgQuery = Db::name('message_info');
        $curPage=1;
        if(input('page'))$curPage=input('page');
        $listnum=20;
        $list = $msgQuery->where($where)->order($sort)/*->order("create_time DESC")*/->paginate($listnum);
        // 获取分页显示
        $page = $list->render();
        $this->assign('list', $list);
        $this->assign('page', $page);
        $this->assign('curPage', $curPage);
        $this->assign('listnum', $listnum);
        // 渲染模板输出
        return $this->fetch();
    }


    public function edit(){
        // p(input());
        $data=[
            'sellprice'=>input('sellprice')
        ];

        $re=DB::name('my_message')->where(['id'=>input('id')])->update($data);

        if($re){
            return rejson(1,'更新成功');
        }else{
            return rejson(0,'更新失败');
        }
    }

}
