import list from './list.web';
import grouplist from './grouplist.web'
import PureRenderHoc from '../../../../../util/hoc/index';
import './style/index.web';

let List = PureRenderHoc(list);
List.Group = PureRenderHoc(grouplist);


export default List;


