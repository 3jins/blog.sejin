import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import LoadingView from '../LoadingView';
import ContentViewContent from "./ContentViewContent";
import ContentViewSubtitle from "./ContentViewSubtitle";
import constants from "../../../constants";

class ContentView extends Component {
    constructor(props) {
        super(props);
        this.menuList = constants.menuList;
        props.handleFetchPost('/post', props.postNo);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postPayload.length > 0) {
            this.props.handleChangeMenu(nextProps.postPayload, this.menuList);
        }
        if (nextProps.menuActionType === 'CHANGE_MENU') {
            this.props.handleChangeMenuFinished();
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.postPayload.length > 0 || nextProps.tagPayload.length > 0;
    }

    render() {
        const getBelongToMajor = (postPayload) => {
            if (postPayload.length > 0) {
                return postPayload[0].belongToMajor;
            }
            return '';
        };
        const getBelongToMinor = (postPayload) => {
            if (postPayload.length > 0) {
                return postPayload[0].belongToMinor;
            }
            return '';
        };
        const belongToMajor = getBelongToMajor(this.props.postPayload);
        const belongToMinor = getBelongToMinor(this.props.postPayload);
        let currentTags = [];
        if (this.props.postPayload.length > 0) {
            currentTags = this.props.postPayload[0].tags;
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
                            postPayload={this.props.postPayload}
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
        postPayload: state.posts.postPayload,
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
                    const pendedTagResult = dispatch(actions.fetchTags('/tags', postPayload[0].belongToMinor));
                    pendedTagResult.tagPayload
                        .then((tagPayload) => {
                            dispatch(actions.fetchSuccess(postPayload, tagPayload));
                        })
                });
        },
        handleChangeMenu: (postPayload, menuList) => {
            const belongToMajor = postPayload[0].belongToMajor;
            menuList.map((menu, idx) => {
                if (menu.title === belongToMajor) {
                    dispatch(actions.changeMenu(idx));
                }
            });
        },
        handleChangeMenuFinished: () => dispatch(actions.changeMenuFinished()),
    }),
)(ContentView);