import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Markdown } from 'react-showdown';
import { capitalizeFirstLetter } from "../../../../utils/stringModifier";

class AboutContent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.belongToMajor = props.belongToMajor;
    //     this.belongToMinor = props.belongToMinor;
    //     this.title = props.title;
    //     this.content = props.content;
    //     this.dataUpdated = props.dataUpdated;
    // }

    render() {
        return (
            <tr>
                <td className={["subtitle", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                    <h3>{capitalizeFirstLetter(this.props.belongToMinor)}</h3>
                </td>
                <td className={["content-body", this.props.belongToMajor].join(' ')}>
                    <Markdown markup={this.props.content}/>
                </td>
            </tr>
        );
    }
}

export default connect(
    (state) => ({
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    () => ({}),
)(AboutContent);