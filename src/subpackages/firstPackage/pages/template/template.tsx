import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '@/utils/request'
// import Tips from '@/utils/tips'
import { TemplateProps, TemplateState } from './template.interface'
import './template.scss'
// import {} from '@/interfaces/index';// global interfaces
// import {} from '@/types/index';// global types

// components

// images

// @connect(({ template }) => ({
//     ...template,
// }))
class Template extends Component<TemplateProps,TemplateState > {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  static options = {
    addGlobalClass: true
  }
  constructor(props: TemplateProps) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='fx-template-wrap'>
        template页面
      </View>
    )
  }
}
export default Template
