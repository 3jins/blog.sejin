import React from 'react';
import PropTypes from 'prop-types';
import { highlightCode, mdConverter } from '../../../../utils/mdModifier';
import { decapitalizeFirstLetter } from '../../../../utils/stringModifier';

const ContentViewContent = (props) => {
  const renderTags = tags => tags.map(tag => <span>{` #${tag}`}</span>);
  const {
    post,
    belongToMajor,
  } = props;
  const {
    title,
    content,
    tags,
    dateCreated,
  } = post;
  const convertedContent = mdConverter(content);
  const dateRaw = new Date(dateCreated);
  const dateInFormat = `${dateRaw.getFullYear()}년 ${dateRaw.getMonth() + 1}월 ${dateRaw.getDate()}일`;

  return (
    <div className={['content-view', decapitalizeFirstLetter(belongToMajor)].join(' ')}>
      <div ref={element => highlightCode(element)}>
        <div className="post-title-wrapper">
          <h1>{title}</h1>
          <div className="post-meta-info">
            <i className="far fa-calendar-alt"><span>{` ${dateInFormat}`}</span></i>
            <i className="fas fa-tags">{renderTags(tags)}</i>
          </div>
        </div>
        {convertedContent}
      </div>
    </div>
  );
};

ContentViewContent.propTypes = {
  post: PropTypes.objectOf({
    postNo: PropTypes.number,
    title: PropTypes.string,
    dateCreated: PropTypes.instanceOf(Date),
    dateUpdated: PropTypes.instanceOf(Date),
    content: PropTypes.string,
    tags: PropTypes.array,
    belongToMajor: PropTypes.string,
    belongToMinor: PropTypes.string,
  }),
  belongToMajor: PropTypes.string,
};

ContentViewContent.defaultProps = {
  post: {},
  belongToMajor: '',
};

export default ContentViewContent;
