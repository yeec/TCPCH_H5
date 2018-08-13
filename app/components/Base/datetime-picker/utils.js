/**
 * Created by lichuan on 16/10/25.
 */
function getFormatter(type){
  let formatter;
  if (type === 'time') {
    formatter = ('HH:mm');
  } else if (type === 'datetime') {
    formatter = ('YYYY-MM-DD HH:mm');
  } else {
    formatter = ('YYYY-MM-DD');
  }
  return formatter;
}

export function formatFn(props, value){
  const {format} = props;
  const type = typeof format;
  if (type === 'string') {
    return value.format(type);
  }
  if (type === 'function') {
    return format(value);
  }
  return value.format(getFormatter(props.mode));
}
