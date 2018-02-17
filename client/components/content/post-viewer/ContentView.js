import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import LoadingView from '../LoadingView';
import ContentViewContent from "./ContentViewContent";
import ContentViewSubtitle from "./ContentViewSubtitle";

class ContentView extends Component {
    constructor(props) {
        super(props);
        this.props.handleFetchPost('/post', this.props.postID);
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

        return (
            <div className="content">
                <div>
                    <table>
                        <tbody>
                        <tr>
                            {this.props.loading && <LoadingView isTable={true}/>}
                            {belongToMajor !== 'Works' &&
                            <ContentViewSubtitle
                                tagPayload={this.props.tagPayload}
                                belongToMinor={belongToMinor}
                            />}
                            <ContentViewContent
                                postPayload={this.props.postPayload}
                                belongToMajor={belongToMajor}
                            />
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ContentView = connect(
    (state) => ({
        postPayload: state.posts.postPayload,
        tagPayload: state.posts.tagPayload,
    }),
    (dispatch) => ({
        handleFetchPost: (url, postID) => {
            const pendingResult = dispatch(actions.fetchPost(url, postID));
            pendingResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });

            const pendedPostResult = dispatch(actions.fetchPost(url, postID));
            pendedPostResult.postPayload
                .then((postPayload) => {
                    const pendedTagResult = dispatch(actions.fetchTags('/tags', postPayload[0].belongToMinor));
                    pendedTagResult.tagPayload
                        .then((tagPayload) => {
                            dispatch(actions.fetchSuccess(postPayload, tagPayload));
                        })
                });
        },
    }),
)(ContentView);