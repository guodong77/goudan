import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Lrestpsdthree extends Component {
  constructor(props) {
    super(props); 
    main.init('Lrestpsdthree',this); 
    sco = this;
  }
  render() { 
    return (
      <View style={[styles.whitebackground,styles.fullheight]}>
        <HeadNav 
            headerText='设置密码'
          
        />
        {/* <View style={styles.topreturnview}>
          <View>
            <TouchableOpacity onPress={Actions.Register}>
                <Image style={styles.back} source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.whiteText,styles.toptitle]}>设置密码</Text> 
        </View> */}

        <View style={styles.havesend}>
          <Text>密码可用于登录宇杉手机端和电脑端</Text>
        </View>

        <View style={[styles.pr,styles.mmborderBottom]}> 
          <View style={styles.wbk}>
              <Image style={styles.rM} source={require('../public/img/密码01.png')} />
          </View>
          <TextInput style={styles.input} 
          underlineColorAndroid='transparent' 
          secureTextEntry={sco.mimashow} 
          placeholder="请输入密码" 
          placeholderTextColor='white'
          onChangeText={(text) => sco.onChangeText(text)}
          />
          <View style={styles.juyou}>
            <TouchableOpacity onPress={() => sco.showMima()}>
            {
             sco.mimashow == false ? (
                <Image style={styles.rMeye} source={require('../public/img/眼睛04.png')}/>
              ) : (
                <Image style={styles.rMeye} source={require('../public/img/眼睛03.png')} />
              )
            }
            </TouchableOpacity>
          </View>
        </View>     
        <View style={styles.viewposition}>
          <TouchableOpacity disabled={sco.disable} onPress={Actions.Login} >
            <View style={[styles.buttonview,sco.disable==true&&styles.unbuttonview]}> 
              <Text  style={[styles.nexttext,sco.disable==false&&styles.whiteText]}>确定</Text> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



};

  