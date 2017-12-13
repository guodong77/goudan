import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pmyconpany extends Component {
  constructor(props) {
    super(props); 
    main.init('Pmyconpany',this); 
    sco = this;
  }


  render() {

    const { navigate } = this.props.navigation;
    
    return (
        <Container>
           <Header style={{backgroundColor:'#5C9EFD'}}>
                    <Button transparent>
                        <Text onPress={() => {navigate('Personal', {name: 'Brent'})}} style={styles.PcomTitleText}>取消</Text>
                    </Button>

                    <Title style={[styles.PcomTitle,styles.PcomZiTitle]}>我的公司</Title>

                    <Button transparent>
                      <Text style={styles.PcomTitleText}>完成</Text>
                    </Button>
              </Header>  

                <View style={styles.MyCompanyBg}>
                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>公司logo</Text>
                              <Right style={styles.MyCompany}>
                              <TouchableHighlight  onPress={() => {sco.Showlogo(true)}} >
                                <Image style={styles.PersonalTopImg} source={require('../public/img/gclogo.png')}/>
                              </TouchableHighlight>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>公司全称</Text>
                              <Right style={styles.MyCompanyName}>
                                <Text onPress={() => {navigate('Pcominput', {name: 'Pcominput'})}} style={{marginRight:5}}>深圳宇杉</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>公司规模</Text>
                              <Right style={styles.MyCompanyCount}>
                                <Text onPress={() => {navigate('EditName', {name: 'Brent'})}} style={{marginLeft:3,marginRight:10}}>0-20</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>融资阶段</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text style={{marginLeft:-15,marginRight:5}}>暂无</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>                   
                      </View>
           <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.logo}
             onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={[styles.TalkContainer,styles.NewImgBody]}>
              <View style={styles.NewImgContainer}>
                <Text style={[styles.NewImgChoose,styles.NewImgPhoto]}>拍照</Text>
                <Text style={styles.NewImgChoose}>从手机相册选择</Text>
              </View>
              <View style={styles.NewImgContainer}>
                 <Text style={styles.NewImgChoose}  onPress={() => {sco.Showlogo(false)}}>取消</Text>
              </View>
            </View>
          </Modal>
        </Container>
    )
  }
}

  