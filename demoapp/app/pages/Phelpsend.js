import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Phelpsend extends Component {
  constructor(props) {
    super(props); 
    main.init('Phelpsend',this);  
    sco = this;
  }


  render() {

   
    
    return (
        <Container>
           <HeadNav headerText='帮助反馈'/>

          <View>
            <TextInput 
            value={sco.com_editadd.params.content}
            onChangeText={(text) =>{sco.ysinput(sco,'com_editadd.params.content',text)}}
            style={styles.HelpAsk} multiline={true} placeholder='请输入您的建议和问题' underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'/>
            <Button block light style={{margin:10,marginTop:30,borderRadius:5}} 
            onPress={() => {sco.comtime('com_editadd')}}>
              <Text style={{fontSize:18}}>提交</Text>
            </Button>
          </View>             
        </Container>
    )
  }
}

  