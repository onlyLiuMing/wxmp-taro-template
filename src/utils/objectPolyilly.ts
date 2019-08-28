// 兼容object.value方法
function objectValues(objectVal = {}) {
  if (typeof objectVal != 'object' || Array.isArray(objectVal)) {
    console.error('value is not object');
    return;
  }
  let arr_values:any[] = [];
  for (var key in objectVal) {
    arr_values.push(objectVal[key]);
  }
  return arr_values;
}

// 兼容object.entries方法
function objectEntries(objectVal:{[x:string]:any}){
  if (typeof objectVal != 'object' || Array.isArray(objectVal)) {
    console.error('value is not object');
    return;
  } 
  let arrayEntries:any[] = [];
  for(var key in objectVal){
    arrayEntries.push([key,objectVal[key]]);
  }
  return arrayEntries;
}

// 初始化object方法
(function initObjectPolyilly(){
  console.info('初始化object-polyill');
  Object.entries = Object.entries || objectEntries;
  Object.values = Object.values || objectValues;
})()

// export
export default {
  objectValues,
  objectEntries,
}