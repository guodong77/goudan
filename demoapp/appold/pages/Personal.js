import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon, Right, Footer,FooterTab, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Personal extends Component {
  constructor(props) {
    super(props); 
    main.init('Personal',this); 
    sco = this;
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
       <Container>
                <Header style={styles.PersonalHeader}>
                    <Title>我的</Title>
                </Header>

                <Content style={{marginTop:-10}} >

                      <View style={[styles.PersonalCenter,styles.PersonalContent]}>

                            <View style={styles.PersonalCardMsg}>
                              <Image style={{width:40,height:40}} source={{uri:sco.com_detail.data.headimg}}/>
                              <Text onPress={() => {navigate('Pinfo', {name: 'Brent'})}} style={styles.PersonalCardText}>{sco.com_detail.data.nickname}</Text>
                              <View style={styles.PersonalCardLR}>
                                <Text style={styles.PersonalCardDataColor} onPress={() => sco.ysnav.navigate('Login')}>登录/</Text>
                                <Text style={styles.PersonalCardDataColor} onPress={() => sco.ysnav.navigate('Register')}>注册</Text>
                              </View>
                            </View>

                          <View style={styles.PersonalCardDatas}>
                            <Text style={styles.PersonalCardData}>{sco.com_detail.data.dynamic}</Text>
                            <Text style={styles.PersonalCardData}>{sco.com_detail.data.QA}</Text>
                          </View>
                          <View style={styles.PersonalCardType}>
                            <Text onPress={() => {navigate('Pnews', {name: 'Brent'})}}>动态</Text>
                            <Text onPress={() => {navigate('Pask', {name: 'Brent'})}}>问答</Text>
                          </View>
                    </View>  

                    <View>
                          <Card style={styles.PersonalTypeCard}>
                          <TouchableHighlight onPress={() => {navigate('Pcollect', {name: 'Brent'})}}>
                            <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/collection.png')}/>
                                <Text   style={styles.PersonalTypes}>我的收藏</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                            </TouchableHighlight>

                             <Image style={styles.PersonalLine} source={require('../public/img/line.png')}/>

                            <TouchableHighlight onPress={() => {navigate('Pnotice', {name: 'Brent'})}}>
                             <CardItem style={styles.PersonalTypeCardItem}>
                                <Image   source={require('../public/img/notice.png')}/>
                                <Text  style={styles.PersonalTypes}>动态通知</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon name='ios-arrow-forward' />
                              </Right>
                             </CardItem>
                             </TouchableHighlight>

                             <Image style={styles.PersonalLine} source={require('../public/img/line.png')}/>

                              <TouchableHighlight onPress={() => {navigate('Puserauth', {name: 'Brent'})}}>
                             <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/renzehng.png')}/>
                                <Text   style={styles.PersonalTypes}>认证用户</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon name='ios-arrow-forward' />
                              </Right>
                             </CardItem>
                             </TouchableHighlight>
                         </Card>

                         <Card style={styles.PersonalTypeCard}>
                          <TouchableHighlight onPress={() => {navigate('Pmyresume', {name: 'Brent'})}}>
                            <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/resume.png')}/>
                                <Text   style={styles.PersonalTypes}>我的简历</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                            </TouchableHighlight>
                             <Image style={styles.PersonalLine} source={require('../public/img/line.png')}/>

                            <TouchableHighlight onPress={() => {navigate('Pgowork', {name: 'Brent'})}}>
                             <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/notice.png')}/>
                                <Text style={styles.PersonalTypes}>招聘管理</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon name='ios-arrow-forward' />
                              </Right>
                             </CardItem>
                             </TouchableHighlight>

                             <Image style={styles.PersonalLine} source={require('../public/img/line.png')}/>

                             <TouchableHighlight onPress={() => {navigate('Pworkcollect', {name: 'Brent'})}}>
                             <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/position.png')}/>
                                <Text style={styles.PersonalTypes}>职位收藏</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon name='ios-arrow-forward' />
                              </Right>
                             </CardItem>
                             </TouchableHighlight>

                             <Image style={styles.PersonalLine} source={require('../public/img/line.png')}/>

                             <TouchableHighlight onPress={() => {navigate('Pmyconpany', {name: 'Brent'})}}>
                             <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/switch.png')}/>
                                <Text style={styles.PersonalTypes}>我的公司</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon name='ios-arrow-forward' />
                              </Right>
                             </CardItem>
                             </TouchableHighlight>
                         </Card>

                         <Card style={styles.PersonalTypeCard}>
                         <TouchableHighlight onPress={() => {sco.ShowInvite(true)}}>
                            <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/Invitation.png')}/>
                                <Text style={styles.PersonalTypes}>邀请好友</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                             </TouchableHighlight>

                             <Image style={styles.PersonalLine} source={require('../public/img/line.png')}/>

                            <TouchableHighlight onPress={() => {navigate('Phelplist', {name: 'Brent'})}}>
                             <CardItem style={styles.PersonalTypeCardItem}>
                                <Image source={require('../public/img/help.png')}/>
                                <Text style={styles.PersonalTypes}>帮助及反馈</Text>
                              <Right style={styles.PersonalTypeIcons}>
                                <Icon name='ios-arrow-forward' />
                              </Right>
                             </CardItem>
                             </TouchableHighlight>
                             <Button block light style={styles.PersonalButton}>
                                <Text style={styles.PersonalButtonValue}>退出</Text>
                            </Button>
                         </Card>
                         
                    </View>  
                </Content>

        {/*分享*/}
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={sco.SC.Invite}
            onRequestClose={() => {alert("")}}>
            <View style={styles.ShareBody}>
              <View style={styles.ShareContainer}>
                <View>
                  <Text style={styles.ShareTitle}>分享给好友</Text>
                </View>
                <View style={styles.ShareIcons}>
                  <TouchableHighlight style={styles.ShareIcon}>
                    <Image  source={require('../public/img/icon-朋友圈.png')} />
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.ShareIcon} >
                    <Image  source={require('../public/img/icon-朋友圈.png')} />
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.ShareIcon} >
                    <Image  source={require('../public/img/icon-微信.png')} />
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.ShareIcon} >
                    <Image  source={require('../public/img/icon-QQ01.png')} />
                  </TouchableHighlight>
                </View>
                <View style={styles.ShareIcons}>
                  <Text style={styles.ShareIconText}>建筑圈</Text>
                  <Text style={styles.ShareIconText}>朋友圈</Text>
                  <Text style={styles.ShareIconText}>微信好友</Text>
                  <Text style={styles.ShareIconText}>QQ好友</Text>
                </View>
                <View style={styles.ShareCancel}>
                  <TouchableHighlight onPress={() => {sco.ShowInvite(false)}}>
                    <Text style={styles.ShareCancelText}>取消</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
        </Modal>
       </Container>
    )
  }
}

  