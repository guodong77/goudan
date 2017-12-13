import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Tujian extends Component {
  constructor(props) {
    super(props); 
    main.init('Tujian',this);  
    sco = this;
  }

  render() {
    return (
      <Container>
                <HeadNav 
                headerText='土建资料'
              />
        <Content style={styles.whitebackground}>
          <View style={[styles.marginato,styles.loadway]}>
            <Image  source={require('../public/img/none.png')} />
          </View>
        </Content>
      </Container>
    );
  }


};

  