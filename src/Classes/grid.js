import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, FlatList, Text, View, Dimensions } from 'react-native'
import Util from '../Common/util.js'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { observer, inject } from 'mobx-react'
const { width, height } = Dimensions.get('window')
const colors = [
  '#eebbdd',
  '#bbccee',
  '#bfeabc',
  '#fa98a5',
  '#fcc8a0',
  '#f4c7dc',
  '#a5edd5',
  '#a1a0df',
  '#b9d4ff',
  '#ecd1fe',
  '#d4ffe1'
]

@inject('tableStore', 'appStore')
@observer
class Grids extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fclassName: '',
      Mon: this.props.Mon,
      Tus: this.props.Tus,
      Wes: this.props.Wes,
      Thu: this.props.Thu,
      Fri: this.props.Fri,
      Sat: this.props.Sat,
      Sun: this.props.Sun
    }
  }

  _keyExtractor = (item, index) => index.toString()
  _renderItem = ({ item, index }) => {
    var num = Math.floor(Math.random() * 10)
    var strss = item.classTime.split('~')
    var heights = (strss[1] - strss[0] + 1) * 65
    var Dates = []
    const { tableList } = this.props.tableStore
    switch (item.week) {
      case '一':
        Dates = tableList.Mon
        break
      case '二':
        Dates = tableList.Tus
        break
      case '三':
        Dates = tableList.Wes
        break
      case '四':
        Dates = tableList.Thu
        break
      case '五':
        Dates = tableList.Fri
        break
      case '六':
        Dates = tableList.Sat
        break
      case '日':
        Dates = tableList.Sun
        break
    }
    if (index == 0) {
      var marginTop = (strss[0] - 1) * 65
    } else {
      let BefIndex = index - 1
      let Befstr = Dates[BefIndex].classTime.split('~')
      // alert(Befstr[0]);
      var marginTop = (strss[0] - Befstr[1] - 1) * 65
    }
    return (
      <View
        style={[
          styles.center,
          {
            borderRadius: 10,
            backgroundColor: colors[num],
            width: (width * 2) / 15,
            height: heights,
            marginTop: marginTop
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('classMessage', { item: item })
          }}
        >
          <Text style={styles.color}>
            {item.className}@{item.place}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { tableList } = this.props.tableStore
    return (
      <View>
        <View style={{ height: 30 }}>
          <Grid>
            <Row>
              <Col style={styles.center} size={1}>
                <Text style={{ fontSize: 12 }}>九月</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text>周一</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text>周二</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text>周三</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text>周四</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text>周五</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text>周六</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text>周日</Text>
              </Col>
            </Row>
          </Grid>
        </View>
        <ScrollView>
          <View style={{ height: 780, marginBottom: 85 }}>
            <Grid>
              <Col size={1}>
                <Row style={styles.center} size={1}>
                  <Text>1</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>2</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>3</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>4</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>5</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>6</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>7</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>8</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>9</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>10</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>11</Text>
                </Row>
                <Row style={styles.center} size={1}>
                  <Text>12</Text>
                </Row>
              </Col>
              <Col size={2}>
                {tableList.Mon === '' ? (
                  <FlatList
                    data={tableList.Mon.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) : (
                  <FlatList
                    data={tableList.Mon.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </Col>
              <Col size={2}>
                {tableList.Tus === '' ? (
                  <FlatList
                    data={tableList.Tus.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) : (
                  <FlatList
                    data={tableList.Tus.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </Col>
              <Col size={2}>
                {tableList.Wes === '' ? (
                  <FlatList
                    data={tableList.Wes.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) : (
                  <FlatList
                    data={tableList.Wes.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </Col>
              <Col size={2}>
                {tableList.Thu === '' ? (
                  <FlatList
                    data={tableList.Thu.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) : (
                  <FlatList
                    data={tableList.Thu.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </Col>
              <Col size={2}>
                {tableList.Fri === '' ? (
                  <FlatList
                    data={tableList.Fri.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) : (
                  <FlatList
                    data={tableList.Fri.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </Col>
              <Col size={2}>
                {tableList.Sat === '' ? (
                  <FlatList
                    data={tableList.Sat.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) : (
                  <FlatList
                    data={tableList.Sat.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </Col>
              <Col size={2}>
                {tableList.Sun === '' ? (
                  <FlatList
                    data={tableList.Sun.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) : (
                  <FlatList
                    data={tableList.Sun.slice()}
                    //使用 ref 可以获取到相应的组件
                    ref={flatList => (this._flatList = flatList)}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </Col>
            </Grid>
          </View>
        </ScrollView>
      </View>
    )
  }
  componentDidMount() {
    this._fetchData()
    this.didBlurSubscription = this.props.navigation.addListener('didFocus', payload => {
      this._fetchData()
    })
  }
  componentWillUnmount() {
    this.didBlurSubscription.remove()
  }

  _fetchData() {
    this.props.tableStore.getUserCourseList(this.props.appStore.user.uid)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  color: {
    lineHeight: 15,
    color: '#fff',
    fontSize: 12
  }
})
export default Grids
