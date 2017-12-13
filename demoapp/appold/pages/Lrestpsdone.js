import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
let sco ={};
export default class Lrestpsdone extends Component {
  constructor(props) {
    super(props); 
    main.init('Lrestpsdone',this); 
    sco = this;
  }
  render() { 
    return (
      <View style={[styles.whitebackground,styles.fullheight]}>
        <View style={styles.topreturnview}>
          <View>
            <TouchableOpacity onPress={() => sco.ysnav.navigate('Login')}>
                <Image style={styles.back} source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.whiteText,styles.toptitle]}>重置密码</Text> 
        </View>
        <View style={[styles.pr,styles.mmborderBottom]}>
          <View style={styles.wbk}>
            <Image style={styles.rMphone} source={require('../public/img/icon-手机01.png')} />
          </View>
          <TextInput style={styles.input} 
          underlineColorAndroid='transparent' 
          placeholder="请输入手机号" 
          ref="textInput"
          onChangeText={(text) => sco.onChangeText(text)}
          />
          <View style={styles.juyou}>
                  {
                     sco.show == false ? (
                          null
                      ) : (
                      <TouchableOpacity onPress={() => {sco.ChangeText()}}>
                          <Image style={[styles.rM,styles.clearphone]} source={require('../public/img/icon-取消02.png')} />
                      </TouchableOpacity>
                      )
                  }
          </View>
        </View>
        <View style={styles.viewposition}>
          <TouchableOpacity disabled={sco.disable} onPress={() => sco.ysnav.navigate('Lrestpsdtwo')} >
            <View style={[styles.buttonview,sco.disable==true&&styles.unbuttonview]}> 
              <Text  style={[styles.nexttext,sco.disable==false&&styles.whiteText]}>确定</Text> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



};

  