import React from 'react';
import { Text, View } from 'react-native';
import {Header, Button,Icon, Right,Title,Left,Body} from 'native-base';
const HeadNav1 = (props) => {

  const { textStyle, viewStyle } = styles;
  return (
    <Header
      style={{ backgroundColor: "#4fa4ff",height:44, }}
      androidStatusBarColor="#000"
      iosBarStyle="light-content"
    >
        <Left style={{flex:1,}}>
        {props.headerLeft&&
            <Button transparent underlayColor onPress={props.Left}>
              {props.headerLeft}
            </Button>
        }
        </Left>
        <Body style={{flexDirection:'row',justifyContent:'space-around',flex:4,}}>
            {typeof props.headerText =='string'?<Text style={{color:'#fff',fontSize:20,}}>{props.headerText}</Text>:props.headerText}
        </Body>
        <Right style={{flex:1,}} >
        {props.headerRight&&
            <Button transparent underlayColor onPress={props.Right}>
              {props.headerRight}
            </Button>
        }
       </Right> 

    </Header>
    
 
  )
}
const styles = {
  textStyle: {
    fontSize: 20,
    color:"#fff",
  },
  viewStyle: {
    backgroundColor: '#4fa4ff',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  }
}
export default HeadNav1;