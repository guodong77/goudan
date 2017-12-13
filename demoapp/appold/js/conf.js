export default conf = {
	debugflag:1,//1调试模式，0上线模式
	// rooturl:'http://api.ysjianzhu.com/index.php/',
	rooturl:'http://myapp.ysjianzhu.com/ysAPP/app/',
	url:{ 
	com_list:{url:'http://guizhou.weiyuliang.com/json/yiwan/lunbo.json',method:'get_data'},
	com_list1:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
	com_list2:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
	com_list_page:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
 	com_list_page1:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
 	com_list_page2:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
 	com_delete:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
 	com_editadd:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
 	com_editadd2:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
 	com_upadte:{url:'http://guizhou.weiyuliang.com/json/fuwu/fuwu_fujin.json',method:'get_data'},
 	com_detail:{url:'http://guizhou.weiyuliang.com/json/yiwan/xinxi.json',method:'get_data'},  
},
		Teditedlist:[
		        {
		          route: 'Tediteddetail',
		          text: '基本资料',
		          url: require('../public/img/jbxx.png'),
		        },
		        {
		          route: 'Tbuilder',
		          text: '施工单位',
		          url:require('../public/img/sgdw.png'),
		        },
		        {
		          route: 'Tsupervisor',
		          text: '监理单位',
		          url:require('../public/img/jldw.png'),
		        },
		        {
		          route: 'Tconstruction',
		          text: '建设单位',
		          url:require('../public/img/jsdw.png'),
		        },
		        {
		          route: 'Tdesign',
		          text: '设计单位',
		          url:require('../public/img/sjdw.png'),
		        },
		        {
		          route: 'Treconnaissance',
		          text: '勘察单位',
		          url:require('../public/img/kcdw.png'),
		        },
		        {
		          route: 'Totherunit',
		          text: '其他单位',
		          url:require('../public/img/qtdw.png'),
		        },
		        
		      ],

}