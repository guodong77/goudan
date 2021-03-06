import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title,CardItem,Card,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Dailyrecord extends Component {
  constructor(props) {
    super(props); 
    main.init('Dailyrecord',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>日志  </Title>
          </Body>
          <Right>
             <TouchableOpacity onPress={() => sco.ysnav.navigate('Adddailyrecord')}>
                <Image  source={require('../public/img/jiahao.png')} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
          <View style={styles.content}>
            <Item regular style={[styles.rizhisearch,styles.whitebackground]}>
              <Image style={styles.searchimg} source={require('../public/img/icon-搜索.png')}/>
              <Input placeholder="输入项目名称" placeholderTextColor='#CCC'/>
            </Item>
            <View>
              <Text style={styles.timeText}>2017年9月</Text>
            </View>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail style={styles.yuanquan1} source={require('../public/img/avther.png')} />
                  <Body>
                    <Text note>王小花</Text>
                    <Text note>09-03 10:30</Text>
                  </Body>
                </Left>
                <Right style={styles.hdtright}>
                    <TouchableOpacity onPress={() => sco.ysnav.navigate('Tjoinproject')}>
                      <Image source={require('../public/img/三点02.png')} />
                    </TouchableOpacity>
                  </Right>
              </CardItem>
              <CardItem>
                 <Text>
                  内容内容内容内容内容内容内容内容内容内容内容内容内容
                 </Text> 
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail style={styles.yuanquan1} source={require('../public/img/avther.png')} />
                  <Body>
                    <Text note>王小花</Text>
                    <Text note>09-03 10:30</Text>
                  </Body>
                </Left>
                <Right style={styles.hdtright}>
                    <TouchableOpacity onPress={() => sco.ysnav.navigate('Tjoinproject')}>
                      <Image source={require('../public/img/三点02.png')} />
                    </TouchableOpacity>
                  </Right>
              </CardItem>
              <CardItem>
                 <Text>
                  内容内容内容内容内容内容内容内容内容内容内容内容内容
                 </Text> 
              </CardItem>
            </Card>
            <View>
              <Text style={styles.timeText}>2017年9月</Text>
            </View>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail style={styles.yuanquan1} source={require('../public/img/avther.png')} />
                  <Body>
                    <Text note>王小花</Text>
                    <Text note>09-03 10:30</Text>
                  </Body>
                </Left>
                <Right style={styles.hdtright}>
                    <TouchableOpacity onPress={() => sco.ysnav.navigate('Tjoinproject')}>
                      <Image source={require('../public/img/三点02.png')} />
                    </TouchableOpacity>
                  </Right>
              </CardItem>
              <CardItem>
                 <Text>
                  内容内容内容内容内容内容内容内容内容内容内容内容内容
                 </Text> 
              </CardItem>
            </Card>
          </View>
        </Content>
      </Container>
    );
  }


};

  