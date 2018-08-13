import transdetail from './transdetail.web.jsx';
import grouptransdetail from './grouptransdetail.web'
import PureRenderHoc from '../../../../util/hoc/index';
import '../style/index.web';

let TransDetail = PureRenderHoc(transdetail);
TransDetail.Group = PureRenderHoc(grouptransdetail);

export default TransDetail;


