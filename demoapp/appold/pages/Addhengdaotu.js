import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Addhengdaotu extends Component {
  constructor(props) {
    super(props); 
    main.init('Addhengdaotu',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.worktimeRow,styles.xjuzhong]}>
          <View>
            <TouchableOpacity transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleposition}>
            <Title style={styles.addToptitle}>创建</Title>
          </View>
          <View>
            <TouchableOpacity  transparent onPress={() => sco.ysnav.goBack()}>
              <Text style={[styles.f16,styles.whiteText]}>完成</Text>
            </TouchableOpacity>
          </View>
        </Header>
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

  