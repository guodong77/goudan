import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,List,ListItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import HeadNav from '../components/HeadNav';
let sco ={};
export default class Chooseperson extends Component {
  constructor(props) {
    super(props); 
    main.init('Chooseperson',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container>
               <HeadNav 
               headerText='选择发送人'
               headerRight='完成'
               fn={()=>{alert(1)}}
             />
        <Content style={styles.whitebackground}>
          <List> 
            <ListItem avatar>
              <Left>
                <Thumbnail style={styles.yuanquan} source={require('../public/img/yuan1.png')} />
              </Left>
              <Body style={[styles.flexStart,styles.xjuzhong]}>
                <Image style={styles.yuanquan1}  source={require('../public/img/Oval2.png')} />
                <Text numberOfLines={1} note>王小花</Text>
              </Body>
            </ListItem> 
          </List> 
        </Content>
      </Container>
    );
  }


};

  