import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,Button,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';



let sco = {}
export default class Baddneed extends Component {
  constructor(props) {
    super(props); 
    main.init('Baddneed',this); 
    sco = this;
    sco.state = {modalVisible: false};
  }

  render() {
    const { navigate } =sco.props.navigation;
    return (
      <View style={styles.NewContent}>
        <View style={styles.BuildTop}>
            <Text style={styles.NewTopText} onPress={() => {navigate('Buildlist', {name: 'Brent'})}}>取消</Text>
            <Text style={[styles.NewTopText,styles.NewTopSend]}>发布需求</Text>
            <Text style={styles.NewTopText}>发布</Text>
        </View> 
        <TextInput style={[styles.NewText,styles.NeedText]} multiline={true} placeholder='请输入您的需求' underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'/>
        <View style={styles.NeedTags}>
          <View  style={styles.NeedTag}><Text style={[styles.NeedTagText,styles.NeedTagActive]}>推广需求</Text></View>
          <View  style={styles.NeedTag}><Text style={styles.NeedTagText}>推广需求</Text></View>
          <View  style={styles.NeedTag}><Text style={styles.NeedTagText}>推广需求</Text></View>
        </View>
        <View style={styles.NeedTags}>
          <View  style={styles.NeedTag}><Text style={styles.NeedTagText}>推广需求</Text></View>
          <View  style={styles.NeedTag}><Text style={styles.NeedTagText}>推广需求</Text></View>
          <View  style={[styles.NeedTag,styles.NeedAddTag]}><Text style={[styles.NeedTagText,styles.NeedTagAddActive]}>添加标签</Text></View>
        </View>
      </View>
    )
  }
}


  