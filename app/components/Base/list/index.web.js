import list from './list.web';
import group from './group.web'
import listlef from './lietleft.web'
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

let List = PureRenderHoc(list);
List.Group = PureRenderHoc(group);
List.left = PureRenderHoc(listlef);

export default List;


