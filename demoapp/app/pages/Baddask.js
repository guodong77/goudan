import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';

let sco = {}
export default class Baddask extends Component {
  constructor(props) {
    super(props); 
    main.init('Baddask',this); 
    sco = this;
    sco.state = {modalVisible: false};
  }

  render() {
    return (
      <View style={styles.NewContent}>
       <HeadNav
            headerText='发布问答'
            headerRight='发布'
            fn={()=>{sco.comtime('com_list');sco.com_detail.params.content='';sco.com_detail.params.content_desc=''}}
          />
        <View style={styles.AskTitle}>
          <TextInput 
          style={[styles.NewText,styles.AskTitleInput]} 
          underlineColorAndroid="transparent" 
          placeholderTextColor ='#cccccc' 
          placeholder='请输入问题的标题'
          value={sco.com_detail.params.content}
          onChangeText={(text) =>{sco.ysinput(sco,'com_list.params.content',text)}}
          />
          <Text>0/30</Text>
        </View>
        <TextInput 
        style={styles.HelpAsk} 
        multiline={true} 
        placeholder='请输入问题相关描述信息' 
        underlineColorAndroid="transparent" 
        placeholderTextColor ='#cccccc'
        value={sco.com_detail.params.content_desc}
        onChangeText={(text) =>{sco.ysinput(sco,'com_list.params.content_desc',text)}}
        />
        <Image style={styles.NewImg} source={require('../public/img/加号.png')} />
      </View>
    )
  }
}

  