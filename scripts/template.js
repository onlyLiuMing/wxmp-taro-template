/**
 * pages页面快速生成脚本
 * 用法：npm run temp --dir=<%dir_name%> --name=<%page_name%>
 * author: wangmeng
 * update: 2019.8.6
 */

const fs = require("fs");
const Colors = require("colors");
const args = require("yargs").argv;

// const dirName = process.argv[2];// 文件夹名称
// 文件夹名称
const dirName = args.dir;
// 生成文件名称
const pageName = args.name;
// 目标目录
let targetPath = "./src/pages/";
let isSubpackage = false;
// 判断是否设置目录
if (!dirName) {
  console.info(Colors.magenta("dir名称不能为空！--dir=<%dir_name%>"));
  process.exit();
} else if (dirName != "subpackages" && dirName != "pages") {
  console.info(
    Colors.magenta(`dir名称必须为 “pages" --dir=<%dir_name%>`)
  );
  process.exit();
}
// 判断是否设置page name
if (!pageName) {
  console.info(Colors.magenta(`name名称不能为空！ --name=<%page_name%>`));
  process.exit();
}

// set dir path
if (dirName == "pages") {
  targetPath = targetPath;
  isSubpackage = false;
} else {
  targetPath = "./src/subpackages/distantPages/pages/";
  isSubpackage = true;
}
console.info(`dir path: ${targetPath}`);

const capPirName =
  pageName.substring(0, 1).toUpperCase() + pageName.substring(1);

//页面模板
const indexTep = `import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '@/utils/request'
// import Tips from '@/utils/tips'
import { ${capPirName}Props, ${capPirName}State } from './${pageName}.interface'
import './${pageName}.scss'
// import {} from '@/interfaces/index';// global interfaces
// import {} from '@/types/index';// global types

// components

// images

// @connect(({ ${pageName} }) => ({
//     ...${pageName},
// }))
class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  static options = {
    addGlobalClass: true
  }
  constructor(props: ${capPirName}Props) {
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
      <View className='fx-${pageName}-wrap'>
        ${pageName}页面
      </View>
    )
  }
}
export default ${capPirName}
`;

// scss文件模版
const scssTep = `@import "${
  isSubpackage
    ? "../../../../assets/scss/variables"
    : "../../assets/scss/variables"
}";
.#{$prefix} {
  &-${pageName}-wrap {
    width: 100%;
    min-height: 100vh;
    background-color: $page-color;
    overflow: scroll;
  }
}
`;

// config 接口地址配置模板
const configTep = `export default {
  test: '/wechat/perfect-info', //xxx接口
}
`;
// 接口请求模板
const serviceTep = `import Request from '../../utils/request'
const apiRequest = new Request('${pageName}');

export const testApi = (data)=>{
  return apiRequest.query({})
}
`;

//model模板

const modelTep = `// import Taro from '@tarojs/taro';
// import * as ${pageName}Api from './service';
export default {
  namespace: '${pageName}',
  state: {},
  effects: {
    *example({ payload:Page },{ select, call, put }){}
  },
  reducers: {
    updateState(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
}
`;

// interface 模版
const interfaceTep = `//import {} from '@/interfaces/index';
/**
 * ${pageName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}
/**
 * ${pageName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`;

fs.mkdirSync(`${targetPath}${pageName}`); // mkdir $1
process.chdir(`${targetPath}${pageName}`); // cd $1

fs.writeFileSync(`${pageName}.tsx`, indexTep); //tsx
fs.writeFileSync(`${pageName}.scss`, scssTep); // scss
// fs.writeFileSync("config.ts", configTep); // config
// fs.writeFileSync("service.ts", serviceTep); // service
fs.writeFileSync("model.ts", modelTep); // model
fs.writeFileSync(`${pageName}.interface.ts`, interfaceTep); // interface

// exit script
process.exit(0);
