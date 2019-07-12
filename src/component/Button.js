/**
 * Created by ZZ on 2019/4/20 15:03.
 * file description:
 */
import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default class Button extends Component {
  render() {
    const {
      text,
      buttonbackground,
      touch,
      buttonTextsize,
      xiahuaxian
    } = this.props

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonbackground }]}
        onPress={() => {
          touch()
        }}>
        <Text
          style={[
            styles.buttonText,
            { fontSize: buttonTextsize },
          ]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    // 主轴为纵轴
    flexDirection: 'column',
    // 子元素沿着主轴的排列方式
    justifyContent: 'flex-start',
    // alignItems可以决定其子元素沿着次轴（与主轴垂直的轴）的排列方式
    alignItems: 'center'
  },
  button: {
    height: 60,
    width: 300,
    borderRadius: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    // 水平居中
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000'
  }
})
