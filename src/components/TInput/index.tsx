import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { TInputProps, TInputState } from './TInput.interface'
import './index.scss'

import { AtInput } from 'taro-ui'

class TInput extends Component<TInputProps, TInputState> {
  constructor(props: TInputProps) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps: TInputProps = {
    name: '',
    type: "text",
    value: '',
    placeholder: '',
    title: '',
    disabled: false,
    border: false,
    editable: true,
    error: false,
    autoFocus: false,
    focus: false,
    onChange: () => { },
    onClick: () => { },
    onLeftIconClick: () => { },
    onLeftChildClick: () => { },
    onRightIconClick: () => { },
    onRightChildClick: () => { },
  }
  render() {
    const { leftIcon,leftChild,rightIcon,rightChild, name, type, placeholder, value, title, disabled, border, editable, error, autoFocus, focus, onChange, onClick,onLeftIconClick,onRightIconClick,onLeftChildClick,onRightChildClick } = this.props;
    return (
      <View className='fx-TInput-wrap'>
        {/* 左侧自定义dom */}
        { Boolean(leftChild)&&(<View className="left-child-box" onClick={()=>{ onLeftChildClick() }}>{leftChild}</View>) }
        {/* 左侧icon */}
        { Boolean(leftIcon)&&(<View className="left-icon-box" onClick={()=>{ onLeftIconClick() }}><Image src={leftIcon?leftIcon:''} /></View>) }
        {/* input-box */}
        <View className={`input-box ${border?'':'input-box--no-border'}`}>
          <AtInput
            name={name}
            type={type}
            placeholder={placeholder}
            title={title}
            value={value}
            disabled={disabled}
            border={false}
            editable={editable}
            error={error}
            autoFocus={autoFocus}
            focus={focus}
            onClick={(...val) => { onClick(...val) }}
            onChange={(...val) => { onChange(...val) }}
            style="width:100%;"
          ></AtInput>
          <View className="input-box__border"></View>
        </View>
        {/* 右侧自定义dom */}
        { Boolean(rightChild)&&(<View className="rigth-child-box" onClick={()=>{ onRightChildClick() }}>{rightChild}</View>) }
        {/* 右侧icon-box */}
        { Boolean(rightIcon)&&(<View className="right-icon-box" onClick={()=>{ onRightIconClick() }}><Image src={rightIcon?rightIcon:''} /></View>) }
      </View>
    )
  }
}
export default TInput
