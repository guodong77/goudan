import React, { Component } from 'react';
import { Container, Header, Content,Button,Item, Input,Text,Body,Left,Right,Form,Label,Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableOpacity,TextInput}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
export default class Adddailyrecord2 extends Component {
  constructor(props) {
    super(props); 
    main.init('Adddailyrecord2',this); 
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

  