import React from 'react';
import PropTypes from 'prop-types';
import withMainMenuLifeCycle from '../withMainMenuLifeCycle';
import LoadingView from '../../LoadingView';
import WorksContent from './WorksContent';
import PageView from '../../PageView';
import NotFoundView from '../../NotFoundView';
import { getParameterByName } from '../../../../../utils/stringModifier';

const tag = getParameterByName('tag');
const page = Number(getParameterByName('page'));

const Works = (props) => {
  const renderContents = posts => posts.map(post => (
    <WorksContent
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

Works.propTypes = {
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
Works.defaultProps = {
  isLoaded: false,
  posts: [],
  numPosts: 0,
  pageString: '0',
};

const args = { tag, page };
export default withMainMenuLifeCycle(Works, false, false, 1, args);
