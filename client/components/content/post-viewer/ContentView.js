import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import LoadingView from '../LoadingView';
import ContentViewContent from "./ContentViewContent";
import ContentViewSubtitle from "./ContentViewSubtitle";
import {menuList} from "../../../constants";
import {isEmpty} from "../../../../utils/nullChecker";

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
        return !isEmpty(nextProps.post) || !isEmpty(nextProps.tagPayload);
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
                <div className="content-body">
                    {this.props.loading && <LoadingView isTable={true}/>}
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
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentView = connect(
    (state) => ({
        post: state.posts.postPayload.post,
        tagPayload: state.posts.tagPayload,
        menuActionType: state.menus.menuActionType,
    }),
    (dispatch) => ({
        handleFetchPost: (url, postNo) => {
            const pendingResult = dispatch(actions.fetchPost(url, postNo));
            pendingResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });

            const pendedPostResult = dispatch(actions.fetchPost(url, postNo));
            pendedPostResult.postPayload
                .then((postPayload) => {
                    const pendedTagResult = dispatch(actions.fetchTags('/tags', postPayload.post[0].belongToMinor));
                    pendedTagResult.tagPayload
                        .then((tagPayload) => {
                            dispatch(actions.fetchSuccess(postPayload, tagPayload));
                        })
                });
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