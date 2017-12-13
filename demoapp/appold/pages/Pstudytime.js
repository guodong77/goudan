import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pstudytime extends Component {
  constructor(props) {
    super(props); 
    main.init('Pstudytime',this); 
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
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>教育经历</Text>
          </View> 
          <View style={styles.workBg}>

            <View style={styles.work}>
                                <Text style={styles.MyresumeFS}>学校</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workMsg]}>
                                <Text style={styles.MyresumeFS}>专业</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workMsg]}>
                                <Text style={styles.MyresumeFS}>学历</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workMsg]}>
                                <Text style={styles.MyresumeFS}>开始时间</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workMsg]}>
                                <Text style={styles.MyresumeFS}>结束时间</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
            <View style={[styles.work,styles.workDescipt]}>
                                <Text>经历描述</Text>
            </View>

            <TextInput style={styles.HelpAsk}  onFocus={sco.ShowPlaceholder} multiline={true} underlineColorAndroid="transparent" placeholderTextColor ='#cccccc'
            />
            {sco.SC.placeholder?
            <View style={styles.placeholder}>
              <View>
                <Text style={styles.workContent}>描述一下吧</Text>
              </View>

            </View>:null
            }
                      <Button block info style={{backgroundColor:sco.SC.backgroundColor,
                                                  borderRadius:5,
                                                  margin:10,
                                                  position:'absolute',
                                                  width:360,
                                                  top:440}}>
                        <Text style={{color:sco.SC.color,fontSize:14}}>保存</Text>
                      </Button>
          </View>
        </Container>
    )
  }
}

  