//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Common from "../../../../util/common.jsx";
import $Fetch from './../../../../fetch/fetch.js';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
//业务组件
import MbankPublicTextDetail from '../../../../components/mbank/mbank-pubilc-text-detail/index.web.jsx';

export default class RegisterText1 extends React.Component {
    constructor(props, context) {
        super(props, context);

        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "电子银行业务章程",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
    }
    goBackPage() {
        Common.setUrl("register/index.html")
    }

    render() {
        let that = this.state;
        let sty = {
            textIndent: "36px",
            color: "#545151"
        }
        let styl = {

            color: "#545151"
        }
        let style = {
            textIndent: "36px"
        }
        return (
            <div id="root">

                <div className=" mbank-public-text-detail">
                    <div className=" mbank-public-text-detail-header">
                        <div className=" mbank-public-text-detail-header-content">
                            <span>
                                <p></p>
                            </span>
                        </div>
                    </div>
                    {/* ///////// */}
                    <div className=" mbank-public-text-detail-body">
                        <p style={sty}>
                            <b >
                                尊敬的客户：为了维护您的权益，请在签署本章程前，仔细阅读本章程各条款（特别是含有黑体字标题或黑体字文字的条款），注意本章程涉及数量和质量、价款或者费用、履行期限和方式、安全注意事项和风险警示、售后服务、民事责任、管辖等内容的条款。请关注个人金融信息保护的相关法律法规，了解自己的权利义务，合理审慎提供个人金融信息，维护自身合法权益。如您有疑问或不明之处，请向经办行咨询，或者咨询您的律师和有关专业人士。如需进行业务咨询和投诉，请拨打凉山州商业银行客服热线：0834-96834。

                        </b>
                        </p>
                        <p style={style}>
                            第一条  凉山州商业银行股份有限公司（以下简称“凉山州商业银行”）依法开办电子银行业务，为客户提供安全、高效、全面的金融服务。
                        </p>
                        <p style={style}>
                            第二条  凡在凉山州商业银行开立账户、信誉良好的客户均可享受凉山州商业银行电子银行业务服务。
                        </p>

                        <p style={style}>
                            第三条  凉山州商业银行电子银行客户须遵守国家相关法律法规及本章程。
                        </p>

                        <p style={style}>
                            第四条  凉山州商业银行通过网上银行、电话银行、掌上银行、自助银行等电子银行渠道以及凉山州商业银行门户网站和客户服务中心为客户提供账户管理、支付结算、金融理财、电子商务、业务咨询等服务。
                        </p>
                        <p style={style}>
                            第五条  客户申请成为凉山州商业银行电子银行客户，可亲临凉山州商业银行营业网点办理，也可通过互联网、电话等电子渠道自助办理。
                        </p>
                        <p style={style}>
                            客户办理电子银行注册等业务时，须保证所提供的资料真实、准确、完整、有效，并与凉山州商业银行签订相应服务协议。
                        </p>
                        <p style={style}>
                            第六条  凉山州商业银行根据不同的客户种类（个人、企业、商户等）、注册方式（营业网点注册、自助注册等）和身份认证方式，为客户提供相应的电子银行服务。
                        </p>
                        <p style={style}>
                            在营业网点注册的客户可享受更为全面的电子银行服务。
                        </p>
                        <p style={style}>
                            第七条  凉山州商业银行电子银行客户身份标识有用户名、账号、客户号等。
                        </p>
                        <p style={style}>
                            凉山州商业银行电子银行客户身份认证方式有CFCA证书、动态密码设备、静态密码等。
                        </p>
                        <p style={style}>
                            第八条  凉山州商业银行以电子银行客户的正确身份标识和身份认证方式作为判别客户身份合法性和确认交易有效性的依据。<b style={styl}>凡使用正确的客户身份标识和身份认证方式进行的交易均视为客户本人所为，所产生的电子信息记录为该项交易的有效凭据。</b>
                        </p>
                        <p style={style}>
                            第九条  客户应妥善保管本人的身份标识和身份认证方式，避免发生泄漏或遗失。如发生客户身份认证方式泄漏或遗失等，应及时办理挂失、补办或密码重置等业务。<b style={styl}>因客户保管不善、挂失不及时、未采取必要的风险防范措施等客户自身原因导致的资金损失，由客户承担。</b>
                        </p>
                        <p style={style}>
                            第十条 CFCA证书应在有效期内使用。有效期或有效使用次数届满前，客户如需继续使用，应及时办理证书更新等业务。
                        </p>
                        <p style={style}>
                            第十一条  客户通过电子银行办理业务，须遵守该业务交易规则，并根据交易提示进行正确操作。
                        </p>
                        <p style={style}>
                            对凉山州商业银行验证无误并已执行的电子支付指令，客户不得要求变更或撤销。
                        </p>


                        <p style={sty}>
                            <b>
                                第十二条  凉山州商业银行可基于执行国家法律法规、维护客户权益、保障交易安全、进行系统升级、提升服务质量等原因变更本章程、暂停或终止电子银行业务服务，并通过营业场所和凉山州商业银行门户网站公示通知客户。客户不同意的，可以终止服务、解除本章程；各方协商一致的，也可变更相关服务和对应章程内容。
                            </b>
                        </p>
                        <p style={style}>
                            第十三条  客户可以到凉山州商业银行营业网点办理电子银行信息变更、暂停、恢复、注销等业务，客户办理上述业务时须提供相应资料。
                        </p>
                        <p style={style}>
                            客户可以通过电子渠道自助办理账户口头挂失，办理账户挂失业务应当遵守凉山州商业银行账户挂失业务规定，请在挂失时咨询客服人员。
                        </p>

                        <p style={style}>
                            <b style={styl}>第十四条  凉山州商业银行的服务价格依据相关法律法规规定的程序制定和调整，并在营业场所和凉山州商业银行门户网站公示。凉山州商业银行将严格按照依据相关法律法规制定和调整的服务价格收取费用。凉山州商业银行调整服务价格或变更服务章程，客户不同意的，客户可以终止服务，解除本章程；双方协商一致的，也可以变更相关服务和对应章程内容。</b>
                            凉山州商业银行因增值税等国家税收相关法律法规调整而调整服务价格的，不受本条前述内容约束。
                        </p>
                        <p style={style}>
                            本合同项下凉山州商业银行向客户收取的符合国家税务征收相关法律法规规定的应税事项的款项中均已包含增值税。增值税税率依据国家法律法规的规定确定。在合同履行期间，如遇国家税务管理法律法规进行调整，凉山州商业银行将相应调整相关的税率等相关内容。
                        </p>
                        <p style={sty}>
                            <b>
                                第十五条  发生以下情况之一时，凉山州商业银行有权暂停或终止对客户的电子银行服务：
                            </b>
                        </p>





                        <p style={style}>
                            （一）客户开通或使用凉山州商业银行电子银行的申请资料为伪造或虚假的；
                        </p>
                        <p style={style}>
                            （二）电子银行被他人盗用，或存在发生这种事件可能的；
                        </p>
                        <p style={style}>
                            （三）利用电子银行进行非法或不正当交易的；
                        </p>
                        <p style={style}>
                            （四）利用电子银行获取不当利益或造成他人损失的；
                        </p>
                        <p style={style}>
                            （五）客户注册后超过规定时限未使用电子银行服务的或未缴纳电子银行服务费用超过规定时限的；
                        </p>
                        <p style={style}>
                            （六）客户申请电子银行服务的注册账户已经全部销户的；
                        </p>
                        <p style={style}>
                            （七）其他危害凉山州商业银行电子银行业务安全的情况。
                        </p>
                        <p style={sty}>
                            <b>
                                第十六条  客户使用电子银行应提高自身风险防范意识，采取必要的风险防范措施，安全办理各项电子银行业务。此类风险包括但不限于：
                            </b>
                        </p>
                        <p style={style}>
                            （一）客户身份标识和密码等重要信息被他人猜出、偷窥，或利用木马病毒、假冒网站、欺诈短信/电话等手段非法获取，导致客户信息泄露、资金损失、账户被恶意操作等情况；
                        </p>
                        <p style={style}>
                            （二）客户更换手机号时，未将以原手机号开通的短信服务取消，当该手机号被电信运营商发放给其他人时，可能造成客户的账户信息泄露等情况;
                        </p>
                        <p style={style}>
                            （三）客户USB-Key客户证书遗失或被他人盗用，可能造成账户资金被盗等情况；
                        </p>
                        <p style={style}>
                            （四）客户的手机、固定电话被他人冒用或盗用，可能造成账户资金被盗等情况；
                        </p>
                        <p style={style}>
                            （五）办理电子银行业务的相关资料（如身份证件、账户原件、银行预留印鉴等）被他人冒用或窃取，可能造成被他人假冒注册电子银行，出现账户资金损失等情况。
                        </p>
                        <p style={sty}>
                            <b>
                                第十七条  客户办理电子银行业务应直接登录<a href="www.lszsh.com.cn">www.lszsh.com.cn</a>（网上银行）、<a href="mbank.lszsh.com.cn">mbank.lszsh.com.cn</a>(掌上银行)，或拨打0834-96834客户服务电话，或发送短信到凉山州商业银行网站公布的指定号码，不要通过其他网址、号码或链接办理电子银行业务。
                            </b>
                        </p>
                        <p style={style}>
                            第十八条  凉山州商业银行采取有效措施保障电子银行业务的安全、平稳运营，因不可抗力等原因导致电子银行业务不能正常运营，客户可拨打0834-96834客户服务电话或向当地凉山州商业银行营业网点咨询。
                        </p>
                        <p style={style}>
                            第十九条  客户向凉山州商业银行反映电子银行状态不正常后，应配合凉山州商业银行进行有关调查，并对所提供情况的真实性负责。
                        </p>
                        <p style={style}>
                            第二十条  凉山州商业银行不介入客户之间的纠纷，仅在法律法规允许范围内提供交易事实证明。
                        </p>
                        <p style={style}>
                            第二十一条  客户在办理电子银行业务过程中如发生争议，可遵照法律法规、本章程及与凉山州商业银行签署的相关服务协议的约定与凉山州商业银行解决争议。
                        </p>
                        <p style={style}>
                            第二十二条  本章程自发布之日起实施，适用中华人民共和国法律法规。本章程所称法律法规包括法律、行政法规、地方性法规、规章、司法解释及其他具有法律效力的规定。本章程未有规定的，按照客户与凉山州商业银行签署的服务协议、法律法规和金融惯例处理。
                        </p>

                    </div>
                    <div className=" mbank-public-text-detail-footer">
                        <div className=" mbank-public-text-detail-footer-description">凉山州商业银行</div>
                    </div>
                </div>
                <WhiteSpace size="lg" />
            </div>
        )
    }
}	