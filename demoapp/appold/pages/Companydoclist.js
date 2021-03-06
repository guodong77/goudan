import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,CardItem,Card} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Companydoclist extends Component {
  constructor(props) {
    super(props); 
    main.init('Companydoclist',this); 
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
            <Title style={styles.addToptitle}>公司详情</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content style={styles.whitebackground}>
          <Card>
            <CardItem>
              <Left style={styles.relateLeft}>
                <Image source={require('../public/img/gclogo.png')}/> 
                <Body>
                  <View style={[styles.flexStart,styles.xjuzhong]}>
                    <Text style={styles.f16}>万达集团</Text>
                    <View style={styles.jianli}>
                      <Text style={[styles.f14,styles.applyText]}>监理单位</Text>
                    </View>
                  </View>
                  <View style={[styles.flexStart,styles.xjuzhong,styles.mt34]}>
                    <Image  source={require('../public/img/admin.png')} />
                    <Text note style={styles.f12}>王小花</Text>
                    <Image  source={require('../public/img/time.png')} />
                    <Text note style={styles.f12}>2017-09-14</Text>
                  </View>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <View style={styles.comfile}>
            <Text note>企业文件·3</Text>
            <Card style={styles.comfileCard}>
              <CardItem>
                <Left>
                  <Body>
                    <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Text style={styles.f16}>施工员证书</Text>
                    </View>
                    <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Image  source={require('../public/img/time.png')} />
                      <Text note style={styles.f12}>2017-09-14</Text>
                    </View>
                  </Body>
                </Left>
                <Right>
                  <Image  source={require('../public/img/xiazai.png')} />
                </Right>
              </CardItem>
            </Card>

            <Card style={styles.comfileCard}>
              <CardItem>
                <Left>
                  <Body>
                    <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Text style={styles.f16}>施工员证书</Text>
                    </View>
                    <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Image  source={require('../public/img/time.png')} />
                      <Text note style={styles.f12}>2017-09-14</Text>
                    </View>
                  </Body>
                </Left>
                <Right>
                  <Image  source={require('../public/img/xiazai.png')} />
                </Right>
              </CardItem>
            </Card>

            <Card style={styles.comfileCard} >
              <CardItem >
                <Left>
                  <Body>
                    <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Text style={styles.f16}>施工员证书</Text>
                    </View>
                    <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Image  source={require('../public/img/time.png')} />
                      <Text note style={styles.f12}>2017-09-14</Text>
                    </View>
                  </Body>
                </Left>
                <Right>
                  <Image  source={require('../public/img/xiazai.png')} />
                </Right>
              </CardItem>
            </Card>
          </View>

        </Content>
      </Container>
    );
  }


};

  