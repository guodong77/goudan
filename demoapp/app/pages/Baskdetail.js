import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,FlatList,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content,Button,} from 'native-base';
import HeadNav from '../components/HeadNav';
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
  forRow1(rowData){
    let value = rowData.item;
    if(value.bestanswer==1){
      return (
       <View style={{padding:20,backgroundColor:"#fff",}}>
         <Text style={{fontSize:15,color:"#333"}}>满意回答</Text>
         <View style={{marginTop:10,flexDirection:'row'}}>
           <Image  source={{uri: value.headimg}} style={{width:40,height:40,marginRight:10,}}/>
             <View style={{paddingRight:20}}>
               <Text style={{fontSize:15,color:"#333",marginBottom:3}}>{value.nickname}</Text>
               <Text style={styles.BuildPersonalMsg}>{value.job}</Text>
               <Text style={{marginTop:3,}}>{value.content}</Text>
             </View>
         </View>
         <View style={{alignItems:"flex-end",flex:1,marginTop:20}}>
           <View style={{flexDirection:'row',justifyContent:'center',marginRight:20,}}>
             <Image  source={require('../public/img/点赞03.png')} />
             <Text>{value.comnum}</Text>
           </View>
         </View>
       </View>
   )
}else{
  return false;
}
  }
  forRow2(rowData){
    let value = rowData.item;
    if(value.recommendanswer==1){
      return (
       <View style={{padding:20,backgroundColor:"#fff",}}>
         <Text style={{fontSize:15,color:"#333"}}>网友采纳</Text>
         <View style={{marginTop:10,flexDirection:'row'}}>
           <Image  source={{uri: value.headimg}} style={{width:40,height:40,marginRight:10,}}/>
           <View style={{paddingRight:20}}>
            <Text style={{fontSize:15,color:"#333",marginBottom:3}}>{value.nickname}</Text>
            <Text style={styles.BuildPersonalMsg}>{value.job}</Text>
            <Text style={{marginTop:3,}}>{value.content}</Text>
          </View>
         </View>
         <View style={{alignItems:"flex-end",flex:1,marginTop:20}}>
           <View style={{flexDirection:'row',justifyContent:'center',marginRight:20,}}>
             <Image  source={require('../public/img/点赞03.png')} />
             <Text>{value.comnum}</Text>
           </View>
         </View>
       </View>
   )
}else{
  return false;
}
  }
  forRow(rowData){
    let value = rowData.item;
    return (
      <View>
      <View style={{marginTop:10,flexDirection:'row'}}>
        <Image  source={{uri: value.headimg}} style={{width:40,height:40,marginRight:10,}}/>
        <View style={{paddingRight:20}}>
          <Text style={{fontSize:15,color:"#333",marginBottom:3}}>{value.nickname}</Text>
          <Text style={styles.BuildPersonalMsg}>{value.job}</Text>
          <Text style={{marginTop:3,}}>{value.content}</Text>
        </View>
      </View>
      <View style={{alignItems:"flex-end",flex:1,marginTop:20}}>
        <View style={{flexDirection:'row',justifyContent:'center',marginRight:20,}}>
          <Image  source={require('../public/img/点赞03.png')} />
          <Text>{value.comnum}</Text>
        </View>
      </View>
    </View>
    )
  }
  render() {
    return (
      <View> 
      {/*主页头部*/}
        <HeadNav 
            headerText='问答详情'
            headerRight={
              <Button transparent underlayColor onPress={sco.onListShow}>
                <Image source={require('../public/img/三点01.png')} />
              </Button>
              }
        /> 


        <ScrollView style={styles.BuildAsk}>
        <View style={{marginBottom:40,}}>
          <View style={styles.BuildContent}>
              <View style={styles.BuildPersonal}>
                <Image source={{uri:sco.com_detail.data.headimg }} style={{width:40,height:40,}}/>
                  <View style={styles.BuildPersonalText}>
                    <Text style={styles.BuildPersonalName}> {sco.com_detail.data.nickname }</Text>
                    <Text style={styles.BuildPersonalMsg}>ui设计师</Text>
                  </View>
              </View>

            <View style={styles.BuildDetail}>
              <Text style={styles.AskDetailTitle}>{sco.com_detail.data.description}</Text>
              <Text numberOfLines={3} style={styles.AskDetailText}>{sco.com_detail.data.content}</Text>
            </View>
          </View>
          <FlatList
          onRefresh={this.refreshing}
          refreshing={true}
          style={{marginBottom:10}}
          data={sco.com_list.data}
          renderItem={sco.forRow1}
          />
          <FlatList
          onRefresh={this.refreshing}
          refreshing={true}
          style={{marginBottom:10}}
          data={sco.com_list.data}
          renderItem={sco.forRow2}
          />
          <View style={{padding:20,backgroundColor:"#fff",marginBottom:10,}}>
            <Text style={{fontSize:15,color:"#333"}}>其他回答</Text>
            <FlatList
              onRefresh={this.refreshing}
              refreshing={true}
              style={{marginBottom:10}}
              data={sco.com_list.data}
              renderItem={sco.forRow}
              />
          </View>
          </View>
        </ScrollView>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={sco.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <View style={[styles.TalkContainer,styles.NewImgBody]}>
            <View style={styles.NewImgContainer}>
              <Text style={[styles.NewImgChoose,styles.NewImgPhoto]}  onPress={()=>{Actions.Pcollect(),sco.onListShow()}}>收藏</Text>
              <Text style={styles.NewImgChoose}  onPress={Actions.pop}>举报</Text>
            </View>
            <View style={styles.NewImgContainer}>
                <Text style={styles.NewImgChoose} onPress={() => {sco.onListShow()}}>取消</Text>
            </View>
          </View>
         </Modal>
        </View>
    )
  }
}

  