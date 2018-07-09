/* I think Facebook APIs are not good choice for your app. */
const https2http = (url) => {
    if(url.length > 4 && url[4] === 's') {
        url = ['http', url.slice(5, url.length)].join('');
    }
};

export {https2http}