/**
 * Created by ZhangZhiShuo on 2019/4/25 20:58.
 * file description:
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import NavigationBar from 'react-native-navbar'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationService } from 'utils'
import { screen } from 'theme/variables'
import { basicColor, borderWidth } from 'theme/MainStyle'

const buttonType = PropTypes.oneOfType([
  PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onPress: PropTypes.func
  }),
  PropTypes.element
])
// 根据平台设置标题栏上内间距，android增加一个状态栏的高度，ios维持不变
const extraPaddingTop = screen.HEADER_PADDINGTOP

export default class Header extends Component {
  static propTypes = {
    header: PropTypes.element,
    title: PropTypes.string,
    left: buttonType,
    right: buttonType,
    noBack: PropTypes.bool
  }
  static defaultProps = {
    title: '',
    noBack: false
  }

  renderLeftButton = () => {
    const { noBack, left } = this.props
    return (
      <View style={pageStyle.actionView}>
        {!noBack ? (
          <TouchableOpacity onPress={NavigationService.goBack} style={pageStyle.leftBtn}>
            <Icon name="angle-left" size={30} style={{ color: basicColor.blue }} />
          </TouchableOpacity>
        ) : null}

        {left &&
          (React.isValidElement(left) ? (
            React.cloneElement(left)
          ) : (
            <TouchableOpacity onPress={left.onPress} style={pageStyle.leftBtn}>
              {React.isValidElement(left.title) ? (
                React.cloneElement(left.title)
              ) : (
                <Text style={{ color: basicColor.blue }}>{left.title}</Text>
              )}
            </TouchableOpacity>
          ))}
      </View>
    )
  }
  renderRightButton = () => {
    const { right } = this.props
    return (
      <View style={pageStyle.actionView}>
        {right &&
          (React.isValidElement(right) ? (
            React.cloneElement(right)
          ) : (
            <TouchableOpacity onPress={right.onPress} style={pageStyle.rightBtn}>
              {React.isValidElement(right.title) ? (
                React.cloneElement(right.title)
              ) : (
                <Text style={{ color: basicColor.blue ,fontSize:16}}>{right.title}</Text>
              )}
            </TouchableOpacity>
          ))}
      </View>
    )
  }
  render() {
    const { header, title } = this.props
    const titleConfig = {
      title: title,
      style: { fontSize: 18 },
      tintColor: basicColor.textBlack
    }

    return (
      <View style={pageStyle.contain}>
        <View style={{ justifyContent: 'center', flex: 1 }}>{this.renderLeftButton()}</View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#333' }}>{this.props.title}</Text>
        </View>
        <View style={{ justifyContent: 'center', flex: 1 }}>{this.renderRightButton()}</View>
      </View>
    )
  }
}

const pageStyle = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'white',
    paddingTop: extraPaddingTop,
    borderBottomWidth: borderWidth.doubleThin,
    borderColor: basicColor.borderColor
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  leftBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: 32,
    paddingLeft: 15,
    paddingRight: 15
  },
  rightBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minWidth: 32,
    paddingRight: 15,
    paddingLeft: 15
  }
})
