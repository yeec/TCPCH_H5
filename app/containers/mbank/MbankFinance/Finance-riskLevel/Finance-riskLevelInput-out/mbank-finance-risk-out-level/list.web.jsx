import React from 'react';

import '../../../../../../components/Base/radio/style/index.web';
import '../style/index.web';

const prefixCls = 'mbank-account-list';


export default class MbankAccountList extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;

        let {

            className,
            select,
            keyNo,
            idNo,
            onClick
        } = props;


        return (
            <label className="evaluate-ryt-cell evaluate-ryt-cell-backcolo">
                <div className="evaluate-ryt-cell-content">
                    <div className="evaluate-ryt-cell-content-title-area">
                        <div className="evaluate-ryt-cell-content-title">{idNo}、{select}</div>
                        <div className="evaluate-ryt-cell-content-title-sub"></div>
                    </div>
                    <div className="evaluate-ryt-cell-content-description-area">
                        <div className="evaluate-ryt-cell-content-description">

                            <input type="radio" id={idNo} name={keyNo} className="ryt-radio evaluate-evaluate-ryt-radio"
                                value={idNo} />
                        </div>
                        <div className="evaluate-ryt-cell-content-description-sub"></div>
                    </div>
                </div>
            </label>
        );
    }
}


