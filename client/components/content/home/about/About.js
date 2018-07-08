import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import NoPostPreview from '../NoPostPreview';
import LoadingView from '../../LoadingView';
import AboutContent from './AboutContent';
import {getMenuHeight} from "../../../../../utils/unitConverter";
import {menuList} from "../../../../constants";
import {isEmpty} from "../../../../../utils/nullChecker";
import NotFoundView from "../../NotFoundView";

class About extends Component {
    constructor(props) {
        super(props);
        this.contentPositions = [];
        this.menuList = menuList;
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
        return nextProps.isLoaded;
    }

    render() {
        const renderContents = (posts) => {
            return posts.map((post, idx) => {
                return (
                    <div
                        className="content-body"
                        key={post._id}
                        ref={(section) => {
                            this.contentPositions[idx] = section;
                        }}>
                        <AboutContent
                            content={post.content}
                            belongToMajor={post.belongToMajor}
                            belongToMinor={post.belongToMinor}
                        />
                    </div>
                );
            });
        };

        return (
            <div className="content">
                {!this.props.isLoaded && /* loading */
                <LoadingView/>
                }
                {this.props.isLoaded && isEmpty(this.props.posts) && /* not found */
                <NotFoundView isFail={false}/>
                }
                {this.props.isLoaded && !isEmpty(this.props.posts) && /* render */
                    renderContents(this.props.posts)
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        posts: state.posts.postPayload.posts,
        isLoaded: state.posts.isLoaded,
        menuActionType: state.menus.menuActionType,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: async (url, belongToMajor, belongToMinor) => {
            const postPayload = await dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor)).postPayload;
            dispatch(actions.fetchSuccess(postPayload));
        },
        handleFetchPost: async (url, postID) => {
            const postPayload = await dispatch(actions.fetchPost(url, postID)).postPayload;
            dispatch(actions.fetchSuccess(postPayload));
        },
        handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
        handleChangeMenu: (menuIdx) => dispatch(actions.changeMenu(menuIdx)),
    }),
)(About);
