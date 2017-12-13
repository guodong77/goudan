/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-24 18:12:43
 * @version $Id$
 */
window.onload = function () {
		//轮播插件
		var swiper = new Swiper('.swiper-container', {
			autoplay : 3000,
			speed:2000,
			slidesPerView: 1,
			spaceBetween: 0,
			autoplayDisableOnInteraction : false,
			paginationClickable :true,
			loop: true,
			pagination : '.pagination',
		}); 
		var oHome = document.getElementById('home');
        var box = document.getElementsByClassName('wr')[0];
        var height = document.getElementsByClassName('height')[0];
        var oF36 = document.getElementsByClassName('f36');
        var oP2 = document.getElementsByClassName('p2');
        var oAuto = document.getElementsByClassName('auto');
        var oA = document.querySelectorAll('.nav>li>a');
        var oSpan = document.querySelectorAll('.header>span')[0];
        var oA2 = document.querySelectorAll('li.login>a')[0];
        var oA3 = document.querySelectorAll('li.login2>a')[0];
        var oCode = document.querySelectorAll('.code')[0];
        var oP = document.querySelectorAll('.conter1>.list1>p')[0];
		var oAa = document.getElementById('menu');
		var oRi = document.getElementById('ri');
		var pp = document.querySelectorAll('#ri>p');
		var oB = document.getElementById('b1');
		oAa.off = true;
		window.onresize = function(){
			if(document.documentElement.clientWidth>950&&oAa.off==false){
				oRi.style.opacity = 0;
				oRi.style.height= '0';
				for (var i = 0; i < pp.length; i++) {
					pp[i].style.height= '0px';
					pp[i].style.opacity = 0;
				}
				oAa.off = true;
				}
		}
		//移动端菜单点击
		oB.onclick=function(){
			oRi.style.opacity = 0;
			oRi.style.height= '0';
			for (var i = 0; i < pp.length; i++) {
				pp[i].style.height= '0px';
				pp[i].style.opacity = 0;
			}
			oAa.off = true;
		}
		oAa.onclick=function(){
			if(oAa.off){
				for (var i = 0; i < pp.length; i++) {
					pp[i].style.opacity = 1;
					pp[i].style.height= '50px';
				}
				oRi.style.height= '100%';
				// pp.style.height='50px';
				oRi.style.opacity = 1;
				oAa.off = !oAa.off;
			}else{
				oRi.style.opacity = 0;
				oRi.style.height= '0';
				for (var i = 0; i < pp.length; i++) {
					pp[i].style.height= '0px';
					pp[i].style.opacity = 0;
				}
				oAa.off = !oAa.off;
			}
			
		}
		//滚动兼容
		function getScrollTop()
		{
		    var scrollTop=0;
		    if(document.documentElement&&document.documentElement.scrollTop)
		    {
		        scrollTop=document.documentElement.scrollTop;
		    }
		    else if(document.body)
		    {
		        scrollTop=document.body.scrollTop;
		    }
		    return scrollTop;
		}
		//判断是否是移动端
		function IsPC() {
	        var userAgentInfo = navigator.userAgent;
	        var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
	        var flag = true;
	        for (var v = 0; v < Agents.length; v++) {
	            if (userAgentInfo.indexOf(Agents[v]) > 0) {
	                flag = false;
	                break;
	            }
	        }
	        if(window.screen.width>=768){
	             flag = true;
	        }
	        return flag;
		}
		//滚轮事件
        function onMouseWheel(ev){
        	/*当鼠标滚轮事件发生时，执行一些操作*/
            var ev = ev || window.event;
            var down = true; 
            // 定义一个标志，当滚轮向下滚时，执行一些操作
                down = ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;
            if(down){
            	// console.log(getScrollTop())
            	for (var i = 0; i < oA.length-1; i++) {
            		oA[i].className = 'col';
            	}
            	if(IsPC()){
            		// console.log(getScrollTop())
            		if(document.body.clientWidth<950&&document.body.clientWidth>500){
            			if(getScrollTop() >= 100){
						oF36[1].style.opacity = 1;
						oF36[1].style.marginRight='0px';
						oP2[0].style.opacity = 1;
						oP2[0].style.paddingLeft='0px';
						oAuto[0].style.opacity = 1;
						oAuto[0].style.top='0px';
	   				}
	   				if(getScrollTop() >= 700){
						oF36[2].style.opacity = 1;
						oF36[2].style.marginLeft='0px';
						oP2[1].style.opacity = 1;
						oP2[1].style.paddingRight='0px';
						oAuto[1].style.opacity = 1;
						oAuto[1].style.top='0px';
	   				}
	   				if(getScrollTop() >= 1400){
						oF36[3].style.opacity = 1;
						oF36[3].style.marginRight='0px';
						oP2[2].style.opacity = 1;
						oP2[2].style.paddingLeft='0px';
						oAuto[2].style.opacity = 1;
						oAuto[2].style.top='0px';
	   				}
	   				if(getScrollTop() >= 1900){
						oF36[4].style.opacity = 1;
						oF36[4].style.marginLeft='0px';
						oP2[3].style.opacity = 1;
						oP2[3].style.paddingRight='0px';
						oAuto[3].style.opacity = 1;
						oAuto[3].style.top='0px';
	   				}
	   				if(getScrollTop() >= 2600){
						oF36[5].style.opacity = 1;
						oF36[5].style.marginRight='0px';
						oP2[4].style.opacity = 1;
						oP2[4].style.paddingLeft='0px';
						oAuto[4].style.opacity = 1;
						oAuto[4].style.top='0px';
	   				}
            		}
            		if(document.body.clientWidth<=500){
            			if(getScrollTop() <= 0){
						oF36[1].style.opacity = 1;
						oF36[1].style.marginRight='0px';
						oP2[0].style.opacity = 1;
						oP2[0].style.paddingLeft='0px';
						oAuto[0].style.opacity = 1;
						oAuto[0].style.top='0px';
	   				}
	   				if(getScrollTop() >= 100){
						oF36[2].style.opacity = 1;
						oF36[2].style.marginLeft='0px';
						oP2[1].style.opacity = 1;
						oP2[1].style.paddingRight='0px';
						oAuto[1].style.opacity = 1;
						oAuto[1].style.top='0px';
	   				}
	   				if(getScrollTop() >= 300){
						oF36[3].style.opacity = 1;
						oF36[3].style.marginRight='0px';
						oP2[2].style.opacity = 1;
						oP2[2].style.paddingLeft='0px';
						oAuto[2].style.opacity = 1;
						oAuto[2].style.top='0px';
	   				}
	   				if(getScrollTop() >= 500){
						oF36[4].style.opacity = 1;
						oF36[4].style.marginLeft='0px';
						oP2[3].style.opacity = 1;
						oP2[3].style.paddingRight='0px';
						oAuto[3].style.opacity = 1;
						oAuto[3].style.top='0px';
	   				}
	   				if(getScrollTop() >= 700){
						oF36[5].style.opacity = 1;
						oF36[5].style.marginRight='0px';
						oP2[4].style.opacity = 1;
						oP2[4].style.paddingLeft='0px';
						oAuto[4].style.opacity = 1;
						oAuto[4].style.top='0px';
	   				}
            		}
	            	if(getScrollTop() >= 200){
						oF36[1].style.opacity = 1;
						oF36[1].style.marginRight='0px';
						oP2[0].style.opacity = 1;
						oP2[0].style.paddingLeft='0px';
						oAuto[0].style.opacity = 1;
						oAuto[0].style.top='0px';
	   				}
	   				if(getScrollTop() >= 900){
						oF36[2].style.opacity = 1;
						oF36[2].style.marginLeft='0px';
						oP2[1].style.opacity = 1;
						oP2[1].style.paddingRight='0px';
						oAuto[1].style.opacity = 1;
						oAuto[1].style.top='0px';
	   				}
	   				if(getScrollTop() >= 1800){
						oF36[3].style.opacity = 1;
						oF36[3].style.marginRight='0px';
						oP2[2].style.opacity = 1;
						oP2[2].style.paddingLeft='0px';
						oAuto[2].style.opacity = 1;
						oAuto[2].style.top='0px';
	   				}
	   				if(getScrollTop() >= 2900){
						oF36[4].style.opacity = 1;
						oF36[4].style.marginLeft='0px';
						oP2[3].style.opacity = 1;
						oP2[3].style.paddingRight='0px';
						oAuto[3].style.opacity = 1;
						oAuto[3].style.top='0px';
	   				}
	   				if(getScrollTop() >= 3700){
						oF36[5].style.opacity = 1;
						oF36[5].style.marginRight='0px';
						oP2[4].style.opacity = 1;
						oP2[4].style.paddingLeft='0px';
						oAuto[4].style.opacity = 1;
						oAuto[4].style.top='0px';
	   				}
            	}else{
            		if(getScrollTop() <= 0){
						oF36[1].style.opacity = 1;
						oF36[1].style.marginRight='0px';
						oP2[0].style.opacity = 1;
						oP2[0].style.paddingLeft='0px';
						oAuto[0].style.opacity = 1;
						oAuto[0].style.top='0px';
	   				}
	   				if(getScrollTop() >= 100){
						oF36[2].style.opacity = 1;
						oF36[2].style.marginLeft='0px';
						oP2[1].style.opacity = 1;
						oP2[1].style.paddingRight='0px';
						oAuto[1].style.opacity = 1;
						oAuto[1].style.top='0px';
	   				}
	   				if(getScrollTop() >= 300){
						oF36[3].style.opacity = 1;
						oF36[3].style.marginRight='0px';
						oP2[2].style.opacity = 1;
						oP2[2].style.paddingLeft='0px';
						oAuto[2].style.opacity = 1;
						oAuto[2].style.top='0px';
	   				}
	   				if(getScrollTop() >= 500){
						oF36[4].style.opacity = 1;
						oF36[4].style.marginLeft='0px';
						oP2[3].style.opacity = 1;
						oP2[3].style.paddingRight='0px';
						oAuto[3].style.opacity = 1;
						oAuto[3].style.top='0px';
	   				}
	   				if(getScrollTop() >= 700){
						oF36[5].style.opacity = 1;
						oF36[5].style.marginRight='0px';
						oP2[4].style.opacity = 1;
						oP2[4].style.paddingleft='0px';
						oAuto[4].style.opacity = 1;
						oAuto[4].style.top='0px';
	   				}
            	}
            	
            	oA2.className ='oA2' ;
            	oCode.className ='code code1';
            	oSpan.innerHTML = '<img src="../../../images/head-logo1.png" style="width:176px;width: 130px;padding-top: 10px;">'
            	// oSpan.className = 'cff f20 fl f-w col1';
            	oA3.style.color = '#fff';
            	oHome.style.color = '#32AAFD';
                box.style.backgroundColor = '#fff';
                box.style.boxShadow = '1px 1px 1px #cfcfcf';

            }else{
            	if( getScrollTop() <= 140){
            		for (var i = 0; i < oA.length-1; i++) {
            		oA[i].className = '';
            		}  

            		oA2.className ='';
            		oCode.className ='code';
            		oSpan.innerHTML = '<img src="../../../images/head-logo.png" style="width:176px;width: 130px;padding-top: 10px;">'
            		// oSpan.className = 'cff f20 fl f-w';
            		oHome.style.color = 'rgba(255,255,255,0.60)';
            		box.style.backgroundColor = 'transparent';
            		box.style.boxShadow = '0 0 0 #cfcfcf';
            	}
                
            }
        }
        addEvent(document,'mousewheel',onMouseWheel);
        addEvent(document,'DOMMouseScroll',onMouseWheel);
        function addEvent(obj,xEvent,fn) {
        if(obj.attachEvent){
            obj.attachEvent('on'+xEvent,fn);
        }else{
            obj.addEventListener(xEvent,fn,false);
        }
    }
     }
