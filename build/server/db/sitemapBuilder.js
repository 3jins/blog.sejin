'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('./models');

var _jsontoxml = require('jsontoxml');

var _jsontoxml2 = _interopRequireDefault(_jsontoxml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var rawSitemap = "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">";
    var rawSitemapCloser = "</urlset>";
    var siteBaseUrl = "http://enhanced.kr";
    var urls = [{
        url: {
            loc: siteBaseUrl,
            lastmod: new Date().toISOString(),
            priority: 1.00
        }
    }, {
        url: {
            loc: siteBaseUrl + "/nav/About",
            lastmod: new Date().toISOString(),
            priority: 9 * 9 * 9 / 1000
        }
    }, {
        url: {
            loc: siteBaseUrl + "/nav/Works",
            lastmod: new Date().toISOString(),
            priority: 9 * 9 * 9 / 1000
        }
    }, {
        url: {
            loc: siteBaseUrl + "/nav/Blog",
            lastmod: new Date().toISOString(),
            priority: 9 * 9 * 9 / 1000
        }
    }];
    var postDataBeginsAt = urls.length;

    var convertDataToUrls = function convertDataToUrls(postData) {
        var numPostData = postData.length;
        for (var i = 0; i < numPostData; i++) {
            if (postData[i].postNo <= 2) {
                // Pass data for 'About'
                continue;
            }
            urls[postDataBeginsAt + i] = {
                url: {
                    loc: [siteBaseUrl, "postviewer", postData[i].postNo].join('/'),
                    lastmod: postData[i].dateUpdated,
                    priority: 0.9
                }
            };
        }
    };

    var saveObjectAsXML = function saveObjectAsXML(jsObj) {
        var xmlData = rawSitemap + (0, _jsontoxml2.default)(jsObj) + rawSitemapCloser;
        _fs2.default.writeFileSync(process.cwd() + '/public/sitemap.xml', xmlData);
    };

    _models.Post.find({}, { postNo: true, dateUpdated: true }).then(function (postData) {
        convertDataToUrls(postData);
        saveObjectAsXML(urls);
    }).then(function () {
        console.log("Created sitemap.xml");
    });
};