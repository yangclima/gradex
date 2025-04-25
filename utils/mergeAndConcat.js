export default function mergeAndConcat(obj1, obj2) {
  const result = { ...obj1 };

  for (const key in obj2) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      result[key] = [...val1, ...val2];
    } else if (Array.isArray(val1)) {
      result[key] = [...val1, val2];
    } else if (Array.isArray(val2)) {
      result[key] = val1 !== undefined ? [val1, ...val2] : [...val2];
    } else if (val1 !== undefined) {
      result[key] = [val1, val2];
    } else {
      result[key] = val2;
    }
  }

  return result;
}
