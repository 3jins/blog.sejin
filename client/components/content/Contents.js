import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import ContentPreview from './ContentPreview';
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
        const renderContent = (postList, selectedSubmenuIdx) => {
            if(postList.length === 0) {
                return (
                    <p>There is no post</p>
                );
            }
            else {
                return postList.map((post, idx) => {
                    return <ContentPreview
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
                    {renderContent(postList, this.props.currentPostIdx)}
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