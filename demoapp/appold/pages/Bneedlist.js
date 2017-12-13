import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,FlatList,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';

let sco = {}
export default class Bneedlist extends Component {
  constructor(props) {
    super(props); 
    main.init('Bneedlist',this); 
    sco = this;
  }

  render() {

    return (
      <ScrollView style={{marginBottom:50}}>
          <FlatList
                  data={[{key: '一个小小'}, {key: 'ui设计师'},{key: '前端工程师'},{key: 'we'},{key: 'va'}]}
                  renderItem={({item}) => 
             <View style={styles.BuildContent}>
            <View style={styles.BuildPersonal}>
              <Image  source={require('../public/img/头像.png')} />
                <View style={styles.BuildPersonalText}>
                  <Text style={styles.BuildPersonalName}>{item.key}</Text>
                  <Text style={styles.BuildPersonalMsg}>java</Text>
                </View>
                <View style={styles.BuildPersonalXiala}>
                  <TouchableHighlight style={styles.BuildPersonalImg} onPress={() => {sco.showXiala()}}>
                    <Image  source={require('../public/img/下拉.png')} />
                  </TouchableHighlight>
              {sco.state.showText?
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
        </ScrollView>
    )
  }
}

  