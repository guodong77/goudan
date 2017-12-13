define('fac',['jquery','angularjs','YS'],function(require, exports, module) {  
 var myfact = angular.module("myfact", []);
  // myfact.config(function($httpProvider) {
  //     $httpProvider.defaults.transformRequest = function(obj) {
  //         var str = [];
  //         for (var p in obj) {
  //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  //         }
  //         return str.join("&");
  //     };
  //     $httpProvider.defaults.headers.post = {
  //       "Access-Control-Allow-Credentials": true,
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //     };
  // });




/*第一个函数加工厂*/
 myfact.factory('fac',['$http',function($http){
var f = {
  chklogin:function(fun,da){
         if(da.code===-1){
               YS('layer',function(){layer.msg('请重新登陆！',{icon:0});});
               setTimeout(function(){
                window.location.href = "./login.html";
               },1000);
            }else{
              fun(da);
            }
  },
  get:function (sendurl ,senddata ,callback) {  
 $http({method: 'GET', params: senddata, url: sendurl})
                    .success(function (data, status, headers, config) { 
                      f.chklogin(callback,data);
                    }).
                    error(function (data, status, headers, config) {
                       var reply = {'code': "0",'msg':'请求错误','data':data};
                       YS('layer',function(){layer.msg('网络超时！',{icon:0,time: 2000});});
                    });
            }, 
  post:function (sendurl ,senddata ,callback) {  
                $http({method: 'POST',  data: senddata, url: sendurl})
                    .success(function (data, status, headers, config) {                        
                      f.chklogin(callback,data);
                    }).
                    error(function (data, status, headers, config) {
                        var reply = {'code': "0",'msg':'请求错误','data':data};
                         YS('layer',function(){layer.msg('网络超时！',{icon:0,time: 2000});});
                    });
                    }, 
coverobj:function(o,n,override){
		//合并两个对象；override 是新对象n 是否覆盖老对象o；
	   for(var p in n)if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[p]=n[p];
	   	return o;
	},
  trim:function(str,is_global){ 
          var result = str.replace(/(^\s+)|(\s+$)/g,"");
          var resultt = is_global.toLowerCase()=="g"?result.replace(/\s/g,""):result; 
              return resultt;
},
setCookie:function(name,value){
         //写cookies 
    var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
    },
getCookie:function(cname){
         //读取cookies 
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
    },
delCookie:function(name){ 
        //删除cookies 
        f.setCookie(name, "", -1);  
    },
numtotime:function(time){
    //数字转换成时间格式
    var retime = '';
		if(parseInt(time)>0){
		        var date = new Date(time); 
		            var year = date.getYear() + 1900;
		            var month = date.getMonth()+1;
		            month = month<10?'0'+month:month;
		            var datev = date.getDate();
		            datev = datev<10?'0'+datev:datev;
		            return year + '-' + month + '-' + datev;
		}else{
		return retime;
}
    
  }, 
getDatezh:function(tm){ 
    /*将时间戳转成 全时间格式2015年3月15日 下午2:57:37*/
    var tt=new Date(parseInt(tm)).toLocaleString();
    return tt; 
    },
getDateen:function(tm){ 
		/*将时间戳转成 全时间格式转换成  2011-3-16 16:50:43 */   
     if(tm===0){return ''; }
    var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return tt; 
    }, 
time:function(str){ 
  return !str?(new Date()).valueOf():(new Date(str)).valueOf(); 
},
seturl:function(part){
//路径ysmenu_list
var path = config.url[part].url;
var len = path.split('/').length;
//接口层级，如  a/b 就是root2； a/b/c 就是root3;
var rooturl = 'root'+len;
//真实路径
var url = window[rooturl] + path;
 
//测试路径
// if(location.href.split('.')[0]=='http://ys'){
//   len = part.split('_').length;
//   rooturl = 'root'+len;
//   url =window[rooturl] + part.split('_').join('/');
// }




//组合发送数据，如果有定义，则拿定义的数据；
var datakey = part + 'Data'; 

//组合执行函数，如果有定义，则拿定义的函数；
var funkey = part + 'Fun';

//监听对象
var timestamp = part+'Time';

  var p = {
      url:url,
      dkey:datakey,
      fkey:funkey,
      tkey:timestamp,
      load:config.url[part].load
      };
  return p;
},
/*sco,必填  是 $scope
part,必填   模块名字，且代表接口数据接收
sdata,  发送的数据，从控制器的$socpe.partData
fun,   运行完后执行的函数，从控制器的$socpe.partFun
timestamp, 从控制器的$socpe.partTime
*/
get_data_watch:function(sco,part){
if(!sco)return;
if(!part)return; 
var p = f.seturl(part); 

var timestamp = p.tkey; 
  sco.$watch(timestamp, function() {  
        if(!sco[timestamp].time)return;
        f.load(1);  
        f.get(p.url,sco[p.dkey],function(re){
         console.log({aurl:part,respone:re}); 
            sco[part] = {};
            if(re.code=='1'){
              sco[part]= re.data;
            }
           if(typeof(sco[p.fkey])==="function"){sco[p.fkey](re,sco);} 
        f.load(0);
        });
    }, true); 
},
/*sco,必填  是 $scope
part,必填   模块名字，且代表接口数据接收
sdata,  发送的数据，从控制器的$socpe.partData
fun,   运行完后执行的函数，从控制器的$socpe.partFun
timestamp, 从控制器的$socpe.partTime
*/
get_data_watch_page:function(sco,part){
if(!sco)return;
if(!part)return; 
var p = f.seturl(part); 
var page = config.url[part].pageid||'page';

var timestamp = p.tkey; 
  sco.$watch(timestamp, function() {  
        if(!sco[timestamp].time)return;
       if(p.load){f.load(1);}
        f.get(p.url,sco[p.dkey],function(re){
         console.log({aurl:part,respone:re}); 
            sco[part] = {};
            if(re.code=='1'){
              sco[part]= re.data; 

laypage({
    cont: page, //容器。值支持id名、原生dom对象，jquery对象,
    pages: re.data.pages, //总页数
    skin: 'molv', //皮肤
    first: 1, //将首页显示为数字1,。若不显示，设置false即可
    //last: 11, 将尾页显示为总页数。若不显示，设置false即可
    curr: sco[p.dkey].nowpage || 1, //当前页
    prev: '<', //若不显示，设置false即可
    next: '>', //若不显示，设置false即可
    jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
          sco[p.dkey].nowpage = obj.curr;
          sco[timestamp].time = f.time();
          sco.$apply();
                }
            }
 
});



            }
           if(typeof(sco[p.fkey])==="function"){sco[p.fkey](re,sco);} 
        if(p.load){f.load(0);} 
        });
    }, true); 
},
/*sco,必填  是 $scope
part,必填   模块名字，且代表接口数据接收
sdata,  发送的数据，从控制器的$socpe.partData
fun,   运行完后执行的函数，从控制器的$socpe.partFun 
*/
 

get_data:function(sco,part){
if(!sco)return;
if(!part)return; 
var p = f.seturl(part);  
    if(p.load){f.load(1);}
    f.get(p.url,sco[p.dkey],function(re){ 
       console.log({aurl:part,respone:re});
            sco[part] = {};
            if(re.code=='1'){
              sco[part]= re.data;
            }
           if(typeof(sco[p.fkey])==="function"){sco[p.fkey](re,sco);}  
        if(p.load){f.load(0);}
        });

 
     
},
/*sco,必填  是 $scope
part,必填   模块名字，且代表接口数据接收
sdata,  发送的数据，从控制器的$socpe.partData
fun,   运行完后执行的函数，从控制器的$socpe.partFun
timestamp, 从控制器的$socpe.partTime
*/
post_data_watch:function(sco,part){
if(!sco)return;
if(!part)return;

var p = f.seturl(part); 

var timestamp = p.tkey;

  sco.$watch(timestamp, function() {  
        if(!sco[timestamp].time)return; 
       if(p.load){f.load(1);}
        f.post(p.url,sco[p.dkey],function(re){ 
           console.log({aurl:part,respone:re});
            sco[part] = {};
            if(re.code=='1'){
              sco[part]= re.data;
            }
           if(typeof(sco[p.fkey])==="function"){sco[p.fkey](re,sco);} 
       if(p.load){f.load(0);}
        });
    }, true); 
},

post_data_watch_page:function(sco,part){
if(!sco)return;
if(!part)return; 
var p = f.seturl(part); 
var page = config.url[part].pageid||'page';

var timestamp = p.tkey; 
  sco.$watch(timestamp, function() {  
        if(!sco[timestamp].time)return;
        if(p.load){f.load(1);} 
        f.post(p.url,sco[p.dkey],function(re){
         console.log({aurl:part,respone:re}); 
            sco[part] = {};
            if(re.code=='1'){
              sco[part]= re.data; 

laypage({
    cont: page, //容器。值支持id名、原生dom对象，jquery对象,
    pages: re.data.pages, //总页数
    skin: 'molv', //皮肤
    first: 1, //将首页显示为数字1,。若不显示，设置false即可
    //last: 11, 将尾页显示为总页数。若不显示，设置false即可
    curr: sco[p.dkey].nowpage || 1, //当前页
    prev: '<', //若不显示，设置false即可
    next: '>', //若不显示，设置false即可
    jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
          sco[p.dkey].nowpage = obj.curr;
          sco[timestamp].time = f.time();
          sco.$apply();
                }
            }
 
});



            }
           if(typeof(sco[p.fkey])==="function"){sco[p.fkey](re,sco);} 
        if(p.load){f.load(0);}
        });
    }, true); 
},
/*sco,必填  是 $scope
part,必填   模块名字，且代表接口数据接收
sdata,  发送的数据，从控制器的$socpe.partData
fun,   运行完后执行的函数，从控制器的$socpe.partFun 
*/
post_data:function(sco,part){
if(!sco)return;
if(!part)return; 
var p = f.seturl(part); 
if(p.load){f.load(1);} 

f.post(p.url,sco[p.dkey],function(re){
   console.log({aurl:part,respone:re}); 
            sco[part] = {};
            if(re.code=='1'){
              sco[part]= re.data;
            }
          
           if(typeof(sco[p.fkey])==="function"){sco[p.fkey](re,sco);}  
        if(p.load){f.load(0);}
        });
     
},
lmsg:function(re) {
  var type = re.code == 1 ? 1 : 2;
  YS('layer',function() {
      layer.msg(re.msg,{icon:type});
  });
},
msg:function(re) {
var type = re.code == 1 ? 'success' : 'error';
YS('toastr', function() { 
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-bottom-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  toastr[type](re.msg);
});
},
getscope_byid: function(sc, id) {
    /*递归，找到$id为 num 的scope.并返回；*/
    if (sc.$id == id) {
      return sc;
    } else {
      return f.getscope_byid(sc.$parent, id);
    }
  },
  //选择图片预览
  preview:function(file,id){  
 var prevDiv = document.getElementById(id);  
 if (file.files && file.files[0]){  
    var reader = new FileReader();  
     reader.onload = function(evt){  
     prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';  
    };    
        reader.readAsDataURL(file.files[0]);  
}else{  
 prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';  
 }  
 },
  getrandom:function(Min,Max){   
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
},
load:function(num){
  var $toast = $('#loader');
    // if ($toast.css('display') != 'none') return; 
  var a = num?$toast.fadeIn(100):$toast.fadeOut(500);
            
            
},
checklogin:function(data){
  if(data.code==2006){
         layer.msg(data.msg+',2秒后跳转登录页面；');
         setTimeout(function(){
          window.location.href = 'login.html';
         },2000);
    }
},
setstore:function(key,value){
value = typeof(value) ==='object'?JSON.stringify(value):value;
localStorage.setItem(key,value);
 return true;
},
getstore:function(key){
      var tem = '';
      try {tem = localStorage.getItem(key);
      tem = JSON.parse(tem); 
      }catch(e){tem = localStorage.getItem(key);}
      return tem; 
},
unsetstore:function(key){ localStorage.removeItem(key); return true;},
addmsg:function(sco,re,key){
       if(re.code==1){
        layer.closeAll();
          layer.msg(re.msg,{'icon':1}); 
             sco.temdata.codeid = re.data.codeid;
             sco[key].datalist.unshift(sco.temdata); 
          }else{
              layer.msg(re.msg,{'icon':2}); 
          }
  },
  //验证手机号码是否正确，正确返回true  错误返回false；
 testphone: function (num) {
                var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|145|147|159|153)+\d{8})$/;
                if (!myreg.test(num)) {
                    return false;
                } else {
                    return true;
                }
            },
check:function(id,rule,callback){ 
    YS('validate',function(){ 

//验证手机
$.validator.addMethod("ismobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

      $.validator.setDefaults({
          submitHandler: callback
      });


      $(id).validate(rule);
    });

// {
//       rules: {
//         firstname: "required",
//         lastname: "required",
//         username: {
//           required: true,
//           minlength: 2
//         },
//         password: {
//           required: true,
//           minlength: 5
//         },
//         confirm_password: {
//           required: true,
//           minlength: 5,
//           equalTo: "#password"
//         },
//         email: {
//           required: true,
//           email: true
//         },
//         "topic[]": {
//           required: "#newsletter:checked",
//           minlength: 2
//         },
//         agree: "required"
//       },
      
//       messages: {
//         firstname: "请输入您的名字",
//         lastname: "请输入您的姓氏",
//         username: {
//           required: "请输入用户名",
//           minlength: "用户名必需由两个字母组成"
//         },
//         password: {
//           required: "请输入密码",
//           minlength: "密码长度不能小于 5 个字母"
//         },
//         confirm_password: {
//           required: "请输入密码",
//           minlength: "密码长度不能小于 5 个字母",
//           equalTo: "两次密码输入不一致"
//         },
//         email: "请输入一个正确的邮箱",
//         agree: "请接受我们的声明",
//         topic: "请选择两个主题"
//       }
//   }




},  
checkx:function(id,rule) {
  YS('validationEngine',function(){ 
    // var rule = { 
    //   'required': {
    //     'message': '这里必须填写啦！'
    //   }
    //   ,'custom[url]': {
    //     'message': '这个错误信息不会被调用哦，因为下面有更高级的覆盖了我呢！'
    //   },
    //   '#url' : {
    //     'custom[url]': {
    //       'message': '这里要填写网址哦！（优先取选择器和验证规则的提示内容）'
    //     }
    //   },
    //   '#number': {
    //     'min': {
    //       'message': '这个数值……我不能接受'
    //     }
    //   },
    //   '.class_url': {
    //     'custom[url]': {
    //       'message': '这个错误信息不会被调用，因为它是使用 class 的选择器，' +
    //           '而当前存在更高级的 id 选择器。'
    //     }
    //   },
    //   '.class_req': {
    //     'required': {
    //       'message': '必填（这是使用 class 选择器定义的，它的优先级要比规则的高）'
    //     }
    //   }
    // }
$(id).validationEngine({
    'custom_error_messages':rule, 
  }); 
});
},
disb:function(obj,time) {
  var t = time||2000;
  obj.prop('disabled',true);
  setTimeout(function() {
  obj.prop('disabled',false);
  },t);
   
},



























  //发送短信
  sendphone:function(obj){
      var i =59; 
      obj.attr("disabled","true").css("opacity",0.7);
      var int = setInterval(function(){
          if (i === 0) {
              obj.val('发送验证码');
              obj.removeAttr("disabled").css("opacity",1);
              clearInterval(int);
              return false;
          }
          obj.val(''+i+'秒重发');
          i--;
      },1000); 
  },
  //验证码
  yzm:function(){
    var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
    var str = '';
    for(var i = 0 ; i < 4 ; i ++ )
      str += ''+arr[Math.floor(Math.random() * arr.length)];
    return str;
  },
  //表单验证是否填写完整
  winprove:function(obj,msgdata,noprove){
    var str = JSON.stringify(obj);
    str = str.replace(/{/,""); 
    str = str.replace(/}/,"");
    str = str.replace(/"/g,"");
    var array = str.split(",");
    for (var i = 0; i < array.length; i++) {
      var newarr = array[i].split(":");
      if (newarr[1]==='') {
       if (noprove) {//过滤一些字段不需要验证
        var y = 0;
        for (var j = 0; j < noprove.length; j++) {
           if (newarr[0]== noprove[j] ) {y++;}
        }
        if (y===0) {layer.msg(msgdata[i]+'未填写');return false;}
        }else{ //验证所有字段
           layer.msg(msgdata[i]+'未填写');return false;      
        }       
      }         
    }   
  },

//横道图预览打印
isLeapYear:function(Year) {
      if (((Year % 4)===0) && ((Year % 100)!==0) || ((Year % 400)===0)) {
      return true;
      } else { return false; }
    },
      //数字转换成时间格式
  monlastday:function(time){
  var retime = '';
if(parseInt(time)>0){
    var date = new Date(time*1000); 
      var year = date.getYear() + 1900;
      var month = date.getMonth()+1;
      month = month<10?'0'+month:month;
      date = date.getDate();
      date = date<10?'0'+date:date;
      ymd = year + '-' + month + '-' + date;
var lastdaty = f.getyuemo(ymd);
console.log(year + '-' + month + '-' + lastdaty);
      return year + '-' + month + '-' + lastdaty;
}else{
return retime;
}
  
  },
// 仅仅获取月份
 getmonthcn:function(time){
        var retime = '';
if(parseInt(time)>0){
        var date = new Date(time*1000); 
            var year = date.getYear() + 1900;
            var month = date.getMonth()+1;
            month = month<10?'0'+month:month;
            date = date.getDate();
            date = date<10?'0'+date:date;
            return year + '年' + month + '月';
}else{
return retime;
}
} , 


   getyuemo:function(str){

  var arr = [];
  arr = str.split('-');
  arr[1] = parseInt(arr[1]);
  if(arr[1]==1||arr[1]==3||arr[1]==5||arr[1]==7||arr[1]==8||arr[1]==10||arr[1]==12){return '31';}
  if(arr[1]==4||arr[1]==6||arr[1]==9||arr[1]==11){return '30';}
  if(f.isLeapYear(arr[0])){return '29';}else{return '28';}
  

},
/**
         * 获取下一个月
         *
         * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
         */        
         getNextMonth:function(date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var year2 = year;
            var month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) { 
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
        
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        },
//计算两个日期间有几个月
 getMonths:function(date1 , date2){
    //用-分成数组
    date1 = date1.split("-");
    date2 = date2.split("-");
    //获取年,月数
    var year1 = parseInt(date1[0]);
        month1 = parseInt(date1[1]);
        year2 = parseInt(date2[0]); 
        month2 = parseInt(date2[1]);
        //通过年,月差计算月份差
        months = (year2 - year1) * 12 + (month2-month1) + 1;
    return months;    
},
   //数字转换成时间格式
  monfirstday:function(time){
  var retime = '';
if(parseInt(time)>0){
    var date = new Date(time*1000); 
      var year = date.getYear() + 1900;
      var month = date.getMonth()+1;
      month = month<10?'0'+month:month;
      date = date.getDate();
      date = date<10?'0'+date:date;
      console.log(year + '-' + month + '-' + '01');
      return year + '-' + month + '-' + '01';
}else{
return retime;
}
  
  }, 
//时间转换成数字格式 
 timetostr:function(time){
   var a = time.split("-");
  var year = parseInt(a[0],10);
  var month = parseInt(a[1],10)-1;
  var day = parseInt(a[2],10);
  //alert(year+'nian'+month+'yue'+day+'ri');
  
  
  var date = new Date(year,month,day);
  //alert(date.getTime());
  return date.getTime();
   },
  strtotime:function(time){
  var retime = '';
if(parseInt(time)>0){
    var date = new Date(time*1000); 
      var year = date.getYear() + 1900;
      var month = date.getMonth()+1;
      month = month<10?'0'+month:month;
      date = date.getDate();
      date = date<10?'0'+date:date;
      return year + '-' + month + '-' + date;
}else{
return retime;
}
  
  },
// zlkey:function(arr,key) {
//   var codeids = [];
//    arr.map(function(elm) {
//       if(elm[key]==1){codeids.push(elm.codeid)}
//    });
//    f.setstore('codeids',codeids);
// },



 //更多的自定义函数

//建立一個可存取到該file的url
getObjectURL:function(file) {
    var url = null ; 
    if (window.createObjectURL!==undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!==undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!==undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
},

//获取地址栏参数
    GetQueryString:function(name)
   {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!==null){return decodeURI(r[2]);} return '';
   },



//md5加密
 MD5:function(sMessage) {
  function RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    } else return (lResult ^ lX8 ^ lY8);
  }
  function F(x, y, z) {
    return (x & y) | ((~x) & z);
  }
  function G(x, y, z) {
    return (x & z) | (y & (~z));
  }
  function H(x, y, z) {
    return (x ^ y ^ z);
  }
  function I(x, y, z) {
    return (y ^ (x | (~z)));
  }
  function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function ConvertToWordArray(sMessage) {
    var lWordCount;
    var lMessageLength = sMessage.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function WordToHex(lValue) {
    var WordToHexValue = "",
    WordToHexValue_temp = "",
    lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2)
    }
    return WordToHexValue;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d
  var S11 = 7,
  S12 = 12,
  S13 = 17,
  S14 = 22;
  var S21 = 5,
  S22 = 9,
  S23 = 14,
  S24 = 20;
  var S31 = 4,
  S32 = 11,
  S33 = 16,
  S34 = 23;
  var S41 = 6,
  S42 = 10,
  S43 = 15,
  S44 = 21;
  x = ConvertToWordArray(sMessage);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }
  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
  return temp.toLowerCase();
}














	
 };

 return f; 
}]); 
});