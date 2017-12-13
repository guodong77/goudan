import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
import { Actions } from 'react-native-router-flux';
export default class Addperson extends Component {
  constructor(props) {
    super(props); 
    main.init('Addperson',this); 
    sco = this;
  }
  render() { 
    const { navigate } = this.props.navigation;
    return (
      <View style={[styles.whitebackground,styles.fullheight]}>
         <HeadNav headerText='邀请人员'/>
        <View style={[styles.pr,styles.mmborderBottom]}>
          <TextInput style={styles.input} 
          underlineColorAndroid='transparent' 
          placeholder="请输入手机号" 
          ref="textInput"
          onChangeText={(text) => sco.onChangeText(text)}
          />
            {
               sco.show == false ? (
                    null
                ) : (
                <TouchableOpacity onPress={() => {sco.refs.textInput.clear()}}>
                    <Image style={[styles.rM,styles.clearphone]} source={require('../public/img/icon-取消02.png')} />
                </TouchableOpacity>
                )
            }
        </View>
        <View style={styles.viewposition}>
          <TouchableOpacity disabled={sco.disable} onPress={() => sco.ysnav.navigate('')} >
            <View style={[styles.buttonview,sco.disable==true&&styles.unbuttonview]}> 
              <Text  style={[styles.nexttext,sco.disable==false&&styles.whiteText]}>邀请好友</Text> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



};

  