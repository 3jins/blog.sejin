export default (rawString, separator) => {
  const extractionResult = { rest: rawString, infoList: [] };
  const lenSeparator = separator.length;
  let idx = rawString.lastIndexOf(separator);
  let lastIdx = rawString.length;
  while (idx >= 0) {
    extractionResult.rest = rawString.substring(0, idx);
    extractionResult.infoList.unshift(rawString.substring(idx + lenSeparator, lastIdx));
    lastIdx = idx;
    idx = extractionResult.rest.lastIndexOf(separator);
  }
  return extractionResult;
};
