import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Psubmit extends Component {
  constructor(props) {
    super(props); 
    main.init('Psubmit',this); 
    sco = this;
  }

  render() {


    
    return (
        <Container>
                  <HeadNav 
                  headerText='提交材料证明'
                />

          <View> 
            <View style={styles.submitContent}>
                  <View style={{height:110,width:170,marginBottom:125}}>
                    <Image  source={require('../public/img/uploadimg.png')} >
                      <View style={styles.imgChange}>
                        <Text style={{color:'#fff'}}>点击图片可重新加载</Text>
                      </View>
                    </Image>
                  </View>
                  <View>
                    <Text>注意事项</Text>
                    <Text style={{marginTop:5,marginBottom:5}}>1.保证清晰可辨认</Text>
                    <Text>2.您的材料仅用于认证身份，不会公开</Text>
                  </View>
              </View>
            <InputGroup style={[styles.ChangePhoneInput,styles.ChangePhoneInputOK,{backgroundColor:'#32AAFD',marginTop:35}]}>
                  <Text style={{color:'#fff'}} onPress={() => {sco.ShowSubmit(true)}}>提交</Text>
            </InputGroup>   
          </View>

          <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.submit}
             onRequestClose={() => {alert("")}}>
            <View style={styles.TalkContainer}>
              <View style={styles.IKonwn}>
                <Text style={styles.IKonwnTop}>认证材料上传成功</Text>
                <Text style={styles.IKonwnText}>您的认证材料已提交成功，我们会在3-5个工作日内完成审核，请耐心等待</Text>
                <View style={styles.IKonwnBotton}>
                 <Text style={styles.NewImgChoose} onPress={() => {sco.ShowSubmit(false)}}>我知道了</Text>
                </View>
              </View>
            </View>
        </Modal>
  
        </Container>

    )
  }
}

  