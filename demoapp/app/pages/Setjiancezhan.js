import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,Form} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Setjiancezhan extends Component {
  constructor(props) {
    super(props); 
    main.init('Setjiancezhan',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
                <HeadNav 
                headerText='设置监测站'
                headerRight='完成'
                fn={()=>{alert(1)}}
              />
        <Content style={styles.whitebackground}>
          <Form>
            <Item style={styles.itemLine} fixedLabel first>
              <Text style={styles.labelwidth}>监测站</Text>
              <Input placeholder="中山监测站" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
              </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>检测地址</Text>
              <Input placeholder="广东省中山市" 
                placeholderTextColor='#CCC' />
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>联系电话</Text>
              <Input placeholder="027-878611111" 
                placeholderTextColor='#CCC'/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }


};

  