import { inject, observer } from 'mobx-react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CommonTitleBar from '../../../../component/CommonTitleBar'
import LoadingView from '../../../../component/LoadingView'
import React, { Component } from 'react'
import Utils from '../../../../utils/Utils'
import Toast from '@remobile/react-native-toast'
import ImagePicker from "react-native-image-crop-picker"
import StorageUtil from '../../../../utils/StorageUtil'
import { observable } from 'mobx'

const { width } = Dimensions.get('window')

@inject('newsStore','appStore','findStore')
@observer
export default class UpdateNewsImg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImages: [],
      showProgress: false
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar
          title={''}
          nav={this.props.navigation}
          rightBtnText={'确定'}
          handleRightBtnClick={this.sendMoment}
        />
        {this.state.showProgress ? <LoadingView cancel={() => this.setState({ showProgress: false })} /> : null}
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <Text>请选择图片 </Text>
          </View>
          {this.renderSelectedImages()}
        </View>
      </View>
    )
  }

  sendMoment=async()=> {
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
    await this.props.newsStore.upNewsImg(formData)
    setTimeout(() => {
      this.props.newsStore.getNewsImg()
    }, 200)
    this.props.navigation.goBack()
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
        <Image source={require('../../../../img/ic_add_pics.png')} style={styles.addPicImgBtn} />
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
