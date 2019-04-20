import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
// import Helmet from 'react-helmet/es/Helmet';
import * as actions from '../../../../actions';
import LoadingView from '../../LoadingView';
import BlogContent from './BlogContent';
import BlogSubtitle from './BlogSubtitle';
import { getMenuHeight } from '../../../../../utils/unitConverter';
import { menuList } from '../../../../constants';
import { getParameterByName } from '../../../../../utils/stringModifier';

import PageView from '../../PageView';
import NotFoundView from '../../NotFoundView';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.contentsStartPosition = null;
    this.tag = getParameterByName('tag');
    this.page = Number(getParameterByName('page'));
  }

  componentDidMount() {
    const {
      belongToMajor,
      belongToMinor,
      handleFetchPosts,
      handleChangeMenu,
    } = this.props;

    const menuIdx = 2;
    handleFetchPosts(
      '/posts',
      belongToMajor,
      !_.isEmpty(belongToMinor) ? belongToMinor : menuList[menuIdx].submenuList[0].title,
      this.tag,
      this.page,
    );
    handleChangeMenu(menuIdx);
  }

  componentWillReceiveProps(nextProps) {
    const { belongToMinor, handleFetchPosts, handleScrollToComponentFinished } = this.props;
    if (belongToMinor !== nextProps.belongToMinor) {
      handleFetchPosts(
        '/posts',
        nextProps.belongToMajor,
        nextProps.belongToMinor,
        this.tag,
        this.page,
      );
    }
    if (nextProps.scroll) {
      switch (nextProps.menuActionType) {
        case 'CHANGE_MENU':
          if (nextProps.scroll) {
            // TODO: It needs deceleration effect.
            (function scrollToTop() {
              if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                window.scrollBy(0, -50);
                setTimeout(scrollToTop, 10);
              }
            }());
          }
          break;
        case 'CHANGE_SUBMENU':
          scrollToComponent(
            this.contentsStartPosition,
            {
              align: 'top',
              duration: 500,
              offset: -getMenuHeight(),
            },
          );
          break;
        default:
          break;
      }
      handleScrollToComponentFinished();
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isLoaded;
  }

  render() {
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
    } = this.props;

    if (!isLoaded) { // loading
      return (
        <div className="content" ref={(section) => { this.contentsStartPosition = section; }}>
          <div className="content-body">
            <LoadingView />
          </div>
        </div>
      );
    }
    if (isLoaded && numPosts === 0) { // no posts
      return (
        <div className="content" ref={(section) => { this.contentsStartPosition = section; }}>
          <div className="content-body">
            <NotFoundView isFail={false} />
          </div>
        </div>
      );
    }
    return (
      <div className="content" ref={(section) => { this.contentsStartPosition = section; }}>
        {/* <Helmet> */}
        {/* <meta property="og:url" content="https://enhanced.kr/nav/Blog"/> */}
        {/* <title>{"Blog :: " + blogTitle}</title> */}
        {/* </Helmet> */}
        <div className="content-body">
          <BlogSubtitle
            belongToMinor={posts[0].belongToMinor}
            tags={tags}
            selectedTag={this.tag}
          />
          <div className="content-view-wrapper">
            {renderContents(posts)}
            <PageView
              page={this.page > 0 ? this.page : 1}
              numPosts={numPosts}
              pageScale={10}
            />
          </div>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  isLoaded: PropTypes.bool,
  belongToMajor: PropTypes.string,
  belongToMinor: PropTypes.string,
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
  menuActionType: PropTypes.string,
  scroll: PropTypes.bool,
  handleFetchPosts: PropTypes.func.isRequired,
  handleChangeMenu: PropTypes.func.isRequired,
  handleScrollToComponentFinished: PropTypes.func.isRequired,
};

Blog.defaultProps = {
  isLoaded: false,
  belongToMajor: '',
  belongToMinor: '',
  posts: [],
  numPosts: 0,
  tags: [],
  menuActionType: '',
  scroll: false,
};

export default connect(
  state => ({
    isLoaded: state.posts.isLoaded,
    posts: state.posts.posts,
    numPosts: state.posts.numPosts,
    tags: state.posts.tags,
    menuActionType: state.menus.menuActionType,
    selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
    scroll: state.menus.scroll,
  }),
  dispatch => ({
    handleFetchPosts: async (url, belongToMajor, belongToMinor, tag, page) => {
      const postPayload = await dispatch(
        actions.fetchPosts(url, belongToMajor, belongToMinor, tag, page),
      ).postPayload;
      const tagPayload = await dispatch(actions.fetchTags('/tags', belongToMinor)).tagPayload;
      const { posts, numPosts } = postPayload;
      dispatch(actions.fetchSuccess({ posts, numPosts, tags: tagPayload }));
    },
    handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
    handleChangeMenu: menuIdx => dispatch(actions.changeMenu(menuIdx)),
  }),
)(Blog);
