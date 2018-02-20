import React, {Component} from 'react';
import {connect} from 'react-redux';
import {capitalizeFirstLetter} from "../../../../../server/utils/stringModifier";
import LoadingPreview from "../../LoadingView";

class BlogSubtitle extends Component {
    render() {
        const renderTags = (tagPayload, belongToMinor) => {
            console.log(tagPayload);
            if(!tagPayload || tagPayload.length === 0) {
                return <LoadingPreview isTable={false}/>
            }
            return tagPayload.map((tag) => {
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
                <h3>{capitalizeFirstLetter(this.props.belongToMinor)}</h3>
                {renderTags(this.props.tagPayload, this.props.belongToMinor)}
            </td>
        );
    }
}

export default connect(
    (state) => ({
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    () => ({}),
)(BlogSubtitle);