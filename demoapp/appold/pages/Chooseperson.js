import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,List,ListItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Chooseperson extends Component {
  constructor(props) {
    super(props); 
    main.init('Chooseperson',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.xjuzhong,styles.jsb]}>
          <TouchableOpacity  transparent onPress={() => sco.ysnav.goBack()}>
            <Text style={[styles.f16,styles.whiteText]}>取消</Text>
          </TouchableOpacity>
          <Title style={styles.addToptitle}>选择发送人</Title>
          <TouchableOpacity  transparent onPress={() => sco.ysnav.goBack()}>
            <Text style={[styles.f16,styles.whiteText]}>完成</Text>
          </TouchableOpacity>
        </Header>
        <Content style={styles.whitebackground}>
          <List> 
            <ListItem avatar>
              <Left>
                <Thumbnail style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={[styles.flexStart,styles.xjuzhong]}>
                <Image style={styles.yuanquan1}  source={require('../public/img/Oval2.png')} />
                <Text numberOfLines={1} note>王小花</Text>
              </Body>
            </ListItem> 
          </List> 
        </Content>
      </Container>
    );
  }


};

  