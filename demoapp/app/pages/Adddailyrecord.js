import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Adddailyrecord extends Component {
  constructor(props) {
    super(props); 
    main.init('Adddailyrecord',this); 
    sco = this;
  }
  render() {
    return (
      <Container>
          <HeadNav 
            headerText='添加日志'
            headerRight='完成'
            fn={()=>{alert(1)}}
          />
        <Content >
          <View>
            <Form style={styles.whitebackground}>
              <Item style={styles.itemLine} fixedLabel first>
                <Text style={styles.labelwidth}>时间</Text>
                <Input placeholder="选择时间" 
                  placeholderTextColor='#CCC'/>
                <Button style={styles.whitebackground}>
                  <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
              </Item>
              <Item style={styles.itemLine} fixedLabel>
                <Text style={styles.labelwidth}>上午天气</Text>
                <Input placeholder="天气情况" 
                  placeholderTextColor='#CCC'/>
                <Button style={styles.whitebackground}>
                  <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
              </Item>

              <Item style={styles.itemLine} fixedLabel>
                <Text style={styles.labelwidth}>下午天气</Text>
                <Input placeholder="天气情况" 
                  placeholderTextColor='#CCC'/>
                <Button style={styles.whitebackground}>
                  <Image style={styles.inputimg} source={require('../public/img/more.png')}/>
                </Button>
              </Item>

              <Item style={styles.itemLine} fixedLabel>
                <Text style={styles.labelwidth}>最高温度</Text>
                <Input placeholder="输入最高温度" 
                  placeholderTextColor='#CCC'/>
              </Item>

              <Item style={styles.itemLine} fixedLabel>
                <Text style={styles.labelwidth}>最低温度</Text>
                <Input placeholder="输入最低温度" 
                  placeholderTextColor='#CCC'/>
              </Item>

              <Item style={styles.itemLine} fixedLabel last>
                <Text style={styles.labelwidth}>平均温度</Text>
                <Input placeholder="输入平均温度" 
                  placeholderTextColor='#CCC'/>
              </Item>

            </Form>
            <View>
              <Text note style={[styles.middletext,styles.back]}>施工内容</Text>
            </View>
            <Form style={styles.whitebackground}>
              <Item style={styles.ListItemtype} fixedLabel button onPress={Actions.Adddailyrecord2}>
                <Text style={styles.labelwidth}>分项工程</Text>
                <Right>      
                  <Image style={styles.inputimg} source={require('../public/img/more.png')}/>   
                </Right>
              </Item>

              <Item style={styles.ListItemtype} fixedLabel last button onPress={Actions.Adddailyrecord2}>
                <Text style={styles.labelwidth}>分项工程</Text>
                <Right>      
                  <Image style={styles.inputimg} source={require('../public/img/more.png')}/>   
                </Right>
              </Item>
            </Form>   
            <Text note style={[styles.middletext,styles.back]}>主要记录</Text>
            <View style={[styles.whitebackground,styles.boxtxt]}>
                <Textarea  multiline={true}
                blurOnSubmit={true}
                returnKeyType ='done'
                placeholder="请输入内容"
                placeholderTextColor='#CCCCCC'
                style={[styles.textarea,styles.f16]}
                underlineColorAndroid="transparent" />
              </View>
          </View>
        </Content>
      </Container>
    );
  }


};

  