import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Weatherglassedit extends Component {
  constructor(props) {
    super(props); 
    main.init('Weatherglassedit',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
                <HeadNav 
                headerText='编辑'
                headerRight='保存'
                fn={()=>{alert(1)}}
              />
        <Content style={styles.whitebackground}>
          <Form>
            <Item style={styles.itemLine} fixedLabel first>
              <Text style={[styles.labelwidth]}>最高气温</Text>
              <Input placeholder="32" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>最低气温</Text>
              <Input placeholder="28" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>天气情况</Text>
              <Input placeholder="多云" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }


};

  