import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Phelplist extends Component {
  constructor(props) {
    super(props); 
    main.init('Phelplist',this); 
    sco = this;
  }


  render() {

 
    
    return (
        <Container>
           <HeadNav headerText='帮助反馈'/>

          <View style={styles.AskList}>
            <FlatList
            onRefresh={this.refreshing}
            refreshing={true}
            data={[{key: '有什么为看得见的快乐公全称？'}, {key: '有什么为得见的快乐公司全称？'},
            {key: '什么为看得见快乐公司全称？'},{key: '有什为看得见的快乐公司全称？'},
            {key: '什么为看得见的快乐司全称？'},{key: '有什为看得的快乐公司全称？'},
            {key: '什么为看见的快乐公司全称？'},{key: '有什为看得的快乐公全称？'},
            ]}
            renderItem={({item}) =>
          <CardItem style={{height:52,justifyContent:'space-between'}}> 
                              <View>
                                <Text style={{fontSize:16,width:300}}>{item.key}</Text>
                              </View>
                              <View>
                  <TouchableHighlight onPress={() => {Actions.Phelpdetail({name: 'Brent'})}}>
                                <Icon style={{color:'#ccc',marginLeft:45}} name="ios-arrow-forward" />
                              </TouchableHighlight>
                              </View>
                             </CardItem>
             }/>   

             <View style={styles.HelpButtom}>
            <Text onPress={() => {Actions.Phelpsend({name: 'Brent'})}}  style={styles.HelpButtomText}>还有其他问题？</Text>
             </View>

          </View>             
        </Container>
    )
  }
}

  