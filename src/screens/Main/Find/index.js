import React, { Component } from 'react'

import ListItem from 'component/ListItem.js'
import ListItemDivider from 'component/ListItemDivider.js'
import Global from 'utils/Global'
import { Dimensions, Image, PixelRatio, ScrollView, StyleSheet, View } from 'react-native'
import Header from '../../../component/Header'

const { width } = Dimensions.get('window')

export default class Find extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title={'发现'} />
        <View style={styles.divider} />
        <ScrollView style={styles.content}>
          <View style={{ width: width, height: 20 }} />
          <ListItem
            icon={require('../../../img/ic_friends_circle.png')}
            text={'朋友圈'}
            handleClick={() => {
              this.props.navigation.navigate('FriendCircle')
            }}
          />
          <ListItemDivider />
          <ListItem
            icon={require('../../../img/ic_contacts_selected.png')}
            text={'关注'}
            handleClick={() => {
              this.props.navigation.navigate('Contact')
            }}
          />
        </ScrollView>
        <View style={styles.divider} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#D3D3D3'
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    backgroundColor: Global.pageBackgroundColor
  },
  tabBarIcon: {
    width: 24,
    height: 24
  }
})
