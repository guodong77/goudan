import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pgowork extends Component {
  constructor(props) {
    super(props); 
    main.init('Pgowork',this); 
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
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>面试邀请</Text>
          </View> 

          <View style={styles.GoWork}>
            <Text style={[styles.GoWorkType,sco.tapshow == 0?styles.WorkActive:'']} onPress={() => {sco.funtapshow(0)}}>待面试</Text>
            <Text style={[styles.GoWorkType,sco.tapshow == 1?styles.WorkActive:'']} onPress={() => {sco.funtapshow(1)}}>已结束</Text>
          </View> 
          {sco.tapshow == 0&&
            <FlatList
            data={[{key: '等待面试'}, {key: '面试待接受'}]}
            renderItem={({item}) => 
            <View style={styles.Joblist}>
              <View>
                <TouchableHighlight>
                  <Image source={require('../public/img/Avatar.png')}/>
                </TouchableHighlight>
              </View>
              <View style={styles.PersonalName}>
                <Text style={styles.PName}>张三胖</Text>
                <Text>UI设计师</Text>
              </View>
              <View style={styles.JobContent}>
                 <Text style={styles.JobContentDetail}>{item.key}</Text>
                 <Text>09月09日</Text>
              </View>
           </View>}
          />
          }
          {sco.tapshow == 1&&
            <FlatList
            data={[{key: '面试未接受'}, {key: '面试已取消'},{key: '面试已完成'}]}
            renderItem={({item}) => 
            <View style={styles.Joblist}>
              <View>
                <TouchableHighlight>
                  <Image source={require('../public/img/Avatar.png')}/>
                </TouchableHighlight>
              </View>
              <View style={styles.PersonalName}>
                <Text style={styles.PName}>张三胖</Text>
                <Text>UI设计师</Text>
              </View>
              <View style={styles.JobContent}>
                 <Text style={[styles.JobContentDetail,styles.changeColor]}>{item.key}</Text>
                 <Text>09月09日</Text>
              </View>
           </View>}
          />
          }

                  
        </Container>
    )
  }
}

  