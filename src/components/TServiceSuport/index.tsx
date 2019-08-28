import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { TServiceSuportProps, TServiceSuportState } from './index.interface'
import './index.scss'
import imgService from './images/service.png';
import { CUSTOMER_SERVICE_PHONE } from '@/configs/index';
import { callPhone,globalData} from '@/utils/common';

class TServiceSuport extends Component<TServiceSuportProps,TServiceSuportState > {
  constructor(props: TServiceSuportProps) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps:TServiceSuportProps = {}
  render() {
    return (
      <View className='fx-TServiceSuport-wrap'>
        <View className="page-service-support" 
          hoverClass="move-hover-class" 
          onClick={() => {
            // 埋点
            globalData.MTA.Event.stat("maker_contactservice_click", {});
            callPhone(CUSTOMER_SERVICE_PHONE);
        }}>
          <Image className="scan-icon" src={imgService} />
        </View>
      </View>
    )
  }
}
export default TServiceSuport
