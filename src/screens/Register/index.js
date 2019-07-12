/**
 * Created by ZZ on 2019/4/14 11:13.
 * file description:
 */
import React, { Component } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import FormProvider from '../Login/FormProvider'
import FormItem from '../Login/FormItem'
import { basicColor } from 'theme/MainStyle'

@inject('appStore')
@observer
class Register extends Component {
  form = new LoginForm()

  navigateHome = () => {
    this.props.navigation.navigate('Login')
  }

  registerSuccess = () => {
    this.navigateHome()
  }

  register = async () => {
    let userName = this.form.userName
    let password = this.form.password
    let account = this.form.account
    const result=await this.props.appStore.register({userName, password,account})

    result&&this.registerSuccess()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 28, color: '#000' }}>注册</Text>
        </View>
        <FormProvider form={this.form}>
          <FormItem name={'userName'} placeholder="请输入昵称">
            昵称
          </FormItem>
          <FormItem name={'account'} placeholder="请输入账号">
            账号
          </FormItem>
          <FormItem name={'password'} type={'password'} placeholder="请输入密码">
            密码
          </FormItem>
        </FormProvider>
        <View style={{ marginTop: 20, paddingHorizontal: 40 }}>
          <Button onPress={this.register} title={'注册'} />
        </View>
      </View>
    )
  }
}
class LoginForm {
  @observable
  userName = ''

  @observable
  password = ''

  @observable
  account = ''
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 50
  }
})

export default Register
