import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
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
          <TouchableOpacity onPress={() => {Actions.pop}} >
              <Text style={styles.whiteText}>返回</Text>
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
            value={sco.com_detail1.params.username}
            onChangeText={(val) => {sco.ysinput(sco,'com_detail1.params.username',val)}}//sco.onChangeText(text)
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
          <View style={styles.viewposition}>
            <TouchableOpacity disabled={sco.com_detail1.params.username==''} onPress={() => {sco.nextstep(sco)}} >
              <View style={[styles.buttonview,sco.com_detail1.params.username==''&&styles.opbuttonview]}> 
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

  