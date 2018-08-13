import listbutton from './listbutton.web';
import grouplistbutton from './grouplistbutton.web'
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

let Listbutton = PureRenderHoc(listbutton);
Listbutton.Group = PureRenderHoc(grouplistbutton);


export default Listbutton;


