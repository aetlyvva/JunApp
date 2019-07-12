/**
 * Created by ZZ on 2019/4/14 11:20.
 * file description:
 */
import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import Button from '../../../component/Button'
import Header from '../../../component/Header'
import NavigationBar from 'react-native-navbar'
import { basicStyle } from '../../../theme/MainStyle'

class Home extends Component {
  handleClickImage = () => {
    this.props.navigation.navigate('Find')
  }
  render() {
    return (
      <View style={[basicStyle.container, styles.container]}>
        <Header title={'JNU生活小助手'} noBack />
        <Image source={require('../../../assets/blackhole.jpg')} style={styles.imgStyle} />
        <Button
          text={'校园公告'}
          buttonbackground={'#00b3ca'}
          buttonTextsize={25}
          touch={() => {
            this.props.navigation.navigate('announcement')
          }}
        />
        <Button
          text={'社团活动'}
          buttonbackground={'#00b3ca'}
          buttonTextsize={25}
          touch={() => {
            this.props.navigation.navigate('activity')
          }}
        />
        <Button
          text={'开课列表'}
          buttonbackground={'#00b3ca'}
          buttonTextsize={25}
          touch={() => {
            this.props.navigation.navigate('course')
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 主轴为纵轴
    flexDirection: 'column',
    // 子元素沿着主轴的排列方式
    justifyContent: 'flex-start',
    // alignItems可以决定其子元素沿着次轴（与主轴垂直的轴）的排列方式
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  // 图像样式
  imgStyle: {
    backgroundColor: 'green',
    width: Dimensions.get('window').width,
    height: 200
  }
})

export default Home
