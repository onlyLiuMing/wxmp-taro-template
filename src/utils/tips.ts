import Taro from "@tarojs/taro";
/**
 * 提示与加载工具类
 */
export default class Tips {
  static isLoading = false;

  /**
   * 信息提示
   */
  static toast(title: string, duration = 1500): Promise<any> {
    Taro.showToast({
      title: title,
      icon: "none",
      mask: true,
      duration: duration
    });
    // 隐藏结束回调
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  /**
   * 弹出加载提示
   */
  static loading(title = "加载中", force = false) {
    if (this.isLoading && !force) {
      return;
    }
    this.isLoading = true;
    if (Taro.showLoading) {
      Taro.showLoading({
        title: title,
        mask: true
      });
    } else {
      Taro.showNavigationBarLoading();
    }
    // 3秒手自动关闭
    setTimeout(() => {
      if (this.isLoading) {
        this.loaded();
      }
    }, 3000)
  }

  /**
   * 加载完毕
   */
  static loaded(): Promise<any> {
    let duration = 0;
    if (this.isLoading) {
      this.isLoading = false;
      if (Taro.hideLoading) {
        Taro.hideLoading();
      } else {
        Taro.hideNavigationBarLoading();
      }
      duration = 500;
    }
    // 隐藏动画大约500ms，避免后面直接toast时的显示bug
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  /**
   * 弹出提示框
   */
  static success(title, duration = 1500): Promise<any> {
    Taro.showToast({
      title: title,
      icon: "success",
      mask: true,
      duration: duration
    });
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  /**
   * 弹出modal提示框
   * @return {errMsg: "showModal:ok", cancel: false, confirm: true}
   */
  static modal(
    title: string,
    content: string,
    config: {
      showCancel?: boolean,
      cancelText?: string,
      cancelColor?: string,
      confirmText?: string,
      confirmColor?: string
    } = {
        showCancel: false,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#576B95"
      }
  ) {
    return Taro.showModal({
      title: title,
      content: content,
      showCancel: false,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#576B95",
      ...config
    });
  }
}
