const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const decapitalizeFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

const camelCaseToHyphen = (string) => {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&"); // 'g' means global, '$&' means the whole matched string. Add '\\' to all '[' and ']'s. ('[' -> '\\[', ']' -> '\\]')
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const removeQueryParameters = (url) => {
    if (!url) url = window.location.href;
    const idx = url.lastIndexOf("?");
    return url.substring(0, idx);
};

const replaceAt = (str, index, replacement) => {
    return [str.substring(0, index), replacement, str.substring(index + 1)].join('');
};

const replaceAll = (str, prev, after) => {
    console.log(str.length);
    let lastIndex = 0;
    while(true) {
        lastIndex = str.indexOf(prev, lastIndex);
        if(lastIndex < 0) break;
        str = replaceAt(str, lastIndex, after);
        lastIndex += after.length + 1;
    }
    return str;
};

export {
    capitalizeFirstLetter,
    decapitalizeFirstLetter,
    camelCaseToHyphen,
    getParameterByName,
    removeQueryParameters,
    replaceAll,
};
