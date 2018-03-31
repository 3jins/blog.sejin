import React, {Component} from 'react';
import {connect} from 'react-redux';
import {capitalizeFirstLetter, removeQueryParameters} from "../../../../../utils/stringModifier";
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
                            <a href={"?tag=" + tag.tagName}>
                                <h5
                                    key={tag.tagName}
                                    className={["slur", this.props.selectedTag === tag.tagName ? "selected" : "unselected"].join(' ')}
                                    title={tag.tagName}>
                                    #{tag.tagName}
                                </h5>
                                <h5 className="count">
                                    {"(" + tag.postList.length + ")"}
                                </h5>
                            </a>
                        </div>
                    );
                }
            });
        };

        return (
            <div className={["subtitle", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                <h3 className="slur">
                    <a href={removeQueryParameters()}>
                        {capitalizeFirstLetter(this.props.belongToMinor)}
                    </a>
                </h3>
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