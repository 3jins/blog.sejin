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
import { isEmpty } from '../../../../../utils/nullChecker';
import PageView from '../../PageView';
import NotFoundView from '../../NotFoundView';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.contentsStartPosition = null;
    this.menuList = menuList;
    this.menuIdx = 2;
    this.tag = getParameterByName('tag');
    this.page = Number(getParameterByName('page'));
    props.handleFetchPosts(
      '/posts',
      props.belongToMajor,
      props.belongToMinor ? props.belongToMinor : this.menuList[this.menuIdx].submenuList[0].title,
      this.tag,
      this.page,
    );
    props.handleChangeMenu(this.menuIdx);
  }

  componentWillReceiveProps(nextProps) {
    // this.page = getParameterByName('page') === null ? 1 : getParameterByName('page');
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
    return !isEmpty(nextProps.postPayload)
      || !isEmpty(nextProps.tagPayload);
  }

  render() {
    const renderContents = postPayload => postPayload.posts.map(post => (
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

    const { isLoaded, postPayload, tagPayload } = this.props;
    return (
      <div className="content" ref={(section) => { this.contentsStartPosition = section; }}>
        {/* <Helmet> */}
        {/* <meta property="og:url" content="https://enhanced.kr/nav/Blog"/> */}
        {/* <title>{"Blog :: " + blogTitle}</title> */}
        {/* </Helmet> */}
        <div className="content-body">
          {isLoaded && _.isEmpty(postPayload.posts) && (
            <BlogSubtitle
              belongToMinor={postPayload.posts[0].belongToMinor}
              tagPayload={tagPayload}
              selectedTag={this.tag}
            />
          )}
          <div className="content-view-wrapper">
            {!isLoaded && ( // loading
              <LoadingView />
            )}
            {isLoaded && isEmpty(postPayload.posts) && ( // not found
              <NotFoundView isFail={false} />
            )}
            {isLoaded && !isEmpty(postPayload.posts) && ( // render
              renderContents(postPayload)
            )}
            {isLoaded && !isEmpty(postPayload.posts) && (
              <PageView
                page={this.page > 0 ? this.page : 1}
                numPosts={postPayload.numPosts}
                pageScale={10}
              />
            )}
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
  postPayload: PropTypes.objectOf({
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
  }),
  tagPayload: PropTypes.arrayOf({
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
  postPayload: {
    posts: [],
    numPosts: 0,
  },
  tagPayload: {},
  menuActionType: 'CHANGE_MENU_FINISHED',
  scroll: false,
};

export default connect(
  state => ({
    postPayload: state.posts.postPayload,
    isLoaded: state.posts.isLoaded,
    tagPayload: state.posts.tagPayload,
    menuActionType: state.menus.menuActionType,
    // selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
    scroll: state.menus.scroll,
  }),
  dispatch => ({
    handleFetchPosts: async (url, belongToMajor, belongToMinor, tag, page) => {
      const postPayload = await dispatch(
        actions.fetchPosts(url, belongToMajor, belongToMinor, tag, page),
      ).postPayload;
      const tagPayload = await dispatch(actions.fetchTags('/tags', belongToMinor)).tagPayload;
      dispatch(actions.fetchSuccess(postPayload, tagPayload));
    },
    handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
    handleChangeMenu: menuIdx => dispatch(actions.changeMenu(menuIdx)),
  }),
)(Blog);
