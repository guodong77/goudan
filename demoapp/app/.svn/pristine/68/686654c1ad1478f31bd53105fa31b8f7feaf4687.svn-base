import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title,Textarea } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Taddson extends Component {
  constructor(props) {
    super(props); 
    main.init('Taddson',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
                <HeadNav 
                headerText='添加子单位'
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
              <Text style={styles.labelwidth}>子单位名称</Text>
              <Input placeholder="请输入子单位名称" 
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
            <Item style={styles.itemLine} fixedLabel last>
              <Text style={styles.labelwidth}>层数</Text>
              <Input placeholder="请输入层数" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
          </Form>
          <View>
            <Text note style={[styles.middletext,styles.back]}>基础部位</Text>
          </View>
          <View style={[styles.boxtxt,styles.whitebackground]}>
            <Textarea  multiline={true}
              blurOnSubmit={true}
              returnKeyType ='done'
              placeholder="多个部位请换行"
              placeholderTextColor='#CCCCCC'
              style={styles.textarea}
              underlineColorAndroid="transparent" />
          </View>
          <View>
            <Text note style={[styles.middletext,styles.back]}>主体部位</Text>
          </View>
          <View style={[styles.boxtxt,styles.whitebackground]}>
            <Textarea  multiline={true}
              blurOnSubmit={true}
              returnKeyType ='done'
              placeholder="多个部位请换行"
              placeholderTextColor='#CCCCCC'
              style={styles.textarea}
              underlineColorAndroid="transparent" />

            <Button bordered block style={[styles.mt34,styles.bordercol]}>
              <Text style={styles.tyanniutext}>+ 生成部位</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }


};

  