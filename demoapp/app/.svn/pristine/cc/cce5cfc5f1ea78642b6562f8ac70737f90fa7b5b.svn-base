import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,
  Body,Left,Title,Right,Card,CardItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,Modal}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Faddworkposition extends Component {
  constructor(props) {
    super(props); 
    main.init('Faddworkposition',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container style={styles.whitebackground}>
                <HeadNav 
                headerText='添加地区'
                fn={()=>{alert(1)}}
              />

        <Content>
          <View >
          <Text note>地图</Text>
          </View>

        </Content>
        <View style={styles.mh24}>
          <View style={[styles.ph24,styles.pV26,styles.worktimeRow,styles.xjuzhong]}>
            <Text style={[styles.f16,styles.bword]}>广东省深圳市南山区</Text>
            <Image  source={require('../public/img/more.png')} />
          </View>
          <View style={[styles.ph24,styles.pV26]}>
            <Text style={[styles.f14,styles.bword]}>高新园区</Text>
          </View>
        </View>
        <View style={styles.ph24}>
          <Button block info style={[styles.hdtcard,styles.mb20]}>
            <Text style={styles.f16}>确定</Text>
          </Button>
        </View>
      </Container>
    );
  }


};

  