import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
let sco ={};
export default class Lrestpsdtwo extends Component {
  constructor(props) {
    super(props); 
    main.init('Lrestpsdtwo',this); 
    sco = this;
  }
  render() { 
    return (
      <View style={[styles.whitebackground,styles.fullheight]}>     
        <View style={styles.topreturnview}>
          <View>
            <TouchableOpacity onPress={() => sco.ysnav.navigate('Register')}>
                <Image style={styles.back} source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.whiteText,styles.toptitle]}>填写验证码</Text> 
        </View>
        <View style={styles.havesend}>
          <Text>验证码已发送至手机{sco.ysnav.state.params.data}</Text>
        </View>
        
        <View>
          {sco._vcodeInputView()}
       </View>

        <View style={styles.viewposition}>
          <TouchableOpacity disabled={sco.disable} onPress={() => {sco.comtime('com_editadd')}} >
            <View style={[styles.buttonview,sco.disable==true&&styles.unbuttonview]}> 
              <Text  style={[styles.nexttext,sco.disable==false&&styles.whiteText]}>下一步</Text> 
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.juzhong}>
          <TouchableOpacity onPress={() => {sco.start&&sco.starTime()}}> 
              <Text>重新获取验证码{sco.lastTime}</Text> 
          </TouchableOpacity>
        </View>
      </View>
    );
  }



};

  