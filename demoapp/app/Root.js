//1、引入css 自定义的js
import styles from './js/css';
import conf from './js/conf';
import fac from './js/fac';
import main from './js/main';

window.fac = fac;
window.styles = styles;

//2、引入react组件
import React, { Component, AppRegistry, AsyncStorage } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { Router, Modal, Stack, Tabs, Scene ,Actions} from 'react-native-router-flux';
window.Actions = Actions; 

import Storage from 'react-native-storage';
var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	// 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
	defaultExpires: 1000 * 3600 * 24,
	// 读写时在内存中缓存数据。默认启用。
	enableCache: true,
	// 或是写到另一个文件里，这里require引入
	sync: require('./js/sync.js')

})
global.storage = storage;

fac.setstore('userinfo',conf.userinfo);

import Buildlist from './pages/Buildlist';        //建筑圈列表
import Basklist from './pages/Basklist';          //问答列表
import Bneedlist from './pages/Bneedlist';                   //需求列表
import Baddnew from './pages/Baddnew';             //发表动态
import Baddask from './pages/Baddask';             //发表问答
import Baddneed from './pages/Baddneed';           //发表需求
import Builddetail from './pages/Builddetail';         //动态详情
import Baskdetail from './pages/Baskdetail';         //问答详情
import Comsearch from './pages/Comsearch';           //全局搜索

import Personal from './pages/Personal';          //我的首页
import Pinfo from './pages/Pinfo';          //编辑个人资料
import PEditName from './pages/PEditName';          //编辑名称
import PEditPost from './pages/PEditPost';          //编辑职务
import PEditCompany from './pages/PEditCompany';          //编辑公司
import PEditPhone from './pages/PEditPhone';          //编辑手机号码
import PEditMail from './pages/PEditMail';       //编辑邮箱
import Pnews from './pages/Pnews';            //我的动态
import Pask from './pages/Pask';          //我的问答
import Pneed from './pages/Pneed';          //我的需求
import Pcollect from './pages/Pcollect';          //我的收藏
import Pnotice from './pages/Pnotice';          //系统通知
import Puserauth from './pages/Puserauth';          //认证
import Pmyresume from './pages/Pmyresume';          //我的简历
import Pwantwork from './pages/Pwantwork';          //求职意向
import Pworktime from './pages/Pworktime';          //工作经历
import Pstudytime from './pages/Pstudytime';          //教育经历
import Pevaluate from './pages/Pevaluate';          //自我评价

import Pgowork from './pages/Pgowork';          //面试邀请
import Pworkcollect from './pages/Pworkcollect';          //职位收藏
import Pchangestatus from './pages/Pchangestatus';          //身份切换
import Pmyconpany from './pages/Pmyconpany';          //我的公司
import Pcominput from './pages/Pcominput';          //公司名称编辑
import Phelplist from './pages/Phelplist';          //帮助反馈
import Phelpdetail from './pages/Phelpdetail';          //帮助反馈详情
import Phelpsend from './pages/Phelpsend';          //帮助反馈输入
import Psubmit from './pages/Psubmit';          //提交证明材料

import Report from './pages/Report';   			//举报










import Login from './pages/Login';                        //登录页
import Loginphone from './pages/Loginphone';              //短信登录页
import Register from './pages/Register';   					//注册
import Lrestpsdtwo from './pages/Lrestpsdtwo';              //验证码
import Lrestpsdthree from './pages/Lrestpsdthree';          //密码
import Theproject from './pages/Theproject';   			//我的工程
import Lrestpsdone from './pages/Lrestpsdone';
import NativeBasedemo from './pages/NativeBasedemo';
import Taddproject from './pages/Taddproject'; 				//创建工程
import Tjoinproject from './pages/Tjoinproject'; 				//加入工程
import Tprojectdetail from './pages/Tprojectdetail'; 				//工程详情
import Teditedlist from './pages/Teditedlist'; 				//工程概况
import Tediteddetail from './pages/Tediteddetail'; 				//基本资料
import Tbuilder from './pages/Tbuilder'; 				//施工单位
import Tsupervisor from './pages/Tsupervisor'; 				//监理单位
import Tconstruction from './pages/Tconstruction'; 				//建设单位
import Tdesign from './pages/Tdesign'; 				//设计单位
import Treconnaissance from './pages/Treconnaissance'; 				//勘察单位
import Totherunit from './pages/Totherunit'; 				//其他单位
import Taddson from './pages/Taddson'; 				//添加子单位
import Taddmac from './pages/Taddmac'; 				//添加机械
import Teditemac from './pages/Teditemac'; 				//编辑机械
import Tsondetail from './pages/Tsondetail'; 				//子单位详情
import Taddpart from './pages/Taddpart'; 				//添加部位
import Single from './pages/Single'; 				//形象进度
import Picstorage from './pages/Picstorage'; 				//项目图库
import Picdetail from './pages/Picdetail'; 				//图片详情
import Choosefile from './pages/Choosefile'; 				//选择文件
import Hengdaotu from './pages/Hengdaotu'; 				//横道图
import Addhengdaotu from './pages/Addhengdaotu'; 				//添加横道图
import Dailyrecord from './pages/Dailyrecord'; 				//日志
import Adddailyrecord from './pages/Adddailyrecord'; 				//添加日志
import Adddailyrecord2 from './pages/Adddailyrecord2'; 				//添加日志分项工程
import Relatecompany from './pages/Relatecompany'; 				//企业关联
import Findcompany from './pages/Findcompany'; 				//申请关联
import Companydoclist from './pages/Companydoclist'; 				//公司详情
import Person from './pages/Person'; 				//人员管理
import Addperson from './pages/Addperson'; 				//添加人员
import Addrole from './pages/Addrole'; 				//添加角色
import Tujian from './pages/Tujian'; 				//土建资料
import Anquan from './pages/Anquan'; 				//安全资料
import Notice from './pages/Notice'; 				//通知公告
import Noticedetail from './pages/Noticedetail'; 				//公告详情
import Chooseperson from './pages/Chooseperson'; 				//选择发送人
import Sendnotice from './pages/Sendnotice'; 				//发送公告
import Singlecomment from './pages/Singlecomment'; 				//进度评论
import Songjian from './pages/Songjian'; 				//送检管理
import Songjianadd from './pages/Songjianadd'; 				//送检添加部位
import Pika from './pages/Pika'; 				//皮卡车
import Pikasubmit from './pages/Pikasubmit'; 				//提交订单
import Setjiancezhan from './pages/Setjiancezhan'; 				//设置监测站
import Choosejianceleibie from './pages/Choosejianceleibie'; 	//选择监测类别
import Weatherglass from './pages/Weatherglass'; 				//晴雨表
import Weatherglassedit from './pages/Weatherglassedit'; 				//编辑晴雨表
import Weatherevent from './pages/Weatherevent'; 				//晴雨表添加事件

import Findworklist from './pages/Findworklist'; 				//招聘首页
import Fworkdetail from './pages/Dome'; 				//职位详情
import Fworkposition from './pages/Fworkposition'; 				//工作地点
import Fresumedetail from './pages/Fresumedetail'; 				//人才详情
import Faddwork from './pages/Faddwork'; 				//添加招聘职位
import Faddworkposition from './pages/Faddworkposition'; 				//添加地区
import Msglist from './pages/Msglist'; 				//消息列表
import Mwait from './pages/Mwait'; 				//待处理事项
import Fworkedit from './pages/Fworkedit'; 				//编辑招聘职位
import Pworkmanage from './pages/Pworkmanage'; 				//招聘管理
import Dome from './pages/Dome';
import A1 from './pages/A1'; 	

import Testdemo from './pages/Testdemo'; 

const imgs = {
	Buildlist:require('./public/img/首页-选择.png'),
	Msglist:require('./public/img/消息-默认.png'),
	Theproject:require('./public/img/工程-默认.png'),
	Findworklist:require('./public/img/招聘求职-默认.png'),
	Personal:require('./public/img/我的-默认.png'),
}



const badge = 5;
export default class SimpleApp extends Component {

tpl(tintColor,key){
	return (<View>
			<Image source={imgs[key]} style={[styles.iconImg, { tintColor: tintColor }]} />
			{badge ? (
				<View style={styles.badgestyle}>
					<Text style={styles.textstyle}>{badge}</Text>
				</View>
			) : null}
		</View>)
}

	render() {
		return (
			<Router>
				<Modal>
					<Stack hideNavBar key="root" transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })}>
							 
								

						<Tabs
							key="tabbar" // 唯一标识
							swipeEnabled={false} //左右是否可以滑动
							inactiveTintColor='#666'//底部导航字体/图片点击前颜色
							activeTintColor='#32AAFD'//底部导航字体/图片点击后颜色
							headerMode='none' //隐藏标题栏
							tabBarPosition='bottom'//将导航栏显示在底部
							labelStyle={{ fontSize: 12, marginTop: -3 }}//底部导航字体样式
							animationEnabled={false}//禁止页面切换动画
							tabBarStyle={{ borderTopWidth:0}}//底部导航样式
						>
							<Scene key='Buildlist' component={Buildlist} title='建筑圈' icon={({tintColor})=>{
								return this.tpl(tintColor,'Buildlist')}} initial />
							<Scene key='Msglist' component={Msglist} title='消息' icon={({tintColor})=>{
								return this.tpl(tintColor,'Msglist')}}/>
							<Scene key='Theproject' component={Theproject} title='工程' icon={({tintColor})=>{
								return this.tpl(tintColor,'Theproject')}} />
							<Scene key='Findworklist' component={Findworklist} title='招聘' icon={({tintColor})=>{
								return this.tpl(tintColor,'Findworklist')}} />
							<Scene key='Personal' component={Personal} title='我的' icon={({tintColor})=>{
								return this.tpl(tintColor,'Personal')}} />
						</Tabs> 
						<Scene key='Theproject' component={Theproject} />
						<Scene key='Faddworkposition' component={Faddworkposition} />
						<Scene key='Fworkedit' component={Fworkedit} />
						<Scene key='Mwait' component={Mwait} />
						<Scene key='Msglist' component={Msglist} />
						<Scene key='Faddwork' component={Faddwork} />
						<Scene key='Fresumedetail' component={Fresumedetail} />
						<Scene key='Fworkposition' component={Fworkposition} />
						<Scene key='Fworkdetail' component={Fworkdetail} />
						<Scene key='Findworklist' component={Findworklist} />
				
						<Scene key='Songjian' component={Songjian} />
						<Scene key='Buildlist' component={Buildlist} />
						<Scene key='Sendnotice' component={Sendnotice} />
						<Scene key='Pikasubmit' component={Pikasubmit} />
						<Scene key='Addhengdaotu' component={Addhengdaotu} />
						<Scene key='Taddson' component={Taddson} />
						<Scene key='Single' component={Single} />
						<Scene key='Picdetail' component={Picdetail} />
						<Scene key='Choosejianceleibie' component={Choosejianceleibie} />
						<Scene key='Setjiancezhan' component={Setjiancezhan} />
						<Scene key='Weatherevent' component={Weatherevent} />
						<Scene key='Weatherglassedit' component={Weatherglassedit} />
						<Scene key='Weatherglass' component={Weatherglass} />
						<Scene key='Pika' component={Pika} />
						<Scene key='Dailyrecord' component={Dailyrecord} />
						<Scene key='Songjianadd' component={Songjianadd} />
						<Scene key='Choosefile' component={Choosefile} />
						<Scene key='Picstorage' component={Picstorage} />
						<Scene key='Singlecomment' component={Singlecomment} />
						<Scene key='Noticedetail' component={Noticedetail} />
						<Scene key='Chooseperson' component={Chooseperson} />
						<Scene key='Notice' component={Notice} />
						<Scene key='Anquan' component={Anquan} />
						<Scene key='Tujian' component={Tujian} />
						<Scene key='Addrole' component={Addrole} />
						<Scene key='Addperson' component={Addperson} />
						<Scene key='Person' component={Person} />
						<Scene key='Companydoclist' component={Companydoclist} />
						<Scene key='Findcompany' component={Findcompany} />
						<Scene key='Relatecompany' component={Relatecompany} />
						<Scene key='Adddailyrecord' component={Adddailyrecord} />
						<Scene key='Adddailyrecord2' component={Adddailyrecord2} />
						<Scene key='Hengdaotu' component={Hengdaotu} />
						<Scene key='Teditedlist' component={Teditedlist} />
						<Scene key='Teditemac' component={Teditemac} />
						<Scene key='Taddmac' component={Taddmac} />
						<Scene key='Taddpart' component={Taddpart} />
						<Scene key='Tsondetail' component={Tsondetail} />
						<Scene key='Tediteddetail' component={Tediteddetail} />
						<Scene key='Tbuilder' component={Tbuilder} />
						<Scene key='Tsupervisor' component={Tsupervisor} />
						<Scene key='Tconstruction' component={Tconstruction} />
						<Scene key='Tdesign' component={Tdesign} />
						<Scene key='Treconnaissance' component={Treconnaissance} />
						<Scene key='Totherunit' component={Totherunit} />
						<Scene key='Tprojectdetail' component={Tprojectdetail} />
						<Scene key='Tjoinproject' component={Tjoinproject} />
						<Scene key='Taddproject' component={Taddproject} />
						<Scene key='Lrestpsdone' component={Lrestpsdone} />
						<Scene key='Loginphone' component={Loginphone} />
						<Scene key='Lrestpsdtwo' component={Lrestpsdtwo} />
						<Scene key='Register' component={Register} />
						<Scene key='Lrestpsdthree' component={Lrestpsdthree} />
					
						<Scene key='Buildlist' component={Buildlist} />
						<Scene key='Basklist' component={Basklist} />
						<Scene key='Bneedlist' component={Bneedlist} />
						<Scene key='Builddetail' component={Builddetail} />
						<Scene key='Baskdetail' component={Baskdetail} />
						<Scene key='Baddnew' component={Baddnew} />
						<Scene key='Baddask' component={Baddask} />
						<Scene key='Baddneed' component={Baddneed} />
						<Scene key='Comsearch' component={Comsearch} />
						<Scene key='Personal' component={Personal} />
						<Scene key='Pinfo' component={Pinfo} />
						<Scene key='Pnews' component={Pnews} />
						<Scene key='Pask' component={Pask} />
						<Scene key='Pneed' component={Pneed} />
						<Scene key='Pcollect' component={Pcollect} />
						<Scene key='Pnotice' component={Pnotice} />
						<Scene key='Puserauth' component={Puserauth} />
						<Scene key='Pmyresume' component={Pmyresume} />
						<Scene key='Pwantwork' component={Pwantwork} />
						<Scene key='Pworktime' component={Pworktime} />
						<Scene key='Pstudytime' component={Pstudytime} />
						<Scene key='Pgowork' component={Pgowork} />
						<Scene key='Pworkcollect' component={Pworkcollect} />
						<Scene key='Pchangestatus' component={Pchangestatus} />
						<Scene key='Pmyconpany' component={Pmyconpany} />
						<Scene key='Pcominput' component={Pcominput} />
						<Scene key='Phelplist' component={Phelplist} />
						<Scene key='Phelpdetail' component={Phelpdetail} />
						<Scene key='Phelpsend' component={Phelpsend} />
						<Scene key='Pevaluate' component={Pevaluate} />
						<Scene key='PEditName' component={PEditName} />
						<Scene key='PEditPost' component={PEditPost} />
						<Scene key='PEditCompany' component={PEditCompany} />
						<Scene key='PEditPhone' component={PEditPhone} />
						<Scene key='PEditMail' component={PEditMail} />
						<Scene key='Psubmit' component={Psubmit} />
						<Scene key='Report' component={Report} />
						
					</Stack>
					<Scene hideNavBar key='Login' component={Login} title='登陆页' transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forVertical })} />
				</Modal>
			</Router>
		)
	}
}
