import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Lrestpsdone extends Component {
  constructor(props) {
    super(props); 
    main.init('Lrestpsdone',this); 
    sco = this;
  }
  render() { 
    return (
      <View style={[styles.whitebackground,styles.fullheight]}>
        <HeadNav 
            headerText='重置密码'
        />
        {/* <View style={styles.topreturnview}>
          <View>
            <TouchableOpacity onPress={Actions.pop}>
                <Image style={styles.back} source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.whiteText,styles.toptitle]}>重置密码</Text> 
        </View> */}
        <View style={[styles.pr,styles.mmborderBottom]}>
          <View style={styles.wbk}>
            <Image style={styles.rMphone} source={require('../public/img/icon-手机01.png')} />
          </View>
          <TextInput style={styles.input} 
          underlineColorAndroid='transparent' 
          placeholder="请输入手机号" 
          ref="textInput"
          value={sco.com_detail1.params.username}
            onChangeText={(val) => {sco.ysinput(sco,'com_detail1.params.username',val)}}
          />
          <View style={styles.juyou}>
                  {
                     sco.com_detail1.params.username == '' ? (
                          null
                      ) : (
                      <TouchableOpacity onPress={() => {sco.com_detail1.params.username='';sco.ysrun();}}>
                          <Image style={[styles.rM,styles.clearphone]} source={require('../public/img/icon-取消02.png')} />
                      </TouchableOpacity>
                      )
                  }
          </View>
        </View>
        <View style={styles.viewposition}>
          <TouchableOpacity  disabled={!fac.testphone(sco.com_detail1.params.username)} onPress={() => {sco.nextstep(sco)}}  >
            <View style={[styles.buttonview,!fac.testphone(sco.com_detail1.params.username)&&styles.unbuttonview]}> 
              <Text  style={[styles.nexttext,fac.testphone(sco.com_detail1.params.username)&&styles.whiteText]}>确定</Text> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



};

  