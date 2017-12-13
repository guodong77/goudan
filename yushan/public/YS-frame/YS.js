define(function(require, exports, module){ 
function run(fun){typeof(fun) == "function"?fun():'';} 
window.YS = function(pname,fun,skin,lang){
var u = {
//只需要引入js
'moves':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''}, 
'labelauty':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''}, 
'goup':{t:'j','ver':'0.5.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'jQMeter':{t:'j','ver':'0.1.2/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'easing':{t:'j','ver':'1.3.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'mixitup':{t:'j','ver':'1.4.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'filters':{t:'j','ver':'1.3/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'knob':{t:'j','ver':'1.1.2/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'waterbubble':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'tabso':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'qrcode':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'form':{t:'j','ver':'3.51.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'ZeroClipboard':{t:'j','ver':'2.1.6/','css':"",'p':'','j1':'','j2':'','j3':''},
'circliful':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'jqbar':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'tableExport':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'moment':{t:'j','ver':'2.10.6/','css':"",'p':'','j1':'','j2':'','j3':''},
'getLodop':{t:'j','ver':'6.1/','css':"",'p':'','j1':'','j2':'','j3':''},
'bootstrap':{t:'j','ver':'3.2.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'UItoTop':{t:'j','ver':'1.2/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'slide':{t:'j','ver':'2.1.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'laydate':{t:'j','ver':'1.1/','css':"",'p':'','j1':'','j2':'','j3':''},
'TouchSlide':{t:'j','ver':'1.1/','css':"",'p':'','j1':'','j2':'','j3':''}, 
'printarea':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''}, //打印
'validate':{t:'j','ver':'1.14/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'html2canvas':{t:'j','ver':'0.5.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'slimScroll':{t:'j','ver':'1.3.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'transformFromWGSToGCJ':{t:'j','ver':'1.0.0/','css':"",'p':'','j1':'','j2':'','j3':''},//高德地图纠偏 
'richmarker':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},//谷歌marker自定义插件
//只需要引入js、css
'layer':{t:'jc','ver':'3.0/','css':"skin/",'p':'','j1':'','j2':'','j3':''},
'cropper':{t:'jc','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'wangEditor':{t:'jc','ver':'2.1.4/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'webuploader':{t:'jc','ver':'0.1.5/','css':"",'p':'','j1':'','j2':'','j3':''},
'pwstabs':{t:'jc','ver':'1.2.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'fullpage':{t:'jc','ver':'2.7.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'bsdatetimepicker':{t:'jc','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'jqdatetimepicker':{t:'jc','ver':'2.1.9/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'laypage':{t:'jc','ver':'1.3/','css':"skin/",'p':'','j1':'','j2':'','j3':''},
'toastr':{t:'jc','ver':'2.0.3/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'mlayer':{t:'jc','ver':'2.0/','css':"need/",'p':'/','j1':'','j2':'','j3':''},
'shCircleLoader':{t:'jc','ver':'0.2/','css':"/",'p':'jquery/','j1':'','j2':'','j3':''},
'zTree':{t:'jc','ver':'3.0/','css':"zTreeStyle/",'p':'jquery/','j1':'','j2':'','j3':''},

//只需要引入js1、js
'erweima':{t:'j1j','ver':'1.0/','css':"",'p':'jquery/','j1':'qrcode','j2':'','j3':''}, //?
//只需要引入js、css、js
'selectpicker':{t:'jcj1','ver':'1.10.1/','css':"",'p':'jquery/','j1':'bootstrap','j2':'','j3':''},
'jScrollPane':{t:'jcj1','ver':'2.0/','css':"",'p':'jquery/','j1':'mousewheel','j2':'','j3':''},
'highcharts':{t:'jcj1','ver':'4.2.4/','css':"",'p':'jquery/','j1':'exporting','j2':'','j3':''}, 
'highcharts3d':{t:'jcj1','ver':'4.2.4/','css':"",'p':'jquery/','j1':'exporting','j2':'','j3':''},
'highchartsmore':{t:'jcj1','ver':'4.2.4/','css':"",'p':'jquery/','j1':'exporting','j2':'','j3':''},
'mmGrid':{t:'jcj1','ver':'1.0/','css':"",'p':'jquery/','j1':'mmPaginator','j2':'','j3':''},
'zyUpload':{t:'j1cj','ver':'1.0/','css':"",'p':'jquery/','j1':'zyFile','j2':'','j3':''},
'mmGrid':{t:'jcj1','ver':'1.0/','css':"",'p':'jquery/','j1':'mmPaginator','j2':'','j3':''},
//只需要引入js、css、js1、js2
'bootstrapTable':{t:'jcj1j2j3','ver':'1.10.1/','css':"",'p':'jquery/','j1':'editableTableWidget','j2':'bootstrapTableexport','j3':'tableExport'},
//只需要引入js、js1、js2
'ueditor':{t:'j1j2j','ver':'1.4.3/','css':"",'p':'','j1':'ueditor.config','j2':'lang/zh-cn/zh-cn','j3':''},
//先引入j1 c，js
'fullCalendar':{t:'j1cj','ver':'2.6.1/','css':"",'p':'jquery/','j1':'moment','j2':'','j3':''},
'validationEngine':{t:'j1cj','ver':'2.6.2/','css':"",'p':'jquery/','j1':'validationEngine-zh_CN','j2':'','j3':''},
//带JS皮肤参数
'echarts':{t:'jskin','ver':'3.1.6/','css':"",'p':'','j1':'','j2':'','j3':''},
//带css皮肤参数
};
var Y ='YS-frame/';
var bu = Y+u[pname].p+pname+'/'+u[pname].ver;
var jsurl = bu+pname+'.js'; 
var cssurl = bu+u[pname].css+pname+'.css'; 
var j1url = bu+u[pname].j1+'.js';
var j2url = bu+u[pname].j2+'.js';
var j3url = bu+u[pname].j3+'.js';
var skinjs = bu+skin+'.js';
var skincss = bu+u[pname].css+skin+'/'+pname+'.css';
switch(u[pname].t){
case 'j': 
require.async([jsurl],function(){run(fun)});
  break;
case 'jc':
require.async([jsurl,cssurl], function(){run(fun)});
  break;
case 'jj1':  
require.async([jsurl], function(){seajs.use([j1url],function(){run(fun)})});
  break;
case 'j1j': 
require.async([j1url], function(){seajs.use([jsurl],function(){run(fun)})});
  break;
case 'jcj1':   
require.async([jsurl,cssurl], function(){seajs.use([j1url],function(){run(fun)})});
  break;
case 'j1cj': 
require.async([j1url,cssurl], function(){seajs.use([jsurl],function(){run(fun)})});
  break;
case 'jj1j2': 
require.async([jsurl], function(){seajs.use([j1url,j2url],function(){run(fun)})});
  break;
case 'j1j2j': 
require.async([j1url,jsurl], function(){seajs.use([j2url],function(){run(fun)})});
  break;
case 'jcj1j2': 
require.async([jsurl,cssurl], function(){seajs.use([j1url,j2url],function(){run(fun)})});
  break;
case 'jcj1j2j3': 
require.async([jsurl,cssurl], function(){seajs.use([j1url,j2url,j3url],function(){run(fun)})});
  break;  
case 'j1j2jc': 
require.async([j1url,j2url,cssurl], function(){seajs.use([jsurl],function(){run(fun)})});
  break; 
case 'jskin': 
  require.async([jsurl], function(){skin?seajs.use([skinjs],function(){run(fun)}):run(fun);})
  break;} 
}
});
 