import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Picdetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Picdetail',this); 
    sco = this;
  }

  render() {
    return (
      <Container>
                <HeadNav 
                headerText='image'
              />
        <Content style={styles.blackbackground}>
          <View style={styles.imgbox}>
            <Image  style={styles.imgmax} source={require('../public/img/tupian.png')}>
            </Image>
          </View>
        </Content>
        <Footer style={[styles.blacktop,styles.gctopheight]}>
          <Right style={styles.ph24}>
            <Image  source={require('../public/img/delect1.png')}/>
          </Right>
        </Footer>
      </Container>
    );
  }


};

  