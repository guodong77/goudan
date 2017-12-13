import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,FlatList,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon,InputGroup,Input, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Puserauth extends Component {
  constructor(props) {
    super(props); 
    main.init('Puserauth',this); 
    sco = this;
  }

  render() {

    const { navigate } = this.props.navigation;
    
    return (
        <Container>
          <View style={styles.BuildTop}>
            <View>
              <TouchableHighlight  onPress={() => {navigate('Personal', {name: 'Brent'})}} >
                  <Image source={require('../public/img/返回03.png')} />
              </TouchableHighlight>
            </View>
            <Text style={[styles.BuildDatailText,styles.Ptitle]}>用户认证</Text>
          </View> 

          <View style={styles.PCardView}> 
            <Text style={styles.PCardTitle}>选择认证材料类型（4选1）</Text>
            {sco.SC.SCard1?
            <TouchableHighlight onPress={sco.setSCard1}>
              <View style={styles.PCard}>
                <Image source={require('../public/img/businesscard.png')} />
                <Text  style={styles.PCardText}>名片</Text>
               </View>
             </TouchableHighlight>
             :
             <View>
              <View style={[styles.PCard,styles.SCard]}>
               <Image source={require('../public/img/businesscard1.png')} />
                <Text  style={[styles.PCardText,styles.SCardText]}>名片</Text>
                 <View style={styles.PCardSuccess}>
                 <Image style={styles.PCardSuccessImg} source={require('../public/img/sanjiao.png')} />
                </View>
             </View>
              <TouchableHighlight style={{position:'absolute',top:430,right:10}} onPress={() => {sco.ShowPhotoName(true)}}>
                <Image  source={require('../public/img/xuzhi.png')} />
              </TouchableHighlight>
            </View>
             }

             {sco.SC.SCard2?
            <TouchableHighlight onPress={sco.setSCard2}>
              <View style={styles.PCard}>
                <Image source={require('../public/img/Workcard.png')} />
                <Text  style={styles.PCardText}>工牌</Text>
              </View>
            </TouchableHighlight>
             :
             <View>
              <View style={[styles.PCard,styles.SCard]}>
               <Image source={require('../public/img/Workcard1.png')} />
                <Text  style={[styles.PCardText,styles.SCardText]}>工牌</Text>
                 <View style={styles.PCardSuccess}>
                 <Image style={styles.PCardSuccessImg} source={require('../public/img/sanjiao.png')} />
                </View>
             </View>
              <TouchableHighlight style={{position:'absolute',top:340,right:10}} onPress={() => {sco.ShowPhotoWork(true)}}>
                <Image  source={require('../public/img/xuzhi.png')} />
              </TouchableHighlight>
            </View>
             }

             {sco.SC.SCard3?
            <TouchableHighlight onPress={sco.setSCard3}>
              <View style={styles.PCard}>
              <Image source={require('../public/img/Businesslicense.png')} />
              <Text  style={styles.PCardText}>营业执照</Text>
            </View>
            </TouchableHighlight>
             :
             <View>
              <View style={[styles.PCard,styles.SCard]}>
               <Image source={require('../public/img/Businesslicense1.png')} />
                <Text  style={[styles.PCardText,styles.SCardText]}>营业执照</Text>
                 <View style={styles.PCardSuccess}>
                 <Image style={styles.PCardSuccessButtom} source={require('../public/img/sanjiao.png')} />
                </View>
             </View>
              <TouchableHighlight style={{position:'absolute',top:250,right:10}} onPress={() => {sco.ShowPhotoLicense(true)}}>
                <Image  source={require('../public/img/xuzhi.png')} />
              </TouchableHighlight>
            </View>
             }

             {sco.SC.SCard4?
            <TouchableHighlight onPress={sco.setSCard4}>
                <View style={styles.PCard}>
                <Image source={require('../public/img/Incumbencycertificate.png')} />
                <Text  style={styles.PCardText}>在职证明</Text>
              </View>
            </TouchableHighlight>
             :
             <View>
              <View style={[styles.PCard,styles.SCard]}>
               <Image source={require('../public/img/Incumbencycertificate1.png')} />
                <Text  style={[styles.PCardText,styles.SCardText]}>在职证明</Text>
                 <View style={styles.PCardSuccess}>
                 <Image style={styles.PCardSuccessButtom} source={require('../public/img/sanjiao.png')} />
                </View>
             </View>
              <TouchableHighlight style={{position:'absolute',top:160,right:10}} onPress={() => {sco.ShowPhotoProve(true)}}>
                <Image  source={require('../public/img/xuzhi.png')} />
              </TouchableHighlight>
            </View>
             }     

            

            <InputGroup style={[styles.ChangePhoneInput,styles.ChangePhoneInputOK]} backgroundColor={sco.SC.backgroundColor} >
                  <Text onPress={() => {sco.ShowTips(true)}} style={{color:sco.SC.color,fontSize:18}}>拍摄图片</Text>
            </InputGroup>   
          </View>

            <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.PhotoName}
            onRequestClose={() => {alert("")}}>
            <View style={styles.PhotoNotice}>
              <View style={[styles.ShareContainer,styles.Notice]}>
                  <View style={{flexDirection:'row',padding:10}} >
                    <Text style={styles.CardName} >名片</Text>
                    <TouchableHighlight onPress={() => {sco.ShowPhotoName(false)}}>
                      <Image  source={require('../public/img/叉叉.png')} />
                    </TouchableHighlight>
                  </View>
                  <Image  source={require('../public/img/businesscard2.png')} />
                  <View style={{marginRight:80,marginTop:10}}>
                    <Text>1.上传名片正面，保证清晰可辨认</Text>
                    <Text>2.姓名应与名片一致</Text>
                    <Text>3.手机号与名片一致</Text>
                    <Text>4.职务与名片一致</Text>
                    <Text>5.不可上传电子截屏</Text>
                  </View>
              </View>
            </View>
        </Modal>

         <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.PhotoWork}
            onRequestClose={() => {alert("")}}>
            <View style={styles.PhotoNotice}>
              <View style={[styles.ShareContainer,styles.Notice]}>
                  <View style={{flexDirection:'row',padding:10}} >
                    <Text style={styles.CardName} >工牌</Text>
                    <TouchableHighlight onPress={() => {sco.ShowPhotoWork(false)}}>
                      <Image  source={require('../public/img/叉叉.png')} />
                    </TouchableHighlight>
                  </View>
                  <Image  source={require('../public/img/Workcard2.png')} />
                  <View style={{marginRight:40,marginTop:10,marginLeft:40}}>
                    <Text>1.上传工牌正面，保证姓名、职务、头像与       个人信息一致</Text>
                    <Text>2.确保公章上的公司全称，与您个人信息中       的公司全称一致</Text>
                    <Text>3.确保所有信息清晰可辨认</Text>
                  </View>
              </View>
            </View>
        </Modal>

         <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.PhotoLicense}
            onRequestClose={() => {alert("")}}>
            <View style={styles.PhotoNotice}>
              <View style={[styles.ShareContainer,styles.Notice]}>
                  <View style={{flexDirection:'row',padding:10}} >
                    <Text style={[styles.CardName,{marginLeft:125,marginRight:110}]} >营业执照</Text>
                    <TouchableHighlight onPress={() => {sco.ShowPhotoLicense(false)}}>
                      <Image  source={require('../public/img/叉叉.png')} />
                    </TouchableHighlight>
                  </View>
                  <Image  source={require('../public/img/Businesslicense2.png')} />
                  <View style={{marginRight:40,marginTop:10,marginLeft:30}}>
                    <Text>1.上传公司营业执照正面，确保所有信息清晰可见</Text>
                    <Text>2.确保营业执照上的公司全称，与您个人信息中的公司全称一致</Text>
                  </View>
              </View>
            </View>
        </Modal>

         <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.PhotoProve}
            onRequestClose={() => {alert("")}}>
            <View style={styles.PhotoNotice}>
              <View style={[styles.ShareContainer,styles.Notice]}>
                  <View style={{flexDirection:'row',padding:10}} >
                    <Text style={[styles.CardName,{marginLeft:125,marginRight:110}]} >在职证明</Text>
                    <TouchableHighlight onPress={() => {sco.ShowPhotoProve(false)}}>
                      <Image  source={require('../public/img/叉叉.png')} />
                    </TouchableHighlight>
                  </View>
                  <Image  source={require('../public/img/Incumbencycertificate2.png')} />
                  <View style={{marginRight:40,marginTop:10,marginLeft:30}}>
                    <Text>1.确保在职证明的内容与模版一致</Text>
                    <Text>2.保证姓名、职务、头像与个人信息一致</Text>
                    <Text>3.确保公章上的公司全称，与您个人信息中的公司全称一致</Text>
                  </View>
              </View>
            </View>
        </Modal>



        <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.PhotoTips}
             onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={[styles.TalkContainer,styles.NewImgBody]}>
              <View style={styles.NewImgContainer}>
                <Text style={[styles.NewImgChoose,styles.NewImgPhoto]}>拍照</Text>
                <Text style={styles.NewImgChoose}>从手机相册选择</Text>
              </View>
              <View style={styles.NewImgContainer}>
                 <Text style={styles.NewImgChoose} onPress={() => {sco.ShowTips(false)}}>取消</Text>
              </View>
            </View>
        </Modal>
  
        </Container>

    )
  }
}

  