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
        this.tag = getParameterByName('tag');
        this.page = getParameterByName('page');
        props.handleFetchPosts(
            '/posts',
            props.belongToMajor,
            props.belongToMinor ? props.belongToMinor : this.menuList[this.menuIdx].submenuList[0].title,
            this.tag,
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
                this.tag,
                this.page
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

        const renderContents = (postPayload, commentsCountPayload) => {
            if (isEmpty(postPayload.posts) || isEmpty(commentsCountPayload)) {
                return <NoPostPreview/>;
            }
            console.log("???");
            return postPayload.posts.map((post, idx) => {
                return (
                    <BlogContent
                        key={post._id}
                        postNo={post.postNo}
                        belongToMajor={post.belongToMajor}
                        title={post.title}
                        content={post.content}
                        dateCreated={post.dateCreated}
                        tags={post.tags}
                        commentsCount={commentsCountPayload[idx]}
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
                        selectedTag={this.tag}
                    />}
                    <div className="content-view-wrapper">
                        {this.props.loading && renderLoading()}
                        {!this.props.loading && renderContents(this.props.postPayload, this.props.commentsCountPayload)}
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
        commentsCountPayload: state.posts.commentsCountPayload,
        menuActionType: state.menus.menuActionType,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: async (url, belongToMajor, belongToMinor, tag, page) => {
            const pendedPostResult = dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor, tag, page));
            const pendedTagResult = dispatch(actions.fetchTags('/tags', belongToMinor));

            // Handle comments count fetching process
            const postPayload = await pendedPostResult.postPayload;
            const commentsCountPayload = postPayload.posts.map(async (post) => {
                const pendedCommentsCount = dispatch(actions.fetchCommentsCount('/postViewer/' + post.postNo));
                const resolvedCommentsCountPayload = await pendedCommentsCount.commentsCountPayload;
                // console.log(resolvedCommentsCountPayload);
                return resolvedCommentsCountPayload.share.comment_count;    // await 없어도 0 나옴.
            });

            // Convert the array of promises to an array of values
            for(let i = 0; i < commentsCountPayload.length; i++) {
                commentsCountPayload[i] = await commentsCountPayload[i];
            }

            dispatch(actions.fetchSuccess(postPayload, await pendedTagResult.tagPayload, commentsCountPayload));
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