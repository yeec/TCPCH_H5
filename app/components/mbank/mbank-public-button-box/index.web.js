import button from './button.web';
import groupbutton from './groupbutton.web'
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';


let ButtonBox = PureRenderHoc(button);
ButtonBox.Group = PureRenderHoc(groupbutton);


export default ButtonBox;


