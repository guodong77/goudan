import React from 'react';
import {Platform,Image,StyleSheet,View,Text} from 'react-native'; 
import {TabNavigator} from 'react-navigation'; 
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';


import Buildlist from './Buildlist';
import Findworklist from './Findworklist'; 
import Theproject from './Theproject';
import Fworkdetail from './Fworkdetail'; 
import Personal from './Personal'; 

const badge=3;
const Tab = TabNavigator({
    Personal:{
    screen:Personal,
    navigationOptions:{
     
     abBarLabel:'我的',

      tabBarIcon:(tintColor)=>(
      <View>
          <Image 
            source={require('../public/img/我的-默认.png')}
             />
            {badge ? (
                <View style={styles.badgestyle}>
                  <Text style={styles.textstyle}>{badge}</Text>
                </View>
            ) : null}
        </View>
      )
    }
  },
  Buildlist:{
    screen:Buildlist,
    navigationOptions:{
      tabBarLabel:'建筑圈',
      inactiveTintColor: '#666', // 底部导航文字和图片默认颜色
      activeTintColor: '#32AAFD',
      tabBarIcon:(tintColor)=>( 
        <View>
              <Image 
                source={require('../public/img/首页-默认.png')}
                 />
                {badge ? (
                    <View style={styles.badgestyle}>
                      <Text style={styles.textstyle}>{badge}</Text>
                    </View>
                ) : null}
        </View>
      )
    }
  },
  Fworkdetail:{
    screen:Fworkdetail,
    navigationOptions:{
      tabBarLabel:'消息',
      tabBarIcon:({tintColor})=>(
        <View>
          <Image 
            source={require('../public/img/消息-默认.png')}
             />
            {badge ? (
                <View style={styles.badgestyle}>
                  <Text style={styles.textstyle}>{badge}</Text>
                </View>
            ) : null}
        </View>
      )
    }
  },
  Theproject:{
    screen:Theproject,
    navigationOptions:{
      tabBarLabel:'工程',
      tabBarIcon:({tintColor})=>(
        <View>
          <Image 
            source={require('../public/img/工程-默认.png')}
             />
            {badge ? (
                <View style={styles.badgestyle}>
                  <Text style={styles.textstyle}>{badge}</Text>
                </View>
            ) : null}
        </View>
      )
    }
  },
  Findworklist:{
    screen:Findworklist,
    navigationOptions:{
     
     abBarLabel:'我的',

      tabBarIcon:(tintColor)=>(
      <View>
          <Image 
            source={require('../public/img/招聘求职-默认.png')}
             />
            {badge ? (
                <View style={styles.badgestyle}>
                  <Text style={styles.textstyle}>{badge}</Text>
                </View>
            ) : null}
        </View>
      )
    }
  },

},
{
  tabBarPosition: 'bottom',// 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: false,//禁止页面左右滑动
  animationEnabled:false,

  tabBarOptions:{
    iconStyle:{width:50,height:50},
    inactiveTintColor: '#666', // 底部导航文字和图片默认颜色
    activeTintColor: '#32AAFD',//改变底部导航文字和图片选中的颜色
    showIcon: true,//android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: {height:0},//android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    labelStyle:{
      width:42,
      fontSize:14,
      marginTop:0,
      },//底部导航字体大小设置
    style:{
      height:54,
      backgroundColor:'#fff',
    },
    // transitionConfig:()=>({
    //   screenInterpolator:CardStackStyleInterpolator.forInitial,//页面跳转动画
    // })
  },
});

export default Tab ;



