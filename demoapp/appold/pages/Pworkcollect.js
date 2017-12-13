import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pworkcollect extends Component {
  constructor(props) {
    super(props); 
    main.init('Pworkcollect',this); 
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
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>职位收藏</Text>
          </View> 
          <FlatList
            data={[{key: '设计师'}, {key: '工程师'}]}
            renderItem={({item}) => 
          <View style={styles.CollectList}>
           <View style={styles.CollectListTop}>
            <Text style={styles.CollectTitle}>{item.key}</Text>
            <Text style={styles.CollectScary}>6-7K</Text>
           </View>

           <View>
            <Text>宇杉科技</Text>
           </View>

           <View style={styles.CompanyMsg}>
            <Image source={require('../public/img/dizhi.png')} />
            <Text style={styles.CompanyText}>深圳 南山</Text>
            <Image source={require('../public/img/jingyan.png')} />
            <Text style={styles.CompanyText}>3-5年</Text>
            <Image source={require('../public/img/xueli.png')} />
            <Text style={styles.CompanyText}>大专</Text>
           </View>

           <View style={styles.CompanyMsg}>
            <Image source={require('../public/img/hengdaotu.png')} />
            <Text style={styles.PersonalMsg}>王小虎</Text><Text>|</Text>
            <Text style={styles.PersonalMsg}>人力资源</Text>
           </View>
          </View>}
          />

        </Container>
    )
  }
}

  