import React from 'react';
import notification from 'rc-notification';
import './style/index.web';
import Icon from './../../mbank/mbank-public-icon/index.web';



const prefixCls = 'ryt-toast';
let instance = null;
const DEFAULT_DURATION = 3;


const getNewInstance = () => {
  if (instance !== null) {
    instance.destroy();
    instance = null;
  }
  instance = notification.newInstance({
    prefixCls,
    style: {
      top: 0,
      left: 0
    },
    transitionName: 'ryt-am-fade'
  });
  return instance;
};

const iconType = {
  loading: 'loading',
  success: 'success',
  error: 'error'
};

const notice = (content, type, duration = DEFAULT_DURATION, callback) => {
  if (typeof duration === 'function') {
    callback = duration;
    duration = DEFAULT_DURATION;
  }

  instance = getNewInstance();
  instance.notice({
    content: (
      <div className={`${prefixCls}-wrap`}>
        {!!iconType[type] && <Icon type={iconType[type]}/>}
        <div>
          {content}
        </div>
      </div>
    ),
    duration,
    onClose: () => {
      instance.destroy();
      instance = null;
      callback && callback();
    }
  });
};

export default {
  loading: (content, duration = null, callback) => {
    if (typeof duration === 'function') {
      callback = duration;
      duration = null;
    }
    notice(content,'loading', duration, callback);
  },
  success: (content, duration, callback) => {
    notice(content,'success', duration, callback);
  },
  error: (content, duration, callback) => {
    notice(content,'error', duration, callback);
  },
  info: (content, duration, callback) => {
    notice(content,'info', duration, callback);
  },
  hide: () => {
    !!instance && instance.destroy();
    instance = null;
  }
};