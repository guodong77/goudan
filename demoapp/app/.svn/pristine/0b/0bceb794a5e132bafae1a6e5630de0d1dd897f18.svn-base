import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Comsearch extends Component {
  constructor(props) {
    super(props); 
    main.init('Comsearch',this); 
    sco = this;
  }

  render() {
    return (
      <View style={styles.NewContent}>
        <View style={[styles.BuildTop,{height:44,}]}>
            <Image style={styles.SearchImg} source={require('../public/img/icon-搜索.png')} />
            <TextInput style={styles.SearchInput} placeholder='搜索' underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'>
            </TextInput>
            <Text style={styles.NewTopText} onPress={Actions.pop}>取消</Text>
        </View> 

        <View style={styles.searchContainer}>
          <View style={styles.searchTitle}>
            <View style={styles.line}></View>
            <Text style={styles.lineText}>在这里可以搜到</Text>
            <View style={styles.line}></View>
          </View>
        </View>

        <View>
          <View style={styles.searchChoose}>
            <View style={styles.searchType}>
              <Image source={require('../public/img/dongtai.png')} />
              <Image source={require('../public/img/wenda.png')} />
              <Image source={require('../public/img/xuqiu.png')} />
            </View>
            
            <View style={[styles.searchType,styles.searchTypeText1]}>
              <Text>动态</Text>
              <Text>问答</Text>
              <Text>需求</Text>
            </View>

            <View style={[styles.searchType,styles.searchTypeImg]}>
              <Image source={require('../public/img/xiangmu.png')} />
              <Image source={require('../public/img/zhiwei.png')} />
              <Image source={require('../public/img/zhaoren.png')} />
            </View>
            
            <View style={[styles.searchType,styles.searchTypeText2]}>
              <Text>工程项目</Text>
              <Text style={styles.searchTypeJob}>职位</Text>
              <Text>找人</Text>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

  