import React from 'react';
import { connect } from 'react-redux';
import { capitalizeFirstLetter, removeQueryParameters } from '../../../../../utils/stringModifier';
import LoadingPreview from '../../LoadingView';

const BlogSubtitle = (props) => {
  const renderTags = (tags, selectedTag) => {
    if (!tags || tags.length === 0) return <LoadingPreview isTable={false} />;
    return tags.map(tag => (
      <div className="tag-div">
        <a href={`?tag=${tag.tagName.replace(/&/g, '%26').replace(/\+/g, '%2B')}`}>
          <h5
            key={tag.tagName}
            className={`slur ${selectedTag === tag.tagName ? 'selected' : 'unselected'}`}
            title={tag.tagName}
          >
            #{tag.tagName}
          </h5>
          <h5 className="count">
            {`(${tag.postList.length})`}
          </h5>
        </a>
      </div>
    ));
  };

  const {
    belongToMinor,
    tags,
    selectedTag,
    isSubnavSticky,
  } = props;
  return (
    <div className={`subtitle ${isSubnavSticky ? 'sticky' : 'unsticky'}`}>
      <h3 className="slur">
        <a href={removeQueryParameters()}>
          {capitalizeFirstLetter(belongToMinor)}
        </a>
      </h3>
      {renderTags(tags, selectedTag)}
    </div>
  );
};

export default connect(
  state => ({
    isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
  }),
  () => ({}),
)(BlogSubtitle);
