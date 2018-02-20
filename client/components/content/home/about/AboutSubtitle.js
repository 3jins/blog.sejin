import React, {Component} from 'react';
import {connect} from 'react-redux';
import {capitalizeFirstLetter} from "../../../../../server/utils/stringModifier";

class AboutContents extends Component {
    render() {
        return (
            <td className={["subtitle", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                <h3>{capitalizeFirstLetter(this.props.belongToMinor)}</h3>
            </td>
        );
    }
}

export default connect(
    (state) => ({
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    () => ({}),
)(AboutContents);