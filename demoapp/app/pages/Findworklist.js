import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, 
  Button,Item, Input,Text,Card, CardItem,Left,Body,Right,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,FlatList}from 'react-native';
import conf from '../js/conf';
import HeadNav1 from '../components/HeadNav1';
let sco ={};
export default class Findworklist extends Component {
  constructor(props) {
    super(props); 
    main.init('Findworklist',this); 
    sco = this;
  
  }
  render() {
    return (
      <Container>
          <HeadNav1 
            headerLeft={ <Image  source={require('../public/img/search.png')} /> }
              headerText={
                <View style={{flexDirection:'row',justifyContent:'space-around',flex:1,}}>
                  <Text style={[styles.TheprojectTopText,sco.tapshow == 0?styles.BuildActive:'']} onPress={() => {sco.funtapshow(0)}}>找工作</Text>
                  <Text style={[styles.TheprojectTopText,sco.tapshow == 1?styles.BuildActive:'']} onPress={() => {sco.funtapshow(1)}}>找人才</Text>
                </View> 
              }
              headerRight={<Image  source={require('../public/img/jiahao.png')} />}
              Left={()=>{alert(1)}}
              Right={()=>{alert(2)}}
        />
        {/* <Header style={[styles.gctopColor,styles.gctopheight,styles.worktimeRow,styles.xjuzhong]}>
          <View>
            <TouchableOpacity onPress={() => {sco.onListShow()}}>
              <Image  source={require('../public/img/search.png')} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.TheprojectTopText,sco.tapshow == 0?styles.BuildActive:'']} onPress={() => {sco.funtapshow(0)}}>找工作</Text>
          <Text style={[styles.TheprojectTopText,sco.tapshow == 1?styles.BuildActive:'']} onPress={() => {sco.funtapshow(1)}}>找人才</Text>
          <View style={styles.gctopimg}>
            <TouchableOpacity onPress={() => {sco.onListShow()}}>
              <Image  source={require('../public/img/jiahao.png')} />
            </TouchableOpacity>
          </View>
        </Header> */}
        {sco.show == true&&
            <View style={styles.toppop}>
          <TouchableOpacity style={styles.toppopitem} onPress={Actions.Faddwork}>
                <Text style={styles.toppoptext}>我要招聘</Text>
              </TouchableOpacity>
            </View>
          }
        <Content>
          {sco.tapshow == 0&&
          <View>
            <View>
              <Grid style={[styles.topsd,styles.whitebackground,styles.pV26]}>
                <Col style={[styles.marginato,styles.xjuzhong]}>
                  <Text style={styles.shaixuanwz}>全部</Text> 
                  <Image style={styles.morecss} source={require('../public/img/xiala.png')} />
                </Col>
                <Col style={[styles.marginato,styles.xjuzhong,styles.shaixuan]}> 
                  <Text style={styles.shaixuanwz}>全部</Text> 
                  <Image style={styles.morecss} source={require('../public/img/xiala.png')} />
                </Col>
              </Grid>
            </View>
            {/* {this.a()} */}
            <FlatList
              data={sco.com_list_page.data}
              renderItem={({item}) => (
                  <View style={[styles.mt20,{flexDirection:'column',backgroundColor:'#fff',}]}>
                  <TouchableOpacity  onPress= {Actions.Dome}>
                    <View style={[styles.ph24,styles.pV20,]}>
                      <View cardBody style={styles.worktimeRow}>
                          <Text style={styles.f16}>{item.position}</Text> 
                          <Text style={[styles.worktime2,styles.f16]}>{item.money}</Text>
                      </View>
                      <View cardBody style={styles.mt20}>
                        <View style={{flexDirection:'row',alignContent:'center',flex:1,height:32,justifyContent:'center',}}>
                          <Thumbnail style={styles.yuanquan1} source={require('../public/img/avther.png')} />
                          <View style={{justifyContent:'center',marginLeft:8,}}>
                            <View style={[styles.flexStart,styles.xjuzhong]}>
                              <Text style={[styles.tyanniutext,styles.f14]}>{item.name}</Text>
                              <Text style={[styles.morecss,styles.notetext]}>|</Text>
                              <Text style={[styles.tyanniutext,styles.f14,styles.morecss]}>{item.post}</Text>
                            </View>
                          </View>
                          <View style={[{flex:1,}]}>
                            <View style={[{alignSelf:'flex-end',flexDirection:'row',alignItems:'center',}]}>
                              <Image source={require('../public/img/dizhi.png')} />
                              <Text note>{item.site}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <CardItem cardBody style={{marginTop:8,paddingBottom:10,}}>
                        <Text note>{item.content}
                        </Text>
                      </CardItem>
                      </View>
                    </TouchableOpacity>
                    </View>
              )}
            />
          </View>
        }
        {sco.tapshow == 1&&
            <View>
            <View>
              <Grid style={[styles.topsd,styles.whitebackground,styles.pV26]}>
                <Col style={[styles.marginato,styles.xjuzhong]}>
                  <Text style={styles.shaixuanwz}>全部</Text> 
                  <Image style={styles.morecss} source={require('../public/img/xiala.png')} />
                </Col>
                <Col style={[styles.marginato,styles.xjuzhong,styles.shaixuan]}> 
                  <Text style={styles.shaixuanwz}>全部</Text> 
                  <Image style={styles.morecss} source={require('../public/img/xiala.png')} />
                </Col>
              </Grid>
            </View>
            <FlatList
              data={sco.com_list.data}
              renderItem={({item}) => (
                <View style={[styles.mt20,styles.ph24,styles.pV20,{backgroundColor:'#fff',}]}>
                  <TouchableOpacity   onPress= {Actions.Fresumedetail}  >
                      <View>
                        <View style={{flexDirection:'row',}}>
                          <Thumbnail source={require('../public/img/avther.png')} />
                          <View style={{justifyContent:'center',flex:1,marginLeft:10,}}>
                            <Text style={styles.tyanniutext}>{item.name}</Text>
                            <View style={[styles.flexStart,styles.xjuzhong]}>
                              <Image source={require('../public/img/dizhi.png')} />
                              <Text note style={[styles.morecss,styles.f12]}>{item.site}</Text>
                            </View>
                          </View>
                          <View style={{justifyContent:'center',}}>
                            <Text note style={[styles.morecss,{alignSelf:'flex-end'}]}>{item.post}</Text>
                          </View>
                        </View>
                      
                      </View>
                    <CardItem cardBody>
                      <Text note>
                        {item.content}
                      </Text>
                    </CardItem>
                    </TouchableOpacity>
                  </View>
                )}
              />

            </View>  
        }  
        </Content>

      </Container>
    );
  }


};

{/* <View style={[styles.mt20,{flexDirection:'column',backgroundColor:'#fff',}]}>
<TouchableOpacity onPress={() => sco.ysnav.navigate('Dome')}>
 <View style={[styles.ph24,styles.pV20,]}>
   <View cardBody style={styles.worktimeRow}>
       <Text style={styles.f16}>{conf.Findworklist[0].position}</Text> 
       <Text style={[styles.worktime2,styles.f16]}>{conf.Findworklist[0].money}</Text>
   </View>
   <View cardBody style={styles.mt20}>
     <View style={{flexDirection:'row',alignContent:'center',flex:1,height:32,justifyContent:'center',}}>
       <Thumbnail style={styles.yuanquan1} source={conf.Findworklist[0].url} />
       <View style={{justifyContent:'center',marginLeft:8,}}>
         <View style={[styles.flexStart,styles.xjuzhong]}>
           <Text style={[styles.tyanniutext,styles.f14]}>{conf.Findworklist[0].name}</Text>
           <Text style={[styles.morecss,styles.notetext]}>|</Text>
           <Text style={[styles.tyanniutext,styles.f14,styles.morecss]}>{conf.Findworklist[0].post}</Text>
         </View>
       </View>
       <View style={[{flex:1,}]}>
         <View style={[{alignSelf:'flex-end',flexDirection:'row',alignItems:'center',}]}>
           <Image source={require('../public/img/dizhi.png')} />
           <Text note>{conf.Findworklist[0].site}</Text>
         </View>
       </View>
     </View>
   </View>
   <CardItem cardBody style={{marginTop:8,paddingBottom:10,}}>
     <Text note>{conf.Findworklist[0].content}
     </Text>
   </CardItem>
   </View>
 </TouchableOpacity>
 </View> */}