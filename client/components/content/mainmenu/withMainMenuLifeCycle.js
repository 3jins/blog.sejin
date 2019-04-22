import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
// import Helmet from 'react-helmet/es/Helmet';
import * as actions from '../../../actions';
import { getMenuHeight } from '../../../../utils/unitConverter';
import { menuList } from '../../../constants';

const withMainMenuLifeCycle = (MainMenu, needSubnav, needScrollPositions, menuIdx, args) => {
  const { tag, page, contentPositions } = args;
  class MainMenuLifeCycleWrapper extends Component {
    constructor(props) {
      super(props);
      if (!needScrollPositions) this.contentsStartPosition = null;
    }

    componentDidMount() {
      const {
        belongToMajor,
        belongToMinor,
        handleFetchPosts,
        handleChangeMenu,
      } = this.props;

      handleFetchPosts(
        '/posts',
        belongToMajor || menuList[menuIdx].title,
        _.isEmpty(belongToMajor) ? '' : (belongToMinor || menuList[menuIdx].submenuList[0].title),
        tag || '',
        page || 0,
      );
      handleChangeMenu(menuIdx);
    }

    componentWillReceiveProps(nextProps) {
      const {
        belongToMajor,
        belongToMinor,
        handleFetchPosts,
        handleScrollToComponentFinished,
      } = this.props;
      if (belongToMinor !== nextProps.belongToMinor) {
        handleFetchPosts(
          '/posts',
          belongToMajor,
          _.isEmpty(belongToMajor) ? '' : (nextProps.belongToMinor || menuList[menuIdx].submenuList[0].title),
          tag || '',
          page || 0,
        );
      }
      if (nextProps.scroll) {
        switch (nextProps.menuActionType) {
          case 'CHANGE_MENU':
            // TODO: It needs deceleration effect.
            (function scrollToTop() {
              if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                window.scrollBy(0, -50);
                setTimeout(scrollToTop, 10);
              }
            }());
            break;
          case 'CHANGE_SUBMENU':
            scrollToComponent(
              needScrollPositions
                ? contentPositions[nextProps.selectedSubmenuIdx]
                : this.contentsStartPosition,
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
      return (
        <div
          className="content"
          ref={!needScrollPositions ? (section) => {
            this.contentsStartPosition = section;
          } : null}
        >
          {/* <Helmet> */}
          {/* <meta property="og:url" content="https://enhanced.kr/nav/Blog"/> */}
          {/* <title>{"Blog :: " + blogTitle}</title> */}
          {/* </Helmet> */}
          <MainMenu
            {...this.props}
            contentPositions={needScrollPositions ? contentPositions : null}
          />
        </div>
      );
    }
  }

  MainMenuLifeCycleWrapper.propTypes = {
    isLoaded: PropTypes.bool,
    belongToMajor: PropTypes.string,
    belongToMinor: PropTypes.string,
    menuActionType: PropTypes.string,
    selectedSubmenuIdx: PropTypes.number,
    scroll: PropTypes.bool,
    handleFetchPosts: PropTypes.func.isRequired,
    handleChangeMenu: PropTypes.func.isRequired,
    handleScrollToComponentFinished: PropTypes.func.isRequired,
  };

  MainMenuLifeCycleWrapper.defaultProps = {
    isLoaded: false,
    belongToMajor: '',
    belongToMinor: '',
    menuActionType: '',
    selectedSubmenuIdx: 0,
    scroll: false,
  };

  return connect(
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
        const tagPayload = needSubnav ? await dispatch(actions.fetchTags('/tags', belongToMinor)).tagPayload : null;
        const { posts, numPosts } = postPayload;
        dispatch(actions.fetchSuccess({ posts, numPosts, tags: tagPayload }));
      },
      handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
      handleChangeMenu: menuIdx => dispatch(actions.changeMenu(menuIdx)),
    }),
  )(MainMenuLifeCycleWrapper);
};

export default withMainMenuLifeCycle;
