import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class EditName extends Component {
  constructor(props) {
    super(props); 
    main.init('EditName',this); 
    sco = this;
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
        <Container>
              <Header style={{backgroundColor:'#5C9EFD'}}>
                    <Button transparent>
                        <Text onPress={() => {navigate('Personal', {name: 'Brent'})}} style={styles.PcomTitleText}>取消</Text>
                    </Button>

                    <Title style={[styles.PcomTitle,styles.PcomZiTitle]}>编辑昵称</Title>

                    <Button transparent>
                      <Text style={styles.PcomTitleText}>完成</Text>
                    </Button>
              </Header>  

              <InputGroup style={{backgroundColor:'#fff',marginTop:20,paddingRight:10}}>
                        <Input  />
                        <Image source={require('../public/img/icon-取消02.png')} />
              </InputGroup>
        </Container>
    )
  }
}

  