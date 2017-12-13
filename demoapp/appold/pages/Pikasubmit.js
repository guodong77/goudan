import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Card,CardItem,Footer,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Pikasubmit extends Component {
  constructor(props) {
    super(props); 
    main.init('Pikasubmit',this); 
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
            <Title>提交订单</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>
        
        <Content style={styles.whitebackground}>
          <View style={[styles.flexStart,styles.card,styles.borderBottom,styles.pb15]}>
            <View>
              <Text style={styles.f14}>联系人：<Text style={styles.f14}>王小花    </Text><Text style={styles.f14}>130271111111</Text></Text>
              <Text style={styles.f14}>工程名称：<Text style={styles.f14}>旭日品脆商住楼</Text></Text>
            </View>
            <Right>
              <Image  source={require('../public/img/more.png')} />
            </Right>
          </View>

          <Card >
            <CardItem>
              <Left style={styles.leftCard}>
                <Body>
                  <Text style={[styles.f14,styles.mB4]}>类别：钢筋</Text>
                  <Text style={[styles.f14,styles.mB4]}>工程部位：一幢主体</Text>
                  <Text style={[styles.f14,styles.mB4]}>数组：10</Text>
                  <Text style={[styles.f14,styles.mB4]}>进场日期：2015-12-18</Text>
                  <Text style={[styles.f14,styles.mB4]}>送检日期：2015-12-18</Text>
                  <Text style={[styles.f14,styles.mB4]}>样品信息：厂家广东台风广铁集团有限公司</Text>
                </Body>
              </Left>
            </CardItem>
            <View style={[styles.worktimeRow,styles.ph24]}>
              <Left>
                <Text style={styles.f15}>检测类别</Text>
              </Left>
              <Right>
                <TouchableOpacity onPress={()=>sco.ysnav.navigate('Choosejianceleibie')}>
                  <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Text note style={styles.f15}>未选择</Text>
                      <Image style={styles.morecss}  source={require('../public/img/more.png')} />
                  </View>
                </TouchableOpacity>
              </Right>
            </View>
            <View style={styles.clearbuttom}></View>
          </Card>

          <Card >
            <CardItem>
              <Left style={styles.leftCard}>
                <Body>
                  <Text style={[styles.f14,styles.mB4]}>类别：钢筋</Text>
                  <Text style={[styles.f14,styles.mB4]}>工程部位：一幢主体</Text>
                  <Text style={[styles.f14,styles.mB4]}>数组：10</Text>
                  <Text style={[styles.f14,styles.mB4]}>进场日期：2015-12-18</Text>
                  <Text style={[styles.f14,styles.mB4]}>送检日期：2015-12-18</Text>
                  <Text style={[styles.f14,styles.mB4]}>样品信息：厂家广东台风广铁集团有限公司</Text>
                </Body>
              </Left>
            </CardItem>
            <View style={[styles.worktimeRow,styles.ph24]}>
              <Left>
                <Text style={styles.f15}>检测类别</Text>
              </Left>
              <Right>
                <TouchableOpacity onPress={()=>sco.ysnav.navigate('Choosejianceleibie')}>
                  <View style={[styles.flexStart,styles.xjuzhong]}>
                      <Text note style={styles.f15}>未选择</Text>
                      <Image style={styles.morecss}  source={require('../public/img/more.png')} />
                  </View>
                </TouchableOpacity>
              </Right>
            </View>
            <View style={styles.clearbuttom}></View>
          </Card>

          <Card>
            <View style={[styles.worktimeRow,styles.ph24]}>
              <Left>
                <Text style={styles.f15}>订单类别</Text>
              </Left>
            </View>
            <View>
              <Textarea  multiline={true}
              blurOnSubmit={true}
              returnKeyType ='done'
              placeholder="限45个字，请勿填写有关支付、收获发票方面的信息"
              placeholderTextColor='#CCCCCC' 
              underlineColorAndroid="transparent" />  
            </View>
            <View style={styles.borderBottom}></View>
          </Card>
          <Card>
            <View style={[styles.worktimeRow,styles.ph24]}>
              <Right>
                <Text style={styles.f15}>11件样品，结算总金额：¥1200.00</Text>
              </Right>
            </View>
          </Card>
          <View style={styles.toptext}></View>
        </Content>

        <Footer style={[styles.whitebackground,styles.songjianfooter]}>
          <Left style={[styles.gctopimg,styles.sctoptitle]}>
            <Text note style={[styles.f15,styles.yuanquanpos]}>合计金额:<Text style={styles.redtext}>¥1200.00</Text></Text>
          </Left>
          <View style={[styles.joinpk,styles.marginato,styles.xjuzhong]}>
            <Text style={styles.whiteText}>提交</Text>
          </View>
        </Footer>
      </Container>
    );
  }


};

  