import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,FlatList,Modal,PanResponder,ImageBackground,Platform,StatusBar,ScrollView,TextInput,TouchableOpacity}from 'react-native';

// import LoadingView from '../components/LoadingView';
import HeadNav1 from '../components/HeadNav1';
import {Container, Header, Content, Button,Icon, Right, Footer,FooterTab, Title,Card,CardItem} from 'native-base'
import { Actions } from 'react-native-router-flux';

fnn=()=>{ 

     return(
    <View style={styles.Xiala}>
                    <View style={styles.XialaTop}>
                      <Text style={styles.XialaText}>收藏</Text>
                    </View>
                    <Text style={styles.XialaText} onPress={Actions.Report}>举报</Text>
              </View>
  )
}  
const Comment = ({value,id,sco,fffn}) => {
  return (
    <View style={styles.BuildContent}>
    <View style={styles.BuildPersonal}>
      <Image source={require('../public/img/Oval2.png')}/>
        <View style={styles.BuildPersonalText}>
          <Text style={styles.BuildPersonalName}>{value.nickname}</Text>
          <Text style={styles.BuildPersonalMsg}>{value.job}</Text>
        </View>
        <View style={styles.BuildPersonalXiala}>
            <TouchableOpacity style={[styles.BuildPersonalImg,{marginLeft:160}]}  onPress={() => {id=true; alert(1);fffn() }}  >
                <Image  source={require('../public/img/下拉.png')} />
              </TouchableOpacity>
              {id&&fnn()}
              
        </View>

           
          {/* <TouchableOpacity style={[styles.BuildPersonalImg,{marginLeft:160}]} onPress={() => {sco.showXiala()}}>
            <Image  source={require('../public/img/下拉.png')} />
          </TouchableOpacity>
      {sco.state.showText?
        <View style={styles.Xiala}>
                    <View style={styles.XialaTop}>
                      <Text style={styles.XialaText}>收藏</Text>
                    </View>
                    <Text style={styles.XialaText} onPress={Actions.Report}>举报</Text>
                  </View>:null
                }
        </View> */}
    </View>
    <View style={styles.BuildDetail}>
    <View style={styles.BuildDetailTextView}>
  {/* <Text numberOfLines={sco.SC.Number} style={styles.BuildDetailText} onPress={() => {Actions.Builddetail({name: 'Brent'})}}>
      {value.description}
      </Text> */}
      <Text style={styles.BuildDetailText} onPress={(key) => {
         sco.getid(value.id);
         Actions.Builddetail({name: 'Brent'})
      }}>{value.description}</Text>
      <Text style={styles.BuildAllText} onPress={() =>{sco.ChangeNumber()}}></Text>
    </View>

    <View style={styles.BuildDetailView}>
    <Image style={styles.BuildDetailImg} source={{uri :value.thumb[0] }} ></Image>
    <Image style={[styles.BuildDetailImg,styles.BuildDetailMiddle]} source={{uri :value.thumb[1] }} ></Image>
    <Image style={styles.BuildDetailImg} source={{uri :value.thumb[2] }} ></Image>
  </View>
  </View>
  <View style={styles.BuildClient}>
    <View style={styles.BuildClientImg}>
      <TouchableOpacity onPress={() => {sco.ChangeImg(sco.SC,item.id,item.status)}}>
        <Image source={require('../public/img/点赞05.png')}></Image>
      </TouchableOpacity>
    </View>
    <Text>{value.thumbcount}</Text>
    <View style={[styles.BuildClientImg,styles.BuildSend]}>
      <TouchableOpacity>
        <Image   source={require('../public/img/转发.png')}></Image>
      </TouchableOpacity>
    </View>
    <Text>{value.forwarding}</Text>
    <Image style={[styles.BuildClientImg,styles.BuildComent]}  source={require('../public/img/评论.png')}></Image>
    <Text onPress={() => {sco.comtime('com_editadd')}}>{value.comnum}</Text>
  </View>

  <View style={styles.BuildComentDetail}>
    <View style={styles.Coment}>
      <Text style={styles.ComentBlue}>小明：</Text><Text>我是加我很快就静安寺你看</Text>
    </View>
    <View style={styles.Coment}>
    <Text style={styles.ComentBlue}>小明</Text><Text>回复</Text>
    <Text style={styles.ComentBlue}>王小花：</Text><Text>静安寺你看</Text>
    </View>
    <View style={styles.Coment}>
      <Text style={styles.ComentBlue}>小明：</Text><Text>孔大萨阿萨帝</Text>
    </View>
    <Text style={[styles.ComentBlue,styles.ComentCheck]}>查看全部110条评论></Text>
  </View>
  {/* {sco.state.showText?
            <View style={styles.Xiala}>
                        <View style={styles.XialaTop}>
                          <Text style={styles.XialaText} onPress={()=>{alert(1);sco.showXiala()}} >收藏</Text>
                        </View>
                        <Text style={styles.XialaText} onPress={()=>{Actions.Report();sco.showXiala()}}>举报</Text>
                      </View>:null
                    } */}
</View>
  )
}

export default Comment;