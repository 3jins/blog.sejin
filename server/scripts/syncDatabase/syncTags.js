import _ from 'lodash';
import * as Dao from '../../mongoDB/dao';
import refineFileInfo from './refineFileInfo';

export default (fileList) => {
  const filesByTag = fileList
    .reduce((filesByTag, fileInfo) => {
      const { fileName, belongToMinor } = fileInfo;
      const { title, tags } = refineFileInfo(fileName);
      tags.forEach((tag) => {
        if (tag in filesByTag) {
          filesByTag[tag].postList.push(title);
          filesByTag[tag].belongToMinorList.push(belongToMinor);
        } else {
          filesByTag[tag] = { postList: [title], belongToMinorList: [belongToMinor] };
        }
      });
      return filesByTag;
    }, {});
  return _.map(filesByTag, (tag, tagName) => Dao.TagDao.upsertTag({
    tagName,
    postList: tag.postList,
    belongToMinorList: tag.belongToMinorList,
  }));
};
