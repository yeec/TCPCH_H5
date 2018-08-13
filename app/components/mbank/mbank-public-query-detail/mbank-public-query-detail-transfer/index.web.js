import transferdetail from './transferdetail.web.jsx';
import grouptransdetail from './grouptransdetail.web'
import PureRenderHoc from '../../../../util/hoc/index';
import '../style/index.web';

let Transferdetail = PureRenderHoc(transferdetail);
Transferdetail.Group = PureRenderHoc(grouptransdetail);

export default Transferdetail;


