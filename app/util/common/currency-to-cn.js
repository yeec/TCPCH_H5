const currency2CN = function (currency, formatMessage) {
  if (currency === 'ALL') {
    return formatMessage({id: 'ALL'}) + formatMessage({id: 'public.currency'})
  }
  return formatMessage({id: currency});
};

export default currency2CN;
