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
                        <h5 key={tag.tagName} className={isContain(currentTags, tag.tagName) ? "selected" : "unselected"}>
                            #{tag.tagName} ({tag.postList.length})
                        </h5>
                    );
                }
            });
        };

        return (
            <div className={["subtitle", "post-viewer", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                <h3>{capitalizeFirstLetter(this.props.belongToMinor)}</h3>
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