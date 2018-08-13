import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';

const cellPrefixCls = 'ryt-cell';

let Cell = (props) => {
  let {
    thumb,
    thumbWidth,
    thumbHeight,
    arrow,
    title,
    subTitle,
    description,
    subDescription,
    onTap,
    className,
    ...others
  } = props;

  if (arrow && typeof  arrow === 'boolean') {
    arrow = 'right';
  }
  const cls = classNames({
    [cellPrefixCls]: true,
    [className]: className
  });

  return (
    <Tappable {...others} className={cls} onTap={onTap} component="label">
      {
        thumb ?
          <div className={`${cellPrefixCls}-thumb`}>
            {
              React.isValidElement(thumb) ?
                thumb : <img src={thumb} alt="img" style={{height:thumbHeight,width:thumbWidth}}/>
            }
          </div> : null
      }
      <div className={`${cellPrefixCls}-content`}>
        {
          title || subTitle ?
            <div className={`${cellPrefixCls}-content-title-area`}>
              <div className={`${cellPrefixCls}-content-title`}>
                {title}
              </div>
              <div className={`${cellPrefixCls}-content-title-sub`}>
                {subTitle}
              </div>
            </div> : null
        }
        {
          description || subDescription ?
            <div className={`${cellPrefixCls}-content-description-area`}>
              <div className={`${cellPrefixCls}-content-description`}>
                {description}
              </div>
              <div className={`${cellPrefixCls}-content-description-sub`}>
                {subDescription}
              </div>
            </div> : null
        }
      </div>
      {
        arrow ?
          <div className={`${cellPrefixCls}-arrow`}>
            <div className={`${cellPrefixCls}-arrow-block ${cellPrefixCls}-arrow-block-${arrow}`}></div>
          </div> : null
      }
    </Tappable>
  );
};

Cell.propTypes = {
  thumb: PropTypes.any,
  thumbWidth: PropTypes.number,
  thumbHeight: PropTypes.number,
  arrow: PropTypes.oneOf(['up', 'down', 'right', 'empty',true, false]),
  title: PropTypes.any,
  subTitle: PropTypes.any,
  description: PropTypes.any,
  subDescription: PropTypes.any,
  onTap: PropTypes.func
};

export default Cell;
