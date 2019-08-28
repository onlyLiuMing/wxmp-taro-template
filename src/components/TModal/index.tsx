import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { TModalProps, TModalState } from './TModal.interface'
import './TModal.scss'
import imgClose from './images/close.png';
class TModal extends Component<TModalProps, TModalState> {
  constructor(props: TModalProps) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps: TModalProps = {
    title: '',
    footer: '',
    isOpened: false,
    showClose: false,
    onClose: () => null,
  }
  render() {
    const { title, isOpened, showClose, footer, onClose } = this.props;
    return (
      <View className={`fx-TModal-wrap ${isOpened ? 'active' : ''}`}>
        <View className="bg" onClick={() => { onClose() }}></View>
        <View className={`modal-item ${showClose ? 'modal-item--has-close' : ''}`}>
          {showClose && (<Image className="close" src={imgClose} onClick={onClose} />)}
          {title && (<View className="modal-header" >{title}</View>)}
          <ScrollView scrollY={true} className="modal-content">
            {this.props.children}
          </ScrollView>
          {footer && (<View className="modal-footer">{footer}</View>)}
        </View>
      </View>
    )
  }
}
export default TModal
