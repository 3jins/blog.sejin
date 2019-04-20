import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView';
import { capitalizeFirstLetter } from '../../../../utils/stringModifier';

const ContentViewSubtitle = (props) => {
  const renderTags = (tags, currentTags) => {
    if (!tags || tags.length === 0) {
      return <LoadingView isTable={false} />;
    }
    return tags.map(tag => (
      <div className="tag-div">
        <a href={`/nav/Blog?tag=${tag.tagName.replace(/&/g, '%26').replace(/\+/g, '%2B')}`}>
          <h5
            key={tag.tagName}
            className={['slur', tag.tagName in currentTags ? 'selected' : 'unselected'].join(' ')}
            title={tag.tagName}
          >
            #{tag.tagName}
          </h5>
          <h5 className={['count', tag.tagName in currentTags ? 'selected' : 'unselected'].join(' ')}>
            {`(${tag.postList.length})`}
          </h5>
        </a>
      </div>
    ));
  };

  const {
    tags,
    currentTags,
    belongToMinor,
    isSubnavSticky,
  } = props;

  return (
    <div className={['subtitle', 'post-viewer', isSubnavSticky ? 'sticky' : 'unsticky'].join(' ')}>
      <h3 className="slur">
        <a href="/nav/Blog">
          {capitalizeFirstLetter(belongToMinor)}
        </a>
      </h3>
      {renderTags(tags, currentTags, belongToMinor)}
    </div>
  );
};

ContentViewSubtitle.propTypes = {
  tags: PropTypes.arrayOf({
    belongToMinorList: PropTypes.array,
    postList: PropTypes.array,
    tagName: PropTypes.string,
  }),
  currentTags: PropTypes.arrayOf(PropTypes.string),
  belongToMinor: PropTypes.string,
  isSubnavSticky: PropTypes.bool,
};

ContentViewSubtitle.defaultProps = {
  tags: [],
  currentTags: [],
  belongToMinor: '',
  isSubnavSticky: false,
};

export default connect(
  state => ({
    isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
  }),
)(ContentViewSubtitle);
