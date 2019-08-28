import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Form } from "@tarojs/components";

// components
import { AtButton } from "taro-ui";

import "./index.scss";

// extras
import { ENV } from "@/configs/index";
import { pushSendCode } from '@/api/user';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageOwnProps = {
  children?: any,
  circle?: boolean;
  size?: "normal" | "small";
  type?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  formType?: "submit" | "reset";
  color?: string,
  openType?:
  | undefined
  | "contact"
  | "share"
  | "getUserInfo"
  | "getPhoneNumber"
  | "launchApp"
  | "openSetting"
  | "feedback"
  | "getRealnameAuthInfo";
  pushCode?: boolean;
  onClick?: () => void;
  onError?: (val: any) => void;
  onGetUserInfo?: (val) => void;
  onContact?: (val) => void;
  onOpenSetting?: (val) => void;
  onGetPhoneNumber?: (val: any) => void;
};

type PageState = {};

type IProps = PageOwnProps;

interface Index {
  props: IProps;
  state: PageState;
}
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {};

  static defaultProps = {
    circle: true,
    size: "normal",
    type: "primary",
    loading: false,
    disabled: false,
    formType: "submit",
    openType: undefined,
    color: 'default',
    pushCode: false,
    onClick: () => null,
    onError: () => null,
    onGetUserInfo: () => null,
    onContact: () => null,
    onOpenSetting: () => null,
    onGetPhoneNumber: () => null
  };

  componentWillReceiveProps() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * 发送 formid到后台（用于推送消息）
   * @param e 
   */
  sendPushCode(e) {
    let formId: string = e.detail.formId;
    // if (formId && ENV === 'production') {
    if (formId) {
      pushSendCode(formId);
    }
  }

  render() {
    const {
      circle,
      size,
      type,
      loading,
      disabled,
      formType,
      openType,
      pushCode,
      onClick,
      onError,
      onContact,
      onGetPhoneNumber,
      onGetUserInfo,
      onOpenSetting,
    } = this.props;
    return (
      <View className="index">
        <Form reportSubmit={pushCode} onSubmit={this.sendPushCode}>
          <AtButton
            className="btn btn--red"
            type={type}
            size={size}
            circle={circle}
            full={false}
            loading={loading}
            disabled={disabled}
            formType={formType}
            openType={openType}
            onClick={onClick}
            onError={(...args) => onError && onError(...args)}
            onContact={(...args) => onContact && onContact(args)}
            onGetPhoneNumber={(...args) => onGetPhoneNumber && onGetPhoneNumber(...args)}
            onGetUserInfo={(...args) => onGetUserInfo && onGetUserInfo(...args)}
            onOpenSetting={(...args) => onOpenSetting && onOpenSetting(...args)}
          >
            {this.props.children}
          </AtButton>
        </Form>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>;
