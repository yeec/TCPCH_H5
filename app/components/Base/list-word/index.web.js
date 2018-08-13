import cell from './list.web';
import group from './group.web'
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

let Cell = PureRenderHoc(cell);
Cell.Group = PureRenderHoc(group);


export default Cell;


