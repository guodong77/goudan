import fac from './fac';
import conf from './conf';
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Linking,TextInput,Alert,ToastAndroid}from 'react-native';

export default main = {
init:function(target,sco) {
	sco.tapshow = 0 ;
	sco.show =false; 
	//默认设置用户信息
    
// debugger;

	//通过导航引进来的前一个页面的sco
	sco.pre = sco.props.pre||{}; 

	//通过引入组件传进来的父级
	sco.parent =sco.props.parent||{};
	sco.state ={time:0}; 

 	sco.com_list ={params:{},data:[]};
 	sco.com_list1 ={params:{},data:[]};
 	sco.com_list2 ={params:{},data:[]};

 	sco.com_list_page ={params:{},data:[]};
 	sco.com_list_page1 ={params:{},data:[]};
 	sco.com_list_page2 ={params:{},data:[]};
 	sco.com_delete ={params:{},data:{}};
 	sco.com_editadd ={params:{},data:{}};
 	sco.com_editadd2 ={params:{},data:{}};
 	sco.com_upadte ={params:{},data:{}}; 
 	sco.com_detail ={params:{},data:{}};
 	sco.com_detail1 ={params:{},data:{}};
	 

 //给组件绑上事件；
 this.directive(sco);

//调用执行init方法 业务逻辑
if(this.handle[target]){
 
	for(key in this.handle[target]){
		if(key =='init'){
			this.handle[target].init(sco)
		}else{
			// this.setState({key:12});
		}
	}
}


	//   fetch(conf.url).then((res)=>res.json()).then((res)=>{  
 //    console.log(res); 
 // }); 

},





	//公共事件 和 私有事件集合
directive:function(sco) {
//公共事件/////////////////////////////////////////////////////////////////////////////////
	sco.comtime = function(key){
		 fac.ysfetch(sco,key);
	}
	sco.testalert = function(key){

	};
    sco.funtapshow = function(key){
	    sco.tapshow = key;
	    sco.setState({time:fac.time()});	  
	};
	sco.ysrun = function(){
		sco.setState({time:fac.time()});	
	};
   //公共获取输入框的值
	  sco.ysinput = (sco,key,val) => {
	  	var arr = key.split(".");
	  	sco[arr[0]][arr[1]][arr[2]] = val; 
        sco.setState({time:fac.time()});
	   
  };

  sco.toggle = function (key) {
					sco[key] = !sco[key];
					sco.ysrun();
				};



	//  sco.ysinput = function(e,key) { 
	//  let val = fac.setobj(e.nativeEvent.text,key); 
	//  sco.setState(val);  
	// } 




//私有事件////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
sco.ChangeText = ()=> {
  sco.refs.textInput.clear();
  sco.show =false;
  sco.setState({time:fac.time()});
};

//是否显示密码
sco.showMima=function() {
    sco.mimashow=!sco.mimashow;
    sco.ysrun();
 };

 sco.getid = (key) =>{
	window.listid = key
 }
 //获取第一张图片
 sco.firstimg = (url) => {
 	var reurl = 'http://myapp.ysjianzhu.com/ysAPP/app/public/img/gclogo@2x.png'; 
  	if(url){reurl = url.split(",")[0]; }
    return reurl; 
  };




},
handle:{ 
		"DemoPage":{
			init:function(sco) {
				alert('DemoPage');
				  // sco.com_list.params = {keyword:'wenzhang'}  
				  // fac.ysfetch(sco,'com_list');
			}
		},	
		"Pnotice":{
            init:function(sco) { 
            	//装载列表数据
            	sco.com_list.data =[];
            	sco.type = 1;//1是指加载更多 

                   	//获取分页数据
                    sco.com_list_page.url = 'auth/mycom_list_page';
					sco.com_list_page.params = {'debug':1,'debugkey':'c10',"listnum":3,"curPage":1};
					sco.comtime('com_list_page');
					sco.com_list_page.done = function(re,sco){
						if(sco.type = 1){ 

								 re.code&&re.data.datalist.map(function(el) {
		 							sco.com_list.data.push(el);
								  });
						}else{
							// re.code&&sco.com_list.data = re.data.datalist; 
						}
						
						  sco.ysrun();
					  }
				}	  
 
        },
		"Login":{
			init:function(sco) {
			    sco.mimashow=true; 
	    		//登录接口
	    		sco.com_detail.url = 'base/login_noverify';
	    		sco.com_detail.params = {"username":"","password":"",'debug':1,'debugkey':'c1'};
	    		sco.com_detail.before = function(sco){  
	    			if(sco.com_detail.params.username==''){
	    				ToastAndroid.show('请输入用户名／手机号', ToastAndroid.SHORT);return false;
	    			}
		    		if(sco.com_detail.params.password.length<6){
		    			ToastAndroid.show('密码不少于6位', ToastAndroid.SHORT);return false;
		    		}  
	    		} 
	    		sco.com_detail.done = function(re,sco){
	    			if(re.code==1){
	    				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
	    				re.data&&fac.setstore('userinfo',re.data);
	    				sco.ysnav.navigate('Tab');
	    			}else{
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT);
	    			} 
	    		}
			}	
		},
		"Register":{
			init:function(sco) { 
			   //获取输入手机号码下一步；
	    		sco.com_detail1.params = {"username":"",'debug':1,'router':'base/app_register','debugkey':'c9'};
	    		sco.nextstep = function(sco){	  
	    			if(sco.com_detail1.params.username==''||!fac.testphone(sco.com_detail1.params.username)){
	    				ToastAndroid.show('请输入有效的手机号码', ToastAndroid.SHORT);return false;
	    			}
	    			fac.setstore('regdata',sco.com_detail1.params); 
	    			// fac.applog(sco.com_detail1.params);
	    			sco.comtime('com_detail1'); 
	    		}
				//校验手机号码是否注册过 
				sco.com_detail1.url = 'base/check_register';
	    		sco.com_detail1.done = function(re,sco){ 
	    			if(re.code==1){
	    		 		sco.ysnav.navigate('Lrestpsdtwo');
	    			}else{
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT);
	    			}  
	    		}
			}
		},
		"Loginphone":{
			init:function(sco) {
	   			//获取短信验证码
	    		sco.com_detail1.url = 'base/getphoneverifycode';
	    		sco.com_detail1.params = {"username":"","code":"",'sta':1,sec:'获取验证码','debug':1,'debugkey':'c3'};
	    		sco.com_detail1.before = function(sco){ 
	    			console.log(sco.com_detail1.params);
    			if(sco.com_detail1.params.username==''||!fac.testphone(sco.com_detail1.params.username)){
    				ToastAndroid.show('请输入有效的手机号码', ToastAndroid.SHORT);return false;
    			}
    			sco.com_detail1.params.sta = 0;
    			sco.ysrun();
	    		}
	    		sco.com_detail1.done = function(re,sco){
	    			if(re.code==1){
	    				 sco.com_detail1.params.sta = 0;
	    				 ToastAndroid.show('发送验证码成功', ToastAndroid.SHORT);
                      var date = 60;
                     var a = setInterval(function(){
                          if(date>1){
                              date--;
                             sco.com_detail1.params.sec = date+'秒'; 
                          }else{
                            sco.com_detail1.params.sec ='获取验证码';
                            clearInterval(a);
                            sco.com_detail1.params.sta = 1; 
                          }
                          sco.ysrun();
                      },1000);
	    			}else{
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT);
	    			}  
	    		}



	   			//短信登录接口
	    		sco.com_detail.url = 'base/phone_login';
	    		sco.com_detail.params = {"username":"","code":"",'debug':1,'debugkey':'c7'};
	    		sco.com_detail.before = function(sco){ 
    			sco.com_detail.params.username = sco.com_detail1.params.username;


    			if(sco.com_detail.params.username==''||!fac.testphone(sco.com_detail.params.username)){
    				ToastAndroid.show('请输入有效的手机号码', ToastAndroid.SHORT);return false;
    			}
	    		if(sco.com_detail.params.code.length<4){
	    			ToastAndroid.show('请输入短信验证码', ToastAndroid.SHORT);return false;
	    		}  
	    		} 
	    		sco.com_detail.done = function(re,sco){
	    			if(re.code==1){
	    				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
	    				re.data&&fac.setstore('userinfo',re.data);

	    			}else{
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT);
	    			}  
	    		}	 
			




			}
			
		},

		"Lrestpsdtwo":{
			init:function(sco) { 
				//获取短信验证码
	    		sco.com_detail1.url = 'base/getphoneverifycode';
	    		sco.com_detail1.params = {"username":"","code":"",'password':'','router':'','sta':0,'sec':'获取验证码','debug':1,'debugkey':'c3'};
	    		sco.com_detail1.before = function(sco){  
    			sco.com_detail1.params.sta = 0;
    			sco.ysrun(); 
	    		} 
	    		sco.com_detail1.done = function(re,sco){
	    			if(re.code==1){
	    				sco.com_detail1.params.code = '';
	    				 sco.com_detail1.params.sta = 0;
	    				 ToastAndroid.show('发送验证码成功', ToastAndroid.SHORT);
                      var date = 60;
                     var a = setInterval(function(){
                          if(date>1){
                              date--;
                             sco.com_detail1.params.sec ='重新获取验证码'+ date+'秒'; 
                          }else{
                            sco.com_detail1.params.sec ='获取验证码';
                            clearInterval(a);
                            sco.com_detail1.params.sta = 1; 
                          }
                          sco.ysrun(); 
                      },1000);
	    			}else{
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT);
	    			}  
	    		}



				//从本地存储获取手机号，再去获取验证码；
			    fac.getstore('regdata',(re)=>{ 
			    	re.username&&(sco.com_detail1.params.username = re.username,sco.com_detail1.params.router = re.router,sco.comtime('com_detail1')); 
			    })


			    //去校验短信验证码是否正确 
	    		sco.com_detail.url = 'base/check_phoneverify';
	    		sco.com_detail.params = {"code":"",'debug':1,'debugkey':'c6'};
	    		sco.com_detail.before = function(sco){ 
    			sco.com_detail.params.code = sco.com_detail1.params.code;
  
		    		if(sco.com_detail.params.code.length<4){
		    			ToastAndroid.show('请输入短信验证码', ToastAndroid.SHORT);return false;
		    		}  
	    		} 
	    		sco.com_detail.done = function(re,sco){
	    			if(re.code==1){ 
	    				fac.setstore('regdata',sco.com_detail1.params); 
	    				sco.ysnav.navigate('Lrestpsdthree',{pre:sco});
	    			}else{
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT);
	    			}  
	    		}


			   
			}
			
		},


		"Lrestpsdthree":{
			init:function(sco) {
				sco.mimashow = true;
				//获取用户名，密码，短信验证码一起发给后端
	    		sco.com_detail1.url = '';
	    		sco.com_detail1.params = {"username":"","code":"",'password':'','debug':1,'debugkey':'c2'};
	    		 
	    		sco.com_detail1.done = function(re,sco){
	    			if(re.code==1){ 
	    				 ToastAndroid.show(re.msg, ToastAndroid.SHORT); 
	    			}else{
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT);
	    			}  
	    		}



				//从本地存储获取手机号，再去获取验证码；
			    fac.getstore('regdata',(re)=>{ 
			    	sco.com_detail1.url = re.router; 
			    	sco.com_detail1.params.username = re.username; 
			    })
		}	
 


		},

		"Lrestpsdone":{
			init:function(sco) {
			     //获取输入手机号码下一步；
	    		sco.com_detail1.params = {"username":"",'debug':1,'router':'base/find_pass','debugkey':'c9'};
	    		sco.nextstep = function(sco){	  
	    			if(sco.com_detail1.params.username==''||!fac.testphone(sco.com_detail1.params.username)){
	    				ToastAndroid.show('请输入有效的手机号码', ToastAndroid.SHORT);return false;
	    			} 
	    			fac.setstore('regdata',sco.com_detail1.params); 
	    			// fac.applog(sco.com_detail1.params);
	    			sco.comtime('com_detail1'); 
	    		} 

	    	 
				//校验手机号码是否注册过 
				sco.com_detail1.url = 'base/check_register';
	    		sco.com_detail1.done = function(re,sco){ 
	    			if(re.code==0){
	    				ToastAndroid.show(re.msg, ToastAndroid.SHORT); 
	    			}else{
	    				sco.ysnav.navigate('Lrestpsdtwo');
	    			}  
	    		}

			  }
		},
		// 工程
		"Theproject": {
			init: function (sco) {
				//获取我创建的工程
					//配置url
					sco.com_list.url = 'auth/get_myprogram_list';
					//配置传给后端的参数
					sco.com_list.params = { debug: 1, debugkey: "c1", name: "获取我创建的工程",codeid:'c93'}; 
					//配置 传给后端之前，执行的函数
					// sco.com_list.before = function (sco) {						 
					// 	   if(sco.com_list.params.name==''){return false;} 
					// 	}
					//配置 拿到数据之后，执行的函数
					sco.com_list.done = (re, sco)=>{
						debugger; 
						sco.ysrun();
						 
					}
				//去跑这个接口	
				sco.comtime('com_list');



				//获取我加入的项目部
			 sco.com_list1.url = 'auth/get_myprogram_list';
			//配置传给后端的参数
			sco.com_list1.params = { debug: 1, debugkey: "c3", name: "获取我创建的工程",codeid:'c93',searchtype:2 }; 
			sco.comtime('com_list1');
				

				sco.show = false;
				sco.language = '旭日领域商住楼';
				sco.onListShow = function () {
					sco.show = !sco.show;
					sco.setState({ time: fac.time() });
				};

			}


		},
	//添加工程
		"Taddproject": {
			init: function (sco) {
				//获取省份列表
					sco.com_list.url = 'auth/com_list'; 
					sco.com_list.params = { debug: 1, debugkey: "c53", name: "获取省份列表",codeid:'c53'}; 
					sco.com_list.done = (re, sco)=>{
						debugger; 
						sco.ysrun(); 
					} 
				    sco.comtime('com_list'); 

				//获取城市列表
			 sco.com_list1.url = 'auth/com_list'; 
			sco.com_list1.params = { debug: 1, debugkey: "c57", name: "获取城市列表",codeid:'c57',searchtype:2 }; 
			sco.com_list1.done = (re, sco)=>{
						debugger; 
						sco.ysrun(); 
					} 
			sco.comtime('com_list1');


				//提交工程数据
			 sco.com_editadd.url = 'auth/program_pro_add'; 
			 sco.com_editadd.params = {prname:'工程名称',
    cityid:'城市id',
    jiegou:'结构类型',
    kaigong:'开工日期',
    jungong:'竣工日期',
    img:'',debug: 1, debugkey: "c2", name: "提交创建工程数据",codeid:'c2'}; 
			 sco.com_editadd.done = (re, sco)=>{
				debugger; 
				sco.ysrun(); 
			 } 
			 sco.comtime('com_editadd');				

			 

			}


		},
		// 查找工程列表
		"Tjoinproject": {
			init: function (sco) {
				//获取查着工程 
					sco.com_list.url = 'auth/program_list_page'; 
					sco.com_list.params = { debug: 1, debugkey: "c7", name: "获取查着工程",codeid:'c93'}; 
					sco.com_list.done = (re, sco)=>{
						debugger; 
						sco.ysrun(); 
					} 
				sco.comtime('com_list');

 


 				//点击申请加入
			 sco.com_editadd.url = 'auth/program_join'; 
			 sco.com_editadd.params = {"proid":'这个工程的id',"description":'附加信息',
     debug: 1, debugkey: "c7", name: "点击申请加入"}; 
			 sco.com_editadd.done = (re, sco)=>{
				debugger; 
				sco.ysrun(); 
			 } 
			 sco.comtime('com_editadd');	

			}


		},


		//我的工程、我加入的项目详情页
		"Tprojectdetail":{
			init:function(sco) {
			 //通过导航引进来的前一个对象
			sco.com_detail.data = sco.props.value||{};
	 	

			}
		},

		//添加子单位
		"Taddson":{
			init:function(sco) {
			 

			 //添加子单位
			 sco.com_editadd.url = 'auth/program_pro_sinadd'; 
			 sco.com_editadd.params = {codeid:'当前工程的codeid',
									    jichu:'地基基础',
									    sname:'子单位名称',
									    jiegou:'框架类型',
									    zhuti:'主体结构',
									    cengshu:'层数',
									    img:'图片路径，多张以逗号隔开',
     debug: 1, debugkey: "c7", name: "添加子单位"}; 
			 sco.com_editadd.done = (re, sco)=>{
				debugger; 
				sco.ysrun(); 
			 } 
			 sco.comtime('com_editadd');	

			}
		},

		//添加机械
		"Taddmac":{
			init:function(sco) {  

			 //添加机械
			 sco.com_editadd.url = 'auth/program_pro_sinadd'; 
			 sco.com_editadd.params = {codeid:'当前工程的codeid', 
									    jname:'子单位名称', 
									    img:'图片路径，多张以逗号隔开',
     debug: 1, debugkey: "c7", name: "添加机械"}; 
			 sco.com_editadd.done = (re, sco)=>{
				debugger; 
				sco.ysrun(); 
			 } 
			 sco.comtime('com_editadd');	

			}
		},

		//自单位详情
		"Tsondetail":{
			init:function(sco) {
			 

			 //添加子单位
			 sco.com_editadd.url = 'auth/program_pro_sinadd'; 
			 sco.com_editadd.params = {codeid:'当前工程的codeid',
									    jichu:'地基基础',
									    sname:'子单位名称',
									    jiegou:'框架类型',
									    zhuti:'主体结构',
									    cengshu:'层数',
									    img:'图片路径，多张以逗号隔开',
     debug: 1, debugkey: "c7", name: "添加子单位"}; 
			 sco.com_editadd.done = (re, sco)=>{
				debugger; 
				sco.ysrun(); 
			 } 
			 sco.comtime('com_editadd');	

			}
		},





		"Teditedlist":{
			init:function(sco) {
			  sco.datas=conf.Teditedlist;
		 }	
		},

		"Single":{
			init:function(sco) {
				sco.language='详情进度';
    		sco.picker=function(lang){
				sco.language = lang;
			    sco.setState({time:fac.time()});
			};
			}
		},

		"Basklist": {
			init(sco) {
				sco.com_list.data =[];
				sco.type = 1;
				sco.com_list_page.url = 'open/ucom_list_page';
				sco.com_list_page.params = { debug: 1, debugkey: "c2_2", name: "获取我创建的问答列表", };
				sco.comtime('com_list_page');
				sco.com_list_page.done = function(re,sco){
					if(sco.type){ 
						re.code&&re.data.datalist.map(function(el) {
							sco.com_list.data.push(el);
						});
					}else{
						re.code&&(sco.com_list.data = re.data.datalist);
						sco.type=1;
					}
				sco.ysrun();
				}
			}
		},
		
		"Songjian":{
			init:function(sco) {
				sco.language='一栋';
    		sco.picker=function(lang){
				sco.language = lang;
			    sco.setState({time:fac.time()});
			};
			}
		},

		"Person":{
			init:function(sco) {
			 sco.show =false;
			 sco.onListShow = function() {
			      sco.show =!sco.show;
			      sco.setState({time:fac.time()});
    			};
			}
		},
		"Adddailyrecord":{
			init:function(sco) {
    		
			}
			
		},

		"Addperson":{
			init:function(sco) {
			 sco.show =false;
			 sco.disable= true;
			 sco.onChangeText = function(text) {
			      if(text){
			      	sco.disable= false;
			      	sco.show =true;
			      }else{
			      	sco.show =false;
			      	sco.disable= true;
			      }
			      sco.setState({time:fac.time()});
    			};
			}
		},

		"Picstorage":{
			init:function(sco) {
    			sco.modalVisible =false;
    			sco.onListShow = function() {
			      sco.modalVisible =!sco.modalVisible;
			      sco.setState({time:fac.time()});
    			};
    			sco.createmodal = false;
    			sco.onCreateShow = function() {
			      sco.createmodal =!sco.createmodal;
			      sco.setState({time:fac.time()});
    			};
			
			}	
			},

		// "Personal":{
		// 		init:function(sco) {
		// 			sco.com_list_page.url = 'open/com_list'
		// 			sco.com_list_page.params = {debug:1,debugkey:"x81",name:"demo测试接口"}; 
		// 			sco.comtime('com_list_page');
		// 			sco.com_list_page.done=function(re,sco){
		// 				sco.setState({time:fac.time()});
		// 					debugger;
		// 			}
		// 		}
		// 	}
		"Personal":{
			init:function(sco) {
				fac.getstore('userinfo',(re)=>{
					 
				});


				sco.com_list1.url = 'open/com_list'
				sco.com_list1.params = {debug:1,debugkey:"MyData",name:"demo测试接口"}; 
				sco.comtime('com_list1');
				sco.com_list1.done=function(re,sco){
					
				}

				  sco.SC={
      				Invite:false,
    			};
  				sco.ShowInvite=function(bool){
  					sco.SC.Invite=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},
		"PEditName":{
			init:function(sco) {
				sco.com_list1.url = 'open/com_list'
				sco.com_list1.params = {debug:1,debugkey:"MyData",name:"demo测试接口"}; 
				sco.comtime('com_list1');
				sco.com_list1.done=function(re,sco){
					
				}

				  sco.SC={
      				Invite:false,
    			};
  				sco.ShowInvite=function(bool){
  					sco.SC.Invite=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},
		"PEditMail":{
			init:function(sco) {
				sco.com_list1.url = 'open/com_list'
				sco.com_list1.params = {debug:1,debugkey:"MyData",name:"demo测试接口"}; 
				sco.comtime('com_list1');
				sco.com_list1.done=function(re,sco){
					
				}

				  sco.SC={
      				Invite:false,
    			};
  				sco.ShowInvite=function(bool){
  					sco.SC.Invite=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},
		"PEditPhone":{
			init:function(sco) {
				sco.com_list1.url = 'open/com_list'
				sco.com_list1.params = {debug:1,debugkey:"MyData",name:"demo测试接口"}; 
				sco.comtime('com_list1');
				sco.com_list1.done=function(re,sco){

				}

				  sco.SC={
      				Invite:false,
    			};
  				sco.ShowInvite=function(bool){
  					sco.SC.Invite=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},
		"PEditPost":{
			init:function(sco) {
				sco.com_list1.url = 'open/com_list'
				sco.com_list1.params = {debug:1,debugkey:"MyData",name:"demo测试接口"}; 
				sco.comtime('com_list1');
				sco.com_list1.done=function(re,sco){
				
				}

				  sco.SC={
      				Invite:false,
    			};
  				sco.ShowInvite=function(bool){
  					sco.SC.Invite=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},
		"PEditCompany":{
			init:function(sco) {
				sco.com_list1.url = 'open/com_list'
				sco.com_list1.params = {debug:1,debugkey:"MyData",name:"demo测试接口"}; 
				sco.comtime('com_list1');
				sco.com_list1.done=function(re,sco){
				
				}

				  sco.SC={
      				Invite:false,
    			};
  				sco.ShowInvite=function(bool){
  					sco.SC.Invite=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},
		"Pinfo":{
			init:function(sco) {
				sco.com_list1.url = 'open/com_list'
				sco.com_list1.params = {debug:1,debugkey:"MyData",name:"demo测试接口"}; 
				sco.comtime('com_list1');
				sco.com_list1.done=function(re,sco){
					
				}

				  sco.SC={
      				Invite:false,
    			};
  				sco.ShowInvite=function(bool){
  					sco.SC.Invite=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},
		"Findworklist":{
			init:function(sco) {

				 
				sco.com_list_page.url = 'open/com_list'
				sco.com_list_page.params = {debug:1,debugkey:"x81",name:"demo测试接口"}; 
				sco.comtime('com_list_page');
				sco.com_list_page.done=function(re,sco){
				debugger;	
						
				}
				sco.com_list.url = 'open/com_list'
				sco.com_list.params = {debug:1,debugkey:"x82",name:"demo测试接口"}; 
				sco.comtime('com_list');
				sco.com_list.done=function(re,sco){
					
			
				}				
			sco.show =false;
			sco.onListShow = function() {
			      sco.show =!sco.show;
			      sco.setState({time:fac.time()});
    			};
    		
			}
			
		},
		"Fworkdetail":{
			init:function(sco) {
			sco.com_list2.url = 'open/com_list';
			sco.com_list2.params = {debug:1,debugkey:"x85",name:"demo测试接口"}; 
			sco.comtime('com_list2');
			sco.com_list2.done=function(re,sco){
				sco.setState({time:fac.time()});
				
			}
		}
		},
		"PositionPage":{
			init:function(sco) {
				sco.com_list.url = 'auth/onnot_inline';
				sco.com_list.params = {type:0};				
				sco.com_list.done = function(re,sco){
				  
				}
				// fac.ysfetch(sco,'com_list');


			} 
		},

		"MassagePage":{
			init:function(sco) {

			} 
		},

		"MasChatPage":{
			init:function(sco) {
				
			} 
		},	

		"Buildlist":{
			init:function(sco) {
				sco.com_list1.data =[];
            	sco.type = 1;//1是指加载更多
				//建筑圈列表数据
				sco.com_list_page.url = 'open/ucom_list_page';
				sco.com_list_page.params = {'debug':1,'debugkey':'c1_2',"codeid":"fac.getcd(sco,'c104')","listnum":3,"curPage":1,cateid:92}
				sco.comtime('com_list_page');
				sco.com_list_page.done = function(re,sco){
					if(sco.type){ 
						re.code&&re.data.datalist.map(function(el) {
							sco.com_list.data.push(el);
						});
					}else{
						re.code&&(sco.com_list.data = re.data.datalist);
						sco.type=1;
					}
				sco.ysrun();
				}
				sco.SC={
					Number:3
				};
				sco.ChangeNumber=function(){
					sco.SC.Number=20;
					sco.setState({time:fac.time()});
				}
			}
		},
		"Builddetail":{
			init:function(sco) {
				sco.modalVisible =false;
    			sco.onListShow = function() {
			      sco.modalVisible =!sco.modalVisible;
			      sco.setState({time:fac.time()});
    			};
				sco.com_list.url = 'open/get_comment';
				sco.com_list.params =  {'debug':1,'debugkey':'c1_6', "articleid":"id",top:3}
				sco.com_list.before = function(sco){
					sco.com_list.params.codeid = window.listid
				}
				sco.comtime('com_list');
				// sco.com_list.done = function(re,sco){
				// 	alert(sco.com_list.params.codeid)
				// }				
				sco.com_detail.url = 'open/com_detail';
				sco.com_detail.params = {'debug':1,'debugkey':'c3_1',"listnum":3,"curPage":1,};
				sco.com_detail.before = function(sco){
					sco.com_detail.params.codeid = window.listid
				}
				sco.comtime('com_detail');
				// sco.com_detail.done = function(re,sco){
				// 	alert(sco.com_detail.params.codeid)
				// }		
				}
		},
		"Baskdetail":{
			init:function(sco) {
				sco.modalVisible =false;
    			sco.onListShow = function() {
			      sco.modalVisible =!sco.modalVisible;
			      sco.setState({time:fac.time()});
    			};
				sco.com_detail.url = 'open/qa_detail';
				sco.com_detail.params = {'debug':1,'debugkey':'c4_1',"codeid":"fac.getcd(sco,'c104')","listnum":3,"curPage":1,cateid:92}
				sco.com_detail.before = function(sco){
					sco.com_detail.params.codeid = window.listid
				}
				sco.comtime('com_detail');
				// sco.com_detail.done = function(re,sco){
				// 	alert(sco.com_detail.params.codeid)
				// }	
				
				sco.com_list.url = 'open/get_answer_list';
				sco.com_list.params =  {'debug':1,'debugkey':'c4_2', "articleid":"id",top:3}
				sco.com_list.before = function(sco){
					sco.com_list.params.codeid = window.listid
				}
				sco.comtime('com_list');
				// sco.com_list.done = function(re,sco){
				// 	alert(sco.com_list.params.codeid)
				// }		
				
				}
		},
		"Baddnew":{
			init:function(sco) {
				sco.com_list.url = 'auth/arch_add';
				sco.com_list.params =  {'debug':1,'debugkey':'c1', "articleid":"id",top:3}
				sco.com_list.done = function(re,sco){
						// alert(sco.com_list.params.content)
						alert(re.msg)

				}		
			}
		},
		
		"Baddask":{
			init:function(sco) {
				sco.com_list.url = 'auth/question_add';
				sco.com_list.params =  {'debug':1,'debugkey':'c2', "articleid":"id",top:3}
				sco.com_list.done = function(re,sco){
						// alert(sco.com_list.params.content)
						alert(re.msg)

				}		
			}
		},
		"Baddneed":{
			init:function(sco) {
				sco.com_list.url = 'auth/question_add';
				sco.com_list.params =  {'debug':1,'debugkey':'c2', "articleid":"id",top:3}
				sco.com_list.done = function(re,sco){
						// alert(sco.com_list.params.content)
						alert(re.msg)

				}		
			}
		},
		"Puserauth":{
			init:function(sco) {
				  sco.SC={
      				SCard1:true,
      				SCard2:true,
      				SCard3:true,
      				SCard4:true,
      				color:'#CDCDCD',
      				backgroundColor:'#E5E5E5',
      				PhotoName:false,
      				PhotoWork:false,
      				PhotoLicense:false,
      				PhotoProve:false,
      				PhotoTips:false,
    			};
    			sco.ShowPhotoName=function(bool){
  					sco.SC.PhotoName=bool,
  					sco.setState({time:fac.time()});
  				};
  				sco.ShowPhotoWork=function(bool){
  					sco.SC.PhotoWork=bool,
  					sco.setState({time:fac.time()});
  				};
  				sco.ShowPhotoLicense=function(bool){
  					sco.SC.PhotoLicense=bool,
  					sco.setState({time:fac.time()});
  				};
  				sco.ShowPhotoProve=function(bool){
  					sco.SC.PhotoProve=bool,
  					sco.setState({time:fac.time()});
  				};
  				sco.ShowTips=function(bool){
  					sco.SC.PhotoTips=bool,
  					sco.setState({time:fac.time()});
  				};
    			sco.setSCard1 = function(){
    				sco.SC.SCard1=false,
    				sco.SC.SCard2=true,
    				sco.SC.SCard3=true,
    				sco.SC.SCard4=true,
    				sco.SC.color='#fff',
    				sco.SC.backgroundColor='#32AAFD',

    				sco.setState({time:fac.time()});
  				};
  				sco.setSCard2 = function(){
    				sco.SC.SCard1=true,
    				sco.SC.SCard2=false,
    				sco.SC.SCard3=true,
    				sco.SC.SCard4=true,
    				sco.SC.color='#fff',
    				sco.SC.backgroundColor='#32AAFD',

    				sco.setState({time:fac.time()});
  				};
  				sco.setSCard3 = function(){
    				sco.SC.SCard1=true,
    				sco.SC.SCard2=true,
    				sco.SC.SCard3=false,
    				sco.SC.SCard4=true,
    				sco.SC.color='#fff',
    				sco.SC.backgroundColor='#32AAFD',

    				sco.setState({time:fac.time()});
  				};
  				sco.setSCard4 = function(){
    				sco.SC.SCard1=true,
    				sco.SC.SCard2=true,
    				sco.SC.SCard3=true,
    				sco.SC.SCard4=false,
    				sco.SC.color='#fff',
    				sco.SC.backgroundColor='#32AAFD',

    				sco.setState({time:fac.time()});
  				};
			}
		},

		"Psubmit":{
			init:function(sco) {
				  sco.SC={
      				submit:false,
    			};
  				sco.ShowSubmit=function(bool){
  					sco.SC.submit=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},



		"Fresumedetail":{
			init:function(sco) {
				// alert(123);

			}
		},
		"Phelpsend":{
			init:function(sco) {
				
				  sco.SC={
      				color:'#ccc',
      				backgroundColor:'#E5E5E5',
    			};
  				sco.ShowHelpButton=function(){
  					sco.SC.color='#fff',
  					sco.SC.backgroundColor='#32AAFD',
  					sco.setState({time:fac.time()});
  				};

			}
		},

		"Pmyconpany":{
			init:function(sco) {
				  sco.SC={
      				logo:false
    			};
  				sco.Showlogo=function(bool){
  					sco.SC.logo=bool,
  					sco.setState({time:fac.time()});
  				};

			}
		},

		"Pworktime":{
			init:function(sco) {
				sco.SC={
					placeholder:true,
					color:'#ccc',
      				backgroundColor:'#E5E5E5',
				},
				sco.ShowPlaceholder=function(){
  					sco.SC.placeholder=false,
  					sco.SC.color='#fff',
  					sco.SC.backgroundColor='#32AAFD',
  					sco.setState({time:fac.time()});
  				};
			} 
		},

		"Pstudytime":{
			init:function(sco) {
				sco.SC={
					placeholder:true,
					color:'#ccc',
      				backgroundColor:'#E5E5E5',
				},
				sco.ShowPlaceholder=function(){
  					sco.SC.placeholder=false,
  					sco.SC.color='#fff',
  					sco.SC.backgroundColor='#32AAFD',
  					sco.setState({time:fac.time()});
  				};
			} 
		},

		"Phelpsend":{
			init:(sco)=>{
				//帮助反馈提交
			 	sco.com_editadd.url = 'auth/com_editadd'; 
			 	sco.com_editadd.params = {
			 		content:'',
				    debug: 1, debugkey: "c9", name: "帮助反馈提交",codeid:'c9'
				}; 
				sco.com_editadd.before = function(sco){ 
		    		if(!sco.com_editadd.params.content){
		    			ToastAndroid.show('请输入帮助反馈内容', ToastAndroid.SHORT);
		    			return false;
		    		}  
	    		} 
			 	sco.com_editadd.done = (re, sco)=>{
			 		if(re.code == 1){
			 			ToastAndroid.show('提交成功', ToastAndroid.SHORT);

			 			setTimeout(()=>{
			 				Actions.pop();
			 			}, 500);
			 		}else{
			 			ToastAndroid.show(re.msg || '提交失败', ToastAndroid.SHORT);
			 		}
					
				} 
			} 
		},

		"Pmyresume":{
			init:(sco)=>{
				//我的简历
			 	sco.com_detail.url = 'auth/mycom_detail'; 
			 	sco.com_detail.params = {
			 		content:'',
				    debug: 1, debugkey: "c75", name: "我的简历",codeid:'c75'
				}; 
			 	sco.com_detail.done = (re, sco)=>{
			 		console.log(re);
					//					
				};
				sco.comtime('com_detail');
			} 
		},
	  
}

}
 