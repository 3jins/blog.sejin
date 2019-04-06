import peelExtension from '../../../utils/peelExtension';
import extractInfo from './extractInfo';

export default (fileName) => {
  const nameWithoutExt = peelExtension(fileName);
  const { rest: nameWithoutTags, infoList: tags } = extractInfo(nameWithoutExt, '#');
  const { rest: nameWithoutSeries, infoList: [series] } = extractInfo(nameWithoutTags, '$$');
  const { rest: title, infoList: [category] } = extractInfo(nameWithoutSeries, '@@');

  return {
    title, category, series, tags,
  };
};
