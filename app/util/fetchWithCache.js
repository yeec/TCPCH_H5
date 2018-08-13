import $fetch from './fetch';
import {session} from './store';


const fetchWithCache = function (namespace,key) {
  const store = session.namespace(namespace);
  return function (transId, data, cb) {
    let res  = store.get(key);
    if (res) {
      cb(res);
    } else {
      $fetch(transId, data, function (res) {
        store.set(key,res);
        cb(res)
      })
    }
  }
}

export default fetchWithCache;