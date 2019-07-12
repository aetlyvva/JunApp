/**
 * Created by ZhangZhiShuo on 2019/5/1 13:34.
 * file description:
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Toast, InputItem } from '@ant-design/react-native'

@observer
class FormItem extends Component {
  static propTypes = {
    form: PropTypes.object,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    editable: PropTypes.bool,
    disabled: PropTypes.bool,
    clear: PropTypes.bool,
    extra: PropTypes.string,
    onExtraClick: () => {},
    labelNumber: PropTypes.number,
    labelPosition: PropTypes.string,
    textAlign: PropTypes.string,
    last: PropTypes.bool
  }

  validateKey = `validateError ${this.props.name}`

  @observable
  focus = false

  showError = () => {
    Toast.fail(this.props.form[this.validateKey], 2, undefined, false)
  }

  @action
  onChangeText = text => {
    const { name } = this.props
    this.props.form[name] = text
  }

  @action
  onFocus = () => {
    if (!this.focused) {
      this.focused = true
    }
  }

  render() {
    const {
      name,
      form,
      validateStatus,
      children,
      placeholder,
      type,
      editable,
      clear,
      disabled,
      extra,
      onExtraClick,
      labelNumber,
      labelPosition,
      textAlign,
      last,

      ...otherProps
    } = this.props
    const value = form[name]
    // 是否校验通过
    const isError = (!!form[this.validateKey] && this.focused) || (!!form[this.validateKey] && validateStatus)

    return (
      <InputItem
        {...otherProps}
        value={value}
        error={isError}
        onFocus={this.onFocus}
        onChange={this.onChangeText}
        onErrorClick={this.showError}
        placeholder={placeholder}
        type={type}
        editable={editable}
        clear={clear}
        disabled={disabled}
        extra={extra}
        onExtraClick={onExtraClick}
        labelNumber={labelNumber}
        labelPosition={labelPosition}
        textAlign={textAlign}
        last={last}
      >
        {children}
      </InputItem>
    )
  }
}
export default FormItem