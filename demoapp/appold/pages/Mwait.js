import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Tabs,Tab,List,
  ListItem,Thumbnail,TabHeading,Card,CardItem,Badge} from 'native-base';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};

export default class Mwait extends Component {
  constructor(props) {
    super(props); 
    main.init('Mwait',this); 
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
          <Body>
            <Title style={styles.addToptitle}>  待处理事项</Title>
          </Body>
        </Header>
        <Content>
          <Card style={[styles.ph24,styles.mt20]}>
              <CardItem cardBody style={styles.mV20}>
                <Left>
                  <Thumbnail style={styles.msgimg} source={require('../public/img/Avatar.png')} />
                  <Body>
                    <Text style={styles.bword}>基础任务：完善个人资料</Text>
                    <Text note style={styles.f12}>资料完善程度10%，公司/职位待完善</Text>
                  </Body>
                  <Button bordered info style={[styles.buttoncss,styles.marginato,styles.rightbotton]}><Text style={styles.buttontextcss}>完善</Text></Button>
                </Left>
              </CardItem>
            </Card>
          <Tabs style={styles.mt15}>
            <Tab style={styles.topborder} heading='项目邀请'>
              <Card style={[styles.ph24,styles.borderBottom]}>
                <CardItem cardBody style={styles.mV20}>
                  <Left>
                    <Thumbnail style={styles.msgimg} source={require('../public/img/头像.png')} />
                    <Body>
                      <Text style={styles.bword}>王小花 | 管理员</Text>
                      <Text note style={styles.f12}>邀请您以个人身份加入项目</Text>
                    </Body>
                    <Button bordered info style={[styles.buttoncss,styles.marginato,styles.rightbotton]}>
                    <Text style={styles.buttontextcss}>同意</Text>
                    </Button>
                  </Left>
                </CardItem>
                <CardItem cardBody style={[styles.mV20,styles.xjuzhong]} >
                  <Left>
                    <Badge style={styles.xiangyuan}><Text>项</Text></Badge>
                    <Text style={styles.bword}>某某项目某某项目某某项目某某项目</Text>
                  </Left>
                </CardItem>
              </Card>
              <View style={styles.borderBottom}></View>
              <Card style={styles.ph24}>
                <CardItem cardBody style={styles.mV20}>
                  <Left>
                    <Thumbnail style={styles.msgimg} source={require('../public/img/头像.png')} />
                    <Body>
                      <Text style={styles.bword}>王小花 | 管理员</Text>
                      <Text note style={styles.f12}>邀请您以个人身份加入项目</Text>
                    </Body>
                    <Button bordered disabled style={[styles.buttoncss,styles.marginato,styles.rightbotton]}>
                    <Text style={styles.buttontextcss}>已加入</Text>
                    </Button>
                  </Left>
                </CardItem>
                <CardItem cardBody style={styles.mV20} >
                  <Left>
                    <Badge style={styles.xiangyuan}><Text>项</Text></Badge>
                    <Text style={styles.bword}>某某项目某某项目某某项目某某项目</Text>
                  </Left>
                </CardItem>
              </Card>
              <View style={styles.borderBottom}></View>
            </Tab>
            <Tab style={styles.topborder} heading='送检计划'>
              
            </Tab>
            <Tab style={styles.topborder} heading='漏送'>
              
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }


};

  