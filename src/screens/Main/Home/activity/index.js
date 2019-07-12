/**
 * Created by zz on 2019/4/20 18:02.
 * file description:
 */
import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'
import { Button } from '@ant-design/react-native'
import Header from '../../../../component/Header'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../index'
import { inject, observer } from 'mobx-react'
import URL from '../../../../env'
@inject('newsStore', 'appStore')
@observer
class activity extends Component {
  handleShowDetails = text => {
    alert(text)
  }
  componentDidMount() {
    this.init()
  }
  init = () => {
    this.props.newsStore.getActivityList()
  }
  handleDeleteActivity = async ActivityNum => {
    if (this.props.appStore.user.power == 1) {
      await this.props.newsStore.deleteActivity(ActivityNum)
    } else alert('只有管理员才可以执行该操作')
    setTimeout(() => {
      this.props.newsStore.getActivityList()
    }, 200)
  }

  renderItem = item => {
    return (
      <TouchableOpacity onPress={() => this.handleShowDetails(item.text)}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: `${URL}/public/${item.img}` }} style={styles.imgStyle} />
          <View style={{ flex: 1 }}>
            <Text style={styles.newTitle}>{item.title}</Text>
            {/*<Text style={styles.wenebn}>{item.text}</Text>*/}
          </View>
          <TouchableOpacity
            style={{ paddingHorizontal: 10 }}
            onPress={() => this.handleDeleteActivity(item.ActivityNum)}
          >
            <Icon name="ios-close" size={30} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { ActivityList } = this.props.newsStore
    return (
      <View style={styles.container}>
        <Header
          title={'社团活动'}
          right={
            <Button
              type={'primary'}
              onPress={() => {
                if (this.props.appStore.user.power == 1) {
                  this.props.navigation.navigate('addActivity')
                } else alert('只有管理员才可以执行该操作')
              }}
            >
              添加
            </Button>
          }
        />
        <FlatList
          data={ActivityList}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.ActivityNum}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingBottom: 30
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  newTitle: {
    color: '#4f4f4f',
    fontSize: 16,
    marginBottom: 5
  },
  wenebn: {
    color: '#bababa',
    // justifyContent: 'center',
    fontSize: 14,
    overflow: 'hidden'
  },
  // 图像样式
  imgStyle: {
    margin: 10,
    marginLeft: 0,
    width: 90,
    height: 80
  }
})
export default activity
