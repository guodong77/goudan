import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Validate extends Component {
  constructor(props) {
    super(props); 
    main.init('Validate',this); 
    sco = this;
  }
  render() { 
    return (
      <View style={[styles.whitebackground,styles.fullheight]}>
        
        <View style={styles.topreturnview}>
        <HeadNav 
        headerText='填写验证码'
      />
        <View style={styles.havesend}>
          <Text>验证码已发送至手机13011111111</Text>
        </View>
        
        <View>
          {sco._vcodeInputView()}
       </View>

        <View style={styles.viewposition}>
          <TouchableOpacity disabled={sco.disable} onPress={Actions.Password} >
            <View style={[styles.buttonview,sco.disable==true&&styles.unbuttonview]}> 
              <Text  style={[styles.nexttext,sco.disable==false&&styles.whiteText]}>下一步</Text> 
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.juzhong}>
          <TouchableOpacity> 
              <Text>重新获取验证码(59s)</Text> 
          </TouchableOpacity>
        </View>
      </View>
    );
  }



};

  