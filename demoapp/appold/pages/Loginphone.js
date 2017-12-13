import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,KeyboardAvoidingView,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
let sco ={};
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
                value={sco.value}
                ref="textInput"
                onChangeText={(text) => sco.onChangeText(text)}
                />
                      <View style={styles.juyou}>
                        {
                           sco.show == false ? (
                                null
                            ) : (
                            <TouchableOpacity onPress={() => {sco.refs.textInput.clear()}}>
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
                <TextInput value={sco.code} style={[styles.input,styles.whiteText]} underlineColorAndroid='transparent'  placeholder="请输入手机验证码" placeholderTextColor='white'/>
                <TouchableOpacity onPress={() => {sco.comtime('com_editadd')}}>
                  <View>
                    {
                     sco.mimashow == true ? (
                        <Text style={[styles.whiteText,styles.f16]} >获取验证码</Text>
                      ) : (
                        <Text style={[styles.whiteText,styles.f16]}>重新获取</Text>
                      )
                    }
                  </View>
                </TouchableOpacity>
              </View>   
            <View style={styles.bottomrightbtnview}> 
              <TouchableOpacity onPress={() => sco.ysnav.navigate('Lrestpsdone')}>
                <Text style={styles.forget}>
                  忘记密码?
                </Text> 
              </TouchableOpacity>
            </View>
            <KeyboardAvoidingView style={styles.viewposition}>
              <TouchableOpacity>
                <View style={styles.buttonview}> 
                  <Text style={styles.logintext}>登 录</Text> 
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.juzhong}>
              <TouchableOpacity onPress={() => sco.comtime('com_editadd')}>
                <Text style={[styles.whiteText,styles.f16]}>密码登录</Text> 
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
      </Image>      
    );
  }



};

  