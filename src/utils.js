export function getUniqueStrings(array) {
  const uniqueArray = [];
  for (const item of array) {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  }
  return uniqueArray;
}

export function joinArraysOfObject(object, key){
  const array = [];
  for (const item of object){
    array.push(...item[key]);
  }
  return array
}