
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,FlatList,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content,Button,} from 'native-base';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Report extends Component {
  constructor(props) {
    super(props); 
    main.init('Report',this); 
    sco = this;
  }
  render() {
    return (
        <View>
            <HeadNav 
                headerText='举报'
            /> 
        </View>
    )
    }
}