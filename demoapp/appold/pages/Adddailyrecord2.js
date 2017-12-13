import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
let sco ={};
export default class Adddailyrecord2 extends Component {
  constructor(props) {
    super(props); 
    main.init('Adddailyrecord2',this); 
    sco = this;
  }
  
  render() {
    return (
      <Container>
        <Header style={[styles.gctopColor,styles.gctopheight,styles.worktimeRow,styles.xjuzhong]}>
          <View>
            <TouchableOpacity transparent onPress={() =>sco.ysnav.goBack()}>
              <Image  source={require('../public/img/返回03.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleposition}>
            <Title style={styles.addToptitle}>添加日志</Title>
          </View>
          <View>
            <TouchableOpacity  transparent onPress={() => sco.ysnav.goBack()}>
              <Text style={[styles.f16,styles.whiteText]}>完成</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <Content style={styles.whitebackground}>
        <View>
            <Form style={styles.whitebackground}>
              <Item style={styles.itemLine} fixedLabel first>
                <Text style={styles.labelwidth}>分项工程</Text>
                <Input placeholder="输入工程" 
                  placeholderTextColor='#CCC'/>
              </Item>
              <Item style={styles.itemLine} fixedLabel>
                <Text style={styles.labelwidth}>层段位置</Text>
                <Input placeholder="输入层段位置" 
                  placeholderTextColor='#CCC'/>
              </Item>

              <Item style={styles.itemLine} fixedLabel>
                <Text style={styles.labelwidth}>工作班组</Text>
                <Input placeholder="输入工作班组" 
                  placeholderTextColor='#CCC'/>
              </Item>

              <Item style={styles.itemLine} fixedLabel>
                <Text style={styles.labelwidth}>工作人数</Text>
                <Input placeholder="输入工作人数" 
                  placeholderTextColor='#CCC'/>
              </Item>

              <Item style={styles.itemLine} fixedLabel last>
                <Text style={styles.labelwidth}>进度情况</Text>
                <Input placeholder="输入进度情况" 
                  placeholderTextColor='#CCC'/>
              </Item>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }


};

  