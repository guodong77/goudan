import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label,List,ListItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
export default class Tprojectdetail extends Component {
  constructor(props) {
    super(props); 
    main.init('Tprojectdetail',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight]}>
          <Left>
            <TouchableOpacity  transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.titleposition}>
            <Title style={styles.addToptitle}>工程详情</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => {sco.onListShow()}} >
                <Image  source={require('../public/img/jiahao.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sco.ysnav.navigate('Teditedlist')} style={styles.iconpos}>
                <Image  source={require('../public/img/icon-发布.png')} />
            </TouchableOpacity>
          </Right>
        </Header>
        {sco.show == true&&
            <View style={styles.toppop}>
              <View>
                <TouchableOpacity  style={styles.toppopitem} onPress={() => sco.ysnav.navigate('Taddson')}>
                  <Text style={styles.toppoptext}>添加子单位</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity  style={styles.toppopitem} onPress={() => sco.ysnav.navigate('Taddmac')}>
                  <Text style={styles.toppoptext}>添加机械</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        <Content>
            <View style={[styles.searchCardItem,styles.whitebackground,styles.xqcard]}>
              <Grid>
                <Col size={1} style={styles.colpos}>
                  <Image source={require('../public/img/gclogo.png')}/>
                </Col>
                <Col size={4}>
                  <Row size={1.5}>
                    <Text>旭日领域商住楼</Text>
                  </Row>
                  <Row style={styles.xjuzhong} size={1.5}> 
                    <Image  source={require('../public/img/admin.png')} />
                    <Text note style={styles.f12}>王小花</Text>
                    <Image style={styles.textpos}  source={require('../public/img/jiegou.png')} />
                    <Text note style={styles.f12}>框剪结构</Text>
                    <Image style={styles.textpos}  source={require('../public/img/dizhi.png')} />
                    <Text note style={styles.f12}>深圳</Text>
                  </Row>
                  <Row size={1} style={styles.worktimeRow}>
                    <Text  style={styles.worktime1}>开工：2017-09-17</Text>
                    <Text  style={styles.worktime2}>竣工：2017-09-17</Text>
                  </Row>
                </Col>
              </Grid>      
            </View>
            <Grid style={[styles.xqcard1,styles.xqcard,styles.whitebackground]}>  
              <Row>
                <Text>造价：</Text><Text>9912万元</Text>
              </Row>
              <Row >
                <Text>面积：</Text><Text>9912万元</Text>
              </Row>
              <Row >
                <Text>施工许可证号：</Text><Text>9912万元</Text>
              </Row>
              <Row >
                <Text>见证卡号：</Text><Text>9912万元</Text>
              </Row>
              <Row >
                <Text>地址：</Text><Text>9912万元</Text>
              </Row>
            </Grid>
            <Grid style={[styles.xqcard1,styles.xqcard,styles.whitebackground]}>  
              <Row>
                <Text>施工单位：</Text><Text>福建省龙灯建设集团有限公司</Text>
              </Row>
              <Row >
                <Text>建设单位：</Text><Text>福建省龙灯建设集团有限公司</Text>
              </Row>
              <Row >
                <Text>监理单位：</Text><Text>福建省龙灯建设集团有限公司</Text>
              </Row>
              <Row >
                <Text>勘察单位：</Text><Text>福建省龙灯建设集团有限公司</Text>
              </Row>
            </Grid>
            <View style={styles.xqcard}>
                <Text>子单位·5</Text>
            </View>
            <List style={styles.whitebackground}> 
              <ListItem button onPress={() => sco.ysnav.navigate('Tsondetail')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>一栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Tsondetail')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>二栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Tsondetail')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>三栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Tsondetail')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>四栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Tsondetail')} style={[styles.worktimeRow,styles.ListItemtype]} last>
                <Text>五栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
            </List> 
            <View style={[styles.xqcard,styles.listtitle]}>
                <Text>施工机械·2</Text>
            </View>
            <List style={styles.whitebackground}> 
              <ListItem button onPress={() => sco.ysnav.navigate('Teditemac')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>一栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Teditemac')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>二栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Teditemac')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>三栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Teditemac')} style={[styles.worktimeRow,styles.ListItemtype]}>
                <Text>四栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
              <ListItem button onPress={() => sco.ysnav.navigate('Teditemac')} style={[styles.worktimeRow,styles.ListItemtype]} last>
                <Text>五栋</Text>
                <Badge info style={styles.badgetype}><Text>5层</Text></Badge>
              </ListItem>
            </List> 
        </Content>
      </Container>
    );
  }


};

  