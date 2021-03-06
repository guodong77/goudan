import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,TabHeading,Tabs,Tab,Picker,Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import { Actions } from 'react-native-router-flux';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Single extends Component {
  constructor(props) {
    super(props); 
    main.init('Single',this);  
    sco = this; 
}
  render() {
    return (

      <Container>
      <HeadNav
            
            headerText={
           <View style={[styles.posr,styles.titleposition,styles.ml170]}>
            <View style={[styles.pickerpa,styles.flexStart,styles.xjuzhong]}>
            <Text style={[styles.addToptitle,styles.whiteText,{fontSize:20,}]}>{sco.language}</Text>
            <Image style={styles.morecss}  source={require('../public/img/xiala.png')} />
            </View>
           <Picker 
              note
              iosHeader="Select one"
              mode="dropdown"
              style={{ width: 100,opacity:0}}
              selectedValue={sco.language}
              onValueChange={(lang) => sco.picker(lang)}
            >
            <Item label="详情进度" value="详情进度"/>
            <Item label="子单位1" value="子单位1" />
            <Item label="子单位2" value="子单位2" />
            </Picker>
          </View>
            }
          
        />
        {/* <Header style={[styles.gctopColor,styles.gctopheight,styles.flexStart,styles.xjuzhong]}>
          <View>
            <TouchableOpacity transparent onPress={Actions.pop}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <View style={[styles.posr,styles.titleposition,styles.ml170]}>
            <View style={[styles.pickerpa,styles.flexStart,styles.xjuzhong]}>
            <Text style={[styles.addToptitle,styles.whiteText]}>{sco.language}</Text>
            <Image style={styles.morecss}  source={require('../public/img/xiala.png')} />
            </View>
           <Picker 
              note
              iosHeader="Select one"
              mode="dropdown"
              style={{ width: 100,opacity:0}}
              selectedValue={sco.language}
              onValueChange={(lang) => sco.picker(lang)}
            >
            <Item label="详情进度" value="详情进度"/>
            <Item label="子单位1" value="子单位1" />
            <Item label="子单位2" value="子单位2" />
            </Picker>
          </View>
        </Header> */}
        <Content style={styles.whitebackground}>
          <Tabs>
          <Tab style={styles.topborder} heading="全部">
            <View style={[styles.worktimeRow,styles.pl44,styles.zfzu]}>
              <View style={styles.flexStart}>
                <View style={[styles.weisong,styles.zhengfangx]}></View> 
                <Text>未送</Text>
              </View>
              <View style={styles.flexStart}>
                <View style={[styles.yisong,styles.zhengfangx]}></View> 
                <Text>已送</Text>
              </View>
              <View style={styles.flexStart}>
                <View style={[styles.lousong,styles.zhengfangx]}></View> 
                <Text>漏送</Text>
              </View>
              <View style={styles.flexStart}>
                <View style={[styles.yichang,styles.zhengfangx]}></View> 
                <Text>异常</Text>
              </View>
            </View>
            <View style={styles.pl44}>
              <View>
                <View style={[styles.liangban,styles.flexStart]}>
                  <Left>
                    <Text style={styles.liangbanText}>屋面梁板</Text>
                    <Text style={[styles.biao,styles.wsbiao,styles.f14]}>标</Text>
                  </Left>
                  
                  <Right>
                    <View style={styles.gctopimg}>
                      <Image  source={require('../public/img/评论.png')} />
                      <Text note>2</Text>
                    </View>
                    <Text note>2016-08-30</Text>
                  </Right>
                </View>
                <View style={[styles.worktimeRow,styles.ph60]}>
                  <View style={styles.zhuzi}></View>
                  <View style={styles.zhuzi}></View>
                </View>
              </View>

              <View>
                <View style={[styles.liangban,styles.flexStart]}>
                  <Left>
                    <Text style={styles.liangbanText}>九层梁板</Text>
                    <Text style={[styles.biao,styles.ysbiao,styles.f14]}>标</Text>
                  </Left>
                  
                  <Right>
                    <View style={styles.gctopimg}>
                      <Image  source={require('../public/img/评论.png')} />
                      <Text note>2</Text>
                    </View>
                    <Text note>2016-08-30</Text>
                  </Right>
                </View>
                <View style={[styles.worktimeRow,styles.ph60]}>
                  <View style={styles.zhuzi}></View>
                  <View style={styles.zhuzi}></View>
                </View>
              </View>

              <View>
                <View style={[styles.liangban,styles.flexStart,styles.finished]}>
                  <Left>
                    <View style={styles.flexStart}><Text style={styles.liangbanText}>五层梁板</Text><Text style={[styles.zhiliang,styles.f14]}>C30</Text></View>
                    <Text style={[styles.biao,styles.ysbiao,styles.f14]}>标</Text>
                  </Left>
                  
                  <Right>
                    <View style={styles.gctopimg}>
                      <Image  source={require('../public/img/评论.png')} />
                      <Text note>2</Text>
                    </View>
                    <Text note>2016-08-30</Text>
                  </Right>
                </View>
              </View>
            </View>
          </Tab>
          <Tab style={styles.topborder} heading="基础">
            
          </Tab>
          <Tab style={styles.topborder} heading="主体">
            
          </Tab>
        </Tabs>
        </Content>
      </Container>
    );
  }


};

  