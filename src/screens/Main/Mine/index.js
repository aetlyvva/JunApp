/**
 * Created by ZhangZhiShuo on 2019/4/14 11:25.
 * file description:
 */
import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../../component/Header'
import { basicColor } from '../../../theme/MainStyle'
import URL from '../../../env'
import { inject, observer } from 'mobx-react'

@inject('appStore')
@observer
class Mine extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title={'个人中心'} noBack />
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('UpdateImg')
            }}
          >
            <Image style={styles.avatar} source={{ uri: `${URL}/public/${this.props.appStore.user.img}` }} />
          </TouchableOpacity>
          {/*<Image style={styles.avatar} source={{ uri: `${URL}/public/${this.props.appStore.user.img}` }} />*/}
          <Text style={{ fontSize: 18 }}>{this.props.appStore.user.name}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Login')
            }}
          >
            <Text style={styles.btnText}>注销</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: basicColor.backgroundColor
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  avatar: {
    width: 110,
    height: 110
  },
  btn: {
    marginTop: 30,
    width: '60%',
    backgroundColor: '#00b3cb',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#00b3cb'
  }
})
export default Mine
