import React, {Component} from 'react';
import {highlightCode, mdConverter} from "../../../../utils/mdModifier";
import LoadingView from '../LoadingView';
import {decapitalizeFirstLetter} from "../../../../utils/stringModifier";
import FacebookProvider, {Comments} from 'react-facebook';
import {isEmpty} from "../../../../utils/nullChecker";

class ContentViewContent extends Component {
    render() {
        let url = window.location.href;
        if(url.length > 4 && url[4] === 's') {
            url = ['http', url.slice(5, url.length)].join('');
        }
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
            const tags = post[0].tags;
            const dateCreated = new Date(post[0].dateCreated);
            const dateInFormat = dateCreated.getFullYear() + "년 " + (dateCreated.getMonth() + 1) + "월 " + dateCreated.getDate() + "일";

            const renderTags = (tags) => {
                return tags.map((tag) => {
                    return <span>{" #" + tag}</span>;
                });
            };

            return (
                <div className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                    <div ref={element => highlightCode(element)}>
                        <div className="post-title-wrapper">
                            <h1>{postTitle}</h1>
                            <div className="post-meta-info">
                                <i className="far fa-calendar-alt"><span>{" " + dateInFormat}</span></i>
                                <i className="fas fa-tags">{renderTags(tags)}</i>
                            </div>
                        </div>
                        {postContent}
                    </div>
                    <div className="fb-comments-wrapper">
                        <FacebookProvider appId="1662680190479239" language="ko_KR">
                            <Comments
                                className="fb-comments"
                                href={url}
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