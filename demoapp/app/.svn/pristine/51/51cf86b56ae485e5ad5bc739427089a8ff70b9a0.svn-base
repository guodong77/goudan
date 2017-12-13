import React, { Component } from 'react';
import { Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  Picker,
  Form,
  H3,
  ActionSheet,
  Item as FormItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import {AppRegistry,Image,View,TouchableHighlight ,Platform,}from 'react-native';
let sco ={};
import HeadNav from '../components/HeadNav';
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class NativeBasedemo extends Component {
  constructor(props) {
    super(props); 
    main.init('NativeBasedemo',this); 
    sco = this;
  }
  render() {
    return (
      <Container style={styles.whitebackground}>

        <Content padder>
          <Button
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Options"
                },
                buttonIndex => {
                  this.setState({ clicked: BUTTONS[buttonIndex] });
                }
              )}
          >
            <Text>Actionsheet</Text>
          </Button>
        </Content>
      </Container>
    );
  }


};

  