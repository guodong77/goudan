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

use cmf\controller\HomeBaseController;
use think\Db;

class IndexController extends HomeBaseController
{

    /**
     * 前台用户首页(公开)
     */
    public function index()
    {
        
        $id   = $this->request->param("id", 0, "intval");
        $userQuery = Db::name("User");
        $user = $userQuery->where('id',$id)->find();
        if (empty($user)) {
            session('user',null);
            $this->error("查无此人！");
        }
        $this->assign($user);
        return $this->fetch(":index");  

    }

    /**
     * 前台ajax 判断用户登录状态接口
     */
    function isLogin()
    {
        if (cmf_is_user_login()) {
            $this->success("用户已登录",null,['user'=>cmf_get_current_user()]);
        } else {
            $this->error("此用户未登录!");
        }
    }

    /**
     * 退出登录
    */
    public function logout()
    {
        session("user", null);//只有前台用户退出
        return redirect($this->request->root() . "/");
    }




    /**
     * 使用api发送短信
    */   
    public function send_msg()
    {

        if(!input('to')||!input('text')||!input('username')||!input('password')){
            return rejson(0,'参数设置不完整');
        }
        //认证账号密码
        $user=DB::name('user');

        $result = $user->where('user_login', input('username'))->find();
        if (!empty($result)) {
            $comparePasswordResult = cmf_compare_password(input('password'), $result['user_pass']);
            if ($comparePasswordResult) {
                //拉黑判断。
                if($result['user_status']==0){
                    $re=[
                        'status'=>0,
                        'msg'=>'该用户禁止访问',
                    ];
                    return json($re);//被拉黑
                }
                // return 0;//成功
            }else{
                $re=[
                    'status'=>0,
                    'msg'=>'账号认证失败',
                ];
                return json($re);//登陆密码错误
            }

        }

        $d=DB::name('api_store')->where(['status'=>1])->order('id')->find();

        $d['to']=input('to');
        $d['text']=input('text');
        $d['sender']=$result['defaultSender'];



        $sellprice=count_price($d,$result['id']);
        //infobip平台
        if($d['name']=='infobip'){
            $re=do_infobip($d);
            if($re['messages'][0]['messageId']){
                if($msgid=deal_return($re,$d,$result,$sellprice,1)){
                    return json(['code'=>1,'msg'=>'发送成功','messageid'=>$msgid]);
                }else{
                    return json(['code'=>0,'msg'=>'发送失败']);
                }
            }else{
                return $re;
            }
        }

        $data=msg_param($d);


        if(!$data){
            return json(['code'=>0,'msg'=>'参数设置错误']);
        }



        if($_GET){
            // p(http_curl("https://api2.paasoo.com/json?key=iqcihzbh&secret=kx1PXBcJ&to=8613265931153&from=paasoo&text=11yushan11test"));

            $get_data=format_get($data);
            $str=$d['url']."?".$get_data;
        $re=http_curl($str);
                if($re){
                    //处理返回信息
                    if($msgid=deal_return($re,$d,$result,$sellprice,1)){
                        return json(['code'=>1,'msg'=>'发送成功','messageid'=>$msgid]);
                    }
                }
        }elseif($_POST){
            $re=http_curl($d['url'],json_encode($data));
                if($re){
                    //处理返回信息
                    if($msgid=deal_return($re,$d,$result,$sellprice,1)){
                        return json(['code'=>1,'msg'=>'发送成功','messageid'=>$msgid]);
                    }
                }
        }else{
            $re=['code'=>0,'msg'=>'参数设置错误'];
        }

        return json($re);

    }




    /**
     * 试用发送短信
    */  
    public function try_send_msg()
    {
        if(!cmf_get_current_user()){
            return json(['code'=>0,'请登录']);
        }

        $user=DB::name('user')->where(['id'=>cmf_get_current_user()['id']])->find();

        $d=DB::name('api_store')->where(['status'=>1])->order('id')->find();
        $d['to']=input('to');
        $d['text']=input('text');
        $d['sender']=input('sender');


        $data=msg_param($d);
        if(!$data){
            return json(['code'=>0,'msg'=>'参数设置错误']);
        }
        $get_data=format_get($data);
        $re=http_curl($d['url']."?".$get_data);
        if($re){
            //处理返回信息
            deal_return($re,$d,$user,0,0);
        }
        if($re){
            return json($re);            
        }else{
            return rejson(0,'发送失败');
        }


    }




    /**
     * 获取试用发送短信记录
    */ 
    public function get_try_msgRecord(){
        //  if(!cmf_get_current_user()){
        //     return json(['code'=>0,'请登录']);
        // }       
        $curPage = input('curPage')?input('curPage'):1;
        $listnum = input('listnum')?input('listnum'):10;  


        $where=[
            'uid'=>cmf_get_current_user()['id'],
            'type'=>0
        ];

        $data = get_datalist_page('msg_record',$where,$curPage,$listnum,'create_time desc');

        if($data['datalist']){
            return rejson(1,'查询成功',$data);
        }else{
            return rejson(0,'无数据');
        }

    }


    /**
     * 获取api短信记录
    */ 
    public function get_msgRecord(){
        //  if(!cmf_get_current_user()){
        //     return json(['code'=>0,'请登录']);
        // }       
        $curPage = input('curPage')?input('curPage'):1;
        $listnum = input('listnum')?input('listnum'):10;  

        if(!input('starttime')||!input('endtime')){
            return rejson(0,'时间参数设置不完整');
        }

        $where=[
            'uid'=>cmf_get_current_user()['id'],
            'type'=>1
        ];

        $where['create_time']=['between',[strtotime(input('starttime')),strtotime(input('endtime'))]];

        $data = get_datalist_page('msg_record',$where,$curPage,$listnum,'create_time desc');

        if($data['datalist']){
            return rejson(1,'查询成功',$data);
        }else{
            return rejson(0,'无数据');
        }

    }




    //批量修改数据
    public function update_price(){
        $ids=input('id');
        $operator=input('operator');
        $num=input('num');

        $count=0;
        $temp=array();
        $data=DB::name('my_message')->where(['id'=>['in',$ids]])->select();
        foreach ($data as $key => $value) {
         if($operator=='*'){
            $value['sellprice']=$value['price']*$num;               
         }else{
            $value['sellprice']=$value['price']+$num;
         }
         $re=update_one('my_message',['id'=>$value['id']],$value);
         if($re)$count++;
        }

        if($re){
            return rejson(1,'成功更新'.$count.'条信息');
        }else{
            return rejson(0,'更新失败');
        }

    }



    public function test(){
    }
}
