import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Teditemac extends Component {
  constructor(props) {
    super(props); 
    main.init('Teditemac',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
               <HeadNav 
               headerText='编辑机械'
               headerRight='保存'
               fn={()=>{alert(1)}}
             />
        <Content >
          <View style={styles.marginato}>
            <View style={styles.projectlogo}>
              
            </View>
          </View>
          <Form style={styles.whitebackground}>
            <Item style={styles.itemLine} fixedLabel last>
              <Text style={styles.labelwidth}>机械名称</Text>
              <Input placeholder="请输入机械名称" 
                placeholderTextColor='#CCC'/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }


};

  