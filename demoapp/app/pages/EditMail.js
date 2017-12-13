import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class EditMail extends Component {
  constructor(props) {
    super(props); 
    main.init('EditMail',this); 
    sco = this;
  }

  render() {



    return (
        <Container>
                     <HeadNav 
                     headerText='编辑邮箱'
                     headerRight='完成'
                     fn={()=>{alert(1)}}
                   />
              <InputGroup style={{backgroundColor:'#fff',marginTop:20,paddingRight:10}}>
                        <Input  />
                        <Image source={require('../public/img/icon-取消02.png')} />
              </InputGroup>
        </Container>
    )
  }
}

  