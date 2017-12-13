import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Phelpsend extends Component {
  constructor(props) {
    super(props); 
    main.init('Phelpsend',this);  
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

          <View>
            <TextInput style={styles.HelpAsk} multiline={true} onFocus={sco.ShowHelpButton} placeholder='请输入您的建议和问题' underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'/>
            <Button block light style={{margin:10,marginTop:30,borderRadius:5,backgroundColor:sco.SC.backgroundColor}}>
              <Text style={{color:sco.SC.color,fontSize:18}}>提交</Text>
            </Button>
          </View>             
        </Container>
    )
  }
}

  