/**
 * Created by ZhangZhiShuo on 2019/5/1 13:23.
 * file description:
 */
import React, { Component } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import PropTypes from 'prop-types'

@observer
class FormProvider extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  @observable
  validateStatus = false

  constructor(props, context) {
    super(props, context)

    /**
     * 校验全部组件
     */
    this.props.form.validateFields = action(() => {
      this.validateStatus = true
      return this.props.form.isValid
    })
    /**
     * 获取全部组件的值
     */
    this.props.form.getFieldsValue = () => {
      return this.props.form
    }
  }

  render() {
    const { form, children } = this.props
    return (
      <View>
        {React.Children.map(children, children => {
          return React.cloneElement(children, {
            form,
            validateStatus: this.validateStatus
          })
        })}
      </View>
    )
  }
}

export default FormProvider