import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet/es/Helmet';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import LoadingView from '../LoadingView';
import ContentViewContent from './ContentViewContent';
import ContentViewSubtitle from './ContentViewSubtitle';
import { blogTitle, menuList } from '../../../constants';
import NotFoundView from '../NotFoundView';

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.postNo = props.postNo;
    props.handleFetchPost('/post', props.postNo);
  }

  componentWillReceiveProps(nextProps) {
    const { handleChangeMenu, handleChangeMenuFinished } = this.props;
    if (!_.isEmpty(nextProps.post)) handleChangeMenu(nextProps.post, menuList);
    if (nextProps.menuActionType === 'CHANGE_MENU') handleChangeMenuFinished();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isLoaded;
  }

  render() {
    const {
      postNo,
      isLoaded,
      posts,
      tags,
      menuActionType,
    } = this.props;

    if (_.isEmpty(posts) && isLoaded) return <NotFoundView isFail={true} />; // error
    if (_.isEmpty(posts)) return <LoadingView />; // loading

    const post = posts[0];
    const { belongToMajor, belongToMinor, tags: currentTags } = post;

    // this.props.handleChangeMenu(postPayload.post[0], menuList);
    // if (menuActionType === 'CHANGE_MENU') this.props.handleChangeMenuFinished();

    return (
      <div className="content">
        {/* <Helmet> */}
        {/* <meta property="og:url" content={`https://enhanced.kr/contentviewer/${postNo}`} /> */}
        {/* <title> */}
        {/* {!post && `${post[0].title} :: ${blogTitle}`} */}
        {/* </title> */}
        {/* </Helmet> */}
        <div className="content-body">
          {belongToMajor !== 'Works' && (
            <ContentViewSubtitle
              tags={tags}
              currentTags={currentTags}
              belongToMinor={belongToMinor}
            />
          )}
          <div className="content-view-wrapper">
            <ContentViewContent
              post={post}
              belongToMajor={belongToMajor}
            />
          </div>
        </div>
      </div>
    );
  }
}

ContentView.propTypes = {
  postNo: PropTypes.number,
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
  tags: PropTypes.arrayOf({
    tagName: PropTypes.string,
    belongToMinor: PropTypes.string,
    postList: PropTypes.array,
  }),
  menuActionType: PropTypes.string,
  isLoaded: PropTypes.bool,
};

ContentView.defaultProps = {
  postNo: -1,
  posts: [],
  tags: [],
  menuActionType: 'CHANGE_MENU_FINISHED',
  isLoaded: true,
};

export default connect(
  state => ({
    posts: state.posts.posts,
    tags: state.posts.tags,
    menuActionType: state.menus.menuActionType,
    isLoaded: state.posts.isLoaded,
  }),
  dispatch => ({
    handleFetchPost: async (url, postNo) => {
      const postPayload = await dispatch(actions.fetchPost(url, postNo)).postPayload;
      const { posts } = postPayload;
      if (_.isEmpty(posts)) return dispatch(actions.fetchSuccess({ post: {} }));
      const tagPayload = await dispatch(actions.fetchTags('/tags', posts[0].belongToMinor)).tagPayload;
      return dispatch(actions.fetchSuccess({ posts, tags: tagPayload }));
    },
    handleChangeMenu: (post, menuList) => {
      const { belongToMajor } = post;
      menuList.forEach((menu, idx) => {
        if (menu.title === belongToMajor) dispatch(actions.changeMenu(idx));
      });
    },
    handleChangeMenuFinished: () => dispatch(actions.changeMenuFinished()),
  }),
)(ContentView);
