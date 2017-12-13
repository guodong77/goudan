import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
let sco ={};
export default class Login extends Component {
  constructor(props) {
    super(props); 
    main.init('Login',this); 
    sco = this;
  }
  render() { 
    return (
      <Image source={require('../public/img/bg.png')} style={styles.backgroundImage}>
        <View style={styles.loginTop}>
          <Image source={require('../public/img/叉叉.png')} />
          <TouchableOpacity onPress={() => sco.ysnav.navigate('Register')} >
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
                ref="textInput"
                maxLength={11}
                onChangeText={(val) => {sco.ysinput(sco,'com_editadd.params.username',val)}}
                />

                <View style={styles.juyou}>
                  {
                     sco.show == false ? (
                          null
                      ) : (
                      <TouchableOpacity onPress={() => {sco.ChangeText()}}>
                          <Image style={[styles.rM,styles.clearphone]} source={require('../public/img/icon-取消.png')} />
                      </TouchableOpacity>
                      )
                  }
                </View>
              </View>

              <View style={styles.pr}> 
                <View style={styles.wbk}>
                  <Image style={styles.rM} source={require('../public/img/密码.png')} />
                </View>
                <TextInput style={[styles.input,styles.whiteText]} 
                underlineColorAndroid='transparent' 
                secureTextEntry={sco.mimashow} 
                placeholder="请输入密码" 
                placeholderTextColor='white'
                onChangeText={(val) => {sco.ysinput(sco,'com_editadd.params.password',val)}}
                />
                  <View style={styles.juyou}>
                    <TouchableOpacity onPress={() => sco.showMima()}>
                    {
                     sco.mimashow == false ? (
                        <Image style={styles.rMeye} source={require('../public/img/眼睛02.png')}/>
                      ) : (
                        <Image style={styles.rMeye} source={require('../public/img/眼睛.png')} />
                      )
                    }
                    </TouchableOpacity>
                  </View>
                </View>     
            <View style={styles.bottomrightbtnview}> 
              <TouchableOpacity onPress={() => sco.ysnav.navigate('Lrestpsdone')}>
                <Text style={styles.forget}>
                  忘记密码?
                </Text> 
              </TouchableOpacity>
            </View>
            <View style={styles.viewposition}>
              <TouchableOpacity onPress={() => sco.comtime('com_editadd')}>
                <View style={styles.buttonview}> 
                  <Text style={styles.logintext}>登 录</Text> 
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.juzhong}>
              <TouchableOpacity onPress={() => sco.ysnav.navigate('Loginphone')}>
                <Text style={[styles.whiteText,styles.f16]}>短信快捷登录</Text>
              </TouchableOpacity> 
            </View>
          </View>
        <View style={[styles.juzhong,styles.loadway]}> 
          <Text style={[styles.whiteText,styles.f14]}>其他方式登录</Text> 
          <View style={styles.otherway}>
            <Image style={[styles.way,styles.setWidth]} source={require('../public/img/icon-QQ.png')} />
            <Image style={styles.setWidth} source={require('../public/img/icon-wechat.png')} />
          </View>
        </View>
        <KeyboardSpacer /> 
      </Image>      
    );
  }



};

  