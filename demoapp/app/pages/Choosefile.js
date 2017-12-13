import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,List,ListItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Choosefile extends Component {
  constructor(props) {
    super(props); 
    main.init('Choosefile',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.xjuzhong,styles.jsb]}>
          <TouchableOpacity transparent onPress={Actions.pop}>
            <Text style={[styles.f16,styles.whiteText]}>全选</Text>
          </TouchableOpacity>
          <Title style={styles.addToptitle}>选择文件</Title>
          <TouchableOpacity transparent onPress={Actions.pop}>
            <Text style={[styles.f16,styles.whiteText]}>取消</Text>
          </TouchableOpacity>
        </Header>
        <Content style={styles.whitebackground}>
          <List> 
            <ListItem avatar>
              <Left style={styles.xjuzhong}>
                <Thumbnail style={[styles.yuanquan,styles.yuanquanpos]} source={require('../public/img/Group.png')} />
                <Image style={styles.listimg} source={require('../public/img/wenjianjia.png')}/>
              </Left>
              <Body>
                <Text>   
                  文件夹
                </Text>
              </Body>
            </ListItem> 

            <ListItem avatar>
              <Left style={styles.xjuzhong}>
                <Thumbnail style={[styles.yuanquan,styles.yuanquanpos]} source={require('../public/img/yuan1.png')} />
                <Image style={styles.listimg} source={require('../public/img/tupian.png')}/> 
              </Left>
              <Body>
                <Text>   
                  文件夹
                </Text>
              </Body>
            </ListItem> 
          </List> 
        </Content>
      </Container>
    );
  }


};

  