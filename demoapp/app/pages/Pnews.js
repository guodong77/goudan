import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,FlatList,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {}
export default class Pnews extends Component {
  constructor(props) {
    super(props); 
    main.init('Pnews',this); 
    sco = this;
  }


  render() {
    return (
        <Container>
          <HeadNav headerText='我的动态'/>

          <FlatList
            onRefresh={this.refreshing}
            refreshing={true}
            data={[{key: '一个小小'}, {key: '设计师'},{key: '前端工程师'},{key: 'we'},{key: 'va'}]}
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
                    <TouchableHighlight  style={{marginLeft:145}}>
                      <Image  source={require('../public/img/叉叉.png')} />
                    </TouchableHighlight>
                          
                  </View>
                
              </View>

            <View style={styles.BuildDetail}>
              <View style={styles.BuildDetailTextView}>
                <Text numberOfLines={3} style={styles.BuildDetailText} onPress={() => {navigate('Builddetail', {name: 'Brent'})}}>虽然常用的JS编辑器很多，但由于RN大量使用和es6语法，目前只有sublime text通过插件和本webstorm（10以上版本）提供了良好的支持。笔者推荐webstorm，因为它有更完善的语法提示和补全。另外虽然主要的业务逻辑是使用js开发，但仍然要依赖于原生的编译/调试环境，所以你还需要同时运行Xcode（iOS）或Android Studio（android）等。
                </Text>
                <Text style={styles.BuildAllText}>查看全文</Text>
              </View>

              <View style={styles.BuildDetailView}>
                <Image style={styles.BuildDetailImg} source={require('../public/img/img-1.png')}></Image>
                <Image style={[styles.BuildDetailImg,styles.BuildDetailMiddle]} source={require('../public/img/img-2.png')}></Image>
                <Image style={styles.BuildDetailImg} source={require('../public/img/img-3.png')}></Image>
              </View>
            </View>
            <View style={styles.BuildClient}>
              <View style={styles.BuildClientImg}>
                <TouchableHighlight onPress={() => {sco._onPress()}}>
                  <Image source={require('../public/img/点赞03.png')}></Image>
                </TouchableHighlight>
              </View>
              <Text>110</Text>
              <View style={[styles.BuildClientImg,styles.BuildSend]}>
                <TouchableHighlight onPress={() => {sco.setModalShare(true)}}>
                  <Image   source={require('../public/img/转发.png')}></Image>
                </TouchableHighlight>
              </View>
              <Text>110</Text>
              <Image style={[styles.BuildClientImg,styles.BuildComent]}  source={require('../public/img/评论.png')}></Image>
              <Text>110</Text>
            </View>


            </View>
            }/>
        </Container>
    )
  }
}

  