//1、引入css 自定义的js
import styles from './js/css';
import conf from './js/conf';
import fac from './js/fac';
import main from './js/main';



//2、引入react组件
import {AppRegistry}from 'react-native'; 
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'; 
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';


import Tab from './pages/Tab'; 				//Tab

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





































































































import Login from './pages/Login';                        //登录页
import Loginphone from './pages/Loginphone';              //短信登录页
import Register from './pages/Register';   					//注册
import Lrestpsdtwo from './pages/Lrestpsdtwo';              //验证码
import Lrestpsdthree from './pages/Lrestpsdthree';          //密码
import Theproject from './pages/Theproject';                
import Lrestpsdone from './pages/Lrestpsdone';   			//我的工程
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
import Fworkdetail from './pages/Fworkdetail'; 				//职位详情
import Fworkposition from './pages/Fworkposition'; 				//工作地点
import Fresumedetail from './pages/Fresumedetail'; 				//人才详情
import Faddwork from './pages/Faddwork'; 				//添加招聘职位
import Faddworkposition from './pages/Faddworkposition'; 				//添加地区
import Msglist from './pages/Msglist'; 				//消息列表
import Mwait from './pages/Mwait'; 				//待处理事项
import Fworkedit from './pages/Fworkedit'; 				//编辑招聘职位
import Pworkmanage from './pages/Pworkmanage'; 				//招聘管理

const SimpleApp = StackNavigator({	


	Tab: { screen: Tab },
	// NativeBasedemo:{screen:NativeBasedemo},
	Faddworkposition:{screen:Faddworkposition}, 
	Fworkedit:{screen:Fworkedit},
	Mwait:{screen:Mwait},
	Msglist:{screen:Msglist},
	Faddwork:{screen:Faddwork},
	Fresumedetail:{screen:Fresumedetail},
	Fworkposition:{screen:Fworkposition},
	Fworkdetail:{screen:Fworkdetail},
	Findworklist:{screen:Findworklist},
	Theproject:{screen:Theproject},
	Login: { screen: Login },
	Songjian:{screen:Songjian},
	Buildlist: { screen: Buildlist },
	Sendnotice:{screen:Sendnotice},
	Pikasubmit:{screen:Pikasubmit},
	Addhengdaotu:{screen:Addhengdaotu},
	Taddson:{screen:Taddson},
	
	Single:{screen:Single},
	Picdetail:{screen:Picdetail},

	Choosejianceleibie:{screen:Choosejianceleibie},
	Setjiancezhan:{screen:Setjiancezhan},
	Weatherevent:{screen:Weatherevent},
	Weatherglassedit:{screen:Weatherglassedit},
	Weatherglass:{screen:Weatherglass},

	Pika:{screen:Pika},
	Dailyrecord:{screen:Dailyrecord},

	Songjianadd:{screen:Songjianadd},
	Choosefile:{screen:Choosefile},
	Picstorage:{screen:Picstorage},
	Singlecomment:{screen:Singlecomment},

	Noticedetail:{screen:Noticedetail},

	Chooseperson:{screen:Chooseperson},
	Notice:{screen:Notice},
	Anquan:{screen:Anquan},
	Tujian:{screen:Tujian},
	Addrole:{screen:Addrole},
	Addperson:{screen:Addperson},
	Person:{screen:Person},
	Companydoclist:{screen:Companydoclist},
	Findcompany:{screen:Findcompany},
	Relatecompany:{screen:Relatecompany},
	Adddailyrecord:{screen:Adddailyrecord},
	Adddailyrecord2:{screen:Adddailyrecord2},
 	
	Hengdaotu:{screen:Hengdaotu},
	
	
	Teditedlist:{screen:Teditedlist},
	Teditemac:{screen:Teditemac},
	Taddmac:{screen:Taddmac},
	Taddpart:{screen:Taddpart},
	Tsondetail:{screen:Tsondetail},
	

	
	Tediteddetail:{screen:Tediteddetail},
	Tbuilder:{screen:Tbuilder},
	Tsupervisor:{screen:Tsupervisor},
	Tconstruction:{screen:Tconstruction},
	Tdesign:{screen:Tdesign},
	Treconnaissance:{screen:Treconnaissance},
	Totherunit:{screen:Totherunit},
	Tprojectdetail:{screen:Tprojectdetail},
	Tjoinproject:{screen:Tjoinproject},
	
	Taddproject:{screen:Taddproject},
	Lrestpsdone:{screen:Lrestpsdone},
	Loginphone: { screen: Loginphone },
	Lrestpsdtwo: { screen: Lrestpsdtwo },
	Register: { screen: Register },
	Lrestpsdthree: { screen: Lrestpsdthree },

	// lyx的模块
	Buildlist: { screen: Buildlist },
	Basklist: { screen: Basklist },
	Bneedlist: { screen: Bneedlist },
	Builddetail: { screen: Builddetail },
	Baskdetail: { screen: Baskdetail },
	Baddnew:{screen:Baddnew},
	Baddask:{screen:Baddask},
	Baddneed:{screen:Baddneed},
	Comsearch: { screen: Comsearch },

	Personal: { screen: Personal },
	Pinfo: { screen: Pinfo },
	Pnews: { screen: Pnews },
	Pask: { screen: Pask },
	Pneed: { screen: Pneed },
	Pcollect: { screen: Pcollect },
	Pnotice: { screen: Pnotice },
	Puserauth: { screen: Puserauth },
	Pmyresume: { screen: Pmyresume },
	Pwantwork: { screen: Pwantwork },
	Pworktime: { screen: Pworktime },
	Pstudytime: { screen: Pstudytime },
	Pgowork: { screen: Pgowork },
	Pworkcollect: { screen: Pworkcollect },
	Pchangestatus: { screen: Pchangestatus },
	Pmyconpany: { screen: Pmyconpany },
	Pcominput: { screen: Pcominput },
	Phelplist: { screen: Phelplist },
	Phelpdetail: { screen: Phelpdetail },
	Phelpsend: { screen: Phelpsend },
	Pevaluate: { screen: Pevaluate },
	PEditName: { screen: PEditName },
	PEditPost: { screen: PEditPost },
	PEditCompany: { screen: PEditCompany },
	PEditPhone: { screen: PEditPhone },
	PEditMail: { screen: PEditMail },
	Psubmit: { screen: Psubmit },















































































	},
	{ 
	   mode: 'card',//页面切换
	   headerMode: 'none',//隐藏默认导航
	    transitionConfig:()=>({
	        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
	   })
	}

);

export default SimpleApp;

