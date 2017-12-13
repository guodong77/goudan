import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pcollect extends Component {
  constructor(props) {
    super(props); 
    main.init('Pcollect',this); 
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
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>我的收藏</Text>
          </View> 
          <ScrollView>
          <View style={styles.BuildContent}>
                <View style={styles.BuildPersonal}>
                <Image  source={require('../public/img/头像.png')} />
                  <View style={styles.BuildPersonalText}>
                    <View style={{flexDirection:'row',width:100}}>
                      <Text style={styles.BuildPersonalName}>item.key</Text>
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
            </View>
          </View>

          <View style={styles.BuildContent}>
              <View style={styles.BuildPersonal}>
                <Image  source={require('../public/img/头像.png')} />
                  <View style={styles.BuildPersonalText}>
                    <View style={{flexDirection:'row',width:100}}>
                      <Text style={styles.BuildPersonalName}>item.key</Text>
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

            <View style={styles.BuildComentDetail}>
              <View style={styles.Coment}>
                <Text style={styles.ComentBlue}>小明：</Text><Text>我是加我很快就静安寺你看</Text>
              </View>
              <View style={styles.Coment}>
              <Text style={styles.ComentBlue}>小明</Text><Text>回复</Text>
              <Text style={styles.ComentBlue}>王小花：</Text><Text>静安寺你看</Text>
              </View>
              <View style={styles.Coment}>
                <Text style={styles.ComentBlue}>小明：</Text><Text>孔大萨阿萨帝</Text>
              </View>
              <Text style={[styles.ComentBlue,styles.ComentCheck]}>查看全部110条评论></Text>
            </View>
            </View>

           <View style={styles.BuildAskContentTop}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:20,color:'#343434',width:300,marginBottom:5}}>item.key</Text>
                  <View style={styles.BuildPersonalXiala}>
                      <TouchableHighlight  style={{marginLeft:30,marginTop:5}}>
                        <Image  source={require('../public/img/叉叉.png')} />
                      </TouchableHighlight>
                  </View>
                </View>
                <Text style={styles.BuildAskContent} onPress={() => {navigate('Baskdetail', {name: 'Brent'})}}>This source code is licensed under the BSD-style license found in the
                    LICENSE file in the root directory of this source tree. 
                </Text>
                <View style={styles.BuildAskContentImg}>
                  <View style={styles.BuildAskContentHeadImg}>
                    <Text>20人参与</Text>
                  </View>
                  <View>
                    <Text>2017-08-27</Text>
                  </View>   
                </View>
            </View>
          </ScrollView>
          
        </Container>
    )
  }
}

  