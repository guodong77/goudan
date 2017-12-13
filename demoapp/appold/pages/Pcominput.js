import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pcominput extends Component {
  constructor(props) {
    super(props); 
    main.init('Pcominput',this);  
    sco = this;
    sco.state = {modalVisible: false};
  }

  render() {
    const { navigate } =sco.props.navigation;
    return (
      <View>
        <View style={styles.BuildTop}>
            <Text style={styles.NewTopText} onPress={() => {navigate('Pmyconpany', {name: 'Brent'})}}>取消</Text>
            <Text style={[styles.NewTopText,styles.NewTopSend]}>公司全称</Text>
            <Text style={styles.NewTopText}>完成</Text>
        </View> 
         <InputGroup style={{backgroundColor:'#fff',marginTop:20,paddingRight:10}}>
                        <Input  />
                        <Image source={require('../public/img/icon-取消02.png')} />
              </InputGroup>
      </View>
    )
  }
}

  