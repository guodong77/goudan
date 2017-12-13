import fac from './fac';
import conf from './conf';
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Linking,TextInput}from 'react-native';


export default main = {
init:function(target,sco) {
	sco.tapshow = 0 ;
	sco.show =false;

	//初始化设置
	// window.ysnav = sco.props.navigation;
	sco.ysnav  = sco.props.navigation;
	sco.parent =sco.props.parent||{};
	sco.state ={time:0};
 	sco.showText = true;
 	sco.dataSource =[];//报警记录
 	sco.devinfo =[];//设备列表
 	sco.devin =[];//在线列表
 	sco.devout =[];//离线列表

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
 	sco.com_lgout ={params:{},data:{}};
 

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
	   if (val) {
         sco.show =true;
         sco.setState({time:fac.time()});
	   }
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

//点赞
sco.ChangeImg = (value,key) =>{
		var NoZanImg=require('../public/img/点赞03.png');
		var ZanImg=require('../public/img/点赞选中.png');

	   	if (value.data[key].url==NoZanImg) {
	   		value.data[key].url=ZanImg;
	   	}else{
	   		value.data[key].url=NoZanImg;
	   	};
	   	sco.setState({time:fac.time()});	
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


		"Login":{
			init:function(sco) {
				    sco.show =false;
				    sco.mimashow=true;
				    sco.disable= true;
				sco.showMima=function() {
			        sco.mimashow=!sco.mimashow;
			        sco.setState({time:fac.time()});
			      };
				sco.onChangeText = function(text) {
				      if(text){
				      	sco.show =true;
				      }else{
				      	sco.show =false;
				      }
				      sco.setState({time:fac.time()});
	    			};

	    		sco.com_editadd.url='base/login_noverify';	
	    		
	    		sco.com_editadd.before = function(sco) {
	    			
					};
				sco.com_editadd.done = function(re, sco) {
					debugger
					
				};

			}
			
		},

		"Loginphone":{
			init:function(sco) {

				    sco.show =false;
				    sco.mimashow=true;
				    sco.disable= true;
				    sco.value='';
				sco.showMima=function() {
			        sco.mimashow=!sco.mimashow;
			        sco.setState({time:fac.time()});
			      };
				sco.onChangeText = function(text) {
				      if(text){
				      	sco.show =true;
				      	sco.disable= false;
				      }else{
				      	sco.show =false;
				      	sco.disable= true;
				      }
				      sco.value=text;
				      sco.setState({time:fac.time()});
				      sco.com_editadd.params.username=sco.value;
				      sco.com_editadd.params.check=1;
	    			};
	    		sco.com_editadd.url='base/getphoneverifycode';	
	    		sco.com_editadd.before = function(sco) {
	    			
					};
				sco.com_editadd.done = function(re, sco) {
					sco.showMima();
				};
			}
			
		},

		"Lrestpsdtwo":{
			init:function(sco) {

				    sco.vcode = '';
				    sco.disable= true;
			// 验证码输入框
			sco._vcodeInputView =function() {	
			    let inputs = [];
			    let lengt = 4;
			    for (let i = 0; i < lengt; i++) {
			    inputs.push(
			        <View style={styles.vcodeitem} key={'vcodeInput' + i} square>
			            <Text style={styles.vcodeitemtext}>{sco.vcode.substr(i,1)}</Text>    
			        </View>
			        )
			    };
			    return  <View style={styles.vcodeinp}>
    			<TextInput style={{position:'absolute',opacity:0}} 
    			autoFocus={true} keyboardType="number-pad" keyboardAppearance="light"
	            onChangeText={(text)=>{sco._setVerificationCode(text)}}
	            maxLength={4} />	
		        {inputs}
		        </View>
			};

			sco._setVerificationCode =function(text){
				sco.vcode = text;
				if(text.length==4){
					sco.disable = false;
				}else{
					sco.disable = true;
				}
				
		      	sco.setState({time:fac.time()});
			};

			// 重新获取验证码
			sco.start=true;
			sco.starTime=function(){
				var date=60;
				sco.lastTime='(60s)'
				sco.start=false;
				sco.setState({time:fac.time()});
				sco.timer=setInterval(function(){
					if(date != 0) {
		                sco.lastTime='('+(date-1)+'s)';
		            	date--;
		            } else{
		            	clearInterval(sco.timer);
		                sco.lastTime='';
		                sco.start=true;
		                date=60;
		            }
		            sco.setState({time:fac.time()});
				},1000);
			}

				sco.com_editadd.url='base/check_phoneverify'
				sco.com_editadd.before = function(sco) {
					sco.com_editadd.params.code=sco.vcode;

				};
				sco.com_editadd.done = function(re,sco) {
					if (re.code==1) {
						sco.ysnav.navigate('Lrestpsdthree',{data});
					}else{
						alert(re.msg);
					}
					
					console.log(sco.com_detail.params.code);
				};
			}
			
		},

		"Register":{
			init:function(sco) {
				//     sco.show =false;
				//     sco.disable= true;

    			sco.com_editadd.url='base/getphoneverifycode';
    			
    			sco.com_editadd.before = function(sco) {
    				sco.com_editadd.params.getcode=1;
    				sco.com_editadd.params.check=1;
					};
				sco.com_editadd.done = function(re,sco) {
					data=re.arr.username;
					var myreg = /^1[34578]\d{9}$/;
					
					if(data == '') {
			              alert('手机号码不能为空');
			              return false;
			            } else if(data.length != 11) {
			              alert('请输入有效的手机号码');
			              return false;
			            } else if(!myreg.test(data)) {
			              alert('请输入有效的手机号码');
			              return false;
			            }else{
			            	sco.ysnav.navigate('Lrestpsdtwo',{data});
			            }
				};
				// fac.ysfetch(sco,'com_editadd2');

			}
			
		},

		"Lrestpsdthree":{
			init:function(sco) {
			sco.mimashow=true;
			sco.disable= true;
			sco.showMima=function() {
		        sco.mimashow=!sco.mimashow;
		        sco.setState({time:fac.time()});
		      };
			
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

		"Lrestpsdone":{
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
		// 工程
		"Theproject":{
			init:function(sco) {
			sco.show =false;
			sco.language='旭日领域商住楼';
			sco.onListShow = function() {
			      sco.show =!sco.show;
			      sco.setState({time:fac.time()});
    			};
    		
			}
			
		},

		"Tprojectdetail":{
			init:function(sco) {
			 sco.show =false;
			 sco.onListShow = function() {
			      sco.show =!sco.show;
			      sco.setState({time:fac.time()});
    			};
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

		"Basklist":{
			init:function(sco) {
                
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

		"Findworklist":{
			init:function(sco) {
				// sco.com_list_page.params = {debug:1,debugkey:"c85",name:"demo测试接口"}; 
				// sco.comtime('com_list_page');
				
			sco.show =false;
			sco.onListShow = function() {
			      sco.show =!sco.show;
			      sco.setState({time:fac.time()});
    			};
    		
			}
			
		},

		"PositionPage":{
			init:function(sco) {
				sco.com_list.url = 'auth/onnot_inline';
				sco.com_list.params = {type:0};				
				sco.com_list.done = function(re,sco){
				   	debugger;
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
				sco.SC={
					Number:3,
					FullText:'查看全文',
					data:[
					{key: '一个小小',id:0,url:require('../public/img/点赞03.png')}, 
					{key: 'ui设计师',id:1,url:require('../public/img/点赞03.png')},
					{key: '前端工程师',id:2,url:require('../public/img/点赞03.png')},
					{key: 'we',id:3,url:require('../public/img/点赞03.png')},
					{key: 'va',id:4,url:require('../public/img/点赞03.png')}],
				};
				sco.ChangeNumber=function(){
					if (sco.SC.FullText=='查看全文') {
						sco.SC.Number=20;
						sco.SC.FullText='收起';
					}else{
						sco.SC.Number=3;
						sco.SC.FullText='查看全文';
					}
					sco.setState({time:fac.time()});
				};
			}, 
		},	

		"Builddetail":{
			init:function(sco) {
				sco.SCC={
					data:[
					{key: '一个小小',id:0,url:require('../public/img/点赞03.png')}, 
					{key: 'ui设计师',id:1,url:require('../public/img/点赞03.png')},
					{key: '前端工程师',id:2,url:require('../public/img/点赞03.png')},
					{key: 'we',id:3,url:require('../public/img/点赞03.png')},
					{key: 'va',id:4,url:require('../public/img/点赞03.png')}],
				};
					
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

		"Personal":{
			init:function(sco) {
				//获取个人欣喜
				sco.com_detail.url = 'auth/userinfo';
				sco.com_detail.params = {debug:1,debugkey:"c85",name:"demo测试接口"};
				sco.com_detail.done = function(re,sco) {
					console.log(re);
					debugger; 
				}
				sco.comtime('com_detail');
				//退出登录
				sco.com_lgout.url = 'base/lgout';
				sco.com_lgout.params = {debug:1,debugkey:"c85",name:"demo测试接口"};
				sco.com_lgout.done = function(re,sco) {
					console.log(re);
					debugger; 
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
	  
}

}
 