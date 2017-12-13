import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pneed extends Component {
  constructor(props) {
    super(props); 
    main.init('Pneed',this); 
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
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>我的需求</Text>
          </View> 

         <FlatList
                  data={[{key: '一个小小'}, {key: 'ui设计师'},{key: '前端工程师'},{key: 'we'},{key: 'va'}]}
                  renderItem={({item}) => 
             <View style={styles.BuildContent}>
                <View style={styles.BuildPersonal}>
                <Image  source={require('../public/img/头像.png')} />
                  <View style={styles.BuildPersonalText}>
                    <View style={{flexDirection:'row',width:100}}>
                      <Text style={styles.BuildPersonalName}>{item.key}</Text>
                      <Text style={{marginTop:8,fontSize:12,marginLeft:5,color:'#ABABAB'}}>小小设计师</Text>
                    </View>
                    <Text style={styles.BuildPersonalMsg}>17-09-27</Text>
                  </View>
                  <View style={styles.BuildPersonalXiala}>
                    <TouchableHighlight  style={{marginLeft:158}}>
                      <Image  source={require('../public/img/叉叉.png')} />
                    </TouchableHighlight>
                          
                  </View>
                
              </View>

            <View style={styles.BuildDetail}>
                <Text numberOfLines={3} style={styles.BuildDetailText}>React Native lets you build mobile apps using only JavaScript. It uses the same design as React, letting you compose</Text> 
            </View>

            <View style={styles.NeedDetail}>
              <View style={styles.NeedDetailTag}>
                <Text style={styles.NeedDetailTagText}>技术需求</Text>
              </View>
              <View style={styles.NeedDetailTag}>
                <Text style={styles.NeedDetailTagText}>技术需求</Text>
              </View>
              <View style={styles.NeedDetailTag}>
                <Text style={styles.NeedDetailTagText}>技术需求</Text>
              </View>
              <Text style={styles.NeedDetailTime}>100min前</Text>
            </View>
          </View>

           }/>
        </Container>
    )
  }
}

  