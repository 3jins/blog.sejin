import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import ContentView from './ContentView';
import ContentPreviewBunch from './ContentPreviewBunch';
import scrollToComponent from 'react-scroll-to-component';

class Contents extends Component {

    constructor(props) {
        super(props);
        this.postPositions = [];
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedMenuIdx !== nextProps.selectedMenuIdx) {
            this.props.handleFetchPosts(
                '/posts',
                this.props.menuList[nextProps.selectedMenuIdx].title,
                // this.props.menuList[nextProps.selectedMenuIdx].submenuList[0].title
            );
        }
    //     if (this.props.selectedSubmenuIdx !== nextProps.selectedSubmenuIdx) {
    //         this.props.handleFetchPosts(
    //             '/posts',
    //             this.props.menuList[this.props.selectedMenuIdx].title,
    //             // this.props.menuList[this.props.selectedMenuIdx].submenuList[nextProps.selectedSubmenuIdx].title
    //         );
    //     }
        if(nextProps.scroll) {
            scrollToComponent(this.postPositions[nextProps.selectedSubmenuIdx], {
                align: 'top',
                duration: 500,
            });
            this.props.handleChangeSubmenuFinished();
        }
    }

    componentDidMount() {
        this.props.handleFetchPosts(
            '/posts',
            this.props.menuList[0].title,
            // this.props.menuList[0].submenuList[0].title
        );
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.postList.length !== 0) || (this.props.loading !== nextProps.loading);
    }

    render() {
        const renderLoading = () => {
            return (
                <p>loading...</p>
            );
        };
        const renderContent = (postList, menuList, selectedMenuIdx) => {
            if(postList.length === 0) {
                return (
                    <p>There is no post</p>
                );
            }
            else {
                if(selectedMenuIdx === 0) {  // about
                    return postList.map((post, idx) => {
                        return <ContentView
                            ref={(section) => {
                                this.postPositions[idx] = section;
                            }}
                            key={post._id}
                            belongToMajor={post.belongToMajor}
                            belongToMinor={post.belongToMinor}
                            title={post.title}
                            content={post.content}
                            dataUpdated={post.dataUpdated}
                        />
                    });
                }
                else {  // works, blog
                    return menuList[selectedMenuIdx].submenuList.map((submenu, idx) => {
                        const submenuTitle = submenu.title;
                        let selectedPostList = [];
                        postList.map((post) => {
                            if(submenuTitle === post.belongToMinor) {
                                selectedPostList.push(post);
                            }
                        });
                        return <ContentPreviewBunch
                            key={idx}
                            submenuTitle={submenuTitle}
                            postList={selectedPostList}
                        />;
                    });
                }
            }
        };

        if(this.props.loading) {
            return (
                <div className="content">
                    {renderLoading()}
                </div>
            );
        }
        else {
            const postList = this.props.postList;
            return (
                <div className="content">
                    {renderContent(postList, this.props.menuList, this.props.selectedMenuIdx)}
                </div>
            );
        }
    }
}

export default connect(
    (state) => ({
        postList: state.posts.postList,
        loading: state.posts.loading,
        currentPostIdx: state.posts.currentPostIdx,
        menuList: state.menus.menuList,
        selectedMenuIdx: state.menus.selectedMenuIdx,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        scroll: state.menus.scroll,
    }),
    (dispatch) => ({
        handleFetchPosts: (url, belongToMajor) => {
            const pendingResult = dispatch(actions.fetchPosts(url, belongToMajor, ''));
            pendingResult.postList
                .then((response) => {
                    dispatch(actions.fetchPostsSuccess(response));
                });
        },
        handleChangeSubmenuFinished: () => dispatch(actions.changeSubmenuFinished()),
    }),
)(Contents);