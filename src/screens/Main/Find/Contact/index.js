/**
 * Created by ZZ on 2019/4/20 18:58.
 * file description:
 */
import React, { Component } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Modal } from '@ant-design/react-native'
import Header from '../../../../component/Header'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../index'
import { inject, observer } from 'mobx-react'
import URL from '../../../../env'
import { basicColor } from '../../../../theme/MainStyle'

@inject('findStore', 'appStore')
@observer
class Contact extends Component {
  componentDidMount() {
    this.init()
  }
  init = () => {
    this.props.findStore.getFriendList(this.props.appStore.user.uid)
  }
  deleteFriend = async item => {
    await this.props.findStore.deleteFriend(this.props.appStore.user.uid, item.friendUid)
    this.init()
  }
  renderItem = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingTop: 10,
          paddingHorizontal: 10,
          paddingBottom: 10
        }}
      >
        <Image source={{ uri: `${URL}/public/${item.img}` }} style={styles.imgStyle} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.friendName}</Text>
        </View>
        <TouchableOpacity onPress={() => this.deleteFriend(item)} style={{ padding: 10 }}>
          <Text style={{ color: basicColor.blue, fontSize: 16 }}>取关</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { friendList } = this.props.findStore
    return (
      <View style={styles.container}>
        <Header
          title={'我的关注'}
          right={{
            title: '添加',
            onPress: () => {
              Modal.prompt('搜索', '请输入用户id', async text => {
                const result = this.props.findStore.addFriend(this.props.appStore.user.uid, text)
                setTimeout(() => {
                  this.props.findStore.getFriendList(this.props.appStore.user.uid)
                }, 200)
              })
            }
          }}
        />
        <FlatList
          data={friendList.slice()}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.friendUid}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  name: {
    fontSize: 15,
    marginBottom: 8
  },
  // 图像样式
  imgStyle: {
    width: 30,
    height: 30
  }
})
export default Contact
