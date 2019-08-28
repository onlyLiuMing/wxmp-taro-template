import { InputType } from '@/types/index';
/**
 * TSearchBar.state 参数类型
 *
 * @export
 * @interface TSearchBarState
 */
export interface TSearchBarState { }
/**
 * TSearchBar.props 参数类型
 *
 * @export
 * @interface TSearchBarProps
 */
export interface TSearchBarProps {
  value: string,
  type: InputType,
  placeHolder: string,
  autoFocus: boolean,
  disabled: boolean;
  onClick?: any;
  onBlur?: any;
  onFocus?: any;
  onChange?: any;
  onConfirm?: any;
}
