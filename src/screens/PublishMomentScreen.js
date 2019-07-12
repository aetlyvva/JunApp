import React, { Component } from 'react'
import Toast from '@remobile/react-native-toast'
import CommonTitleBar from '../component/CommonTitleBar'
import ImagePicker from 'react-native-image-crop-picker'
import StorageUtil from '../utils/StorageUtil'
import LoadingView from '../component/LoadingView'
import Utils from '../utils/Utils'
import Base64Utils from '../utils/Base64'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { observer, inject } from 'mobx-react'
import CountEmitter from '../event/CountEmitter'

const { width } = Dimensions.get('window')
@inject('tableStore', 'newsStore', 'appStore', 'findStore')
@observer
class PublishMomentScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImages: [],
      content: '',
      username: '',
      showProgress: false,
      account: this.props.appStore.user.uid
    }
    StorageUtil.get('username', (error, object) => {
      if (!error && object != null) {
        this.setState({ username: object.username })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar
          title={''}
          nav={this.props.navigation}
          rightBtnText={'发送'}
          handleRightBtnClick={() => {
            this.sendMoment()
          }}
        />
        {this.state.showProgress ? <LoadingView cancel={() => this.setState({ showProgress: false })} /> : null}
        <View style={styles.content}>
          <TextInput
            multiline={true}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="这一刻的想法..."
            onChangeText={text => {
              this.setState({ content: text })
            }}
          />
          {this.renderSelectedImages()}
        </View>
      </View>
    )
  }

  showLoading() {
    this.setState({ showProgress: true })
  }

  hideLoading() {
    this.setState({ showProgress: false })
  }

  async sendMoment() {
    let content = this.state.content
    let account = this.state.account
    if (Utils.isEmpty(content)) {
      alert('不能为空')
      return
    }
    let images = this.state.selectedImages
    let formData = new FormData()
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        let path = images[i]
        let filename = path.substring(path.lastIndexOf('/') + 1, path.length)
        let file = { uri: path, type: 'multipart/form-data', name: filename }
        formData.append('file', file)
      }
    }
    formData.append('account', account)
    formData.append('content', content)
    await this.props.newsStore.upLoad(formData)
    setTimeout(() => {
      this.props.findStore.getDynamic(this.props.appStore.user.uid)
      this.props.navigation.goBack()
    }, 200)
  }

  renderImageItem(item, index) {
    let imageURI = { uri: item }
    return (
      <TouchableOpacity key={'imageItem' + index} activeOpacity={0.6} onPress={() => {}}>
        <Image source={imageURI} style={styles.addPicImgBtn} />
      </TouchableOpacity>
    )
  }

  renderAddBtn() {
    return (
      <TouchableOpacity
        key={'addBtn'}
        activeOpacity={0.6}
        onPress={() => {
          this.pickImage()
        }}
      >
        <Image source={require('../img/ic_add_pics.png')} style={styles.addPicImgBtn} />
      </TouchableOpacity>
    )
  }

  renderImageRow(arr, start, end, isSecondRow) {
    let images = []
    for (let i = start; i < end; i++) {
      if (i === -1) {
        images.push(this.renderAddBtn())
      } else {
        images.push(this.renderImageItem(arr[i], i))
      }
    }
    let style = {}
    if (!isSecondRow) {
      style = { flexDirection: 'row' }
    } else {
      style = { flexDirection: 'row', marginTop: 10 }
    }
    return (
      <View key={'imageRow' + end} style={style}>
        {images}
      </View>
    )
  }

  renderSelectedImages() {
    let row1 = []
    let row2 = []
    let images = this.state.selectedImages
    let len = images.length
    if (len >= 0 && len <= 4) {
      row1.push(this.renderImageRow(images, -1, len, false))
    } else if (len > 4) {
      row1.push(this.renderImageRow(images, -1, 4, false))
      row2.push(this.renderImageRow(images, 4, len, true))
    }
    return (
      <View style={styles.selectedImageContainer}>
        {row1}
        {row2}
      </View>
    )
  }

  pickImage() {
    if (this.state.selectedImages.length >= 9) {
      Toast.showShortCenter('最多只能添加9张图片')
      return
    }
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false
    }).then(image => {
      let arr = this.state.selectedImages
      arr.push(image.path)
      this.setState({ selectedImages: arr })
    })
  }
}
export default PublishMomentScreen
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
    width: width - 20,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 15
  },
  selectedImageContainer: {
    width: width,
    flexDirection: 'column'
  },
  addPicImgBtn: {
    width: 60,
    height: 60,
    marginLeft: 10
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
