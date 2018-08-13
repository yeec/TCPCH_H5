import Modal from './modal.web';
import Alert from './alert.web';
import TransferType from './transfertype.web';
import AccountType from './accounttype.web';
import SmsApprove from './smsapprove.web';
import transferPaymentAccount from './transferPaymentAccount.web';
import './style/index.web';

Modal.alert = Alert;
Modal.transferPaymentAccount = transferPaymentAccount;
Modal.transfertype = TransferType;
Modal.accounttype = AccountType;//交易中无使用，没用修改统一关闭
Modal.smsapprove = SmsApprove;//交易中无使用，没用修改统一关闭

export default Modal;