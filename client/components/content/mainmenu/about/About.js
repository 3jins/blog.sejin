import React, { Component } from 'react';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import MainContentWrapper from '../MainContentWrapper';
import LoadingView from '../../LoadingView';
import AboutContent from './AboutContent';
import { getMenuHeight } from '../../../../../utils/unitConverter';
import { menuList } from '../../../../constants';
import NotFoundView from '../../NotFoundView';

class About extends Component {
  constructor(props) {
    super(props);
    this.contentPositions = [];
    this.menuIdx = 0;
  }

  componentDidMount() {
    const { handleChangeMenu } = this.props;
    handleChangeMenu(this.menuIdx);
  }

  componentWillReceiveProps(nextProps) {
    const { menuActionType, handleFetchPosts, handleScrollToComponentFinished } = this.props;
    if (nextProps.menuActionType === 'CHANGE_MENU_FINISHED' && menuActionType === 'CHANGE_MENU') {
      handleFetchPosts(
        '/posts',
        menuList[this.menuIdx].title,
        '',
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
            this.contentPositions[nextProps.selectedSubmenuIdx],
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
    const renderContents = posts => posts.map((post, idx) => (
      <div
        className="content-body"
        key={post.title}
        ref={(section) => {
          this.contentPositions[idx] = section;
        }}
      >
        <AboutContent
          content={post.content}
          belongToMajor={post.belongToMajor}
          belongToMinor={post.belongToMinor}
        />
      </div>
    ));

    const { isLoaded, posts, numPosts } = this.props;

    if (!isLoaded) { // loading
      return <div className="content"><LoadingView /></div>;
    }
    if (isLoaded && numPosts === 0) { // no posts
      return <div className="content"><NotFoundView isFail={false} /></div>;
    }
    return (
      <div className="content">
        {renderContents(posts)}
      </div>
    );
  }
}

export default connect(
  state => ({
    posts: state.posts.posts,
    isLoaded: state.posts.isLoaded,
    menuActionType: state.menus.menuActionType,
    selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
    scroll: state.menus.scroll,
  }),
  dispatch => ({
    handleFetchPosts: async (url, belongToMajor, belongToMinor) => {
      const postPayload = await dispatch(
        actions.fetchPosts(url, belongToMajor, belongToMinor),
      ).postPayload;
      const { posts, numPosts } = postPayload;
      dispatch(actions.fetchSuccess({ posts, numPosts }));
    },
    handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
    handleChangeMenu: menuIdx => dispatch(actions.changeMenu(menuIdx)),
  }),
)(About);
