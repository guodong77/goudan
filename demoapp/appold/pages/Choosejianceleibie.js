import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,List,ListItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
let sco ={};
export default class Choosejianceleibie extends Component {
  constructor(props) {
    super(props); 
    main.init('Choosejianceleibie',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.worktimeRow,styles.xjuzhong]}>
          <View>
            <TouchableOpacity transparent onPress={() =>sco.ysnav.goBack()}>
              <Text style={[styles.f16,styles.whiteText]}>取消</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleposition}>
            <Title style={styles.addToptitle}>选择检测类别</Title>
          </View>
          <View>
            <TouchableOpacity  transparent onPress={() => sco.ysnav.goBack()}>
              <Text style={[styles.f16,styles.whiteText]}>完成</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <Content style={styles.whitebackground}>
          <List> 
            <ListItem avatar>
              <Left>
                <Image style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={styles.borderBottom}>
                <Text numberOfLines={1} note>重量偏差</Text>
              </Body>
            </ListItem> 
            <ListItem avatar>
              <Left>
                <Image style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={styles.borderBottom}>
                <Text numberOfLines={1} note>重量偏差</Text>
              </Body>
            </ListItem> 
            <ListItem avatar>
              <Left>
                <Image style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={styles.borderBottom}>
                <Text numberOfLines={1} note>重量偏差</Text>
              </Body>
            </ListItem> 
          </List> 
        </Content>
      </Container>
    );
  }


};

  