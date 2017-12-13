import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pnotice extends Component {
  constructor(props) {
    super(props); 
    main.init('Pnotice',this); 
    sco = this;
  }


  render() {

    const { navigate } = this.props.navigation;
    
    return (
        <Container>
          <View style={styles.BuildTop}>
            <View>
              <TouchableHighlight  onPress={() => {navigate('Personal', {name: 'Brent'})}} >
                  <Image source={require('../public/img/返回03.png')} />
              </TouchableHighlight>
            </View>
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>系统通知</Text>
          </View> 
          <ScrollView>
            <FlatList
            onRefresh={this.refreshing}
            refreshing={true}
            data={[{key: '09-05'}, {key: '09-04'},{key: '09-03'},{key: '09-02'}]}
            renderItem={({item}) =>

            <View style={styles.NoticeList}>
              <Image style={styles.NoticeIcon} source={require('../public/img/news.png')} />
              <View style={styles.NoticeContent}>
                <Text style={styles.NoticeContentTop}>系统通知</Text>
                <Text style={styles.NoticeContentDetail}>您的验证已被审核通过</Text>
                <Text style={styles.NoticeDate}>{item.key}</Text>
              </View>
            </View>
          }/>
          </ScrollView>
        </Container>
    )
  }
}

  