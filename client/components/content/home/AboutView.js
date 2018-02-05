import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Markdown } from 'react-showdown';
import { capitalizeFirstLetter } from "../../../utils/stringModifier";

class ContentView extends Component {
    constructor(props) {
        super(props);
        this.belongToMajor = props.belongToMajor;
        this.belongToMinor = props.belongToMinor;
        this.title = props.title;
        this.content = props.content;
        this.dataUpdated = props.dataUpdated;
    }

    render() {
        return (
            <tr>
                <td className={["subtitle", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                    <h3>{capitalizeFirstLetter(this.belongToMinor)}</h3>
                </td>
                <td className={["content-body", this.belongToMajor].join(' ')}>
                    {!this.isEmpty &&
                    <Markdown markup={this.content}/>
                    }
                    {this.isEmpty &&
                    <div><h2>There is no post :-O</h2></div>
                    }
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
)(ContentView);