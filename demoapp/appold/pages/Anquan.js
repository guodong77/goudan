import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};

export default class Anquan extends Component {
  constructor(props) {
    super(props); 
    main.init('Anquan',this); 
    sco = this;
  }

  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity  transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>安全资料</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content style={styles.whitebackground}>
          <View style={[styles.marginato,styles.loadway]}>
            <Image  source={require('../public/img/none.png')} />
          </View>
        </Content>
      </Container>
    );
  }


};

  