/**
 * Created by ZZ on 2019/4/14 11:25.
 * file description:
 */

import React, { Component } from 'react'
import Toast from '@remobile/react-native-toast'
import StorageUtil from 'utils/StorageUtil'
import CountEmitter from '../../../event/CountEmitter'
import MomentMenuView from 'component/MomentMenuView'
import CommonTitleBar from 'component/CommonTitleBar'
import LoadingView from 'component/LoadingView'
import ReplyPopWin from 'component/ReplyPopWin'
import Global from 'utils/Global'
import Utils from 'utils/Utils'
import Base64Utils from 'utils/Base64'
import TimeUtils from 'utils/TimeUtil'
import URL from '../../../env'

import {
  ART,
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Header from '../../../component/Header'
import { inject, observer } from 'mobx-react'
import { basicColor } from '../../../theme/MainStyle'

const { width } = Dimensions.get('window')
const AVATAR_WIDTH = 80
const HEIGHT = (width * 7) / 10

@inject('tableStore', 'findStore', 'appStore')
@observer
class FriendCircle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moments: [],
      avatar: '',
      showProgress: false,
      doFavorMomentId: -1,
      isUpdate: false,
      isLoadMore: false,
      hasMoreData: true,
      showReplyInput: false,
      clickButton: []
    }
    // 分页需要使用的两个参数offset:偏移量, pagesize:一页的大小,pagesize=-1代表获取所有数据
    this.offset = 0
    this.pagesize = 5
    StorageUtil.get('username', (error, object) => {
      if (!error && object != null) {
        this.setState({ username: object.username })
        StorageUtil.get('userInfo-' + object.username, (error, object) => {
          if (!error && object != null) {
            this.setState({ avatar: object.info.avatar })
          }
        })
      }
    })
  }

  UNSAFE_componentWillMount() {
    this.getMoments()
  }
  componentWillUnmount() {
    CountEmitter.removeListener('updateMomentList', () => {})
  }
  componentDidMount() {
    this.setState({ isLoadMore: false })
    // this.getMoments(true)

    let replyInput = this.refs.replyInput
    if (!Utils.isEmpty(replyInput)) {
      replyInput.focus()
    }
  }

  getMoments() {
    this.showLoading()
    this.props.findStore.getDynamic(this.props.appStore.user.uid)
    this.hideLoading()
  }

  showLoading() {
    this.setState({ showProgress: true })
  }

  hideLoading() {
    this.setState({ showProgress: false })
  }

  renderHeaderView(username, avatar) {
    const { user } = this.props.appStore
    return (
      <View>
        <Image style={styles.momentImg} source={require('../../../img/moment.jpg')} />
        <Text style={styles.userNameText}>{user.dynamicName}</Text>
        <Image style={styles.avatarImg} source={avatar} />
      </View>
    )
  }

  render() {
    let avatar = { uri: `${URL}/public/${this.props.appStore.user.img}` }

    return (
      <View style={styles.container}>
        <CommonTitleBar
          title={'朋友圈'}
          nav={this.props.navigation}
          rightIcon={require('../../../img/ic_camera.png')}
          handleRightClick={() => this.props.navigation.navigate('PublishMoment')}
        />
        {this.state.showProgress ? <LoadingView cancel={() => this.setState({ showProgress: false })} /> : null}
        <View style={{ backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, width: width }}>
          <MomentMenuView ref="momentMenuView" />
        </View>
        <View style={{ backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, width: width }}>
          <ReplyPopWin ref="replyPopWin" />
        </View>
        <FlatList
          ListHeaderComponent={this.renderHeaderView(this.state.username, avatar)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.showProgress}
              onRefresh={() => {
                this.getMoments()
              }} //因为涉及到this.state
              colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
              progressBackgroundColor="#ffffff"
            />
          }
          data={this.props.findStore.dynamicList}
          renderItem={this.renderItem}
          keyExtractor={item => item.dynamicNum}
          // onEndReachedThreshold={0.2}
        />
        {this.state.showReplyInput ? (
          <TextInput
            autoFocus={true}
            ref="replyInput"
            style={{ position: 'absolute', left: 0, bottom: 0, width: width }}
          />
        ) : null}
      </View>
    )
  }

  renderImageRow(arr, start, end) {
    let images = []
    for (let i = start; i < end; i++) {
      let img = { uri: `${URL}/public/${arr[i]}` }
      images.push(
        <View key={i.toString()}>
          <Image source={img} style={listItemStyle.imageCell} />
        </View>
      )
    }
    return (
      <View key={'row-' + start} style={{ flexDirection: 'row', marginTop: 3 }}>
        {images}
      </View>
    )
  }

  renderImages(pictures) {
    if (pictures == null || pictures == '') {
      return null
    }
    let arr = pictures
    let len = arr.length
    let images = []
    if (len > 0) {
      let rowNum = Math.ceil(len / 3)
      for (let i = 0; i < rowNum; i++) {
        let start = i * 3
        let end = i * 3 + 3
        if (end > len) {
          end = len
        }
        images.push(this.renderImageRow(arr, start, end))
      }
    }
    return <View style={listItemStyle.imageContainer}>{images}</View>
  }

  loadNextPage = info => {
    if (!this.state.hasMoreData) {
      return
    }
    this.setState({ isLoadMore: true })
    this.offset = this.offset + this.pagesize
    this.getMoments(false)
  }

  renderReplys(item) {
    let replys = []
    let arr = item.commentList
    if (!Utils.isEmpty(arr) && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        replys.push(
          <TouchableOpacity
            key={arr[i].commentNum}
            activeOpacity={0.7}
            onPress={() => {
              let clicks = this.state.clickButton
              const index = clicks.indexOf(arr[i].commentNum)
              if (index >= 0) {
                clicks.splice(index, index + 1)
              } else {
                clicks.push(arr[i].commentNum)
              }
              this.setState({ clickButton: clicks })

              // this[item.dynamicNum].setNativeProps({
              //   style: { opacity: this[item.dynamicNum].style.opacity === 1 ? 0 : 1 }
              // })
            }}
          >
            <View style={{ flexDirection: 'row' }} key={arr[i].commentNum}>
              <Text style={[listItemStyle.commentText, { flex: 1 }]}>
                {arr[i].name + '：'}
                <Text
                  style={{
                    fontSize: 13,
                    color: '#666'
                  }}
                >
                  {arr[i].commentText}
                </Text>
              </Text>
              {this.state.clickButton.indexOf(arr[i].commentNum) >= 0 && this.props.appStore.user.name === arr[i].name && (
                <TouchableOpacity
                  onPress={async () => {
                    await this.props.findStore.deleteComment(arr[i].commentNum)
                    setTimeout(() => {
                      this.props.findStore.getDynamic(this.props.appStore.user.uid)
                    }, 200)
                  }}
                >
                  <Text style={{ color: basicColor.blue, fontSize: 13 }}>删除</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )
      }
    }
    return replys
  }

  isCommentEmpty(item) {
    if (item.commentList === null || item.commentList.length === 0) {
      return true
    }
    return false
  }

  renderItem = ({ item }) => {
    const path = ART.Path()
    path.moveTo(10, 10)
    path.lineTo(20, 0)
    path.lineTo(30, 10)
    path.close()
    let avatar = `${URL}/public/${item.photograph}`

    return (
      <View key={item.dynamicNum}>
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.avatar} source={{ uri: avatar }} />
          <View style={listItemStyle.content}>
            <Text style={listItemStyle.nameText}>{item.dynamicName}</Text>
            <Text style={listItemStyle.msgText}>{item.text}</Text>
            {this.renderImages(item.img)}
            <View style={listItemStyle.timeContainer}>
              <Text style={listItemStyle.timeText}>{item.date}</Text>
              {this.props.appStore.user.name === item.dynamicName && (
                <TouchableOpacity
                  onPress={async () => {
                    await this.props.findStore.deleteDynamic(item.dynamicNum)
                    setTimeout(() => {
                      this.props.findStore.getDynamic(this.props.appStore.user.uid)
                    }, 200)
                  }}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={{ color: basicColor.blue, fontSize: 13 }}>删除</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={e =>
                  this.showMenuView(
                    e,
                    item.dynamicNum,
                    item.dynamicName,
                    () => {},
                    (momentId, momentUsername) => {
                      this.doCommentCallback(
                        momentId,
                        momentUsername,
                        item.dynamicNum,
                        this.props.appStore.user.name,
                        item.dynamicName
                      )
                    }
                  )
                }
                style={{ marginLeft: 10 }}
              >
                <Image style={listItemStyle.commentImg} source={require('../../../img/ic_comment.png')} />
              </TouchableOpacity>
            </View>
            {this.isCommentEmpty(item) ? null : (
              <View style={listItemStyle.commentContainer}>
                <ART.Surface width={30} height={10}>
                  <ART.Shape d={path} fill={'#EEEEEE'} />
                </ART.Surface>
                <View style={listItemStyle.commentContent}>
                  <View style={{ flexDirection: 'column' }}>{this.renderReplys(item)}</View>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={listItemStyle.divider} />
      </View>
    )
  }

  showMenuView(event, momentId, momentUsername, callback1, callback2) {
    this.setState({ doFavorMomentId: momentId })
    this.refs.momentMenuView.showModal(
      event.nativeEvent.pageX,
      event.nativeEvent.pageY,
      momentId,
      momentUsername,
      callback1,
      callback2
    )
  }

  doFavorSuccessCallback = favorNames => {
    // let arr = this.state.moments.concat()
    // if (!Utils.isEmpty(arr)) {
    //   for (let i = 0; i < arr.length; i++) {
    //     let momentId = arr[i].moment_id
    //     if (momentId == this.state.doFavorMomentId) {
    //       arr[i].favor_names = favorNames
    //     }
    //   }
    // }
    // this.setState({ moments: arr })
  }
  doCommentSuccessCallback = async (dynamicNum, name, dynamicName, text) => {
    // 评论成功后，刷新列表
    await this.props.findStore.addComment(dynamicNum, name, text, dynamicName)
    setTimeout(() => {
      this.props.findStore.getDynamic(this.props.appStore.user.uid)
    }, 200)
  }
  doCommentCallback = (momentId, momentUsername, dynamicNum, name, dynamicName) => {
    this.refs.replyPopWin.showModal(momentId, momentUsername, text =>
      this.doCommentSuccessCallback(dynamicNum, name, dynamicName, text)
    )
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10
  },
  imageContainer: {
    flexDirection: 'column',
    marginTop: 6
  },
  imageCell: {
    width: 80,
    height: 80,
    marginRight: 3
  },
  avatar: {
    width: 40,
    height: 40
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  nameText: {
    fontSize: 15,
    color: '#54688D'
  },
  msgText: {
    fontSize: 15,
    color: '#000000',
    marginTop: 2
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10
  },
  timeText: {
    flex: 1,
    fontSize: 12,
    color: '#999999'
  },
  commentImg: {
    width: 25,
    height: 17
  },
  divider: {
    flex: 1,
    height: 1 / PixelRatio.get(),
    backgroundColor: Global.dividerColor
  },
  commentContainer: {
    flex: 1
  },
  commentContent: {
    backgroundColor: '#EEEEEE',
    padding: 6
  },
  favorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  favorImg: {
    width: 13,
    height: 13,
    marginRight: 5,
    marginTop: 5
  },
  commentText: {
    flex: 1,
    fontSize: 13,
    color: '#54688D',
    marginTop: 2
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8F8F8'
  },
  momentImg: {
    width: width,
    height: HEIGHT,
    marginBottom: 40
  },
  userNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    right: 95,
    top: HEIGHT - 25
  },
  avatarImg: {
    width: AVATAR_WIDTH,
    height: AVATAR_WIDTH,
    position: 'absolute',
    right: 10,
    top: HEIGHT - 45,
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }
})

export default FriendCircle
