 export function forEachValue(obj, fn) {
     /**
      * 循环obj的key,以obj的key和对应的value为参数执行fn函数
      */
     Object.keys(obj).forEach(key => {
         fn(key, obj[key]);
     });
 }

 export function isObject(obj) {
     /**
      * 判断是否是对象
      */
     return typeof obj === 'object' && obj !== null;
 }