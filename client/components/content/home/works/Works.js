import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
// import Helmet from 'react-helmet/es/Helmet';
import * as actions from '../../../../actions';
import LoadingView from '../../LoadingView';
import WorksContent from './WorksContent';
import { getMenuHeight } from '../../../../../utils/unitConverter';
import { menuList } from '../../../../constants';
import { getParameterByName } from '../../../../../utils/stringModifier';
import PageView from '../../PageView';
import NotFoundView from '../../NotFoundView';

class Works extends Component {
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

    const menuIdx = 1;
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
      <div key={post.postNo} className="content-body">
        <WorksContent
          postNo={post.postNo}
          belongToMajor={post.belongToMajor}
          belongToMinor={post.belongToMinor}
          title={post.title}
          content={post.content}
          dateCreated={post.dateCreated}
        />
      </div>
    ));

    const { isLoaded, posts, numPosts } = this.props;

    if (!isLoaded) { // loading
      return (
        <div className="content" ref={(section) => { this.contentsStartPosition = section; }}>
          <LoadingView />
        </div>
      );
    }
    if (isLoaded && numPosts === 0) { // no posts
      return (
        <div className="content" ref={(section) => { this.contentsStartPosition = section; }}>
          <NotFoundView isFail={false} />
        </div>
      );
    }
    return (
      <div className="content" ref={(section) => { this.contentsStartPosition = section; }}>
        {/* <Helmet> */}
        {/* <meta property="og:url" content="https://enhanced.kr/nav/Blog"/> */}
        {/* <title>{"Works :: " + blogTitle}</title> */}
        {/* </Helmet> */}
        {renderContents(posts)}
        <PageView
          page={this.page > 0 ? this.page : 1}
          numPosts={numPosts}
          pageScale={10}
        />
      </div>
    );
  }
}

Works.propTypes = {
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
  menuActionType: PropTypes.string,
  scroll: PropTypes.bool,
  handleFetchPosts: PropTypes.func.isRequired,
  handleChangeMenu: PropTypes.func.isRequired,
  handleScrollToComponentFinished: PropTypes.func.isRequired,
};

Works.defaultProps = {
  isLoaded: false,
  belongToMajor: '',
  belongToMinor: '',
  posts: [],
  numPosts: 0,
  menuActionType: 'CHANGE_MENU_FINISHED',
  scroll: false,
};

export default connect(
  state => ({
    posts: state.posts.posts,
    numPosts: state.posts.numPosts,
    isLoaded: state.posts.isLoaded,
    menuActionType: state.menus.menuActionType,
    selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
    scroll: state.menus.scroll,
  }),
  dispatch => ({
    handleFetchPosts: async (url, belongToMajor, belongToMinor, tag, page) => {
      const postPayload = await dispatch(
        actions.fetchPosts(url, belongToMajor, belongToMinor, tag, page),
      ).postPayload;
      const { posts, numPosts } = postPayload;
      dispatch(actions.fetchSuccess({ posts, numPosts }));
    },
    handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
    handleChangeMenu: menuIdx => dispatch(actions.changeMenu(menuIdx)),
  }),
)(Works);
