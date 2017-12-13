import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Phelpdetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Phelpdetail',this); 
    sco = this;
  }


  render() {

    const { navigate } = this.props.navigation;
    
    return (
        <Container>
           <View style={styles.BuildTop}>
            <View>
              <TouchableHighlight  onPress={() => {navigate('Phelplist', {name: 'Brent'})}} >
                  <Image source={require('../public/img/返回03.png')} />
              </TouchableHighlight>
            </View>
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>帮助反馈</Text>
          </View> 

          <View style={styles.AskList}>
          <CardItem style={{height:52,justifyContent:'space-between'}}> 
                              <View>
                                <Text style={{fontSize:16,width:300,color:'#333',fontWeight:'bold'}}>有什么为看得见的快乐公全称？</Text>
                              </View>
                             </CardItem>
  
             <View style={styles.HelpDetail}>
              <Text>1.还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题
              </Text>
              <Text>2.还有其他问题还有其他问题还有其他问题还有其他问题还有其他问题</Text>
             </View>

          </View>             
        </Container>
    )
  }
}

  