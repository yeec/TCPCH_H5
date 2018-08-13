import React from 'react';
import PureRenderHoc from '../../../../util/hoc/index';
import Icon from './../../mbank-public-icon/index.web.jsx';
import './../style/index.web';

class MbankPublicListSelectBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankIcon: this.props.bankicon,
            bankName: this.props.bankname,
            bankNo:this.props.bankNo
        }
    }
    componentWillReceiveProps(nextProps){
        let that = this;
        that.setState({
            bankIcon: nextProps.bankicon,
            bankName: nextProps.bankname,
            bankNo:nextProps.bankNo
        })
    }
    clickHandle(){
        this.props.onclick(this.state.bankName,this.props.bankNo);
    }
    render() {
        // 银行名称对应图标
		let bankIcon = 'bank';
		let bankNum = this.state.bankNo == '313684093748' ? '313684093748' : this.state.bankNo.substring(0,3);
		let arr = [313684093748,102,103,104,105,308,307,301,302,309,303,305,403];
       
        for(let i=0;i<arr.length;i++){
            let checkNum = arr[i];

			if(Number(bankNum) === checkNum){
				bankIcon = 'logo-' + bankNum;
				break;
			}
        }

        return (
            <div className="mbank-public-list-item mbank-public-list-item-middle" onClick={this.clickHandle.bind(this)}>
                <div className="mbank-public-list-line">
                    {
                        this.state.bankIcon ?
                            <div className="mbank-public-list-title">
                                <Icon size="l" name={bankIcon}/>
                            </div>
                            : null
                    }
                    <div className="mbank-public-list-content">{this.state.bankName}</div>
                </div>
            </div>
        );
    }
}
MbankPublicListSelectBank.propTypes = {
    bankicon: React.PropTypes.string,
    bankname: React.PropTypes.string,
    onclick: React.PropTypes.any
};

MbankPublicListSelectBank.defaultProps = {
    bankicon: "",
    bankname: "",
    onclick: null
};

export default PureRenderHoc(MbankPublicListSelectBank);
