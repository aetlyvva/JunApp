/**
 * Created by ZhangZhiShuo on 2019/4/14 11:25.
 * file description:
 */
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../../../component/Button'
import Header from '../../../component/Header'
import { basicStyle } from '../../../theme/MainStyle'
import Classes from '../../../Classes'

class Timetable extends Component {
  render() {
    return (
      <View style={[basicStyle.container, styles.container]}>
        <Classes navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24
  }
})
export default Timetable
