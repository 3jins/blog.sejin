import React, {Component} from 'react';
import {highlightCode, mdConverter} from "../../../../server/utils/mdModifier";
import LoadingView from '../LoadingView';
import {decapitalizeFirstLetter} from "../../../../server/utils/stringModifier";
import FacebookProvider, {Comments} from 'react-facebook';

class ContentViewContent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.highlightCode = highlightCode.bind(this);
    // }

    // componentDidMount() { highlightCode(); }
    // componentDidUpdate() { highlightCode(); }

    render() {
        const renderContents = (postPayload) => {
            if (!postPayload || postPayload.length === 0) {
                return (
                    <div>
                        <LoadingView isTable={false}/>
                    </div>
                );
            }
            const postTitle = postPayload[0].title;
            const postContent = mdConverter(postPayload[0].content);
            return (
                <div className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                    <div ref={element => highlightCode(element)}>
                        <h1>{postTitle}</h1>
                        {postContent}
                    </div>
                    <div className="fb-comments-wrapper">
                        <FacebookProvider appId="1662680190479239" language="ko_KR">
                            <Comments
                                className="fb-comments"
                                href={window.location.href + "/postviewer/" + this.props.postNo}
                                width="100%"
                                numPosts={10}
                            />
                        </FacebookProvider>
                    </div>
                </div>
            );
        };

        return (
            renderContents(this.props.postPayload)
        );
    }
}

export default ContentViewContent;