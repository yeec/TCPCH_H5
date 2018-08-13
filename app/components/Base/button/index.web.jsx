import PureRenderHoc from '../../../util/hoc/index';
import Btn from './button.web';
import Group from './buttonGroup.web';
import './style/index.web';

let Button = PureRenderHoc(Btn);
Button.Group = PureRenderHoc(Group);



export default Button;