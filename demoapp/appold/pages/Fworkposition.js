import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,
  Body,Left,Title,Right,Card,CardItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,Modal}from 'react-native';
let sco ={};
export default class Fworkposition extends Component {
  constructor(props) {
    super(props); 
    main.init('Fworkposition',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container style={styles.whitebackground}>
        <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity  transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>工作地点</Title>
          </Body>
          <Right/>
            
        </Header>

        <Content>
          <View >
          <Text note>地图</Text>
          </View>
          <View style={styles.ph24}>
            <View style={styles.pV26}>
              <View style={[styles.flexStart,styles.xjuzhong]}>
                <Image  source={require('../public/img/地址3.png')} />
                <Text note style={styles.morecss}>深圳市宝安区翻身地铁站</Text>
              </View>
              <View style={[styles.flexStart,styles.xjuzhong]}>
                <Image  source={require('../public/img/距离3.png')} />
                <Text note style={styles.morecss}>距离1.11km</Text>
              </View>
            </View>
            
          </View>
        </Content>
        <View style={styles.ph24}>
          <Button block info style={[styles.hdtcard,styles.mb20]}>
            <Text style={styles.f16}>到这里去</Text>
          </Button>
        </View>
      </Container>
    );
  }


};

  