import React, {Component} from 'react';
import {connect} from 'react-redux';
import {capitalizeFirstLetter} from "../../../../../server/utils/stringModifier";
import LoadingPreview from "../../LoadingView";

class BlogSubtitle extends Component {
    render() {
        const renderTags = (tagPayload, belongToMinor) => {
            if (!tagPayload || tagPayload.length === 0) {
                return <LoadingPreview isTable={false}/>
            }
            return tagPayload.map((tag) => {
                if (tag.belongToMinor === belongToMinor) {
                    return (
                        <div className="tag-div">
                            <h5 key={tag.tagName} title={tag.tagName} className="slur">
                                #{tag.tagName}
                            </h5>
                            <h5 className="count">
                                {"(" + tag.postList.length + ")"}
                            </h5>
                        </div>
                    );
                }
            });
        };

        return (
            <div className={["subtitle", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                <h3 className="slur">{capitalizeFirstLetter(this.props.belongToMinor)}</h3>
                {renderTags(this.props.tagPayload, this.props.belongToMinor)}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    () => ({}),
)(BlogSubtitle);