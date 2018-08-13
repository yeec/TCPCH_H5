import input from './input.default.web';
import inputSms from './input.sms.web';
import inputPick from './input.pick.web';
import inputClick from './input.Click.web';
import inputModal from './input.modal.web';
import group from './group.web'
import PureRenderHoc from '../../../util/hoc/index';
let Input = PureRenderHoc(input);
Input.Sms = PureRenderHoc(inputSms);
Input.Pick = PureRenderHoc(inputPick);
Input.Click = PureRenderHoc(inputClick);
Input.Modal = PureRenderHoc(inputModal);
Input.Group = PureRenderHoc(group);
export default Input;