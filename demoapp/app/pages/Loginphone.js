import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Loginphone extends Component {
  constructor(props) {
    super(props); 
    main.init('Loginphone',this); 
    sco = this;
  }
  render() { 
    return (
     <Image source={require('../public/img/bg.png')} style={styles.backgroundImage}>
        <View style={styles.loginTop}>
          <TouchableOpacity onPress={Actions.pop} >
              <Text style={styles.whiteText}>返回</Text>
          </TouchableOpacity>
          {/*<Image source={require('../public/img/叉叉.png')} />*/}
          <TouchableOpacity onPress={Actions.Register} >
              <Text style={styles.whiteText}>注册</Text>
          </TouchableOpacity>
        </View>   
        <Text style={styles.jzq}>
          建筑圈
        </Text> 
        
          <View>
              <View style={styles.pr}>
                <View style={styles.wbk}>
                  <Image style={styles.rMphone} source={require('../public/img/icon-手机.png')} />
                </View>
                <TextInput style={[styles.input,styles.whiteText]} 
                underlineColorAndroid='transparent' 
                placeholder="请输入手机号" 
                placeholderTextColor='white' 
                value={sco.com_detail1.params.username}
                onChangeText={(text) =>{sco.ysinput(sco,'com_detail1.params.username',text)}}
                ref="textInput" 
                />
                      <View style={styles.juyou}>
                     {
                     sco.com_detail1.params.username == '' ? (
                          null
                      ) : (
                      <TouchableOpacity onPress={() => {sco.com_detail1.params.username='';sco.ysrun();}}>
                          <Image style={[styles.rM,styles.clearphone]} source={require('../public/img/icon-取消.png')} />
                      </TouchableOpacity>
                      )
                  }
                      </View>
              </View>
              <View style={styles.pr}> 
                <View style={styles.wbk}>
                  <Image style={styles.rMphone} source={require('../public/img/icon-phonecode.png')} />
                </View>
                <TextInput value={sco.code} style={[styles.input,styles.whiteText]}
                 underlineColorAndroid='transparent'
                 placeholder="短信验证码"
                 value={sco.com_detail.params.code}
                 onChangeText={(text) =>{sco.ysinput(sco,'com_detail.params.code',text)}}
                 placeholderTextColor='white'/> 
                  <View>
                    {
                     sco.com_detail1.params.sta == 1 ? (
                       <TouchableOpacity onPress={() => {sco.comtime('com_detail1')}}>
                        <Text style={[styles.whiteText,styles.f16]} >{sco.com_detail1.params.sec}</Text>
                         </TouchableOpacity>
                      ) : (
                        <Text style={[styles.whiteText,styles.f16]}>{sco.com_detail1.params.sec}</Text>
                      )
                    }
                  </View>
               
              </View>   
            <View style={styles.bottomrightbtnview}> 
            <TouchableOpacity onPress={Actions.Lrestpsdone}>
                <Text style={styles.forget}>
                  忘记密码?
                </Text> 
              </TouchableOpacity>
            </View>
            <View style={styles.viewposition}>
              <TouchableOpacity  onPress={()=>sco.comtime('com_detail')}>
                <View style={styles.buttonview}> 
                  <Text style={styles.logintext}>登 录</Text> 
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.juzhong}>
            <TouchableOpacity onPress={Actions.Login}>
                <Text style={[styles.whiteText,styles.f16]}>密码登录</Text> 
              </TouchableOpacity> 
            </View>
          </View>
        <View style={[styles.juzhong,styles.loadway]}> 
          <Text style={[styles.whiteText,styles.f14]}>其他方式登录</Text> 
          <View style={styles.otherway}>
            <TouchableOpacity onPress={Actions.Login}>
               <Image style={[styles.way,styles.setWidth]} source={require('../public/img/icon-QQ.png')} />
              </TouchableOpacity> 
            <TouchableOpacity onPress={Actions.Login}>
               <Image style={styles.setWidth} source={require('../public/img/icon-wechat.png')} />
              </TouchableOpacity> 
           
          </View>
        </View>
      </Image>      
    );
  }



};

  