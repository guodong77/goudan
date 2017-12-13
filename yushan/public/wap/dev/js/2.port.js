window.YSPORT = {}; 
var OBJ = { 
    data:{ 
    sitedata:{},
    com_pro:{
        status:0,
        data:[],
        params:{},
        watch:{time:0}
    }
    },
};

window.mainvue = new Vue(OBJ); 
fac.ysfetch(mainvue,'com_pro'); 


window.main = {
	home:function(){

function homectrl(mv) {
window.homevm = new Vue({
      el:'#myprolist',
      data:{
        prodata:mv.com_pro.data.datalist 
      },
      methods:{
        nopro:function() {
      //fac.showlip('请先创建工程及子单位！');
        alert('请先创建工程及子单位!');
        },
        pronum:function(arr) {
          var t = 0;
          this.prodata.map(function(elm) {
            if(elm.isdel==0){
              t += 1;
            }
          });
          return t;
           
        },
         checkpro:function(n) {                 
                      //拿sitedata 和 更新里面的数据；
                       var sitedata = fac.getstore('sitedata');
                       this.prname = this.prodata[n].prname;
                       sitedata.prname = this.prname;
                       sitedata.proindex = n ;                 /////cbz///// 
                       sitedata.prcodeid = this.prodata[n].codeid;
                       if(this.prodata[n].sinchl.datalist.length>0){
                        sitedata.sname = this.prodata[n].sinchl.datalist[0].sname;
                        sitedata.scodeid = this.prodata[n].sinchl.datalist[0].codeid;
                       }else{
                        sitedata.sname = '';
                        sitedata.scodeid = ''; 
                       }
                       fac.setstore('sitedata',sitedata);  
                    }
        }
  });

    TouchSlide({ 
          slideCell:"#focus",
          titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
          mainCell:".bd ul", 
          effect:"leftLoop", 
          autoPlay:true,//自动播放
          autoPage:true //自动分页
        });
     fac.bigload(0);

     
 
}

  fac.bigload(1);
setTimeout(function() {

  // body...//先判断 有还是没有
fac.afterloaddo(mainvue,homectrl);  
},300)
	},


	user:function(){

           var userobj = { 
            el:"#userbody",
            data:{ 
              ut:['','超级管理员','普通管理员','河狸建筑会员'], 
            user_info:{
                status:0,
                data:[],
                params:{},
                watch:{time:0}, 
            },
            unbindwe:{
              status:0,
                data:[],
                params:{type:3},
                watch:{time:0},
            }
            },
            methods:{
              unbind:function() {

                uservm.unbindwe.watch.time = fac.time();
              }
            }
        };

        var uservm = new Vue(userobj);

        fac.ysfetch(uservm,'user_info'); 
        fac.ysfetch(uservm,'unbindwe'); 
        
        uservm.user_info.watch.time = fac.time();



		
	},
  myinfo:function(){

          var myobj = { 
            el:"#mybody",
            data:{  
            my_info:{
                status:0,
                data:{},
                params:{},
                watch:{time:0}, 
            },
            my_edit:{
              status:0,
                data:{},
                params:{},
                watch:{time:0},
            }
            },
            methods:{
              save:function() { 
                myvm.my_edit.before = function(vm) {
                  debugger;
                  if (!myvm.my_info.data.nicheng) {
                     $.toptip('请填写昵称！', 'warning'); return false;
                    
                  }
                  myvm.my_edit.params = myvm.my_info.data;
                };
                myvm.my_edit.done = function(vm,re) {
                    fac.dore(re,'user');
                };
          setTimeout(function(){
            myvm.my_edit.watch.time = fac.time();
            },500);
                
              }
            }
        };

        var myvm = new Vue(myobj);

        fac.ysfetch(myvm,'my_info'); 
        fac.ysfetch(myvm,'my_edit'); 
        
        myvm.my_info.watch.time = fac.time();

        
  },
  pwd:function(){
    
          var pwdobj = { 
            el:"#pwdbody",
            data:{ 
            tempwd:{'oldpasswd':'','newpasswd':'','newpasswdtwo':''},  
            pwd_edit:{
              status:0,
                data:{},
                params:{},
                watch:{time:0},
            }
            },
            methods:{
              save:function() { 
                 
                pwdvm.pwd_edit.before = function(vm) {
                   if ($.trim(vm.tempwd.oldpasswd)=='') {
                    $.toptip('旧密码不能少于六位!', 'warning'); 
                         return false;
                    }
                    if ($.trim(vm.tempwd.newpasswd).length<6) { 
                        $.toptip('新密码不能少于六位!', 'warning'); 
                        return false;
                    }

                    if ($.trim(vm.tempwd.newpasswd)!=$.trim(vm.tempwd.newpasswdtwo)) { 
                                  $.toptip('两次密码不一致!', 'warning'); 
                                  return false; 
                    }

                    vm.tempwd.oldpasswd=MD5(vm.tempwd.oldpasswd);
                    vm.tempwd.newpasswd=MD5(vm.tempwd.newpasswd);
                    vm.tempwd.newpasswdtwo=MD5(vm.tempwd.newpasswdtwo);

                    vm.pwd_edit.params = vm.tempwd;
                };
                pwdvm.pwd_edit.done = function(vm,re) { 
                 fac.dore(re,'user');
                };

                pwdvm.pwd_edit.watch.time = fac.time();
              }
            }
        }; 
        var pwdvm = new Vue(pwdobj); 
        fac.ysfetch(pwdvm,'pwd_edit');
  },
  tel:function(){
    
           var telobj = { 
            el:"#telbody",
            data:{ 
              itime:0,
            temtel:{'tel':'','phcode':''},  
            tel_edit:{
              status:0,
                data:{},
                params:{},
                watch:{time:0},
            },
            get_code:{
              status:0,
                data:{},
                params:{},
                watch:{time:0},
            }
            },
            methods:{
              sendcode:function() {
                _this = this;
                telvm.get_code.before = function(vm) { 
                  var a = fac.testphone(vm.temtel.tel);
                  if(!a){
                    $.toptip('手机号码格式错误!', 'warning'); 
                    return false;
                  }
                    vm.get_code.params = vm.temtel;
                };
                telvm.get_code.done = function(vm,re) { 
                 if(re.code==1){
                      _this.itime = 60 ;                               
                      var Intervaler = setInterval(function(){
                        _this.itime -= 1;
                        if (_this.itime==0) {
                         clearInterval(Intervaler); 
                        }
                       },1000)
                 }else{
                  $.toptip(re.msg, 'warning'); 
                 }
                };
                 telvm.get_code.watch.time = fac.time();
              },
              save:function() {                 
                telvm.tel_edit.before = function(vm) { 
                    vm.tel_edit.params = vm.temtel;
                };
                telvm.tel_edit.done = function(vm,re) { 
                 fac.dore(re,'user');
                };

                telvm.tel_edit.watch.time = fac.time();
              }
            }
        }; 
        var telvm = new Vue(telobj); 
        fac.ysfetch(telvm,'tel_edit');
         fac.ysfetch(telvm,'get_code');  

  },
  shangxian:function(){
    var myobj = { 
            el:"#tuijianbody",
            data:{  
            my_info:{
                status:0,
                data:{},
                params:{},
                watch:{time:0}, 
            }, 
            },
            
        };

        var myvm = new Vue(myobj);

        fac.ysfetch(myvm,'my_info');  
        
        myvm.my_info.watch.time = fac.time();
  },
  reg:function(){
    
  },
  bind:function(){
    
  },
  sin:function(){
           
        //从sitedata 获取 proindex 当前工程 
        var sitedata = fac.getstore('sitedata');
        var proindex = sitedata.proindex;
        var sinindex = sitedata.sinindex;    
             function sinctrl(mv) {
                window.sinlistvm = new Vue({
                  el:'#sinbody',
                  data:{
                    prosta:false,        
                    proindex:proindex,
                    sinindex:'',
                    prodata:mv.com_pro.data.datalist,
                    prname:fac.getprname(),
                    sname:'', 
                    showdel:0,
                    prcode:'',
                    scode:'',
                    pro_del:{
                      data:{},
                      params:{},
                      watch:{time:0}
                    },
                    sin_del:{
                      data:{},
                      params:{},
                      watch:{time:0}
                    }             
                  },       
                  methods:{
                    yschk:fac.yschk,
                    changeopen:fac.changeopen, 
                    selectitem:function(arr,k) {
                        arr.map(function(elm) {
                           elm.check = 0; 
                        });
                        arr[k].check = arr[k].check?0:1;
                        this.scode = arr[k].codeid;
                        this.sname = arr[k].sname ;
                        this.sinindex = k;
                        this.showdel = arr[k].check;
                    },




                    delpro:function(val) {
                      var sitedata = fac.getstore('sitedata');
       var _this = this; 
 $('#iosDialog1').fadeIn(200);
 $('#iosDialog1').find('#diatext').html('确定要删除'+sitedata.prname+'么？');
  $(".dialogsyes").unbind();
 $('.dialogsyes').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200); 
           
                sinlistvm.pro_del.before = function(vm) {
                   if(sitedata.prcodeid==''){
                     $.toptip('请选择工程', 'warning');
                    return false;}
                  vm.pro_del.params = {codeid:sitedata.prcodeid}; 
                }; 
              sinlistvm.pro_del.done = function(vm,re) { 
              if(re.code==1){

                  homevm.prodata[_this.proindex].isdel = 1; 
                 
                  $.toptip('删除成功', 'success');

                   window.pageManager.back('home');

              }else{
                  $.toptip(re.msg+',删除失败', 'error');
              }
          }
                sinlistvm.pro_del.watch.time = fac.time();
               
        });

$('.dialogsno').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200);
          });
 
                    },





  delsin:function(arr){
     var sitedata = fac.getstore('sitedata');
       var _this = this; 
 $('#iosDialog1').fadeIn(200);
 $('#iosDialog1').find('#diatext').html('确定要删除'+this.sname+'么？');
 $(".dialogsyes").unbind();
 $('.dialogsyes').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200); 
           
                sinlistvm.sin_del.before = function(vm){
                  if(_this.scode==''){
                     $.toptip('请选择子单位', 'warning');
                    return false;}
                  vm.sin_del.params = {codeid:_this.scode}; 
                }; 
              sinlistvm.sin_del.done = function(vm,re) { 
              if(re.code==1){  
                _this.showdel = 0;
                  arr[_this.sinindex].isdel = 1; 
                  $.toptip('删除成功', 'success');
              }else{
                  $.toptip('删除失败', 'error');
              }
          }
                sinlistvm.sin_del.watch.time = fac.time();
               
        });

$('.dialogsno').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200);
          });

                    },       
                    checkpro:function(n) {
                      this.proindex = n;
                      this.prosta = false;
                      fac.changeopen('#sinbody','all');  
                      //拿sitedata 和 更新里面的数据；
                      var sitedata = fac.getstore('sitedata');
                      this.prname = this.prodata[n].prname;
                      this.prcode = this.prodata[n].codeid;
                       sitedata.prname = this.prname;
                       sitedata.prcodeid = this.prodata[n].codeid;

                       if(this.prodata[n].sinchl.datalist.length>0){
                        sitedata.sname = this.prodata[n].sinchl.datalist[0].sname;
                        sitedata.scodeid = this.prodata[n].sinchl.datalist[0].codeid;
                       }else{
                        sitedata.sname = '';
                        sitedata.scodeid = ''; 
                       }
                       fac.setstore('sitedata',sitedata);  
                    },
                     checksin:function(n) {
                       this.sinindex = n;
                       this.prname = this.prodata[this.proindex].prname;
                       this.sname = this.prodata[this.proindex].sinchl.datalist[this.sinindex].sname;                       
                       var sitedata = fac.getstore('sitedata');
                       sitedata.prcodeid =  this.prodata[this.proindex].codeid;
                       sitedata.scodeid =  this.prodata[this.proindex].sinchl.datalist[this.sinindex].codeid;
                       sitedata.prname =  this.prname; 
                       sitedata.sname =this.sname; 

                       sitedata.proindex=this.proindex;
                       sitedata.sinindex=this.sinindex;

                       fac.setstore('sitedata',sitedata);                      
                    },
                     
                  }
              }); 

fac.ysfetch(sinlistvm,'pro_del');
fac.ysfetch(sinlistvm,'sin_del');

          }
          //先判断 有还是没有 
          fac.afterloaddo(mainvue,sinctrl);  
        
  },
  addsin:function(){
    
        //从sitedata 获取 proindex 当前工程 
                
                var sinvm = new Vue({
                  el:'#addsinbody',
                  data:{                  
                    prname:fac.getprname(),
                    sin_add:{
                      status:0,
                      data:{
                            codeid:'',
                            sname:'',
                            jiegou:1,
                            zhuti:'',
                            jichu:'',
                            sinimg:'',                      
                            cengshu:''
                          },
                      params:{},
                      watch:{time:0},
                      done:fac.done
                     } 
                  },       
                  methods:{
                    createbuwei:function() {
                      var cs = parseInt(this.sin_add.data.cengshu); 
                        if(!cs){ fac.showlip('层数不能为空');return false; }
                        if(cs>50){ fac.showlip('层数不能超过50层');return false; } 
                        
                       

                        this.sin_add.data.jichu = YSCONF.ext.jichu.join('\n');
 
                        var arr = [];
                         for (var i = 0; i < cs; i++) {
                               var lb = YSCONF.ext.zhuti[i]+'层梁板';
                               arr.push(lb);
                               var type = this.sin_add.data.jiegou =='1'?'柱':'墙柱';
                               var qz = YSCONF.ext.zhuti[i]+'层'+type;
                               arr.push(qz);
                           }  
                           arr.push('屋面梁板');
                         this.sin_add.data.zhuti = arr.join('\n'); 


                    },
                    sin_addsave:function() { 
                      
                       sinvm.sin_add.before=function(mv) { 
                       
                        
                        var sitedata = fac.getstore('sitedata');  

                         if(mv.sin_add.data.sname==''){ fac.showlip('请输入工程名称');return false; } 
                         if(mv.sin_add.data.cengshu==''){ fac.showlip('请输入层数');return false; } 
                         if(mv.sin_add.data.jichu==''){ fac.showlip('请输入基础部位');return false; } 
                         if(mv.sin_add.data.zhuti==''){ fac.showlip('请输入主体部位');return false; } 
                         fac.bigload(1);
                          mv.sin_add.params = mv.sin_add.data;
                          mv.sin_add.params.codeid = sitedata.prcodeid;
                       };
                       sinvm.sin_add.done = function(mv,re) {
                        fac.bigload(0);
                                  //请求工程列表
                                    mainvue.com_pro.done = function(vm,re) {
                                       sinlistvm.prodata = vm.com_pro.data.datalist;
                                       fac.setcode(vm);
                                    }
                                    mainvue.com_pro.watch.time = fac.time(); 

                                    fac.dore(re,'sin');
                       }
                       sinvm.sin_add.watch.time = fac.time();  
                    },                   
                    
                  }
              });   

              fac.ysfetch(sinvm,'sin_add'); 
setTimeout(function() {
              fac.newWebupload('headerupload','#localPicker3',function(file,res){
                  fac.bigload(0,'上传中…');
                  if (res.code==1) {
             sinvm.sin_add.data.sinimg=res.url;

                  }
              },function(file){
                console.log('error');
              });
},300);





  },
  editsin:function(){
    


             //从sitedata 获取 proindex 当前工程 
        var sitedata = fac.getstore('sitedata');
        var proindex = sitedata.proindex;
        var sinindex = sitedata.sinindex;  
        function editsinctrl(mv) { 
                var editsinvm = new Vue({
                  el:'#editsinbody',
                  data:{                  
                    prname:fac.getprname(),                   
                    editsindata:mv.com_pro.data.datalist[proindex].sinchl.datalist[sinindex],
                    com_em:{
                        status:0,
                        data:[],
                        params:{},
                        watch:{time:0},
                    },
                  },       
                  methods:{                  
                    comsave:function() { 
                       editsinvm.com_em.before=function(mv) { 

                         if (!mv.editsindata.sname){
                             fac.showlip('工程名称不能为空');return false;
                         };
                         if (!mv.editsindata.cengshu){
                             fac.showlip('工程层数不能为空');return false;
                         };

                         mv.com_em.params = mv.editsindata;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       editsinvm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       editsinvm.com_em.watch.time = fac.time();  
                    }                   
                    
                  }
              }); 

              fac.ysfetch(editsinvm,'com_em'); 

              setTimeout(function() {
              fac.newWebupload('headerupload','#localPicker4',function(file,res){
                  fac.bigload(0,'上传中…');
                  if (res.code==1) {
             editsinvm.editsindata.sinimg=res.url;

                  }
              },function(file){
                console.log('error');
              });
},300);
          }  
        fac.afterloaddo(mainvue,editsinctrl);

  },
  work:function(){
      
function workctrl(mv) {
var ind =  fac.getstore('sitedata');
var pi = ind.proindex;
var si = ind.sinindex;

// if(mv.com_pro.data.datalist.length>0 && mv.com_pro.data.datalist[pi].sinchl.datalist.length==0){
//     fac.showlip('请先回到首页，创建子单位');
// } 

    var workvm = new Vue({
      el:'#workpro',
      data:{
        prosta:false,
        sinsta:false,
        sinindex:si,
        proindex:pi,
        showtype:0,
        tap:0,
        ld:0, 
        prodata:mv.com_pro.data.datalist,
        prname:fac.getprname(),
        sname:fac.getsname(),
         work_image:{
                status:0,
                data:[],
                params:{},
                watch:{time:0}, 
            },
            work_matcount:{
                status:0,
                data:[],
                params:{},
                watch:{time:0}, 
            },


      },
      methods:{
        changeopen:fac.changeopen,
        checkpro:function(n) {
          this.proindex = n;
          this.prosta = false;
          this.sinsta = true;
          this.sname = '';
        },
        changetap:function(n) {
           this.tap = n;
           var v = this.showtype;
           var _this = this; 
          setTimeout(function() {
           if(n==1){ 
          var arr = [_this.work_image.data.quanbu,_this.work_image.data.jichu,_this.work_image.data.zhuti];
          var lit = ['','-基础','-主体'];
          var sitedata= fac.getstore('sitedata'); 
          var sname = sitedata['sname']; 
          var title = sname + lit[n] + '- 送检统计图'; 
          fac.hntchart(arr[v],title);  
            } 
          if(n==2){ fac.domatchart(_this.work_matcount.data,'工程原材送检统计图'); }//生成图表  
 },200); 

        },
        checksin:function(n) {
           this.showtype = 0;
           this.sinindex = n;
           this.prname = this.prodata[this.proindex].prname;
           this.sname = this.prodata[this.proindex].sinchl.datalist[this.sinindex].sname;
           
           var sitedata = fac.getstore('sitedata');
           sitedata.prcodeid =  this.prodata[this.proindex].codeid;
           sitedata.scodeid =  this.prodata[this.proindex].sinchl.datalist[this.sinindex].codeid;
           sitedata.prname =  this.prname; 
           sitedata.sname =this.sname ; 

           fac.setstore('sitedata',sitedata);
           this.sinsta = false;
           this.prosta = false;
           fac.changeopen('#workpro','all'); 


setTimeout(function() {
           workvm.work_image.watch.time = fac.time();
           workvm.work_matcount.watch.time = fac.time();
},200)
           

        },
        gettype:function(type,fid) {
            if(type==0){return true;}
            else{ 
              if(fid == type + 2){return true}else{return false;}
            } 
        },
        changeshowtype:function(n) {
           this.showtype = n;
           if(this.tap==1){
          var arr = [this.work_image.data.quanbu,this.work_image.data.jichu,this.work_image.data.zhuti];
          var lit = ['','-基础','-主体'];
          var sitedata= fac.getstore('sitedata'); 
          var sname = sitedata['sname']; 
          var title = sname + lit[n] + '- 送检统计图'; 
          fac.hntchart(arr[n],title);
           } 
          
        }
      }
  }); 


fac.ysfetch(workvm,'work_image');
fac.ysfetch(workvm,'work_matcount');

// 去拿原材统计数
workvm.work_matcount.before = function(mv) {
  fac.bigload(1);
  var sitedata = fac.getstore('sitedata');
   if(sitedata.prcodeid==''){fac.bigload(0);return false;}
  mv.work_matcount.params = {codeid:sitedata.prcodeid}
}

workvm.work_matcount.done = function(mv) {
   setTimeout(function() { fac.bigload(0); },500)
 
  
}
workvm.work_matcount.watch.time =fac.time();


//去拿 子单位形象进度数据 子单位图表数据；
workvm.work_image.before = function(mv){
  fac.bigload(1);
    var sitedata = fac.getstore('sitedata');
    if(sitedata.scodeid==''){fac.bigload(0);return false;}
    mv.work_image.params = {codeid:sitedata.scodeid}
  }
  workvm.work_image.done = function(mv){
    setTimeout(function() { fac.bigload(0); },1000)
    
  //   if(mv.ld==0){ 
  //   mv.ld=1; 
  // }else{
  //    fac.bigload(0);
  //    mv.ld=0; 
  // }
//生成图表 
  var sitedata= fac.getstore('sitedata'); 
  var sname = sitedata['sname']; 
  var arr = [mv.work_image.data.quanbu,mv.work_image.data.jichu,mv.work_image.data.zhuti];
  var lit = ['','-基础','-主体'];
  var title = sname + lit[0] + '- 送检统计图';  
  fac.hntchart(arr[0],title);

}

workvm.work_image.watch.time =fac.time();

   
}

fac.bigload(1);
setTimeout(function() {
  //先判断 有还是没有
fac.afterloaddo(mainvue,workctrl);
},300)

  },
  plan:function(){
    
function planctrl(mv) {
fac.setstore('pagetap','plan');
var sname = fac.getsname();
var sinmat = 0;



var ind =  fac.getstore('sitedata');
var pi = ind.proindex;
var si = ind.sinindex;

if(mv.com_pro.data.datalist.length>0 && mv.com_pro.data.datalist[pi].sinchl.datalist.length==0){
     fac.showlip('请先回到首页，创建子单位');
     sname = '原材';
     sinmat = 1; 

} 


    window.planvm = new Vue({
      el:'#plantop',
      data:{
        sitedata:fac.getstore('sitedata'),
        prosta:false,
        sinsta:false,
        sinindex:0,
        proindex:0,
        sinmat:sinmat,
        stype:'by',
        yctype:1,
        showdel:0,
        esta:0,
        sheet:false, 
        stp:{'by':'标养','ty':'同养','ks':'抗渗','zt':'柱头','dz':'焊接','qz':'砌筑','wq':'外墙','nq':'内墙','zp':'找平'},
        prodata:mv.com_pro.data.datalist,
        prname:fac.getprname(),
        sname:sname,
        plan_mat:{
                status:0,
                data:[],
                params:{},
                watch:{time:0},
                before:function(vm){  
                   fac.bigload(1);
                   var sitedata = fac.getstore('sitedata'); 
                   vm.plan_mat.params = {codeid:sitedata.prcodeid,yctype:vm.yctype};
              
                },
                done:function(v,re) {
                   
                  setTimeout(function() { fac.bigload(0);},600); }  
            },
        plan_songjian:{
                status:0,
                data:[],
                params:{},
                watch:{time:0},
                before:function(vm){ 
                  fac.bigload(1);
                   var sitedata = fac.getstore('sitedata');
                   vm.plan_songjian.params = {codeid:sitedata.scodeid,type:vm.stype};
                },
                done:function(vm,re) {
                  var arr = re.data.datalist; 
                  if(re.code>0){
                    re.data.datalist = arr.sort(function(a,b){
                    return a.myorder-b.myorder
                  });
                  }
                   
                  vm.plan_songjian.data =re.data;
                  setTimeout(function() { fac.bigload(0);},600);} 
            },
            com_ed:{
              status:0,
                data:[],
                params:{},
                watch:{time:0},
            },
            com_em:{
              status:0,
                data:[],
                params:{},
                watch:{time:0},
            },
            com_ea:{
              status:0,
                data:[],
                params:{},
                watch:{time:0},
            }
      },
      methods:{ 
         setcodeid:fac.setcodeid,
        yschk:fac.yschk,
        changeopen:fac.changeopen,
        setasta:function() {
           this.esta = this.esta?0:1;
        },
        lq:function(riqi,time,ys) { 
          //已送,就两个相减，未送就今天减去日期
          
         var timex = ys==1?fac.time(time):fac.time();
         var a = parseInt((timex - fac.time(riqi))/86400000); 
         a = a + '天';  
         return a;
        },
        selectitem:function(value,arr) { 

          value.check = value.check==0?1:0; 
          var a = 0;
          arr.map(function(elm) {
             var t = elm.check?elm.check:0;
             a += t;
          });
          this.showdel = a; 
        },
        selectall:function(arr) {
                  var x = 1;
                  if(arr.length==this.showdel){
                    x = 0;
                    this.showdel = 0;
                  }else{
                    this.showdel = arr.length;
                  }
                  arr.map(function(elm) {
                      elm.check = x;
                  });  
                },
                ornotchk:function(v) { 
                   var key = this.stype + 'ornot';
                   var sd = {};
                   sd[key] = v[key]==1?0:1;
                   sd.codeid = v.codeid;
                   planvm.com_em.before = function(vm) {
                  vm.com_em.params = sd; 
                }; 
                  planvm.com_em.done = function(vm,re) {  
                      if(re.code==1){ 
                      v[key] = sd[key];  
                          $.toptip('保存成功', 'success');
                      }else{
                          $.toptip('更新失败', 'error');
                      }
                  }
                planvm.com_em.watch.time = fac.time();

                },
        checksj:function(key){
          this.stype = key;
          this.showdel = 0;
          this.esta = 0;
          //触发获取数据 
          this.plan_songjian.watch.time = fac.time();
        },
        checkmat:function(key) {
          this.yctype = key;
          //触发获取数据 
          this.plan_mat.watch.time = fac.time();
        },
        checkpro:function(n) {
          this.proindex = n;
          this.prosta = false;
          this.sinsta = true;
          this.sname = '';
        },
        shwosheet:function() {
           this.sheet = !this.sheet;
           this.sheet?$('#iosMasktwo').fadeIn(200):$('#iosMasktwo').fadeOut(200);
        },
        comdel:function(arr) { 
        var _this = this; 
 $('#iosDialog1').fadeIn(200);
 $('#iosDialog1').find('#diatext').html('确定要删除选中项么？');
 $('.dialogsyes').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200);
             
                var ar = [];
          arr.map(function(elm) {
            if(elm.check==1&&elm.isdel==0){
              ar.push(elm.codeid);
            }             
          }); 
             if(ar.length>0){
                planvm.com_ed.before = function(vm) {
                  vm.com_ed.params = {codeid:ar}; 
                }; 
              planvm.com_ed.done = function(vm,re) { 
                _this.showdel=0;
              if(re.code==1){ 
                      arr.map(function(elm) {
                        if(elm.check==1){elm.isdel=1;}             
                      });
                  $.toptip('保存成功', 'success');
              }else{
                  $.toptip('更新失败', 'error');
              }
          }
                planvm.com_ed.watch.time = fac.time();
              }
        });

$('.dialogsno').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200);
          }); 
        },
        comadd:function(arr) {
          var typ = ['原材名称','钢筋','水泥','砂','砖','装饰','节能','防水','水电','安全'];
           var sd = {};
            var sitedata = fac.getstore('sitedata');
            

           if(this.sinmat==0){
            //混凝土
            sd.prcodeid = sitedata['prcodeid'];
            sd.codeid = this.plan_songjian.data.codeid; 
            sd.scodeid = sitedata['scodeid'];
            sd.bybuwei = '部位-新增';
            sd.byys = 0;
            sd.byornot = 1;
            sd.tyornot = 0;
            sd.ksornot = 0;
            sd.ztornot = 0;
            sd.cmornot = 0;
            sd.dzornot = 0;
            sd.qzornot = 0;
            sd.wqornot = 0;
            sd.nqornot = 0;
            sd.zpornot = 0; 
           }else{
            //原材
            sd.prcodeid = sitedata['prcodeid'];
            sd.codeid = this.plan_mat.data.codeid; 
            sd.yctype = this.yctype; 
            sd.mname = typ[this.yctype]+'-新增'; 
            sd.ycys = 0; 
           }
           sd.isdel = 0;
           sd.check = 0;


           this.com_ea.before = function(vm) {
              vm.com_ea.params = sd;
              $('#test').html(JSON.stringify(sd));
           };
           this.com_ea.done = function(vm,re) {
           
// $('#test2').html(JSON.stringify(re));
               if(re.code==1){ 
                sd.codeid = re.data.codeid;
                delete sd.prcodeid;
                delete sd.scodeid; 
                arr.unshift(sd);
                $.toptip('添加成功', 'success');
                }else{
                $.toptip('添加失败', 'error');

               }
           };
           //触发获取数据
            this.com_ea.watch.time = fac.time();
        },
        checksin:function(n) {
          this.showdel = 0;
          this.prname = this.prodata[this.proindex].prname;
          var sitedata = fac.getstore('sitedata');
          sitedata.prcodeid =  this.prodata[this.proindex].codeid;
          sitedata.prname =  this.prname; 

          if(n!='A'){
                 this.sinmat = 0;
                 this.sinindex = n; 
                 this.sname = this.prodata[this.proindex].sinchl.datalist[this.sinindex].sname;    
                 sitedata.scodeid =  this.prodata[this.proindex].sinchl.datalist[this.sinindex].codeid; 
                 sitedata.sname =this.sname ; 
                 //触发获取数据
                 this.plan_songjian.watch.time = fac.time();
          }else{
            this.sinmat = 1;
            this.sname = '原材';
            sitedata.scodeid = '';
            sitedata.sname =this.sname; 
            //触发获取数据
            this.plan_mat.watch.time = fac.time();


          }
         fac.setstore('sitedata',sitedata);
         this.sinsta = false;
         this.prosta = false;
         fac.changeopen('#plantop','all');  
           
        }
      }

  });

fac.ysfetch(planvm,'plan_songjian');
fac.ysfetch(planvm,'plan_mat');

fac.ysfetch(planvm,'com_ed');
fac.ysfetch(planvm,'com_ea');
fac.ysfetch(planvm,'com_em');
setTimeout(function() {
  // 触发获取数据
  if(sinmat==1){
    planvm.plan_mat.watch.time = fac.time();
  }else{
    planvm.plan_songjian.watch.time = fac.time();
  }
  
 
},300);



     
}


 fac.bigload(1);
//先判断 有还是没有
 fac.afterloaddo(mainvue,planctrl);
  },
  yc:function(){
    
         var ycobj = {
          el:'#ycbody',
          data:{
            yctypelist:YSCONF.ext.yctypelist,
            ftypelist:YSCONF.ext.ftypelist,
            yc_info:{
              status:0,
              data:{},
              params:{},
              watch:{time:0},
              done:fac.done,
              },
              com_em:{
              status:0,
              data:{},
              params:{},
              watch:{time:0}, 
              } 
          },
          methods:{
            dozushu:fac.dozushu,
            spl:fac.spl, 
            comsave:function() {  
              debugger;
                var ccph = [];
                $('input[name="ccph"]').each(function(index, el) { 
                  ccph.push(el.value);
                });
                var ypbh = [];
                $('input[name="ypbh"]').each(function(index, el) { 
                  ypbh.push(el.value);
                });                 
                 var jieguo = [];
                $('input[name="jieguo"]').each(function(index, el) { 
                  jieguo.push(el.value);
                });
                 
                 
               ycvm.com_em.before=function(mv) {                 
                mv.yc_info.data.ccph = ccph.join(',');
                mv.yc_info.data.jieguo = jieguo.join(',');
                mv.yc_info.data.ypbh = ypbh.join(',');

                 mv.com_em.params = mv.yc_info.data;
                 mv.com_em.params.lastupdate = fac.time()/1000;
               };
               ycvm.com_em.done = function(mv,re) {
                 var tap = fac.getstore('pagetap');
                if(tap=='plan'){
                   planvm.plan_mat.watch.time = fac.time();  
                } 
                  fac.dore(re,tap);
               }
               ycvm.com_em.watch.time = fac.time();  
            }
          } 
         };
         var ycvm = new Vue(ycobj);
         fac.ysfetch(ycvm,'yc_info');
         fac.ysfetch(ycvm,'com_em');
         
          ycvm.yc_info.before = function(mv) {
              fac.bigload(1); 
              mv.yc_info.params = {codeid:fac.getstore('wecodeid')};
  } 
         ycvm.yc_info.watch.time = fac.time();

  },
  sj:function(){
    
         var byobj = {
          el:'#bybody',
          data:{
            stype:fac.getstore('stype'),
             stp:{'by':'标养','ty':'同养','ks':'抗渗','zt':'柱头','dz':'焊接','qz':'砌筑','wq':'外墙','nq':'内墙','zp':'找平'},
             fenbudata:[     
                        {'title':'基础',t:'3'},{'title':'主体',t:'4'},{'title':'装修',t:'5'},
                        {'title':'幕墙',t:'6'},{'title':'屋面',t:'7'},{'title':'节能',t:'8'},
                        {'title':'给排水',t:'9'},{'title':'电气',t:'10'}],
            showcheck:0,
            fenbuarr:[],
            by_info:{
              status:0,
              data:{},
              params:{},
              watch:{time:0},
              done:fac.done
              },
              com_em:{
              status:0,
              data:{},
              params:{},
              watch:{time:0}, 
              } 
          },
          methods:{
            dozushu:fac.dozushu,
            spl:fac.spl, 
            yongchange:function(){
              var yl = this.by_info.data.byyl; 
              this.by_info.data.byzushu = yl>=1000?Math.ceil(yl/200):Math.ceil(yl/100); 
            },
           
        fenbumore: function(val, t, key) {
          var id = 'ad' + key;
          var chk = $("#" + id + "").is(':checked');

          if (chk) {
           byobj.data.by_info.data.fid.push(t);
          } else {
            byobj.data.by_info.data.fid = $.grep(byobj.data.by_info.data.fid, function(value) {
              return value != t;
            });

          };
        },

        ischk: function(t,all) {

          if (all) {
            var a = false;
            all.map(function(e) {
              if (e == t) {
                a = true;
              }
            });
            return a;
          }else{
            return false;
          };
        },

            riqichange:function(type) { 
              if(type=='by'||type=='ty'||type=='ks'||type=='zt'||type=='cm'){ 
                 var t = fac.time(this.by_info.data.byriqi); 
                var t1 = t + 28*86400000;
                var t2 = t + 30*86400000;
                var t3 = t + 7*86400000;
                this.by_info.data.bytime = fac.numtotime(t1);
                this.by_info.data.zttime = fac.numtotime(t1);
                this.by_info.data.kstime = fac.numtotime(t2);
                this.by_info.data.cmtime = fac.numtotime(t3);
              }
              if(type=='dz'){ 
                this.by_info.data.dztime = this.by_info.data.dzriqi;
              }
              if(type=='qz'||type=='wq'||type=='nq'||type=='zp'){
                var kx = type + 'riqi';
                var tx =  fac.time(this.by_info.data[kx]); 
                var t5 = tx + 28*86400000;
                var key = type + 'time';
                this.by_info.data[key] = fac.numtotime(t5);
              }
            },
            comsave:function() { 
              var _this = this;

              var bhkey = this.stype + 'bh';
                var bharr = [];
                $('input[name='+bhkey+']').each(function(index, el) { 
                  bharr.push(el.value);
                });

                var jgkey = this.stype + 'jg';
                var jgarr = [];
                $('input[name='+jgkey+']').each(function(index, el) { 
                 jgarr.push(el.value);
                });  


               byvm.com_em.before=function(mv) {  
                 mv.by_info.data[bhkey] = bharr.join(',');
                 mv.by_info.data[jgkey] = jgarr.join(',');
                 mv.by_info.data.fid = byobj.data.by_info.data.fid.join(',');
               
                


                 if(_this.stype=='by'||_this.stype=='ty'||_this.stype=='zt'){
                    var xpkey = _this.stype + 'xinpian';
                    var xparr = [];
                    $('input[name='+xpkey+']').each(function(index, el) { 
                     xparr.push(el.value);
                    }); 
                  mv.by_info.data[xpkey] = xparr.join(',');
                 }

                  if(_this.stype=='dz'){
                      // 牌号
                      var paihaoarr = [];
                      $('input[name="dzpaihao"]').each(function(index, el) { 
                       paihaoarr.push(el.value);
                      }); 
                      mv.by_info.data.dzpaihao = paihaoarr.join(',');
                      // 厂家
                       var dzchangjiaarr = [];
                      $('input[name="dzchangjia"]').each(function(index, el) { 
                       dzchangjiaarr.push(el.value);
                      }); 
                      mv.by_info.data.dzchangjia = dzchangjiaarr.join(',');
                      // 规格
                       var dzguigearr = [];
                      $('input[name="dzguige"]').each(function(index, el) { 
                       dzguigearr.push(el.value);
                      }); 
                      mv.by_info.data.dzguige = dzguigearr.join(',');
                  
                  
                 }
                 

                  mv.com_em.params = mv.by_info.data;
                 mv.com_em.params.lastupdate = fac.time()/1000;
               };

               byvm.com_em.done = function(mv,re) {
                 var tap = fac.getstore('pagetap');
                if(tap=='plan'){
                   planvm.plan_songjian.watch.time = fac.time();  
                }
                 
                 
                  fac.dore(re,tap);
               }

               byvm.com_em.watch.time = fac.time();  
            }
          } 
         };
         var byvm = new Vue(byobj);
         fac.ysfetch(byvm,'by_info');
         fac.ysfetch(byvm,'com_em');
         
          byvm.by_info.before = function(mv) {
              fac.bigload(1); 
              mv.by_info.params = {codeid:fac.getstore('wecodeid'),type:byvm.stype};
         };
         byvm.by_info.done = function(mv,re) {

         };
         byvm.by_info.watch.time = fac.time();

  },
  wendu:function(){
    
           var wenduobj = { 
            el:"#wendubody",                      
            data:{  
            wendu_info:{                       
                status:0,
                data:{tyinfo:{bybuwei:'',city:''},datalist:[]},
                params:{},
                watch:{time:0}, 
                done:fac.done,
                  } 
            },
            methods:{
              fanhui:function() {
                 window.pageManager.back('sj');
              }
            } 
        };
     var wenduvm = new Vue(wenduobj);
     fac.ysfetch(wenduvm,'wendu_info');  
    wenduvm.wendu_info.before = function(mv) {  
        fac.bigload(1); 
        mv.wendu_info.params = {codeid:fac.getstore('wecodeid'),type:'ty'};
      } 
    wenduvm.wendu_info.watch.time = fac.time();
       
  },
  base:function(){
    
 //从sitedata 获取 proindex 当前工程 
        var sitedata = fac.getstore('sitedata');
        var proindex = sitedata.proindex;
        var prname = sitedata.prname;


function basectrl(mv) {
    var vm = new Vue({
      el:'#base',
      data:{
        prosta:false,
        sinsta:false,
        proindex:proindex,
        prname:prname,
        prodata:mv.com_pro.data.datalist},
      methods:{
        changeopen:fac.changeopen,
        checkpro:function(n) {
          this.proindex = n;
          this.prosta = false;
          fac.changeopen('#base','all');  
          //拿sitedata 和 更新里面的数据；
          var sitedata = fac.getstore('sitedata');
          this.prname = this.prodata[n].prname;
           sitedata.prname = this.prname;
           sitedata.prcodeid = this.prodata[n].codeid;

           if(this.prodata[n].sinchl.datalist.length>0){
            sitedata.sname = this.prodata[n].sinchl.datalist[0].sname;
            sitedata.scodeid = this.prodata[n].sinchl.datalist[0].codeid;
           }else{
            sitedata.sname = '';
            sitedata.scodeid = ''; 
           }
           fac.setstore('sitedata',sitedata); 

          
        },
      }
  });
}
//先判断 有还是没有 
fac.afterloaddo(mainvue,basectrl); 
  },
  jiben:function(){
    
       var jiben_obj = { 
            el:"#jibenbody",                      
            data:{ 
            sitedata:{name:'123123'},
            com_province:{ 
                status:0,
                data:{},
                params:{},
                watch:{time:0}, 
            },
            com_city:{
                status:0,
                data:{},
                params:{},
                watch:{time:0},
                
            },
            jiben:{                       
                status:0,
                data:{pid:'11',cityid:'23'},
                params:{},
                watch:{time:0}, 
                  },
            com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
              
                       jibenvm.com_em.before=function(mv) { 

                    if (!jibenvm.jiben.data.prname){
                    fac.showlip('请填写工程名称');return false;
                    };

                    if (!jibenvm.jiben.data.cityid){
                    fac.showlip('请选择城市');return false;
                    };

                    if (!jibenvm.jiben.data.jiegou){
                    fac.showlip('请选择结构');return false;
                    };

                    if (jibenvm.jiben.data.kaigong>jibenvm.jiben.data.jungong){
                    fac.showlip('竣工日期必须大于开工日期！');return false;
                    };
                       


                         mv.com_em.params = jibenvm.jiben.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       jibenvm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       jibenvm.com_em.watch.time = fac.time();  
                    },
             selpro:function(e) { 
              var t = e.target.value;
              this.jiben.data.pid = t;
              jibenvm.com_city.before=function(vm) {
                   vm.com_city.params.pid = t;
                }; 
              if (jiben_obj.data.jiben.data.cityid) {
               jiben_obj.data.jiben.data.cityid='';
              };
                
              jibenvm.com_city.watch.time = fac.time();
            },
            selcity:function(e) {
              this.jiben.data.cityid = e.target.value;
            }
            } 
        };
     var jibenvm = new Vue(jiben_obj);
     fac.ysfetch(jibenvm,'jiben'); 
     fac.ysfetch(jibenvm,'com_em'); 
     fac.ysfetch(jibenvm,'com_province'); 
     fac.ysfetch(jibenvm,'com_city'); 
      jibenvm.jiben.before = function(mv) {
        var sitedata = fac.getstore('sitedata');
        mv.jiben.params = {codeid:sitedata.prcodeid}
      }
      jibenvm.jiben.done = function(vm,re) { 
               jibenvm.com_province.watch.time = fac.time();
               //获取城市
               jibenvm.com_city.before = function(vm) {
                  vm.com_city.params = {pid:re.data.pid}
               };
               jibenvm.com_city.watch.time = fac.time();
      }
    

    setTimeout(function() {

debugger;
              fac.newWebupload('headerupload','#localPicker2',function(file,res){
                  fac.bigload(0,'上传中…');
                  if (res.code==1) {
             jibenvm.jiben.data.proimg=res.url;

                  }
              },function(file){
                console.log('error');
              });

      jibenvm.jiben.watch.time = fac.time();
      
    },300);



  },
  jishu:function(){
    
           var jishu_obj = { 
            el:"#jishu_news",                      
            data:{ 
            sitedata:{name:'12'},
            jishu_info:{                       
                status:0,
                data:[{prname:'11'}],
                params:{codeid:4},
                watch:{time:0}, 
                  },
               com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
                       jishu_vm.com_em.before=function(mv) { 
                         mv.com_em.params = jishu_vm.jishu_info.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       jishu_vm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       jishu_vm.com_em.watch.time = fac.time();  
                    } 

            }
        };
     var jishu_vm = new Vue(jishu_obj);
     fac.ysfetch(jishu_vm,'jishu_info'); 
      fac.ysfetch(jishu_vm,'com_em');
    jishu_vm.jishu_info.before = function(mv) {

        var sitedata = fac.getstore('sitedata');

        mv.jishu_info.params = {codeid:sitedata.prcodeid}

      }

    jishu_vm.jishu_info.watch.time = fac.time();
  },
  shigong:function(){
    
          var sgong_obj = { 
          el:"#shi_gong",                      
          data:{ 
          sitedata:{name:'12'},
          shigong_unit:{                       
              status:0,
              data:[{prname:'11'}],
              params:{codeid:4},
              watch:{time:0}, 
                },
          com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
                       sgong_vm.com_em.before=function(mv) { 
                         mv.com_em.params = sgong_vm.shigong_unit.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       sgong_vm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       sgong_vm.com_em.watch.time = fac.time();  
                    } 

          }
      };
  var sgong_vm = new Vue(sgong_obj);
  fac.ysfetch(sgong_vm,'shigong_unit'); 
  fac.ysfetch(sgong_vm,'com_em');
  sgong_vm.shigong_unit.before = function(mv) {

      var sitedata = fac.getstore('sitedata');

      mv.shigong_unit.params = {codeid:sitedata.prcodeid}

    }

  sgong_vm.shigong_unit.watch.time = fac.time();
  },
  jianshe:function(){
    
        var jianshe_obj = { 
          el:"#jian_she",                      
          data:{ 
          sitedata:{name:'12'},
          jianshe_unit:{                       
              status:0,
              data:[{prname:'11'}],
              params:{codeid:4},
              watch:{time:0}, 
                },
               com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
                       jianshe_vm.com_em.before=function(mv) { 
                         mv.com_em.params = jianshe_vm.jianshe_unit.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       jianshe_vm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       jianshe_vm.com_em.watch.time = fac.time();  
                    } 

          }
      };
  var jianshe_vm = new Vue(jianshe_obj);
  fac.ysfetch(jianshe_vm,'jianshe_unit'); 
  fac.ysfetch(jianshe_vm,'com_em');
  jianshe_vm.jianshe_unit.before = function(mv) {

      var sitedata = fac.getstore('sitedata');

      mv.jianshe_unit.params = {codeid:sitedata.prcodeid}

    }

  jianshe_vm.jianshe_unit.watch.time = fac.time();
  },
  jianli:function(){
    
       var jianli_obj = { 
          el:"#jian_li",                      
          data:{ 
          sitedata:{name:'12'},
          jianli_unit:{                       
              status:0,
              data:[{prname:'11'}],
              params:{codeid:4},
              watch:{time:0}, 
                },
          com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
                       jianli_vm.com_em.before=function(mv) { 
                         mv.com_em.params = jianli_vm.jianli_unit.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       jianli_vm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       jianli_vm.com_em.watch.time = fac.time();  
                    } 

          }
      };
  var jianli_vm = new Vue(jianli_obj);
  fac.ysfetch(jianli_vm,'jianli_unit'); 
  fac.ysfetch(jianli_vm,'com_em'); 
  jianli_vm.jianli_unit.before = function(mv) {

      var sitedata = fac.getstore('sitedata');

      mv.jianli_unit.params = {codeid:sitedata.prcodeid}

    }

  jianli_vm.jianli_unit.watch.time = fac.time();
  },
  sheji:function(){
    
          var sheji_obj = { 
          el:"#she_ji",                      
          data:{ 
          sitedata:{name:'12'},
          sheji_unit:{                       
              status:0,
              data:[{prname:'11'}],
              params:{codeid:4},
              watch:{time:0}, 
                },
          com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
                       sheji_vm.com_em.before=function(mv) { 
                         mv.com_em.params = sheji_vm.sheji_unit.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       sheji_vm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       sheji_vm.com_em.watch.time = fac.time();  
                    } 

          }
      };
  var sheji_vm = new Vue(sheji_obj);
  fac.ysfetch(sheji_vm,'sheji_unit'); 
  fac.ysfetch(sheji_vm,'com_em');
  sheji_vm.sheji_unit.before = function(mv) {

      var sitedata = fac.getstore('sitedata');

      mv.sheji_unit.params = {codeid:sitedata.prcodeid}

    }

  sheji_vm.sheji_unit.watch.time = fac.time();
  },
  kancha:function(){
    
    var kancha_obj = { 
          el:"#kan_cha",                      
          data:{ 
          sitedata:{name:'12'},
          kancha:{                       
              status:0,
              data:[{prname:'11'}],
              params:{codeid:4},
              watch:{time:0}, 
                },
          com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
                       kanchai_vm.com_em.before=function(mv) { 
                         mv.com_em.params = kanchai_vm.kancha.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       kanchai_vm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       kanchai_vm.com_em.watch.time = fac.time();  
                    } 

          }
      };
  var kanchai_vm = new Vue(kancha_obj);
  fac.ysfetch(kanchai_vm,'kancha'); 
  fac.ysfetch(kanchai_vm,'com_em');
  kanchai_vm.kancha.before = function(mv) {

      var sitedata = fac.getstore('sitedata');

      mv.kancha.params = {codeid:sitedata.prcodeid}

    }

  kanchai_vm.kancha.watch.time = fac.time();
  },
  qita:function(){
    
             var other_obj = { 
          el:"#other_q",                      
          data:{ 
          sitedata:{name:'12'},
          othera_unit:{                       
              status:0,
              data:[{prname:'11'}],
              params:{codeid:4},
              watch:{time:0}, 
                },
          com_em:{
                  status:0,
                  data:[],
                  params:{},
                  watch:{time:0},
              }
            },
            methods:{             
               comsave:function() { 
                       other_vm.com_em.before=function(mv) { 
                         mv.com_em.params = other_vm.othera_unit.data;
                         mv.com_em.params.lastupdate = fac.time()/1000;
                       };
                       other_vm.com_em.done = function(mv,re) {
                          fac.dore(re,'gether');
                       }
                       other_vm.com_em.watch.time = fac.time();  
                    } 

          }
      };
  var other_vm = new Vue(other_obj);
  fac.ysfetch(other_vm,'othera_unit'); 
  fac.ysfetch(other_vm,'com_em');
  other_vm.othera_unit.before = function(mv) {
      var sitedata = fac.getstore('sitedata');
      mv.othera_unit.params = {codeid:sitedata.prcodeid}
    }

  other_vm.othera_unit.watch.time = fac.time();
  },
  gether:function(){
    
function getherctrl(mv) {
  fac.setstore('pagetap','gether');
    var getvm = new Vue({
      el:'#getherbody',
      data:{
        prosta:false,
        sinsta:false,
        sinindex:0,
        proindex:0,
        prodata:mv.com_pro.data.datalist,
        prname:fac.getprname(),
        sname:fac.getsname(),
        lsornot:true,
        btime:'',
        etime:'',
        gether_data:{
                status:0,
                data:{
                  by:{hzlist:[],lslist:[]},
                  ty:{hzlist:[],lslist:[]},
                  ks:{hzlist:[],lslist:[]},
                  zt:{hzlist:[],lslist:[]},
                  cm:{hzlist:[],lslist:[]},
                  dz:{hzlist:[],lslist:[]},
                  qz:{hzlist:[],lslist:[]},
                  wq:{hzlist:[],lslist:[]},
                  nq:{hzlist:[],lslist:[]},
                  zp:{hzlist:[],lslist:[]},
                  yc:{hzlist:[],lslist:[]}},
                params:{},
                watch:{time:0}, 
                done:fac.done,  
            },
        gether_save:{
                status:0,
                params:{},
                watch:{time:0}, 
                done:fac.done,
        }
      }, 
      created: function () { 
        this.btime = fac.numtotime(new Date().getTime());
        this.etime = fac.numtotime(new Date().getTime()+7*86400000);
         

  },
      methods:{
        yschk:fac.yschk,
        changeopen:fac.changeopen,
        find:function() {
          if (getvm.etime<getvm.btime) {
            $.toptip('结束日期必须大于起始日期', 'error');return false;
          };
          this.sinsta = false;
          fac.changeopen('#getherbody','all');
           fac.bigload(1);
          //触发拿数据
          setTimeout(function() {
             getvm.gether_data.watch.time = fac.time();
           },230); 
        },
        saveasjilu:function() {

       var _this = this; 
 $('#iosDialog1').fadeIn(200);
 $('#iosDialog1').find('#diatext').html('确定存为快照，以便在送检快照中查阅？（请通过电脑端查阅）');
  $(".dialogsyes").unbind();
 $('.dialogsyes').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200);  
getvm.gether_save.done = function(mv,re) { 
            if(re.code==1){
               $.toptip('送检快照已经成功保存；', 'success');
            }else{
              $.toptip('保存失败！', 'error');
            }
          }
          getvm.gether_save.before = function(mv) {  
                   var sitedata = fac.getstore('sitedata');
                   mv.gether_save.params = {codeid:sitedata.prcodeid,btime:mv.btime,etime:mv.etime};
                }
          getvm.gether_save.watch.time = fac.time(); 
               
        });

$('.dialogsno').on('click', function(){
            $(this).parents('.js_dialog').fadeOut(200);
          });


















          
        },
        checkpro:function(n) {
          this.proindex = n;
          this.prosta = false;
          fac.changeopen('#getherbody','all');  
          //拿sitedata 和 更新里面的数据；
          var sitedata = fac.getstore('sitedata');
          this.prname = this.prodata[n].prname;
           sitedata.prname = this.prname;
           sitedata.prcodeid = this.prodata[n].codeid;

           if(this.prodata[n].sinchl.datalist.length>0){
            sitedata.sname = this.prodata[n].sinchl.datalist[0].sname;
            sitedata.scodeid = this.prodata[n].sinchl.datalist[0].codeid;
           }else{
            sitedata.sname = '';
            sitedata.scodeid = ''; 
           }
           fac.setstore('sitedata',sitedata); 
            fac.bigload(1);
          //触发拿数据
          setTimeout(function() {
               getvm.gether_data.watch.time = fac.time();
          },200)
        

        },
        setcodeid:fac.setcodeid,
      }
  });

fac.ysfetch(getvm,'gether_save');
fac.ysfetch(getvm,'gether_data');
getvm.gether_data.before = function(mv) {
    
                   fac.bigload(1);
                   var sitedata = fac.getstore('sitedata');
                   mv.gether_data.params = {codeid:sitedata.prcodeid,btime:mv.btime,etime:mv.etime};
                }
getvm.gether_data.watch.time = fac.time();

}

fac.bigload(1);
setTimeout(function() {
  //先判断 有还是没有 
fac.afterloaddo(mainvue,getherctrl); 
},200);
  },
  addpro:function(){
    
        var provm = new Vue({
          el:'#probody',
          data:{
            pro_add:{
                status:0,
                data:{'prname':'',pid:'',cityid:'',jiegou:'',kaigong:'',jungong:'',proimg:''},
                params:{},
                watch:{time:0}, 
            },
            com_province:{ 
                status:0,
                data:{},
                params:{},
                watch:{time:0}, 
            },
            com_city:{
                status:0,
                data:{},
                params:{},
                watch:{time:0} 
                
            }
          },
          methods:{
            selprovince:function(t) { 
              debugger;
              //如果遗留上一次的城市id 则先清楚
            if (provm.pro_add.data.cityid) {
              provm.pro_add.data.cityid='';
            }
              this.com_city.before=function(vm) { 
                   vm.com_city.params.pid = t;
                }; 
              this.com_city.watch.time = fac.time();
            },





            savepro:function() {
        
              provm.pro_add.before = function(vm) {
              debugger;
                vm.pro_add.params = provm.pro_add.data;
                if(vm.pro_add.params.prname==''){
                  $.toptip('工程名称不能为空!', 'warning'); 
                  return false;
                }
                if(vm.pro_add.params.pid==''){
                  $.toptip('请选择省份!', 'warning'); 
                  return false;
                }
                if(!vm.pro_add.params.cityid){
                  $.toptip('请选择城市!', 'warning'); 
                  return false;
                }
                if(vm.pro_add.params.jiegou==''){
                  $.toptip('请选择框架类型!', 'warning'); 
                  return false;
                }
                if(vm.pro_add.params.kaigong==''){
                  $.toptip('请选择开工日期!', 'warning'); 
                  return false;
                }
                if(vm.pro_add.params.jungong==''){
                  $.toptip('请选择竣工日期日期!', 'warning'); 
                  return false;
                }

                if(fac.time(vm.pro_add.params.jungong)<=fac.time(vm.pro_add.params.kaigong)){
                  $.toptip('竣工日期必须大于开工日期', 'warning'); 
                  return false;
                }
                fac.bigload(1);
              };
              provm.pro_add.done = function(vm,re) {
                 fac.bigload(0);
                  //请求工程列表
                  mainvue.com_pro.done = function(vm,re) {
                     
                     homevm.prodata = vm.com_pro.data.datalist;
                     fac.setcode(vm);
                  }
                  mainvue.com_pro.watch.time = fac.time();
                  fac.dore(re,'sin'); 
              };
              provm.pro_add.watch.time = fac.time();
            }
          }
        });

        fac.ysfetch(provm,'pro_add'); 
        fac.ysfetch(provm,'com_province'); 
        fac.ysfetch(provm,'com_city'); 

setTimeout(function() {
              fac.newWebupload('headerupload','#localPicker',function(file,res){
                  fac.bigload(0,'上传中…');
                  if (res.code==1) {
  debugger;
                //var data ={url:res.url,isdel:0};
             provm.pro_add.data.proimg=res.url;

                  }
              },function(file){
                console.log('error');
              });



   provm.com_province.watch.time = fac.time();
},300);
     
  },
  gether:function(){
    
  },
  gether:function(){
    
  },
  gether:function(){
    
  }
}