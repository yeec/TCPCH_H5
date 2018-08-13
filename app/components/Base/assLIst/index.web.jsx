import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import './style/index.web';
import Icon from '../../mbank/mbank-public-icon/index.web';
class MbankAccountIcon extends React.Component {

    constructor(props) {
        super(props);
    }
    // clickHandle() {
    //     this.props.onclick ? this.props.onclick() : null;
    // }
    render() {

        const { valsty,title, description, indx, click, fefse, icoico, styl, icon, ndata, lv, enddata, ...others } = this.props;
        let sty222 = "";
        if(valsty){
            sty222 = {
                color:"#333"
            }
        }else{
            sty222={
                color:"#969696"
            } 
        }
        

        return (
            <div className="rit-asslist">
                <div className="rit-asslist-box" onClick={click}>
                    <div style={sty222} className="rit-asslist-box-left">{title}</div>
                    <div className="rit-asslist-box-right">{description}</div>
                    <div className="rit-asslist-box-icon"><Icon size="xs" iconn={icoico} name={`arrow-${icon}`} /></div>
                </div>
                <div id={fefse} style={styl}>
                    <div className="rit-asslist-xq">
                        <div className="rit-asslist-xq-left">
                            <div className="rit-asslist-xq-left-text">存期</div>
                            <div className="rit-asslist-xq-left-zhi">
                            {ndata == "M3" ? "三个月" : ndata == "M6" ? "六个月" : ndata == "M12" ?"一年" : ndata == "M24" ?"两年" : ndata == "M36" ?"三年" : ndata == "M60" ?"五年" : "其他"}
                            </div>

                        </div>
                        <div></div>
                        <div className="rit-asslist-xq-zhong">
                            <div className="rit-asslist-xq-left-text">利率</div>
                            <div className="rit-asslist-xq-left-zhi">{lv}</div>
                        </div>
                        <div className="rit-asslist-xq-right">
                            <div className="rit-asslist-xq-left-text">到期日</div>
                            <div className="rit-asslist-xq-left-zhi">{enddata}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MbankAccountIcon.propTypes = {
    size: React.PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'l', 'xl', 'lg']),
    onclick: React.PropTypes.any
};
MbankAccountIcon.defaultProps = {
    size: 'md',
    onclick: null
};
export default PureRenderHoc(MbankAccountIcon);