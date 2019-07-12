/**
 * Created by ZhangZhiShuo on 2019/4/11 18:51.
 * file description:
 */
import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Home from './Home'
import Timetable from './Timetable'
import Find from './Find'
import Mine from './Mine'

const renderIcon = (name, tintColor) => <Icon name={name} size={22} style={{ color: tintColor }} />

const tabScreens = {
  home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor }) => renderIcon('ios-home', tintColor)
    }
  },
  timetable: {
    screen: Timetable,
    navigationOptions: {
      tabBarLabel: '课表',
      tabBarIcon: ({ tintColor }) => renderIcon('ios-grid', tintColor)
    }
  },
  find: {
    screen: Find,
    navigationOptions: {
      tabBarLabel: '发现',
      tabBarIcon: ({ tintColor }) => renderIcon('ios-aperture', tintColor)
    }
  },
  mine: {
    screen: Mine,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor }) => renderIcon('ios-person', tintColor)
    }
  }
}
const tabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    inactiveTintColor: '#a0a0a0',
    activeTintColor: '#66a2ff',
    indicatorStyle: { backgroundColor: 'transparent' },
    showIcon: true,
    style: {
      margin: 0,
      backgroundColor: '#ffffff',
      borderTopWidth: 0.66,
      borderTopColor: '#dddddd'
    },
    tabStyle: {
      padding: 0,
      margin: 0
    },
    labelStyle: {
      fontSize: 11,
      margin: 0,
      marginBottom: 5
    },
    iconStyle: {
      marginTop: -3,
      marginBottom: 0
    }
  },
  swipeEnabled: false
}
const Main = createBottomTabNavigator(tabScreens, tabConfig)

export default Main
