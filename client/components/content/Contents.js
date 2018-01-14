import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Content extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedMenuIdx !== nextProps.selectedMenuIdx) {
            this.props.handleFetchPosts(
                '/posts',
                this.props.menuList[nextProps.selectedMenuIdx].title,
                this.props.menuList[nextProps.selectedMenuIdx].submenuList[0].title
            );
        }
        if (this.props.selectedSubmenuIdx !== nextProps.selectedSubmenuIdx) {
            this.props.handleFetchPosts(
                '/posts',
                this.props.menuList[this.props.selectedMenuIdx].title,
                this.props.menuList[this.props.selectedMenuIdx].submenuList[nextProps.selectedSubmenuIdx].title
            );
        }
    }

    componentDidMount() {
        this.props.handleFetchPosts(
            '/posts',
            this.props.menuList[0].title,
            this.props.menuList[0].submenuList[0].title
        );
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.postList.length !== 0) || (this.props.loading !== nextProps.loading);
    }

    render() {
        const renderLoading = () => {
            return (
                <div className="content">
                    <p>loading...</p>
                </div>
            );
        };
        const renderContent = (numContents, currentIdx) => {
            if(numContents === 0) {
                return (
                    <div className="content">
                        <p>There is no post</p>
                    </div>
                );
            }
            else {
                return (
                    <div className="content">
                        <p>
                            {this.props.postList[currentIdx]['content']}
                        </p>
                    </div>
                );
            }
        };

        if(this.props.loading) {
            return renderLoading();
        }
        else {
            const postList = this.props.postList;
            return renderContent(postList.length, this.props.currentPostIdx);
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
    }),
    (dispatch) => ({
        // handleChangeMenu: (menuIdx) => dispatch(actions.changeMenu(menuIdx)),
        handleFetchPosts: (url, belongToMajor, belongToMinor) => {
            const pendingResult = dispatch(actions.fetchPosts(url, belongToMajor, belongToMinor));
            pendingResult.postList
                .then((response) => {
                    dispatch(actions.fetchPostsSuccess(response));
                });
        },
    }),
)(Content);