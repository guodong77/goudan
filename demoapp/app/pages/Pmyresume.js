import React, { Component } from 'react';
import {AppRegistry,StyleSheet,View,Image,
  Modal,ImageBackground,FlatList,Platform,StatusBar,
  TouchableOpacity,ScrollView,TextInput,TouchableHighlight
}from 'react-native';
import {Container, Header, Content, Button,Icon,
  InputGroup,Input, Right, Footer, Title,
  Card,CardItem,
  Left,Body,Text,Subtitle
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
let avatar = require('../public/img/Avatar.png');
export default class Pmyresume extends Component {
  constructor(props) {
    super(props); 
    main.init('Pmyresume',this); 
    sco = this;
  }


  render() {

    return (
  <Container style={styles.container}>
       <HeadNav headerText='我的简历'/>

        <Content>
          <View style={styles.ResumeMsg}>

            <View style={styles.Myresume}>
              <Image style={{marginRight:10,marginTop:-30,width:20,height:20}} 
              source={{uri:sco.firstimg(sco.com_detail.data.headimg)}}/>
              <View style={styles.PersonalCardText}>
                <Text style={{color:'#333',fontSize:18,marginBottom:5}}>王小明</Text>
                <Text>职位：深圳宇杉科技有限公司xx</Text>
                <Text>电话：123344545</Text>
                <Text>邮箱：wwqjqerrq@163.com</Text>
              </View>
              <TouchableHighlight onPress={() => {navigate('Pinfo', {name: 'Brent'})}}>
                <View>
                  <Image source={require('../public/img/next.png')}/>
                </View>
              </TouchableHighlight>
            </View>

          </View> 
                              
          <View style={[styles.MyresumeMiddle,styles.MB]}>
            <View style={[styles.PersonalCardMsg,styles.MyresumeMiddleMsg]}>
              <Text style={styles.MyresumeFS}>附件简历</Text>
              <View>
                <Text style={{fontSize:17}}>（请到电脑端上传）暂无</Text>
              </View>
            </View>

            <TouchableHighlight onPress={() => {Actions.Pevaluate({name: 'Brent'})}}>
              <View style={styles.MyresumeMiddleMsg}>
                <Text style={styles.MyresumeFS}>自我评价</Text>
                <View>
                  <Image source={require('../public/img/next.png')}/>
                </View>
              </View>
            </TouchableHighlight>
          </View>

          <View style={[styles.MyresumeMiddle,{marginTop:10,}]}> 
            <TouchableHighlight onPress={() => {Actions.Pevaluate({name: 'Brent'})}}>
              <View style={styles.MyresumeMiddleMsg}>
                <Text style={styles.MyresumeFS}>求职意向列表项</Text>
                <View>
                  <Image source={require('../public/img/next.png')}/>
                </View>
              </View>
            </TouchableHighlight>  

            <Button full style={styles.MyresumeButton} onPress={() => {Actions.Pwantwork({name: 'Brent'})}}>
              <Text style={styles.MyresumeText}>+求职意向</Text>
            </Button> 
          </View>

          <View style={[styles.MyresumeMiddle,{marginTop:10,}]}> 
            <TouchableHighlight onPress={() => {Actions.Pevaluate({name: 'Brent'})}}>
              <View style={styles.MyresumeMiddleMsg}>
                <Text style={styles.MyresumeFS}>工作经验列表项</Text>
                <View>
                  <Image source={require('../public/img/next.png')}/>
                </View>
              </View>
            </TouchableHighlight>   

            <Button full style={styles.MyresumeButton} onPress={() => {Actions.Pworktime({name: 'Brent'})}}>
              <Text style={styles.MyresumeText}>+工作经验</Text>
            </Button>
          </View>
                                      
          <View style={[styles.MyresumeMiddle,{marginTop:10,}]}> 
            <TouchableHighlight onPress={() => {Actions.Pevaluate({name: 'Brent'})}}>
              <View style={styles.MyresumeMiddleMsg}>
                <Text style={styles.MyresumeFS}>教育经验列表项</Text>
                <View>
                  <Image source={require('../public/img/next.png')}/>
                </View>
              </View>
            </TouchableHighlight>   

            <Button full style={styles.MyresumeButton} onPress={() => {Actions.Pstudytim( {name: 'Brent'})}}>
              <Text style={styles.MyresumeText}>+教育经验</Text>
            </Button>
          </View>
        </Content>
      </Container>






    )
  }
}

  