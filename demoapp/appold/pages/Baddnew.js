import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';


let sco = {}
export default class Baddnew extends Component {
  constructor(props) {
    super(props); 
    main.init('Baddnew',this); 
    sco = this;
    sco.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    sco.setState({modalVisible: visible});
  }

  render() {
    const { navigate } =sco.props.navigation;
    return (
      <View style={styles.NewContent}>
        <View style={styles.BuildTop}>
            <Text style={styles.NewTopText} onPress={() => {navigate('Buildlist', {name: 'Brent'})}}>取消</Text>
            <Text style={[styles.NewTopText,styles.NewTopSend]}>发布动态</Text>
            <Text style={styles.NewTopText}>发布</Text>
        </View> 
        <TextInput style={styles.NewText} multiline={true} placeholder='说点什么和大家分享吧...' underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'/>
       
        <TouchableHighlight onPress={() => {sco.setModalVisible(true)}} >
          <Image style={styles.NewImg} source={require('../public/img/加号.png')} />
        </TouchableHighlight>

         <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.state.modalVisible}
             onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={[styles.TalkContainer,styles.NewImgBody]}>
              <View style={styles.NewImgContainer}>
                <Text style={[styles.NewImgChoose,styles.NewImgPhoto]}>拍照</Text>
                <Text style={styles.NewImgChoose}>从手机相册选择</Text>
              </View>
              <View style={styles.NewImgContainer}>
                 <Text style={styles.NewImgChoose} onPress={() => {sco.setModalVisible(!sco.state.modalVisible)}}>取消</Text>
              </View>
            </View>
        </Modal>

      
      </View>
    )
  }
}

  