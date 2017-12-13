import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';

let sco = {}
export default class Basklist extends Component {
  constructor(props) {
    super(props); 
    main.init('Basklist',this); 
    sco = this;
  }

  render() {


    return (
      <ScrollView style={{marginBottom:50}}>

            <View style={styles.BuildAskContentTop}>
                <Text style={styles.BuildAskContent} onPress={() => sco.ysnav.navigate('Baskdetail')}>This source code is licensed under the BSD-style license found in the
                    LICENSE file in the root directory of this source tree. 
                </Text>
                <View style={styles.BuildAskContentImg}>
                  <View style={styles.BuildAskContentHeadImg}>
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Text>20人参与</Text>
                  </View>
                  <View>
                    <Image style={styles.BuildAskContentAs} source={require('../public/img/回答.png')} />
                  </View>   
                </View>
            </View>

            <View style={styles.BuildAskContentTop}>
              <Text style={styles.BuildAskContent}>This source code is licensed under the BSD-style license found in the
                    LICENSE file in the root directory of this source tree. </Text>
                <Image style={styles.BuildAskImg} source={require('../public/img/img-05.png')} />
                <View style={styles.BuildAskContentImg}>
                  <View style={styles.BuildAskContentHeadImg}>
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Text>20人参与</Text>
                  </View>
                  <View>
                    <Image style={styles.BuildAskContentAs} source={require('../public/img/回答.png')} />
                  </View>   
                </View>
            </View>

             <View style={styles.BuildAskContentTop}>
                <Text style={styles.BuildAskContent}>This source code is licensed under the BSD-style license found in the
                    LICENSE file in the root directory of this source tree. </Text>
                <Image style={styles.BuildAskImg} source={require('../public/img/img-05.png')} />
                <View style={styles.BuildAskContentImg}>
                  <View style={styles.BuildAskContentHeadImg}>
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Image style={styles.BuildAskContentHead} source={require('../public/img/头像.png')} />
                    <Text>20人参与</Text>
                  </View>
                  <View>
                    <Image style={styles.BuildAskContentAs} source={require('../public/img/回答.png')} />
                  </View>   
                </View>
            </View>
          </ScrollView>
    )
  }
}

  