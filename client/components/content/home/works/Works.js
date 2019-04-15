import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import LoadingView from '../../LoadingView';
import WorksContent from './WorksContent';
import {getMenuHeight} from "../../../../../utils/unitConverter";
import {blogTitle, menuList} from "../../../../constants";
// import Helmet from "react-helmet/es/Helmet";
import {getParameterByName} from "../../../../../utils/stringModifier";
import {isEmpty} from "../../../../../utils/nullChecker";
import PageView from "../../PageView";
import NotFoundView from "../../NotFoundView";
import {https2http} from "../../../../../utils/urlModifier";

class Works extends Component {
    constructor(props) {
        super(props);
        this.contentsStartPosition = null;
        this.menuList = menuList;
        this.menuIdx = 1;
        this.tag = getParameterByName('tag');
        this.page = Number(getParameterByName('page'));
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
        return nextProps.isLoaded;
    }

    render() {
        const renderContents = (postPayload, commentsCountPayload) => {
            return postPayload.posts.map((post, idx) => {
                return (
                    <div key={post._id} className="content-body">
                        <WorksContent
                            postNo={post.postNo}
                            belongToMajor={post.belongToMajor}
                            belongToMinor={post.belongToMinor}
                            title={post.title}
                            content={post.content}
                            dateCreated={post.dateCreated}
                            commentsCount={commentsCountPayload[post.postNo]}
                        />
                    </div>
                );
            });
        };

        return (
            <div className="content" ref={(section) => {
                this.contentsStartPosition = section;
            }}>
                {/*<Helmet>*/}
                    {/*<meta property="og:url" content="https://enhanced.kr/nav/Blog"/>*/}
                    {/*<title>{"Works :: " + blogTitle}</title>*/}
                {/*</Helmet>*/}
                {!this.props.isLoaded && /* loading */
                <LoadingView/>
                }
                {this.props.isLoaded && isEmpty(this.props.postPayload.posts) && /* not found */
                <NotFoundView isFail={false}/>
                }
                {this.props.isLoaded && !isEmpty(this.props.postPayload.posts) && /* render */
                    renderContents(this.props.postPayload, this.props.commentsCountPayload)
                }
                {this.props.isLoaded && !isEmpty(this.props.postPayload.posts) &&
                    <PageView page={this.page > 0 ? this.page : 1} numPosts={this.props.postPayload.numPosts} pageScale={10}/>
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        postPayload: state.posts.postPayload,
        isLoaded: state.posts.isLoaded,
        commentsCountPayload: state.posts.commentsCountPayload,
        menuActionType: state.menus.menuActionType,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: async (url, belongToMajor, belongToMinor, tag, page) => {
            const postPayload = await dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor, tag, page)).postPayload;

            // Handle comments count fetching process
            const fullUrl = https2http(window.location.href);
            const domain = fullUrl.substring(0, fullUrl.indexOf('/', 8));
            const urls = await postPayload.posts.map((post) => domain + '/postviewer/' + post.postNo);
            const commentsCountPayload = await dispatch(actions.fetchCommentsCount(urls)).commentsCountPayload;
            console.log('handleFetchPosts 1', commentsCountPayload);

            // Convert the array of promises to an array of values
            const refinedCommentsCounts = {};
            let idx = 0;
            postPayload.posts.map((post) => {
                const currentCommentsCountPayload = commentsCountPayload[urls[idx++]];
                if (!currentCommentsCountPayload.hasOwnProperty('share')) {
                    refinedCommentsCounts[post.postNo] = -1;
                } else {
                    refinedCommentsCounts[post.postNo] = currentCommentsCountPayload.share.comment_count;
                }
            });
            console.log('handleFetchPosts 2', refinedCommentsCounts);

            dispatch(actions.fetchSuccess(postPayload, [], refinedCommentsCounts));
        },
        handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
        handleChangeMenu: (menuIdx) => dispatch(actions.changeMenu(menuIdx)),
    }),
)(Works);
