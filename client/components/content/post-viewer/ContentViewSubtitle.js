import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingView from '../LoadingView';
import {isContain} from "../../../../server/utils/arrayComparer";
import {capitalizeFirstLetter} from "../../../../build/utils/stringModifier";

class ContentViewSubtitle extends Component {
    render() {
        const renderTags = (tags, currentTags, belongToMinor) => {
            if (!tags || tags.length === 0) {
                return <LoadingView isTable={false}/>;
            }
            return tags.map((tag) => {
                if (tag.belongToMinor === belongToMinor) {
                    return (
                        <div className="tag-div">
                            <h5 key={tag.tagName}
                                className={["slur", isContain(currentTags, tag.tagName) ? "selected" : "unselected"].join(' ')}
                                title={tag.tagName}>
                                #{tag.tagName}
                            </h5>
                            <h5 className={["count", isContain(currentTags, tag.tagName) ? "selected" : "unselected"].join(' ')}>
                                {"(" + tag.postList.length + ")"}
                            </h5>
                        </div>
                    );
                }
            });
        };

        return (
            <div className={["subtitle", "post-viewer", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                <h3 className="slur">{capitalizeFirstLetter(this.props.belongToMinor)}</h3>
                {renderTags(this.props.tagPayload, this.props.currentTags, this.props.belongToMinor)}
            </div>
        );
    }
}

export default ContentViewSubtitle = connect(
    (state) => ({
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    (dispatch) => ({}),
)(ContentViewSubtitle);