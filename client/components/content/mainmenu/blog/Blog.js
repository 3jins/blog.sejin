import React from 'react';
import PropTypes from 'prop-types';
import withMainMenuLifeCycle from '../withMainMenuLifeCycle';
import BlogContent from './BlogContent';
import BlogSubtitle from './BlogSubtitle';
import PageView from '../../PageView';
import LoadingView from '../../LoadingView';
import NotFoundView from '../../NotFoundView';
import { getParameterByName } from '../../../../../utils/stringModifier';

const tag = getParameterByName('tag');
const page = Number(getParameterByName('page'));

const Blog = (props) => {
  const renderContents = posts => posts.map(post => (
    <BlogContent
      key={post.postNo}
      postNo={post.postNo}
      belongToMajor={post.belongToMajor}
      title={post.title}
      content={post.content}
      dateCreated={post.dateCreated}
      tags={post.tags}
    />
  ));

  const {
    isLoaded,
    posts,
    numPosts,
    tags,
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
          <NotFoundView isFail={false} />
        </div>
      </div>
    );
  }
  return (
    <div className="content-body">
      <BlogSubtitle
        belongToMinor={posts[0].belongToMinor}
        tags={tags}
        selectedTag={tag}
      />
      <div className="content-view-wrapper">
        {renderContents(posts)}
        <PageView
          page={page > 0 ? page : 1}
          numPosts={numPosts}
          pageScale={10}
        />
      </div>
    </div>
  );
};

Blog.propTypes = {
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
  tags: PropTypes.arrayOf({
    tagName: PropTypes.string,
    belongToMinor: PropTypes.string,
    postList: PropTypes.array,
  }),
};
Blog.defaultProps = {
  isLoaded: false,
  posts: [],
  numPosts: 0,
  tags: [],
};

const args = { tag, page };
export default withMainMenuLifeCycle(Blog, true, false, 2, args);
