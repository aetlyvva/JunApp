import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, Platform, Modal, Image, View, Dimensions, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Grids from './grid.js'
import { observer,inject } from 'mobx-react'
const { width, height } = Dimensions.get('window')
const navigatorH = 64 // navigator height
const [aWidth, aHeight] = [width - 28, 214]
const [left, top] = [0, 0]
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH]
@inject('tableStore','appStore')

@observer
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.icons = {
      // Step 2
      up: 'ios-arrow-up',
      down: 'ios-arrow-down'
    }
    this.state = {
      expanded: true,
      obj: [],
      Mon: [],
      Tus: [],
      Wes: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
      animationType: 'none', // none slide fade
      modalVisible: false, // 模态场景是否可见
      transparent: true // 是否透明显示
      // MyID:this.props.navigation.state.params.MyID,
    }
  }
  render() {
    let icon = this.icons['down']
    if (this.state.expanded) {
      icon = this.icons['up'] // Step 4
    }
    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red'
    }
    let innerContainerTransparentStyle = this.state.transparent ? { backgroundColor: '#fff', padding: 20 } : null
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.headerImg} source={require('../img/logo.png')} />
          <Text style={styles.headerText}>课程表</Text>
          <TouchableOpacity style={styles.headerEdit} onPress={this._setModalVisible.bind(this, true)}>
            <View>
              <Icon style={{ color: '#fff' }} name="ios-arrow-down" size={28} />
            </View>
          </TouchableOpacity>
        </View>
        <Grids {...this.props} />
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this._setModalVisible(false)
          }}
          onShow={this.startShow}
        >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={styles.header}>
              <Image style={styles.headerImg} source={require('../img/logo.png')} />
              <Text style={styles.headerText}>课程表</Text>
              <TouchableOpacity style={styles.headerEdit} onPress={this._setModalVisible.bind(this, false)}>
                <View>
                  <Icon name={icon} size={28} style={{ color: '#fff' }} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <View style={styles.shareAllWrap}>
                <View style={styles.shareWrap}>
                  <TouchableOpacity
                    style={styles.shareBtn}
                    onPress={async ()=>{await this.props.tableStore.loadCourses(this.props.appStore.user.uid)
                      this._setModalVisible(false)
                    }}
                  >
                    <Image style={styles.shareImg} source={require('../img/daoru.png')} />
                  </TouchableOpacity>
                  <Text style={styles.shareText}>教务导入</Text>
                </View>
                <View style={styles.shareWrap}>
                  <TouchableOpacity style={styles.shareBtn} onPress={this._setModalVisibleJump.bind(this, 'DIYClass')}>
                    <Image style={styles.shareImg} source={require('../img/zidingyi.png')} />
                  </TouchableOpacity>
                  <Text style={styles.shareText}>自定义</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  _setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  _setModalVisibleJump = component => {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate(component, {
      onCallBack: (Mon, Tus, Wes, Thu, Fri, Sat, Sun) => {
        this.setState({
          Mon: Mon,
          Tus: Tus,
          Wes: Wes,
          Thu: Thu,
          Fri: Fri,
          Sat: Sat,
          Sun: Sun
        })
      }
    })
  }

  startShow = () => {}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    paddingTop: 12,
    paddingBottom: 12,
    height: 48,
    backgroundColor: '#00b3ca',
    flexDirection: 'row',
    paddingLeft: 10
  },
  headerImg: {
    width: 24,
    height: 18,
    marginTop: 5
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    paddingLeft: 10
  },
  noteBtn: {
    // backgroundColor:'red',
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  noteImg: {
    width: 50,
    height: 50
  },
  headerEdit: {
    position: 'absolute',
    right: 15,
    top: 12
  },
  innerContainer: {
    alignItems: 'center'
  },
  shareAllWrap: {
    paddingLeft: 15,
    marginTop: -20,
    flexDirection: 'row',
    width: width,
    backgroundColor: '#ecfbfe',
    // backgroundColor:'red',
    paddingTop: 10,
    paddingBottom: 10
  },
  shareWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: aWidth / 2
  },
  shareBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 60
  },
  shareImg: {
    width: 40,
    height: 40
  },
  shareText: {
    fontSize: 16
  },
  rowWrap: {
    paddingLeft: 30,
    paddingRight: 30
  },
  row: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: '#797979',
    flexDirection: 'row',
    width: width - 60
  },
  rows: {
    paddingTop: 10,
    flexDirection: 'row',
    width: width - 60
  },
  rowTitle: {
    fontSize: 16,
    color: 'black'
  },
  rowContent: {
    fontSize: 16,
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    top: 10
  }
})
