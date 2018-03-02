import React, {Component} from 'react';
import {connect} from 'react-redux';
import {capitalizeFirstLetter, decapitalizeFirstLetter} from "../../../../../server/utils/stringModifier";

class AboutContents extends Component {
    render() {
        return (
            <div className={[decapitalizeFirstLetter(this.props.belongToMajor), "subtitle", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                <h3 className="slur">{capitalizeFirstLetter(this.props.belongToMinor)}</h3>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    () => ({}),
)(AboutContents);