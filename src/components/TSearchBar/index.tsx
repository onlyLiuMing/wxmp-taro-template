import Taro, { Component } from '@tarojs/taro'
import { View, Input, Image, Text } from '@tarojs/components'
import { TSearchBarProps, TSearchBarState } from './index.interface'
import './index.scss'

// components
import TInput from '@/components/TInput';

// images
import imgSearch from './images/search.png';

class TSearchBar extends Component<TSearchBarProps, TSearchBarState> {
  constructor(props: TSearchBarProps) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps: TSearchBarProps = {
    value: '',
    type: 'text',
    placeHolder: '',
    autoFocus: false,
    disabled: false,
    onBlur: () => null,
    onClick: () => null,
    onFocus: () => null,
    onChange: () => null,
    onConfirm: () => null,
  }
  render() {
    const { value, type, placeHolder, autoFocus, disabled, onBlur, onClick, onFocus, onChange, onConfirm } = this.props;
    return (
      <View className='fx-TSearchBar-wrap'>
        <View className="search-bar-item">
          <View className="search-bar-left-icon">
            <Image src={imgSearch} />
          </View>
          <View className="search-bar-input">
            <Input
              type={type}
              value={value}
              placeholder={placeHolder ? placeHolder : '搜索'}
              confirmType="search"
              autoFocus={autoFocus}
              disabled={disabled}
              onClick={(...val) => { onClick(val) }}
              onFocus={(...val) => { onFocus(val) }}
              onBlur={(...val) => { onBlur(val) }}
              onInput={(...val) => { onChange(val) }}
              onConfirm={(...val) => { onConfirm(val) }}
            />
          </View>
        </View>
      </View>
    )
  }
}
export default TSearchBar
