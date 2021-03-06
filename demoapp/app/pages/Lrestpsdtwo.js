import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Lrestpsdtwo extends Component {
  constructor(props) {
    super(props); 
    main.init('Lrestpsdtwo',this); 
    sco = this;
  }

      // 验证码输入框
      _vcodeInputView() { 
          let inputs = [];
          let lengt = 4;
          for (let i = 0; i < lengt; i++) {
          inputs.push(
              <View style={styles.vcodeitem} key={'vcodeInput' + i} square>
                  <Text style={styles.vcodeitemtext}>{sco.com_detail1.params.code.substr(i,1)}</Text>    
              </View>
              )
          };
          return  <View style={styles.vcodeinp}>
          <TextInput style={{position:'absolute',opacity:0,width:240,height:55,borderWidth:1,
        borderColor:'red','zIndex':10 }} 
          autoFocus={true} keyboardType="number-pad" keyboardAppearance="light" 
              onChangeText={(text) =>{sco.ysinput(sco,'com_detail1.params.code',text)}}
              maxLength={4} />  
            {inputs}
            </View>
      }

 


  render() { 
    return (
      <View style={[styles.whitebackground,styles.fullheight]}>  
        <HeadNav 
            headerText='填写验证码'
        />
        {/*<View style={styles.topreturnview}>
           <View>
            <TouchableOpacity onPress={Actions.pop} >
                <Image style={styles.back} source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.whiteText,styles.toptitle]}>填写验证码</Text> 
        </View> */}
        <View style={styles.havesend}>
          <Text>验证码已发送至手机{sco.com_detail1.params.username}</Text>
        </View>
        
        <View>
          {this._vcodeInputView()}
       </View>

        <View style={styles.viewposition}>
          <TouchableOpacity disabled={sco.com_detail1.params.code.length!=4} onPress={() => {sco.comtime('com_detail')}} >
            <View style={[styles.buttonview,sco.com_detail1.params.code.length!=4&&styles.unbuttonview]}> 
              <Text  style={[styles.nexttext,sco.com_detail1.params.code.length==4&&styles.whiteText]}>下一步</Text> 
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.juzhong}>
          <TouchableOpacity disabled={sco.com_detail1.params.sta==0} onPress={() => {sco.comtime('com_detail1')}}> 
              <Text>{sco.com_detail1.params.sec}</Text> 
          </TouchableOpacity>
        </View>
      </View>
    );
  }



};

  