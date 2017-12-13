import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pmyresume extends Component {
  constructor(props) {
    super(props); 
    main.init('Pmyresume',this); 
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
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>我的简历</Text>
          </View> 

          <View style={styles.ResumeMsg}>

                            <View style={styles.Myresume}>
                                <Image style={{marginRight:10,marginTop:-30}} source={require('../public/img/Avatar.png')}/>
                                <View style={styles.PersonalCardText}>
                                  <Text style={{color:'#333',fontSize:18,marginBottom:5}}>王小明</Text>
                                  <Text>职位：深圳宇杉科技有限公司xx</Text>
                                  <Text>电话：123344545</Text>
                                  <Text>邮箱：wwqjqerrq@163.com</Text>
                                </View>
                             <TouchableHighlight onPress={() => {navigate('Pinfo', {name: 'Brent'})}}>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                              </TouchableHighlight>
                            </View>
                     </View> 
                              
                          <View style={[styles.MyresumeMiddle,styles.MB]}>
                            <View style={[styles.PersonalCardMsg,styles.MyresumeMiddleMsg]}>
                              <Text style={styles.MyresumeFS}>附件简历</Text>
                              <View>
                                <Text style={{fontSize:17}}>（请到电脑端上传）暂无</Text>
                              </View>
                            </View>
                            <TouchableHighlight onPress={() => {navigate('Pevaluate', {name: 'Brent'})}}>
                            <View style={styles.MyresumeMiddleMsg}>
                              <Text style={styles.MyresumeFS}>自我评价</Text>
                              <View>
                                <Image source={require('../public/img/next.png')}/>
                              </View>
                            </View>
                            </TouchableHighlight>
                        </View> 

                        <Button full style={styles.MyresumeButton} onPress={() => {navigate('Pwantwork', {name: 'Brent'})}}>
                          <Text style={styles.MyresumeText}>+求职意向</Text>
                        </Button>
                        <Button full style={styles.MyresumeButton} onPress={() => {navigate('Pworktime', {name: 'Brent'})}}>
                          <Text style={styles.MyresumeText}>+工作经验</Text>
                        </Button>
                        <Button full style={styles.MyresumeButton} onPress={() => {navigate('Pstudytime', {name: 'Brent'})}}>
                          <Text style={styles.MyresumeText}>+教育经验</Text>
                        </Button>
          
        </Container>
    )
  }
}

  