import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,List,ListItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
import HeadNav from '../components/HeadNav';
let sco ={};
export default class Choosejianceleibie extends Component {
  constructor(props) {
    super(props); 
    main.init('Choosejianceleibie',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <HeadNav 
        headerText='选择检测类别'
        headerRight='完成'
        fn={()=>{alert(1)}}
      />
        <Content style={styles.whitebackground}>
          <List> 
            <ListItem avatar>
              <Left>
                <Image style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={styles.borderBottom}>
                <Text numberOfLines={1} note>重量偏差</Text>
              </Body>
            </ListItem> 
            <ListItem avatar>
              <Left>
                <Image style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={styles.borderBottom}>
                <Text numberOfLines={1} note>重量偏差</Text>
              </Body>
            </ListItem> 
            <ListItem avatar>
              <Left>
                <Image style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={styles.borderBottom}>
                <Text numberOfLines={1} note>重量偏差</Text>
              </Body>
            </ListItem> 
          </List> 
        </Content>
      </Container>
    );
  }


};

  