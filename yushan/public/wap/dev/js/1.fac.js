        //过滤
function gl(d){
 return  d.value?d.value:''; 
}


var TouchSlide=function(a){a=a||{};var b={slideCell:a.slideCell||"#touchSlide",titCell:a.titCell||".hd li",mainCell:a.mainCell||".bd",effect:a.effect||"left",autoPlay:a.autoPlay||!1,delayTime:a.delayTime||200,interTime:a.interTime||2500,defaultIndex:a.defaultIndex||0,titOnClassName:a.titOnClassName||"on",autoPage:a.autoPage||!1,prevCell:a.prevCell||".prev",nextCell:a.nextCell||".next",pageStateCell:a.pageStateCell||".pageState",pnLoop:"undefined "==a.pnLoop?!0:a.pnLoop,startFun:a.startFun||null,endFun:a.endFun||null,switchLoad:a.switchLoad||null},c=document.getElementById(b.slideCell.replace("#",""));if(!c)return!1;var d=function(a,b){a=a.split(" ");var c=[];b=b||document;var d=[b];for(var e in a)0!=a[e].length&&c.push(a[e]);for(var e in c){if(0==d.length)return!1;var f=[];for(var g in d)if("#"==c[e][0])f.push(document.getElementById(c[e].replace("#","")));else if("."==c[e][0])for(var h=d[g].getElementsByTagName("*"),i=0;i<h.length;i++){var j=h[i].className;j&&-1!=j.search(new RegExp("\\b"+c[e].replace(".","")+"\\b"))&&f.push(h[i])}else for(var h=d[g].getElementsByTagName(c[e]),i=0;i<h.length;i++)f.push(h[i]);d=f}return 0==d.length||d[0]==b?!1:d},e=function(a,b){var c=document.createElement("div");c.innerHTML=b,c=c.children[0];var d=a.cloneNode(!0);return c.appendChild(d),a.parentNode.replaceChild(c,a),m=d,c},g=function(a,b){!a||!b||a.className&&-1!=a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className+=(a.className?" ":"")+b)},h=function(a,b){!a||!b||a.className&&-1==a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className=a.className.replace(new RegExp("\\s*\\b"+b+"\\b","g"),""))},i=b.effect,j=d(b.prevCell,c)[0],k=d(b.nextCell,c)[0],l=d(b.pageStateCell)[0],m=d(b.mainCell,c)[0];if(!m)return!1;var N,O,n=m.children.length,o=d(b.titCell,c),p=o?o.length:n,q=b.switchLoad,r=parseInt(b.defaultIndex),s=parseInt(b.delayTime),t=parseInt(b.interTime),u="false"==b.autoPlay||0==b.autoPlay?!1:!0,v="false"==b.autoPage||0==b.autoPage?!1:!0,w="false"==b.pnLoop||0==b.pnLoop?!1:!0,x=r,y=null,z=null,A=null,B=0,C=0,D=0,E=0,G=/hp-tablet/gi.test(navigator.appVersion),H="ontouchstart"in window&&!G,I=H?"touchstart":"mousedown",J=H?"touchmove":"",K=H?"touchend":"mouseup",M=m.parentNode.clientWidth,P=n;if(0==p&&(p=n),v){p=n,o=o[0],o.innerHTML="";var Q="";if(1==b.autoPage||"true"==b.autoPage)for(var R=0;p>R;R++)Q+="<li>"+(R+1)+"</li>";else for(var R=0;p>R;R++)Q+=b.autoPage.replace("$",R+1);o.innerHTML=Q,o=o.children}"leftLoop"==i&&(P+=2,m.appendChild(m.children[0].cloneNode(!0)),m.insertBefore(m.children[n-1].cloneNode(!0),m.children[0])),N=e(m,'<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'),m.style.cssText="width:"+P*M+"px;"+"position:relative;overflow:hidden;padding:0;margin:0;";for(var R=0;P>R;R++)m.children[R].style.cssText="display:table-cell;vertical-align:top;width:"+M+"px";var S=function(){"function"==typeof b.startFun&&b.startFun(r,p)},T=function(){"function"==typeof b.endFun&&b.endFun(r,p)},U=function(a){var b=("leftLoop"==i?r+1:r)+a,c=function(a){for(var b=m.children[a].getElementsByTagName("img"),c=0;c<b.length;c++)b[c].getAttribute(q)&&(b[c].setAttribute("src",b[c].getAttribute(q)),b[c].removeAttribute(q))};if(c(b),"leftLoop"==i)switch(b){case 0:c(n);break;case 1:c(n+1);break;case n:c(0);break;case n+1:c(1)}},V=function(){M=N.clientWidth,m.style.width=P*M+"px";for(var a=0;P>a;a++)m.children[a].style.width=M+"px";var b="leftLoop"==i?r+1:r;W(-b*M,0)};window.addEventListener("resize",V,!1);var W=function(a,b,c){c=c?c.style:m.style,c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms",c.webkitTransform="translate("+a+"px,0)"+"translateZ(0)",c.msTransform=c.MozTransform=c.OTransform="translateX("+a+"px)"},X=function(a){switch(i){case"left":r>=p?r=a?r-1:0:0>r&&(r=a?0:p-1),null!=q&&U(0),W(-r*M,s),x=r;break;case"leftLoop":null!=q&&U(0),W(-(r+1)*M,s),-1==r?(z=setTimeout(function(){W(-p*M,0)},s),r=p-1):r==p&&(z=setTimeout(function(){W(-M,0)},s),r=0),x=r}S(),A=setTimeout(function(){T()},s);for(var c=0;p>c;c++)h(o[c],b.titOnClassName),c==r&&g(o[c],b.titOnClassName);0==w&&(h(k,"nextStop"),h(j,"prevStop"),0==r?g(j,"prevStop"):r==p-1&&g(k,"nextStop")),l&&(l.innerHTML="<span>"+(r+1)+"</span>/"+p)};if(X(),u&&(y=setInterval(function(){r++,X()},t)),o)for(var R=0;p>R;R++)!function(){var a=R;o[a].addEventListener("click",function(){clearTimeout(z),clearTimeout(A),r=a,X()})}();k&&k.addEventListener("click",function(){(1==w||r!=p-1)&&(clearTimeout(z),clearTimeout(A),r++,X())}),j&&j.addEventListener("click",function(){(1==w||0!=r)&&(clearTimeout(z),clearTimeout(A),r--,X())});var Y=function(a){clearTimeout(z),clearTimeout(A),O=void 0,D=0;var b=H?a.touches[0]:a;B=b.pageX,C=b.pageY,m.addEventListener(J,Z,!1),m.addEventListener(K,$,!1)},Z=function(a){if(!H||!(a.touches.length>1||a.scale&&1!==a.scale)){var b=H?a.touches[0]:a;if(D=b.pageX-B,E=b.pageY-C,"undefined"==typeof O&&(O=!!(O||Math.abs(D)<Math.abs(E))),!O){switch(a.preventDefault(),u&&clearInterval(y),i){case"left":(0==r&&D>0||r>=p-1&&0>D)&&(D=.4*D),W(-r*M+D,0);break;case"leftLoop":W(-(r+1)*M+D,0)}null!=q&&Math.abs(D)>M/3&&U(D>-0?-1:1)}}},$=function(a){0!=D&&(a.preventDefault(),O||(Math.abs(D)>M/10&&(D>0?r--:r++),X(!0),u&&(y=setInterval(function(){r++,X()},t))),m.removeEventListener(J,Z,!1),m.removeEventListener(K,$,!1))};m.addEventListener(I,Y,!1)};


window.fac = {
  changeClass:function(classname){ 
    window.event.stopPropagation();
    this[classname] = !this[classname]; 
  },
  binditem:function() {
              $(document).on('click','.js_item', function(){
            var id = $(this).data('id');
            window.pageManager.go(id);
                });

            $(document).on('click','.js_back', function(){
                var id = $(this).data('id');
                window.pageManager.back(id);
            });
  },
  changeopen:function(dv,key) { 
         $a = $(dv).find('.weui-mask');
         if(key=='all'){
            this.prosta = false;
            this.sinsta = false;
            $a.fadeOut(300);
         }else{
            var nakey = key=='prosta'?'sinsta':'prosta';
            this[nakey] = false;

          this[key] = !this[key];
          var t = this[key]?$a.fadeIn(300):$a.fadeOut(300); 
         }
          
        }, 
  setcode:function(mvu) {
        //对返回的工程，子单位进行存储处理；prcodeid,scodeid ,prname,sname;
     var obj = {prcodeid:'',scodeid:'',prname:'',sname:'',proindex:0,sinindex:0};
    if(mvu.com_pro.data.datalist.length>0){
        var pro = mvu.com_pro.data.datalist[0];
        obj.prcodeid = pro.codeid;
        obj.prname = pro.prname;
        if(pro.sinchl.datalist.length>0){
            var sin = pro.sinchl.datalist[0];
            obj.scodeid = sin.codeid;
            obj.sname = sin.sname; 
        }
    } 
    fac.setstore('sitedata',obj);  
        },
afterloaddo:function(mainvue,clb) {  
    if(mainvue.com_pro.status==1){
        //送检计划 ， 选原材后 sname  二次进入时取第一工程数据
      if (fac.getsname=='原材') {fac.setcode(mainvue);}      
     clb(mainvue);
     fac.binditem();
}else{
    fac.load(1);
    mainvue.com_pro.done = function(mvu){
    fac.setcode(mvu);
    // mainvue.sitedata = obj;

      clb(mvu);
      fac.load(0);
      fac.binditem();
      if(mvu.com_pro.data.datalist.length>0){}else{
        fac.showlip('请先创建工程及子单位！',3000); 
      }
      
    };
mainvue.com_pro.watch.time = fac.time();
} 



},
setcodeid:function(codeid,k) {
           fac.setstore('wecodeid',codeid);
           fac.setstore('stype',k);
        },
  showlip:function(str,time) { 
        var ht = time?time:2000;
       if($('#lip').css('display') != 'none'){return;}  
       $('#lip').find('.con').html(str);
       $('#lip').fadeIn(200);
       setTimeout(function() {
          $('#lip').fadeOut(200);
       },ht);
      
  },
  load:function(num){
    if(num){
       if($('.weui-loadmore').css('display') != 'none'){return;} 
   }
   var t = num?$('.weui-loadmore').fadeIn(200):$('.weui-loadmore').fadeOut(200);
  },
  bigload:function(num,s) {
    var str =s?s:'数据加载中';
    $('#loadingToast').find('p').html(str);
     if(num){
       if($('#loadingToast').css('display') != 'none'){return;} 
   }
   var t = num?$('#loadingToast').fadeIn(100):$('#loadingToast').fadeOut(100); 

   setTimeout(function() {
     $('#loadingToast').fadeOut(100);
   },10000);
  },
  bigdone:function(n) {
     
  },
  before:function(mv,key) {
       fac.bigload(1);
       var sitedata = fac.getstore('sitedata');
       mv[key].params = {codeid:sitedata.prcodeid};
  },
 
  done:function(mv) { 
      setTimeout(function() { fac.bigload(0);},600);
  },
  getprname:function() {
     return fac.getstore('sitedata')['prname']; 
  },
  getsname:function() {
      return fac.getstore('sitedata')['sname'];  
  },
  yschk:function(value,key) { 
      var data = {codeid:value.codeid};
      data[key] = value[key]==0?1:0;
      var url = YSCONF.url.com_em.url;
       // debugger;
      fac.post(url,data,function(re){
        if(re.code==1){
            value[key] = data[key];
            $.toptip('保存成功', 'success');
        }else{
            $.toptip('更新失败', 'error');
        }
      });
  },
  dore:function(re,str) {
      if(re.code==1){
        $.toptip('保存成功', 'success');
        setTimeout(function() { 
          window.pageManager.back(str);
        },1000);
      }else{
        $.toptip(re.msg+',保存失败', 'error');
      }
  },
  coverobj:function(o,n,override){
        //合并两个对象；override 是新对象n 是否覆盖老对象o；
       for(var p in n)if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[p]=n[p];
        return o;
    },
      dozushu:function(zs) {
        var arr = [];
        for(i=0;i<zs;i++){
          arr.push({val:''});
        }              
        return arr;
      },
      spl:function(str,k) {
        if(!str)return '';
        var el = str.split(',');
        var re = el[k]?el[k]:'';
         return re;
      },
seturl:function(part){
  //   var name = YSCONF.url[part].name||'';
  // console.log({scope:sco,name:name});
//路径
var path = YSCONF.url[part].url;
//var len = path.split('/').length;
//接口层级，如  a/b 就是root2； a/b/c 就是root3;
//var rooturl = 'root'+len;
//真实路径
//var url = window[rooturl] + path;
var url = path;

//测试路径
// if(location.href.split('.')[0]=='http://ys'||location.href.split('.')[0]=='http://192'){
//   len = part.split('_').length;
//   rooturl = 'root'+len;
//   url =window[rooturl] + part.split('_').join('/');
// } 
  var p = {
      url:url,
      method:YSCONF.url[part].method 
      };
  return p;
},
   loginpost:function(da,url,fun){      
       var re;    
       $.ajax({
        url:url,
        async:false,
        type:'POST',
        data:da,
        dataType:'json',
        success:function(re){if(typeof(fun)==="function"){fun(re);}},
        error:function(re){ if(typeof(fun)==="function"){fun(re);}}
       }); 
    },
     post:function(url,da,fun){      
       var re;    
       $.ajax({
        url:url,
        async:false,
        type:'POST',
        data:da,
        dataType:'json',
        success:function(re){if(typeof(fun)==="function"){
           if(re.code===-1){ 
                 // $.toast("登陆超时", "forbidden");
                 
                 setTimeout(function(){
                  window.location.href = "/wap/login.html";
                 },1000);
              }else{
               fun(re);
              }
          }},
        error:function(re){ if(typeof(fun)==="function"){fun(re);}}
       }); 
    },
     get:function(url,da,fun){      
       var re;    
       $.ajax({
        url:url,
        async:false,
        type:'GET',
        data:da,
        dataType:'json',
        success:function(re){if(typeof(fun)==="function"){
           if(re.code===-1){ 
                 // $.toast("登陆超时", "forbidden");
                 setTimeout(function(){
                  window.location.href = "/wap/login.html";
                 },1000);
              }else{
               fun(re);
              }
          }},
        error:function(re){ if(typeof(fun)==="function"){fun(re);}}
       }); 
    },
setCookie:function(name,value){
         //写cookies 
        var Days = 30; 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
        document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString(); 
    },
getCookie:function(c_name){
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
},
  bigload:function(num,s) {
    var str =s?s:'数据加载中';
    $('#loadingToast').find('p').html(str);
     if(num){
       if($('#loadingToast').css('display') != 'none'){return;} 
   }
   var t = num?$('#loadingToast').fadeIn(100):setTimeout(function(){$('#loadingToast').fadeOut(100)},1000); 

   setTimeout(function() {
     $('#loadingToast').fadeOut(100);
   },10000);
  },

 newWebupload:function(uploadName,pickId,uploadSuccess,uploadError){
 
  // console.log('newWebupload')
  uploadName = WebUploader.create({
      auto: true,
      // swf文件路径
      swf: './js/webupload/Uploader.swf',
      // 文件接收服务端。
    //  server: '/api.php/base/upload',  
      server:'/api/ver1/index/uploadImage',
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: ''+pickId+'',
      // mimeTypes:'image/*,text/plain,application/msword,application/octet-stream,application/vnd.ms-excel,application/x-shockwave-flash',
      accept: {
        title: 'Files',

        mimeTypes: 'image/*' //这个会导致只能打开手机相机，无法调用相册
      },
      // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
      resize: false,
      chunked: true, //是否要分片处理大文件上传
      chunkSize:0.5*1024*1024, //分片上传，每片2M，默认是5M
      fileNumLimit:500*1024*1024
  }); 

  // 当有文件被添加进队列的时候
     uploadName.on('fileQueued', function(file) {
         fac.bigload(1,'上传中…');
     }); 

  // 文件上传成功，给item添加成功class, 用样式标记上传成功。
  uploadName.on( 'uploadSuccess', function( file ,res) {    
      uploadSuccess(file,res);  
  });

  // 文件上传失败，显示上传出错。
  uploadName.on( 'uploadError', function( file,res ) {   
    uploadError(file,res);
  });

},

delCookie:function(name){ 
        //删除cookies 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=getCookie(name); 
        if(cval!==null){document.cookie= name + "="+cval+";expires="+exp.toGMTString();} 
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
        //返回时间戳；str 为空则返回当前时间戳；
   var timestamp = !str?Date.parse(new Date()):Date.parse(new Date(str)); 
   return timestamp; 
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
ysfetch:function(vueo,part){
    if(!vueo)return;
    if(!part)return; 
    var p = fac.seturl(part);
    fac[p.method](vueo,part); 
},
yssend:function(vueo,path,type){

     var p = fac.seturl(path); 
     if(!vueo[path].watch.time)return; 
       //运行前 ，执行的函数；
        if(typeof(vueo[path].before)==="function"){var v = vueo[path].before(vueo); if(v===false){return false;} } 
        var data = vueo[path].params||{};  
        fac[type](p.url,data,function(re){

             vueo[path].status = 1;
             vueo[path].data = re.code=='1'?re.data:{}; 
             if(typeof(vueo[path].done)==="function"){vueo[path].done(vueo,re);}
        }); 
},
yssendwatch:function(vueo,path,type){
        //路径 
  var p = fac.seturl(path);
  var time = path + '.watch.time';
  vueo.$watch(time,function(){
    if(!vueo[path].watch.time)return; 
   //运行前 ，执行的函数；
if(typeof(vueo[path].before)==="function"){var v = vueo[path].before(vueo); if(v===false){return false;} } 
var data = vueo[path].params||{};  
$('#test').html(JSON.stringify(data));
    fac[type](p.url,data,function(re){
      
         vueo[path].status = 1;
         vueo[path].data = re.code=='1'?re.data:{};
          // debugger;
         if(typeof(vueo[path].done)==="function"){vueo[path].done(vueo,re);}
    }); 
  },{deep: true});
}, 
  get_data:function(vueo,path){ 
fac.yssend(vueo,path,'get'); 
  },
    post_data:function(vueo,path){  
fac.yssend(vueo,path,'post');  
},
  get_data_watch:function(vueo,path){
  fac.yssendwatch(vueo,path,'get');
  },
  post_data_watch:function(vueo,path){ 
    fac.yssendwatch(vueo,path,'post');     
},
//验证手机号码是否正确，正确返回true  错误返回false；
testphone:function (num){    
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|145|147|159|153)+\d{8})$/;
  if(!myreg.test(num)){
    return false;
  }else{
    return true;
  }
},


msg:function (str,time) {
      time = time?time:2;
      layer.open({
        content: str,
        skin: 'msg',
        time: time 
      });
},
domatchart:function(data,title) { 
          var option = {
            "title": { 
            text:title,
            textStyle:{
                fontSize:'16'
            }
        },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        y:'25',
         x: 'right',
        data: ['已送', '未送', '漏送', '异常']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top:'50',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: data.name
    },
    series: [
        {
            name: '已送',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    formatter:gl,
                    position: 'insideRight'
                }
            },
             itemStyle:{
                  normal:{color:'#00cc33'}
              },
            data: data.ys
        },
        {
            name: '未送',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    formatter:gl,
                    position: 'insideRight'
                }
            },
             itemStyle:{
                  normal:{color:'#BBB'}
              },
            data: data.ws
        },
        {
            name: '漏送',
            type: 'bar',
            stack: '总量',
            label: {
                normal: { 
                    show: true,
                    formatter:gl,
                    position: 'insideRight'
                }
            },
            itemStyle:{
                  normal:{color:'#FF6666'}
              },
            data: data.ls
        } 
       
    ]
}; 
var myChart1 = echarts.init(document.getElementById('barone'),'vintage');//,"macarons"
myChart1.setOption(option);

myChart1.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params.name);
});
myChart1.on('legendselectchanged', function (params) {
  return false;
    // 获取点击图例的选中状态
    var isSelected = params.selected[params.name];
    // 在控制台中打印
    console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
    // 打印所有图例的状态
    console.log(params.selected);
});


},
hntchart:function(data,title) { 

            var option2 = {
                 "title": { 
                    text: title,
                    textStyle:{
                        fontSize:'16'
                    }
                }, 
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        y:'25',
        x: 'right',
        data: ['已送', '未送', '漏送', '异常']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: data.name
    },
    series: [
        {
            name: '已送',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    formatter:gl,
                    position: 'insideRight'
                }
            },
             itemStyle:{
                  normal:{color:'#00cc33'}
              },
            data: data.ys
        },
        {
            name: '未送',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    formatter:gl,
                    position: 'insideRight'
                }
            },
             itemStyle:{
                  normal:{color:'#bbbbbb'}
              },
            data:  data.ws
        },
        {
            name: '漏送',
            type: 'bar',
            stack: '总量',
            label: {
                normal: { 
                    show: true,
                    formatter:gl,
                    position: 'insideRight'
                }
            },
            itemStyle:{
                  normal:{color:'#FF6666'}
              },
            data:  data.ls
        },
        {
            name: '异常',
            type: 'bar',
            stack: '总量',
            label: {
                normal: { 
                    show: true,
                    formatter:gl,
                    position: 'insideRight'
                }
            },
            itemStyle:{
                  normal:{color:'#F93'}
              },
            data:  data.yc
        }
       
    ]
};

 

var myChart2 = echarts.init(document.getElementById('bartwo'),'vintage');//,"macarons"
myChart2.setOption(option2); 

 
}


 };



$(function () {
    var timeout;
      $.toptip = function(text, duration, type) {
    if(!text) return;
    if(typeof duration === typeof "a") {
      type = duration;
      duration = undefined;
    }
    duration = duration || 2000;
    var className = type ? 'bg-' + type : 'bg-danger';
    var $t = $('.weui_toptips').remove();
    $t = $('<div class="weui_toptips"></div>').appendTo(document.body);
    $t.html(text);
    $t[0].className = 'weui_toptips ' + className

    clearTimeout(timeout);

    if(!$t.hasClass('weui_toptips_visible')) {
      $t.show().width();
      $t.addClass('weui_toptips_visible');
    }

    timeout = setTimeout(function() {
      $t.removeClass('weui_toptips_visible');
      $t.remove();
    }, duration);
  };


    var pageManager = {
        $container: $('#container'),
        _pageStack: [],
        _configs: [],
        _pageAppend: function(){},
        _defaultPage: null,
        _pageIndex: 1,
        setDefault: function (defaultPage) {
            this._defaultPage = this._find('name', defaultPage);
            return this;
        },
        setPageAppend: function (pageAppend) {
            this._pageAppend = pageAppend;
            return this;
        },
        init: function () {
            var self = this;

            $(window).on('hashchange', function () {
                var state = history.state || {};
                var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
                var page = self._find('url', url) || self._defaultPage;
                if (state._pageIndex <= self._pageIndex || self._findInStack(url)) {
                    self._back(page);
                } else {
                    self._go(page);
                }
            });

            if (history.state && history.state._pageIndex) {
                this._pageIndex = history.state._pageIndex;
            }

            this._pageIndex--;

            var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
            var page = self._find('url', url) || self._defaultPage;
            this._go(page);
            return this;
        },
        push: function (config) {
            this._configs.push(config);
            return this;
        },
        go: function (to) {
            var config = this._find('name', to);
            if (!config) {
                return;
            }
            location.hash = config.url;
        },
        _go: function (config) {
            this._pageIndex ++;

            history.replaceState && history.replaceState({_pageIndex: this._pageIndex}, '', location.href);

            var html = $(config.template).html();
            var $html = $(html).addClass('slideIn').addClass(config.name);
            $html.on('animationend webkitAnimationEnd', function(){
                $html.removeClass('slideIn').addClass('js_show');
            });
            this.$container.append($html);
            this._pageAppend.call(this, $html);
            this._pageStack.push({
                config: config,
                dom: $html
            });

main[config.name]?main[config.name]():'';

            if (!config.isBind) {
                this._bind(config);
            }

            return this;
        },
        back: function () {
            history.back();
        },
        _back: function (config) {
            this._pageIndex --;

            var stack = this._pageStack.pop();
            if (!stack) {
                return;
            }

            var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
            var found = this._findInStack(url);
            if (!found) {
                var html = $(config.template).html();
                var $html = $(html).addClass('js_show').addClass(config.name);
                $html.insertBefore(stack.dom);

                if (!config.isBind) {
                    this._bind(config);
                }

                this._pageStack.push({
                    config: config,
                    dom: $html
                });
            }

            stack.dom.addClass('slideOut').on('animationend webkitAnimationEnd', function () {
                stack.dom.remove();
            });

            return this;
        },
        _findInStack: function (url) {
            var found = null;
            for(var i = 0, len = this._pageStack.length; i < len; i++){
                var stack = this._pageStack[i];
                if (stack.config.url === url) {
                    found = stack;
                    break;
                }
            }
            return found;
        },
        _find: function (key, value) {
            var page = null;
            for (var i = 0, len = this._configs.length; i < len; i++) {
                if (this._configs[i][key] === value) {
                    page = this._configs[i];
                    break;
                }
            }
            return page;
        },
        _bind: function (page) {
            var events = page.events || {};
            for (var t in events) {
                for (var type in events[t]) {
                    this.$container.on(type, t, events[t][type]);
                }
            }
            page.isBind = true;
        }
    };

    function fastClick(){
        var supportTouch = function(){
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }();
        var _old$On = $.fn.on;

        $.fn.on = function(){
            if(/click/.test(arguments[0]) && typeof arguments[1] == 'function' && supportTouch){ // 只扩展支持touch的当前元素的click事件
                var touchStartY, callback = arguments[1];
                _old$On.apply(this, ['touchstart', function(e){
                    touchStartY = e.changedTouches[0].clientY;
                }]);
                _old$On.apply(this, ['touchend', function(e){
                    if (Math.abs(e.changedTouches[0].clientY - touchStartY) > 10) return;

                    e.preventDefault();
                    callback.apply(this, [e]);
                }]);
            }else{
                _old$On.apply(this, arguments);
            }
            return this;
        };
    }
 
    function androidInputBugFix(){
        // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
        // 相关 issue: https://github.com/weui/weui/issues/15
        // 解决方法:
        // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
        // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
        //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
        if (/Android/gi.test(navigator.userAgent)) {
            window.addEventListener('resize', function () {
                if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                    window.setTimeout(function () {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }, 0);
                }
            });
        }
    }


    function setPageManager(){
        var pages = {}, tpls = $('script[type="text/html"]');
        var winH = $(window).height();

        for (var i = 0, len = tpls.length; i < len; ++i) {
            var tpl = tpls[i], name = tpl.id.replace(/tpl_/, '');
            pages[name] = {
                name: name,
                url: '#' + name,
                template: '#' + tpl.id
            };
        }
        pages.home.url = '#';

        for (var page in pages) {
            pageManager.push(pages[page]);
        }
        pageManager
            .setPageAppend(function($html){
                var $foot = $html.find('.page__ft');
                if($foot.length < 1) return;

                if($foot.position().top + $foot.height() < winH){
                    $foot.addClass('j_bottom');
                }else{
                    $foot.removeClass('j_bottom');
                }
            })
            .setDefault('home')
            .init();
    }

    function init(){ 
        fastClick();
        androidInputBugFix(); 
        setPageManager();

        window.pageManager = pageManager;
        window.home = function(){
            location.hash = '';
        };



    }
    init();
});


    $(function(){
//定义常用的公共方法 
// $(window).on('touchstart', function(){ console.log('body trigger tap event'); alert(123)});
        var winH = $(window).height();
        var categorySpace = 10;

// fac.binditem();


        //工程，子单位下拉 显示隐藏
      //   $(window).on('click','#prostlkey',function(){
      //   var sh = $('.prostl').hasClass('open');
      //   $('.prostl').toggleClass('open'); 
      //   !sh?$('#iosMask').fadeIn(200):$('#iosMask').fadeOut(200);
      // });

      //  $(window).on('click','#sinstlkey',function(){
      //   var sh = $('.sinstl').hasClass('open');
      //   $('.sinstl').toggleClass('open'); 
      //   !sh?$('#iosMask').fadeIn(200):$('#iosMask').fadeOut(200);
      // }); 
      // $(window).on('click','#iosMask',function(){
      //    $('.prostl').removeClass('open');
      //    $('.sinstl').removeClass('open');
      //    $('#iosMask').fadeOut(200);
      // });


       


      
    });














