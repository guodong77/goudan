import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Card,CardItem,Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Pika extends Component {
  constructor(props) {
    super(props); 
    main.init('Pika',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
               <HeadNav 
               headerText='皮卡车'
             />
        
        <Content style={styles.whitebackground}>
          <View style={[styles.flexStart,styles.card,styles.borderBottom,styles.pb15]}>
            <View>
              <Text style={styles.f14}>检测站：<Text style={styles.f14}>中山检测站    </Text><Text style={styles.f14}>027-8374111</Text></Text>
              <Text style={styles.f14}>地址：<Text style={styles.f14}>广东省中山市东风检测站</Text></Text>
            </View>
            <Right>
              <TouchableOpacity onPress={Actions.Setjiancezhan}>           
                <Image  source={require('../public/img/more.png')} />
              </TouchableOpacity>
            </Right>
          </View>

          <Card>
            <CardItem>
              <Left>
                <Image style={[styles.yuanquan,styles.yuanquanpos]} source={require('../public/img/yuan1.png')} />
              <Body>
                <Text style={styles.f14}>类别：钢筋</Text>
                <Text style={styles.f14}>工程部位：一幢主体</Text>
                <Text style={styles.f14}>数组：10</Text>
                <Text style={styles.f14}>进场日期：2015-12-18</Text>
                <Text style={styles.f14}>送检日期：2015-12-18</Text>
                <Text style={styles.f14}>样品信息：厂家广东台风广铁集团有限公司</Text>
              </Body> 
              </Left>
            </CardItem>
            <View style={styles.clearbuttom}></View>
          </Card>

          <Card>
            <CardItem>
              <Left>
                <Image style={[styles.yuanquan,styles.yuanquanpos]} source={require('../public/img/yuan1.png')} />
              <Body>
                <Text style={styles.f14}>类别：钢筋</Text>
                <Text style={styles.f14}>工程部位：一幢主体</Text>
                <Text style={styles.f14}>数组：10</Text>
                <Text style={styles.f14}>进场日期：2015-12-18</Text>
                <Text style={styles.f14}>送检日期：2015-12-18</Text>
                <Text style={styles.f14}>样品信息：厂家广东台风广铁集团有限公司</Text>
              </Body> 
              </Left>
            </CardItem>
            <View style={styles.clearbuttom}></View>
          </Card>
        </Content>

        <Footer style={[styles.whitebackground,styles.songjianfooter]}>
          <Left style={[styles.flexStart,styles.xjuzhong,styles.sctoptitle]}>
            <Image style={[styles.yuanquan,styles.footyuanquanpos]} source={require('../public/img/yuan1.png')} />
            <Text note style={styles.f15}>全选</Text>
            <Body><Text note style={[styles.f15,styles.yuanquanpos]}>合计:<Text style={styles.redtext}>10组</Text></Text></Body>
          </Left>
          <TouchableOpacity onPress={Actions.Pikasubmit}>           
          <View style={[styles.joinpk,styles.marginato,styles.xjuzhong]}>
            <Text style={styles.whiteText}>下一步</Text>
          </View>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }


};

  