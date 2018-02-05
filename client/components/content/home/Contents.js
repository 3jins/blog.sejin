import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

import NoPostPreview from './NoPostPreview';
import LoadingView from '../LoadingView';
import AboutView from './AboutView';
import ContentPreview from './ContentPreview';
import scrollToComponent from 'react-scroll-to-component';
import {getMenuHeight} from "../../../utils/unitConverter";


class Contents extends Component {
    constructor(props) {
        super(props);
        this.postPositions = [];
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedMenuIdx !== nextProps.selectedMenuIdx) {
            if (nextProps.selectedMenuIdx === 0) {   // about
                this.props.handleFetchPosts(
                    '/posts',
                    this.props.menuList[nextProps.selectedMenuIdx].title,
                    '',
                );
            }
            else {  // works, blog
                this.props.handleFetchPosts(
                    '/posts',
                    this.props.menuList[nextProps.selectedMenuIdx].title,
                    this.props.menuList[nextProps.selectedMenuIdx].submenuList[nextProps.selectedSubmenuIdx].title,
                );
            }
        }
        if(nextProps.exchange) {
            this.props.handleFetchPosts(
                '/posts',
                this.props.menuList[nextProps.selectedMenuIdx].title,
                this.props.menuList[nextProps.selectedMenuIdx].submenuList[nextProps.selectedSubmenuIdx].title,
            );
        }
        if (nextProps.scroll) {
            const scrollOptions = {
                align: 'top',
                duration: 500,
                offset: 0,
            };
            console.log(nextProps.menuActionType);
            switch(nextProps.menuActionType) {
                case 'CHANGE_MENU':
                    // TODO: It needs deceleration effect.
                    (function scrollToTop () {
                        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                            window.scrollBy(0, -50);
                            setTimeout(scrollToTop, 10);
                        }
                    }());
                    break;
                case 'CHANGE_SUBMENU':
                    scrollOptions['offset'] = -getMenuHeight();
                    scrollToComponent(this.postPositions[nextProps.selectedSubmenuIdx], scrollOptions);
                    break;
            }

            this.props.handleScrollToComponentFinished();
        }
    }

    componentDidMount() {
        this.props.handleFetchPosts(
            '/posts',
            this.props.menuList[0].title,
            '',
        );
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.postPayload.length > 0) || (this.props.loading !== nextProps.loading) || this.props.exchange;
    }

    render() {
        const renderLoading = () => {
            return (
                <LoadingView isTable={true}/>
            );
        };

        const renderContents = (postList, menuList, selectedMenuIdx) => {
            if (postList.length === 0) {
                return (
                    <NoPostPreview/>
                );
            }
            else {
                if (selectedMenuIdx === 0) {  // about
                    return postList.map((post, idx) => {
                        return <AboutView
                            ref={(section) => {
                                this.postPositions[idx] = section;
                            }}
                            key={post._id}
                            id={post._id}
                            belongToMajor={post.belongToMajor}
                            belongToMinor={post.belongToMinor}
                            content={post.content}
                        />
                    });
                }
                else {  // works, blog
                    return postList.map((post, idx) => {
                        return <ContentPreview
                            ref={(section) => {
                                this.postPositions[idx] = section;
                            }}
                            key={post._id}
                            id={post._id}
                            belongToMajor={post.belongToMajor}
                            belongToMinor={post.belongToMinor}
                            title={post.title}
                            content={post.content}
                            dataUpdated={post.dataUpdated}
                            onReadMore={this.props.handleFetchPost}
                        />
                    });
                }
            }
        };

        const postList = this.props.postPayload;
        return (
            <div className="content">
                <div className="content-preview">
                    <table>
                        <tbody>
                        {this.props.loading && renderLoading()}
                        {!this.props.loading && renderContents(postList, this.props.menuList, this.props.selectedMenuIdx)}
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
        currentPostIdx: state.posts.currentPostIdx,
        menuActionType: state.menus.menuActionType,
        menuList: state.menus.menuList,
        selectedMenuIdx: state.menus.selectedMenuIdx,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        exchange: state.menus.exchange,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: (url, belongToMajor, belongToMinor) => {
            const pendingResult = dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor));
            pendingResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });
        },
        handleFetchPost: (url, postID) => {
            const pendingResult = dispatch(actions.fetchPost(url, postID));
            pendingResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });
        },
        handleScrollToComponentFinished: () => dispatch(actions.changeMenuFinished()),
    }),
)(Contents);