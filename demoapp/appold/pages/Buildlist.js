import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,FlatList,Modal,PanResponder,ImageBackground,Platform,StatusBar,ScrollView,TextInput,TouchableOpacity}from 'react-native';
import Basklist from './Basklist';
import Bneedlist from './Bneedlist';
import {Container, Header, Content, Button,Icon, Right, Footer,FooterTab, Title,Card,CardItem} from 'native-base'

let sco = {}
export default class Buildlist extends Component {
  constructor(props) {
    super(props); 
    main.init('Buildlist',this);  
    sco = this;
    sco.state = {
      modalVisible: false,
      modalShare: false,
      ModelClose: false,
      showText: false,
      changeImg:true,
    };
  }
 
  setModalVisible(visible) {
    sco.setState({modalVisible: visible});
  }

  setModalShare(visible) {
    sco.setState({modalShare: visible});
  }

  setModelClose(visible) {
    sco.setState({ModelClose: visible});
  }

  showXiala(){
    sco.setState({showText:!sco.state.showText});
  }

  _onPress(){
    sco.setState({changeImg:!sco.state.changeImg});
  }



  render() { 
      
    const { navigate } = this.props.navigation;

    return(

      <View> 
        {/*主页头部*/}
          <View style={styles.BuildTop}>
            <View style={styles.BuildTopSearch} >
              <TouchableOpacity  onPress={() => {navigate('Comsearch', {name: 'Brent'})}} >
                  <Image source={require('../public/img/search.png')} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.BuildTopText,sco.tapshow == 0?styles.BuildActive:'']} onPress={() => {sco.funtapshow(0)}}>建筑圈</Text>
            <Text style={[styles.BuildTopText,sco.tapshow == 1?styles.BuildActive:'']} onPress={() => {sco.funtapshow(1)}}>问答</Text>
            <View style={styles.BuildTopTmg}>
              <TouchableOpacity onPress={() => {sco.setModalVisible(true)}}>
                <Image  source={require('../public/img/icon-发布.png')} />
              </TouchableOpacity>
            </View>
          </View> 

        {/*建筑圈*/}
        {sco.tapshow == 0&&
          <ScrollView style={{marginBottom:50}}>
            <FlatList
            onRefresh={this.refreshing}
            refreshing={true}
            data={sco.SC.data}
            renderItem={({item}) =>

            <View style={styles.BuildContent}>
              <View style={styles.BuildPersonal}>
                <Image  source={require('../public/img/头像.png')} />
                  <View style={styles.BuildPersonalText}>
                    <Text style={styles.BuildPersonalName}>{item.key}</Text>
                    <Text style={styles.BuildPersonalMsg}>ui设计师</Text>
                  </View>
                  <View style={styles.BuildPersonalXiala}>
                    <TouchableOpacity style={[styles.BuildPersonalImg,{marginLeft:160}]} onPress={() => {sco.showXiala()}}>
                      <Image  source={require('../public/img/下拉.png')} />
                    </TouchableOpacity>
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
              <View style={styles.BuildDetailTextView}>
                <Text numberOfLines={sco.SC.Number} style={styles.BuildDetailText} onPress={() => {navigate('Builddetail', {name: 'Brent'})}}>
                虽然常用的JS编辑器很多，但由于RN大量使用和es6语法，
                目前只有sublime text通过插件和本webstorm（10以上版本）
                提供了良好的支持。笔者推荐，因为它有更完善的语法提示和补全。
                另外虽然主要的业务逻辑是使用js开发，但仍然要依赖于原生的编译/调试环境，
                所以你还需要同时运行。
                </Text>
                <Text style={styles.BuildAllText} onPress={() =>{sco.ChangeNumber()}}>{sco.SC.FullText}</Text>
              </View>

              <View style={styles.BuildDetailView}>
                <Image style={styles.BuildDetailImg} source={require('../public/img/img-1.png')}></Image>
                <Image style={[styles.BuildDetailImg,styles.BuildDetailMiddle]} source={require('../public/img/img-2.png')}></Image>
                <Image style={styles.BuildDetailImg} source={require('../public/img/img-3.png')}></Image>
              </View>
            </View>
            <View style={styles.BuildClient}>
              <View style={styles.BuildClientImg}>
                <TouchableOpacity onPress={() => {sco.ChangeImg(sco.SC,item.id,item.status)}}>
                  <Image source={item.url}></Image>
                </TouchableOpacity>
              </View>
              <Text>110</Text>
              <View style={[styles.BuildClientImg,styles.BuildSend]}>
                <TouchableOpacity>
                  <Image   source={require('../public/img/转发.png')}></Image>
                </TouchableOpacity>
              </View>
              <Text>110</Text>
              <Image style={[styles.BuildClientImg,styles.BuildComent]}  source={require('../public/img/评论.png')}></Image>
              <Text onPress={() => {sco.comtime('com_editadd')}}>110</Text>
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
            </View>
            }/>
          </ScrollView>
        }  

        {/*问答*/}
        {sco.tapshow == 1&&
          <Basklist navigation={sco.props.navigation}/>
        }

        {/*需求*/}
        {sco.tapshow == 2&&
         <Bneedlist navigation={sco.props.navigation}/>
        }

       

        {/*发布*/}
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {sco.setModalVisible(!sco.state.modalVisible)}}>
            <View style={styles.TalkContainer}>
              <View style={styles.innerContainer}>
                  <View style={[styles.Container,styles.ContainerTop]}>
                  <Text style={styles.ContainerTopText}>发布</Text>
                  <TouchableOpacity onPress={() => {sco.setModalVisible(!sco.state.modalVisible)}}>
                    <Image  source={require('../public/img/叉叉.png')}></Image>
                  </TouchableOpacity>
                </View>

                <View style={[styles.Container,styles.ContainerMiddle]}>
                  <TouchableOpacity  onPress={() => {navigate('Baddnew', {name: 'Brent'}),sco.setModalVisible(!sco.state.modalVisible)}} >
                    <Image  source={require('../public/img/动态.png')}  ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={() => {navigate('Baddask', {name: 'Brent'}),sco.setModalVisible(!sco.state.modalVisible)}}>
                    <Image  style={styles.ContainerAsk}  source={require('../public/img/问答.png')}></Image>
                  </TouchableOpacity>
                </View>

                <View style={[styles.Container,styles.ContainerBottom]}>
                  <Text>动态</Text>
                  <Text style={styles.ContainerAskText}>问答</Text>
                  <Text>需求</Text>
                </View>
              </View>
            </View>
        </Modal>

        {/*分享*/}
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalShare}
            onRequestClose={() => {sco.setModalShare(false)}}>
            <View style={styles.ShareBody}>
              <View style={styles.ShareContainer}>
                <View>
                  <Text style={styles.ShareTitle}>分享到</Text>
                </View>
                <View style={styles.ShareIcons}>
                  <TouchableOpacity style={styles.ShareIcon} onPress={() => {sco.setModelClose(true)}}>
                    <Image  source={require('../public/img/icon-朋友圈.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ShareIcon} >
                    <Image  source={require('../public/img/icon-朋友圈.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ShareIcon} >
                    <Image  source={require('../public/img/icon-微信.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ShareIcon} >
                    <Image  source={require('../public/img/icon-QQ01.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.ShareIcons}>
                  <Text style={styles.ShareIconText}>建筑圈</Text>
                  <Text style={styles.ShareIconText}>朋友圈</Text>
                  <Text style={styles.ShareIconText}>微信好友</Text>
                  <Text style={styles.ShareIconText}>QQ好友</Text>
                </View>
               
                <TouchableOpacity onPress={() => {sco.setModalShare(false)}}>
                 <View style={styles.ShareCancel}>
                  <Text style={styles.ShareCancelText}>取消</Text>
                  </View>
                </TouchableOpacity>
              
              </View>
            </View>
        </Modal>

        {/*分享动态*/}
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.ModelClose}
            onRequestClose={() => {sco.setModelClose(!sco.state.ModelClose)}}>
            <View style={styles.BuildShare}>
              <View style={styles.BuildShareContainer}>
                <View>
                  <Text>分享实名动态</Text>
                </View>

                <View style={styles.BuildSharePersonal}>
                  <Image  source={require('../public/img/icon-QQ01.png')} />
                  <Text numberOfLines={2} style={styles.BuildShareText}>
                    <Text>虽然常用</Text>
                    <Text style={styles.BuildShareTextIcon}>|</Text>
                    <Text>JS编辑器</Text>
                    说：笔者推荐笔者推荐笔者推荐笔者推荐，因为它有更完善的语法提示和补全。
                  </Text>
                </View>

                <TextInput style={styles.BuildShareInput} placeholderTextColor ='#cccccc' underlineColorAndroid="transparent" multiline={true}  placeholder='说点什么吧...'></TextInput>

                <View style={styles.BuildShareButtons}>
                    <View style={styles.BuildShareButton}> 
                      <Text style={styles.BuildShareButtonText} onPress={() => {sco.setModelClose(!sco.state.ModelClose)}}>取消</Text>
                    </View>
                    <View style={styles.BuildShareButton}> 
                      <Text style={[styles.BuildShareButtonText,styles.BuildShareButtonAtive]} onPress={() => {sco.setModelClose(!sco.state.ModelClose)}}>确定</Text>
                    </View>
                </View>
              </View>
            </View>
        </Modal>

       </View>
      
    )
  }



};

  