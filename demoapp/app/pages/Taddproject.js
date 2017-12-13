import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Taddproject extends Component {
  constructor(props) {
    super(props); 
    main.init('Taddproject',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
              <HeadNav 
              headerText='创建工程'
              headerRight='完成'
              fn={()=>{alert(1)}}
            />
        <Content >
          <View style={styles.marginato}>
            <View style={styles.projectlogo}>

            </View>
          </View>
          <Form style={styles.whitebackground}>
            <Item style={styles.itemLine} fixedLabel first>
              <Text style={styles.labelwidth}>工程名称</Text>
              <Input placeholder="请输入工程名称" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>省份</Text>
              <Input placeholder="选择省份" 
                placeholderTextColor='#CCC' />
              <Button style={styles.whitebackground}>
              <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
              </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>城市</Text>
              <Input placeholder="选择城市" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>详细地址</Text>
              <Input placeholder="请输入详细地址" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>结构类型</Text>
              <Input placeholder="选择结构" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>开工日期</Text>
              <Input placeholder="设置开工日期" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel last>
              <Text style={styles.labelwidth}>竣工日期</Text>
              <Input placeholder="设置竣工日期" 
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

  