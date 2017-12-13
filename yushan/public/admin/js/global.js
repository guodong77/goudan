
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
window.root = 'api/ver1/';
window.debugflag = 0;//1调试模式，0上线模式
define('confv', function(require, exports, module) {
  
	window.YSCONF = {
		url:{
		    getmenu:{url:'index/menutree_select',method:'post_data','name':'后台侧边栏'},
		    com_update:{url:'index/com_editadd',method:'post_data_watch','name':'编辑更新一条'},
		    com_list:{url:'index/com_list',method:'post_data_watch','name':'无分页列表'},
		    com_list2:{url:'index/com_list',method:'post_data_watch','name':'无分页列表'},
		    com_list3:{url:'index/com_list',method:'post_data_watch','name':'无分页列表'},
		    com_list_page:{url:'index/com_list_page',method:'post_data_watch_page','name':'带分页列表'},
		    com_list_page2:{url:'index/com_list_page',method:'post_data_watch_page','name':'带分页列表'},
		    com_list_page3:{url:'index/com_list_page',method:'post_data_watch_page','name':'带分页列表'},
		    com_artlist_page:{url:'index/com_artlist_page',method:'post_data_watch_page','name':'带分页列表'}, 
            com_detail:{url:'index/com_detail',method:'post_data_watch','name':'详情'},
		    com_del:{url:'index/com_delete',method:'post_data_watch','name':'公共删除'},
		    com_del2:{url:'index/com_delete',method:'post_data_watch','name':'公共删除'},
		    com_editadd:{url:'index/com_editadd',method:'post_data_watch','name':'编辑或增加'},
		    com_editadd2:{url:'index/com_editadd',method:'post_data_watch','name':'编辑或增加'},
		    com_editadd3:{url:'index/com_editadd',method:'post_data_watch','name':'编辑或增加'},
		    com_editadd4:{url:'index/com_editadd',method:'post_data_watch','name':'编辑或增加'},
		    com_editadd5:{url:'index/com_editadd',method:'post_data_watch','name':'编辑或增加'},
		    lgout:{url:'base/logout',method:'post_data_watch','name':'推出登录'},
		    admin_base_select:{url:'index/base_select',method:'post_data','name':'后台首页查询'},

		},
		win:{
			warmtips_teacher_set:{template:'warmtips_teacher_set',type:'add',title:'温馨提示',temdata:{}}, 
	 }
	};
}); 
define('facv', ['jquery', 'angularjs','YS'], function(require, exports, module) { 
   var app = angular.module("myfactv", []); 
  app.factory('facv',['$http',function($http){

   var f = {

      time:function(str){
      //返回时间戳；str 为空则返回当前时间戳；
   var timestamp = !str?Date.parse(new Date()):Date.parse(new Date(str)); 
   return timestamp; 
},
seturl:function(sco,part){
  console.log({scope:sco,name:YSCONF.url[part].name});
//路径
var path = YSCONF.url[part].url; 
//自己配置的url；
 path = sco[part].url?sco[part].url:path;
//真实路径
var url = window.root + path;


var sd = sco[part].params||{};
//1，调试模式，0，上线模式；
// debugger;
if(window.debugflag){  
    switch(sd.debug)
        {
        case 1: //假数据，返回成功；
          var cid = sd.debugkey?'/'+sd.debugkey:'';
          url ='json/' +path+cid+'.json'; 
          break;
        case 0: //假数据，返回失败；
          url ='json/err.json';
          break;
        case -2://假数据，返回无权限；
        url ='json/noauth.json';          
          break;
        case -1://假数据，返回未登录；
          url ='json/nologin.json';
          break;
        default:
          break;
        } 
}

  var p = {
      url:url,
      method:YSCONF.url[part].method 
      };
  return p;
},
ysfetch:function(sco,part){
    if(!sco)return;
    if(!part)return; 
    var p = f.seturl(sco,part);
    f[p.method](sco,part); 
},  

get:function (sendurl ,senddata ,callback) {  
 var surl = sendurl + '?token='+f.getstore('ystoken');
 $http({withCredentials:true,method: 'GET', params: $.param(senddata), url: surl,headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .success(function (data, status, headers, config) { 
                      callback(data);
                    }).
                    error(function (data, status, headers, config) {
                       var reply = {'code': "0",'msg':'请求错误','data':data};
                       YS('layer',function(){layer.msg('网络超时！',{icon:0,time: 2000});});
                    });
            }, 
  post:function (sendurl ,senddata ,callback) { 
  var surl = sendurl + '?token='+f.getstore('ystoken');

                $http({method: 'POST',  data: $.param(senddata), url: surl,headers: {'Content-Type':'application/x-www-form-urlencoded'}})
                    .success(function (data, status, headers, config) {                        
                     callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        var reply = {'code': "0",'msg':'请求错误','data':data};
                         YS('layer',function(){layer.msg('网络超时！',{icon:0,time: 2000});});
                    });
}, 
load:function(num){ 
  var a = num?$('#loader').fadeIn(100):$('#loader').fadeOut(1000); 
}, 
getcode:function(){ 
 return $('#codeid').val();
},
get_data_watch:function(sco,part){
if(!sco)return;
if(!part)return; 

sco.$watch(part+'.time', function() {  
        if(!sco[part].time)return;
        //运行前 ，执行的函数；
         if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
        var sd = sco[part].params||{};
        if(YSCONF.url[part].load){f.load(0);}   
var p = f.seturl(sco,part);         
        f.get(p.url,sd,function(re){ 
            sco[part].data = {};
            if(re.code==1){
              sco[part].data= re.data;
            }
            //运行后拿到数据，执行函数
           if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);} 
           if(YSCONF.url[part].load){f.load(0);}    
        });
    }, true); 
},
 
get_data_watch_page:function(sco,part){
if(!sco)return;
if(!part)return; 

var page = YSCONF.url[part].pageid||'page';
 
  sco.$watch(part+'.time', function() {  
        if(!sco[part].time)return;
        //运行前 ，执行的函数；
         if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
        var sd = sco[part].params||{};
        if(YSCONF.url[part].load){f.load(1);}   
       var p = f.seturl(sco,part); 
        f.get(p.url,sd,function(re){ 
          sco[part].data = {};
            if(re.code==1){
              sco[part].data= re.data; 

laypage({
    cont: page, //容器。值支持id名、原生dom对象，jquery对象,
    pages: re.data.pages, //总页数
    skin: 'molv', //皮肤
    first: 1, //将首页显示为数字1,。若不显示，设置false即可
    //last: 11, 将尾页显示为总页数。若不显示，设置false即可
    curr: sco[part].params.curPage || 1, //当前页
    prev: '<', //若不显示，设置false即可
    next: '>', //若不显示，设置false即可
    jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
          sco[part].params.curPage = obj.curr;
          sco[part].time = f.time();
          sco.$apply();
                }
            }
 
});
 }
 //运行后拿到数据，执行函数
if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);} 
if(YSCONF.url[part].load){f.load(0);}   
        });
    }, true); 
},
 
get_data:function(sco,part){
if(!sco)return;
if(!part)return; 

   //运行前 ，执行的函数；
         if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
        var sd = sco[part].params||{};
        if(YSCONF.url[part].load){f.load(1);}   
       var p = f.seturl(sco,part);  
        f.get(p.url,sd,function(re){ 
            sco[part].data = {};
            if(re.code==1){
              sco[part].data= re.data;
            }
            //运行后拿到数据，执行函数
           if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);}  
           if(YSCONF.url[part].load){f.load(0);}   
        });

 
     
},
 
post_data_watch:function(sco,part){
  
if(!sco)return;
if(!part)return; 

sco.$watch(part+'.time', function() {   
        if(!sco[part].time)return;
        //运行前 ，执行的函数；
         if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
       var sd = sco[part].params||{};
       if(YSCONF.url[part].load){f.load(1);}   
        var p = f.seturl(sco,part); 
        f.post(p.url,sd,function(re){  

            sco[part].data = {};
            if(re.code==1){
              sco[part].data= re.data;
            }
            // sco.$digest();
            //运行后拿到数据，执行函数
           if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);}  
           if(YSCONF.url[part].load){f.load(0);}   
        });
    }, true); 
},
 
post_data:function(sco,part){
if(!sco)return;
if(!part)return; 

//运行前 ，执行的函数；
  if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
var sd = sco[part].params||{}; 
if(YSCONF.url[part].load){f.load(1);}      
var p = f.seturl(sco,part);  
f.post(p.url,sd,function(re){ 
  sco[part].data = {};
  if(re.code==1){ 
    sco[part].data= re.data; 
  }
  //运行后拿到数据，执行函数
 if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);}  
 if(YSCONF.url[part].load){f.load(0);}
});
     
},
post_data_watch_page:function(sco,part){
if(!sco)return;
if(!part)return; 

var page = YSCONF.url[part].pageid||'page';
 
  sco.$watch(part+'.time', function() {  
        if(!sco[part].time)return;
        //运行前 ，执行的函数；
         if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
        var sd = sco[part].params||{};
        if(YSCONF.url[part].load){f.load(1);}
        var p = f.seturl(sco,part); 
        f.post(p.url,sd,function(re){ 

          sco[part].data = {};
            if(re.code==1){
              sco[part].data= re.data; 

laypage({
    cont: page, //容器。值支持id名、原生dom对象，jquery对象,
    pages: re.data.pages, //总页数
    skin: 'molv', //皮肤
    first: 1, //将首页显示为数字1,。若不显示，设置false即可
    //last: 11, 将尾页显示为总页数。若不显示，设置false即可
    curr: sco[part].params.curPage || 1, //当前页
    prev: '<', //若不显示，设置false即可
    next: '>', //若不显示，设置false即可
    jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
          sco[part].params.curPage = obj.curr;
          sco[part].time = f.time();
          sco.$apply();
                }
            }
 
});
 }
 //运行后拿到数据，执行函数
if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);} 
        if(YSCONF.url[part].load){f.load(0);}
        });
    }, true); 
},
getscope_byid: function(sc, id) {
    /*递归，找到$id为 num 的scope.并返回；*/
    if (sc.$id == id) {
      return sc;
    } else {
      return f.getscope_byid(sc.$parent, id);
    }
  },
  getcd: function(sc, id) {
     var comsco = f.getscope_byid(sc,2);
     return comsco.cd[id];
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
dogoto:function(re,url){
  layer.msg(re.msg);
  if(re.code==1){
       setTimeout(function() {
            window.location.href = url;
        },1000);
  } 
  
      
},setCookie:function(name,value){
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
    webupload:function($list,$btn,state,obj,key){
         YS("webuploader",function(){  
 


var uploader = WebUploader.create({
      resize: false, // 不压缩image  
      swf:  'YS-frame/webuploader/0.1.5/Uploader.swf', 
      server: window.root + 'base/upload', 
      pick: '#picker', // 选择文件的按钮。可选
      chunked: true, //是否要分片处理大文件上传
      chunkSize:2*1024*1024, //分片上传，每片2M，默认是5M
       auto: true //选择文件后是否自动上传
     // chunkRetry : 2, //如果某个分片由于网络问题出错，允许自动重传次数
      //runtimeOrder: 'html5,flash',
      // accept: {
      //   title: 'Images',
      //   extensions: 'gif,jpg,jpeg,bmp,png',
      //   mimeTypes: 'image/*'
      // }
    });




//跨域设置
uploader.on('uploadBeforeSend', function(obj, data, headers) {
$.extend(headers, {
"Origin": "http://api.yushan.com",
"Access-Control-Request-Method": "POST"
});
});




    // 当有文件被添加进队列的时候
    uploader.on( 'fileQueued', function( file ) {
        $list.append( '<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
        '</div>' );
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage,a ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');
             // console.log(file,percentage,a);
        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
              '<div class="progress-bar" role="progressbar" style="width: 0%">' +
              '</div>' +
            '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 100 + '%' );
    });
    // 文件上传成功
    uploader.on( 'uploadSuccess', function( file,re ) {
        console.log(re);
        if(re.code==1){ 
          re.url = re.url.replace(/\\/g, "/");
          obj[key] =re.url;
        }else{
          layer.msg(re.msg);
        }
        $( '#'+file.id ).find('p.state').text('已上传');
    });

    // 文件上传失败，显示上传出错
    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('p.state').text('上传出错');
    });
    // 完成上传完
    uploader.on( 'uploadComplete', function( file ) { 
        $( '#'+file.id ).find('.progress').fadeOut();
    });

    // 当有文件添加进来的时候
uploader.on( 'fileQueued', function( file ) {
    var $list = $("#fileList"), 
        $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info">' + file.name + '</div>' +
            '</div>'
            ),
        $img = $li.find('img');
   $("#fileList").html('');

    // $list为容器jQuery实例
    $list.append( $li );

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }

        $img.attr( 'src', src );
    }, 100, 100 );
});

    $btn.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            uploader.upload();
            // if (state === 'ready') {
            //     uploader.upload();
            // } else if (state === 'paused') {
            //     uploader.upload();
            // } else if (state === 'uploading') {
            //     uploader.stop();
            // }
        }); 








  
    });
    },
 hashtoobj:function(str){
  var obj = {};
  if(str){
    if(str.indexOf('&')>0){
      var arr = str.split('&'); 
      arr.map(function(el){
          var t = el.split('=');
          if(t.length>1){obj[t[0]] = t[1];} 
      });  
    }else{ 
          var t = str.split('=');
          if(t.length>1){obj[t[0]] = t[1];} 
    }
  }
  return obj;
}, 


   }; 
    return f; 
  }]); 
}); 
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