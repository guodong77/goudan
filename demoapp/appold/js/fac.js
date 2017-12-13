import conf from './conf';
import { createFetch, base, accept, parse,params,method ,body,query} from 'http-client';

export default f = {
time:function(str){
      //返回时间戳；str 为空则返回当前时间戳；
   var timestamp = !str?Date.parse(new Date()):Date.parse(new Date(str)); 
   return timestamp; 
},
seturl:function(sco,part){
var path = conf.url[part].url; 
//自己配置的url；
 path = sco[part].url?sco[part].url:path;
//真实路径
var url = conf.rooturl + path;

var sd = sco[part].params||{};
//1，调试模式，0，上线模式；
// debugger;
if(conf.debugflag){  
    switch(sd.debug)
        {
        case 1: //假数据，返回成功；
          var cid = sd.debugkey?'/'+sd.debugkey:'';
          url =conf.rooturl+'public/json/' +path+cid+'.json'; 
          break;
        case 0: //假数据，返回失败；
          url =conf.rooturl+'public/json/err.json';
          break;
        case -2://假数据，返回无权限；
        url =conf.rooturl+'public/json/noauth.json';          
          break;
        case -1://假数据，返回未登录；
          url =conf.rooturl+'public/json/nologin.json';
          break;
        default:
          break;
        } 
}
// debugger;

  var p = {
      url:url,
      method:conf.url[part].method 
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

const fetch = createFetch(parse('json'), query(senddata));
 fetch(sendurl).then(response => {callback(response.body);}).catch((err)=>{
  console.log(senddata.name+' POST请求报错','params:',senddata);
  console.log(err)})



}, 
post:function (sendurl ,senddata ,callback) { 
const fetch = createFetch(parse('json'),method('POST'),body(JSON.stringify(senddata), 'application/json'))
fetch(sendurl).then(response => {
 callback(response.body);
 
}).catch((err)=>{
  console.log(senddata.name+' GET请求报错','params:',senddata);
  console.log(err)})
  debugger;
}, 
 
get_data:function(sco,part){
if(!sco)return;
if(!part)return; 
var p = f.seturl(sco,part);  
   //运行前 ，执行的函数；
        if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
        var sd = sco[part].params||{};
        if(conf.url[part].load){f.load(1);}   
        f.get(p.url,sd,function(re){ 
            sco[part].data = {};
            if(re.code==1){
              sco[part].data= re.data;
            }
            sco.ysrun();
            //运行后拿到数据，执行函数
           if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);}  
           if(conf.url[part].load){f.load(0);}   
        });

 
     
},
post_data:function(sco,part){
if(!sco)return;
if(!part)return; 
var p = f.seturl(sco,part);  
 
//运行前 ，执行的函数；
  if(typeof(sco[part].before)==="function"){var v = sco[part].before(sco); if(v===false){return false;} } 
var sd = sco[part].params||{}; 
if(conf.url[part].load){f.load(1);}      
f.post(p.url,sd,function(re){  
sco[part].data = {};
  if(re.code==1){
              sco[part].data= re.data;
            }
            sco.ysrun();
  //运行后拿到数据，执行函数
 if(typeof(sco[part].done)==="function"){sco[part].done(re,sco);}  
 if(conf.url[part].load){f.load(0);}
});
     
},
setobj(value,str){
  //通过字符串和值，造一个对象；
  let arr = str.split('.');
  let val = {};
  for (var i = arr.length; i > 1; i--) {
      if(i==arr.length){
       val[arr[i-1]] = value;
      }else{
        let a = {};
        a[arr[i-1]] = val;
        val = a;  
      }
    }
    return val;
},
//验证手机号码是否正确，正确返回true  错误返回false；
testphone(num){    
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|145|147|159|153)+\d{8})$/;
  if(!myreg.test(num)){
    return false;
  }else{
    return true;
  }
},
setstore(key,value){storage.save({key: key,data: value,expires: 30 * 1000 * 3600 * 24});},
getstore(key,callback){
    storage.load({
          key: key,
          autoSync: true,
          syncInBackground: true,
          syncParams: { 
             someFlag: true,
          },
      }).then(ret => {
             callback(ret);  
        }).catch(err => {
              callback(null); 
           })
     },
unsetstore(key){
   // debugger;
    storage.remove({ 
      key: key
    });
  },  
GPS:{
    PI : 3.14159265358979324,
    x_pi : 3.14159265358979324 * 3000.0 / 180.0,
    delta : function (lat, lon) {
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2;
        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        var dLat = this.transformLat(lon - 105.0, lat - 35.0);
        var dLon = this.transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * this.PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return {'lat': dLat, 'lon': dLon};
    },

    //GPS---高德
    gcj_encrypt : function ( wgsLat , wgsLon ) {
        if (this.outOfChina(wgsLat, wgsLon))
            return {'lat': wgsLat, 'lon': wgsLon};

        var d = this.delta(wgsLat, wgsLon);
        return {'lat' : wgsLat + d.lat,'lon' : wgsLon + d.lon};
    },
    outOfChina : function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat : function (x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon : function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;

        return ret;
    }
},
    setminu:function(time){
    //PHP时间戳转换成分钟距离当前的分钟数 
    var s = fac.time()/1000 - time;
    var m = s/60;
    var str = '';
    if(m<1){str = '刚刚';}
    if(m>=1&&m<60){str = Math.round(m)+'分钟前';}
    if(m>=60&&m<1440){str = Math.round(m/60)+'小时前';}
    if(m>=1440){str = Math.round(m/1440)+'天前';} 
    return str;
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
     yssocket:function(url){
    var socket = new WebSocket(url);
    socket.yssend = function(val){
        console.log('yssend',val);
      //对象或者字符串转换
      val = typeof(val) ==='object'?JSON.stringify(val):val;
      socket.send(val);

    } 
    socket.ysonmessage = function(data,re){}

    socket.onmessage = function(re){
      //对消息进行转换；
      var tem = '';
      try { 
      tem = JSON.parse(re.data); 
      }catch(e){tem = re.data;}
      socket.ysonmessage(tem,re);
    } 
    return socket;
  },
   //测量经纬度之间的距离
    getFlatternDistance:function(lat1,lng1,lat2,lng2){
        var EARTH_RADIUS = 6378137.0;    //单位M
        var PI = Math.PI;
        function getRad(d){
            return d*PI/180.0;
        };

        // lat1 = 39.916527;
        // lng1 = 116.397128;
        // lat2 = 40.916527;
        // lng2 = 116.397128;
        lat1 = parseFloat(lat1);
        lng1 = parseFloat(lng1);
        lat2 = parseFloat(lat2);
        lng2 = parseFloat(lng2);
        var f = getRad((lat1 + lat2)/2);
        var g = getRad((lat1 - lat2)/2);
        var l = getRad((lng1 - lng2)/2);
        
        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);
        
        var s,c,w,r,d,h1,h2;
        var a = EARTH_RADIUS;
        var fl = 1/298.257;
        
        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;
        
        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;
        
        w = Math.atan(Math.sqrt(s/c));
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;
        
        var t = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));

        return Math.round(t);

    } 

}
 