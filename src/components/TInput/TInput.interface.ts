import { InputType } from '@/types/index';
/**
 * TInput.state 参数类型
 *
 * @export
 * @interface TInputState
 */
export interface TInputState {}
/**
 * TInput.props 参数类型
 *
 * @export
 * @interface TInputProps
 */
// TODO:关于 “自定义dom” 部分需要找新的办法
export interface TInputProps {
  leftIcon?:string;
  leftChild?:any;// 左侧自定义dom[由于小程序的问题，目前只能传string]
  rightIcon?:string;
  rightChild?:any;// 右侧自定义dom[由于小程序的问题，目前只能传string]
  name:string;
  type: "text" | "number" | "password" | "phone" | "idcard" | "digit";
  value: string;
  placeholder: string;
  title: string;
  disabled?: boolean;
  border?: boolean;
  editable?: boolean;
  error?:boolean;
  autoFocus?:boolean;
  focus?:boolean;
  onChange?:any;
  onClick?:any;
  onLeftIconClick?:any;
  onLeftChildClick?:any;
  onRightIconClick?:any;
  onRightChildClick?:any;
}
