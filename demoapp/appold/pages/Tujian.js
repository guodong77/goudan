import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};

export default class Tujian extends Component {
  constructor(props) {
    super(props); 
    main.init('Tujian',this);  
    sco = this;
  }

  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <Button  transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </Button>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>土建资料</Title>
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

  