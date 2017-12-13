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
 * Class AdminIndexController
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
class AdminIndexController extends AdminBaseController
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

        if (!empty($request['uid'])) {
            $where['id'] = intval($request['uid']);
        }
        $keywordComplex = [];
        if (!empty($request['keyword'])) {
            $keyword = $request['keyword'];

            $keywordComplex['user_login|user_nickname|user_email']    = ['like', "%$keyword%"];
        }
        $usersQuery = Db::name('user');
        $curPage=1;
        if(input('page'))$curPage=input('page');
        $listnum=10;

        $list = $usersQuery->whereOr($keywordComplex)->where($where)->order("id")->paginate($listnum);
        // 获取分页显示
        $page = $list->render();
        $this->assign('list', $list);
        $this->assign('page', $page);
        $this->assign('curPage', $curPage);
        $this->assign('listnum', $listnum);
        // 渲染模板输出
        return $this->fetch();
    }

    /**
     * 本站用户拉黑
     * @adminMenu(
     *     'name'   => '本站用户拉黑',
     *     'parent' => 'index',
     *     'display'=> false,
     *     'hasView'=> false,
     *     'order'  => 10000,
     *     'icon'   => '',
     *     'remark' => '本站用户拉黑',
     *     'param'  => ''
     * )
     */
    public function ban()
    {
        $id = input('param.id', 0, 'intval');
        if ($id) {
            $result = Db::name("user")->where(["id" => $id, "user_type" => 2])->setField('user_status', 0);
            if ($result) {
                $this->success("会员拉黑成功！", "adminIndex/index");
            } else {
                $this->error('会员拉黑失败,会员不存在,或者是管理员！');
            }
        } else {
            $this->error('数据传入失败！');
        }
    }

    /**
     * 本站用户启用
     * @adminMenu(
     *     'name'   => '本站用户启用',
     *     'parent' => 'index',
     *     'display'=> false,
     *     'hasView'=> false,
     *     'order'  => 10000,
     *     'icon'   => '',
     *     'remark' => '本站用户启用',
     *     'param'  => ''
     * )
     */
    public function cancelBan()
    {
        $id = input('param.id', 0, 'intval');
        if ($id) {
            Db::name("user")->where(["id" => $id, "user_type" => 2])->setField('user_status', 1);
            $this->success("会员启用成功！", '');
        } else {
            $this->error('数据传入失败！');
        }
    }


        /**
     * 用户添加
     * @adminMenu(
     *     'name'   => '用户添加',
     *     'parent' => 'index',
     *     'display'=> false,
     *     'hasView'=> true,
     *     'order'  => 10000,
     *     'icon'   => '',
     *     'remark' => '用户添加',
     *     'param'  => ''
     * )
     */
    public function add()
    {
        return $this->fetch();
    }

    public function adduser()
    {


        if ($this->request->isPost()) {
            if(DB::name('user')->where("user_login='".$_POST['user_login']."'")->find()){
                $this->error("用户名已存在");
            }

            $rules = [
                'user_pass' => 'require|min:6|max:32',
            ];

            $validate = new Validate($rules);
            $validate->message([
                'user_pass.require' => '密码不能为空',
                'user_pass.max'     => '密码不能超过32个字符',
                'user_pass.min'     => '密码不能小于6个字符',
            ]);

            $data = $this->request->post();
            if (!$validate->check($data)) {
                $this->error($validate->getError());
            }

            $_POST['user_pass'] = cmf_password($_POST['user_pass']);
            $_POST['create_time']=time();
            $_POST['user_type']=2;
            $result             = DB::name('user')->insertGetId($_POST);
            if ($result !== false) {

                $temp=array();
                // 给用户导入价格表
                $msginfo=get_datalist('message_info');
                foreach ($msginfo as $key => $value) {
                    $value['uid']=$result;
                    $value['sellprice']=$value['price']*1.1;
                    unset($value['id']);
                    $temp[]=$value;
                }
                // p($temp);
// //                 foreach ($msginfo as $key => &$value) {
// //                     $msginfo[$key]['uid']=$result;
// //                     // $value['sellprice']=$value['price'];

// //                 }
// // p($msginfo);
                DB::name('my_message')->insertAll($temp);

                $this->success("添加成功！", url("index"));
            } else {
                $this->error("添加失败！");
            }
        }
        return $this->fetch();
    }    





    //编辑
    public function edit()
    {
        $id=input('id');
        $data=DB::name('user')->where(['id'=>$id])->find();

        $this->assign('balance',$data['balance']);
        $this->assign('id',$id);        
        return $this->fetch();
    }

  

    //编辑
    public function editPost()
    {
        if(!input('balance')){
            $this->error("余额不能为空");
        }
        $data['balance']=input('balance');
        update_one('user',['id'=>input('id')],$data);

        $this->success(lang("EDIT_SUCCESS"), url("index"));
    }  

    //编辑
    public function commonEdit()
    {
        // p(input());
        // if(!input('status')){
        //     $this->error("参数错误");
        // }
        $data['status']=input('status');
        update_one('my_message',['id'=>input('bianhao')],$data);

        $this->success(lang("EDIT_SUCCESS"), url("price?id=".input('uid')));
    } 



    public function price(){
        // p(input());
        $where   = [];
        $request = input('request.');
        $sort='countryName';

        if (!empty($request['countryName'])) {
            $where['countryName'] = $request['countryName'];
        }
        $where['uid']=input('id');
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
        $sort.=',networkName,platform';
        $msgQuery = Db::name('my_message');
// p($where);
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
        $this->assign('id',input('id'));
        // 渲染模板输出
        return $this->fetch(':admin_index/price');
    }


    public function download(){
         $where   = [];
        $request = input('request.');
        $sort='countryName';

        if (!empty($request['countryName'])) {
            $where['countryName'] = $request['countryName'];
        }
        $where['uid']=input('id');
        $userinfo=DB::name('user')->where(['id'=>input('id')])->find();
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
        $sort.=',networkName';
        $list = Db::name('my_message')->where($where)->order($sort)->select();     

        $temp=array();
        $xuhao=0;
        foreach ($list as $k => &$v) {
            $v['id']=++$xuhao;
            $v['status']=$v['status']?'启用中':'关闭中';
            unset($v['isdel']);
            unset($v['networkAliases']);
            unset($v['prefix']);
            unset($v['uid']);
            unset($v['validFrom']);
            $temp[]=$v;
        }
        $filename = $userinfo['user_login']."-info";
        $headArr = array('序号', '国家代码', '国家名称', '运营商代号', '运营商', '成本价','售价','平台名称','状态');
        getExcel_order($filename, $headArr, $temp);
    }
}
