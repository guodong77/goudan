import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,
  Body,Left,Title,Right,Card,CardItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,Modal}from 'react-native';
let sco ={};
export default class Fworkdetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Fworkdetail',this); 
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
            <Title style={styles.addToptitle}>职位详情</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => {sco.onListShow()}} >
                <Image  source={require('../public/img/星.png')} />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.iconpos}>
                <Image  source={require('../public/img/转发2.png')} />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.iconpos}>
                <Image  source={require('../public/img/举报.png')} />
            </TouchableOpacity>
          </Right>
        </Header>

        <Content>
          <View style={styles.whitebackground}>
            <Card style={styles.ph24}>
              <CardItem cardBody>
                <Text>资料员</Text>
              </CardItem>
              <CardItem cardBody style={styles.mV20}>
                <Left>
                  <Thumbnail source={require('../public/img/avther.png')} />
                  <Body>
                    <Text style={styles.bword}>王小花</Text>
                    <Text note style={styles.f12}>人力总监</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </View>
          <Card style={[styles.ph24,styles.pV20,styles.mt20]}>
            <CardItem cardBody >
              <Left style={[styles.borderBottom,styles.pb10]}>
                <View style={styles.shutiao}></View>
                <Text style={styles.bword}>职位详情</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Text note>
              王小花王小花王小花王小花王小花王小花王小花
              王小花王小花王小花王小花王小花王小花王小花
              王小花王小花王小花王小花王小花王小花王小花
              王小花王小花王小花王小花王小花王小花王小花
              </Text>
            </CardItem>
          </Card>
          <Card style={[styles.ph24,styles.pV20]}>
            <CardItem cardBody>
              <Left style={[styles.borderBottom,styles.pb10]}>
                <View style={styles.shutiao}></View>
                <Text style={styles.bword}>工作地点</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Left style={styles.mt15}>
                <Image  source={require('../public/img/地址blue.png')} />
                <Text note>
                深圳市宝安区翻身地铁站
                </Text>
              </Left>
              <Right><Image  source={require('../public/img/more.png')} /></Right>
            </CardItem>

            
          </Card>


        </Content>
        <View style={styles.ph24}>
          <Button block info style={[styles.hdtcard,styles.mb20]}>
              <Text style={styles.f16}>立即沟通</Text>
            </Button>
        </View>
      </Container>
    );
  }


};

  