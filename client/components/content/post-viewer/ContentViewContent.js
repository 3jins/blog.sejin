import React, {Component} from 'react';
import {highlightCode, mdConverter} from "../../../../utils/mdModifier";
import LoadingView from '../LoadingView';
import {decapitalizeFirstLetter} from "../../../../utils/stringModifier";
import FacebookProvider, {Comments} from 'react-facebook';
import {isEmpty} from "../../../../utils/nullChecker";

class ContentViewContent extends Component {
    render() {
        const renderContents = (post) => {
            if (isEmpty(post)) {
                return (
                    <div>
                        <LoadingView isTable={false}/>
                    </div>
                );
            }
            const postTitle = post[0].title;
            const postContent = mdConverter(post[0].content);
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
                                href={window.location.href}
                                width="100%"
                                numPosts={10}
                            />
                        </FacebookProvider>
                    </div>
                </div>
            );
        };

        return (
            renderContents(this.props.post)
        );
    }
}

export default ContentViewContent;