import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Teditedlist extends Component {
  constructor(props) {
    super(props); 
    main.init('Teditedlist',this);  
    sco = this;
  }

  render() {
    return (
      <Container>
                <HeadNav 
                headerText='工程概况'
              />
        <Content style={styles.whitebackground}>
          <List
            dataArray={sco.datas}
            renderRow={data =>
              <ListItem style={styles.worktimeRow} button   onPress={Actions[data.route]} >
              <Left style={styles.xjuzhong}>
                <Image style={{width:30,height:30}} source={data.url}/>   
                <Text>   
                  {data.text}
                </Text>
              </Left>
              <Right >      
                <Image source={require('../public/img/more.png')}/>      
              </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }


};

  