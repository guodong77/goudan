import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pwantwork extends Component {
  constructor(props) {
    super(props); 
    main.init('Pwantwork',this); 
    sco = this;
  }


  render() {

    const { navigate } = this.props.navigation;
    
    return (
        <Container>
           <View style={styles.BuildTop}>
            <View>
              <TouchableHighlight  onPress={() => {navigate('Pmyresume', {name: 'Brent'})}} >
                  <Image source={require('../public/img/返回03.png')} />
              </TouchableHighlight>
            </View>
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>求职意向</Text>
          </View> 
          <View style={styles.workBg}>
            <View style={styles.work}>
                              <View style={{flexDirection:'column'}}>
                                <Text style={styles.MyresumeFS}>[地区]职位</Text>
                                <Text style={{color:'#999',fontSize:14,}}>薪资</Text>
                              </View>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={styles.work}>
                              <View style={{flexDirection:'column'}}>
                                <Text style={styles.MyresumeFS}>[深圳]UI设计</Text>
                                <Text style={{color:'#999',fontSize:14,}}>面议</Text>
                              </View>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
    
                      <Button block info style={styles.workButton}>
                        <Text style={{color:'#fff'}}>添加期望职位</Text>
                      </Button>
          </View>
        </Container>
    )
  }
}

  