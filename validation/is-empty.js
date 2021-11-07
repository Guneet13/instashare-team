// module.exports = function isEmpty(val){
//     return (typeof val === 'object' && Object.keys(val).length === 0) ||
//     (typeof(val) === 'string' && val.trim().length === 0) ||
//     val === undefined ||
//     val === null;

// }
module.exports = isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);
