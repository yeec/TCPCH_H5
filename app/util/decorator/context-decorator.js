import React from 'react';

const ContextDecorator = function(Comp) {
  const contextWrapper = (props, context) => {
    return (
      <Comp
        {...props}
        intl={context.intl}
        router={context.router}
      />
    )
  };
  contextWrapper.contextTypes = {
    intl: React.PropTypes.object,
    locale: React.PropTypes.string,
    router: React.PropTypes.any,
  }

  return contextWrapper;
}

export default ContextDecorator;
