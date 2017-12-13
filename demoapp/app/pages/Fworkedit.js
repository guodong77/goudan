import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,
  Body,Left,Title,Right,List,ListItem,Thumbnail,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,Modal}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Fworkedit extends Component {
  constructor(props) {
    super(props); 
    main.init('Fworkedit',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
                <HeadNav 
                headerText='编辑招聘职位'
              />
        <Content style={styles.whitebackground}>
          <List>
              <ListItem style={[styles.listitemcss,styles.ph24,styles.worktimeRow]}>
                <View>
                  <Text>职位名称</Text>
                </View>
                <View style={[styles.xjuzhong,styles.titleposition]}>
                  <Text style={styles.shaixuanwz}>资料员</Text> 
                  <Image  style={styles.morecss} source={require('../public/img/more.png')} />
                </View>
              </ListItem>
              <ListItem style={[styles.listitemcss,styles.ph24,styles.worktimeRow]}>
                <View>
                  <Text>薪资范围</Text>
                </View>
                <View style={[styles.xjuzhong,styles.titleposition]}>
                  <Text style={styles.shaixuanwz}>4-5k</Text> 
                  <Image style={styles.morecss}  source={require('../public/img/more.png')} />
                </View>
              </ListItem>
              <ListItem style={[styles.listitemcss,styles.ph24,styles.worktimeRow]}>
                <View>
                  <Text>地区</Text>
                </View>
                <View style={[styles.xjuzhong,styles.titleposition]}>
                  <Text style={styles.shaixuanwz}>广东深圳</Text> 
                  <Image style={styles.morecss}  source={require('../public/img/more.png')} />
                </View>
              </ListItem>
          </List>
          <View style={styles.ph24}>
            <Text style={styles.mt20}>职位详情</Text>
            <View style={[styles.noticebg,styles.mt20]}>
              <Textarea  multiline={true}
              blurOnSubmit={true}
              returnKeyType ='done'
              placeholder="描述一下吧描述一下吧描述一下吧描述一下吧描述一下吧描述一下吧"
              placeholderTextColor='#CCCCCC'
              style={[styles.h400,styles.mh24,styles.borderBottom]}
              underlineColorAndroid="transparent" />
            </View>

            <Button block danger style={styles.hdtcard}>
              <Text style={styles.f16}>删除招聘职位</Text>
            </Button>
          </View>
          
        </Content>
      </Container>
    );
  }


};

  