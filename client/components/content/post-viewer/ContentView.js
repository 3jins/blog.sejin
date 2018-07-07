import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import LoadingView from '../LoadingView';
import ContentViewContent from "./ContentViewContent";
import ContentViewSubtitle from "./ContentViewSubtitle";
import {blogTitle, menuList} from "../../../constants";
import {isEmpty} from "../../../../utils/nullChecker";
import Helmet from "react-helmet/es/Helmet";
import NotFoundView from "../NotFoundView";

class ContentView extends Component {
    constructor(props) {
        super(props);
        this.menuList = menuList;
        props.handleFetchPost('/post', props.postNo);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.post)) {
            this.props.handleChangeMenu(nextProps.post, this.menuList);
        }
        if (nextProps.menuActionType === 'CHANGE_MENU') {
            this.props.handleChangeMenuFinished();
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isLoaded;
    }

    render() {
        const getBelongToMajor = (post) => {
            if (!isEmpty(post)) {
                return post[0].belongToMajor;
            }
            return '';
        };
        const getBelongToMinor = (post) => {
            if (!isEmpty(post)) {
                return post[0].belongToMinor;
            }
            return '';
        };
        const belongToMajor = getBelongToMajor(this.props.post);
        const belongToMinor = getBelongToMinor(this.props.post);
        let currentTags = [];
        if (!isEmpty(this.props.post)) {
            currentTags = this.props.post[0].tags;
        }

        return (
            <div className="content">
                <Helmet>
                    <meta property="og:url" content={"http://enhanced.kr/contentviewer/" + this.props.postNo}/>
                    <title>
                        {!isEmpty(this.props.post) && this.props.post[0].title + " :: " + blogTitle}
                    </title>
                </Helmet>
                {!this.props.isLoaded && /* loading */
                    <LoadingView/>
                }
                {this.props.isLoaded && isEmpty(this.props.post) && /* not found */
                    <NotFoundView/>
                }
                {this.props.isLoaded && !isEmpty(this.props.post) && /* render */
                <div className="content-body">
                    {belongToMajor !== 'Works' &&
                    <ContentViewSubtitle
                        tagPayload={this.props.tagPayload}
                        currentTags={currentTags}
                        belongToMinor={belongToMinor}
                    />}
                    <div className={"content-view-wrapper"}>
                        <ContentViewContent
                            post={this.props.post}
                            belongToMajor={belongToMajor}
                            postNo={this.props.postNo}
                            tags={this.props.tagPayload}
                        />
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default ContentView = connect(
    (state) => ({
        post: state.posts.postPayload.post,
        tagPayload: state.posts.tagPayload,
        menuActionType: state.menus.menuActionType,
        isLoaded: state.posts.isLoaded,
    }),
    (dispatch) => ({
        handleFetchPost: async (url, postNo) => {
            const postPayload = await dispatch(actions.fetchPost(url, postNo)).postPayload;
            if(isEmpty(postPayload.post))  // when the post is not found
                return dispatch(actions.fetchSuccess(postPayload));
            const tagPayload = await dispatch(actions.fetchTags('/tags', postPayload.post[0].belongToMinor)).tagPayload;
            dispatch(actions.fetchSuccess(postPayload, tagPayload));
        },
        handleChangeMenu: (post, menuList) => {
            const belongToMajor = post[0].belongToMajor;
            menuList.map((menu, idx) => {
                if (menu.title === belongToMajor) {
                    dispatch(actions.changeMenu(idx));
                }
            });
        },
        handleChangeMenuFinished: () => dispatch(actions.changeMenuFinished()),
    }),
)(ContentView);