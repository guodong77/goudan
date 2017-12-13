import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,ListView,TouchableOpacity,Image}from 'react-native';

import styles from '../js/css';


export default class NavButton extends Component {
 
  render() { 
    
          return (
            <View style={styles.navBtnStyle}>
                <View>   
                    <TouchableOpacity  onPress={()=>{}} style={styles.btntab}>                  
                        {<Image source={require('../public/img/slocation.png')} style={styles.btnimg} />}
                        <Text style={[styles.btntext,{color:'#1dc6d4'}]}>定位</Text>
                    </TouchableOpacity>
                </View>
                <View>   
                    <TouchableOpacity  onPress={() => ysnav.navigate('MassagePage', {parent:sco})} style={styles.btntab}>                  
                        {<Image source={require('../public/img/message.png')} style={styles.btnimg} />}
                        <Text style={styles.btntext}>消息</Text>
                    </TouchableOpacity>
                </View>
                <View>   
                    <TouchableOpacity  onPress={() => ysnav.navigate('HistoryRodePage', {parent:sco})} style={styles.btntab}>                  
                        {<Image source={require('../public/img/route.png')} style={styles.btnimg} />}
                        <Text style={styles.btntext}>定位</Text>
                    </TouchableOpacity>
                </View>    
                <View>   
                    <TouchableOpacity  onPress={() => ysnav.navigate('MinePage', {parent:sco})} style={styles.btntab}>                  
                        {<Image source={require('../public/img/mine.png')} style={styles.btnimg} />}
                        <Text style={styles.btntext}>定位</Text>
                    </TouchableOpacity>
                </View>            
               
              
              
            </View>
        )
          
  }

}
