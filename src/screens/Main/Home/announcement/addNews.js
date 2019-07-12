import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import CommonTitleBar from '../../../../component/CommonTitleBar'
import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'

const { width } = Dimensions.get('window')

@inject('newsStore')
@observer
export default class AddNews extends Component {
  @observable news = { title: '', text: '' ,date:''}
  sendMoment = async () => {
    if (!this.news.title) {
      alert('标题不能为空')
      return
    }
    await this.props.newsStore.addNews(this.news)
    setTimeout(() => {
      this.props.newsStore.getNewsList()
    }, 200)
    this.props.navigation.goBack()
  }


  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar
          title={''}
          nav={this.props.navigation}
          rightBtnText={'确定'}
          handleRightBtnClick={
            this.sendMoment
          }
        />
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <Text>标题 : </Text>
            <TextInput
              multiline={true}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="请输入标题"
              onChangeText={text => {
                this.news.title = text
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <Text>文本 : </Text>
            <TextInput
              multiline={true}
              style={[styles.input, { minHeight: 120 }]}
              underlineColorAndroid="transparent"
              placeholder="请输入文本"
              onChangeText={text => {
                this.news.text = text
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <Text>日期 : </Text>
            <TextInput
              multiline={true}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="请输入日期"
              onChangeText={text => {
                this.news.date = text
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    fontSize: 15,
    flex:1,
    textAlignVertical:'top'
  },
  bottomContent: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10
  },
  bottomItem: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center'
  },
  bottomItemIcon: {
    width: 25,
    height: 25
  }
})
