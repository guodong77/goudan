import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,FlatList,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';

let sco = {}
export default class Baskdetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Baskdetail',this); 
    sco = this;
    sco.state = {
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
              <TouchableHighlight  onPress={() => {sco.ysnav.goBack()}} >
                  <Image source={require('../public/img/返回03.png')} />
              </TouchableHighlight>
            </View>
            <Text style={styles.BuildDatailText}>问答详情</Text>
            <View style={styles.BuildTopTmg}>
              <TouchableHighlight onPress={() => {sco.setModalVisible(true)}}>
                <Image  source={require('../public/img/三点01.png')} />
              </TouchableHighlight>
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
                </View>

              <View style={styles.BuildDetail}>
                <Text style={styles.AskDetailTitle}>This source code under the BSD?</Text>
                <Text numberOfLines={3} style={styles.AskDetailText}>This source code is licensed under the BS license found in the
                    LICENSE file in the root directory of this source treeoot directory of this source .</Text>
              </View>

            <FlatList
            onRefresh={this.refreshing}
            refreshing={true}
            style={{marginBottom:50}}
            data={[{key: '一个小小'}, {key: 'ui设计师'},{key: '前端工程师'},{key: 'we'},{key: 'va'}]}
            renderItem={({item}) =>
            <View style={styles.BuildDetailComent}>
                <View style={[styles.BuildPersonal,styles.BuildContainer]}>
                  <Image  source={require('../public/img/头像.png')} />
                    <View style={styles.BuildPersonalText}>
                      <Text style={styles.BuildPersonalName}>{item.key}</Text>
                      <Text style={styles.BuildPersonalMsg}>ui设计师</Text>
                    </View>
                    <View style={[styles.BuildPersonalXiala,styles.BuildDetailZan]}>
                      <TouchableHighlight style={[styles.BuildPersonalImg,styles.BuildDetaildianzan,{marginLeft:120}]} onPress={() => {sco.showXiala()}}>
                        <Image  source={require('../public/img/点赞03.png')} />
                      </TouchableHighlight>
                      <Text>100</Text>
                    </View>
                </View>

                <Text style={styles.BuildDetailComentText}>This source code is licensed under the BSD-style license found in the
                    LICENSE file in the root directory of this source tree. </Text>
            </View>
            }/>
            </View>
          </ScrollView>
        </View>
    )
  }
}

  