import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Tsondetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Tsondetail',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.worktimeRow,styles.xjuzhong]}>
          <View>
            <TouchableOpacity  transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleposition}>
            <Title style={styles.addToptitle}>子单位详情</Title>
          </View>
          <View style={styles.xjuzhong}>
            <TouchableOpacity onPress={() => sco.ysnav.navigate('Taddpart')}>
                <Image  source={require('../public/img/jiahao.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sco.ysnav.navigate('Teditedlist')} style={styles.iconpos}>
                <Image  source={require('../public/img/icon-发布.png')} />
            </TouchableOpacity>
          </View>
        </Header>
        {sco.show == true&&
            <View style={styles.toppop}>
              <View>
                <TouchableOpacity  style={styles.toppopitem} onPress={() => sco.ysnav.navigate('Taddproject')}>
                  <Text style={styles.toppoptext}>添加子单位</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity  style={styles.toppopitem} onPress={() => sco.ysnav.navigate('Tjoinproject')}>
                  <Text style={styles.toppoptext}>添加机械</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        <Content >
          <View style={styles.marginato}>
            <View style={styles.projectlogo}>

            </View>
          </View>
          <List style={styles.whitebackground}> 
              <ListItem style={styles.ListItemtype} first>
                <Text style={styles.labelwidth}>子单位名称</Text>
                <Text note style={styles.f16}>一栋</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.labelwidth}>结构类型</Text>
                <Text note style={styles.f16}>框剪结构</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.labelwidth}>层数</Text>
                <Text note style={styles.f16}>5</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.labelwidth}>基础</Text>
                <Text note style={styles.f16}>2017年7月20日-2017年3月30日</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype} >
                <Text style={styles.labelwidth}>主体</Text>
                <Text note style={styles.f16}>2017年7月20日-2017年3月30日</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype} last>
                <Text style={styles.labelwidth}>装修</Text>
                <Text note style={styles.f16}>2017年7月20日-2017年3月30日</Text>
              </ListItem>
          </List> 
          <View>
            <Text note style={[styles.middletext,styles.back]}>部位</Text>
          </View>
          <List style={styles.whitebackground}> 
              <ListItem style={styles.ListItemtype} first>
                <Text style={styles.labelwidth}>三层</Text>
                <Text note style={styles.f16}>框剪结构</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.labelwidth}>三层</Text>
                <Text note style={styles.f16}>框剪结构</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.labelwidth}>三层</Text>
                <Text note style={styles.f16}>框剪结构</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.labelwidth}>三层</Text>
                <Text note style={styles.f16}>框剪结构</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype} >
                <Text style={styles.labelwidth}>三层</Text>
                <Text note style={styles.f16}>框剪结构</Text>
              </ListItem>
              <ListItem style={styles.ListItemtype} last>
                <Text style={styles.labelwidth}>三层</Text>
                <Text note style={styles.f16}>框剪结构</Text>
              </ListItem>
          </List>
        </Content>
      </Container>
    );
  }


};

  