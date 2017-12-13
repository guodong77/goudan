
define('conf',function(require, exports, module) {   
function sinfun(re,sco) {
     sco.plansin_body = 'main/html/program/part_by.html'; 
     sco.matter_url =  'main/html/program/part_qb.html';

            var prcodeid = localStorage.getItem('prcodeid');
            var scodeid =  localStorage.getItem('scodeid');
            var sd = {'codeid':prcodeid,type:true,sname:'原材','now':''};           
            angular.forEach(sco.program_plan_sinlist.datalist, function(value, key){ 
               value.now = value.codeid==scodeid?'active':''; 
            });
              sd.now = scodeid?'':'active';
             sco.program_plan_sinlist.datalist.unshift(sd);  
             sco.stype = 'byornot'; //混凝土当前类型，标养 同养 抗渗等标识；
             sco.yctype = 0;//原材当前类型， 钢筋 水泥 等标识
           }

 function setstore(key,value){
value = typeof(value) ==='object'?JSON.stringify(value):value;
localStorage.setItem(key,value);
 return true;
}

function time(str){ 
  return !str?(new Date()).valueOf():(new Date(str)).valueOf(); 
}

function ftime(time){
    //数字转换成时间格式
    var retime = '';
    if(parseInt(time)>0){
            var datea = new Date(time); 
                var year = datea.getYear() + 1900;
                var month = datea.getMonth()+1;
                month = month<10?'0'+month:month;
                var datev = datea.getDate();
                
                datev = datev<10?'0'+ datev:datev;
                return year + '-' + month + '-' + datev;
    }else{
    return retime;
}
    
  }

function coun(data,k){
//基础做遍历
var a = {3:'基础',4:"主体"};
var jcdata = {
      "name":"基础",
      "status":"0 未施工，1 施工到,2 已完工",
      "buwei":"",
      "btime":"",
      "etime":""
      };
var l=0;
var jcjishu  = 0;
var jcwshigong = 0;
var jcyiwangong = 0;
 
data.map(function(item,ke){
  //基础施工
  if(item.fid==k){ 
    item.byriqi = item.byriqi*1000;
    jcjishu++; 
    jcdata.name = a[k];
    if(item.byriqi>0){
     jcyiwangong++;

     //进来算第一个
     if(l===0){
      jcdata.btime = item.byriqi;
      jcdata.etime = item.byriqi;
      jcdata.buwei = item.bybuwei;
    }else{
      jcdata.btime = item.byriqi<jcdata.btime?item.byriqi:jcdata.btime;
      jcdata.etime = item.byriqi>jcdata.etime?item.byriqi:jcdata.etime;
      jcdata.buwei = item.byriqi>jcdata.etime?item.bybuwei:jcdata.buwei;
    }
    l++;

    }else{
      jcwshigong++; 
    } 
  }  

});
jcdata.status = jcjishu==jcyiwangong?2:1;
jcdata.status = jcyiwangong===0?0:jcdata.status;
  
  return jcdata;
}


// function counsj(data,str) {
// //基础做遍历
// var key = str + 'ornot';
// var riqi = str +'riqi';
// var time = str + 'time';
// var a = {qz:'砌筑',wq:"外墙",nq:"内墙",zp:"找平"};
// var jcdata = {
//       "name":"",
//       "status":"0 未施工，1 施工到,2 已完工",
//       "buwei":"",
//       "btime":"",
//       "etime":""
//       };
// var l=0;
// var jcjishu  = 0;
// var jcwshigong = 0;
// var jcyiwangong = 0;
 
// data.map(function(item,ke){
//   //基础施工
//   if(item[key]==1){ 
//     item[riqi] = item[riqi]*1000;
//     jcjishu++; 
//     jcdata.name = a[str];
//     if(item[riqi]>0){
//      jcyiwangong++;

//      //进来算第一个
//      if(l===0){
//       jcdata.btime = item[riqi];
//       jcdata.etime = item[riqi];
//       jcdata.buwei = item.bybuwei;
//     }else{
//       jcdata.btime = item[riqi]<jcdata.btime?item[riqi]:jcdata.btime;
//       jcdata.etime = item[riqi]>jcdata.etime?item[riqi]:jcdata.etime;
//       jcdata.buwei = item[riqi]>jcdata.etime?item.bybuwei:jcdata.buwei;
//     }
//     l++;

//     }else{
//       jcwshigong++; 
//     } 
//   }  

// });
// jcdata.status = jcjishu==jcyiwangong?2:1;
// jcdata.status = jcyiwangong===0?0:jcdata.status;
  
//   return jcdata;
// }

//进度管理子单位 workcount
function workcount(data){
var redata = {
  work:[],
  songjian:{
    "jc":[],
    "zt":[],
    "zxwm":[]
  }
};


var jcdata = coun(data,3); 
redata.work.push(jcdata);
var ztdata = coun(data,4); 
redata.work.push(ztdata);

// var wqdata = counsj(data,'wq'); 
// redata.work.push(wqdata);

// var nqdata = counsj(data,'nq'); 
// redata.work.push(nqdata);

// var zpdata = counsj(data,'zp'); 
// redata.work.push(zpdata);
return redata;
}
  
// 组合arr
function doarr(jg){
    var arr = [];
    if(!jg){ 
        return arr;
    }else{
    var drr = jg.split(',');
    drr.map(function(elm){ 
        arr.push({val:elm});
    });
    return arr;  
    };
    
}

//过滤
function gl(d){
 return  d.value?d.value:''; 
}

window.ycchart = function(data,title){

    YS("echarts",function(){  
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
  
  },'vintage');
};


window.hntchart = function(data,title) {
      YS("echarts",function(){

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

 },'vintage');
}

  
window.config = {
    url:{
        ysmenu_list:{url:'ver1/Index/menu',method:'get'},
        com_info:{url:'ver1/Index/userinfo',method:'post'},
        com_request:{url:'ver1/Login/index',method:'post'},
        com_share:{url:'ver1/Index/share',method:'post'},
        com_feed:{url:'ver1/Open/adfeed',method:'post'},
        com_jilu:{url:'ver1/Index/es',method:'post'},
        com_wendu:{url:'ver1/Index/wendu',method:'post'},   

        accountbind:{url:'ver1/Login/qqwebind',method:'post'},
        createbind:{url:'ver1/Login/qqweaddbind',method:'post'},
        register:{url:'ver1/Login/register',method:'post'},
        com_login:{url:'ver1/Login/login',method:'get'},
        com_logout:{url:'ver1/Login/loginout',method:'get'},
        com_province:{url:'ver1/Open/prov',method:'post'},
        com_city:{url:'ver1/Open/city',method:'post'},
        com_ea:{url:'ver1/Index/com_ea',method:'post'},
        com_em:{url:'ver1/Index/com_em',method:'post'},
        com_ed:{url:'ver1/Index/com_ed',method:'post'},

        com_zl:{url:'ver1/Ziliao/getzldata',method:'post'},
        com_updatezl:{url:'ver1/Ziliao/updatezldata',method:'post'},


        program_pro_list:{url:'ver1/Index/program_pro_list',method:'get',load:1},       
        program_pro_add:{url:'ver1/Index/program_pro_add',method:'post'},
        program_pro_del:{url:'ver1/Index/program_pro_del',method:'post'},
         
        program_pro_sinadd:{url:'ver1/Index/program_pro_sinadd',method:'post'},
        program_pro_sinedit:{url:'ver1/Index/program_pro_sinedit',method:'post'},
        program_pro_sindel:{url:'ver1/Index/program_pro_sindel',method:'post'},
        program_pro_info:{url:'ver1/Index/program_pro_info',method:'post'},


        program_plan_sinlist:{url:'ver1/Index/program_sinlist',method:'get'},
        program_plan_matterlist:{url:'ver1/Index/program_plan_matterlist',load:1},
        program_plan_matterdel:{url:'ver1/Index/com_ed',method:'post'},
        program_plan_matteradd:{url:'ver1/Index/program_plan_matteradd',method:'post'},
        program_plan_matteredit:{url:'ver1/Index/program_plan_matteredit',method:'post'},

        program_plan_betonlist:{url:'ver1/Index/program_plan_betonlist',method:'get',load:1},
        program_plan_betondel:{url:'ver1/Index/com_ed',method:'post'},
        program_plan_betonadd:{url:'ver1/Index/program_plan_betonadd',method:'post'},
        program_plan_betonedit:{url:'ver1/Index/program_plan_betonedit',method:'post'},
                

        program_gether_sel:{url:'ver1/Index/program_gether',method:'get',load:1},
        program_gether_jilu:{url:'ver1/Index/program_gether_jilu',method:'post',load:1},
        program_gether_save:{url:'ver1/Index/program_gether_save',method:'post',load:1},
        program_gether_del:{url:'ver1/Index/com_ed',method:'post'},

        program_work_sinlist:{url:'ver1/Index/program_sinlist',method:'get'},
        program_work_nodelist:{url:'ver1/Index/program_work_nodelist',method:'get'},
        program_work_sinimage:{url:'ver1/Index/program_work_sinimage',method:'get',load:1},
        program_work_matcount:{url:'ver1/Index/program_work_matcount',method:'get'},  

        program_gantt_list:{url:'ver1/Index/program_gantt_list',method:'get'},
        program_gantt_add:{url:'ver1/Index/program_gantt_add',method:'post'},
        program_gantt_del:{url:'ver1/Index/program_gantt_del',method:'post'},
        program_gantt_edit:{url:'ver1/Index/program_gantt_edit',method:'post'},  

        program_gantt_worklist:{url:'ver1/Index/program_gantt_worklist',method:'get'},
        program_gantt_workadd:{url:'ver1/Index/program_gantt_workadd',method:'post'},
        program_gantt_workdel:{url:'ver1/Index/com_ed',method:'post'},
        program_gantt_workedit:{url:'ver1/Index/program_gantt_workedit',method:'post'}, 

        program_struct_sel:{url:'ver1/Index/program_struct_mulu',method:'get',load:1},
        program_struct_edit:{url:'ver1/Index/program_struct_edit',method:'get'},

         program_weather_list:{url:'ver1/Index/service_weather_list',method:'post'},


        operate_user_list:{url:'ver1/Index/operate_user_list',method:'post'},
        operate_logincount_list:{url:'ver1/Index/operate_login_list',method:'post'},
        operate_com_list:{url:'ver1/Index/operate_com_list',method:'post'},
        operate_pro_list:{url:'ver1/Index/operate_pro_list',method:'post'}, 
        operate_usergather_list:{url:'ver1/Index/loginStatistic',method:'post'}, 

        system_city_list:{url:'ver1/Index/system_city_list',method:'post'},
        system_mattertpl_list:{url:'ver1/Index/system_mattertpl_list',method:'post'},
        system_mattertpl_del:{url:'ver1/Index/com_ed',method:'post'},

       // system_tbtype_list:{url:'ver1/Index/system_tbtype_list',method:'post'},
   
        system_tbtype_list:{url:'json/data.json',method:'post'},

        system_tbtype_del:{url:'ver1/Index/com_ed',method:'post'},

        system_tongbiao_tplist:{url:'ver1/Index/system_tbtype_list',method:'post'},

        system_tongbiao_list:{url:'ver1/Index/system_tongbiao_list',method:'post'},
        system_tongbiao_del:{url:'ver1/Index/com_ed',method:'post'},

        service_weather_list:{url:'ver1/Index/service_weather_list',method:'post'},
        service_weather_del:{url:'ver1/Index/com_ed',method:'post'},
        user_info_list:{url:'ver1/Index/user_password_info',method:'post'},
        user_info_psd:{url:'ver1/Index/user_password_change',method:'post'}



    },
    win:{
        program_pro_info:{template:'program_pro_base',title:'工程概况',temdata:{}},
        program_pro_sinadd:{template:'program_pro_sinadd',title:'添加子单位',temdata:{"sname":'',"cengshu":'', "codeid":'', "jiegou":'',"jichu":'',"zhuti":''}},
        program_pro_sinedit:{template:'program_pro_sinedit',title:'编辑子单位',temdata:{}},
        program_pro_add:{template:'program_pro_add',title:'创建工程',temdata:{"prname":'',"pid":'',"cityid":'',"jiegou":'',"kaigong":'',"jungong":''}},
        program_gantt_add:{template:'program_gantt_add',title:'新建横道图',temdata:{'htitle':'',"ftitle":'',"comtitle":'',"btime":'',"etime":'',"hadd_time":'',"beizhu":''}},
        program_gantt_edit:{template:'program_gantt_edit',title:'横道图编辑',temdata:{}},
        program_gantt_workedit:{template:'program_gantt_workedit',title:'横道图作业编辑',temdata:{}},
        program_plan_set:{template:'program_plan_set',title:'送检计划-混凝土-设置',temdata:{}},
        program_plan_matergather:{template:'program_plan_matergather',title:'送检计划-原材-汇总打印',temdata:{}},
        program_plan_factoryset:{template:'program_plan_factoryset',title:'送检计划-原材-出厂编号',temdata:{}},
        program_plan_materypset:{template:'program_plan_materypset',title:'送检计划-原材-样品编号',temdata:{}},
        program_plan_betongather:{template:'program_plan_betongather',title:'送检计划-混凝土-汇总打印',temdata:{}},
        program_plan_chipset:{template:'program_plan_chipset',title:'送检计划-混凝土-标养等芯片',temdata:{}},
        program_plan_betonypset:{template:'program_plan_betonypset',title:'送检计划-混凝土-标养等样品',temdata:{}},
        program_plan_resultset:{template:'program_plan_resultset',title:'送检计划-混凝土-标养等结果',temdata:{}},
        program_plan_comset:{template:'program_plan_comset',title:'',temdata:{}},
        system_pages_add:{template:'system_image_set',title:'添加幻灯片',temdata:{}},
        system_pages_edit:{template:'system_image_set',title:'编辑幻灯片',temdata:{}},
        program_plan_datelist:{template:'program_plan_datelist',title:'龄期',temdata:{}},
        program_plan_wealist:{template:'program_plan_wealist',title:'累计温度/龄期',temdata:{}},
        user_info_tel:{template:'user_info_tel',title:'绑定手机',temdata:{}},
        user_info_password:{template:'user_info_password',title:'修改密码',temdata:{}},
        user_info_win:{template:'user_info_win',title:'工程上限',temdata:{}},
        feed:{template:'feed',title:'意见反馈',temdata:{}},
        ycexcel:{template:'ycexcel',title:'导入excel',temdata:{}}, 
        byexcel:{template:'byexcel',title:'导入excel',temdata:{}},         

        



    },
    port:{ 
        program_pro:{
            "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:5},pname:"工程列表页面列表",fun:function(re,sco){
                if(re.data.datalist.length){
                    setstore('prcodeid',re.data.datalist[0].codeid);
                    setstore('prname',re.data.datalist[0].prname);
                    if(re.data.datalist[0].sinchl.datalist.length){
                        setstore('scodeid',re.data.datalist[0].sinchl.datalist[0].codeid); 
                    }
                    
                }
            }}, 
            "add":{method:'post',facfun:'post_data_watch',t:0,send:{'pid':'',cityid:'','kaigong':'','jungong':'',"jiegou":'','prname':''},pname:"添加工程"},
            "del":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"删除工程"},
            "sinadd":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"添加子单位"},
            "sinedit":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"编辑子单位"},
            "sindel":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"删除子单位"},
            "info":{method:'post',facfun:'post_data_watch',t:0,send:{'codeid':''},pname:"获取工程信息"}
       },
        program_work:{
            "sinlist":{method:'post',facfun:'post_data',pname:"进度管理-子单位列表",
            send:{codeid:''},
            before:function() {
               config.port.program_work.sinlist.send.codeid = localStorage.getItem('prcodeid');
           },fun:function(re,sco){
            if(re.data.datalist.length==0){
                layer.msg('请先添加子单位',{icon:0});
            }else{
                if(!localStorage.getItem('scodeid')){
                    localStorage.setItem('scodeid',re.data[0].codeid);
                    localStorage.setItem('sname',re.data[0].sname); 
                }
                var scodeid = localStorage.getItem('scodeid');
                sco.program_work_sinimageData.scodeid = scodeid;
                sco.program_work_sinimageTime.time = time(); 
            }


            
            

           }},
            // "nodelist":{method:'get',facfun:'get_data',t:0,pname:"进度管理-节点进度情况列表"},
            "sinimage":{method:'post',facfun:'post_data_watch',t:0,send:{codeid:''},pname:"进度管理-子单位进度图详情",before:function() {
                   config.port.program_work.sinimage.send.codeid = localStorage.getItem('scodeid');
           },fun:function(re,sco){
            setTimeout(function(){
               $('*[data-toggle="tooltip"]').tooltip();
            },800); 
              sco.quanbu = re.quanbu;
              sco.jichu = re.jichu;
              sco.zhuti = re.zhuti; 
              var arr = [sco.quanbu,sco.jichu,sco.zhuti];
              var lit = ['','-基础','-主体'];
              var sname = localStorage.getItem('sname');
              var title = sname + lit[sco.showtype] + '- 送检统计图';
                hntchart(arr[sco.showtype],title);  
              
           }},
            "matcount":{method:'post',facfun:'post_data_watch',t:1,send:{codeid:''},
            pname:"进度管理-子单位统计信息详情",
            before:function() { 
               config.port.program_work.matcount.send.codeid = localStorage.getItem('prcodeid');
           },fun:function(re,sco){ 
            sco.yuancai = re.data;
            ycchart(re.data,'工程原材送检统计图');




           }}          
        },
        program_plan:{
           "sinlist":{method:'post',facfun:'post_data',fun:sinfun,pname:"送检计划-子单位列表",send:{codeid:''},before:function() {
               config.port.program_plan.sinlist.send.codeid = localStorage.getItem('prcodeid');
           }},

           "matterlist":{facfun:'post_data_watch',t:0,pname:"送检计划-原材列表",
           send:{codeid:''}, 
           before:function() {
               config.port.program_plan.matterlist.send.codeid = localStorage.getItem('prcodeid');
           },
           fun:function(re,sco) {
                //配置结果，编号数组
                angular.forEach(sco.program_plan_matterlist.datalist,function(value){
                    value.morder = parseInt(value.morder);
                    //处理结果
                    value.jieguoarr =  doarr(value.jieguo);
                    //样品编号结果
                    value.ypbharr = doarr(value.ypbh);
                    value.ccpharr = doarr(value.ccph); 
                });
              
           }},
            "matterdel":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检计划-原材删除"},
            "matteradd":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检计划-原材添加"},          
           "matteredit":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检计划-原材编辑"},          
      
           "betonlist":{facfun:'post_data_watch',t:1,pname:"送检计划-子单位送检列表",
           send:{codeid:'',type:'byornot'},
           before:function() {
               config.port.program_plan.betonlist.send.codeid = localStorage.getItem('scodeid');
           },
           fun:function(re,sco) {
            sco.winsongjian = [];
            sco.winyuancai = []; 

            var today = time(ftime((new Date()).getTime()))/1000;



            //配置结果，编号数组
                angular.forEach(sco.program_plan_betonlist.datalist,function(value){
                    value.myorder = parseInt(value.myorder);
                     
                    //处理结果 
                    value.byjgarr = doarr(value.byjg); 
                    value.bybharr = doarr(value.bybh); 
                    value.xinpianarr = doarr(value.xinpian);
                    //同养
                    value.tyjgarr = doarr(value.tyjg);
                    value.tybharr = doarr(value.tybh);
                    value.tyxinpianarr = doarr(value.tyxinpian);
                    //抗渗
                    value.ksjgarr = doarr(value.ksjg);
                    value.ksbharr = doarr(value.ksbh);
                    //柱头
                    value.ztjgarr = doarr(value.ztjg);
                    value.ztbharr = doarr(value.ztbh);
                    value.ztxinpianarr = doarr(value.ztxinpian);
                    //拆模
                    value.cmjgarr = doarr(value.cmjg);
                    value.cmbharr = doarr(value.cmbh);
                    //焊接
                    value.dzjgarr = doarr(value.dzjg);
                    value.dzbharr = doarr(value.dzbh);
                    value.dzguigearr = doarr(value.dzguige);
                    value.dzpaihaoarr = doarr(value.dzpaihao);
                    value.dzchangjiaarr = doarr(value.dzchangjia);

                    //砌筑
                    value.qzjgarr = doarr(value.qzjg);
                    value.qzbharr = doarr(value.qzbh);
                    //外墙
                    value.wqjgarr = doarr(value.wqjg);
                    value.wqbharr = doarr(value.wqbh);
                    //内墙
                    value.nqjgarr = doarr(value.nqjg);
                    value.nqbharr = doarr(value.nqbh);
                    //找平
                    value.zpjgarr = doarr(value.zpjg);
                    value.zpbharr = doarr(value.zpbh);
                    value.ccpharr = doarr(value.ccph);


                    //配置完成后，组合同条件养护
    //                 if(value.tyornot==1&&time(value.byriqi)>0){
                     
                        

    //                     //已送,用同养的 送检日期 减去 浇筑日期； 
    //                     value.ystemarr = [];
    //                     //未送，用今天日期 减去 浇筑日期；
    //                     value.wstemarr = [];

    // if(value.tyys==1){
    //     //遍历
    //           var leiji1 = 0; 
    //             re.data.tytemlist.map(function(elm) {
    //              // if(elm.wdate>value.tytime){
    //              //    break;}
    //              if(elm.wdate>=time(value.byriqi)/1000&&elm.wdate<=time(value.tytime)/1000){
    //                 leiji1 += parseFloat(elm.vtem); 
    //                 elm.leiji = leiji1;
    //                 value.ystemarr.push(elm);
    //              }
    //         });
    // }else{
    // //未送，用今天日期 减去 浇筑日期；
    // var leiji2 = 0; 
    //       re.data.tytemlist.map(function(elm) {
    //              // if(elm.wdate>value.tytime){
    //              //    break;}
    //              if(elm.wdate>=time(value.byriqi)/1000&&elm.wdate<=today){
    //                 leiji2 += parseFloat(elm.vtem); 
    //                 elm.leiji = leiji2;
    //                 value.wstemarr.push(elm);
    //              }
    //         });
    // }
                        

                       
    //                 }
                    
                });
              // console.log(sco.program_plan_betonlist);  
           }},          
           "betonadd":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检计划-子单位送检添加部位"},          
           "betondel":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检计划-子单位送检删除"},          
           "betonedit":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检计划-子单位送检编辑"},          
           // "wendu":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检计划-部位温度"}
            
        },
        program_gantt:{
           "list":{method:'get',facfun:'post_data',send:{codeid:''},pname:"横道图",before:function() {
               config.port.program_gantt.list.send.codeid = localStorage.getItem('prcodeid');
           }},
           "add":{facfun:'post_data_watch',t:0,send:{},pname:"横道图-添加"},
            "del":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"横道图-删除"},
            "edit":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"横道图-编辑"},
 
          "worklist":{method:'get',facfun:'post_data_watch',t:0,send:{codeid:''},
          pname:"横道图作业",
          before:function(){
                  config.port.program_gantt.worklist.send.codeid = localStorage.getItem('hcodeid');
              },
          fun:function(re,sco){ 
            angular.forEach(re.data.datalist,function(elm){
                elm.myorder = parseInt(elm.myorder);
            });
            sco.program_gantt_worklist =re.data;
          }       
                },
          "workdel":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"横道图-作业删除"}
            },
          program_gether:{
            "sel":{facfun:'post_data_watch',t:1,send:{'btime':'',etime:'',codeid:''},pname:"送检汇总",
            before:function(){
                  config.port.program_gether.sel.send.codeid = localStorage.getItem('prcodeid');
                  config.port.program_gether.sel.send.btime = ftime(new Date().getTime());
                  config.port.program_gether.sel.send.etime = ftime(new Date().getTime()+7*86400000); 
                },
            fun:function(re,sco){
                setTimeout(function(){
               $('*[data-toggle="tooltip"]').tooltip();
            },800);
                var a = sco.program_gether_sel;
                var ar = ['yc','by','ty','ks','zt','dz','cm','qz','nq','wq','zp'];
                ar.map(function(elm){
                    if(a[elm].hzlist.length>0){
                        var key1 = elm+'jg';
                        var key1arr = elm + 'jgarr';
                        var key2 = elm + 'bh';
                        var key2arr = elm + 'bharr';  

                            angular.forEach(a[elm].hzlist,function(value){ 
                            if(elm=='by'){
                               value.xinpianarr = doarr(value.xinpian); 
                           } 
                           //  if(elm=='ty'){
                           //     value.tyxparr = doarr(value.tyxinpian); 
                           // }                            
                           if(elm=='yc'){
                            value.jieguoarr = doarr(value.jieguo); 
                            value.ypbharr = doarr(value.ypbh); 
                            value.ccpharr = doarr(value.ccph); 
                           }else{
                             value[key1arr] = doarr(value[key1]); 
                            value[key2arr] = doarr(value[key2]);
                           }
                            });
                    }


                    if(a[elm].lslist.length>0){
                        var key1 = elm+'jg';
                        var key1arr = elm + 'jgarr';
                        var key2 = elm + 'bh';
                        var key2arr = elm + 'bharr';  

                            angular.forEach(a[elm].lslist,function(value){  
                            if(elm=='by'){
                               value.xinpianarr = doarr(value.xinpian); 
                           } 
                           //  if(elm=='ty'){
                           //     value.tyxparr = doarr(value.tyxinpian); 
                           // }                                 
                           if(elm=='yc'){
                            value.jieguoarr = doarr(value.jieguo); 
                            value.ypbharr = doarr(value.ypbh); 
                            value.ccpharr = doarr(value.ccph); 
                           }else{
                            value[key1arr] = doarr(value[key1]); 
                            value[key2arr] = doarr(value[key2]);
                           }
                            });
                    }

                }); 
            }
            },
            jilu:{method:'post',facfun:'post_data_watch_page',t:0,send:{codeid:'','nowpage':0,listnum:30},pname:"查询送检记录",before:function() {
               config.port.program_gether.jilu.send.codeid = localStorage.getItem('prcodeid');
            }},
            save:{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"保存送检记录"},
            del:{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"送检记录删除"}
          },
          program_struct:{
            "edit":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"目录保存"},
            "sel":{
                facfun:'post_data_watch',
                t:1,
                send:{codeid:''},
                pname:"土建资料",
                before:function(){
                  config.port.program_struct.sel.send.codeid = localStorage.getItem('prcodeid');
                 
                },
                fun:function(re,sco){
                }}
          },
    program_weather:{
       "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:30,curPage:'',wdate:''},pname:"工程温度",
        before:function(){         
          config.port.program_weather.list.send.cityid =  localStorage.getItem('cityid');                        
        },
        fun:function(re,sco){}
   }           
    },
                    
  operate_user:{
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:30},pname:"用户统计信息"}
          },        
        operate_logincount:{
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:30},pname:"用户登录统计"}
          },  
        operate_usergather:{
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:500},pname:"用户汇总登录"}
          },            
       operate_com:{
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:30},pname:"公司列表"}
          },
        operate_pro:{
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:30,pid:'',cityid:''},pname:"项目列表"}
          },
    system_city:{
           "list":{facfun:'post_data_watch_page',t:0,send:{'nowpage':0,listnum:30},pname:"城市管理列表"}
    },
    system_mattertpl:{
           "del":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"原材模板-删除"},
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:300},pname:"原材模板管理列表"}
    },
    system_tbtype:{
           "del":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"统表类型-删除"},
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:300},pname:"统表类型管理列表"}
    },
    system_tongbiao:{
           "del":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"统表-删除"},
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:300},pname:"统表管理列表"},
           "tplist":{facfun:'post_data',t:1,send:{'nowpage':0,listnum:300},pname:"统表类型列表"}
    },
    service_weather:{
           "list":{facfun:'post_data_watch_page',t:1,send:{'nowpage':0,listnum:30,curPage:'',wdate:''},pname:"温度管理"},
            "del":{method:'post',facfun:'post_data_watch',t:0,send:{},pname:"温度-删除"}
    },
    //个人中心
    user_info:{ 
        "list":{facfun:'post_data_watch',t:1,send:{},pname:"获取个人信息",
        fun:function(re,sco){
               // sco.$parent.$parent.com_cityData = {pid:re.data.datalist[0].pid};
               sco.imgurl = re.data.photourl;
               // sco.$parent.$parent.com_cityTime.time = new Date();
           }}
    }          
    },
    tip:{
    a1:'请输入用户名/手机号',
    a2:'用户名/手机号不少于6位数',
    a3:'请输入密码',
    a4:'密码不少于6位数',
    a5:'请输入手机号',
    a6:'手机号不少于6位数',
    a7:'手机号不少于6位数', 
    }, 


    ext:{ 
        jichu:['桩芯','承台垫层','承台','基础梁垫层','基础梁','电梯基坑垫层','电梯基坑'],
        zhuti:['首','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十','三十一','三十二','三十三','三十四','三十五','三十六','三十七','三十八','三十九','四十','五十一','五十二','五十三','五十四','五十五','五十六','五十七','五十八','五十九','五十']
    },
    typelist:[{'title':'标养',ngclass:'label-primary',url:'main/html/program/part_by.html',t:'byornot'},
      {'title':'同养',ngclass:'label-default',url:'main/html/program/part_ty.html',t:'tyornot'},
      {'title':'抗渗',ngclass:'label-default',url:'main/html/program/part_ks.html',t:'ksornot'},
      {'title':'柱头',ngclass:'label-default',url:'main/html/program/part_zt.html',t:'ztornot'},
      {'title':'拆模',ngclass:'label-default',url:'main/html/program/part_cm.html',t:'cmornot'},
      {'title':'焊接',ngclass:'label-default',url:'main/html/program/part_dz.html',t:'dzornot'},
      {'title':'砌筑',ngclass:'label-default',url:'main/html/program/part_qz.html',t:'qzornot'},
      {'title':'内抹灰',ngclass:'label-default',url:'main/html/program/part_nq.html',t:'nqornot'},
      {'title':'外抹灰',ngclass:'label-default',url:'main/html/program/part_wq.html',t:'wqornot'},
      {'title':'找平',ngclass:'label-default',url:'main/html/program/part_zp.html',t:'zpornot'} 
      ],
      yctypelist:[     
      {'title':'钢筋',ngclass:'label-default',url:'main/html/program/part_gj.html',t:'1'},
      {'title':'水泥',ngclass:'label-default',url:'main/html/program/part_sn.html',t:'2'},
      {'title':'砂',ngclass:'label-default',url:'main/html/program/part_s.html',t:'3'},
      {'title':'砖',ngclass:'label-default',url:'main/html/program/part_z.html',t:'4'},
      {'title':'装饰',ngclass:'label-default',url:'main/html/program/part_zs.html',t:'5'},
      {'title':'节能',ngclass:'label-default',url:'main/html/program/part_jn.html',t:'6'},
      {'title':'防水',ngclass:'label-default',url:'main/html/program/part_fs.html',t:'7'},
      {'title':'水电',ngclass:'label-default',url:'main/html/program/part_sd.html',t:'8'},
      {'title':'安全',ngclass:'label-default',url:'main/html/program/part_aq.html',t:'9'},
       {'title':'全部',ngclass:'label-primary',url:'main/html/program/part_qb.html',t:'0'} 
      ],
      ftypelist:[
      {'title':'----',t:'0'},     
      {'title':'基础',t:'3'},
      {'title':'主体',t:'4'},
      {'title':'装修',t:'5'},
      {'title':'幕墙',t:'6'},
      {'title':'屋面',t:'7'},
      {'title':'节能',t:'8'},
      {'title':'给排水',t:'9'},
      {'title':'电气',t:'10'}, 
      ],
      qdypelist:[ 
      {'title':'----',t:'0'},    
      {'title':'C10',t:'10'},
      {'title':'C15',t:'15'},
      {'title':'C20',t:'20'},
      {'title':'C25',t:'25'},
      {'title':'C30',t:'30'},
      {'title':'C35',t:'35'},
      {'title':'C40',t:'40'},
      {'title':'C45',t:'45'}, 
      {'title':'C50',t:'50'},
      {'title':'C55',t:'55'},
      {'title':'C60',t:'60'},
      {'title':'C65',t:'65'},
      {'title':'C70',t:'70'},
      {'title':'C75',t:'75'},
      {'title':'C80',t:'80'}, 
      ],
      sjtypelist:[
      {'title':'----',t:'0'},
      {'title':'M5',t:'5'},
      {'title':'M7.5',t:'7.5'},
      {'title':'M10',t:'10'},
      {'title':'M15',t:'15'},
      {'title':'M20',t:'20'},
      {'title':'M25',t:'25'},
      {'title':'M30',t:'30'}],
      kstypelist:[
      {'title':'----',t:'0'},
      {'title':'P4',t:'P4'},
      {'title':'P6',t:'P6'},
      {'title':'P8',t:'P8'},
      {'title':'P10',t:'P10'},
      {'title':'P12',t:'P12'},
      {'title':'>P12',t:'>P12'} ],
   
    
    
};
 
 
});