import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
let sco = {}
import HeadNav from '../components/HeadNav';
export default class Pnotice extends Component {
  constructor(props) {
    super(props); 
    main.init('Pnotice',this); 
    sco = this;
  }
    forRow(rowData){
       let value = rowData.item;
       return (
        <View style={[styles.NoticeList,{paddingRight:50,}]}>
        <Image style={styles.NoticeIcon} source={require('../public/img/news.png')} />
        <View style={[styles.NoticeContent,{paddingRight:20,}]}>
          <Text style={styles.NoticeContentTop}>系统通知</Text>
          <Text style={[styles.NoticeContentDetail,{paddingRight:50,}]}>{value.content}</Text>
          <Text style={styles.NoticeDate}>{value.createtime}</Text>
        </View>
      </View>
            )
     }
  render() {

    return (
        <Container>
          <HeadNav headerText='系统通知'/>
          <FlatList
            key = {1}
            data={sco.com_list.data}
            renderItem={sco.forRow} 
            onEndReached={(info)=>{
              sco.comtime('com_list_page');
            }
            }
            onEndReachedThreshold={0.2}
            refreshing={false}
            onRefresh={()=>{sco.type = 0;sco.comtime('com_list_page'); }}
          />
        </Container>
    )
  }
}