import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Addhengdaotu extends Component {
  constructor(props) {
    super(props); 
    main.init('Addhengdaotu',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container>
           <HeadNav 
           headerText='创建'
           headerRight='完成'
           fn={()=>{alert(1)}}
         />
        <Content style={styles.whitebackground}>
          <Form>
            <Item style={styles.itemLine} fixedLabel first>
              <Text style={styles.labelwidth}>主标题</Text>
              <Input placeholder="请输入主标题" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>副标题</Text>
              <Input placeholder="请输入副标题" 
                placeholderTextColor='#CCC' />
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>编制单位</Text>
              <Input placeholder="请输入编制单位" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>开始日期</Text>
              <Input placeholder="设置日期" 
                placeholderTextColor='#CCC'/>
                <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>结束日期</Text>
              <Input placeholder="设置日期" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>编制日期</Text>
              <Input placeholder="设置日期" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.noborder}>
              <Text style={styles.mt20}>注释</Text>
            </Item>
            <Textarea  multiline={true}
              blurOnSubmit={true}
              returnKeyType ='done'
              placeholder="输入注释"
              placeholderTextColor='#CCCCCC'
              style={[styles.textareaheight,styles.mh24,styles.borderBottom]}
              underlineColorAndroid="transparent" />
          </Form>
        </Content>
      </Container>
    );
  }


};

  