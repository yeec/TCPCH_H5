import React, {PropTypes} from 'react';
import Button from '../../../../app/components/Base/button/index.web';
import './style/index.web';

const PrefixCls = 'mbank-public-button';

let Listbutton = (props) => {
    let {
        title1,
        onTap1,
        title2,
        onTap2,
        icon,
        line,

        ...others
    } = props;


    return (
        <div className="mbank-public-button-box">
            <div className="ryt-flex">
                <div className="ryt-flex-item">
                    {/*<Tappable className={PrefixCls} onTap={onTap1} component="div">
                        <span>{title1}</span>
                    </Tappable>*/}
                    <Button type="primary" size="default" onTap={onTap1}>{title1}</Button>
                </div>
                {/*<div className="mbank-public-button-box-line"></div>*/}
                <div className="ryt-flex-item">
                    {/*<Tappable className={PrefixCls} onTap={onTap2} component="div">
                        <span>{title2}</span>
                    </Tappable>*/}
                    <Button type="primary" size="default" onTap={onTap2}>{title2}</Button>
                </div>
            </div>
        </div>

    );
};

Listbutton.propTypes = {
    thumb: PropTypes.any,
    thumbWidth: PropTypes.number,
    thumbHeight: PropTypes.number,
    arrow: PropTypes.oneOf(['up', 'down', 'right', 'empty', true, false]),
    title: PropTypes.any,
    subTitle: PropTypes.any,
    description: PropTypes.any,
    subDescription: PropTypes.any,
    onTap: PropTypes.func
};

export default Listbutton;
