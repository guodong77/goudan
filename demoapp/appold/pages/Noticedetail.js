import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,Card,CardItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Noticedetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Noticedetail',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>通知详情</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content style={styles.whitebackground}>
          <Card style={styles.mb}>
            <CardItem header>
              <Text style={styles.f18}>标题标题标题标题</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text note style={styles.f16}>
                  内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                  内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                  内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                  内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                  内容内容
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }


};

  