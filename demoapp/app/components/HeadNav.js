import React from 'react';
import { Text, View } from 'react-native';
import {Header, Button,Icon, Right,Title,Left,Body} from 'native-base';
const HeadNav = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <Header
      style={{ backgroundColor: "#4fa4ff" ,height:44,}}
      androidStatusBarColor="#000"
      iosBarStyle="light-content"
    >
        <Left>
            <Button transparent  onPress={Actions.pop}>
              <Icon name="arrow-back" style={{ color: "#FFF" }} />
            {/* {props.headerLeft?<Text style={{color:'#fff',fontSize:16,}}>取消</Text>:<Icon name="arrow-back" style={{ color: "#FFF" }} />
            } */}
            </Button>
        </Left>
        <Body>
        {typeof props.headerText =='string'?<Title>{props.headerText}</Title>:props.headerText} 
        </Body> 
        <Right>
        {props.headerRight&&
            <Button transparent underlayColor onPress={props.fn}>
              {typeof props.headerRight =='string'?<Text style={{color:'#fff',fontSize:16,}}>{props.headerRight}</Text>:props.headerRight}
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
export default HeadNav;