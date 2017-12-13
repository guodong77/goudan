import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class EditPhone extends Component {
  constructor(props) {
    super(props); 
    main.init('EditPhone',this);  
    sco = this;
    sco.state={
      color:'#CDCDCD',
      backgroundColor:'#E5E5E5'
    }
  }

  setInputValue() {
    sco.setState({
      color:'#fff',
      backgroundColor:'#32AAFD'
    });
  }

  render() {



    return (
        <Container>
                      <HeadNav 
                      headerText='修改手机号码'
                      headerRight='完成'
                      fn={()=>{alert(1)}}
                    />
              <View style={styles.PhoneView}>
                <Text>当前绑定手机号</Text>
                <Text style={styles.PhoneText}>13020220339</Text>
              </View>

              <InputGroup style={styles.ChangePhoneInput} >
                        <Input placeholder="新手机号" placeholderTextColor='#D6D6D6' onFocus={() => {sco.setInputValue()}} />
                        <Text style={{color:'#D6D6D6'}}>|</Text>
                        <Text  style={styles.GetCode}>获取验证码</Text>
              </InputGroup>
              <InputGroup style={styles.ChangePhoneInput} >
                        <Input placeholder="请输入验证码" placeholderTextColor='#D6D6D6' />
              </InputGroup>
              <InputGroup style={[styles.ChangePhoneInput,styles.ChangePhoneInputOK]} backgroundColor={sco.state.backgroundColor}>
                        <Text style={{color:sco.state.color,fontSize:18}}>完成</Text>
              </InputGroup>
        </Container>
    )
  }
}

  