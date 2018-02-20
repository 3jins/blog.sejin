import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
import {decapitalizeFirstLetter} from "../../../../../server/utils/stringModifier";

class AboutContent extends Component {
    render() {
        return (
            <td className={["content-body", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                <Markdown markup={this.props.content}/>
            </td>
        );
    }
}

export default AboutContent;