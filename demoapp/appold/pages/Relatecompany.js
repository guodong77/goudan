import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Card,CardItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Relatecompany extends Component {
  constructor(props) {
    super(props); 
    main.init('Relatecompany',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.worktimeRow,styles.xjuzhong]}>
          <Left>
            <TouchableOpacity  onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>企业关联</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => sco.ysnav.navigate('Findcompany')}>
                <Image  source={require('../public/img/search.png')} />
            </TouchableOpacity>
          </Right>
        </Header>
          <Content>
            <View>
              <View style={styles.card}>
                <Text note>旭日领域商住楼关联企业·3</Text>
              </View>
              
              <Card style={styles.relatecard}>
                <CardItem bordered>
                  <Left style={styles.relateLeft}>
                    <Image source={require('../public/img/gclogo.png')}/> 
                    <Body>
                      <View style={[styles.flexStart,styles.xjuzhong]}>
                        <Text style={styles.f16}>NativeBase</Text>
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
                  <Right style={styles.hdtright}>
                    <TouchableOpacity onPress={() => sco.ysnav.navigate('Companydoclist')}>
                      <Image source={require('../public/img/三点02.png')} />
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>

              <Card style={styles.relatecard}>
                <CardItem bordered>
                  <Left style={styles.relateLeft}>
                    <Image source={require('../public/img/gclogo.png')}/> 
                    <Body>
                      <View style={[styles.flexStart,styles.xjuzhong]}>
                        <Text style={styles.f16}>NativeBase</Text>
                        <View style={styles.jianli}>
                          <Text style={[styles.f14,styles.applyText]}>设计单位</Text>
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
                  <Right style={styles.hdtright}>
                    <TouchableOpacity onPress={() => sco.ysnav.navigate('Tjoinproject')}>
                      <Image source={require('../public/img/三点02.png')} />
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
            </View>
          </Content>
      </Container>
    );
  }


};

  