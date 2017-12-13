import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Card,CardItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Hengdaotu extends Component {
  constructor(props) {
    super(props); 
    main.init('Hengdaotu',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
          <HeadNav 
            headerText='横道图'
            headerRight={
             <Image  source={require('../public/img/jiahao.png')} />
          }
            fn={Actions.Addhengdaotu}
        />
          <Content>
            <View style={styles.content}>
              <Card style={styles.hdtcard}>
                <CardItem bordered>
                  <Left >
                    <Body>
                      <Text style={styles.f16}>NativeBase</Text>
                      <Text style={styles.f14} note>NativeBase</Text>
                    </Body>
                  </Left>
                  <Right style={styles.hdtright}>
                  <TouchableOpacity onPress={Actions.Tjoinproject}>
                      <Image source={require('../public/img/三点02.png')} />
                    </TouchableOpacity>
                  </Right>
                </CardItem>
                <CardItem style={{ paddingVertical: 0 }}>
                  <Left>
                    <Text  style={styles.worktime1}>开始时间：2017-09-17</Text>
                    <Text  style={styles.worktime2}>结束时间：2017-09-17</Text>
                  </Left>
                </CardItem>
              </Card>
            </View>
          </Content>
      </Container>
    );
  }


};

  