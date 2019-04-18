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
    if (!_.isEmpty(nextProps.postPayload)) {
      this.props.handleChangeMenu(nextProps.postPayload.post[0], menuList);
    }
    if (nextProps.menuActionType === 'CHANGE_MENU') {
      this.props.handleChangeMenuFinished();
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isLoaded;
  }

  render() {
    const {
      postNo,
      isLoaded,
      postPayload,
      tagPayload,
      menuActionType,
    } = this.props;

    if (_.isEmpty(postPayload) && isLoaded) return <NotFoundView isFail={true} />; // error
    if (_.isEmpty(postPayload)) return <LoadingView />; // loading

    const { post } = postPayload;
    const { belongToMajor, belongToMinor, tags: currentTags } = post[0];

    // this.props.handleChangeMenu(postPayload.post[0], menuList);
    // if (menuActionType === 'CHANGE_MENU') this.props.handleChangeMenuFinished();

    return (
      <div className="content">
        {/*<Helmet>*/}
          {/*<meta property="og:url" content={`https://enhanced.kr/contentviewer/${postNo}`} />*/}
          {/*<title>*/}
            {/*{!post && `${post[0].title} :: ${blogTitle}`}*/}
          {/*</title>*/}
        {/*</Helmet>*/}
        <div className="content-body">
          {belongToMajor !== 'Works' && (
            <ContentViewSubtitle
              tagPayload={tagPayload}
              currentTags={currentTags}
              belongToMinor={belongToMinor}
            />
          )}
          <div className="content-view-wrapper">
            <ContentViewContent
              post={post[0]}
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
  postPayload: PropTypes.objectOf({
    post: [{
      postNo: PropTypes.number,
      title: PropTypes.string,
      dateCreated: PropTypes.instanceOf(Date),
      dateUpdated: PropTypes.instanceOf(Date),
      content: PropTypes.string,
      tags: PropTypes.array,
      belongToMajor: PropTypes.string,
      belongToMinor: PropTypes.string,
    }],
  }),
  tagPayload: PropTypes.arrayOf({
    tagName: PropTypes.string,
    belongToMinor: PropTypes.string,
    postList: PropTypes.array,
  }),
  menuActionType: PropTypes.string,
  isLoaded: PropTypes.bool,
};

ContentView.defaultProps = {
  postNo: -1,
  postPayload: {},
  tagPayload: [],
  menuActionType: 'CHANGE_MENU_FINISHED',
  isLoaded: true,
};

export default connect(
  state => ({
    postPayload: state.posts.postPayload,
    tagPayload: state.posts.tagPayload,
    menuActionType: state.menus.menuActionType,
    isLoaded: state.posts.isLoaded,
  }),
  dispatch => ({
    handleFetchPost: async (url, postNo) => {
      const postPayload = await dispatch(actions.fetchPost(url, postNo)).postPayload;
      if (!postPayload.post) { // when the post is not found
        return dispatch(actions.fetchSuccess(postPayload));
      }
      const tagPayload = await dispatch(actions.fetchTags('/tags', postPayload.post[0].belongToMinor)).tagPayload;
      dispatch(actions.fetchSuccess(postPayload, tagPayload));
    },
    handleChangeMenu: (post, menuList) => {
      const belongToMajor = post.belongToMajor;
      menuList.map((menu, idx) => {
        if (menu.title === belongToMajor) {
          dispatch(actions.changeMenu(idx));
        }
      });
    },
    handleChangeMenuFinished: () => dispatch(actions.changeMenuFinished()),
  }),
)(ContentView);
