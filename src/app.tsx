import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import DayJs from 'dayjs';
import OnFire from 'onfire.js';
import dva from "./utils/dva";
import models from "./models";
import { globalData } from "./utils/common";
import { ENV } from "./configs";
import { goHomePage, isTabPage } from '@/utils/common';

// components
import Index from "./pages/template/template";

// 自执行
import "@tarojs/async-await";
import "@/utils/request";
import "@/configs/taroConfig";
import '@/utils/objectPolyilly';// 自执行polyilly

// style
import "./app.scss";

// MTA统计分析工具
const mta = require('@/utils/mta_analysis.js');

// 错误统计工具
const Raven = require('@/utils/raven.min.js');

// dva配置
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

// 获取store
const store = dvaApp.getStore();
const dispatch = dva.getDispatch();

/**
 * 修改默认“分享”，Component挂载分享方法( global挂载方法 )
 * FIXME: onShareAppMessage方法尽量不要用promise（虽然现在可以生效）
 */
Component.prototype.onShareAppMessage = function () {
  const { shareWeappConfig, updatedAt } = store.getState().share;
  if (!updatedAt || DayJs(updatedAt).diff(DayJs(), 'day') >= 1) {
    const dispatch = dva.getDispatch();
    dispatch({ type: 'share/updateShareConfig' });
  }
  return shareWeappConfig;
}

class App extends Component {
  config: Config = {
    pages: [
      "pages/template/template",
    ],
    subPackages: [
      // 分包-01
      {
        root: 'subpackages/firstPackage',
        pages: [
          "pages/template/template",
        ],
      }
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "white",
      navigationBarTitleText: "",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#B9BBC4",
      selectedColor: "#9896FE",
      backgroundColor: "#fff",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/template/template",
          text: "主页",
          iconPath: "",
          selectedIconPath: ""
        },
      ]
    }
  };

  /**
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   * @memberof App
   */
  async componentDidMount() {
    // 设置默认“返回主页”
    goHomePage("/" + (this.config.pages as string[])[0]);
    // 设置判断“是否为tab栏”页面
    isTabPage((this.config.pages as string[]).map(page => "/" + page));

    // 获取设备信息
    const sys = await Taro.getSystemInfo();
    sys && (globalData.systemInfo = sys);

    // 挂载globalData.onfire实例
    const onFire = new OnFire();
    onFire && (globalData.onFire = onFire);

    // 设置全局MTA实例
    globalData.MTA = mta;

    // 实例化插件工具()
    this.initPlugin();
  }

  componentDidShow() {
    // 获取参数
    const referrerInfo: any = this.$router.params.referrerInfo;
    const query: any = this.$router.params.query;
    // 进入小程序的信息，挂载到globalData上
    !globalData.extraData && (globalData.extraData = {});
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData;
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      };
    }
    // 初始化授权
    this.initialScope();
  }

  componentDidHide() { }

  componentDidCatchError() { }

  componentDidNotFound(...args) {
    // 未找到页面
    console.error('Not Fond Page: ', args);
    // 回到默认主页
    goHomePage();
  }


  /**
   * 初始化小程序(放置初始化用的钩子)
   */
  async initialScope() {
    console.info("--- 初始化授权 ---");
  }

  /**
   * 实例化插件
   */
  initPlugin() {
    if (ENV != 'production') return;
    console.warn('--- 实例化plugin(production环境生效) ----');
    const initOptions = this.$router.params;
    // plugin:统计分析
    mta.App.init({
      appID: '',
      eventID: '', // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
      lauchOpts: initOptions, //渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
      statPullDownFresh: true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
      statShareApp: true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
      statReachBottom: true, // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
      autoReport: true, //开启自动上报
      statParam: true, //每个页面均加入参数上报
    });
    // 错误日志
    Raven.config(
      'http://249bc2010a4b419490ce4cc27095b662@errlog.fanink.cn/11',
      {
        release: '1.3', //'当前小程序版本'，
        environment: 'production', //'指定为production才会上报',
        allowDuplicates: true, // 允许相同错误重复上报
        sampleRate: 0.5 // 采样率
      }
    ).install();
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
