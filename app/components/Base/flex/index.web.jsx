import flex from './flex.web';
import item from './item.web';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';

let Flex = PureRenderHoc(flex);
Flex.Item = PureRenderHoc(item);


export default Flex

