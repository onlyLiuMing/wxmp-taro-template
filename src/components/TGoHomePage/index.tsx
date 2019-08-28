import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { TGoHomePageProps, TGoHomePageState } from './index.interface'
import { goHomePage } from '@/utils/common';
import './index.scss'
import imgGoHome from './images/go-back.png';
class TGoHomePage extends Component<TGoHomePageProps, TGoHomePageState> {
  constructor(props: TGoHomePageProps) {
    super(props)
    this.state = {
      showGoHomePage:false
    }
  }
  componentDidMount(){
    const showGoHomePage: boolean = (Taro.getCurrentPages() as any).length <= 1;
    this.setState({
      showGoHomePage: showGoHomePage, 
    })
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps: TGoHomePageProps = {}
  render() {
    const {showGoHomePage} = this.state;
    return (
      <View className='fx-TGoHomePage-wrap'>
        {
          showGoHomePage && (
            <View className="page-icon-wrap" hoverClass="move-hover-class" onClick={() => { goHomePage() }}>
              <Image className="scan-icon" src={imgGoHome} />
            </View>
          )
        }
      </View>
    )
  }
}
export default TGoHomePage
