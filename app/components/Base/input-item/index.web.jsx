import React, {PropTypes} from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import noop from '../../../util/common/noop';
import './style/index.web';

class Input extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      placeholder: this.props.placeholder,
      isError: false,
      rightExtra: this.props.rightExtra
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('placeholder' in nextProps && this.state.placeholder !== nextProps.placeholder) {
      this.setState({
        placeholder: nextProps.placeholder,
      });
    }
  }


  onInputChange = (e) => {
      let me = this;
      let value = e.target.value;
      switch(me.props.type){
          case 'phone':
              if(!(/^1[3|4|5|7|8|9]\d{9}$/.test(value)) || value.length < 11){
                  me.setState({
                      isError: true,
                      rightExtra: true
                  });
              }else{
                  me.setState({
                      isError: false,
                      rightExtra:false
                  });
              }
              break;
          case 'number':
              let value1 = value.replace(/[^0-9+-Ee.]/g, '');
              let value2 = value1.replace(/\.{2,}/g, '.').replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
              let value3 = value2.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
              if(value3.length > me.props.maxLength){
                  value3 = value3.slice(0, me.props.maxLength);
              }
              e.target.value = value3;
              break;
          case 'bankCard'://银行卡格式化
              let value4 =  value.replace(/[^0-9\s]/g, "");
              if(/\S{5}/.test(value4)){
                  e.target.value = value4.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
              }
              break;
          case 'idcard'://数字加X/x
              let value5 =  value.replace(/[^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x]/g, '');
              e.target.value = value5;
              break;
          case 'name'://字母加汉字
              e.target.value = value.replace(/[^A-Za-z\u4e00-\u9fa5]+/g, '');
              break;
          case 'username'://字母加数字
              e.target.value = value.replace(/[^A-Za-z0-9]+/g, '');
              break;
          default:
            break;
      }
      if(value == ""){
          me.setState({
              isError: false
          });
      }
      me.props.onChange(value);
  }


  clearInput = () => {
    this.setState({
      placeholder: this.props.value,
    });
    this.props.onChange('');
  };

  render() {
    //参数
    const {
      type, value, defaultValue, name, editable, disabled, style, clear, children,
      error, className, extra, labelNumber, maxLength, onBlur, onFocus, onExtraClick, onErrorClick, textAlign, labelTextAlign,
      rightText, rightExtra, ExtraSearchIcon, ExtraCardIcon, ExtraArrowIcon, ExtraClearIcon} = this.props;

    let valueProps = (value !== undefined)?{value}:{defaultValue};
    const {placeholder} = this.state;

    let inputType = 'text';
    let inputPattern = '';
    switch (type) {
      case 'bankCard':
        inputType = 'text';
        break;
      case 'phone':
        inputType = 'tel';
        break;
      case 'number':
        inputType = 'number';
        inputPattern = '^\d+\.?\d{0,2}$';
        break;
      case 'password':
        inputType = 'password';
        break;
      case 'idcard':
        inputType = 'idcard';
        break;
      case 'name':
        inputType = 'name';
        break;
      case 'username':
        inputType = 'username';
        break;
      default:
        break;
    }

    const defaultInputCls = 'ryt-input';

    const cls = classNames({
      'ryt-list-item': true,
      'ryt-input-item': true,
      'ryt-input-error': this.state.isError
    });

    const labelCls = classNames({
      'ryt-input-label': true,
      [`${defaultInputCls}-label-2`]: labelNumber === 2,
      [`${defaultInputCls}-label-3`]: labelNumber === 3,
      [`${defaultInputCls}-label-4`]: labelNumber === 4,
      [`${defaultInputCls}-label-5`]: labelNumber === 5,
      [`${defaultInputCls}-label-6`]: labelNumber === 6,
      [`${defaultInputCls}-label-7`]: labelNumber === 7
    });

    const inputCls = classNames({
        'ryt-input-control': true
    });

    //模板
    return (
      <div className={cls}>
        {children ? (<div className={labelCls} style={{textAlign:labelTextAlign}}>{children}</div>) : null}
        <div className={inputCls}>
          <input
            {...valueProps}
            style={{textAlign}}
            type={inputType}
            maxLength={maxLength}
            name={name}
            placeholder={placeholder}
            onChange={this.onInputChange}
            onBlur={onBlur}
            onFocus={onFocus}
            readOnly={!editable}
            disabled={disabled}
            pattern={inputPattern}
            value={value}
          />
        </div>
        { rightText !== '' ? <div className="ryt-input-text">{rightText}</div> : null }
        { this.state.rightExtra ? <div className="ryt-input-extra">
                            { ExtraSearchIcon ? <i className="ryt-icon ryt-icon-md ryt-icon-svg-search"></i> : null }
                            { ExtraCardIcon ? <i className="ryt-icon ryt-icon-lg mbank-icon-transfer-zhanghu" onClick={onExtraClick}></i> : null }
                            { ExtraArrowIcon ? <div className="ryt-input-arrow ryt-input-arrow-vertical" onClick={onExtraClick}></div> : null }
                            { ExtraClearIcon ? <div className="ryt-input-clear" style={{display: 'block'}}></div> : null }
                            { this.state.isError ? <div className="ryt-input-error-extra" onClick={onErrorClick}></div> : null }
                       </div> : null }
      </div>
    );
  }

  //生产版本可以注释掉,用于优化大小
  static propTypes = {
    type: PropTypes.oneOf(['text', 'bankCard', 'phone', 'password', 'number', "idcard", "name", "username"]),
    labelNumber: PropTypes.oneOf([2, 3, 4, 5, 6, 7]),
    textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  };

  static defaultProps = {
    prefixCls: 'ryt-input',
    cellPrefixCls: 'ryt-cell',
    type: 'text',
    name: '',
    defaultValue: '',
    editable: true,
    disabled: false,
    placeholder: '',
    clear: false,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    extra: '',
    onExtraClick: noop,
    error: false,
    onErrorClick: noop,
    labelNumber: 4,
    labelTextAlign: 'left',
    textAlign: 'left',
    rightText: '',
    rightExtra: false,
    ExtraSearchIcon: false,
    ExtraArrowIcon: false,
    ExtraClearIcon: false
  };
}

Input = PureRenderHoc(Input);


export default Input;
