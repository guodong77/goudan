import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Pchangestatus extends Component {
  constructor(props) {
    super(props); 
    main.init('Pchangestatus',this); 
    sco = this;
  }


  render() {

    
    return (
        <Container>
        <HeadNav 
            headerText='切换身份'
          
        />
           {/* <View style={styles.BuildTop}>
            <View>
            <TouchableHighlight onPress={() => {Actions.Personal({name: 'Brent'})}} >
                  <Image source={require('../public/img/返回03.png')} />
              </TouchableHighlight>
            </View>
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>切换身份</Text>
          </View>  */}

          <View style={[styles.MyresumeMiddle,styles.chooseMB]}>
                            <View style={[styles.PersonalCardMsg,styles.MyresumeMiddleMsg]}>
                              <Text style={styles.chooseID}>牛人</Text>
                              <View>
                                <Image source={require('../public/img/choose.png')}/>
                              </View>
                            </View>
                            <View style={[styles.PersonalCardMsg,styles.MyresumeMiddleMsg]}>
                              <Text style={styles.chooseID}>boss</Text>
                            </View>
                        </View> 
        </Container>
    )
  }
}

  