define('main',['jquery','angularjs'],function(require, exports, module) {  
 var myctrl = angular.module("main", ["RongWebIMWidget"]); 
 

//过滤集合 
 myctrl.filter("htmlfil",["$sce",function($sce){
    //过滤html    
        return function(text){
                 return $sce.trustAsHtml(text); 
        };
    }]);  
     
//标准过滤格式    
  myctrl.filter("myfil",["fac",function(fac){ 
        return function(data,item){ 
            var newarr = [];
            angular.forEach(data, function(value, key){
                if(value.pid==item){
                    newarr.push(value);
                }
            }); 
                return newarr; 
        };
    }]);
    
//原材过滤
  // myctrl.filter("ycfil",["fac",function(fac){ 
  //       return function(data,item){   
  //           var newarr = [];
  //           angular.forEach(data, function(value, key){
  //               if(value.yctype==item){
  //                   newarr.push(value);
  //               }
  //           }); 
  //               return newarr; 
  //       };
  //   }]);
//同条件养护过滤
  myctrl.filter("planfil",["fac",function(fac){ 
        return function(data,item){ 
            var newarr = [];
 var key = item+'ornot';
 angular.forEach(data, function(value, k){
        if(value[key]=='1'){newarr.push(value);
        }});  
            return newarr; 
        };
    }]);



//同条件养护过滤  进度管理的 切换当前状态
  myctrl.filter("workfil",["fac",function(fac){ 
        return function(data,item){ 
            var newarr = [];
 if(item=='0'||item=='3'){
    return data;
  }

  if(item=='1'){
     angular.forEach(data, function(value, k){ 
        if(value.fid=='3'){newarr.push(value);
        }});  
    return newarr;
  }

    if(item=='2'){
     angular.forEach(data, function(value, k){ 
        if(value.fid!='3'){newarr.push(value);
        }});  
    return newarr;
  }


 
        };
    }]);


//------------------------------------------------------------------------------------------
  
//一页面一个控制器 1
myctrl.controller('main_ctrl', ['$scope','fac',function($scope,fac){ 
 

 //window弹窗
$scope.win = {url:'',portkey:'',extendone:'',extendtwo:'',extendthree:'',extname:''}; 
$scope.maper = {'one':'',oneurl:'',two:'',twourl:'',topurl:''};
//省市是否显示保存
$scope.litsave = 0;
//进度管理，显示状态
$scope.isshow = '1'; 
//进度管理默认显示结构 基础 主体 装饰装修 
$scope.showtype = '0';

//漏送是否显示
$scope.lsshow = '1';

$scope.winpop = {url:'',datalist:''};

//临时数据
$scope.zllistdata = {list:[],name:'',id:'',t:'',zf:""};


//子单位 标养 同养 抗渗等列表；
$scope.typelist = config.typelist;
//原材 钢筋 水泥 砂 砖 等列表
$scope.yctypelist = config.yctypelist;
//分部 基础 主体 装修 等列表
$scope.ftypelist = config.ftypelist;
//强度列表 C15 C20 等列表
$scope.qdypelist = config.qdypelist;
//砂浆强度列表 M15 C20 等列表
$scope.sjtypelist = config.sjtypelist;
//抗渗 列表  
$scope.kstypelist = config.kstypelist;
YS('form');
YS('shCircleLoader',function() {
  $('#loader').shCircleLoader({color:'#2AA2D4'});
});
 YS('laypage');
YS('bootstrap');
 YS('layer'); 
 setTimeout(function() {
    YS("getLodop");  
 },2000);
 
YS("tableExport");
 YS('laydate',{},'molv');

 $scope.body = {url:"",zlurl:'',tableurl:''};
//监听hash变化，做页面跳转
window.onhashchange = function() { 
    setmenu($scope,location.href,1); 
};

//业务2,获取侧边栏目数据setmenu边就拿得到，如果没定义，函数那边就当作没有定义来处理； 
$scope.com_logoutFun = function(re,sco){
	if(re.code==1){
		layer.msg('退出成功',{'icon':1});
    //localStorage.clear();
    // QC.Login.signOut();
		setTimeout(function(){window.location.href='./login.html';},1000);
	}
 	
};
$scope.com_logoutTime = {time:0,def:0};
fac.post_data_watch($scope,'com_logout');

//业务3：获取省
$scope.com_provinceTime = {time:0,def:1};
fac.post_data($scope,'com_province');
//业务4：获取市
$scope.com_cityData = {pid:''};
$scope.com_cityTime = {time:0,def:0};
fac.post_data_watch($scope,'com_city');

//业务5：获取侧边栏
$scope.ysmenu_listTime = {time:0,def:1};
$scope.ysmenu_listFun = function(re) {
    setmenu($scope,location.href,0);
};
fac.post_data($scope,'ysmenu_list');
 
//获取个人信息 
$scope.com_infoFun = function(re,sco) {
  setTimeout(function(){
        window._bd_share_config = {
        common:{
          onBeforeClick:function(cmd,config){
              // console.log(cmd,config);
          },
          onAfterClick:function(cmd){
            $scope.com_shareData = {type:cmd};
            $scope.com_shareTime.time = fac.time();
            $scope.$apply();
          }
        },  
          share : [{
              "tag":"share_1",
              "bdSize" : 24,
              bdText : '河狸建筑工程信息化平台,集成功能：送检计划，送检汇总，进度管理，漏送统计及提示，送检异常统计，城市温度采集，同养温度计算及累计，形象进度图，横道图，资料打印等功能。手机微信关注：河狸建筑，让你随时随地了解现场及送检进度',  
              bdDesc : '河狸建筑工程信息化平台,集成功能：送检计划，送检汇总，进度管理，漏送统计及提示，送检异常统计，城市温度采集，同养温度计算及累计，形象进度图，横道图，资料打印等功能。手机微信关注：河狸建筑，让你随时随地了解现场及送检进度',  
              bdUrl: 'http://www.ysjianzhu.com/index.html?from='+re.data.tuijian+'&a=123',
              bdPic: 'http://www.ysjianzhu.com/images/ysshare.jpg'
          }],     
        //河狸建筑工程信息化平台,专门为资料员量身打造的工程管理系统，集成功能：送检计划，送检汇总，进度管理，漏送统计及提示，送检异常统计，城市温度采集，同养温度计算及累计，形象进度图，横道图，资料打印等功能。手机微信关注河狸建筑建筑，让你随时随地了解现场及送检进度，是资料员得力助手，为您提供贴心服务。河狸建筑在手，工程无忧！      
      }
      with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];

    
  },1000);
}

fac.get_data($scope,'com_info');

 
//公共业务6：分享
$scope.com_shareData = {type:''};
$scope.com_shareTime = {time:0,def:0};
fac.post_data_watch($scope,'com_share');

//公共业务7：建议
$scope.com_feedData = {content:'',qq:''};
$scope.com_feedTime = {time:0,def:0};
fac.post_data_watch($scope,'com_feed');


//业务8：温度列表
$scope.com_wenduData = {codeid:''};
$scope.com_wenduTime = {time:0,def:0};
fac.post_data_watch($scope,'com_wendu');

//设置左边栏目
function setmenu(sco,url,type) {
var path = url.split('#')[1];
path = path === undefined ? '/system/city' : path;
if(path){
    var toppath = path.split('/')[1];
    var chlpath = path.split('/')[2];
    var lastchlpath = '';
    var toptitle='';
    var lasttitle='';
    //设置当前
    angular.forEach(sco.ysmenu_list, function(value, key){
        if(value.tap==toppath){
          value.now='active';toptitle=value.title;
          sco.maper.topurl = toppath+'/'+value.chl[0].tap;
          console.log(sco.maper.topurl);
        }else{
          value.now=''; 
      }  
        if(chlpath){
            angular.forEach(value.chl, function(v, k){ 
                if(v.tap == chlpath){v.now='active';lasttitle=v.title;}else{v.now='';}
            });
            lastchlpath = chlpath;
        }else{
           if(value.tap==toppath){
                 angular.forEach(value.chl, function(v, k){
                            v.now = '';
                        });
                        value.chl[0].now = 'active';
                        lastchlpath = value.chl[0].tap;
                        lasttitle = value.chl[0].title;
           }  
           
        }
    });
    //弹窗置空
    sco.win.url = '';
    //bodyurl地址
    sco.body.url = './admin/html/'+toppath+'/'+lastchlpath+'.html';
    // sco.body.url = './html/'+toppath+'/'+lastchlpath+'.html?time='+new Date().getTime();
    //面包屑  
    sco.maper.one = toptitle;
    sco.maper.oneurl = toppath;

    sco.maper.two = lasttitle;
    sco.maper.twourl = chlpath;
    var prname = fac.getstore('prname');
    sco.maper.prname = prname?prname:''; 
console.log(sco.maper);
    var ax = type==1?sco.$apply():''; 
}   
}




$scope.winTime = {time:''}; 
$scope.$watch('winTime', function() {
    if(!$scope.winTime.time)return; 
   
   $scope.win.url = './main/html/win/'+window.config.win[$scope.win.portkey].template+'.html?time='+fac.time(); 


}, true);
 
$scope.winData = {};
$scope.winready = function() { 
var extname = $scope.win.extname?($scope.win.extname + '-'):'';
var title =extname + window.config.win[$scope.win.portkey].title;
var width = $('.winbody').attr('w');
var height = $('.winbody').attr('h');
var late = $('.winbody').attr('late');
late = late?late:100;
  setTimeout(function(){
                layer.open({
                  type: 1,
                  title:title,
                  shadeClose:true,
                  skin: 'layui-layer-lan', //加上边框
                  area: [width, height], //宽高
                  content: $('#win')
                }); 
    },late);
      
}; 

$scope.store = function(key) {
    return fac.getstore(key);
};

//计算龄期
$scope.lq = function(btime,etime){
  var t = '';
  if(btime&&etime){ 
    t = (fac.time(etime)-fac.time(btime))/1000/86400;
  } 
    return t;
   
};

//计算当前龄期
$scope.dqlq = function(btime){
  var t = '';  
  if(btime){ 
    t = (fac.time()-fac.time(btime))/1000/86400;
  } 
    return parseInt(t); 
};

//计算已送未送 龄期
$scope.slq = function(riqi,time,ys) { 
          //已送,就两个相减，未送就今天减去日期 
         var timex = ys==1?fac.time(time):fac.time();
         var a = parseInt((timex - fac.time(riqi))/86400000); 
         a = a + '天';  
         return a;
  };

//计算层数对应的高度；
$scope.hei = function(arr,type){ 
  var jc = 0;
  var zt = 0;
  if(!arr)return;
  angular.forEach(arr,function(elm){
    if(elm.fid==3){jc+=1;}
    if(elm.fid==4){zt+=1;}
  });
  if(type==1){return jc*40;}
  if(type==2){return zt*40;}
  if(type==0){return arr.length*40;}
    
}

//同养统计
$scope.tystl = function(a,ys) {
  var c = 0;
  var str = '当前累计温度';
   if(a>=560&&a<=600){
    c=1;
    str = '温度即将到达600℃，请留意送检';
  }
  if(ys==0){
    if(a>600){c=2;
str = '规范要求同养温度必须达到600℃';
    }
    
  }
  if(ys==1){
    if(a<600){c=2;
      str = '部位温度超过600℃，还未送检，请及时送检';
    } 

  }        
  return {'str':str,stl:c};      
}
// $scope.sumtem = function(arr) {
 
//    if(arr.length==0)return '';
//     var a = 0;
//          arr.map(function(elm) {
//             a += parseFloat(elm.vtem);
//          });


//          return {'tem':a,stl:c};
// }


//监听滚动
$(window).on('scroll',function() {
  //判断是否存在
  if($('#yctip')){ 
    if($('body').scrollTop()>100&&$('#yctip').css('display')== 'none'){
      $('#yctip').fadeIn(300);
   }
   if($('body').scrollTop()<100&&$('#yctip').css('display')!= 'none'){
      $('#yctip').fadeOut(300);
   } 
  }

    if($('#sjtip')){ 
    if($('body').scrollTop()>100&&$('#sjtip').css('display')== 'none'){
      $('#sjtip').fadeIn(300);
   }
   if($('body').scrollTop()<100&&$('#sjtip').css('display')!= 'none'){
      $('#sjtip').fadeOut(300);
   } 
  }


  



   
});


}]);

myctrl.controller('login_ctrl', ['$scope','fac',function($scope,fac){ 
YS('layer'); 
YS('form'); 
//判断是否有推荐码
$scope.from = {status:fac.getstore('from'),code:fac.getstore('from')};
console.log($scope.fromCode);
//获取测试sessionid
fac.get_data($scope,'com_request');
// $scope.checked = '';  
// var usercookie = fac.getCookie('loginuser');
// if (usercookie) {
//   $('#username').val(JSON.parse(usercookie).ysusername);
//   $('#password').val(JSON.parse(usercookie).yspassword);
//   $scope.checked = true;
// }
$scope.regdata = {tel:'',yzmcode:''};
$scope.resetdata = {tel:'',yzmcode:''};
$scope.regbinddata = {tel:'',yzmcode:''}; 

//默认显示
//登陆0；注册1，重置密码2，新用户注册+绑定3，老用户绑定4；
$scope.temdata = {tap:0,nickname:''};
//从地址栏获取参数
var urltap = fac.GetQueryString('tap');
if(urltap){$scope.temdata.tap = urltap;}
$scope.temdata.nickname = fac.GetQueryString('nickname');

//查找本地
setTimeout(function(){
  var uinfo = fac.getstore('uinfo');//获取本地存储
if(uinfo){
  $('#ysusername').val(uinfo.u);//如果有存储，则把值赋给ysusername
  $('#yspassword').val(uinfo.p);//
  $('#yspassword').next().val(uinfo.p2);//
  $('#rem').prop('checked',true);

}

},300);


  

//登陆验证
if($scope.temdata.tap==0){
 fac.check('#logform',{ 
  messages:{
      ysusername: {
        required: "请输入用户名/手机号",
        minlength: "用户名/手机号不少于6位数"
      },
      yspassword: {
          required: '请输入密码',
          minlength: '密码不少于6位数'
      },
  }
 },function() {
  fac.disb($('#loginbtn'));
   $('#logform').ajaxSubmit({
    success:function(re){ 
      if(re.code==1){  
        var rem = $('#rem').is(':checked');//获取是否被选中
        var a = {u:$('#ysusername').val(),p:$('#yspassword').val(),p2:$('#yspassword').next().val()};//获取用户名 密码
        var c = rem?fac.setstore('uinfo',a):fac.unsetstore('uinfo'); //若选中则把a内容保存到uinfo，否则不保存
        window.location.href = '/main.html#/program/pro';//成功则跳转到页面
      }else{
        layer.msg(re.msg,{'icon':0});//失败则清空
      }
    },
    error:function(re) {
      layer.msg('链接超时',{'icon':0}); 
    }
   });
 });
}

//注册
 if($scope.temdata.tap==1){
 fac.check('#regform',{ 
  rules:{
    tel:{
      ismobile:true,
       remote: {
          url: "/api/ver1/Login/checkphone",     //后台处理程序
          type: "post",               //数据发送方式
          dataType: "json",           //接受数据格式   
          dataFilter: function(data) {
            var a = data=='true'?false:true;
            $('#sendcode').prop('disabled',!a);
            return a; 
                  } 
      } 
    } 
  },
  messages:{ 
       tel:{
            required : "请输入手机号",
            minlength : "确认手机不能小于11个字符",
            ismobile : "请输入有效的手机号码",
            remote: "该手机已被注册，请重新输入或直接登录" 
        },
        yzmcode : {
            required : "请输入验证码", 
            
        },
      msgcode: {
          required: '请输入手机验证码',
          digits : "验证码必须是数字",
          minlength : "验证码不少于4位",
      },
       regpsd : {
            required : "请输入密码", 
            minlength : "密码不少于6个字符",
        },
  } 
 },function() {
    fac.disb($('#regbtn'));
   $('#regform').ajaxSubmit({
    success:function(re){ 
      if(re.code==1){  
         layer.msg(re.msg,{'icon':1});
        setTimeout(function(){
          window.location.href = '/main.html#/program/pro';
        },1000);
       
      }else{
        layer.msg(re.msg,{'icon':0});
      } 
    }
 });
 });
}


//忘记密码
if($scope.temdata.tap==2){
 fac.check('#reform',{ 
  rules:{
    tel:{
      ismobile:true,
       remote: {
          url: "/api/ver1/Login/checkphone",     //后台处理程序
          type: "post",               //数据发送方式
          dataType: "json",           //接受数据格式   
          dataFilter: function(data) {
            var a = $.trim(data)=='true'?true:false;
            $('#sendcode').prop('disabled',!a);
            return a; 
                  } 
      } 
    } 
  },
  messages:{ 
       tel:{
            required : "请输入手机号",
            minlength : "确认手机不能小于11个字符",
            ismobile : "请输入有效的手机号码",
            remote: "该手机号不存在"
            
        },
        yzmcode : {
            required : "请输入验证码", 
            
        },
      msgcode: {
          required: '请输入手机验证码',
          digits : "验证码必须是数字",
          minlength : "验证码不少于4位",
      },
       repsd : {
            required : "请输入密码", 
            minlength : "密码不少于6个字符",
        },
  } 
 },function() { 
     fac.disb($('#rebtn'));
   $('#reform').ajaxSubmit({
    success:function(re){ 
      if(re.code==1){  
        layer.msg(re.msg,{'icon':1});
        setTimeout(function(){
          window.location.href = '/login.html';
        },1000);
       
      }else{
        layer.msg(re.msg,{'icon':0});
      } 
    }
 });
 });
}


//注册+绑定
if($scope.temdata.tap==3){
 fac.check('#regbindform',{ 
  rules:{
    tel:{
      ismobile:true,
       remote: {
          url: "/api/ver1/Login/checkphone",     //后台处理程序
          type: "post",               //数据发送方式
          dataType: "json",           //接受数据格式   
          dataFilter: function(data) {
            var a = data=='true'?false:true;
            $('#sendcode').prop('disabled',!a);
            return a; 
                  } 
      } 
    } 
  },
  messages:{ 
       tel:{
            required : "请输入手机号",
            minlength : "确认手机不能小于11个字符",
            ismobile : "请输入有效的手机号码",
            remote: "该手机已被注册，请选择已有账号绑定"
            
        },
        yzmcode : {
            required : "请输入验证码", 
        },
      msgcode: {
          required: '请输入手机验证码',
          digits : "验证码必须是数字",
          minlength : "验证码不少于4位",
      },
       rebpsd : {
            required : "请输入密码", 
            minlength : "密码不少于6个字符",
        },
  } 
 },function() { 
     fac.disb($('#regbindbtn'));
   $('#regbindform').ajaxSubmit({
    success:function(re){ 
      if(re.code==1){  
         layer.msg(re.msg,{'icon':1});
        setTimeout(function(){
          window.location.href = '/main.html#/program/pro';
        },2000);
       
      }else{
        layer.msg(re.msg,{'icon':0});
      } 
    }
 });
 });
}



//老用户+绑定
if($scope.temdata.tap==4){
 fac.check('#oldform',{  
  messages:{ 
       tel:{
            required : "请输入用户名/手机号",
            minlength : "用户名/手机号不少于6位数" 
        }, 
       rebpsd : {
            required : "请输入密码", 
            minlength : "密码不少于6个字符",
        },
  } 
 },function() { 
     fac.disb($('#oldbtn'));
   $('#oldform').ajaxSubmit({
    success:function(re){ 
      if(re.code==1){  
         layer.msg(re.msg,{'icon':1});
        setTimeout(function(){
          window.location.href = '/main.html#/program/pro';
        },2000);
       
      }else{
        layer.msg(re.msg,{'icon':0});
      } 
    }
 });
 });
}


//验证码

  $scope.yzm = function(){
    var url =   'index.php/captcha/new.html?height=32&width=150&font_size=18';
    fac.get(url,{},function(re){
      $('#yzm').attr('src',  'index.php/captcha/new.html?height=32&width=150&font_size=18');
    });     
  };  
  $scope.yzm();




 
}]);   





 myctrl.controller('zlhz_ctrl', ['$scope','fac',function($scope,fac){ 
 YS("getLodop"); 
$scope.tbname = fac.GetQueryString('tb');
$scope.zlhzbody = {url:'ziliao/gd/tujian/'+$scope.tbname+'.html'};

$scope.hzid = $scope.$id;
$scope.Sdata = {};
$scope.has = 0;

   $scope.$watch('Sdata',function(argument) {
   // alert(12);
 },true);

 }]);
// myctrl.directive('preview',['fac', function(fac){ 
//     return { 
//         link: function($scope, iElm, iAttrs, controller) {
//             iElm.on("click",function(){
//              var myscope = fac.getscope_byid($scope,2); 
//              myscope.winpop.url = './html/program/ganttdetail.html?'+fac.time();
//              myscope.winpop.datalist = $scope.$parent.program_gantt_worklist;
//               $scope.$apply();
//             });
//         }
//     };
// }]);

  //登录页回车事件 触发提交
  myctrl.directive('loginenter', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("keyup", function(event) {
          if (event.which === 13) {
            $("#loginbtn").trigger("click");
          }
        });
      }
    };
  }]);
  

//公共点击事件，仅仅做触发时间戳动作
myctrl.directive('combtn',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
            var key = iAttrs.combtn + 'Time';
          	$scope[key].time = fac.time();
          	$scope.$apply();
        });
    }
};
}]);

//公共点击事件，仅仅做触发时间戳动作
myctrl.directive('pswmd5',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("keyup",function(){
              var newdata = fac.MD5($(this).val());
              $(this).next().val(newdata);
        });
    }
};
}]);


myctrl.controller('com_ctrl', ['$scope','fac',function($scope,fac){ 
 //调数据 
  $scope.comctrlid = $scope.$id; 
    var path = location.href.split('#')[1];
    path = path === undefined ? '/program/pro' : path;
    if(path||path.split('/')[2]){
        var mdl =path.split('/')[1]+'_'+path.split('/')[2];
        var mymodule = window.config.port[mdl];
        for(var k in mymodule){ 
        var main = mdl+'_'+k;

        //判断是否有执行前需要 运行的函数；
        var bf = mymodule[k].before;
        if(bf){
           var ax = typeof(bf)=='function'?bf($scope):'';    
        }  

        //定义发送的数据
        if(mymodule[k].send){
           var sdkey = main+'Data';
           //初始化
          var t = mymodule[k].send.curPage?mymodule[k].send.curPage=1:'';
        $scope[sdkey] = mymodule[k].send; 
        }        

        //定义监听时间对象
        if(mymodule[k].t!==undefined){
          var tkey = main + 'Time'; 
         var a = {time:'',def:mymodule[k].t};
         a.time = a.def;
        $scope[tkey] = a;    
        }
       
        //定义拿到数据后执行的函数
        if(mymodule[k].fun){
          var fkey = main+'Fun'; 
        $scope[fkey] = mymodule[k].fun;   
        }
        
        //调用fac的方法
            var methodkey = mymodule[k].facfun;
            fac[methodkey]($scope,main); 

            console.log({name:mymodule[k].pname,"cope":$scope});
        }
        
    }
}]);


//11-20 新增控制器  资料模板
myctrl.controller('tables_ctrl', ['$scope','fac',function($scope,fac){  

var url = 'json/data.json';
var senddata='';
$scope.alldata=[];
fac.get(url,senddata,function(re){
   if (re.code>0) {
    layer.msg('请求成功!');
    $scope.alldata = re.data;
   }else{
     layer.msg('请求失败');
     return false;
   }

    
 });


}]);







//资料控制器
myctrl.controller('zl_ctrl', ['$scope','fac',function($scope,fac){  
YS('layer');

var myscope = fac.getscope_byid($scope,$scope.hzid);


var params = fac.getstore('zlval');
params.prcodeid = fac.getstore('prcodeid'); 
params.scodeid = fac.getstore('scodeid'); 
if(!params.code){
  params.code = fac.GetQueryString('tb');
}
 params.codeid =  params.codeid.join(',');

//获取资料数据
$scope.com_zlData =  params;

$scope.com_zlFun = function(re,sco) {
myscope.Sdata = re.data; 
  myscope.has = re.hasuser;


 
}
fac.post_data($scope,'com_zl');



}]);


//送检记录--控制器
myctrl.controller('jilu_ctrl', ['$scope','fac',function($scope,fac){  
YS('layer');

$scope.lsshow =1;

//获取资料数据
$scope.com_jiluData =  {codeid:fac.GetQueryString('id')};
$scope.com_jiluFun = function(re,sco) { 
 $scope.jlname = re.jlname;
}
fac.post_data($scope,'com_jilu');



}]);



//横道图作业
myctrl.controller('hdtworklist_ctrl', ['$scope','fac',function($scope,fac){ 
  console.log($scope);//localStorage.getItem('hcodeid')
  var url = root2 + 'ver1/Index/program_gantt_worklist';
  fac.post(url,{codeid:localStorage.getItem('hcodeid')},function(re){
       if(re.code==1){
         var hdata = re.data.hdata[0];
          //对列表进行排序
          re.data.datalist.sort(function(a, b){
            return  a.myorder - b.myorder;
          })         
          $scope.maindata  = re.data.datalist;  
          $scope.title = hdata.htitle;
          $scope.ftitle = hdata.ftitle;
          $scope.danwei = hdata.comtitle;
          $scope.crtime = '编制时间：'+hdata.creat_time;

          $scope.btime = hdata.btime;
          $scope.etime = hdata.etime;
          $scope.data = [];
          angular.forEach($scope.maindata,function(item){
            var dd={};
            dd.title = item.rtitle;
            dd.riqi = fac.time(item.rbtime)/1000;
            dd.time = fac.time(item.retime)/1000;
            $scope.data.push(dd);
          });

          //1、计算月份数量，组合月份数据；
          var yuechu = fac.timetostr(hdata.btime)/1000;//时间戳
          var yuemo = fac.timetostr(hdata.etime)/1000;//时间戳 
          var days = (yuemo - yuechu)/(24*60*60);
          var mons = parseInt(days/30)+1;
          var mddata = resetmon(yuechu,mons);  //格式如  [{'mon':'2015年5月','chl':[5,10,15,20……]}]
          $scope.mddata=mddata;
          //2、计算任务名称长度；
          var tlen = 0;
          angular.forEach($scope.data, function(item, key){
              if(item.title.length>tlen){
                tlen = item.title.length;
              }  
          });  

          //3、计算 子表格宽度、子表格高度  、 计算总表格宽度； 总表格高度；
          var titlew = tlen*14+14;//用字体字数乘以14px 获得任务名称的宽度；

          var tbodyw = 120*mddata.length;
          var titleh = 50;        
          var tbodyh = 25*$scope.data.length;         //内容高度  根据有多少个tr定义
          var svgw = 100 + titlew +tbodyw + 100 + 288;
          var svgh = 100 + titleh + tbodyh +100;

          $scope.svgw = svgw;
          $scope.svgh = svgh;
          $scope.titlew = titlew;
          $scope.biaotouwidth = titlew + 288;
          $scope.tablew = titlew + 288 +tbodyw;
          $scope.tableh = 50 +tbodyh;
          $scope.tbodyw = tbodyw;
          $scope.tbodyh = tbodyh;     
          $scope.temdata = {}; 
          $scope.bianhao = '编号';
          $scope.renwu = '任务名称';
          $scope.kaishi = '开始日期';
          $scope.jieshu = '结束日期';
          $scope.gongqi = '工期';
       }
}); 
// }, true);
function resetmon(time,mons){   
  var newarr = [];
var month = time;
  for(var i=0;i<mons;i++){
    var str = '';
    if(i===0){
       str  =  month;
    }else{
       str =  fac.timetostr(fac.getNextMonth(fac.strtotime(month)))/1000;
       month = str; 
    }
    var data = {};
      data.title = fac.getmonthcn(str);
      data.chl = ['5','10','15','20','25',fac.getyuemo(fac.strtotime(str))]; 
      newarr.push(data);
  }
  return newarr;

}

// 转换日期格式 
$scope.strtime= function(str){
  var timenum = parseInt(str);
  var strt = '';
  if(timenum>0){
    strt = fac.strtotime(timenum);
  }else{
    strt = "";
  } 
     return strt; 
}; 

$scope.jianfa = function(timone,timtwo){    //计算天数工期
  var t2 = '';
  var t1 = timtwo - timone;
  if(timtwo>0&&timone>0){
    t2 = t1/24/60/60 + 1;
  }
  return t2;
};

$scope.cerlen = function(timonee,timtwoe){
  var t2 = '';
  var t1 = timtwoe - timonee;
  t2 = t1/24/60/60 + 1;
  var zongchang = t2*4;

  //获取月末
 var ldays = fac.getyuemo(fac.strtotime(timonee));

 //获取本月最后日期；2015-5-31
 var ldt = fac.monlastday(timonee);
var lasdtimestr = fac.timetostr(ldt)/1000;/**/
var a=0;
while(lasdtimestr<=timtwoe&&ldays!=30){
  if(ldays==31){
  //加一天 
    a = a+1;
  }
  if(ldays==28){
  //减去两天 
  a = a -2;
  }
   if(ldays==29){
  //减去一天 
  a = a-1;
  }
  //获取下一个月2015-6-30 的最后一天，赋值给  lasdtimestr
 var nextmont = fac.getNextMonth(fac.strtotime(lasdtimestr));
 //获取下个月的尾天
 ldays = fac.getyuemo(nextmont);
 //获取下月最后一天
var lastdaytime = fac.monlastday(fac.timetostr(nextmont));
lasdtimestr = fac.timetostr(lastdaytime)/1000; 

  //获取下一个月 最后一天的日期，赋值给  ldays 

} 
  var jl = a*4;
 var tt = zongchang - jl;
return tt;
};
$scope.bglen = function(btim,timone,str){
 //0、算出有距离初始几个月
 var date1 = btim;
 var date2 = fac.monfirstday(timone); 
 var ntimfd = fac.timetostr(date2)/1000;
var months =fac.getMonths(date1 , date2)-1; 
 //1、首先获取当前日期是第几天；
 var days = (timone - ntimfd)/24/60/60;

 //2、计算开始宽度
 var num = months * 120 +  Math.floor(days)*4 +str+100;
return num;
};



//打印区域事件，打印按钮为id=“btnPrint”，打印区域为  id="printContent"
//
$(document).on('click',"#btnPrint",function(){ 
      YS('printarea',function(){
        $("#printContent").printArea();
      });
        
  });

}]);



// 横道图任务弹窗 事件
myctrl.directive('ganttworkwin',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,2);
                fac.setstore('hcodeid',$scope.value.codeid);
                myscope.win.portkey = iAttrs.ganttworkwin; 
                $scope.$parent.$parent.worklist.time = fac.time();
                $scope.$parent.$parent.worklist.codeid =$scope.$parent.value.codeid;
                $scope.win.url = './html/win/'+window.config.win[iAttrs.ganttworkwin].template+'.html?time='+fac.time(); 
                myscope.$apply(); 
            });
        }
    };
}]);

//公共方法，改变临时对象中的某个属性的值
myctrl.directive('changekey',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
              $scope[iAttrs.changekey][iAttrs.key] = iAttrs.val;
              $scope.$apply(); 
            });
        }
    };
}]);


//显示隐藏
 

  myctrl.directive('ysupdateshow', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("change", function() {
          var cscope = fac.getscope_byid($scope, $scope.yscid);
          var arr = iAttrs.ysupdateshow.split('.');

          var t = $(iElm).is(':checked');
          if (!t) {
            cscope[arr[0]][arr[1]][arr[2]] = 0;
            $scope.value.visible=0;
          } else {
            cscope[arr[0]][arr[1]][arr[2]] = 1;
            $scope.value.visible=1;
          }
          cscope[arr[0]][arr[1]].id = $scope.value.id;
          cscope[arr[0]].time = fac.time();
          cscope.$apply();
        });
      }
    };
  }]);
//私有方法，改变登陆页的tap状态
// myctrl.directive('tap',['fac', function(fac){ 
//     return { 
//         link: function($scope, iElm, iAttrs, controller) {
//             iElm.on("click",function(){ 
//               $scope.temdata.tap = iAttrs.tap;
//               $scope.$apply(); 
//             });
//         }
//     };
// }]);
// 
// 导入表格
myctrl.directive('bychangeexcel',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("change",function(){ 
              var myscope = fac.getscope_byid($scope,$scope.comctrlid);
                $(iAttrs.element).ajaxSubmit({
                    url:root2+'ver1/Index/exportxlssongjian',
                    success: function(re) { 
                          myscope.winsongjian = re.data;
                          myscope.$apply();
                    }
                }); 
            });
        }
    };
}]); 



// 导出表格
myctrl.directive('tableexport',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
            $('#tableexport').tableExport({type:'excel'});
             });
        }
    };
}]);
 
// 日期插件
myctrl.directive('layerdateone',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                var dataname = iAttrs.layerdateone;
                var key = iAttrs.key;
                laydate.skin('molv');
                 laydate({ 
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调 
                $scope[dataname][key] = datas;
            }
        });
             });
        }
    };
}]);


// 日期插件，日期改变，触发提交事件
myctrl.directive('laydateedit',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var key = iAttrs.laydateedit;
                var _this = $(this);
                laydate.skin('molv');
                 laydate({ 
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调 
                $scope.value[key] = datas; 
                debugger
                var sd = {};
                sd.codeid = $scope.value.codeid;
                sd[key] = datas;
                

                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                     if(re.code==1){
                       _this.addClass('ipright').removeClass('ipwrong');
                     }else{
                      _this.addClass('ipwrong').removeClass('ipright');
                     } 
                }); 
            },
             cleardate:function(){
              //点击清空按钮，触发的事件 
              var sd = {};
                sd.codeid = $scope.value.codeid;
                sd[key] = 0; 
                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                  if(re.code==1){
                       _this.addClass('ipright').removeClass('ipwrong');
                     }else{
                      _this.addClass('ipwrong').removeClass('ipright');
                     }
                      
                }); 
            }

        });
             });
        }
    };
}]);





//横道图私有方法 日期插件，日期改变，触发提交事件
myctrl.directive('duibilaydate',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var key = iAttrs.duibilaydate;
                var _this = $(this);
                laydate.skin('molv');
                laydate({ 
                    format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
                    festival: true, //显示节日
                    choose: function(datas){ //选择日期完毕的回调 
                        $scope.value[key] = datas; 
                        if(fac.time($scope.value.retime)<fac.time($scope.value.rbtime)&&$scope.value.retime){
                          layer.msg('结束日期必须大于开始日期',{icon:0});return false;}
                  
                        var sd = {};
                        sd.codeid = $scope.value.codeid;
                        sd[key] = datas;
                      
                        var url = root2 + config.url.com_em.url;
                        fac.post(url,sd,function(re){
                             fac.msg(re);
                             if(re.code==1){
                               _this.addClass('ipright').removeClass('ipwrong');
                             }else{
                              _this.addClass('ipwrong').removeClass('ipright');
                             } 
                        }); 
                    },
                    cleardate:function(){
                      //点击清空按钮，触发的事件 
                      var sd = {};
                        sd.codeid = $scope.value.codeid;
                        sd[key] = 0; 
                        var url = root2 + config.url.com_em.url;
                        fac.post(url,sd,function(re){
                             fac.msg(re);
                          if(re.code==1){
                               _this.addClass('ipright').removeClass('ipwrong');
                             }else{
                              _this.addClass('ipwrong').removeClass('ipright');
                             }
                              
                        }); 
                    }

        });
             });
        }
    };
}]);

// 日期插件，标准养护日期的改变 私有方法
myctrl.directive('bylaydate',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                var key = iAttrs.bylaydate;
                var _this = $(this);
                laydate.skin('molv');
                 laydate({ 
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调 
                $scope.value[key] = datas; 
                var dtime = fac.time(datas);
               
                 var sd = {};
                 sd.codeid = $scope.value.codeid;
                 sd.byriqi = datas;

                //标养
                 var bytime = dtime + 28*86400000;  
                 $scope.value.bytime=sd.bytime = fac.numtotime(bytime);

                 //抗渗
                var kstime = dtime + 30*86400000;
                 $scope.value.kstime=sd.kstime = fac.numtotime(kstime);
                 //柱头
                var zttime =dtime + 28*86400000;
                 $scope.value.zttime=sd.zttime = fac.numtotime(zttime);
                 //拆模板
                var cmtime =dtime + 7*86400000;
                 $scope.value.cmtime=sd.cmtime = fac.numtotime(cmtime); 
               

                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                  $scope.bytip = re.code==1?'ipright':'ipwrong';
                      
                }); 
            },
             cleardate:function(){
              //点击清空按钮，触发的事件 
              var sd = {};
                sd.codeid = $scope.value.codeid;
                sd[key] = 0;
                sd.bytime = 0;
                $scope.value.bytime = '';
                sd.kstime = 0;
                $scope.value.kstime = '';
                sd.zttime = 0;
                $scope.value.zttime = '';
                sd.cmtime = 0; 
                $scope.value.cmtime = '';

                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                  $scope.bytip = re.code==1?'ipright':'ipwrong';
                      
                }); 
            }
        });
             
             });
        }
    };
}]);


// 日期插件，砌筑抹灰找平 日期的改变 私有方法
myctrl.directive('sjlaydate',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                var key = iAttrs.sjlaydate + 'riqi';
                var tp = iAttrs.sjlaydate + 'time'; 
                var tip = iAttrs.sjlaydate + 'tip';
                var _this = $(this);
                laydate.skin('molv');
                 laydate({ 
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调 
                $scope.value[key] = datas; 
          
                var sd = {};
                sd.codeid = $scope.value.codeid;
                sd[key] = datas;
                var time= fac.time(datas);
                 
                $scope.value[tp] = sd[tp] = fac.numtotime(time + 28*86400000); 

                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                  $scope.value[tip] = re.code==1?'ipright':'ipwrong';
                      
                }); 
            },
            cleardate:function(){
              //点击清空按钮，触发的事件 
              var sd = {};
                sd.codeid = $scope.value.codeid;
                sd[key] = 0;
                sd[tp] = 0;
                $scope.value[tp] = ''; 

                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                  $scope.value.sjtip = re.code==1?'ipright':'ipwrong';
                      
                }); 
            }

        });
             
             });
        }
    };
}]);

// 日期插件，原材日期插件 私有方法
myctrl.directive('yclaydate',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
              var key = '';
                var tp = '';  
              if(iAttrs.yclaydate=='intime'){
                key = 'intime';
                tp = 'stime';  
              }else{
                key = 'stime';
                tp = 'intime'; 
              }
               
                var _this = $(this);
                laydate.skin('molv');
                 laydate({ 
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            choose: function(datas){ //选择日期完毕的回调 
                $scope.value[key] = datas; 
          
                var sd = {};
                sd.codeid = $scope.value.codeid;
                var time = fac.time(datas);
                sd[key] = datas;
                
                if(key=='intime'){
                  //送检日期
                sd[tp] =datas;
                 $scope.value[tp] = datas; 
               }else{
                if(fac.time($scope.value.stime)<fac.time($scope.value.intime)){
                  layer.msg('送检日期必须大于进场日期',{icon:5});
                  return false;
                }
               }
                




                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                  $scope.value.yctip = re.code==1?'ipright':'ipwrong';
                      
                }); 
            },
            cleardate:function(){
              //点击清空按钮，触发的事件 
              var sd = {};
                sd.codeid = $scope.value.codeid;
                sd[key] = 0;
                sd[tp] = 0;
                $scope.value[tp] = ''; 

                var url = root2 + config.url.com_em.url;
                fac.post(url,sd,function(re){
                     fac.msg(re);
                  $scope.value.yctip = re.code==1?'ipright':'ipwrong';
                      
                }); 
            }

        });
             
             });
        }
    };
}]);

//标准用量 私有方法
myctrl.directive('byyledit', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("change", function(event){ 
          var _this = $(this); 
          var key = iAttrs.byyledit;
          var sd = {};
          sd.codeid = $scope.value.codeid;
          sd[key] = iElm.val();

          var yl = parseInt(iElm.val());
          sd.byzushu = yl>=1000?Math.ceil(yl/200):Math.ceil(yl/100); 
          $scope.value.byzushu = sd.byzushu; 

          var url = root2 + config.url.com_em.url;
          fac.post(url,sd,function(re){
               fac.msg(re);
               $scope.yltip = re.code==1?'ipright':'ipwrong';
          }); 
        });
      }
    };
  }]);

// 公共弹窗 添加事件
myctrl.directive('comwinadd',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,2);

//hsl  横道图 点击新增 先清掉编辑的数据
   if (iAttrs.gantt==1) {
    $scope.winData={};
  }



                myscope.winTime.time = fac.time(); 
                myscope.win.portkey = iAttrs.comwinadd;  
                 myscope.win.extendtwo = iAttrs.extendtwo?iAttrs.extendtwo:'';//额外的参数
                 myscope.win.extendone = iAttrs.extendone?iAttrs.extendone:'';
                 myscope.win.extendthree = iAttrs.extendthree?iAttrs.extendthree:'';
 
                    for(var k in window.config.win[iAttrs.comwinadd].temdata){
                        window.config.win[iAttrs.comwinadd].temdata[k] = '';
                    }
             
                 myscope.winData = angular.copy(window.config.win[iAttrs.comwinadd].temdata);//编辑保存后，数据为空
                myscope.$apply(); 
            });
        }
    };
}]);



// 公共弹窗 编辑事件
myctrl.directive('comwinedit',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,$scope.comctrlid);
                myscope.winTime.time = fac.time(); 

                myscope.win.portkey = iAttrs.comwinedit;  
                myscope.win.extendtwo = iAttrs.extendtwo?iAttrs.extendtwo:'';
                myscope.win.extendone = iAttrs.extendone?iAttrs.extendone:'';
                 myscope.win.extname = iAttrs.extname?iAttrs.extname:'';  
                myscope.winData = $scope.value;
                myscope.$apply(); 
            });
        }
    };
}]);


// 公共弹窗 结果设置事件
myctrl.directive('comsetwin',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,2);
                myscope.winTime.time = fac.time(); 
                var len = iAttrs.len;
                myscope.win.portkey = iAttrs.comsetwin; 
                myscope.win.extendone = iAttrs.key;
                myscope.win.extendtwo = iAttrs.key + 'arr';
                myscope.win.extname = iAttrs.extname?iAttrs.extname:'';
               
                $scope.value.len = []; 
                for(var i=0;i<len;i++){
                  $scope.value.len.push({});
                }   
             
                 myscope.winData = $scope.value;//编辑保存后，数据为空angular.copy()
                myscope.$apply(); 
            });
        }
    };
}]);



//私有弹窗  温度弹窗 
myctrl.directive('wenduwin',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,2); 

                //去拿数据
                myscope.com_wenduData = {codeid:$scope.value.codeid,type:'ty'};
                myscope.com_wenduFun = function(re){
                     myscope.winTime.time = fac.time(); 
                     myscope.win.portkey = iAttrs.wenduwin; 
                     myscope.win.extname = iAttrs.extname?iAttrs.extname:'';   
                }
                myscope.com_wenduTime.time = fac.time();
                myscope.$apply(); 

            });
        }
    };
}]);
myctrl.directive('xlsimport',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
               var tscope = fac.getscope_byid($scope,2); 
                var myscope = fac.getscope_byid($scope,$scope.comctrlid);
                tscope.winTime.time = fac.time(); 
                myscope.winsongjian = [];
                myscope.win.portkey = iAttrs.xlsimport; 
                myscope.$apply(); 
 

            });
        }
    };
}]);

// 打印资料弹窗 事件
myctrl.directive('printwin',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
              var codearr = [];
            $('input[name='+iAttrs.type+']').each(function(index, el) {
              if(el.checked){ codearr.push(el.value);} 
                });
            if(!codearr.length){layer.msg('请勾选需要汇总打印的选项！',{icon:0})}
            

            if(codearr.length){
                fac.setstore('zlval',{codeid:codearr,type:iAttrs.type});
                var myscope = fac.getscope_byid($scope,2);
                myscope.winTime.time = fac.time(); 
                myscope.win.portkey = iAttrs.printwin; 
                myscope.$apply(); 
            }
            
               
            });
        }
    };
}]);

//保存检测结果 一个字段多个结果  _公共方法
myctrl.directive('saveresult',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var tscope = fac.getscope_byid($scope,2);
               console.log(tscope.winData);
               var input = $('#resultval').find('input');
               var arr = [];
              var newd = [];
               input.each(function(index,elm) {
                 if(elm.value){
                  newd.push({val:elm.value})
                  arr.push(elm.value);
                }
               });
               var jg = arr.join(',');

          var sd = {};
          sd.codeid = tscope.winData.codeid;
          sd[tscope.win.extendone] = jg;
          var url = root2 + config.url.com_em.url;
          fac.post(url,sd,function(re){ 
               fac.msg(re);
               if(re.code==1){
                  layer.closeAll();
                  tscope.winData[tscope.win.extendone] = jg;
                  tscope.winData[tscope.win.extendtwo] = newd;
               } 
          });




            });
        }
    };
}]);
// 工程概况 编辑事件
myctrl.directive('prowinedit',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,$scope.comctrlid);
                myscope.winTime.time = fac.time(); 
                myscope.win.portkey = iAttrs.prowinedit; 
                var tscope = fac.getscope_byid($scope,2);

                myscope.program_pro_infoTime.time = fac.time();
                myscope.program_pro_infoData.codeid =$scope.value.codeid;
                myscope.program_pro_infoFun = function(re,sco){
                   if(re.data[0].pid){
                    tscope.com_cityData = {pid:re.data[0].pid};
                    tscope.com_cityTime.time = fac.time();
                   }
                }
                myscope.$apply(); 
            });
        }
    };
}]);


// 子单位弹窗 编辑事件
myctrl.directive('sinwinedit',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,2);
                myscope.winTime.time = fac.time(); 

                myscope.win.portkey = iAttrs.sinwinedit;  
                myscope.win.extendtwo = iAttrs.extendtwo?iAttrs.extendtwo:'';
                myscope.win.extendone = iAttrs.extendone?iAttrs.extendone:''; 
                myscope.winData = $scope.v;
                myscope.$apply(); 
            });
        }
    };
}]);



// 横道图任务弹窗 事件
myctrl.directive('ganttwin',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var myscope = fac.getscope_byid($scope,$scope.comctrlid);
                myscope.winTime.time = fac.time(); 
                myscope.win.portkey = iAttrs.ganttwin; 
                fac.setstore('hcodeid',$scope.value.codeid);

                myscope.program_gantt_worklistTime.time = fac.time();
                myscope.program_gantt_worklistData.codeid =$scope.value.codeid;
                myscope.$apply(); 
            });
        }
    };
}]);



//只有一个层级的  删除公共方法
myctrl.directive('comdelone',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){  
var myscope = fac.getscope_byid($scope,$scope.comctrlid);

// 将临时数据，赋值给portkey 的 scopeData； 
 var sdkey = iAttrs.comdelone + 'Data';
myscope[sdkey] = {codeid:iAttrs.sendid};
// // 提交之前，要做校验，校验通过则提交;
if(!iAttrs.sendid){layer.msg('参数错误');return false;}

var layercon = layer.confirm('您确定要删除么？', {
  btn: ['确定','取消'] //按钮
}, function(){
   // // 触发时间时间戳 
 var tkey = iAttrs.comdelone + 'Time';
 myscope[tkey].time = fac.time();
 myscope.$apply(); 
layer.close(layercon);
}); 

var index = $scope.$index;
//执行之后的函数
 var fkey = iAttrs.comdelone + 'Fun';
myscope[fkey] = function(re){
    if(re.code=='1'){
      //偷懒，不合理设计--刷新工程列表
      if(iAttrs.comdelone=='program_pro_del'){myscope.program_pro_listTime.time = fac.time();}
      
      
        fac.lmsg(re); 
        var x = $scope.v?$scope.v.isdel = 1:$scope.value.isdel = 1;
     
    }else{
        fac.lmsg(re);
    }
};

            });
        }
    };
}]);

//删除多条记录 delmore="接口key：program_plan_betondel" from="需要删除的列表key：program_plan_betonlist"
myctrl.directive('delmore',['fac', function(fac){ 
return {
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(e) { 
            var myscope = fac.getscope_byid($scope, $scope.comctrlid);
            var arr = [];
            var indexarr = [];
            angular.forEach(myscope[iAttrs.from].datalist, function(value, key){
                if(value.check==1){
                    indexarr.push(key);
                    arr.push(value.codeid);
                }  
            });

//执行之后的函数
 var fkey = iAttrs.delmore + 'Fun';
myscope[fkey] = function(re){
    if(re.code=='1'){
        fac.lmsg(re); 
        indexarr.map(function(item) {
            myscope[iAttrs.from].datalist[item].isdel = 1; 
        });
       
    }else{
        layer.msg(re.msg);
    }
}; 

if(!arr.length){layer.msg('请选择选项',{icon:0});return false;}

var layercon = layer.confirm('您确定要删除么？', {
  btn: ['确定','取消'] //按钮
}, function(){
   // // 触发时间时间戳 
             var tkey = iAttrs.delmore + 'Time'; 
            var dkey = iAttrs.delmore + 'Data';
            myscope[dkey].codeid = arr; 
            myscope[tkey].time = fac.time();
            myscope.$apply();  

layer.close(layercon);
});



        });
    }
};
}]);


//添加工程保存事件
myctrl.directive('addpro',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
var myscope = fac.getscope_byid($scope,$scope.comctrlid);
myscope.program_pro_addData = myscope.winData;
 //校验
  if(myscope.winData.prname==''){
    layer.msg('请输入工程名称',{icon:0});
    return false;
  }
  if(myscope.winData.pid==''){
    layer.msg('请选择省份',{icon:0});
    return false;
  }
  if(myscope.winData.cityid==''){
    layer.msg('请选择城市',{icon:0});
    return false;
  }
  if(myscope.winData.jiegou==''){
    layer.msg('请选择结构类型',{icon:0});
    return false;
  }
  if(myscope.winData.kaigong==''){
    layer.msg('请填写开工日期',{icon:0});
    return false;
  }
  if(myscope.winData.jungong==''){
    layer.msg('请填写竣工日期',{icon:0});
    return false;
  }

  if(fac.time(myscope.winData.kaigong)>fac.time(myscope.winData.jungong)){
    layer.msg('开工日期必须小于竣工日期',{icon:0});
    return false;
  }

  myscope.program_pro_addFun = function(re,sco) {
      if(re.code==1){
        layer.closeAll();
        layer.msg('工程添加成功！',{'icon':1});
        myscope.program_pro_listTime.time =fac.time();

        // setTimeout(function() {
        //     window.location.reload();
        // },1000);
      }else{
        layer.msg(re.msg,{'icon':2});
      }
  };
 myscope.program_pro_addTime.time = fac.time();
 myscope.$apply();

            });
        }
    };
}]);

//改变省份
myctrl.directive('changepro',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("change",function(){ 
            var dkey = iAttrs.changepro; 
            var key = iAttrs.key;
            $scope[dkey][key] = iElm.val();  
            $scope[dkey].cityid = '';
            var myscope = fac.getscope_byid($scope,2);
            myscope.litsave = 1;
            myscope.com_cityData = {pid:iElm.val()};
            myscope.com_cityTime.time = fac.time();
            myscope.$apply();
        });
    }
};
}]);
   
//select下拉列表点击赋值
myctrl.directive('changecity',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("change",function(){ 
            var dkey = iAttrs.changecity;
            var key = iAttrs.key;
            if (iAttrs.key2) {
              var key2 = iAttrs.key2;
              $scope[dkey][key2] = iElm.find("option:selected").text(); 
            }
            var myscope = fac.getscope_byid($scope,$scope.comctrlid);
            var tscope = fac.getscope_byid($scope,2);
            tscope.litsave = 1;
            myscope[dkey][key] = iElm.val(); 
            myscope.$apply();
        });
    }
};
}]);


//工程概况修改城市
myctrl.directive('procity',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("change",function(){ 
            var myscope = fac.getscope_byid($scope,2);
            myscope.litsave = 1;
            myscope.$apply();
        });
    }
};
}]);

//checkbox公共勾选
myctrl.directive('comcheck',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(e){ 
                 var a = [1,0];
                 var key = iAttrs.comcheck;
                 $scope.value[key] = $scope.value[key]===undefined?0:$scope.value[key];
                $scope.value[key] = a[$scope.value[key]];
                $scope.$apply();
                 });
        }
    };
}]);

//checkbox公共勾选所有
myctrl.directive('checkallbykey',['fac', function(fac){ 
return {
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(e) { 
            var arname = iAttrs.checkallbykey;
            var check = $(iElm).is(":checked");
            var myscope = fac.getscope_byid($scope, $scope.comctrlid);
            angular.forEach(myscope[arname].datalist, function(value, key) {
                value[iAttrs.key] = check ? 1 : 0;
            });

            myscope.$apply();
        });
    }
};
}]);


//checkbox公共勾选所有
myctrl.directive('comcheckall',['fac', function(fac){ 
return {
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(e) { 
            var key = iAttrs.comcheckall;
            var check = $(iElm).is(":checked");
            var myscope = fac.getscope_byid($scope, $scope.comctrlid);
            angular.forEach(myscope[key].datalist, function(value, key) {
                value.check = check ? 1 : 0;
            });
            myscope.$apply();
        });
    }
};
}]);


//公共方法-编辑-勾选框 点击 勾选提交；
myctrl.directive('checkedit', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event){ 
          var val = $(this).is(':checked')?"1":"0"; 
          var key = iAttrs.checkedit;
          var sd = {};
          sd.codeid = $scope.value.codeid;
          sd[key] = val;
          var url = root2 + config.url.com_em.url;
          fac.post(url,sd,function(re){
               fac.msg(re);
               if(re.code==1){
                 $scope.value[key] = val;
               } 
          }); 
        });
      }
    };
  }]);

//私有方法，同表类型，的子表更新；
myctrl.directive('checktbtype', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event){ 
          var val = $(this).is(':checked')?"1":"0";           
          var sd = {};
          var id = iAttrs.checktbtype;
          var ar = [];
          $(id).find('input:checkbox:checked').each(function(i,el) {
             ar.push(el.value);
          }); 
          sd.codeid = iAttrs.codeid;
          sd.temjson = ar.join(','); 

          var url = root2 + config.url.com_em.url;
          fac.post(url,sd,function(re){
               fac.msg(re);
               if(re.code==1){
                 $scope.value[key] = val;
               } 
          }); 
        });
      }
    };
  }]);

//私有 点击资料专业  查看模版   绑接口 传codeid
myctrl.directive('tapshowrunzl',['fac', function(fac){ 
return { 
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click",function(){   
          var cscope = fac.getscope_byid($scope,$scope.yscid);
          cscope.tapshow = iAttrs.tap;
          cscope[iAttrs.tapshowrunzl].params.codeid=iAttrs.codeid;
          cscope[iAttrs.tapshowrunzl].time =  fac.time(); 
          cscope.$apply();
        });
     }
   };
}]);

// 公共删除方法 
 myctrl.directive('comdelones',['fac', function(fac){ 
return { 
    link: function($scope, iElm, iAttrs, controller){
        iElm.on("click",function(){ 
           var cscope = fac.getscope_byid($scope,$scope.yscid); 
           var obj = iAttrs.comdelones;
           var theid = iAttrs.theid||'id';
           var tip = iAttrs.tip?iAttrs.tip:'您确定要删除么？';
           debugger;
           var layercon = layer.confirm(tip, {
            btn: ['确定','取消'] //按钮
          }, function(){
             // // 触发时间时间戳  
          cscope[obj].params[theid] = $scope.value[theid]; 
           cscope[obj].done = function(re,sco){
              if(re.code == 1){
                $scope.value.isdel=1;
                layer.msg("删除成功");
              }else{
                layer.msg(re.msg);
              }
              layer.close(layercon);
             };
           cscope[obj].time = fac.time(); 
           cscope.$apply(); 
          }); 
        });
     }
   };
}]);



//select下拉列表点击赋值
myctrl.directive('comselect',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("change",function(){ 
            var myscope = fac.getscope_byid($scope,2);
            var dkey = iAttrs.comselect;
            var key = iAttrs.key;
            myscope[dkey][key] = $(iElm).val(); 
            myscope.$apply();
        });
    }
};
}]);


//公共方法 - 击查找事件
myctrl.directive('comfind',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
 var myscope = fac.getscope_byid($scope,$scope.comctrlid);
 var sdkey = iAttrs.comfind + 'Data';
 myscope[sdkey].curPage = 1;

var tkey = iAttrs.comfind + 'Time';
myscope[tkey].time = fac.time();  
myscope.$apply();
            });
        }
    };
}]);

//公共方法-添加
myctrl.directive('comadd', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event) {
            var myscope = fac.getscope_byid($scope,$scope.comctrlid);
            var sd = {}; 
            sd.codeid = myscope[iAttrs.comadd].codeid;  

//是否设置这些id，如果设置则一起带过去；           
if(iAttrs.prcodeid){sd.prcodeid= iAttrs.prcodeid;}
if(iAttrs.scodeid){sd.scodeid= iAttrs.scodeid;}
if(iAttrs.hcodeid){sd.hcodeid= iAttrs.hcodeid;}

            //额外参数
            if(iAttrs.ext1){sd[iAttrs.ext1] = iAttrs.ext1v;}
            if(iAttrs.ext2){sd[iAttrs.ext2] = iAttrs.ext2v;}
        var url = root2 + config.url.com_ea.url;
        fac.post(url,sd,function(re){
            fac.msg(re);
            if(re.code==1){
               sd.codeid = re.data.codeid;
               sd.myorder = 0;
               sd.morder = 0;
               myscope[iAttrs.comadd].datalist.unshift(sd); 
            }
        });

           
            
        });
      }
    };
  }]);

//公共方法-编辑-输入框内容改变 触发提交；
myctrl.directive('comedit', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("change", function(event){ 
          var _this = $(this); 
          debugger;
          var key = iAttrs.comedit;
          var sd = {};
          sd.codeid = $scope.value.codeid;
          sd[key] = iElm.val();
          var url = root2 + config.url.com_em.url;
          fac.post(url,sd,function(re){
            var a = key=='morder'||key=='myorder'?parseInt(iElm.val()):iElm.val();
            $scope.value[key] = a;
               fac.msg(re);
               if(re.code==1){
                 _this.addClass('ipright').removeClass('ipwrong');
               }else{
                _this.addClass('ipwrong').removeClass('ipright');
               }
          }); 
        });
      }
    };
  }]);

//公共方法-编辑-输入框内容改变 触发提交；
myctrl.directive('pornameedit', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("change", function(event){ 
          var _this = $(this); 
          var key = iAttrs.pornameedit;
          var sd = {};
          sd.codeid = $scope.value.codeid;
          sd[key] = iElm.val();
          var url = root2 + config.url.com_em.url;
          fac.post(url,sd,function(re){
            var a = iElm.val();
            $scope.value[key] = a;
               fac.msg(re);
               if(re.code==1){
                 _this.addClass('ipright').removeClass('ipwrong');
                 $scope.program_pro_listTime.time = fac.time();
               }else{
                _this.addClass('ipwrong').removeClass('ipright');
               }
          }); 
        });
      }
    };
  }]);








  //增加  
myctrl.directive('plus', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event) {
            var myscope = fac.getscope_byid($scope,2);
           var n = myscope[iAttrs.plus][iAttrs.key];
           myscope[iAttrs.plus][iAttrs.key] = n?parseInt(n)+1:1;
           myscope.$apply();
        });
      }
    };
  }]); 

  //减小
myctrl.directive('minus', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event) {
            var myscope = fac.getscope_byid($scope,2);
           var n = myscope[iAttrs.minus][iAttrs.key];
           myscope[iAttrs.minus][iAttrs.key] = n?n-1:1; 
           myscope.$apply();
        });
      }
    };
  }]);

//创建部位
myctrl.directive('createpart', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller){
        iElm.on("click", function(event) {
            var myscope = fac.getscope_byid($scope,2);
            if(myscope.winData.jiegou=='0'){layer.msg('请选择框架类型。',{'icon':0});}
            if(myscope.winData.cengshu>50){layer.msg('层数不能超过50。',{'icon':0});return false;}


            if(myscope.winData.cengshu){ 
                 myscope.winData.jichu = config.ext.jichu.join('\n'); 

                 var arr = [];
                 for (var i = 0; i < myscope.winData.cengshu; i++) {
                       var lb = config.ext.zhuti[i]+'层梁板';
                       arr.push(lb);
                       var type = myscope.winData.jiegou ==='1'?'柱':'墙柱';
                       var qz = config.ext.zhuti[i]+'层'+type;
                       arr.push(qz);
                   }  
                   arr.push('屋面梁板');
                 myscope.winData.zhuti = arr.join('\n'); 

                 myscope.$apply();
            }else{
                layer.msg('请输入层数。',{'icon':2});
            }
           
        });
      }
    };
  }]);


  //退出登录
myctrl.directive('loginout', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event) {
            
        });
      }
    };
  }]);

//短信验证 发送按钮
myctrl.directive('selcode',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                var id ='#' + iAttrs.selcode;
                $scope.stuinfo_safe_psdeditData = 
                $scope.stuinfo_safe_selcodeFun = function(re){
                    if(re.code=='0'){
                       $(id).prop('disabled',true);
                       var i = 50;
                       var ax = setInterval(function(){
                        // console.log(i);
                        if(i>0){
                            $(id).html(i+'秒后重新发送');
                        }else{
                            $(id).html('重新发送');
                            $(id).removeAttr('disabled');
                            window.clearInterval(ax);
                        }                        
                        i--;
                       },1000);
                   }else{
                    layer.msg('发送失败');
                    $(id).prop('disabled',false); 
                   }
                    
                };

                $scope.stuinfo_safe_selcodeTime.time = fac.time();
                $scope.$apply();
                 
                 });
        }
    };
}]);

//新增横道图
myctrl.directive('gattadd',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                 var myscope = fac.getscope_byid($scope, $scope.comctrlid);
                 myscope.winData.codeid = fac.getstore('prcodeid');
                 myscope.temdata = myscope.winData;

                 if (!myscope.winData.htitle) {
                    layer.msg('标题不能为空！');return false;
                 };
   if (myscope.winData.etime&&myscope.winData.btime) {
                    if (myscope.winData.etime<myscope.winData.btime) {
                    layer.msg('结束日期必须大于开始日期');return false;
                };
                 
   }

                 myscope.program_gantt_addFun = function(re){
                    fac.addmsg(myscope,re,'program_gantt_list'); 
                 };
                 myscope.program_gantt_addData = myscope.winData;
                 myscope.program_gantt_addTime.time = fac.time();
                 myscope.$apply();
                 });
        }
    };
}]);
//横道图编辑
myctrl.directive('gattedit',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                 var myscope = fac.getscope_byid($scope, $scope.comctrlid);
                 myscope.program_gantt_editData = myscope.winData;
                if (!myscope.winData.htitle) {
                    layer.msg('主标题不能为空！');return false;
                };

                if (myscope.winData.etime<myscope.winData.btime) {
                    layer.msg('结束日期必须大于开始日期');return false;
                };



myscope.program_gantt_editFun = function(re,sco){
    layer.closeAll();
    layer.msg(re.msg,{'icon':1});
};

                 myscope.program_gantt_editTime.time = fac.time();
                 myscope.$apply();
                 });
        }
    };
}]);
//横道图-作业-添加行
myctrl.directive('ganttrenwuadd',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
            var myscope = fac.getscope_byid($scope, $scope.comctrlid);   
            var array = {}; 
            myscope.program_gantt_worklist.datalist.push(array);
            myscope.$apply();
        });
        }
    };
}]);



//添加子单位 
myctrl.directive('sinadd',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){  

            var myscope = fac.getscope_byid($scope, $scope.comctrlid);
                console.log(myscope.winData);
                 myscope.winData.codeid = iAttrs.sinadd; 
                  var sd={};
                  sd = myscope.winData; 

 if(myscope.winData.sname==''){
    layer.msg('请输入子单位名称',{icon:0});
    return false;
  }
  if(myscope.winData.cengshu==''){
    layer.msg('请输入层数',{icon:0});
    return false;
  }
  if(myscope.winData.cengshu>50){layer.msg('层数不能超过50。',{'icon':0});return false;}


  if(myscope.winData.jiegou==''){
    layer.msg('请选择结构类型',{icon:0});
    return false;
  } 
   if($.trim(myscope.winData.jichu)==''){
    layer.msg('基础部位不能为空',{icon:0});
    return false;
  }
  if($.trim(myscope.winData.zhuti)==''){
    layer.msg('主体部位不能为空',{icon:0});
    return false;
  }
 









                 myscope.program_pro_sinaddFun = function(re){
                     if(re.code==1){
                        layer.closeAll();
                        layer.msg(re.msg,{'icon':1});  
                         sd.codeid = re.data.codeid;
                         sd.rd = re.data.rd;
                         console.log(sd.rd);
                         $scope.program_pro_list.datalist[iAttrs.scoindex].sinchl.datalist.push(sd);
                         
                      }else{
                          layer.msg(re.msg,{'icon':2}); 
                      }


                 }; 
                 myscope.program_pro_sinaddData = myscope.winData;
                 myscope.program_pro_sinaddTime.time = fac.time();
                 myscope.$apply();

             });
        }
    };
}]);


//设置当前子单位工程
myctrl.directive('setnowprosin',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){  
                 fac.setstore('prcodeid',iAttrs.prcodeid); 
                 fac.setstore('prname',$scope.value.prname); 
                 fac.setstore('scodeid',iAttrs.scodeid||'');

             });
        }
    };
}]);

// 横道图作业编辑 事件
// myctrl.directive('ganttlistwin',['fac', function(fac){ 
//     return { 
//         link: function($scope, iElm, iAttrs, controller) {
//             iElm.on("click",function(){ 
//                 var myscope = fac.getscope_byid($scope,2);
//                 myscope.winTime.time = fac.time(); 
//                 myscope.program_gantt_worklistTime.time = fac.time();

//                 myscope.win.portkey = iAttrs.comwinedit;  
//                 myscope.win.extendtwo = iAttrs.extendtwo?iAttrs.extendtwo:'';
//                 myscope.win.extendone = iAttrs.extendone?iAttrs.extendone:''; 
//                 myscope.win.extname = iAttrs.extname?iAttrs.extname:''; 
//                 myscope.winData = $scope.value;
//                 myscope.$apply(); 
//             });
//         }
//     };
// }]);

// 焊接公共方法
myctrl.directive('hanjie',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){

              alert('hanjie');
            });
        }
    };
}]);

//送检计划切换原材子单位 
myctrl.directive('changemattersin', ['fac', function(fac) {
  return {
    link: function($scope, iElm, iAttrs, controller) {
      iElm.on("click", function() {
        var myscope = fac.getscope_byid($scope, $scope.comctrlid);
        angular.forEach(myscope.program_plan_sinlist.datalist, function(value, key) {
          value.now = '';
        });

        $scope.value.now = 'active';
        //去获取数据，子单位或者原材的数据
        if ($scope.value.type === true) {
          //原材
          myscope.program_plan_matterlistTime.time = fac.time();
         
          angular.forEach(myscope.yctypelist, function(value, key){
                value.ngclass =  'label-default';
            }); 
            myscope.yctypelist[9].ngclass = 'label-primary'; 
            myscope.matter_url=myscope.yctypelist[9].url; 
            myscope.yctype=myscope.yctypelist[9].t;

        } else {
          //子单位
          angular.forEach(myscope.typelist, function(value, key){
                value.ngclass =  'label-default';
            });
            myscope.typelist[0].ngclass = 'label-primary'; 
            myscope.plansin_body = myscope.typelist[0].url;
            myscope.stype = myscope.typelist[0].t;
          //设置scodeid为当前；
          fac.setstore('scodeid', $scope.value.codeid);
          fac.setstore('sname', $scope.value.sname);
          myscope.program_plan_betonlistData = {
            codeid: $scope.value.codeid
          };

          myscope.program_plan_betonlistTime.time = fac.time();
        }  
        $scope.$apply();

      });
    }
  };
}]);


//进度管理-切换子单位
myctrl.directive('changesin', ['fac', function(fac) {
  return {
    link: function($scope, iElm, iAttrs, controller) {
      iElm.on("click", function() {
        var myscope = fac.getscope_byid($scope, $scope.comctrlid); 
        var tscope = fac.getscope_byid($scope, 2);  
         
          //子单位
          var codeid = $scope.value.codeid;
          //设置scodeid为当前；
          fac.setstore('scodeid', codeid);
          fac.setstore('sname', $scope.value.sname);
          myscope.program_work_sinimageData = { codeid: codeid };
          myscope.program_work_sinimageTime.time = fac.time();

          myscope.program_work_matcountData = { codeid: fac.getstore('prcodeid')};
          myscope.program_work_matcountTime.time = fac.time();
      
          myscope.$apply();

      });
    }
  };
}]);


//切换标养同养抗渗等
myctrl.directive('changestype',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
            var myscope = fac.getscope_byid($scope, $scope.comctrlid); 
            angular.forEach(myscope.typelist, function(value, key){
                value.ngclass =  'label-default';
            });
            $scope.value.ngclass = 'label-primary'; 
            myscope.plansin_body = $scope.value.url;
            myscope.stype = $scope.value.t;
            myscope.program_plan_betonlistData.type = $scope.value.t;
              myscope.program_plan_betonlistTime.time = fac.time();
            $scope.$apply();               
            });
        }
    };
}]);


//切换 钢筋 水泥 砂等
myctrl.directive('changeyctype',['fac', function(fac){ 
    return {
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
            var myscope = fac.getscope_byid($scope, $scope.comctrlid); 
            angular.forEach(myscope.yctypelist, function(value, key){
                value.ngclass =  'label-default';
            });

            $scope.value.ngclass = 'label-primary'; 
            myscope.matter_url=$scope.value.url; 
            myscope.yctype=$scope.value.t;
            $scope.$apply();               
            });
        }
    };
}]);

//我的工程-原材添加
myctrl.directive('masteradd', ['fac', function(fac) {
	return {
		link: function($scope, iElm, iAttrs, controller) {
			iElm.on("click", function(event) {
				var myscope = fac.getscope_byid($scope, $scope.comctrlid);
				var sd = {};
				sd.codeid = myscope[iAttrs.masteradd].codeid;
				//是否设置这些id，如果设置则一起带过去；           
				if (iAttrs.prcodeid) {
					sd.prcodeid = iAttrs.prcodeid;
				}
				if (iAttrs.yctype) {
					sd.yctype = iAttrs.yctype;
				}
				var url = root2 + config.url.com_ea.url;
				fac.post(url, sd, function(re) {
					fac.msg(re);
					if (re.code == 1) {
						sd.codeid = re.data.codeid;
						myscope[iAttrs.masteradd].datalist.unshift(sd);
					}
				});
			});
		}
	};
}]);


// 进度管理的  切换 是否显示
myctrl.directive('workshowchange',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
            var tscope = fac.getscope_byid($scope,2);   
            tscope.isshow = tscope.isshow=='0'?1:0;
              tscope.showtype = iAttrs.workshowchange;

if(tscope.isshow){
   var myscope = fac.getscope_byid($scope,$scope.comctrlid); 
  setTimeout(function(){
              var arr = [myscope.quanbu,myscope.jichu,myscope.zhuti];
              var lit = ['','-基础','-主体'];
              var sname = localStorage.getItem('sname');
              var title = sname + lit[tscope.showtype] + '- 送检统计图';
                hntchart(arr[tscope.showtype],title); 

                 ycchart(myscope.yuancai,'工程原材送检统计图');
  },500);
            
      
}
              

              tscope.$apply();

            });
        }
    }; 
}]);

//进度管理切换  基础  主体  屋面
myctrl.directive('changest',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
            var tscope = fac.getscope_byid($scope,2);   
              tscope.showtype = iAttrs.changest;

              var myscope = fac.getscope_byid($scope,$scope.comctrlid);   

              var arr = [myscope.quanbu,myscope.jichu,myscope.zhuti];
              var lit = ['','-基础','-主体'];
              var sname = localStorage.getItem('sname');
              var title = sname + lit[tscope.showtype] + '- 送检统计图';
                hntchart(arr[tscope.showtype],title);  


              myscope.$apply();
               setTimeout(function(){
               $('*[data-toggle="tooltip"]').tooltip();
            },300);

            });
        }
    }; 
}]);


//设置本地存储 
    myctrl.directive('setlocalstorage', ['fac', function (fac) {
        return {
            link: function ($scope, iElm, iAttrs, controller) {
                iElm.on("click", function () {
                    var key = iAttrs.setlocalstorage;
                    fac.setstore(key, iAttrs.code);
                });
            }
        };
    }]);



//是否显示漏送
myctrl.directive('lsshow',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
              console.log($scope); 
               var myscope = fac.getscope_byid($scope,2);   
              myscope.lsshow = myscope.lsshow=='0'?1:0;
              myscope.$apply();
            });
        }
    }; 
}]); 


//个人中心start
//发送验证码
myctrl.directive('modsendcode',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                var obj = $(this);
                if (!$scope.data.oldpasswd) {layer.msg('请输入旧密码!');return false;}
                if (!$scope.data.tel||$scope.data.tel.length<11) {layer.msg('请输入正确的手机号!');return false;}
                var url = root2 + 'ver1/Login/phonecode';
                fac.post(url,$scope.data,function(re){
                   
                      $("#sendcode").prop('disabled',true);
                    if (re.code>0) {
                      setTimeout(function(){
                        fac.sendphone(obj); 
                       },1000);
                    
                    }else{
                      $("#sendcode").prop('disabled',false);
                    }
                    layer.msg(re.desc);
                });                
            });
        }
    };
}]);
//保存修改
myctrl.directive('changepsw',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                // var senddata = {phcode:$scope.data.phcode,newpasswd:$scope.data.newpasswd};
                var url = root2 + 'ver1/Index/user_password_phone';

                fac.post(url,$scope.data,function(re){
                    layer.msg(re.msg);
                    if (re.code>0) {
                       // window.location.reload();
                     window.location.href = "./login.html";
                    }
                });

            });
        }
    };
}]); 
//头像预览
myctrl.directive('changeimg',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("change",function(){
                var objUrl = fac.getObjectURL(this.files[0]) ;
                if(objUrl){$('.basicinfortimg').find('img').attr("src", objUrl);}  
                $(iAttrs.element).ajaxSubmit({
                    url:root2+'ver1/Index/uploadImage',
                    success: function(re) {
                          $scope.imgurl='php/'+re.url;
                          $scope.$apply();
                    }
                }); 
            });
        }
    };
}]); 

//基本信息保存修改
myctrl.directive('saveperson',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                $(iAttrs.element).ajaxSubmit({
                    url:root2+iAttrs.saveperson,
                    success: function(re) {
                       layer.msg(re.msg);
                       // setTimeout(function(){
                       //    window.location.reload();
                       // },1000);
                    }
                });     
            });
        }
    };
}]);

//保存个人信息
myctrl.directive('sameimg',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
                var data = $scope.user_info_list.datalist[0];
                var senddata = {};
                senddata.photourl = iAttrs.sameimg == '1'?data.pcweimg:data.qqimg;
                var url = root2 + 'ver1/Index/user_info_save';
                //询问框  
                layer.confirm('确定要同步头像吗？', {
                  btn: ['确定','取消'] //按钮
                }, function(){
                  fac.post(url,senddata,function(re){
                    if (re.code>0) {
                       layer.msg('同步成功！',{icon:1});
                        $('.baseimg').attr('src',senddata.photourl);              
                    }else{
                       layer.msg('同步失败!',{icon:0}); 
                    }  
                  });   
                }, function(){});
            });
        }
    };
}]);

//基本信息解绑微信 QQ
myctrl.directive('userUnbind',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                var type = iAttrs.userUnbind;
                var tip = iAttrs.tip;
                var url = root2 + 'ver1/Index/unbindtwo';
                fac.post(url,{type:type},function(re){
                  if (re.code>0) {
                   layer.msg(re.msg,{icon:1});
                   $scope.user_info_list.datalist[0][tip] = 0;    
                   // $scope.$apply();                
                  }else{
                   layer.msg(re.msg,{icon:0}); 
                  }
                  
                });                
            });
        }
    };
}]); 

//显示土建资料的列表或者资料详情页
myctrl.directive('showtab',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
              var tscope = fac.getscope_byid($scope,2);
              var key = iAttrs.showtab;
              if($scope[key].chl&&$scope[key].chl.length>0){
                tscope.body.zlurl = 'html/program/zl_list.html';
                tscope.zllistdata.list = $scope[key].chl; 
              

              }else{
                console.log($scope[key]);
                tscope.body.zlurl = 'ziliao/gd/tujian/'+$scope[key].code+'.html?'+fac.time(); 
                fac.setstore('zlval',$scope[key]);

              }

              if($scope[key].o===''){
                $scope[key].o = '-open';
              }

              tscope.zllistdata.id =$scope[key].id;
              tscope.zllistdata.t =$scope[key].t;
              tscope.zllistdata.zf =$scope[key].zf?$scope[key].zf:'';
            


              tscope.zllistdata.name =$scope[key].name; 
             
              
              tscope.$apply();

               
            });
        }
    };
}]);
 
 //注册登陆start
 //触发QQ
//  myctrl.directive('sendqq',['fac', function(fac){ 
//     return {  
//         link: function($scope, iElm, iAttrs, controller) {
//             iElm.on("click",function(){
//                 $scope.sendqqtime.time = fac.time();
//                 $scope.$apply();
//             });
//         }
//     }; 
// }]); 
//发送短信
myctrl.directive('phonecode',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
                var key = iAttrs.phonecode;
                var obj = $(this);
                var url = root2 + 'ver1/Login/newphonecode';
                fac.post(url,$scope[key],function(re){
                  if (re.code>0) {
                    fac.sendphone(obj);                    
                  }else{
                   layer.msg(re.msg,{icon:0}); 
                  }
                  
                });

            });
        }
    }; 
}]); 
 
//关闭打开目录
myctrl.directive('closeopen',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(e){
              var key = iAttrs.closeopen;              
              $scope[key].o = $scope[key].o?'':'-open';
              $scope.$apply();
              e.stopPropagation();
            });
        }
    };
}]);

//创建并绑定
// myctrl.directive('createbind',['fac', function(fac){ 
//     return { 
//         link: function($scope, iElm, iAttrs, controller) {
//             iElm.on("click",function(){ 
//                 if (!$scope.createbindData.tel) {layer.msg('请填写手机号码!');return false;}
//                 if (!$scope.createbindData.yzmcode) {ayer.msg('请填写验证码!');return false;}
//                 if (!$scope.createbindData.smscode) {layer.msg('请填写短信验证码!');return false;}
//                 if (!$scope.createbindData.password) {layer.msg('请填写密码!');return false;}
//                 $scope.createbindTime.time = fac.time();
//                 $scope.$apply();
//             });
//         }
//     }; 
// }]); 
//注册 创建并绑定 
myctrl.directive('register',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 

                if (!$scope.registerData.tel) {layer.msg('请填写手机号码!',{icon:0});return false;}
                if (!$scope.registerData.yzmcode) {layer.msg('请输入验证码!',{icon:0});return false;}
                if (!$scope.registerData.smscode) {layer.msg('请输入短信验证码!',{icon:0});return false;}
                if (!$scope.registerData.password) {layer.msg('请输入密码!',{icon:0});return false;}
                $scope.registerTime.time = fac.time();
                $scope.$apply();
            });
        }
    }; 
}]);
 //注册登陆end

// 采集温度 
myctrl.directive('caijitem',["fac",function(fac){
  return {
    link: function($scope, iElm, iAttrs) {  
      iElm.on("click",function(){ 
          var temurl = iAttrs.temurl; 
          var cityid = iAttrs.caijitem; 
          // var loadi = layer.load('更新中……');
          var htmlobj = '';
          var url = root2  +'ver1/Index/temurl';
          fac.load(1);
          fac.post(url,{temurl:temurl},function(re){
            fac.load(0);
              if (re.code>0) {
                htmlobj = re.html;
          var wea = $(htmlobj).find('.wea-detail'); 
          var li = wea.find('li').length;
          var ilen = wea.find('i').length;
          var arr = [];
          for(i=0;i<li;i++){
          var ax = wea.find('li').eq(i).find('p').text();
          ax = $.trim(ax);
          var date = ax.split('日');

          var myDate = new Date();
          var Y = myDate.getFullYear();
          d = date[0].replace("月","-"); 
          riqi = Y +'-'+ d; 
          var time = fac.timetostr(riqi)/1000;

          var htem = wea.find('li').eq(i).find('i').find('font').eq(0).text();
          var ltem = wea.find('li').eq(i).find('i').find('font').eq(1).text();
          htem = parseInt(htem);
          ltem = parseInt(ltem);
          if(htem<ltem){
             var vvt = htem;
             htem = ltem;
             ltem = vvt;
          } 
          var vtem = (htem + ltem)/2;
          var obj = {'htem':htem,'ltem':ltem,'vtem':vtem,'time':time};
          arr.push(obj);
          }
          if(i>1){
            var data = {'temdata':eval(arr),'cityid':cityid};
            var sendurl = root2 + 'ver1/Index/setweather';
            fac.post(sendurl,data,function(re){
                if (re.code>0) {
                  // setTimeout(function(){
                  //   layer.close(loadi);
                  // },200); 
                }
            });      
          }





              }
          });

                 
      }); 
    }
  };
}]);

//改变当前资料目录的选中状态
myctrl.directive('changec',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){  
            var tscope = fac.getscope_byid($scope,2);
            var myscope = fac.getscope_byid($scope, $scope.comctrlid);
 
              $scope.value.c = $scope.value.c=='0'?1:0;
              $scope.$apply();
 

              $scope.value.c = $(this).is(':checked')?1:0;
              
              
              var send = {id:tscope.zllistdata.id,t:tscope.zllistdata.t,code:'',zf:tscope.zllistdata.zf};
              var arr = [];

              angular.forEach(tscope.zllistdata.list,function(elm){
                if(elm.c===1){arr.push(elm.id);}
              });
              send.code = arr.join(',');
              send.code = send.code!==''?send.code+',':'';
              myscope.program_struct_editFun = function(re,sco){
                // console.log(2222,$scope.value.c);
                fac.msg(re);
              };

              myscope.program_struct_editData = send;
              myscope.program_struct_editTime.time = fac.time();
              console.log(myscope.program_struct_editTime);
              myscope.$apply();



              
            });
        }
    };
}]);



//打印 HTML
myctrl.directive('print',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){  
              var css = $('#printcss').html();
              var stl = '<style type="text/css" media="screen">'+css+'</style>'; 
              var html =stl + $('#printtable').html();
              
             

              LODOP=getLodop();  
              LODOP.PRINT_INIT("");
               if ($('#printtable').width()>800) {
               LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
               };
              LODOP.ADD_PRINT_HTM(0,20,"100%","100%",html);
              LODOP.PREVIEW();
            });
        }
    };
}]);

//打印 TABLE
myctrl.directive('printtable',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){  
              var css = $('#printcss').html();
              var stl = '<style type="text/css" media="screen">'+css+'</style>'; 
              var html =stl + $('#printtable').html();
              LODOP=getLodop();  
              LODOP.PRINT_INIT("");
              if ($('#printtable').width()>800) {
               LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
               };
              LODOP.ADD_PRINT_TABLE(35,20,"100%","100%",html);
              LODOP.PREVIEW();
            });
        }
    };
}]);

//私有事件 保存工程的 省市
myctrl.directive('saveprocity', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event){ 
          var _this = $(this); 
          var key = iAttrs.saveprocity;
          var sd = {};
          sd.codeid = $scope.value.codeid;
          sd.pid = $('#pid').val();
          sd.cityid = $('#cityid').val();
          var tscope = fac.getscope_byid($scope,2);

          sd[key] = iElm.val();
          var url = root2 + config.url.com_em.url;
          fac.post(url,sd,function(re){ 
               fac.msg(re);
               if(re.code==1){
                    $scope.program_pro_listTime.time = fac.time();
                    tscope.litsave = 0;
               } 
          }); 
        });
      }
    };
  }]);






//私有事件 修改用密码
myctrl.directive('savepsd', ['fac', function(fac) {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click", function(event){
        var tscope = fac.getscope_byid($scope,2);
        if ($.trim(tscope.winData.oldpasswd)=='') {
             layer.msg('旧密码不能少于六位!');
             return false;
        }
        
        if ($.trim(tscope.winData.newpasswd).length<6) {
            layer.msg('新密码不能少于六位');
            return false;
        }

        if ($.trim(tscope.winData.newpasswd)!=$.trim(tscope.winData.newpasswdtwo)) {
                      layer.msg('两次密码不一致')
                      return false; 
        }
        var senddata = angular.copy(tscope.winData);
        senddata.oldpasswd = fac.MD5(senddata.oldpasswd);
        senddata.newpasswd = fac.MD5(senddata.newpasswd);
        senddata.newpasswdtwo = fac.MD5(senddata.newpasswdtwo);
        var url = root2 + config.url.user_info_psd.url;
        fac.post(url,senddata,function(re){
            fac.lmsg(re);
            if (re.code>0) { 
              setTimeout(function(){
                 layer.closeAll();
              },2000);
            }
        });
      });
      }  

    };
  }]);






// div 更新
myctrl.directive('setkey',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("blur",function(){  
                $scope[iAttrs.setkey] = $(this).html();
                $scope.$apply();
            });
        }
    };
}]);
 

//送检汇总  start *******************************
//导出
myctrl.directive('getherexport',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
            var name = $scope.program_gether_selData.btime +'至'+ $scope.program_gether_selData.etime +'送检记录';
                $('.pvtTable').find('.titlename').removeClass('dpn');
                $('.pvtTable').tableExport({ type: 'excel', fileName: name });
                $('.pvtTable').find('.titlename').addClass('dpn');
            }); 
        }
    };
}]);

//保存为 用户数据
myctrl.directive('saveasuser',['fac', function(fac){ 
return { 
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click",function(){ 
          var myscope = fac.getscope_byid($scope,$scope.hzid);

            var con = layer.confirm('保存后，本表格的数据存为用户数据，且不再被系统更新，您确定要保存么？', {
              btn: ['确定','取消'] //按钮
            }, function(){
              console.log(myscope.Sdata);
              layer.close(con);
             
            }); 
        });
    }
};
}]); 


//保存为 系统数据
myctrl.directive('saveassystem',['fac', function(fac){ 
return { 
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click",function(){   
           var myscope = fac.getscope_byid($scope,$scope.hzid);
            var con = layer.confirm('重置后，本表格将采用系统数据，同时用户数据将被删除，您确定要重置么？', {
              btn: ['确定','取消'] //按钮
            }, function(){ 
              console.log(myscope.Sdata);
              layer.closeAll(con);
             
            }); 
        });
    }
};
}]);


//送检汇总  end   *******************************

 

//资料的a数据编辑事件
myctrl.directive('diva',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("blur",function(){  
               var x = $(this).text(); 
               $scope.value.a[iAttrs.diva] = x;
               $scope.$apply();

            }); 
        }
    };
}]);

//资料的b数据编辑事件
myctrl.directive('divb',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("blur",function(){  
               var x = $(this).text(); 
               $scope.value.b[iAttrs.diva] = x;
               $scope.$apply(); 
            }); 
        }
    };
}]);


//资料的c数据编辑事件
myctrl.directive('divc',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("blur",function(){  
               var x = $(this).text(); 
               $scope.value.c[iAttrs.divc][iAttrs.key] = x;
               $scope.$apply(); 
            }); 
        }
    };
}]);

//资料的c数据编辑事件
myctrl.directive('html2png',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){  
              fac.load(1);
        YS('html2canvas',function() {
             html2canvas( $('#tocanvas') ,  {
              onrendered: function(canvas) 
              { 
                 var name = iAttrs.html2png +'.png';
               fac.load(0); 
                $('#down_button').attr( 'href' , canvas.toDataURL() );
                $('#down_button').attr( 'download' , name) ;
                $('#down_button').css('display','inline-block'); 
                $('.html2png').css('display','none'); 
                
              }
            });
        });        


            }); 
        }
    };
}]);

//关闭当前窗口
myctrl.directive('closewin',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
              window.opener=null;
              window.open('','_self');
              window.close();
                }); 
        }
    };
}]);

//发表建议
myctrl.directive('savefeed',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
              var myscope = fac.getscope_byid($scope,2);
              myscope.com_feedFun = function(re){
                if(re.code==1){
                  layer.closeAll();
                  layer.msg('发布成功，谢谢参与',{icon:1}); 
                }else{
                   layer.msg('发布失败',{icon:0}); 
                }
              }
              myscope.com_feedTime.time = fac.time();
              myscope.$apply();
                }); 
        }
    };
}]);

//保存送检记录 savejilu
myctrl.directive('savejilu',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){ 
              var myscope = fac.getscope_byid($scope,$scope.comctrlid);
               myscope.program_gether_saveData = {
                codeid:fac.getstore('prcodeid'),
                btime:myscope.program_gether_selData.btime,
                etime:myscope.program_gether_selData.etime
               };
               myscope.program_gether_saveFun = function(re) {
                  if(re.code==1){
                  layer.closeAll();
                  layer.msg('送检快照保存成功,您可以在送检快照中查看。',{icon:1}); 
                }else{
                   layer.msg('送检快照保存失败',{icon:2}); 
                }
               }
               myscope.program_gether_saveTime.time = fac.time();
               myscope.$apply();

              // myscope.com_feedFun = function(re){
              //   if(re.code==1){
              //     layer.closeAll();
              //     layer.msg('发布成功，谢谢参与',{icon:1}); 
              //   }else{
              //      layer.msg('发布失败',{icon:0}); 
              //   }
              // }
              // myscope.com_feedTime.time = fac.time();
              // myscope.$apply();
                }); 
        }
    };
}]);

myctrl.directive('markfile', ["fac", function(fac) {
    return {
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click", function() {
                $("#execl_form").ajaxSubmit({
                    url: root2 + 'ver1/Index/exportxlsmatter',
                    success: function(data) {
                        console.log(data); 
                    },
                    error: function(xhr) {
                        
                    }
                });
            });
        }
    };
}]);


































































































































// angular 新架构
//2. com_ctrl   公共ctrl
 myctrl.controller('comctrl', ['$scope','facv','hdl',function($scope,fac,hdl){
  $scope.yscid = $scope.$id; 
   // 公共编辑更新一条
  $scope.com_update = {
      time:0,
      params:{}, 
      data:{},
    done:function(re,sco){
      layer.msg('更新成功');
    }
  }; 
  
  fac.ysfetch($scope,'com_update'); 

  // 公共列表无分页
  $scope.com_list = {time:0,params:{},data:{}};  
  fac.ysfetch($scope,'com_list');
  $scope.com_list2 = {time:0,params:{},data:{}};  
  fac.ysfetch($scope,'com_list2');
  $scope.com_list3 = {time:0,params:{},data:{}};  
  fac.ysfetch($scope,'com_list3');


  
 // 公共分页列表
  $scope.com_list_page = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_list_page'); 
  $scope.com_list_page2 = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_list_page2'); 

$scope.com_list_page3 = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_list_page3');

  $scope.com_artlist_page = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_artlist_page');

  $scope.com_detail = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_detail');
 // 公共删除
  $scope.com_del = {time:0,params:{},data:{}};  
  fac.ysfetch($scope,'com_del'); 
   $scope.com_del2 = {time:0,params:{},data:{}};  
  fac.ysfetch($scope,'com_del2'); 

   // 公共增加和编辑
  $scope.com_editadd = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_editadd');
  $scope.com_editadd2 = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_editadd2');
  $scope.com_editadd3 = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_editadd3');
   $scope.com_editadd4 = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_editadd4');
  $scope.com_editadd5 = {time:0,params:{},data:{}}; 
  fac.ysfetch($scope,'com_editadd5');
 
 
var a = location.href.split('#/');
 url = a[1]||'demopage';
var urlarr = url.split('/');
var t = urlarr.join('_');    
   var module= hdl[t];
   for(var k in module){
    if(k=='init'){
      hdl[t][k]($scope);
    }else{
    var key = t+'_'+k; 
    $scope[key] = angular.copy(module[k]); 
    fac.ysfetch($scope,key);
    }
   }
//默认出事状态，第一页0；
 $scope.value ={};
 $scope.tapshow = 0;

//默认页面是编辑状态，0，非编辑，1编辑状态
 $scope.editstatus = 0; 

 }]);


 myctrl.directive('tapshow',['fac', function(fac){ 
return { 
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click",function(){   
          var cscope = fac.getscope_byid($scope,$scope.yscid);
          cscope.tapshow = iAttrs.tapshow;
          cscope.$apply();
        });
     }
   };
}]);



 //公共触发时间戳
 myctrl.directive('comtime',['fac', function(fac){ 
 return { 
     link: function($scope, iElm, iAttrs, controller) {
         iElm.on("click",function(){  
           var cscope = fac.getscope_byid($scope,$scope.yscid);
           cscope[iAttrs.comtime].time = fac.time();
           cscope.$apply();
         });
      }
    };
 }]);


 //更新一条
 myctrl.directive('ysupdateone',['fac', function(fac){ 
 return { 
     link: function($scope, iElm, iAttrs, controller) {
         iElm.on("change",function(){  
          var cscope = fac.getscope_byid($scope,$scope.yscid); 
           var arr = iAttrs.ysupdateone.split('.'); 
           if(iAttrs.num==1){
                cscope[arr[0]][arr[1]].id=$scope.value.id;
           }else{
            cscope[arr[0]][arr[1]]=$scope.value;  
           }
           
           cscope[arr[0]][arr[1]][arr[2]]=$(this).val(); 
           cscope[arr[0]].time = fac.time();
          cscope.$apply(); 
         });
      }
    };
 }]);
 //私有  添加或编辑
myctrl.directive('ysaddpid',['fac', function(fac){ 
return { 
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("click",function(){ 
          var cscope = fac.getscope_byid($scope,$scope.yscid);
          cscope[iAttrs.ysaddpid].params.id = $scope.value.id; 
          cscope.$apply();
        });
     }
   };
}]);


//公共select 的选择事件
myctrl.directive('ysselect',['fac', function(fac){ 
return { 
    link: function($scope, iElm, iAttrs, controller) {
        iElm.on("change",function(){
        
          var arr = iAttrs.ysselect.split('.');
          var cscope = fac.getscope_byid($scope,$scope.yscid);
          cscope[arr[0]][arr[1]][arr[2]]=$(this).val(); 
          cscope.$apply(); 
        });
     }
   };
}]);

 //4. rander_fac 处理函数（就是请求接口前后做的事情[默认不做]）
angular.module("render", ["RongWebIMWidget"]).factory('hdl',['facv','WebIMWidget',function(fac,WebIMWidget){ 
  var dosomething = {
//资料管理 树形结构
  system_tbtype:{
      init:function(sco){  
          //获取  资料模板列表
           sco.com_list.url = 'index/archive_select';
           sco.com_list.params = {codeid:"123",debug:0,debugkey:"c85",name:"资料模板列表"}
         //  sco.com_list.time = fac.time(); 
           sco.com_list.before = function(sco){ 
            debugger;
           };

           //增加或编辑一个资料模板
           sco.com_editadd.url = 'index/archivetree_update';
           sco.com_editadd.params = {codeid:"123",debug:0,debugkey:"c85",name:"增加或编辑一个资料模板"}
          
          

           //获取专业列表
           sco.com_list2.url = 'index/major_select';
           sco.com_list2.params = {codeid:"123",debug:0,debugkey:"c85",name:"获取专业列表"}
           sco.com_list2.time = fac.time(); 
           sco.com_list2.before = function(sco){ 
           };

           //新增专业  api/ver1/index/major_add
           sco.com_editadd2.url =  'index/major_add';   
           sco.com_editadd2.params = {}

           sco.com_editadd2.before = function(sco){ 

             if (!sco.com_editadd2.params.name) {
              layer.msg('请填写专业名称');return false;
             }
             if (!sco.com_editadd2.params.pid) {
              layer.msg('请选择省份！');return false;
             }
             
             if (!sco.com_editadd2.params.visible) {
                sco.com_editadd2.params.visible=1;
             }

           };
          sco.com_editadd2.done = function(re,sco){
             if (re.code>0) {
                layer.msg('提交成功！');

                window.location.reload();
             }
          };

            

           //删除专业
           sco.com_del.url = 'index/major_del';
           sco.com_del.params = {};

           sco.com_del.before = function(sco){ 

           };
          sco.com_del.done = function(re,sco){
                 if (re.code>0) {
                  layer.msg('删除成功!');

                 }else{
                  layer.msg(re.msg);
                 }
          };
            
            //获取  省份
           sco.com_list3.url = 'open/prov';
           sco.com_list3.params = {codeid:"123",debug:0,debugkey:"c85",name:"资料模板列表"}
           sco.com_list3.time = fac.time(); 


            //新增菜单  api/ver1/index/major_add
           sco.com_editadd3.url =  'index/archive_insert';   
           // 参数{id:要添加子菜单的记录id,name:名称,icon:图标,visible:是否可见}
           sco.com_editadd3.params = {};
           sco.com_editadd3.before = function(sco){
             if (!sco.com_editadd3.params.id) {
               layer.msg('请选择上级菜单'); return false;
             }

             if (!sco.com_editadd3.params.name) {
               layer.msg('请填写菜单名称'); return false;
             }

            
             if (!sco.com_editadd3.params.type) {
               layer.msg('请选择类型'); return false;
             }

             if (!sco.com_editadd3.params.visible) {
               sco.com_editadd3.params.visible=1;
             }

           };

           sco.com_editadd3.done = function(re,sco){
              if (re.code>0) {
                layer.msg('提交成功！');
           setTimeout(function(){
           window.location.reload();
               },1000);
               
              }else{
                 layer.msg(re.msg); return false;
              }
           };



  //编辑菜单
           sco.com_editadd4.url =  'index/archive_update';   
           // 参数 对应id
           sco.com_editadd4.params = {};
           sco.com_editadd4.before = function(sco){

            debugger;
             if (!sco.com_editadd4.params.id) {
               layer.msg('请选择上级菜单'); return false;
             }

             if (!sco.com_editadd4.params.name) {
               layer.msg('请填写菜单名称'); return false;
             }

            
             if (!sco.com_editadd4.params.type) {
               layer.msg('请选择类型'); return false;
             }

             if (!sco.com_editadd4.params.visible) {
               sco.com_editadd4.params.visible=1;
             }

           };

           sco.com_editadd4.done = function(re,sco){
              if (re.code>0) {
                layer.msg('提交成功！');
           setTimeout(function(){
           window.location.reload();
               },1000);
               
              }else{
                 layer.msg(re.msg); return false;
              }
           };

  //更新单条 
           sco.com_editadd5.url =  'index/archive_update';   
           // 参数 对应id
           sco.com_editadd5.params = {};
           sco.com_editadd5.before = function(sco){};
           sco.com_editadd5.done = function(re,sco){
              if (re.code>0) {
                layer.msg('更新成功！');
              }else{
                 layer.msg(re.msg); return false;
              }
           };









        //删除专业  子菜单
           sco.com_del2.url = 'index/archive_del';
           sco.com_del2.params = {};

           sco.com_del2.before = function(sco){ 
        

           };

           sco.com_del2.done = function(re,sco){ 
             layer.msg(re.msg);

           };




            
           

      }
    },
    program_struct:{
    init:function(sco){ 


      console.log(WebIMWidget);

//从后台那表格模板数据
 sco.com_list.url = 'index/archive_select';
         sco.com_list.params = {codeid:"123",debug:0,debugkey:"c85",name:"demo测试接口"}
         sco.com_list.time = fac.time(); 
         sco.com_list.before = function(sco){
          
         };
         
         sco.com_list.done = function(re,sco){
         
         };






        YS('zTree',function() {
  var setting = {
      view: {
        dblClickExpand: false
      },
      check: {
        enable: true
      },
      callback: {
        onRightClick: OnRightClick
      }
    };

    var zNodes =[
      // {id:1, name:"无右键菜单 1", open:true, noR:true,
      //   children:[
      //        {id:11, name:"节点 1-1", noR:true},
      //        {id:12, name:"节点 1-2", noR:true} 
      // ]},

      {id:2, name:"旭日领裕园商住楼(5幢、6幢)工程", open:true,
        children:[
             {id:21, name:"工程前期",open:true,children:[
                   {id:31, name:"前期法定程序检查表"},
                   {id:32, name:"GD-C-318 施工现场质量管理检查表"}
              ]},
             {id:22, name:"工程管理",open:true,children:[
                   {id:31, name:"基线复核"},
                   {id:32, name:"烟气风道检查记录"}
              ]},
             {id:23, name:"5栋",open:true,children:[
                   {id:31, name:"地基与基础",open:true,children:[
                           {id:31,name:"基础",open:true,children:[
                           {"id":31, "name":"桩芯",children:[{id:22,'name':'钢筋加工检验批质量验收记录'},
                           {id:22,'name':'混凝土施工检验批质量验收记录'}
                           ]},
                           {"id":32, "name":"基础筏板",children:[{id:22,'name':'钢筋加工检验批质量验收记录'},
                           {id:22,'name':'混凝土施工检验批质量验收记录'}
                           ]}
                           ]}]},
                   {id:32, name:"主体结构",children:[
                           {id:31, name:"混凝土结构"} 
                      ]}
              ]},
             {id:23, name:"6栋",open:true,children:[
                   {id:31, name:"地基与基础",open:true,children:[
                           {id:31,name:"基础",open:true,children:[
                           {"id":31, "name":"桩芯",children:[{id:22,'name':'钢筋加工检验批质量验收记录'},
                           {id:22,'name':'混凝土施工检验批质量验收记录'}
                           ]},
                           {"id":32, "name":"基础筏板",children:[{id:22,'name':'钢筋加工检验批质量验收记录'},
                           {id:22,'name':'混凝土施工检验批质量验收记录'}
                           ]}
                           ]}]},
                   {id:32, name:"主体结构",children:[
                           {id:31, name:"混凝土结构"} 
                      ]}
              ]},
              {id:23, name:"7栋",open:true,children:[
                   {id:31, name:"地基与基础",open:true,children:[
                           {id:31,name:"基础",open:true,children:[
                           {"id":31, "name":"桩芯",children:[{id:22,'name':'钢筋加工检验批质量验收记录钢筋加工检验批质量验收记录'},
                           {id:22,'name':'混凝土施工检验批质量验收记录'}
                           ]},
                           {"id":32, "name":"基础筏板",children:[{id:22,'name':'钢筋加工检验批质量验收记录'},
                           {id:22,'name':'混凝土施工检验批质量验收记录'}
                           ]}
                           ]}]},
                   {id:32, name:"主体结构",children:[
                           {id:31, name:"混凝土结构"} 
                      ]}
              ]},
              {id:3, name:"竣工备案", open:true,
        children:[
             {id:31, name:"竣工备案验收记录表"}, 
        ]}



        ]},

      
      ];

    function OnRightClick(event, treeId, treeNode) {
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode(); 
        showRMenu("root", event.clientX, event.clientY);
      } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY);
      }
    }

    function showRMenu(type, x, y) {
      $("#rMenu ul").show();
      if (type=="root") {
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
      } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
      }

            y += document.body.scrollTop;
            x += document.body.scrollLeft;
            rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

      $("body").bind("mousedown", onBodyMouseDown);
    }
    function hideRMenu() {
      if (rMenu) rMenu.css({"visibility": "hidden"});
      $("body").unbind("mousedown", onBodyMouseDown);
    }
    function onBodyMouseDown(event){
      if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
        rMenu.css({"visibility" : "hidden"});
      }
    }
    var addCount = 1;
    function addTreeNode() {
      hideRMenu();
      var newNode = { name:"增加" + (addCount++)};
      if (zTree.getSelectedNodes()[0]) {
        newNode.checked = zTree.getSelectedNodes()[0].checked;
        zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
      } else {
        zTree.addNodes(null, newNode);
      }
    }
    function removeTreeNode() {
      hideRMenu();
      var nodes = zTree.getSelectedNodes();
      if (nodes && nodes.length>0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
          var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
          if (confirm(msg)==true){
            zTree.removeNode(nodes[0]);
          }
        } else {
          zTree.removeNode(nodes[0]);
        }
      }
    }
    function checkTreeNode(checked) {
      var nodes = zTree.getSelectedNodes();
      if (nodes && nodes.length>0) {
        zTree.checkNode(nodes[0], checked, true);
      }
      hideRMenu();
    }
    function resetTree() {
      hideRMenu();
      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    }

    var zTree, rMenu;
    $(document).ready(function(){
      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      zTree = $.fn.zTree.getZTreeObj("treeDemo");
      rMenu = $("#rMenu");
    });          







        });
         
  


RongIMLib.RongIMClient.init("k51hidwqkn7cb"); 
// 设置连接监听状态 （ status 标识当前连接状态 ）
 // 连接状态监听器
 RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
        switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('链接成功');
                break;
            case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在链接');
                break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接');
                break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.log('其他设备登录');
                break;
              case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.log('域名不正确');
                break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log('网络不可用');
              break;
            }
    }});

 // 消息监听器
 RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // 判断消息类型
        switch(message.messageType){
            case RongIMClient.MessageType.TextMessage:
                // message.content.content => 消息内容
                break;
            case RongIMClient.MessageType.VoiceMessage:
                // 对声音进行预加载                
                // message.content.content 格式为 AMR 格式的 base64 码
                break;
            case RongIMClient.MessageType.ImageMessage:
               // message.content.content => 图片缩略图 base64。
               // message.content.imageUri => 原图 URL。
               break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
               // message.content.extension => 讨论组中的人员。
               break;
            case RongIMClient.MessageType.LocationMessage:
               // message.content.latiude => 纬度。
               // message.content.longitude => 经度。
               // message.content.content => 位置图片 base64。
               break;
            case RongIMClient.MessageType.RichContentMessage:
               // message.content.content => 文本消息内容。
               // message.content.imageUri => 图片 base64。
               // message.content.url => 原图 URL。
               break;
            case RongIMClient.MessageType.InformationNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.CommandMessage:
                // do something...
               break;
            case RongIMClient.MessageType.UnknownMessage:
                // do something...
               break;
            default:
                // do something...
        }
    }
});


var token = "nItCX7gErftua4tNM5x3978pahRwm7+sVU505ICWdxb/VPko2Dzxz3cdSY5KIG4nEIV5mCCo0ZQ=";

  RongIMClient.connect(token, {
        onSuccess: function(userId) {
          console.log("Connect successfully." + userId);
        },
        onTokenIncorrect: function() {
          console.log('token无效');
        },
        onError:function(errorCode){
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                  info = '不可接受的协议版本';
                  break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                  info = 'appkey不正确';
                  break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                  info = '服务器不可用';
                  break;
              }
              console.log(errorCode);
            }
      });























    }},
}; 
  return dosomething;
}]);






// 日期插件
/*myctrl.directive('layerdateone',['fac', function(fac){ 
    return { 
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click",function(){
 var cscope = fac.getscope_byid($scope,$scope.comctrlid); 
        var arr = iAttrs.layerdateone.split('.'); 
                laydate.skin('molv');
                 laydate({ 
            format: 'YYYY-MM-DD hh:mm', // hh:mm:ss 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            istime: true,
            istoday: true,
            choose: function(datas){ //选择日期完毕的回调 
                cscope[arr[0]][arr[1]][arr[2]] = datas;
            }
        });
             });
        }
    };
}]);
*/




});