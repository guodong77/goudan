import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,CardItem,Card,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Singlecomment extends Component {
  constructor(props) {
    super(props); 
    main.init('Singlecomment',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <HeadNav 
          headerText='六层梁板'
          headerRight={<Image  source={require('../public/img/icon-发布.png')} />}
          fn={Actions.Teditedlist}
        />
        {/* <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity transparent onPress={Actions.pop}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>六层梁板</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={Actions.Teditedlist} style={styles.iconpos}>
                <Image  source={require('../public/img/icon-发布.png')} />
            </TouchableOpacity>
          </Right>
        </Header> */}

        <View style={[styles.flexStart,styles.whitebackground]}>
          <Left style={styles.sctoptitle}><Text>浇筑日期</Text></Left>
          <Body><Text>2015-07-20</Text></Body>
          <Right></Right>
        </View>
        <Content style={styles.content}>
          <Card style={styles.scCard}>
            <CardItem>
              <Left>
                <Thumbnail style={styles.yuanquan} source={require('../public/img/avther.png')} />
                <Body>
                  <View style={styles.flexStart}>
                    <Text>王小花</Text>
                    <Text style={[styles.zhiliang,styles.f12]}>管理员</Text>
                  </View>
                  <Text note>09-03 10:30</Text>
                </Body>
              </Left>
              <Right>
                <Image source={require('../public/img/三点02.png')} />
              </Right>
            </CardItem>
            <CardItem>
              <Text>内容内容内容内容内容内容内容内容内容内容内容内容</Text>
            </CardItem>
          </Card>

          <Card style={styles.scCard}>
            <CardItem>
              <Left>
                <Thumbnail style={styles.yuanquan} source={require('../public/img/avther.png')} />
                <Body>
                  <View style={styles.flexStart}>
                    <Text>王小花</Text>
                    <Text style={[styles.zhiliang,styles.f12]}>管理员</Text>
                  </View>
                  <Text note>09-03 10:30</Text>
                </Body>
              </Left>
              <Right>
                <Image source={require('../public/img/三点02.png')} />
              </Right>
            </CardItem>
            <CardItem>
              <Text>内容内容内容内容内容内容内容内容内容内容内容内容</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }


};

  