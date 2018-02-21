import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import NoPostPreview from '../NoPostPreview';
import LoadingView from '../../LoadingView';
import AboutContent from './AboutContent';
import {getMenuHeight} from "../../../../../server/utils/unitConverter";
import AboutSubtitle from "./AboutSubtitle";
import components from "../../../../constants";

class About extends Component {
    constructor(props) {
        super(props);
        this.contentPositions = [];
        this.menuList = components.menuList;
        this.menuIdx = 0;
        props.handleChangeMenu(this.menuIdx);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuActionType === 'CHANGE_MENU_FINISHED' && this.props.menuActionType === 'CHANGE_MENU') {
            this.props.handleFetchPosts(
                '/posts',
                this.menuList[this.menuIdx].title,
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
                <LoadingView isTable={true}/>
            );
        };

        const renderContents = (postPayload) => {
            if (!postPayload || postPayload.length === 0) {
                return <NoPostPreview/>;
            }
            return postPayload.map((post, idx) => {
                return (
                    <tr key={post._id}>
                        <AboutSubtitle belongToMinor={post.belongToMinor}/>
                        <AboutContent
                            ref={(section) => {
                                this.contentPositions[idx] = section;
                            }}
                            belongToMajor={post.belongToMajor}
                            content={post.content}
                        />
                    </tr>
                );
            });
        };

        return (
            <div className="content">
                <div>
                    <table>
                        <tbody>
                        {this.props.loading && renderLoading()}
                        {!this.props.loading && renderContents(this.props.postPayload)}
                        </tbody>
                    </table>
                </div>
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
)(About);