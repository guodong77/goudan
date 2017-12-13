import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Pworktime extends Component {
  constructor(props) {
    super(props); 
    main.init('Pworktime',this); 
    sco = this;
  }


  render() { 
    return (
       <Container>
                   <HeadNav 
                   headerText='求职意向'
                 />
          <View style={styles.workBg}>

            <View style={styles.work}>
                                <Text style={styles.MyresumeFS}>公司</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workMsg]}>
                                <Text style={styles.MyresumeFS}>职位</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workMsg]}>
                                <Text style={styles.MyresumeFS}>开始时间</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workMsg]}>
                                <Text style={styles.MyresumeFS}>结束时间</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workDescipt]}>
                                <Text>经历描述</Text>
            </View>

            <TextInput style={styles.HelpAsk} onFocus={sco.ShowPlaceholder} multiline={true} underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'
            />
            {sco.SC.placeholder?
            <View style={styles.placeholder}>
              <View>
                <Text style={styles.workContent}>【工作职责】</Text>
                <Text style={styles.workContent}>简要描述您在岗位的工作内容或职责范围</Text>
              </View>
              <View>
                <Text style={[styles.workContent,styles.workply]}>【项目经历及业绩】</Text>
                <Text style={styles.workContent}>简要描述您在岗位的项目经历以及获得的成绩等</Text>
              </View>
            </View>:null
            }
                      <Button block info style={{backgroundColor:sco.SC.backgroundColor,
                                                  borderRadius:5,
                                                  margin:10,
                                                  position:'absolute',
                                                  width:360,
                                                  top:400}}>
                        <Text style={{color:sco.SC.color,fontSize:14}}>保存</Text>
                      </Button>
          </View>
        </Container>
    )
  }
}

  