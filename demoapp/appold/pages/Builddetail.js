import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,FlatList,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';

let sco = {}
export default class Builddetail extends Component {
  constructor(props) {
    super(props);    
    main.init('Builddetail',this); 
    sco = this;
    sco.SC = {
      showText: false,
    };
  }


  showXiala(){
    sco.setState({showText:!sco.state.showText});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View> 
      {/*主页头部*/}
          <View style={styles.BuildTop}>
            <View style={styles.BuildTopSearch} >
              <TouchableOpacity  onPress={() => {sco.ysnav.goBack()}}>
                  <Image source={require('../public/img/返回03.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.BuildDatailText}>动态详情</Text>
            <View style={styles.BuildTopTmg}>
              <TouchableOpacity>
                <Image  source={require('../public/img/三点01.png')} />
              </TouchableOpacity>
            </View>
          </View> 

      <ScrollView style={styles.BuildAsk}>
             <View style={styles.BuildContent}>
                <View style={styles.BuildPersonal}>
                  <Image  source={require('../public/img/头像.png')} />
                    <View style={styles.BuildPersonalText}>
                      <Text style={styles.BuildPersonalName}>item.key</Text>
                      <Text style={styles.BuildPersonalMsg}>ui设计师</Text>
                    </View>
                    <View style={styles.BuildPersonalXiala}>
                      <TouchableOpacity style={styles.BuildPersonalImg} onPress={() => {sco.showXiala()}}>
                        <Image  source={require('../public/img/下拉.png')} />
                      </TouchableOpacity>
                  {sco.SC.showText?
                    <View style={styles.Xiala}>
                                <View style={styles.XialaTop}>
                                  <Text style={styles.XialaText}>收藏</Text>
                                </View>
                                <Text style={styles.XialaText}>举报</Text>
                              </View>:null
                            }
                    </View>
                </View>

              <View style={styles.BuildDetail}>
                <Text numberOfLines={3} style={styles.BuildDetailText}>虽然常用的JS编辑器很多，但由于RN大量使用和es6语法，目前只有sublime text通过插件和本webstorm（10以上版本）提供了良好的支持。笔者推荐webstorm，因为它有更完善的语法提示和补全。另外虽然主要的业务逻辑是使用js开发，但仍然要依赖于原生的编译/调试环境，所以你还需要同时运行Xcode（iOS）或Android Studio（android）等。
                </Text>
                <View style={[styles.BuildDetailView,{marginBottom:20,marginTop:10}]}>
                  <Image style={styles.BuildDetailImg} source={require('../public/img/img-1.png')}></Image>
                  <Image style={[styles.BuildDetailImg,styles.BuildDetailMiddle]} source={require('../public/img/img-2.png')}></Image>
                  <Image style={styles.BuildDetailImg} source={require('../public/img/img-3.png')}></Image>
                </View>
              </View>
            </View>

            <View style={styles.BuildDetailComentTop}><Text >全部评论</Text><Text >(100)</Text></View>
            <FlatList
            onRefresh={this.refreshing}
            refreshing={true}
            style={{marginBottom:100}}
            data={sco.SCC.data}
            renderItem={({item}) =>
            <View style={styles.BuildDetailComent}>
                <View style={[styles.BuildPersonal,styles.BuildContainer]}>
                  <Image  source={require('../public/img/头像.png')} />
                    <View style={styles.BuildPersonalText}>
                      <Text style={styles.BuildPersonalName}>{item.key}</Text>
                      <Text style={styles.BuildPersonalMsg}>ui设计师</Text>
                    </View>
                    <View style={[styles.BuildPersonalXiala,styles.BuildDetailZan]}>
                      <TouchableOpacity onPress={() => {sco.ChangeImg(sco.SCC,item.id)}} style={[styles.BuildPersonalImg,styles.BuildDetaildianzan,{marginLeft:120}]} >
                        <Image  source={item.url} />
                      </TouchableOpacity>
                      <Text>100</Text>
                    </View>
                </View>

                <Text style={styles.BuildDetailComentText}>This source code is licensed under the BSD-style license found in the
                    LICENSE file in the root directory of this source tree. </Text>

            </View>
            }/>   
          </ScrollView>
          <View style={styles.BuildDetailEdit}>
              <Image  source={require('../public/img/编辑.png')} />
              <TextInput underlineColorAndroid="transparent" placeholderTextColor ='#cccccc' placeholder='我也来说两句' style={styles.BuildDetailInput}></TextInput>
              <Image  source={require('../public/img/点赞04.png')} />
              <Image style={styles.BuildDetailShare}  source={require('../public/img/转发03.png')} />
            </View>
        </View>
    )
  }
}

  