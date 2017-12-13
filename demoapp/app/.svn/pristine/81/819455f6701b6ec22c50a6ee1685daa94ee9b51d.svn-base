import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Title,Right,Form,Label} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Findcompany extends Component {
  constructor(props) {
    super(props); 
    main.init('Findcompany',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header searchBar rounded style={[styles.gctopColor,styles.gctopheight]}>
          <Item style={styles.searchbox}>
            <Image style={styles.searchimg} source={require('../public/img/icon-搜索.png')}/>
            <Input placeholder="输入企业名称搜索" placeholderTextColor='#CCC'/>
          </Item>
          <TouchableOpacity onPress={Actions.pop}>
            <View style={styles.cancel}>
              <Text style={[styles.f16,styles.whiteText]}>取消</Text>
            </View>
          </TouchableOpacity>
        </Header>
        <Content>
          <View>
            <View style={[styles.searchCardItem,styles.whitebackground,styles.flexStart]}>
               <Grid>
                <Col size={1} style={styles.colpos}>
                  <Image source={require('../public/img/gclogo.png')}/>
                </Col>
                <Col size={5}>
                  <Row size={1.5} style={{position:'relative'}}>
                    <Text>万达集团</Text>
                    <View style={styles.applyrelate}>
                      <TouchableOpacity>
                        <View style={styles.apply}>
                          <Text style={[styles.f14,styles.applyText]}>申请关联</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </Row>
                  <Row style={styles.xjuzhong} size={1.5}> 
                    <Image  source={require('../public/img/admin.png')} />
                    <Text note style={styles.f12}>王小花</Text>
                    <Image style={styles.textpos} source={require('../public/img/time.png')} />
                    <Text note style={styles.f12}>2017-09-14</Text>
                  </Row>
                </Col>
              </Grid> 
            </View>
          </View>
        </Content>
      </Container>
    );
  }


};

  