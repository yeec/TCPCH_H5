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

export default class RegisterText extends React.Component {
    constructor(props, context) {
        super(props, context);

        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "电子银行个人客户服务协议",
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
                                尊敬的客户：为了维护您的权益，请在签署本协议前，仔细阅读本协议各条款（特别是含有黑体字标题或黑体字的条款），注意本协议涉及数量和质量、价格或者费用、履行期限和方式、安全注意事项和风险警示、售后服务、民事责任、管辖等内容的条款。请关注个人金融信息保护的相关法律法规，了解自己的权利义务，合理审慎提供个人金融信息，维护自身合法权益。如您有疑问或不明之处，请向经办行咨询，或者咨询您的律师和有关专业人士。如需进行业务咨询和投诉，请拨打凉山州商业银行客服热线：0834-96834。
您点击本协议下方“我同意”按钮，即表示您作为我行客户已全部知晓并充分理解协议内容和含义，愿意遵守本协议，双方意思表示一致，本协议生效。
                        </b>
                        </p>
                        <p style={styl}> <b >
                            甲方：电子银行申办客户
                        </b></p>
                        <p style={styl}>
                            <b>
                                乙方：凉山州商业银行股份有限公司
                        </b></p>

                        <p style={style}>
                            为明确甲方（客户）、乙方（凉山州商业银行股份有限公司）双方的权利和义务，规范双方业务行为，甲、乙双方本着平等互利的原则，签订本协议并共同遵守。
                        </p>

                        <p style={sty}>
                            <b>
                                第一条  如无特别说明，下列用语在本协议中的含义为：
                        </b>

                        </p>
                        <p style={style}>
                            电子银行业务：是指银行利用面向社会公众开放的通讯通道或开放型公众网络，以及银行为特定自助服务设施或客户建立的专用网络，向客户提供的银行服务。
                        </p>
                        <p style={style}>
                            身份认证要素：指银行用于识别客户身份的信息要素，如客户号、用户名、账号、密码、数字证书、动态口令、生物特征识别、签约设置的电话号码等。
                        </p>
                        <p style={style}>
                            电子指令：指客户通过电子银行凭借相关的身份认证要素发起的交易请求的统称。
                        </p>
                        <p style={style}>
                            密码：指客户自行设定并用于验证客户身份的字符信息。
                        </p>
                        <p style={style}>
                            动态口令：是指按照特定规则动态产生并用于识别客户身份的字符组合，动态口令的载体包括USB-KEY、手机认证软件、短信等。
                        </p>
                        <p style={style}>
                            CFCA证书：或称CFCA电子证书，是由CFCA颁发的、存放客户身份标识，并对客户发送的网上银行交易信息进行数字签名的电子文件，包括个人客户证书。
                        </p>
                        <p style={sty}>
                            <b>
                                第二条  甲方的权利和义务
                            </b>
                        </p>
                        <p style={style}>
                            2.1 甲方有权向乙方申请注册电子银行业务，经乙方同意后，有权根据注册方式的不同享受相应的服务。
                        </p>
                        <p style={style}>
                            2.2 甲方有权选择申请电子银行业务种类。<b style={styl}>甲方通过电子银行渠道（包括网上银行、手机银行、短信银行、电话银行等）向非同名银行账户和支付账户转账的日累计限额、笔数和年累计限额等，以甲方在乙方申请开通上述渠道转账业务时在业务申请表、章程协议或业务凭证等法律文件上最终确认的信息为准。如甲方申请开通时未设置限额的，则乙方将自动为甲方设置为乙方默认限额（个人手机银行客户单笔限额50万元，日累计限额50万）。甲方可通过网上银行、手机银行渠道在默认限额内进行修改。</b>
                        </p>
                        <p style={style}>
                            2.3 甲方如对乙方提供的电子银行服务有疑问、意见或建议，可以拨打乙方客户服务电话0834-96834、登录乙方门户网站<a href="www.lszsh.com.cn">www.lszsh.com.cn</a>或向乙方营业网点咨询。
                        </p>
                        <p style={style}>
                            2.4 甲方有权在协议有效期内申请办理电子银行注销手续。
                        </p>
                        <p style={style}>
                            2.5 甲方申请电子银行业务注册、业务变更、业务暂停、业务恢复、业务注销，使用乙方电子银行业务服务等，均应按乙方规定的程序办理相关手续，自愿遵守《凉山州商业银行股份有限公司电子银行业务章程》、凉山州商业银行电子银行有关交易规则，执行凉山州商业银行股份有限公司电子银行资费标准。甲方获得上述内容（指《凉山州商业银行股份有限公司电子银行业务章程》、交易规则、资费标准等）的途径包括但不限于凉山州商业银行股份有限公司营业网点、门户网站<a href="www.lszsh.com.cn">www.lszsh.com.cn</a>等。<b style={styl}>如果上述内容发生变化，乙方通过门户网站和营业网点公示等方式通知甲方，甲方不同意的，可以在履行本协议项下应尽义务后终止服务，解除本协议；双方协商一致的，也可变更相关服务和对应协议内容。</b>
                        </p>
                        <p style={style}>
                            2.6 甲方为未成年人时，由其监护人代为申请、办理电子银行业务。
                        </p>
                        <p style={sty}>
                            2.7 甲方应提供真实、完整、准确、有效的身份信息、联系信息及其他相关资料信息。
                        <b>如有更改，甲方应及时办理电子银行业务变更手续，否则由此产生的不利后果由甲方承担。甲方应避免使用他人手机号码作为本人联系信息，否则由此产生的不利后果由甲方承担。</b>
                        </p>
                        <p style={style}>
                            2.8 甲方使用乙方电子银行业务应尽到合理注意义务，通过正确的网址或号码等办理；甲方办理网上银行业务应直接登录乙方门户网站www.lszsh.com.cn，而不要通过邮件或其他网站提供的链接登录；甲方在中国大陆地区办理电话银行业务，应直接拨打乙方服务电话0834-96834或在凉山州商业银行网站公布的指定电话号码，而不要拨打其他电话；甲方办理手机银行业务应通过手机直接登录乙方手机银mbank.lszsh.com.cn或通过乙方提供的客户端登录；甲方使用短信银行应将短信发送到0834-96834；甲方应从凉山州商业银行网站或经其授权的下载地址下载客户端。
                        </p>
                        <p style={sty}>
                            <b>
                                2.9 甲方使用乙方电子银行业务应采取及时更新防病毒软件、安装系统安全补丁等合理措施保护终端设备及使用环境的安全；按照审慎的原则设置和保管密码，避免使用简单密码或容易被他人猜到的密码（如123456等顺序或逆序数列、888888等多个相同数字、出生日期、家庭电话、手机号码、姓名字母拼音等），否则应承担不利后果。
                        </b>
                        </p>
                        <p style={sty}>
                            <b >
                                2.10 甲方使用乙方手机安全认证功能的，应当使用甲方本人的手机完成认证。甲方使用短信验证码认证的，需事先开通短消息服务并绑定正确的、本人实名登记的手机号码，乙方向该手机号发送可用于支付甲方账户资金的动态口令。甲方应在交易的过程中认真核对短信服务号码、短信发送的内容与正在交易事项是否一致，如果因甲方未认真核对短信内容造成的损失，由甲方承担。
                        </b>
                        </p>
                        <p style={sty}>
                            <b >
                                甲方使用手机认证软件认证的，需按乙方要求及时更新手机银行软件，甲方应确保在安全的环境中使用手机银行软件，并妥善保管手机、银行卡、手机银行登录密码、银行卡支付密码、指纹密码等敏感信息，通过此支付方式实现的交易，均视作甲方所为，由此所产生的后果由甲方承担。
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                                因甲方手机号码错误、欠费停机、关机等原因未及时接收到安全认证信息导致交易无法完成或产生损失的，甲方应承担不利后果。
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                                2.11 电子银行判别客户身份真实性和交易有效性的依据是相应身份认证要素；凡通过相应身份认证要素实现的交易，均视作甲方所为。甲方须妥善保管身份认证要素；若发生遗失、被盗、遗忘或怀疑已被他人知悉、盗用等情况，应及时通知乙方并办理更换、挂失或重置等手续。办妥上述手续之前所产生的后果由甲方承担。甲方为未成年人时，由其监护人代为保管和办理。
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                                2.12 甲方知悉并同意，乙方执行通过安全程序的电子支付指令后，甲方不得要求变更或撤销电子支付指令。
                        </b>
                        </p>

                        <p style={style}>

                            2.13 为便利甲方使用乙方各项金融服务，乙方可向甲方提供发送产品信息、金融资讯、祝福问候等增值服务；甲方有权拒绝发送，双方亦可就发送信息另行约定。甲方主动向乙方服务号码发送的短信，费用由甲方承担。

                        </p>
                        <p style={sty}>
                            <b>
                                2.14 甲方应按照乙方相关服务价格标准支付服务费用。为便于甲方付费，双方商定费用由乙方从甲方约定账户划收。甲方如需自行交纳，可与乙方另作约定。
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                            2.15 出现错账时，乙方将根据实际交易情况进行账务处理；甲方获得不当得利的，为节省客户时间、维护客户利益，在不损害甲方合法权益的情况下，乙方可以扣划不当得利相关款项并通知甲方。
                        </b>
                        </p>
                        <p style={style}>

                        2.16 甲方应保证办理电子支付业务账户的支付能力，并严格遵守支付结算业务的相关法律法规。

                        </p>
                        <p style={style}>

                        2.17 甲方不得以与第三方发生纠纷为理由拒绝支付应付乙方的款项。
                        </p>
                        <p style={style}>
                            <b style ={sty}>2.18 甲方在使用电子银行业务时，应当按照业务提示进行正确操作，如果因甲方未进行正确操作导致的损失，由甲方承担。</b>
                            甲方使用电子银行业务如果涉及乙方其他业务产品的，应当遵守该业务产品的协议和交易规则、交易提示。
                        </p>
                        <p style={style}>

                        2.19 甲方不得有意诋毁、损害乙方声誉或恶意攻击乙方电子银行系统。

                        </p>
                        <p style={sty}>
                            <b>
                            第三条 乙方的权利和义务
                        </b>
                        </p>
                        <p style={style}>

                        3.1 乙方有权根据甲方资信情况，决定是否受理甲方的注册申请。

                        </p>
                        <p style={style}>

                        3.2 乙方有权根据业务种类、认证方式、客户类型等业务策略设定不同的电子银行交易限额。

                        </p>
                        <p style={sty}>
                        <b>
                        3.3 乙方应根据甲方发送的有效电子指令处理甲方已提交的业务请求，对于以下任一情况，乙方不承担责任：<br></br>
                        （一）乙方接收到的电子指令信息不完整或信息内容有误；<br></br>（二）甲方账户可用余额或信用额度不足；<br></br>
                        （三）甲方账户资金被依法冻结或扣划；<br></br>（四）甲方未能按照乙方的有关业务规定正确操作；<br></br>（五）甲方的行为出于欺诈或其他非法目的；
                        <br></br>（六）法律法规或有权机关认定乙方不承担责任的。
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                            3.4 乙方可基于执行国家法律法规、政策、外部监管规定、维护客户权益、保障交易安全、进行系统升级、提升服务质量等原因变更本协议、暂停或终止电子银行业务服务，并通过营业场所和凉山州商业银行门户网站公示通知甲方。甲方不同意的，可以在履行本协议项下应尽义务后终止服务、解除本协议；各方协商一致的，也可变更相关服务和对应协议内容。
                        </b>
                        </p>
                        <p style={style}>

                        3.5 甲方注销全部电子银行注册账户的，乙方有权主动注销其相应电子银行业务。

                        </p>
                        <p style={style}>

                        3.6 乙方负责为甲方办理电子银行相关业务，并按甲方注册方式的不同为甲方提供相应的电子银行服务。

                        </p>
                        <p style={style}>

                        3.7 在乙方系统正常运行情况下，乙方负责及时准确地处理甲方发送的电子银行业务指令，并及时向甲方提供查询交易记录、资金余额、账户状态等服务。

                        </p>
                        <p style={style}>

                        3.8 乙方对于电子银行所使用的相关软件的合法性承担责任。

                        </p>
                        <p style={style}>
                            3.9 乙方有义务为甲方提供电子银行业务咨询服务。
                        </p>
                        <p style={style}>
                            3.10 因乙方过失造成甲方支付指令处理延误，导致甲方损失的，乙方按中国人民银行《支付结算办法》有关规定赔偿。
                        </p>
                        <p style={sty}>
                            <b>
                            第四条  协议的中止和解除
                        </b>
                        </p>
                        <p style={style}>
                        4.1 发生以下情况时，本协议中止：<br></br>
                        </p>
                        <p style={style}>
                        （一）甲方未按时支付电子银行相关服务费用的；
                        </p>
                        <p style={style}>
                        （二）一方丧失相应民事行为能力的；
                        </p>
                        <p style={style}>
                        （三）其他导致协议中止情况的。
                        </p>
                        <p style={style}>
                        待上述情况消除后，本协议自动恢复执行。
                        </p>
                        <p style={sty}>
                            <b>
                            4.2 发生以下情况之一时，乙方有权解除本协议：
                        </b>
                        </p>
                        <p style={style}>
                        （一）甲方未按时支付电子银行相关服务费用，历时一年以上的；
                        </p>
                        <p style={style}>
                        （二）甲方注销全部电子银行注册账户的；
                        </p>
                        <p style={style}>
                        （三）甲方恶意操作、诋毁、损害乙方声誉的；
                        </p>
                        <p style={style}>
                        （四）甲方利用乙方电子银行系统从事违法犯罪活动的。
                        </p>
                        <p style={style}>
                        4.3 甲方有权注销电子银行服务、解除本协议，并应到经办行办理解除手续。
                        </p>
                        <p style={style}>
                        4.4 双方解除协议的，并不影响此前协议履行带来的法律后果。
                        </p>
                        <p style={sty}>
                            <b>
                            第五条  费用
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                            5.1 凉山州商业银行的服务价格依据相关法律法规规定的程序制定和调整，并在营业场所和门户网站公示。凉山州商业银行将严格按照相关法律法规制定和调整的服务价格收取费用。凉山州商业银行调整服务价格或变更服务合同的，甲方可以在履行本协议项下应尽义务后终止服务，解除本协议；双方协商一致的，也可以变更相关服务和对应协议内容。凉山州商业银行因增值税等国家税收相关法律法规调整而调整服务价格的，不受本条前述内容约束。<br></br>
                            
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                            
                            甲方欠费的，乙方可直接从甲方在凉山州商业银行各机构开立的账户中划收，依据法律法规和双方约定不得划收的账户除外。扣收的甲方应付款项或采取其他保全措施获得的款项不足以清偿全部债务的，乙方有权决定所清偿的债务及抵充顺序。
                        </b>
                        </p>
                        <p style={sty}>
                        5.2 本协议项下凉山州商业银行向客户收取的符合国家税务征收相关法律法规规定的应税事项的款项中均已包含增值税。增值税税率依据国家法律法规的规定确定。在协议履行期间，
                            <b>
                            
                            如遇国家税务管理法律法规进行调整，凉山州商业银行将相应调整相关的税率等相关内容。
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                            第六条 客户信息保护
                        </b>
                        </p>
                        <p style={sty}>
                        
                            <b>
                            
                            6.1 甲方授权凉山州商业银行可基于业务办理、履行合同及开展风险管理的需要，自本授权签署之日起，收集、传输、加工、保存、查询和使用甲方信息（包括身份信息、财产信息、账户信息、信用信息、交易信息、衍生信息及在与甲方建立业务关系过程中获取、保存的其他信息）。双方业务关系终止后，凉山州商业银行将严格依照法律法规的规定和与甲方的约定，保存和处理甲方信息。
                        </b>
                        </p>
                        <p style={style}>
                        6.2 凉山州商业银行承诺将严格遵守法律法规规定，在收集、使用甲方信息时，遵循合法、正当、必要的原则，并在甲方授权的范围、内容和期限内收集、传输、加工、保存、查询和使用甲方信息。不泄露、篡改、毁损甲方信息，不出售或者非法向他人提供甲方信息，不收集、查询、使用与所提供服务或办理业务无关的甲方信息，不违反法律法规的规定和双方的约定收集、查询、使用甲方信息。
                        </p>
                        <p style={style}>
                        6.3 凉山州商业银行将依法承担客户信息安全保护的法律责任。违反法律法规的规定及与甲方的约定，超出甲方授权范围收集、传输、加工、保存、查询和使用甲方信息的法律责任由凉山州商业银行承担。
                        </p>
                        <p style={sty}>
                            <b>
                            第七条 其他约定
                        </b>
                        </p>
                        <p style={sty}>
                            <b>
                                7.1 因战争、自然灾害等不可抗力原因导致乙方不能履行本协议规定的义务以及由此造成的后果，乙方不承担责任。
                            </b>
                        </p>
                        <p style={style}>
                        7.2 本协议的成立、生效、履行和解释，均适用中华人民共和国法律法规；法律法规无明文规定的，可适用通行的金融惯例。本协议所称法律法规包括法律、行政法规、地方性法规、规章、司法解释及其他具有法律效力的规定。本协议是甲乙双方的其他既有协议和约定的补充而非替代文件，如本协议与其他既有协议和约定有冲突，涉及电子银行业务的，应以本协议为准。
                        </p>
                        <p style={style}>
                        7.3 本协议自甲方在业务凭证上签字、乙方在业务凭证上盖章之日或甲方自助注册手机银行成功之日起生效。乙方相关业务回单及申请表格为本协议的组成部分。若甲方自行在电子银行渠道上增加关联账户，本协议继续有效。
                        </p>
                        <p style={style}>
                        7.4 甲方发现自身未按规定操作，或由于自身其他原因造成电子银行业务指令未执行、未适当执行、延迟执行的，应及时拨打服务热线“0834-96834”或到营业网点通知乙方。乙方应积极调查并告知甲方调查结果。
                        </p>
                        <p style={sty}>
                            <b>
                            7.5 双方在履行本协议的过程中，如发生争议，应协商解决。协商不成的，任何一方均可向乙方住所地人民法院提起诉讼。在协商、诉讼期间，双方对本协议中无争议的条款仍须履行。
                            </b>
                        </p>
                        <p style={sty}>
                            <b>
                            7.6 乙方依据法律法规规定、本协议约定行使抵销权、解除权和扣划相关款项（约定还款账户扣款除外）的，甲方的异议期间为七个工作日，自乙方以书面、口头或者其他形式通知甲方之日起计算。
                            </b>
                        </p>
                        <p style={sty}>
                            <b>
                            7.6 甲方申明
                            </b>
                        </p>
                        <p style={sty}>
                            <b>
                            1、本人已仔细阅读本协议各条款，乙方已依法向我方提示了相关条款（特别是含有黑体字标题或黑体字文字的条款），乙方应我方要求对相关条款的概念、内容及法律效果做了说明，我方已经知晓并理解上述条款。本人已阅读《凉山州商业银行电子银行业务章程》，并同意接收该章程的约束。
                            </b>
                        </p>
                        <p style={sty}>
                            <b>
                            2、我方认可本协议约定的信息披露途径，已清楚知晓我方应注意查询的事项和信息披露方面的法律责任，同意乙方按照本协议约定进行相关通知和披露。
                            </b>
                        </p>
                        <p style={sty}>
                            <b>
                            （如以上声明与事实或甲方真实意愿不符，甲方请勿按下同意键）
                            </b>
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