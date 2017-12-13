import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Songjianadd extends Component {
  constructor(props) {
    super(props); 
    main.init('Songjianadd',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
                <HeadNav 
                headerText='添加部位'
                headerRight='完成'
                fn={()=>{alert(1)}}
              />
        <Content style={styles.whitebackground}>
          <Form>
            <Item style={styles.itemLine} fixedLabel first>
              <Text style={styles.labelwidth}>工程部位</Text>
              <Input placeholder="请输入部位名称" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>排序</Text>
              <Input placeholder="设置排序" 
                placeholderTextColor='#CCC' />
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>分部</Text>
              <Input placeholder="设置分部" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>强度等级</Text>
              <Input placeholder="设置强度等级" 
                placeholderTextColor='#CCC'/>
                <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>用量</Text>
              <Input placeholder="请输入用量" 
                placeholderTextColor='#CCC'/>
              
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>浇筑日期</Text>
              <Input placeholder="设置日期" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>标养送检日期</Text>
              <Input placeholder="设置日期" 
                placeholderTextColor='#CCC'/>
              <Button style={styles.whitebackground}>
                <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>组数</Text>
              <Input placeholder="请输入组数" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>芯片编号</Text>
              <Input placeholder="请输入芯片编号" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel>
              <Text style={styles.labelwidth}>样品编号</Text>
              <Input placeholder="请输入样品编号" 
                placeholderTextColor='#CCC'/>
            </Item>
            <Item style={styles.itemLine} fixedLabel last>
              <Text style={styles.labelwidth}>检测结果</Text>
              <Input placeholder="输入检测结果" 
                placeholderTextColor='#CCC'/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }


};

  