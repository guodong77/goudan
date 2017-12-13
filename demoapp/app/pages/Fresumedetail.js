import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,
  Body,Left,Title,Right,Card,CardItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,Modal}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Fresumedetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Fresumedetail',this); 
    sco = this;
  }
  render() {
    return (
      <Container>
        {/* <HeadNav 
            headerText='人才详情'
            headerRight={
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => {sco.onListShow()}} >
                <Image  source={require('../public/img/星.png')} />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.iconpos}>
                <Image  source={require('../public/img/转发2.png')} />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.iconpos}>
                <Image  source={require('../public/img/举报.png')} />
            </TouchableOpacity>
            </View>
          }
            fn={Actions.Adddailyrecord}
        />  */}
        <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity transparent onPress={Actions.pop}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>人才详情</Title>
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
          <View>
            <Card style={styles.ph24}>
              <CardItem cardBody style={{paddingTop:15,paddingBottom:10,}}>
                <Left>
                  <Thumbnail source={require('../public/img/avther.png')} />
                  <Body>
                    <Text style={styles.bword}>张三胖</Text>
                    <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Image source={require('../public/img/dizhi.png')} />
                      <Text note style={[styles.morecss,styles.f12]}>深圳 南山</Text>
                    </View>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody style={{paddingBottom:15,}}>
              <Text note>在网页中，一个元素占有空间的大小由几个部分构成其中包括元素的内容
                  素的内边距（padding）在网页中，一个元素占有空间的大小由几个部分构成其中包括元素的内容
                  素的内边距（padding）在网页中，一个元素占有空间的大小由几个部分构成其中包括元素的内容
                  素的内边距（padding）</Text>
            </CardItem>
            </Card>
          </View>
          <Card style={[styles.ph24,styles.pV20,]}>
            <CardItem cardBody >
              <Left style={[styles.borderBottom,styles.pb10]}>
                <View style={styles.shutiao}></View>
                <Text style={styles.bword}>求职期望</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Text note>
              Web前端
              </Text>
            </CardItem>
          </Card>

          <Card style={[styles.ph24,styles.pV20]}>
            <CardItem cardBody>
              <Left style={[styles.borderBottom,styles.pb10]}>
                <View style={styles.shutiao}></View>
                <Text style={styles.bword}>工作经历</Text>
              </Left>
            </CardItem>
            <CardItem cardBody style={[styles.mV20,styles.worktimeRow]}>
              <Text>
              深圳市宇杉信息科技有限公司
              </Text>
              <Text note>2017.8-至今</Text>
            </CardItem>
            <CardItem cardBody >
              <Body style={[styles.borderBottom,styles.pb10]}>
              <Text note>工作内容：</Text>
              <Text note>负责公司前端代码编写维护</Text>
              </Body>
            </CardItem>

            <CardItem cardBody style={[styles.mV20,styles.worktimeRow]}>
              <Text>
              深圳市宇杉信息科技有限公司
              </Text>
              <Text note>2017.8-至今</Text>
            </CardItem>
            <CardItem cardBody>
              <Body>
              <Text note>工作内容：</Text>
              <Text note>负责公司前端代码编写维护</Text>
              </Body>
            </CardItem>
          </Card>

          <Card style={[styles.ph24,styles.pV20]}>
            <CardItem cardBody>
              <Left style={[styles.borderBottom,styles.pb10]}>
                <View style={styles.shutiao}></View>
                <Text style={styles.bword}>教育经历</Text>
              </Left>
            </CardItem>
            <CardItem cardBody style={[styles.mV20,styles.worktimeRow]}>
              <Text>惠州学院</Text>
              <Text note>2013.8-2017.6</Text>
            </CardItem>
            <CardItem cardBody >
              <Body>
              <Text note>软件工程 | 本科</Text>
              </Body>
            </CardItem>   
          </Card>
        </Content>

        <View style={[styles.ph24,styles.whitebackground]}>
          <Button block info style={[styles.hdtcard,styles.mb20]}>
              <Text style={styles.f16}>立即沟通</Text>
            </Button>
        </View>
      </Container>
    );
  }


};

  