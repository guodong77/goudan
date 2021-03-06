import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Tabs,Tab,List,
  ListItem,Thumbnail,TabHeading} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
const pratik = require('../public/img/Oval2.png');
const sanket = require('../public/img/Oval2.png');
const megha = require('../public/img/Oval2.png');
const atul = require('../public/img/Oval2.png');
const saurabh = require('../public/img/Oval2.png');
const varun = require('../public/img/Oval2.png');

const datas = [
  {
    img: pratik,
    text: "王小花",
    note: "施工员",
    time: "2017-09-14"
  },
  {
    img: sanket,
    text: "王小花",
    note: "施工员",
    time: "2017-09-14"
  },
  {
    img: megha,
    text: "王小花",
    note: "施工员",
    time: "2017-09-14"
  },
  {
    img: atul,
    text: "王小花",
    note: "施工员",
    time: "2017-09-14"
  },
  {
    img: saurabh,
    text: "王小花",
    note: "施工员",
    time: "2017-09-14"
  },
  {
    img: varun,
    text: "王小花",
    note: "施工员",
    time: "2017-09-14"
  }
];
export default class Person extends Component {
  constructor(props) {
    super(props); 
    main.init('Person',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header hasTabs style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity  transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>人员管理</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => {sco.onListShow()}} >
                <Image  source={require('../public/img/jiahao.png')} />
            </TouchableOpacity>
          </Right>
        </Header>
        {sco.show == true&&
            <View style={styles.toppop}>
              <View>
                <TouchableOpacity  style={styles.toppopitem} onPress={() => sco.ysnav.navigate('Addperson')}>
                  <Text style={styles.toppoptext}>添加人员</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity  style={styles.toppopitem} onPress={() => sco.ysnav.navigate('Addrole')}>
                  <Text style={styles.toppoptext}>添加角色</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        <Content style={styles.whitebackground}>
          <Tabs>
            <Tab style={styles.topborder} heading='人员列表'>
              <List
                dataArray={datas}
                renderRow={data =>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail small source={data.img} />
                    </Left>
                    <Body>
                      <Text>{data.text}</Text>
                      <Text numberOfLines={1} note>{data.note}</Text>
                    </Body>  
                    <Right style={styles.jsb}>
                      <View>
                         <Image source={require('../public/img/三点02.png')} />
                      </View>
                      <View style={[styles.flexStart,styles.xjuzhong]}>
                        <Image  source={require('../public/img/time.png')} />
                        <Text note>{data.time}</Text>
                      </View>
                    </Right>
                  </ListItem>}
              />
            </Tab>
            <Tab style={styles.topborder} heading={
              <TabHeading><Text>角色列表</Text></TabHeading>
            }>
              <List
                dataArray={datas}
                renderRow={data =>
                  <ListItem avatar>
                    <Body>
                      <Text>{data.text}</Text>
                      <Text numberOfLines={1} note>{data.note}</Text>
                    </Body>  
                    <Right style={styles.jsb}>
                      <View>
                         <Image source={require('../public/img/三点02.png')} />
                      </View>
                    </Right>
                  </ListItem>}
              />
            </Tab>
            <Tab style={styles.topborder} heading={
              <TabHeading><Text>待审核</Text></TabHeading>
            }>
              <List
                dataArray={datas}
                renderRow={data =>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail small source={data.img} />
                    </Left>
                    <Body>
                      <Text>{data.text}</Text>
                      <Text numberOfLines={1} note>{data.note}</Text>
                    </Body>  
                    <Right style={styles.flexStart}>
                      <View style={[styles.anniu,styles.marginato,styles.xjuzhong]}><Text>拒绝</Text></View>
                      <View style={[styles.anniu,styles.marginato,styles.xjuzhong,styles.tyanniu]}><Text style={styles.tyanniutext}>同意</Text></View>
                    </Right>
                  </ListItem>}
              />
            </Tab>
        </Tabs>
        </Content>
      </Container>
    );
  }


};

  