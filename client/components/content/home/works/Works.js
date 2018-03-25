import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import NoPostPreview from '../NoPostPreview';
import LoadingView from '../../LoadingView';
import WorksContent from './WorksContent';
import {getMenuHeight} from "../../../../../server/utils/unitConverter";
import constants from "../../../../constants";

class Works extends Component {
    constructor(props) {
        super(props);
        this.contentsStartPosition = null;
        this.menuList = constants.menuList;
        this.menuIdx = 1;
        props.handleFetchPosts(
            '/posts',
            props.belongToMajor,
            props.belongToMinor ? props.belongToMinor : this.menuList[this.menuIdx].submenuList[0].title,
        );
        props.handleChangeMenu(this.menuIdx);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.belongToMinor !== nextProps.belongToMinor) {
            this.props.handleFetchPosts(
                '/posts',
                nextProps.belongToMajor,
                nextProps.belongToMinor
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
        return (nextProps.postPayload.length > 0) || (this.props.loading !== nextProps.loading);
    }

    render() {
        const renderLoading = () => {
            return (
                <LoadingView isTable={false}/>
            );
        };

        const renderContents = (postPayload) => {
            if (!postPayload || postPayload.length === 0) {
                return <NoPostPreview/>
            }
            return postPayload.map((post) => {
                return (
                    <div key={post._id} className="content-body">
                        <WorksContent
                            postNo={post.postNo}
                            belongToMajor={post.belongToMajor}
                            belongToMinor={post.belongToMinor}
                            title={post.title}
                            content={post.content}
                            dataUpdated={post.dataUpdated}
                            onReadMore={this.props.handleFetchPost}
                        />
                    </div>
                );
            });
        };

        return (
            <div className="content" ref={(section) => {
                this.contentsStartPosition = section;
            }}>
                <Helmet>
                    <meta property="og:url" content="http://enhanced.kr/nav/Blog"/>
                </Helmet>
                {this.props.loading && renderLoading()}
                {!this.props.loading && renderContents(this.props.postPayload)}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        postPayload: state.posts.postPayload,
        loading: state.posts.loading,
        menuActionType: state.menus.menuActionType,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: (url, belongToMajor, belongToMinor) => {
            const pendedPostResult = dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor));
            pendedPostResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });
        },
        handleFetchPost: (url, postNo) => {
            const pendingResult = dispatch(actions.fetchPost(url, postNo));
            pendingResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });
        },
        handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
        handleChangeMenu: (menuIdx) => dispatch(actions.changeMenu(menuIdx)),
    }),
)(Works);