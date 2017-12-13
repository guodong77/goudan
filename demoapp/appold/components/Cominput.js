import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,ListView,TouchableOpacity,Image,TextInput}from 'react-native';


let sco = {};
export default class Cominput extends Component {
  
   constructor(props) { 
    super(props);    
    main.ctrl(this.constructor.name,this); 
    parent = this.props.parent||{}; 
    inputkey = this.props.inputkey;
    inputval = this.props.inputval;
    sco = this;   
  }
  render() {   
  console.log(sco) 
          return (
            <View style={styles.tipBorder2}>
                <TextInput style={[styles.textInput3,{fontSize:14}]}
                           onChangeText={(val)=>{parent.ysinput(parent,inputkey,val)}}
                           underlineColorAndroid = {'transparent'}
                           placeholderTextColor="#c8c8c8"
                           placeholder="请输入11位手机号码"
                           defaultValue={inputval}
                           maxLength={11}/>
            </View>  
       
        )
          
  }

}
