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

        const { name, namebg, nametite, icon, xqdate, riqi, hkr, hkrq, label, className, show, nlv, lv, cick, title, byhkje, money, sywh, sywhje, dk, dkje, hkcs, hkcsje, byhk, ...others } = this.props;
        const cls = classNames('ryt-icon',

            `rit-assetslist-box-header-${name}`,
            { [className]: className });

        const clss = classNames('ryt-icon',

            `rit-assetslist-box-header-${nametite}`,
            { [className]: className });

        const clasbg = classNames("rit-assetslist",

            `rit-assetslist-${namebg}`,
            { [className]: className });

        return (
            <div className="rit-assetslist">
                <div {...others} className={clasbg}>
                    <div className="rit-assetslist-box">
                        <div className="rit-assetslist-box-header">
                            <div {...others} className={cls}></div>

                        </div>
                        <div className="rit-assetslist-box-bottom" onClick={cick}>
                            <div className="rit-assetslist-box-bottom-left"><b>{label}</b></div>
                            <div className="rit-assetslist-box-bottom-right">{money}</div>
                            <div className="rit-assetslist-box-bottom-icon"><Icon size="xs" name={`arrow-${icon}`} /></div>
                        </div>

                        {show ?
                            <div>
                                <div className="rit-assetslist-box-bu">
                                    <div className="rit-assetslist-box-bu-left">{sywh}</div>
                                    <div className="rit-assetslist-box-bu-right">{sywhje}</div>
                                </div>
                                <div className="rit-assetslist-box-boder">
                                    <div className="rit-assetslist-box-ap">
                                        <div className="rit-assetslist-box-ap-left">
                                            <div className="rit-assetslist-box-ap-left-text">{dk}</div>
                                            <div className="rit-assetslist-box-ap-left-name">{dkje}</div>
                                        </div>
                                        <div className="rit-assetslist-box-ap-right">
                                            <div className="rit-assetslist-box-ap-right-text">{hkcs}</div>
                                            <div className="rit-assetslist-box-ap-right-name">{hkcsje}</div>
                                        </div>
                                    </div>
                                    <div className="rit-assetslist-box-ap">
                                        <div className="rit-assetslist-box-ap-left">
                                            <div className="rit-assetslist-box-ap-left-text">{byhk}</div>
                                            <div className="rit-assetslist-box-ap-left-name">{byhkje}</div>
                                        </div>
                                        <div className="rit-assetslist-box-ap-right">
                                            <div className="rit-assetslist-box-ap-right-text">{hkr}</div>
                                            <div className="rit-assetslist-box-ap-right-name">{hkrq}</div>
                                        </div>
                                    </div>
                                    <div className="rit-assetslist-box-ap">
                                        <div className="rit-assetslist-box-ap-left">
                                            <div className="rit-assetslist-box-ap-left-text">{xqdate}</div>
                                            <div className="rit-assetslist-box-ap-left-name">{riqi}</div>
                                        </div>

                                        <div className="rit-assetslist-box-ap-right">
                                            <div className="rit-assetslist-box-ap-right-text">{nlv}</div>
                                            <div className="rit-assetslist-box-ap-right-name">{lv}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}


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