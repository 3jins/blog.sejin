import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingView from '../LoadingView';

class ContentViewSubtitle extends Component {
    // shouldComponentUpdate(nextProps) {
    //     return nextProps.tagPayload.length > 0 || (this.props.isSubnavSticky !== nextProps.isSubnavSticky);
    // }

    render() {
        const renderTags = (tags, belongToMinor) => {
            if (!tags || tags.length === 0) {
                return <LoadingView isTable={false}/>;
            }
            return tags.map((tag) => {
                if (tag.belongToMinor === belongToMinor) {
                    return (
                        <h5 key={tag.tagName}>
                            #{tag.tagName} ({tag.postList.length})
                        </h5>
                    );
                }
            });
        };

        return (
            <td className={["subtitle", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                <h3>{this.props.belongToMinor}</h3>
                {renderTags(this.props.tagPayload, this.props.belongToMinor)}
            </td>
        );
    }
}

export default ContentViewSubtitle = connect(
    (state) => ({
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    (dispatch) => ({}),
)(ContentViewSubtitle);