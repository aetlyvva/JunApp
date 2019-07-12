/**
 * Created by ZZ on 2019/4/20 18:58.
 * file description:
 */
import React, { Component } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '@ant-design/react-native'
import Header from '../../../../component/Header'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../index'
import { inject, observer } from 'mobx-react'
import URL from '../../../../env'

@inject('newsStore', 'appStore')
@observer
class course extends Component {
  componentDidMount() {
    this.init()
  }
  init = () => {
    this.props.newsStore.getCourseList()
  }
  handleDeleteCourse = async classNum => {
    if (this.props.appStore.user.power == 1) {
      await this.props.newsStore.deleteCourse(classNum)
    } else alert('只有管理员才可以执行该操作')
    setTimeout(() => {
      this.props.newsStore.getCourseList()
    }, 200)
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
          <Text style={styles.name}>{item.className}</Text>
          <Text style={styles.name}>{item.totalTeacher}</Text>
          <Text style={styles.name}>{item.classNum}</Text>
        </View>
        <TouchableOpacity
          style={{ paddingHorizontal: 10, justifyContent: 'center' }}
          onPress={() => this.handleDeleteCourse(item.classNum)}
        >
          <Icon name="ios-close" size={30} />
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { courseList } = this.props.newsStore
    return (
      <View style={styles.container}>
        <Header
          title={'开课列表'}
          right={
            <Button
              type={'primary'}
              onPress={() => {
                if (this.props.appStore.user.power == 1) {
                  this.props.navigation.navigate('addCourse')
                } else {
                  alert('只有管理员才可以执行该操作')
                }
              }}
            >
              添加
            </Button>
          }
        />
        <FlatList
          data={courseList}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.classNum}
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
    marginBottom: 8,
    textAlign: 'center'
  },
  // 图像样式
  imgStyle: {
    width: 53,
    height: 81
  }
})
export default course
