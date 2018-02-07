import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import NoPostPreview from '../NoPostPreview';
import LoadingView from '../../LoadingView';
import WorksPreview from './WorksPreview';
import {getMenuHeight} from "../../../../utils/unitConverter";


class WorksContents extends Component {
    constructor(props) {
        super(props);
        this.contentPosition = null;
    }

    componentWillMount() {
        this.props.handleChangeMenu(1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuActionType === 'CHANGE_MENU_FINISHED' && this.props.menuActionType !== nextProps.menuActionType) {
            this.props.handleFetchPosts(
                '/posts',
                this.props.menuList[1].title,
                this.props.menuList[1].submenuList[this.props.selectedSubmenuIdx].title,
            );
        }
        if (nextProps.scroll) {
            switch(nextProps.menuActionType) {
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
                        this.contentPosition,
                        {
                            align: 'top',
                            duration: 500,
                            offset: -getMenuHeight(),
                        }
                    );
                    // // TODO: It needs deceleration effect.
                    // (function scrollToTop () {
                    //     if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                    //         window.scrollBy(0, -50);
                    //         setTimeout(scrollToTop, 10);
                    //     }
                    // }());
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

        const renderContents = (postList) => {
            if(postList.length === 0) {
                return <NoPostPreview/>
            }
            return postList.map((post) => {
                return <WorksPreview
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
        };

        const postList = this.props.postPayload;
        return (
            <div className="content">
                <div className="content-preview">
                    <table>
                        <tbody ref={(section) => {
                            this.contentPosition = section;
                        }}>
                        {this.props.loading && renderLoading()}
                        {!this.props.loading && renderContents(postList)}
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
        // selectedMenuIdx: state.menus.selectedMenuIdx,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
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
        handleChangeMenu: (menuIdx) => dispatch(actions.changeMenu(menuIdx)),
    }),
)(WorksContents);