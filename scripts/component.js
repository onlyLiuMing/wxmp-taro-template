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
const indexTep = `import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ${capPirName}Props, ${capPirName}State } from './index.interface'
import './index.scss'
class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
  constructor(props: ${capPirName}Props) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps:${capPirName}Props = {}
  render() {
    return (
      <View className='fx-${componentName}-wrap'>
        ${componentName}
      </View>
    )
  }
}
export default ${capPirName}
`;

// scss文件模版
const scssTep = `@import "../../assets/scss/variables";
.#{$prefix} {
  &-${componentName}-wrap {
    width: 100%;
  }
}
`;

const interfaceTep = `/**
 * ${componentName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}
/**
 * ${componentName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`;

fs.mkdirSync(`./src/components/${componentName}`); // mkdir $1
process.chdir(`./src/components/${componentName}`); // cd $1

fs.writeFileSync(`index.tsx`, indexTep); //tsx
fs.writeFileSync(`index.scss`, scssTep); // scss
fs.writeFileSync(`index.interface.ts`, interfaceTep); // interface
