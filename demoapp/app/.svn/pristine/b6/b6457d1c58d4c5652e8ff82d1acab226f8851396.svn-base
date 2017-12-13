import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Title,List,ListItem,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Sendnotice extends Component {
  constructor(props) {
    super(props); 
    main.init('Sendnotice',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
                <HeadNav 
                headerText='公告详情'
                headerRight='发送'
                fn={()=>{alert(1)}}
              />
        <Content style={styles.whitebackground}>
          <List> 
              <ListItem style={styles.ListItemtype} first>
                <Text style={styles.notetext}>收件人：</Text>
                <Input/>
                <TouchableOpacity onPress={Actions.Chooseperson}>
                <Image  source={require('../public/img/tianjia.png')} />
                </TouchableOpacity>
              </ListItem>
              <ListItem style={styles.ListItemtype}>
                <Text style={styles.notetext}>标题：</Text>
                <Input/>

                <Text style={styles.notetext}>0/30</Text>
              </ListItem>
              <View>
                <Textarea  multiline={true}
                blurOnSubmit={true}
                returnKeyType ='done'
                placeholder="请输入内容"
                placeholderTextColor='#CCCCCC'
                style={[styles.textareaheight,styles.f16,styles.ml12]}
                underlineColorAndroid="transparent" />
              </View>
              
          </List> 
        </Content>
      </Container>
    );
  }


};

  