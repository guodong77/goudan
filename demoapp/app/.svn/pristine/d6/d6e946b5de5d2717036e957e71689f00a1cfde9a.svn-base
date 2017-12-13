import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,Switch,List,ListItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Addrole extends Component {
  constructor(props) {
    super(props); 
    main.init('Addrole',this); 
    sco = this;
  }
  
  render() {

    return (
      <Container>
          <HeadNav 
          headerText='添加角色'
          headerRight='完成'
          fn={()=>{alert(1)}}
        />
        <Content >
          <List style={styles.whitebackground}> 
              <ListItem style={styles.ListItemtype} first>
                <Text style={styles.labelwidth}>角色名称</Text>
                <Input placeholder="请输入角色名称" 
                placeholderTextColor='#CCC'/>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.labelwidth}>模块名称</Text>
                <Input placeholder="请输入部位名称" 
                placeholderTextColor='#CCC' />
              </ListItem>
              <ListItem style={[styles.ListItemtype,styles.worktimeRow]}>
                <Text style={styles.labelwidth}>查看</Text>
                <Switch value={false} onTintColor="#50B948" />
              </ListItem>
              <ListItem style={[styles.ListItemtype,styles.worktimeRow]} last>
                <Text style={styles.labelwidth}>管理</Text>
                <Switch value={false} onTintColor="#50B948" />
              </ListItem>
          </List> 
        </Content>
      </Container>
    );
  }


};

  