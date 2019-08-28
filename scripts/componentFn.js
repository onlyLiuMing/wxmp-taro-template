/**
 * pages页面快速生成脚本
 * 用法：npm run com --name=<%component_name%>
 * author: wangmeng
 * update: 2019.8.6
 */

const fs = require("fs");
const Colors = require("colors");
const args = require("yargs").argv;

const componentName = args.name;
if (!componentName) {
  console.info(
    Colors.magenta("component name 不能为空！--name=<%compnent_name%>")
  );
  process.exit();
}

// 大写名称
const capPirName =
  componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
//页面模板
const indexTep = `import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import "./index"

export default function ${capPirName}():any{
  return (<View className='fx-${componentName}-wrap'>${capPirName}</View>)
}
`;

// scss文件模版
const scssTep = `@import "../../assets/scss/variables";
.#{$prefix} {
  &-${componentName}-wrap {
    width: 100%;
  }
}
`;

fs.mkdirSync(`./src/componentsFn/${componentName}`); // mkdir $1
process.chdir(`./src/componentsFn/${componentName}`); // cd $1

fs.writeFileSync(`index.tsx`, indexTep); //tsx
fs.writeFileSync(`index.scss`, scssTep); // scss
