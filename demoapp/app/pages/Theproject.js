import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Item, Input, Text, Card, CardItem, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import { AppRegistry, Image, View, TouchableOpacity, FlatList } from 'react-native';
import HeadNav1 from '../components/HeadNav1';
let sco = {};
export default class Theproject extends Component {
  constructor(props) {
    super(props);
    main.init('Theproject', this);
    sco = this;

    console.log(Actions);
  }

  _renderItem({ item,key }) {
   debugger;
    return (
      <TouchableOpacity key={key} onPress={()=>Actions.Tprojectdetail({value:item})}>
        <View style={[styles.carditem, styles.whitebackground]}>
          <Grid>
            <Col size={1} style={styles.colpos}>
              <Image source={{ uri:sco.firstimg(item.img)}} style={{ width: 60, height: 60 }} />
            </Col>
            <Col size={4}>
              <Row size={1.5}>
                <Text>{item.prname}{item.prname}{item.prname}{item.prname}</Text>
              </Row>
              <Row style={styles.xjuzhong} size={1.5}>
                <Image source={require('../public/img/jiegou.png')} />
                <Text note >{item.structure}</Text>
                <Image style={styles.textpos} source={require('../public/img/dizhi.png')} />
                <Text note>{item.cityv}</Text>
              </Row>
              <Row size={1} style={styles.worktimeRow}>
                <Text style={styles.worktime1}>开工：{item.kaigong!=0?item.kaigong:''}</Text>
                <Text style={styles.worktime2}>竣工：{item.jungong!=0?item.jungong:''}</Text>
              </Row>
            </Col>
          </Grid>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Container>
         <HeadNav1 
            headerText={
              <View style={{flexDirection:'row',justifyContent:'space-around',flex:1,}}>
               <Text style={[styles.TheprojectTopText, sco.tapshow == 0 ? styles.BuildActive : '']} onPress={() => { sco.funtapshow(0) }}>我的工程</Text>
               <Text style={[styles.TheprojectTopText, sco.tapshow == 1 ? styles.BuildActive : '']} onPress={() => { sco.funtapshow(1) }}>工程管理</Text>
             </View> 
            }
            headerRight={<Image  source={require('../public/img/jiahao.png')} />}
            Right={()=>{sco.onListShow()}}
        />
        {/* <Header style={[styles.gctopColor, styles.gctop, styles.gctopheight]}>
          <Grid>
            <Col size={3}>
              <View style={styles.TheprojectTop}>
                <Text style={[styles.TheprojectTopText, sco.tapshow == 0 ? styles.BuildActive : '']} onPress={() => { sco.funtapshow(0) }}>我的工程</Text>
                <Text style={[styles.TheprojectTopText, sco.tapshow == 1 ? styles.BuildActive : '']} onPress={() => { sco.funtapshow(1) }}>工程管理</Text>
              </View>
            </Col>
            <Col size={1} style={styles.gctopimg}>
              <TouchableOpacity onPress={() => { sco.onListShow() }}>
                <Image source={require('../public/img/jiahao.png')} />
              </TouchableOpacity>
            </Col>
          </Grid>
        </Header> */}
        {sco.show == true &&
          <View style={styles.toppop}>
            <TouchableOpacity style={styles.toppopitem} onPress={()=>{Actions.Taddproject(),sco.onListShow()}}>
              <Text style={styles.toppoptext}>创建工程</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toppopitem} onPress={()=>{Actions.Tjoinproject(),sco.onListShow()}}>
              <Text style={styles.toppoptext}>加入工程</Text>
            </TouchableOpacity>
          </View>
        }
        <Content>
          {sco.tapshow == 0 &&
            <View style={styles.card}>

              <Text note style={styles.toptext}>我创建的工程·{sco.com_list.data.length}</Text>

              <FlatList
                data={sco.com_list.data}
                renderItem={this._renderItem}
              />
      {sco.com_list.data.length>3&&<View style={{ alignItems: 'center', marginBottom: 15 }}><Text style={{ fontSize: 16, color: '#32AAFD' }}>查看更多项目></Text></View>}

               
              <Text note style={styles.toptext}>我加入的项目部·{sco.com_list.data.length}</Text>
              <FlatList
                data={sco.com_list1.data}
                renderItem={this._renderItem}
              />
     {sco.com_list1.data.length>3&&<View style={{ alignItems: 'center', marginBottom: 15 }}><Text style={{ fontSize: 16, color: '#32AAFD' }}>查看更多项目></Text></View>
                          }</View>

          }




          {sco.tapshow == 1 &&
            <View>
              <View style={styles.gcgltop}></View>
              <Grid style={styles.whitebackground}>
                <Row style={[styles.toppicker, styles.marginato]}>
                  <View style={[styles.pickerpa, styles.flexStart, styles.xjuzhong]}>
                    <Text style={[styles.addToptitle, styles.f18, styles.bword]}>旭日领域商住楼</Text>
                    <Image style={styles.morecss} source={require('../public/img/xiala.png')} />
                  </View>
                </Row>
                <Row>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button onPress={Actions.Single} >
                      <Image source={require('../public/img/jindu.png')} />
                      <Text style={styles.colText}>形象进度</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Teditedlist}>
                      <Image source={require('../public/img/概况.png')} />
                      <Text style={styles.colText}>工程概况</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button onPress={Actions.Picstorage}>
                      <Image source={require('../public/img/img.png')} />
                      <Text style={styles.colText}>项目图库</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Weatherglass}>
                      <Image source={require('../public/img/weather.png')} />
                      <Text style={styles.colText}>晴雨表</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button onPress={Actions.Hengdaotu} >
                      <Image source={require('../public/img/hengdaotu.png')} />
                      <Text style={styles.colText}>横道图</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Dailyrecord}>
                      <Image source={require('../public/img/dialog.png')} />
                      <Text style={styles.colText}>日志</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Relatecompany}>
                      <Image source={require('../public/img/guanlian.png')} />
                      <Text style={styles.colText}>企业关联</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Person}>
                      <Image source={require('../public/img/renyuan.png')} />
                      <Text style={styles.colText}>项目人员</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Notice}>
                      <Image source={require('../public/img/tongzhi.png')} />
                      <Text style={styles.colText}>通知公告</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Picstorage}>
                      <Image source={require('../public/img/wangpan.png')} />
                      <Text style={styles.colText}>项目网盘</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Single}>
                      <Image source={require('../public/img/anquan.png')} />
                      <Text style={styles.colText}>安全巡查</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Pika}>
                      <Image source={require('../public/img/pika.png')} />
                      <Text style={styles.colText}>皮卡车</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Tujian}>
                      <Image source={require('../public/img/tujian.png')} />
                      <Text style={styles.colText}>土建资料</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Anquan}>
                      <Image source={require('../public/img/anquanziliao.png')} />
                      <Text style={styles.colText}>安全资料</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.coltype} button  onPress={Actions.Songjian}>
                      <Image source={require('../public/img/送检.png')} />
                      <Text style={styles.colText}>送检管理</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={styles.coltype}></Col>
                </Row>
              </Grid>
            </View>
          }
        </Content>
      </Container>
    );
  }


};

