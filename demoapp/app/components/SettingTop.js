import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,ListView,TouchableOpacity,Image}from 'react-native';
var Dimensions = require('Dimensions');
var {
    width,
    height
} = Dimensions.get('window');
import styles from '../js/css';


export default class NavButton extends Component {
 
  render() {    
          return (
             <Image source={require('../public/img/minebg.gif')} style={[styles.mysetbox,{width:width}]}>
               <Text style={{color:'#fff',fontSize:18}}>我的</Text>
               <View style={styles.myimgbox}>
                   <Image style={styles.myimg} source={require('../public/img/phone.png')}/>                 
               </View>
               <Text style={{color:'#fff',fontSize:15}}>TDA-12321</Text>
           </Image>             
       
        )
          
  }

}
