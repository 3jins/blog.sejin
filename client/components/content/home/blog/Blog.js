import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import NoPostPreview from '../NoPostPreview';
import LoadingView from '../../LoadingView';
import BlogContent from './BlogContent';
import BlogSubtitle from './BlogSubtitle';
import {getMenuHeight} from "../../../../../utils/unitConverter";
import {blogTitle, menuList} from "../../../../constants";
import Helmet from "react-helmet/es/Helmet";
import {getParameterByName} from "../../../../../utils/stringModifier";
import {isEmpty} from "../../../../../utils/nullChecker";
import PageView from "../../PageView";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.contentsStartPosition = null;
        this.menuList = menuList;
        this.menuIdx = 2;
        this.page = getParameterByName('page') === null ? 1 : getParameterByName('page');
        props.handleFetchPosts(
            '/posts',
            props.belongToMajor,
            props.belongToMinor ? props.belongToMinor : this.menuList[this.menuIdx].submenuList[0].title,
            this.page
        );
        props.handleChangeMenu(this.menuIdx);
    }

    componentWillReceiveProps(nextProps) {
        // this.page = getParameterByName('page') === null ? 1 : getParameterByName('page');
        if (this.props.belongToMinor !== nextProps.belongToMinor) {
            this.props.handleFetchPosts(
                '/posts',
                nextProps.belongToMajor,
                nextProps.belongToMinor,
                1
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
                        }
                    );
                    break;
            }
            this.props.handleScrollToComponentFinished();
        }
    }

    shouldComponentUpdate(nextProps) {
        return (
            !isEmpty(nextProps.postPayload) ||
            !isEmpty(nextProps.tagPayload) ||
            (this.props.loading !== nextProps.loading)
        );
    }

    render() {
        const postPayload = this.props.postPayload;

        const renderLoading = () => {
            return (
                <LoadingView isTable={false}/>
            );
        };

        const renderContents = (postPayload) => {
            if (isEmpty(postPayload.posts)) {
                return <NoPostPreview/>;
            }
            return postPayload.posts.map((post) => {
                return (
                    <BlogContent
                        key={post._id}
                        postNo={post.postNo}
                        belongToMajor={post.belongToMajor}
                        title={post.title}
                        content={post.content}
                        dataUpdated={post.dataUpdated}
                        onReadMore={this.props.handleFetchPost}
                    />
                );
            });
        };

        return (
            <div className="content" ref={(section) => this.contentsStartPosition = section}>
                <Helmet>
                    <meta property="og:url" content="http://enhanced.kr/nav/Blog"/>
                    <title>{"Blog :: " + blogTitle}</title>
                </Helmet>
                <div className="content-body">
                    {!isEmpty(postPayload.posts) && <BlogSubtitle
                        belongToMinor={this.props.postPayload.posts[0].belongToMinor}
                        tagPayload={this.props.tagPayload}
                    />}
                    <div className="content-view-wrapper">
                        {this.props.loading && renderLoading()}
                        {!this.props.loading && renderContents(this.props.postPayload, this.props.tagPayload)}
                        <PageView page={this.page} numPosts={this.props.postPayload.numPosts} pageScale={10}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        postPayload: state.posts.postPayload,
        loading: state.posts.loading,
        tagPayload: state.posts.tagPayload,
        menuActionType: state.menus.menuActionType,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: (url, belongToMajor, belongToMinor, page) => {
            const pendedPostResult = dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor, page));
            pendedPostResult.postPayload
                .then((postPayload) => {
                    const pendedTagResult = dispatch(actions.fetchTags('/tags', belongToMinor));
                    pendedTagResult.tagPayload
                        .then((tagPayload) => {
                            dispatch(actions.fetchSuccess(postPayload, tagPayload));
                        })
                });
        },
        handleFetchPost: (url, postID) => {
            const pendedPostResult = dispatch(actions.fetchPost(url, postID));
            pendedPostResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });
        },
        handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
        handleChangeMenu: (menuIdx) => dispatch(actions.changeMenu(menuIdx)),
    }),
)(Blog);