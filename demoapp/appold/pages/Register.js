import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
let sco ={};
export default class Register extends Component {
  constructor(props) {
    super(props); 
    main.init('Register',this); 
    sco = this;
  }
  render() { 
    return (
      <Image source={require('../public/img/bg.png')} style={styles.backgroundImage}>
        <View style={styles.loginTop}>
          <Image source={require('../public/img/叉叉.png')} />
          <TouchableOpacity onPress={() => sco.ysnav.navigate('Login')}>
            <Text style={styles.whiteText}>登陆</Text>
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
            maxLength={11}
            ref="textInput"
            onChangeText={(val) => {sco.ysinput(sco,'com_editadd.params.username',val)}}//sco.onChangeText(text)
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
          <View style={styles.viewposition}>
            <TouchableOpacity disabled={sco.disable} onPress={() => {sco.comtime('com_editadd')}} >
              <View style={[styles.buttonview,sco.disable==true&&styles.opbuttonview]}> 
                <Text style={styles.logintext}>下一步</Text> 
              </View>
            </TouchableOpacity>
          </View>
          <Text style={[styles.f12,styles.wzjuzhong,styles.whiteText]}>点击下一步即代表您同意<Text style={styles.fwxy}>《服务协议》</Text> 和<Text style={styles.fwxy}>《隐私政策》</Text></Text>
        </View>

      </Image>      
    );
  }



};

  