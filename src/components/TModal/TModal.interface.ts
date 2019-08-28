/**
 * TModal.state 参数类型
 *
 * @export
 * @interface TModalState
 */
export interface TModalState {}
/**
 * TModal.props 参数类型
 *
 * @export
 * @interface TModalProps
 */
export interface TModalProps {
  title?: any;
  footer?:any;
  isOpened: boolean;
  showClose?:boolean;
  onClose?:any;
}
