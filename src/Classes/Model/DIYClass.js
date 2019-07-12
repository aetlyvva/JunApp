import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, Platform, TextInput, Picker, View, Button } from 'react-native'
import Dimensions from 'Dimensions'
import Util from '../../Common/util.js'
import Icon from 'react-native-vector-icons/Ionicons'
import { observer, inject } from 'mobx-react'
import Header from '../../component/Header'
const { width, height } = Dimensions.get('window')

@inject('tableStore', 'appStore')
@observer
class DIYClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      week: '一',
      classTime: '1~2',
      className: '',
      place: '',
      totalTeacher: '',
      classNum: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={'自定义课程'} />
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
          <View style={{ width: 50, position: 'absolute', right: 5 }}>
            <Button
              title={'更新'}
              onPress={async () => {
                const newClass = await this.props.tableStore.getId(this.state.classNum)
                if (newClass) {
                  this.setState(newClass)
                }
              }}
            />
          </View>
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
            placeholder="请输入上课教师"
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

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this._fetchData()
          }}
        >
          <Text style={styles.btnText}>添加</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _fetchData = async () => {
    if (!this.state.classNum) {
      alert('请输入课程编号')
      return
    }
    const result = await this.props.tableStore.addUserCourse({
      week: this.state.week,
      className: this.state.className,
      place: this.state.place,
      classTime: this.state.classTime,
      totalTeacher: this.state.totalTeacher,
      classNum: this.state.classNum,
      account: this.props.appStore.user.uid
    })
    result && this.props.navigation.goBack()
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dedfe1'
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    paddingTop: 12,
    paddingBottom: 12,
    height: 48,
    backgroundColor: '#00b3ca',
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 15
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    position: 'absolute',
    left: 40,
    top: 12
  },
  backBox: {
    position: 'absolute',
    left: 0,
    top: 12,
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor:'yellow',
  },
  backIcon: {
    color: '#fff',
    fontSize: 28
    //marginRight:10
  },
  textWrap: {
    paddingLeft: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 40,
    paddingRight: 15,
    alignItems: 'center',
    marginBottom: 10
  },
  textName: {
    fontSize: 18,
    color: 'black'
  },
  textMessage: {
    width: width * 0.7,
    textAlign: 'left',
    fontSize: 16,
    position: 'absolute',
    right: 15
  },
  btn: {
    marginTop: 30,
    width: width * 0.9,
    marginLeft: width * 0.05,
    backgroundColor: '#00b3cb',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#00b3cb'
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
})
export default DIYClass
