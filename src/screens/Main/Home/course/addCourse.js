import { inject, observer } from 'mobx-react'
import { Button, Dimensions, Image, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CommonTitleBar from '../../../../component/CommonTitleBar'
import LoadingView from '../../../../component/LoadingView'
import React, { Component } from 'react'
import Utils from '../../../../utils/Utils'
import Toast from '@remobile/react-native-toast'
import ImagePicker from "react-native-image-crop-picker"
import StorageUtil from '../../../../utils/StorageUtil'
import { observable } from 'mobx'

const { width } = Dimensions.get('window')

@inject('newsStore')
@observer
export default class AddCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImages: [],
      className: '',
      teacher: '',
      classNum:'',
      week: '一',
      classTime: '1~2',
      place: '',
      totalTeacher: '',
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
          <View style={styles.textWrap}>
            <Text style={styles.textName}>课程名称：</Text>
            <TextInput
              placeholder="请输入课程名称"
              underlineColorAndroid="transparent"
              keyboardType="default"
              style={styles.textMessage}
              onChangeText={text => {
                this.setState({
                  className: text
                })
              }}
            >
              {this.state.className}
            </TextInput>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.textName}>课程编号：</Text>
            <TextInput
              placeholder="请输入课程编号"
              underlineColorAndroid="transparent"
              keyboardType="default"
              style={styles.textMessage}
              onChangeText={text => {
                this.setState({
                  classNum: text
                })
              }}
            >
              {this.state.classNum}
            </TextInput>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.textName}>上课地点：</Text>
            <TextInput
              placeholder="请输入上课地点"
              underlineColorAndroid="transparent"
              keyboardType="default"
              style={styles.textMessage}
              onChangeText={text => {
                this.setState({
                  place: text
                })
              }}
            >
              {this.state.place}
            </TextInput>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.textName}>上课教师：</Text>
            <TextInput
              placeholder="请输入教师名字"
              underlineColorAndroid="transparent"
              keyboardType="default"
              style={styles.textMessage}
              onChangeText={text => {
                this.setState({
                  totalTeacher: text
                })
              }}
            >
              {this.state.totalTeacher}
            </TextInput>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.textName}>星期：</Text>
            <Picker
              style={{ width: (width * 4) / 5, position: 'absolute', right: 0 }}
              selectedValue={this.state.week}
              onValueChange={value => this.setState({ week: value })}
            >
              <Picker.Item label="一" value="一" />
              <Picker.Item label="二" value="二" />
              <Picker.Item label="三" value="三" />
              <Picker.Item label="四" value="四" />
              <Picker.Item label="五" value="五" />
              <Picker.Item label="六" value="六" />
              <Picker.Item label="日" value="日" />
            </Picker>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.textName}>课时：</Text>
            <Picker
              style={{ width: (width * 4) / 5, position: 'absolute', right: 0 }}
              selectedValue={this.state.classTime}
              onValueChange={value => this.setState({ classTime: value })}
            >
              <Picker.Item label="1~2" value="1~2" />
              <Picker.Item label="3~4" value="3~4" />
              <Picker.Item label="4~5" value="4~5" />
              <Picker.Item label="6~8" value="6~8" />
              <Picker.Item label="10~12" value="10~12" />
            </Picker>
          </View>
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
  sendMoment=async()=> {
    let className = this.state.className
    let classNum=this.state.classNum
    let week= this.state.week
    let classTime=this.state.classTime
    let place=this.state.place
    let totalTeacher=this.state.totalTeacher
    if (Utils.isEmpty(className)) {
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
    formData.append('className', className)
    formData.append('classNum', classNum)
    formData.append('place', place)
    formData.append('classTime', classTime)
    formData.append('week', week)
    formData.append('totalTeacher', totalTeacher)
    await this.props.newsStore.upCourse(formData)
    setTimeout(() => {
      this.props.newsStore.getCourseList()
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
  },
  textWrap: {
    paddingLeft: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 40,
    paddingRight: 15,
    alignItems: 'center',
    marginBottom: 10
  }
})
