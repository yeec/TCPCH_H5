import React from 'react';
import PureRenderHoc from '../../../../util/hoc/index';
import MbankAccountIcon from './../../mbank-public-icon/index.web.jsx';
import Checkbox from '../../../Base/checkbox/index.web.js';
import Common from "../../../../util/common.jsx"


class MbankTransferSavePeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankLogo: this.props.banklogo,
            Name: this.props.name,
            bankName: this.props.bankname,
            accountNum: this.props.accountnum,
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let that = this;
        that.setState({
            bankLogo: nextProps.banklogo,
            Name: nextProps.name,
            bankName: nextProps.bankname,
            accountNum: nextProps.accountnum,
        })
    }

    changeHandle(flag) {
        this.props.checkedState(flag);
    }

    render() {
        let accountNum = Common.setPhoneNumFour(this.state.accountNum);
        return (
            <div className="mbank-public-select-list">
                <div className="mbank-public-select-list-body">
                    <div className="mbank-public-select-list-item mbank-public-select-list-item-middle">
                        <div className="mbank-public-select-list-line">
                            <div className="mbank-public-select-list-item-icon">
                                <MbankAccountIcon size="l" name={this.state.bankLogo}/></div>
                            <div className="mbank-public-select-list-content ">
                                <div><span>{this.state.Name}</span></div>
                                <div className="mbank-public-select-list-brief"><span>{this.state.bankName}尾号{accountNum}</span></div>
                            </div>
                            <div className="mbank-public-select-list-checkbox">
                                <Checkbox onChange={this.changeHandle.bind(this)}/>
                                <span>保存收款人</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MbankTransferSavePeople.propTypes = {
    banklogo: React.PropTypes.string,
    name: React.PropTypes.string,
    bankname: React.PropTypes.string,
    accountnum: React.PropTypes.string,
    checkedState: React.PropTypes.any
};

MbankTransferSavePeople.defaultProps = {
    banklogo: "beijing",
    name: "",
    bankname: "",
    accountnum: "",
    checkedState: false
};

export default PureRenderHoc(MbankTransferSavePeople);
