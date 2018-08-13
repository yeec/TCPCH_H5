import confirm from './confirm.web';
import groupconfirm from './groupconfirm.web'
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';


let Confirminfo = PureRenderHoc(confirm);
Confirminfo.Group = PureRenderHoc(groupconfirm);


export default Confirminfo;