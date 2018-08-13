/**
 * component: Input
 * description: Input
 * author: Lichuan
 */
import React, {PropTypes} from 'react';
import classNames from 'classnames';
import PureRenderHoc from '../../../util/hoc/index';
import $native from '../../../native/native.js';
import noop from '../../../util/common/noop';

let defaultPrefixCls = 'ryt-input';
let defaultCellPrefixCls = 'ryt-cell';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: this.props.placeholder,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('placeholder' in nextProps && this.state.placeholder !== nextProps.placeholder) {
            this.setState({
                placeholder: nextProps.placeholder,
            });
        }
    }


    //内部方法
    // onInputChange = (e) => {
    //   let value = e.target.value;
    //   const { onChange, type, isAmount } = this.props;
    //   switch (type) {
    //     case 'text':
    //       break;
    //     case 'bankCard':
    //       value = value.replace(/\D/g, '');
    //       value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
    //       break;
    //     case 'phone':
    //       value = value.replace(/\D/g, '').substring(0, 11);
    //       const valueLen = value.length;
    //       if (valueLen > 3 && valueLen < 8) {
    //         value = `${value.substr(0, 3)} ${value.substr(3)}`;
    //       } else if (valueLen >= 8) {
    //         value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
    //       }
    //       break;
    //     case 'number':
    //       if (isAmount==true)
    //       {
    //         if(new RegExp(/^\d+\.?\d{0,2}$/g).test(value)||value==''){
    //         }else {
    //           value = this.props.value||'';
    //         }
    //         e.target.value=value;
    //       }
    //       break;
    //     case 'password':
    //       break;
    //     default:
    //       break;
    //   }
    //   onChange(value);
    // };


    onFocus = (e) => {
        e.preventDefault();
        this.props.onFocus();
    }

    onClick = (e) => {
        const {maxLength} = this.props;
        $native.callClientForComm('showKeyBoard', {
            type: 'num',
            maxLength: maxLength,
            success: (res) => {
                this.props.onChange(res);
            },
            cancel: () => {

            }
        })
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
            error, className, extra, labelNumber, maxLength, onBlur, onFocus, onExtraClick, onErrorClick, textAlign, labelTextAlign
        } = this.props;

        let valueProps = (value !== undefined) ? {value} : {defaultValue};
        const {placeholder} = this.state;

        let inputType = 'text';
        let inputPattern = '';
        switch (type) {
            case 'bankCard':
                inputType = 'tel';
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
            default:
                break;
        }

        //样式
        const prefixCls = this.props.prefixCls || defaultPrefixCls;
        const cellPrefixCls = this.props.cellPrefixCls || defaultCellPrefixCls;

        const inputCls = classNames({
            [`${cellPrefixCls}`]: true,
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-error`]: error,
            [`${prefixCls}-focus`]: focus,
            [className]: className,
        });

        const labelCls = classNames({
            [`${prefixCls}-label`]: true,
            [`${prefixCls}-label-2`]: labelNumber === 2,
            [`${prefixCls}-label-3`]: labelNumber === 3,
            [`${prefixCls}-label-4`]: labelNumber === 4,
            [`${prefixCls}-label-5`]: labelNumber === 5,
            [`${prefixCls}-label-6`]: labelNumber === 6,
            [`${prefixCls}-label-7`]: labelNumber === 7,
        });

        //模板
        return (
            <div className={inputCls} style={style}>
                {children ? (<div className={labelCls} style={{textAlign: labelTextAlign}}>{children}</div>) : null}
                <div className={`${prefixCls}-control`}>
                    <input
                        {...valueProps}
                        style={{textAlign}}
                        type={inputType}
                        maxLength={maxLength}
                        name={name}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onFocus={this.onFocus}
                        onClick={this.onClick}
                        readOnly={true}
                        disabled={disabled}
                        pattern={inputPattern}
                        value={value}
                    />
                </div>
                {clear && editable && !disabled && (value && value.toString().length > 0) ?
                    <div className={`${prefixCls}-clear`} onClick={this.clearInput}/>
                    : null}
                {error ? (<div className={`${prefixCls}-error-extra`} onClick={onErrorClick}/>) : null}
                {extra !== '' ? <div className={`${prefixCls}-extra`} onClick={onExtraClick}>{extra}</div> : null}
            </div>
        );
    }

    //生产版本可以注释掉,用于优化大小
    static propTypes = {
        type: PropTypes.oneOf(['text', 'bankCard', 'phone', 'password', 'number']),
        labelNumber: PropTypes.oneOf([2, 3, 4, 5, 6, 7]),
        textAlign: PropTypes.oneOf(['left', 'center', 'right']),
    };

    static defaultProps = {
        prefixCls: 'ryt-input',
        cellPrefixCls: 'ryt-cell',
        type: 'amount',
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
    };
}


export default PureRenderHoc(Input);
