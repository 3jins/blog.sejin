import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import {Markdown} from 'react-showdown';
import LoadingView from '../LoadingView';

class ContentView extends Component {
    componentDidMount() {
        this.props.handleFetchPost('/post', this.props.postID);
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.postPayload.length > 0);
    }

    render() {
        return (
            <div className="content">
                <div className="content-view">
                    {this.props.postPayload.length === 0 &&
                    <LoadingView isTable={false}/>
                    }
                    {this.props.postPayload.length > 0 &&
                    <div>
                        <h1>{this.props.postPayload[0].title}</h1>
                        <Markdown markup={this.props.postPayload[0].content}/>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default ContentView = connect(
    (state) => ({
        postPayload: state.posts.postPayload,
        currentPostIdx: state.posts.currentPostIdx,
    }),
    (dispatch) => ({
        handleFetchPost: (url, postID) => {
            const pendingResult = dispatch(actions.fetchPost(url, postID));
            pendingResult.postPayload
                .then((response) => {
                    dispatch(actions.fetchSuccess(response));
                });
        },
    }),
)(ContentView);