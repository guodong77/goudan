import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,
  Body,Left,Title,Right,List,ListItem,Thumbnail,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,Modal}from 'react-native';
let sco ={};
export default class Pworkmanage extends Component {
  constructor(props) {
    super(props); 
    main.init('Pworkmanage',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container style={styles.whitebackground}>
        <Header hasSubtitle style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>招聘管理</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <List>
            <ListItem style={[styles.listitemcss,styles.borderBottom]} botton onPress={() =>sco.ysnav.navigate('Fworkedit')}>
              <Body>
                <Text style={styles.bword}>[地区]职位</Text>
                <Text note style={[styles.f12,styles.mt15]}>薪资  行业</Text>
              </Body>
              <Right>
                <Image  source={require('../public/img/more.png')} />
              </Right>
            </ListItem>
            
            <ListItem style={[styles.listitemcss,styles.borderBottom]} botton onPress={() =>sco.ysnav.navigate('Fworkedit')}>
              <Body>
                <Text style={styles.bword}>[深圳]资料员</Text>
                <Text note style={[styles.f12,styles.mt15]}>5-6k  建筑</Text>
              </Body>
              <Right>
                <Image  source={require('../public/img/more.png')} />
              </Right>
            </ListItem>
          </List>   
        </Content>
        <View style={styles.ph24}>
          <Button block info style={[styles.hdtcard,styles.mb20]} onPress={() =>sco.ysnav.navigate('Faddwork')}>
            <Text style={styles.f16}>添加职位</Text>
          </Button>
        </View>  
      </Container>
    );
  }


};

  