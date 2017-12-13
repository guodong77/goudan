import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, 
  Button,Item, Input,Text,Card, CardItem,Left,Body,Right,Thumbnail,Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,FlatList,Animated}from 'react-native';
import conf from '../js/conf';
let sco ={};

// let sco ={};
// import A1 from './A1'; 
// import A2 from './A2'; 
// import A3 from './A3'; 
// import A4 from './A4'; 
// import A5 from './A5'; 
// export default Dome = TabNavigator({
//     A1:{
//       screen:A1,
//       navigationOptions:{
//         tabBarLabel:'建筑圈',
//         tabBarIcon:()=>( 
//           <View>
//                 <Image 
//                   source={require('../public/img/首页-默认.png')}
//                    />
//           </View>
//         )
//       }
//     },
// })

// export default class Dome extends Component {
//   constructor(props) {
//     super(props); 
//     main.init('Dome',this); 
//     sco = this;
//     this.state = {
//       albums:[],
//       off:true,
//       off1:false,
//       fontC:'#000',
//       currentAlpha: 0,
//       fadeAnim: new Animated.Value(0)
//     }
//   }	  	
//   btn(key) {
//     // debugger;
//     let a=key?'#f60':'#000'
//     this.setState({
//       off:!key,
//       fontC:a,
//     })
//     this.startAnimation()
//   }
//   startAnimation(){
//     this.state.currentAlpha = this.state.currentAlpha == 500?0:500;
//     Animated.timing(
//       this.state.fadeAnim,
//       {toValue: this.state.currentAlpha, }
//     ).start();
//   }
//   render() {
//     return (
//       <View>
//         <View style={{flexDirection:'row',}}>
//           <TouchableOpacity style={{flex:1,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignItems:'center',}}  onPress={() =>{this.btn(this.state.off)}}>
//             <Text style={{color:this.state.fontC}}> 全部</Text> 
//             <Image style={styles.morecss} source={require('../public/img/xiala.png')} />
//           </TouchableOpacity>
//           <TouchableOpacity style={{flex:1,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
//             <Text style={styles.shaixuanwz}>全部</Text> 
//             <Image style={styles.morecss} source={require('../public/img/xiala.png')} />
//           </TouchableOpacity>
//         </View>
//         <Animated.View style={{ 
//               height:this.state.fadeAnim,
//               backgroundColor:'#f60',
//               flexDirection:'row',
//             }}>
//             <View style={{flex:1,}}>
//             <FlatList
//               data={sco.com_list.data}
//               renderItem={({item}) => (
//                     <View>
//                       <Text>{item.name}</Text>
//                       <Text>1</Text>
//                     </View>
//                 )}
//               />
//             </View>
//             <View style={{flex:1,backgroundColor:'#fff',}}>
//                 <FlatList
                
//                   data={sco.com_list_page.data}
//                   renderItem={({item}) => (
                    
//                         <View >
//                           <Text>{item.name}</Text>
//                           <Text>2</Text>
//                         </View>
//                     )}
//                   />
//             </View>
//           </Animated.View>
//         </View>
//     )
//   }
// }
export default class Fworkdetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Fworkdetail',this); 
    sco = this;
  }
render() {
  return (
    <Container>
      <Header style={[styles.gctopColor,styles.gctopheight]}>
        <Left>
          <TouchableOpacity onPress={Actions.pop}>
            <Image  source={require('../public/img/返回03.png')} />
          </TouchableOpacity>
        </Left>
        <Body style={styles.titleposition}>
          <Title style={styles.addToptitle}>职位详情</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => {sco.onListShow()}} >
              <Image  source={require('../public/img/星.png')} />
          </TouchableOpacity>
          <TouchableOpacity  style={styles.iconpos}>
              <Image  source={require('../public/img/转发2.png')} />
          </TouchableOpacity>
          <TouchableOpacity  style={styles.iconpos}>
              <Image  source={require('../public/img/举报.png')} />
          </TouchableOpacity>
        </Right>
      </Header>

      <Content>
        <View style={styles.whitebackground}>
          <Card style={styles.ph24}>
            <CardItem cardBody>
              <Text>资料员</Text>
            </CardItem>
            <CardItem cardBody style={styles.mV20}>
              <Left>
                <Thumbnail source={require('../public/img/avther.png')} />
                <Body>
                  <Text style={styles.bword}>王小花</Text>
                  <Text note style={styles.f12}>人力总监</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </View>
        <Card style={[styles.ph24,styles.pV20,styles.mt20]}>
          <CardItem cardBody >
            <Left style={[styles.borderBottom,styles.pb10]}>
              <View style={styles.shutiao}></View>
              <Text style={styles.bword}>职位详情</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Text note>
            王小花王小花王小花王小花王小花王小花王小花
            王小花王小花王小花王小花王小花王小花王小花
            王小花王小花王小花王小花王小花王小花王小花
            王小花王小花王小花王小花王小花王小花王小花
            </Text>
          </CardItem>
        </Card>
        <Card style={[styles.ph24,styles.pV20]}>
          <CardItem cardBody>
            <Left style={[styles.borderBottom,styles.pb10]}>
              <View style={styles.shutiao}></View>
              <Text style={styles.bword}>工作地点</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Left style={styles.mt15}>
              <Image  source={require('../public/img/地址blue.png')} />
              <Text note>
              深圳市宝安区翻身地铁站
              </Text>
            </Left>
            <Right><Image  source={require('../public/img/more.png')} /></Right>
          </CardItem>

          
        </Card>


      </Content>
      <View style={styles.ph24}>
        <Button block info style={[styles.hdtcard,styles.mb20]}>
            <Text style={styles.f16}>立即沟通</Text>
          </Button>
      </View>
    </Container>
  );
}


};
