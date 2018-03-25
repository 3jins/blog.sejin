import {Post} from './models';
import jsontoxml from 'jsontoxml';
import fs from 'fs';

export default () => {
    const rawSitemap = "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">";
    const rawSitemapCloser = "</urlset>";
    const siteBaseUrl = "http://enhanced.kr";
    const urls = [
        {
            url: {
                loc: siteBaseUrl,
                lastmod: new Date().toISOString(),
                priority: 1.00,
            }
        },
        {
            url: {
                loc: siteBaseUrl + "/nav/About",
                lastmod: new Date().toISOString(),
                priority: 9 * 9 * 9 / 1000,
            }
        },
        {
            url: {
                loc: siteBaseUrl + "/nav/Works",
                lastmod: new Date().toISOString(),
                priority: 9 * 9 * 9 / 1000,
            }
        },
        {
            url: {
                loc: siteBaseUrl + "/nav/Blog",
                lastmod: new Date().toISOString(),
                priority: 9 * 9 * 9 / 1000,
            }
        },
    ];
    const postDataBeginsAt = urls.length;

    const convertDataToUrls = (postData) => {
        const numPostData = postData.length;
        for (let i = 0; i < numPostData; i++) {
            if(postData[i].postNo <= 2) {   // Pass data for 'About'
                continue;
            }
            urls[postDataBeginsAt + i] = {
                url: {
                    loc: [siteBaseUrl, "postviewer", postData[i].postNo].join('/'),
                    lastmod: postData[i].dateUpdated,
                    priority: 0.9,
                }
            };
        }
    };

    const saveObjectAsXML = (jsObj) => {
        const xmlData = rawSitemap + jsontoxml(jsObj) + rawSitemapCloser;
        fs.writeFileSync(process.cwd() + '/public/sitemap.xml', xmlData);
    };

    Post.find({}, {postNo: true, dateUpdated: true})
        .then((postData) => {
            convertDataToUrls(postData);
            saveObjectAsXML(urls);
        })
        .then(() => {
            console.log("Created sitemap.xml");
        });
};