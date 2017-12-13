import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, 
  Button,Item, Input,Text,Card, CardItem,Left,Body,Right,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
import conf from '../js/conf';
let sco ={};
export default class Findworklist extends Component {
  constructor(props) {
    super(props); 
    main.init('Findworklist',this); 
    sco = this;
    this.state ={
      albums:[]
    };
  }
/*  a(){
    return(
      conf.Findworklist.map((album)=>
             <View style={[styles.mt20,{flexDirection:'column',backgroundColor:'#fff',}]}>
<TouchableOpacity onPress={() => sco.ysnav.navigate('Dome')}>
 <View style={[styles.ph24,styles.pV20,]}>
   <View cardBody style={styles.worktimeRow}>
       <Text style={styles.f16}>{album.position}</Text> 
       <Text style={[styles.worktime2,styles.f16]}>{album.money}</Text>
   </View>
   <View cardBody style={styles.mt20}>
     <View style={{flexDirection:'row',alignContent:'center',flex:1,height:32,justifyContent:'center',}}>
       <Thumbnail style={styles.yuanquan1} source={album.url} />
       <View style={{justifyContent:'center',marginLeft:8,}}>
         <View style={[styles.flexStart,styles.xjuzhong]}>
           <Text style={[styles.tyanniutext,styles.f14]}>{album.name}</Text>
           <Text style={[styles.morecss,styles.notetext]}>|</Text>
           <Text style={[styles.tyanniutext,styles.f14,styles.morecss]}>{album.post}</Text>
         </View>
       </View>
       <View style={[{flex:1,}]}>
         <View style={[{alignSelf:'flex-end',flexDirection:'row',alignItems:'center',}]}>
           <Image source={require('../public/img/dizhi.png')} />
           <Text note>{album.site}</Text>
         </View>
       </View>
     </View>
   </View>
   <CardItem cardBody style={{marginTop:8,paddingBottom:10,}}>
     <Text note>{album.content}
     </Text>
   </CardItem>
   </View>
 </TouchableOpacity>
 </View>
      
      )
    )
    }*/
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.worktimeRow,styles.xjuzhong]}>
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
        </Header>
        {sco.show == true&&
            <View style={styles.toppop}>
              <TouchableOpacity style={styles.toppopitem} onPress={() => sco.ysnav.navigate('Faddwork')}>
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
           {/* {this.a()}
                     */ }        
          </View>
        }
        {sco.tapshow == 1&&
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
              <TouchableOpacity  onPress={() => sco.ysnav.navigate('Fresumedetail')}>
                <Card style={[styles.mt20,styles.ph24,styles.pV20]}>
              
                  <CardItem cardBody>
                    <Left>
                      <Thumbnail source={require('../public/img/avther.png')} />
                      <Body>
                        <Text style={styles.tyanniutext}>张三胖</Text>
                        <View style={[styles.flexStart,styles.xjuzhong]}>
                          <Image source={require('../public/img/dizhi.png')} />
                          <Text note style={[styles.morecss,styles.f12]}>深圳 南山</Text>
                        </View>
                      </Body>
                    </Left>
                    <Right>
                      <Text note style={styles.morecss}>UI设计师</Text>
                    </Right>
                  </CardItem>
                <CardItem cardBody>
                  <Text note>
                    在网页中，一个元素占有空间的大小由几个部分构成其中包括元素的内容
                    素的内边距（padding）...
                  </Text>
                </CardItem>
              </Card>
              </TouchableOpacity>
              <Card style={[styles.ph24,styles.pV20]}>
                <CardItem cardBody>
                  <Left>
                    <Thumbnail source={require('../public/img/avther.png')} />
                    <Body>
                      <Text style={styles.tyanniutext}>张三胖</Text>
                      <View style={[styles.flexStart,styles.xjuzhong]}>
                        <Image source={require('../public/img/dizhi.png')} />
                        <Text note style={[styles.morecss,styles.f12]}>深圳 南山</Text>
                      </View>
                    </Body>
                  </Left>
                  <Right>
                    <Text note style={styles.morecss}>UI设计师</Text>
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <Text note>
                    在网页中，一个元素占有空间的大小由几个部分构成其中包括元素的内容
                    素的内边距（padding）...
                  </Text>
                </CardItem>
              </Card>
           
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