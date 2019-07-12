import React, { Component } from 'react'
import { PixelRatio, ActivityIndicatorIOS, Dimensions } from 'react-native'

module.exports = {
  navigationHeight: 44,
  navigationBarBGColor: '#3497FF',
  statusBarHeight: 20,
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  /*loading效果*/
  loading: <ActivityIndicatorIOS color="#3E00FF" style={{ marginTop: 40 }} />
}
