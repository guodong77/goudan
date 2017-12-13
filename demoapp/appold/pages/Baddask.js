import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';



let sco = {}
export default class Baddask extends Component {
  constructor(props) {
    super(props); 
    main.init('Baddask',this); 
    sco = this;
    sco.state = {modalVisible: false};
  }

  render() {
    const { navigate } =sco.props.navigation;
    return (
      <View style={styles.NewContent}>
        <View style={styles.BuildTop}>
            <Text style={styles.NewTopText} onPress={() => {navigate('Buildlist', {name: 'Brent'})}}>取消</Text>
            <Text style={[styles.NewTopText,styles.NewTopSend]}>发布问答</Text>
            <Text style={styles.NewTopText}>发布</Text>
        </View> 
        <View style={styles.AskTitle}>
          <TextInput style={[styles.NewText,styles.AskTitleInput]} underlineColorAndroid="transparent" placeholderTextColor ='#cccccc' placeholder='请输入问题的标题'/>
          <Text>0/30</Text>
        </View>
        <TextInput style={styles.HelpAsk} multiline={true} placeholder='请输入问题相关描述信息' underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'/>
        <Image style={styles.NewImg} source={require('../public/img/加号.png')} />
      </View>
    )
  }
}

  