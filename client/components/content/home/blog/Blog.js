import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../../../actions';
import NoPostPreview from '../NoPostPreview';
import LoadingView from '../../LoadingView';
import BlogContent from './BlogContent';
import BlogSubtitle from './BlogSubtitle';
import {getMenuHeight} from "../../../../utils/unitConverter";


class Blog extends Component {
    constructor(props) {
        super(props);
        this.contentsStartPosition = null;
        this.props.handleChangeMenu(2);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuActionType === 'CHANGE_MENU_FINISHED' && this.props.menuActionType !== nextProps.menuActionType) {
            const belongToMajor = this.props.menuList[2].title;
            const belongToMinor = this.props.menuList[2].submenuList[this.props.selectedSubmenuIdx].title;
            this.props.handleFetchPosts(
                '/posts',
                belongToMajor,
                belongToMinor
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
            (nextProps.postPayload.length > 0) ||
            (nextProps.tagPayload.length > 0) ||
            (this.props.loading !== nextProps.loading)
        );
    }

    render() {
        const renderLoading = () => {
            return (
                <LoadingView isTable={true}/>
            );
        };

        const renderContents = (postPayload, tagPayload) => {
            if (!postPayload || postPayload.length === 0) {
                return <NoPostPreview/>;
            }
            return postPayload.map((post, idx) => {
                return (
                    <tr key={post._id}>
                        {idx === 0 &&
                        <BlogSubtitle
                            belongToMinor={post.belongToMinor}
                            tagPayload={tagPayload}
                        />}
                        <BlogContent
                            id={post._id}
                            belongToMajor={post.belongToMajor}
                            title={post.title}
                            content={post.content}
                            dataUpdated={post.dataUpdated}
                            onReadMore={this.props.handleFetchPost}
                        />
                    </tr>
                );
            });
        };

        return (
            <div className="content">
                <div>
                    <table>
                        <tbody ref={(section) => this.contentsStartPosition = section}>
                        {this.props.loading && renderLoading()}
                        {!this.props.loading && renderContents(this.props.postPayload, this.props.tagPayload)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
            ;
    }
}

export default connect(
    (state) => ({
        postPayload: state.posts.postPayload,
        loading: state.posts.loading,
        tagPayload: state.posts.tagPayload,
        menuActionType: state.menus.menuActionType,
        menuList: state.menus.menuList,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: (url, belongToMajor, belongToMinor) => {
            const pendedPostResult = dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor));
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