import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight,FlatList}from 'react-native';
import { Actions } from 'react-native-router-flux';

let sco = {}
export default class Basklist extends Component {
  constructor(props) {
    super(props); 
    main.init('Basklist',this); 
    sco = this;
  }

  forRow({item}){
    return (
      <View style={styles.BuildAskContentTop}>
        <Text style={styles.BuildAskContent} onPress={()=>{Actions.Baskdetail(),sco.getid(item.id);}}>{item.description}</Text>
        <Image style={styles.BuildAskImg} source={{uri:item.headimg}} />
        <View style={styles.BuildAskContentImg}>
          <View style={styles.BuildAskContentHeadImg}>
            <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
            <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
            <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
            <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
            <Text>20人参与</Text>
          </View>
          <View>
            <Image style={styles.BuildAskContentAs} source={require('../public/img/回答.png')} />
          </View>
        </View>
      </View>
    )
  }

  render() {
    return <FlatList 
            data={sco.com_list.data}
            renderItem={sco.forRow}
            style={{ marginBottom: 50 }}
            onEndReached={(info) => {
                sco.comtime('com_list_page');
              }
            }
            onEndReachedThreshold={0.2}
            refreshing={false}
            onRefresh={() => {sco.type = 0; sco.comtime('com_list_page'); }}
          />
  }
}

  