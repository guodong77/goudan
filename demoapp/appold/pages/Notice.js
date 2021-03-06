import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Tabs,Tab,List,
  ListItem,Thumbnail,TabHeading} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};

export default class Notice extends Component {
  constructor(props) {
    super(props); 
    main.init('Notice',this);  
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header hasTabs style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity  onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>通知公告</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() =>sco.ysnav.navigate('Sendnotice')}>
                <Image  source={require('../public/img/jiahao.png')} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={styles.noticebg}>
          <Tabs>
          <Tab style={[styles.topborder,styles.noticebg]}
            heading={
              <TabHeading><Text>收件列表</Text><Image source={require('../public/img/下拉.png')} /></TabHeading>
            }
          >
            <List style={[styles.whitebackground,styles.mb20]}> 
              <ListItem first>
                <Grid>
                  <Row><Text>通知标题通知标题通知标题通知标题...</Text><Text note>09-20 14:23</Text></Row>
                  <Row><Text style={[styles.f14,styles.nrtext,styles.mt20]}>通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容</Text></Row>
                </Grid>
              </ListItem>
              <ListItem last style={styles.xjuzhong}>
                <Left>
                  <Text style={[styles.f14,styles.nrtext]}>发件人：王小花</Text>
                </Left>
                <Right>
                  <TouchableOpacity style={[styles.flexStart,styles.xjuzhong]} onPress={() =>sco.ysnav.navigate('Noticedetail')}>
                    <Text style={[styles.f14,styles.tyanniutext]}>查看全部</Text>
                    <Image style={styles.morecss} source={require('../public/img/more.png')} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
            <List style={[styles.whitebackground,,styles.mb20]}> 
              <ListItem first>
                <Grid>
                  <Row><Text>通知标题通知标题通知标题通知标题...</Text><Text note>09-20 14:23</Text></Row>
                  <Row><Text style={[styles.f14,styles.nrtext,styles.mt20]}>通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容</Text></Row>
                </Grid>
              </ListItem>
              <ListItem last style={styles.xjuzhong}>
                <Left>
                  <Text style={[styles.f14,styles.nrtext]}>发件人：王小花</Text>
                </Left>
                <Right>
                  <TouchableOpacity style={[styles.flexStart,styles.xjuzhong]} onPress={() =>sco.ysnav.navigate('Noticedetail')}>
                    <Text style={[styles.f14,styles.tyanniutext]}>查看全部</Text>
                    <Image style={styles.morecss} source={require('../public/img/more.png')} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
          </Tab>
          <Tab style={[styles.topborder,styles.noticebg]} heading={<TabHeading><Text>全部</Text><Image source={require('../public/img/下拉.png')} /></TabHeading>}>
            <Text>No Icon</Text>
          </Tab>
        </Tabs>
        </Content>
      </Container>
    );
  }


};

  