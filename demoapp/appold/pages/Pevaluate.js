import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pevaluate extends Component {
  constructor(props) {
    super(props); 
    main.init('Pevaluate',this); 
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
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>自我评价</Text>
          </View> 
          <View>

            <TextInput style={styles.HelpAsk} onFocus={sco.ShowPlaceholder} multiline={true} underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'
            />
            <Button block info style={{backgroundColor:'#32AAFD',
                                                  borderRadius:5,
                                                  margin:10,
                                                  position:'absolute',
                                                  width:360,
                                                  top:180}}>
                        <Text style={{color:'#fff',fontSize:14}}>保存</Text>
                      </Button>
          </View>
        </Container>
    )
  }
}

  