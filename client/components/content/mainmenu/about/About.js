import React from 'react';
import PropTypes from 'prop-types';
import withMainMenuLifeCycle from '../withMainMenuLifeCycle';
import LoadingView from '../../LoadingView';
import AboutContent from './AboutContent';

const contentPositions = [];

const About = (props) => {
  const renderContents = posts => posts.map((post, idx) => (
    <div
      className="content-body"
      key={post.title}
      ref={(section) => {
        contentPositions[idx] = section;
      }}
    >
      <div className="content-view-wrapper">
        <AboutContent
          content={post.content}
          belongToMajor={post.belongToMajor}
          belongToMinor={post.belongToMinor}
        />
      </div>
    </div>
  ));

  const {
    isLoaded,
    posts,
    numPosts,
  } = props;

  if (!isLoaded) { // loading
    return (
      <div className="content-body">
        <div className="content-view-wrapper">
          <LoadingView />
        </div>
      </div>
    );
  }
  if (isLoaded && numPosts === 0) { // no posts
    return (
      <div className="content-body">
        <div className="content-view-wrapper">
          <p>{'It seems database hasn\'t constructed yet. :('}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="content-view-wrapper">
      {renderContents(posts)}
    </div>
  );
};

About.propTypes = {
  isLoaded: PropTypes.bool,
  posts: PropTypes.arrayOf({
    postNo: PropTypes.number,
    title: PropTypes.string,
    dateCreated: PropTypes.instanceOf(Date),
    dateUpdated: PropTypes.instanceOf(Date),
    content: PropTypes.string,
    tags: PropTypes.array,
    belongToMajor: PropTypes.string,
    belongToMinor: PropTypes.string,
  }),
  numPosts: PropTypes.number,
};
About.defaultProps = {
  isLoaded: false,
  posts: [],
  numPosts: 0,
};

const args = { contentPositions };
export default withMainMenuLifeCycle(About, false, true, 0, args);
