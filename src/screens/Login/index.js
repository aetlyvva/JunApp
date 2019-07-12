/**
 * Created by ZZ on 2019/4/14 11:13.
 * file description:
 */
import React, { Component } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import FormProvider from './FormProvider'
import FormItem from './FormItem'
import {basicColor} from 'theme/MainStyle'
@inject('appStore')
@observer
class Login extends Component {
  form = new LoginForm()

  navigateHome = () => {
    this.props.navigation.navigate('Main')
  }

  loginSuccess = async () => {
    await this.navigateHome()
  }

  login = async () => {


    const result=await this.props.appStore.signIn({...this.form})
    result&&this.loginSuccess()

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 28, color: '#000' }}>登录</Text>
        </View>
        <FormProvider form={this.form}>
          <FormItem name={'account'} placeholder="请输入账号" defaultValue={'ss'}>
            账号
          </FormItem>
          <FormItem name={'password'} type={'password'} placeholder="请输入密码">
            密码
          </FormItem>
        </FormProvider>
        <View style={{flexDirection:'row',justifyContent:"flex-end"}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}} style={{padding:10}}>
            <Text style={{color:basicColor.blue}}>注册</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 40 }}>
          <Button onPress={this.login} title={'登录'} />
        </View>
      </View>
    )
  }
}
class LoginForm {
  @observable
  account = ''

  @observable
  password = ''
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 50
  }
})

export default Login
