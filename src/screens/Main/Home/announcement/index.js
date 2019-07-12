/**
 * Created by ZZ on 2019/4/20 17:32.
 * file description:
 */
import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native'
import Header from '../../../../component/Header'
import { inject, observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from '@ant-design/react-native'
import URL from '../../../../env'
@inject('newsStore', 'appStore')
@observer
class announcement extends Component {
  handleShowDetails = text => {
    alert(text)
  }

  componentDidMount() {
    this.init()
  }
  //从数据库获取数据
  init = () => {
    this.props.newsStore.getNewsList()
    this.props.newsStore.getNewsImg()
  }

  handleDeleteNews = async newsNum => {
    if (this.props.appStore.user.power == 1) {
      await this.props.newsStore.deleteNews(newsNum)
    } else alert('只有管理员才可以执行该操作')
    setTimeout(() => {
      this.props.newsStore.getNewsList()
    }, 200)
  }
  renderItem = item => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleShowDetails(item.text)} style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#006600',
                  lineHeight: 30
                }}
              >
                {item.date}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: '#006600',
                  lineHeight: 30,
                  width: 270
                }}
              >
                {item.title}
              </Text>
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => this.handleDeleteNews(item.newsNum)}>
              <Icon name="ios-close" size={30} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { newsList } = this.props.newsStore
    return (
      <View style={styles.container}>
        <Header
          title={'校园公告'}
          right={
            <Button
              type={'primary'}
              onPress={() => {
                if (this.props.appStore.user.power == 1) {
                  this.props.navigation.navigate('addNews')
                } else alert('只有管理员才可以执行该操作')
              }}
            >
              添加
            </Button>
          }
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('UpdateNewsImg')
          }}
        >
          <Image source={{ uri: `${URL}/public/${this.props.newsStore.newsImgList.img}` }} style={styles.imgStyle} />
        </TouchableOpacity>
        {/*<Image source={require('../../../../assets/news1.jpg')} style={styles.imgStyle} />*/}
        <FlatList
          data={newsList}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.newsNum}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    // alignItems可以决定其子元素沿着次轴（与主轴垂直的轴）的排列方式
    paddingTop: 10
  },
  gundongshitu: {
    backgroundColor: 'white',
    paddingTop: 10
  },
  title: {
    color: 'green',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  // 图像样式
  imgStyle: {
    backgroundColor: 'green',
    width: Dimensions.get('window').width,
    height: 200,
    // 子组件间距
    marginTop: 20,
    paddingHorizontal: 10
  }
})
export default announcement
