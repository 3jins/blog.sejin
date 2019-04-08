import fs from 'fs';
import path from 'path';
import jsontoxml from 'jsontoxml';
import configuration from '../Configuration';
import * as PostDao from '../mongoDB/dao/PostDao';

const makeUrlListFromData = (postList) => {
  const siteBaseUrl = 'https://enhanced.kr';
  const baseUrlObjList = [
    {
      url: {
        loc: siteBaseUrl,
        lastmod: new Date().toISOString(),
        priority: 1.00,
      },
    },
    {
      url: {
        loc: `${siteBaseUrl}/nav/About`,
        lastmod: new Date().toISOString(),
        priority: 9 * 9 * 9 / 1000,
      },
    },
    {
      url: {
        loc: `${siteBaseUrl}/nav/Works`,
        lastmod: new Date().toISOString(),
        priority: 9 * 9 * 9 / 1000,
      },
    },
    {
      url: {
        loc: `${siteBaseUrl}/nav/Blog`,
        lastmod: new Date().toISOString(),
        priority: 9 * 9 * 9 / 1000,
      },
    },
  ];
  const postUrlObjList = postList
    .filter(post => post.postNo >= 3) // Pass data for 'About'
    .map(post => ({
      url: {
        loc: [siteBaseUrl, 'postviewer', post.postNo].join('/'),
        lastmod: post.dateUpdated,
        priority: 0.9,
      },
    }));

  return baseUrlObjList.concat(postUrlObjList);
};

const buildSitemapContent = (rawSitemapOpener, urlList, rawSitemapCloser) => (
  rawSitemapOpener + jsontoxml(urlList) + rawSitemapCloser
);

const saveObjectAsXML = (sitemapPath, sitemapFileName, sitemapContent) => fs.writeFile(
  path.resolve(sitemapPath, sitemapFileName), sitemapContent, (err) => {
    if (err) throw err;
    console.log(`[+] Created ${sitemapFileName}`);
  },
);

export default () => PostDao.findAllPosts().then((postList) => {
  const rawSitemapOpener = '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
  const urlList = makeUrlListFromData(postList);
  const rawSitemapCloser = '</urlset>';

  const { pathInfo } = configuration;
  const sitemapPath = pathInfo.public;
  const sitemapFileName = 'sitemap.xml';
  const sitemapContent = buildSitemapContent(rawSitemapOpener, urlList, rawSitemapCloser);

  return saveObjectAsXML(sitemapPath, sitemapFileName, sitemapContent);
});
