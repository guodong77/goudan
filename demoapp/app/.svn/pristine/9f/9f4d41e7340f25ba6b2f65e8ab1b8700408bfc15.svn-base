import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,Card,CardItem,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Weatherevent extends Component {
  constructor(props) {
    super(props); 
    main.init('Weatherevent',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
                <HeadNav 
                headerText='添加事件'
                headerRight='完成'
                fn={()=>{alert(1)}}
              />
        <Content>
          <Textarea  multiline={true}
              blurOnSubmit={true}
              returnKeyType ='done'
              placeholder="填写事件内容"
              placeholderTextColor='#CCCCCC'
              style={[styles.textarea,styles.textareaheight]}
              underlineColorAndroid="transparent" />
          <View style={[styles.worktimeRow,styles.whitebackground,styles.ph24,styles.pV26,styles.mt20]}>
            <Left>
              <Text style={styles.f15}>选择日期</Text>
            </Left>
            <Right>
              <View style={[styles.flexStart,styles.xjuzhong]}>
                <Text note style={styles.f15}>2017年09月20日</Text>
                <Image style={styles.morecss}  source={require('../public/img/more.png')} />
              </View>
            </Right>
          </View>
          <Button  block style={[styles.mh24,styles.unbuttonview,styles.viewposition]}>
            <Text  style={styles.nexttext}>完成</Text>
          </Button>
        </Content>
      </Container>
    );
  }


};

  