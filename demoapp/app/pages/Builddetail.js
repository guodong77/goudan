import React, { Component } from 'react';
import { Container, Header, Content,Button,} from 'native-base';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,PanResponder,FlatList,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput}from 'react-native';
import { Actions } from 'react-native-router-flux';
import HeadNav from '../components/HeadNav';
let sco = {};
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
  forRow(rowData){
    let value = rowData.item;
       return (
      <View style={styles.BuildDetailComent}>
          <View style={[styles.BuildPersonal,styles.BuildContainer]}>
            <Image  source={require('../public/img/头像.png')} />
              <View style={styles.BuildPersonalText}>
                <Text style={styles.BuildPersonalName}>{value.nickname}</Text>
                <Text style={styles.BuildPersonalMsg}>ui设计师</Text>
              </View>
              <View style={[styles.BuildPersonalXiala,styles.BuildDetailZan]}>
              <TouchableOpacity style={[styles.BuildPersonalImg,styles.BuildDetaildianzan,{marginLeft:120}]} >
                  <Image  source={require('../public/img/点赞03.png')} />
              </TouchableOpacity>
                <Text>{value.star}</Text>
              </View>
          </View>
          <Text style={styles.BuildDetailComentText}>{value.content}</Text>
      </View>
    )
    }
   
  
  render() {
    return (      
    <View> 
      {/*主页头部*/}
      <HeadNav 
        headerText='动态详情'
        headerRight={
        <Button transparent underlayColor onPress={sco.onListShow}>
          <Image source={require('../public/img/三点01.png')} />
        </Button>
        }
      />
    
    <ScrollView>
      <View style={styles.BuildContent}>
      <View style={styles.BuildPersonal}>
        <Image  source={{ uri : sco.com_detail.data.headimg }} style={{width:40,height:40,}}/>
          <View style={styles.BuildPersonalText}>
            <Text style={styles.BuildPersonalName}>{sco.com_detail.data.nickname}</Text>
            <Text style={styles.BuildPersonalMsg}>{sco.com_detail.data.job}</Text>
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
      <Text numberOfLines={3} style={styles.BuildDetailText}>{sco.com_detail.data.content}</Text>
      
        {
          sco.com_detail.data.thumb
          &&<View style={[styles.BuildDetailView,{marginBottom:20,marginTop:10}]}>
          <Image style={[styles.BuildDetailImg,]} source={{ uri : sco.com_detail.data.thumb[0] }}  ></Image>
        <Image style={[styles.BuildDetailImg,styles.BuildDetailMiddle,]} source={{ uri : sco.com_detail.data.thumb[1]}} ></Image>
        <Image style={[styles.BuildDetailImg,,]} source={{ uri : sco.com_detail.data.thumb[2]}} ></Image>
        </View>
        }
    </View>
  </View>

  <View style={styles.BuildDetailComentTop}><Text >全部评论</Text><Text >(100)</Text></View>  


      <FlatList
        style={{marginBottom:100,}}
        data={sco.com_list.data}
        renderItem={sco.forRow}
        onEndReached={(info)=>{
            sco.comtime('com_list');
          }
        }
        onEndReachedThreshold={0.2}
        refreshing={false}
        onRefresh={()=>{sco.type = 0;sco.comtime('com_list'); }}
      />
       
      </ScrollView>
          <View style={styles.BuildDetailEdit}>
              <Image  source={require('../public/img/编辑.png')} />
              <TextInput underlineColorAndroid="transparent" placeholderTextColor ='#cccccc' placeholder='我也来说两句' style={styles.BuildDetailInput}></TextInput>
              <Image  source={require('../public/img/点赞04.png')} />
              <Image style={styles.BuildDetailShare}  source={require('../public/img/转发03.png')} />
            </View>
       
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

      
    

}}