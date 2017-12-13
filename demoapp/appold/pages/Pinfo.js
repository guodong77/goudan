import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,Modal,ImageBackground,Platform,StatusBar,TouchableOpacity,ScrollView,TextInput,TouchableHighlight}from 'react-native';
import {Container, Header, Content, Button,Icon, Right, Footer, Title,Card,CardItem} from 'native-base';


let sco = {}
export default class Pinfo extends Component {
  constructor(props) {
    super(props); 
    main.init('Pinfo',this); 
    sco = this;
    sco.state = {
      modalVisible: false,
      modalCompany:false,
    };
  }

  setModalVisible(visible) {
    sco.setState({modalVisible: visible});
  }

  setmodalCompany(visible) {
    sco.setState({modalCompany: visible});
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
        <Container>
              <Header style={{backgroundColor:'#5C9EFD'}}>
                    <Button transparent>
                        <Text onPress={() => {navigate('Personal', {name: 'Brent'})}} style={styles.PcomTitleText}>取消</Text>
                    </Button>

                    <Title style={styles.PcomTitle}>编辑个人资料</Title>

                    <Button transparent>
                      <Text style={styles.PcomTitleText}>完成</Text>
                    </Button>
              </Header>
              <Card >
                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>头像</Text>
                              <Right style={styles.PcomTypeIcons}>
                              <TouchableHighlight  onPress={() => {sco.setModalVisible(true)}} >
                                <Image style={styles.PersonalTopImg} source={require('../public/img/touxiang.png')}/>
                              </TouchableHighlight>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>账号</Text>
                              <Right style={styles.PcomType}>
                                <Text>yy10086</Text>
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>名称</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text onPress={() => {navigate('PEditName', {name: 'Brent'})}} style={{marginLeft:3,marginRight:10}}>王小花</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>性别</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text style={{marginLeft:30,marginRight:10}}>女</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>职务</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text onPress={() => {navigate('PEditPost', {name: 'Brent'})}} style={{marginLeft:16,marginRight:10}} >前端</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg} >公司</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text onPress={() => {sco.setmodalCompany(true)}} style={{marginLeft:16,marginRight:10}}>前端</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>所在城市</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text  style={{marginLeft:-20,marginRight:10}}>深圳</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>手机号码</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text onPress={() => {navigate('PEditPhone', {name: 'Brent'})}} style={{marginLeft:-80,marginRight:10}}>12345678901</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>

                          <View style={styles.PcomMsgView}>  
                            <CardItem style={styles.PersonalTypeCardItem}> 
                                <Text style={styles.PersonalTopMsg}>邮箱</Text>
                              <Right style={styles.PcomTypeIcons}>
                                <Text onPress={() => {navigate('PEditMail', {name: 'Brent'})}} style={{marginLeft:-88,marginRight:10}}>123456789@qq.com</Text>
                                <Icon  name="ios-arrow-forward" />
                              </Right>
                             </CardItem>
                          </View>
             </Card> 

             <Modal
                animationType={"fade"}
                transparent={true}
                visible={sco.state.modalVisible}
                 onRequestClose={() => {alert("")}}>
                <View style={[styles.TalkContainer,styles.NewImgBody]}>
                  <View style={styles.NewImgContainer}>
                    <Text style={[styles.NewImgChoose,styles.NewImgPhoto]}>拍照</Text>
                    <Text style={styles.NewImgChoose}>从手机相册选择</Text>
                  </View>
                  <View style={styles.NewImgContainer}>
                     <Text style={styles.NewImgChoose} onPress={() => {sco.setModalVisible(!sco.state.modalVisible)}}>取消</Text>
                  </View>
                </View>
            </Modal> 

            <Modal
                animationType={"fade"}
                transparent={true}
                visible={sco.state.modalCompany}
                 onRequestClose={() => {alert("")}}>
                <View style={styles.TalkContainer}>
                  <View style={styles.ChangeCompanyMsg}>
                    <View style={styles.ChangeCompanyNotice}>
                      <Text style={styles.ChangeCompanyNoticeTitle}>更换公司注意事项</Text>
                      <Text style={styles.ChangeCompanyNoticeText}>1.您发布的的职位将被视为情况予待审核或删除处理</Text>
                      <Text style={styles.ChangeCompanyNoticeText}>2.你若已验证，认证状态将被取消，需要重新验证</Text>
                      <Text style={styles.ChangeCompanyNoticeText}>3.公司信息会被清空,需要重新填写</Text>
                      <Text style={styles.ChangeCompanyNoticeText}>4.一旦操作成功，将不能撤回，请谨慎操作</Text>
                    </View>
                    <View style={styles.ChangeCompanyBottons}>
                      <Button style={styles.ChangeCompanyBotton} >
                        <Text onPress={() => {sco.setmodalCompany(!sco.state.modalCompany)}}>取消</Text>
                      </Button>
                      <Button style={styles.ChangeCompanyBotton}>
                        <Text style={styles.ChangeCompanyBottonActive} onPress={() => {navigate('PEditCompany', {name: 'Brent'}),sco.setmodalCompany(!sco.state.modalCompany)}}>更换公司</Text>
                      </Button>
                    </View>
                  </View>
                </View>
            </Modal>            
        </Container>
    )
  }
}

  