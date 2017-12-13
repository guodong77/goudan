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
use app\portal\service\PostService;
use think\DB;

class IndexController extends HomeBaseController
{
    public function index()
    {
 
    	$banner = Db::name('slide_item')->where('slide_id','=',1)->where('status','=',1)->select();
    	$this->assign('banner', $banner);
    	$portalnav = Db::name('portal_category')->where('delete_time','=',0)->where('parent_id','=',33)->select();
    	foreach ($portalnav as $key => &$value) {
    		$portalzinav = Db::name('portal_category_post')->where('category_id','=',$value['id'])->select();
			foreach ($portalzinav as $k => &$val) {
                $postService = new PostService();
                $articleId  = $val['post_id'];
                $categoryId = $this->request->param('cid', 0, 'intval');
                $abc = $postService->publishedArticle($articleId, $categoryId);
    			$portalfenxiang = Db::name('portal_post')->where('id','=',$val['post_id'])->find();
                $portalfenxiang['post_content'] = $abc['post_content'];
    			$portalfenxiang['more'] = json_decode($portalfenxiang['more']);
    			if(isset($portalfenxiang['more']->photos)){
                    $portalfenxiang['photosimg'] = 2;
	    			$nphoto = $portalfenxiang['more']->photos;
	    			$portalfenxiang['photosurl'] = $nphoto[0]->url;
	    			$portalfenxiang['photosname'] = $nphoto[0]->name;
                    if(strpos($portalfenxiang['photosurl'],"portal")>-1){
                        $portalfenxiang['photosimg'] = 1;
                    }
    			}else{
                    $portalfenxiang['photosimg'] = '';
                }
    			$portalzinav[$k] = array_merge($portalzinav[$k],$portalfenxiang);
    		}
    		$value['chanpin'] = $portalzinav;
    		$portalnav[$key] = $value;
    	}
    	//p($portalnav);
    	$this->assign('portalnav', $portalnav);
        $this->assign(cmf_get_option('site_info'));
        $sid = cookie("PHPSESSID");
        $abc = session($sid);
        $reply = $abc==false?0:1;
        $this->assign('reply', $reply);
        return $this->fetch(':index');
    }

public function page()
    {
        $data = Db::name('portal_category_post')->where('category_id','=',41)->paginate(6);
        $page = $data->render();
        $temp=array();
        foreach ($data as $k => &$val) {
            $postService = new PostService();
            $articleId  = $val['post_id'];
            $categoryId = $this->request->param('cid', 0, 'intval');
            $abc = $postService->publishedArticle($articleId, $categoryId);
            $datazifen = Db::name('portal_post')->where('id','=',$val['post_id'])->find();
            $datazifen['post_content'] = $abc['post_content'];
            $temp[] = array_merge($val,$datazifen);
            $temp[$k]['create_time'] = date("Y-m-d",$datazifen['create_time']);
        }
        $this->assign('pagelist',$temp);
        $this->assign('page',$page);
        $this->assign(cmf_get_option('site_info'));
        $sid = cookie("PHPSESSID");
        $abc = session($sid);
        $reply = $abc==false?0:1;
        $this->assign('reply', $reply);
        return $this->fetch(':page');
    }

   public function bcd($zongshu,$listnum,$dangqian,$zuihou,$shuju) {
      $this->total = $zongshu;
      $this->per_page = $listnum;
      $this->current_page = $dangqian;
      $this->last_page = $zuihou;
      $this->data = $shuju;
    }
public function details()
    {
    	$_get = input('get.');
        $postService = new PostService();
        $articleId  = $_get['id'];
        $categoryId = $this->request->param('cid', 0, 'intval');
        $details = $postService->publishedArticle($articleId, $categoryId);
        $this->assign('details', $details);
        return $this->fetch(':details');
    }

public function update()
    {
    	$portalnav = Db::name('portal_category')->where('delete_time','=',0)->where('name','=','产品更新')->find();
            $portalzinav = Db::name('portal_category_post')->where('category_id','=',$portalnav['id'])->select();
            foreach ($portalzinav as $k => &$val) {
            	$postService = new PostService();
		        $articleId  = $val['post_id'];
		        $categoryId = $this->request->param('cid', 0, 'intval');
		        $abc = $postService->publishedArticle($articleId, $categoryId);
                $portalfenxiang = Db::name('portal_post')->where('id','=',$val['post_id'])->find();
                $portalfenxiang['post_content'] = $abc['post_content'];
                $portalzinav[$k] = array_merge($portalzinav[$k],$portalfenxiang);
            }
        $temp=array();
        foreach ($portalzinav as $key => $value) {
            if($value['delete_time']==0){
                $temp[]=$value;
            }
        }
        $sort=array('direction'=>'SORT_ASC','field'=>'create_time');
        $arr=array();
        foreach ($temp as $uniqid => $value) {
            foreach ($value as $key => $val) {
                $arr[$key][$uniqid]=$val;
            }
        }
        array_multisort($arr[$sort['field']],SORT_DESC,$temp);
        $a = 0;
        foreach ($temp as $key => $value) {
        	$createtime = $value['create_time'];
        	$value['create_time'] = $value['create_time']==0?'':date("Y-m-d", $value['create_time']);
    		$shuzu[$a]['gengxin'][]= $value;
			$pre = date("Y",$createtime);
			$shuzu[$a]['year'] = $pre;
    		if($key!=count($temp)-1){//如果当前循环的值不是$temp数组最后一个值
	    		$lat = date("Y",$temp[$key+1]['create_time']);
	        	if($pre!=$lat){//比较两者的年份，如果不相等，下一个数组开始
	        		$a += 1;
	        	}
    		}
        }
    	$this->assign('shuzu', $shuzu);
        $this->assign(cmf_get_option('site_info'));
        $sid = cookie("PHPSESSID");
        $abc = session($sid);
        $reply = $abc==false?0:1;
        $this->assign('reply', $reply);
        return $this->fetch(':update');
    }
    public function about()
    {
        $postService = new PostService();
        $articleId  = 28;
        $categoryId = $this->request->param('cid', 0, 'intval');
        $aboutus = $postService->publishedArticle($articleId, $categoryId);
        $this->assign('aboutus', $aboutus);
        $this->assign(cmf_get_option('site_info'));
        $sid = cookie("PHPSESSID");
        $abc = session($sid);
        $reply = $abc==false?0:1;
        $this->assign('reply', $reply);
        return $this->fetch(':about');
    }
    public function send_email2(){
    	try {
		    $mail = new \PHPMailer(true);
		    $mail->IsSMTP();
		    $mail->CharSet='UTF-8'; //设置邮件的字符编码，这很重要，不然中文乱码
		    $mail->SMTPAuth = true; //开启认证
		    $mail->Port = 25;
		    $mail->Host = config('MAIL_SMTP');
		    $mail->Username = config('MAIL_LOGINNAME');
		    $mail->Password = config('MAIL_PASSWORD');
		    // $mail->IsSendmail(); //windows下开启；linux下如果没有sendmail组件就注释掉，否则出现“Could not execute: /usr/sbin/sendmail”的错误提示
		    // $mail->AddReplyTo("472323087@qq.com","dee");//回复地址
		    // $mail->From = "472323087@qq.com";
		    // $mail->FromName = "472323087@qq.com";
		    $to = "402940206@qq.com";
		    $mail->AddAddress($to);
		    $mail->Subject = "phpmailer测试标题";
		    $mail->Body = "<h1>phpmail演示</h1>这是emperor对phpmailer的测试内容";
		    $mail->AltBody = "To view the message, please use an HTML compatible email viewer!"; //当邮件不支持html时备用显示，可以省略
		    $mail->WordWrap = 80; // 设置每行字符串的    长度
		    //$mail->AddAttachment("d:/test.jpg"); //可以添加附件
		    $mail->IsHTML(true);
		    $mail->Send();
		    echo '邮件已发送';
		} catch (phpmailerException $e) {
		    echo "邮件发送失败：".$e->errorMessage();
		}
    }







    public function send_email(){

    		$d=DB::name('apply_log')->where(['companyemail'=>input('companyemail')])->find();
    		if($d){
    			return $this->error("此邮箱已提交过申请，请勿重复提交");
    		}
   //  		$mail = new \PHPMailer;
			// //$mail->SMTPDebug = 3;                               // Enable verbose debug output
			 
			// $mail->isSMTP();                                      // Set mailer to use SMTP
			// $mail->Host = config('MAIL_SMTP');  // Specify main and backup SMTP servers
			// $mail->SMTPAuth = true;                               // Enable SMTP authentication
			// $mail->Username = config('MAIL_LOGINNAME');                 // SMTP username
			// $mail->Password = config('MAIL_PASSWORD');                           // SMTP password
			// $mail->SMTPSecure = 'SSL';                            // Enable TLS encryption, `ssl` also accepted
		 //    $mail->CharSet='UTF-8';
			// $mail->Port = 465;                                    // TCP port to connect to
			 
			// $mail->setFrom(config('MAIL_LOGINNAME'), 'Mailer');
			// // $mail->addAddress('cjhyushan@126.com', 'Joe User');     // Add a recipient
			// $mail->addAddress(input('email'));               // Name is optional
			// // $mail->addReplyTo('cjhyushan@126.com', 'Information');
			 
			// // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
			// // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
			// $mail->isHTML(true);                                  // Set email format to HTML
			 
			// $mail->Subject = '测试';

			$companyname=input('companyname')?input('companyname'):'';
			$companyemail=input('companyemail')?input('companyemail'):'';
			$telephone=input('telephone')?input('telephone'):'';

			// $mail->Body    = $companyname.'---'.$companyemail.'---'.$telephone.'---'.'申请用户';
			$body=$companyname.'---'.$companyemail.'---'.$telephone.'---'.'申请用户';
			//  // p($mail);
			//  $mail->dubug=true;
			$re=cmf_send_email(input('email'),'用户申请',$body);
			if($re['error']) {
			    return json(['code'=>0,'msg'=>'邮件发送失败','data'=>$re['message']]);
			} else {
				$data=[
					'to_email'=>input('email'),
					'companyemail'=>input('companyemail'),
					'phone'=>(int)input('telephone'),
					'companyname'=>input('companyname'),
					'create_time'=>time()
				];
				DB::name('apply_log')->insert($data);
			   return json(['code'=>1,'msg'=>'邮件发送成功']);
			}
		}


}
