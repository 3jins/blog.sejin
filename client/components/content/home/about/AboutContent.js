import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
import {decapitalizeFirstLetter} from "../../../../../build/utils/stringModifier";

class AboutContent extends Component {
    render() {
        return (
            <div className={"content-view-wrapper"}>
                <div className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                    <Markdown markup={this.props.content}/>
                </div>
            </div>
        );
    }
}

export default AboutContent;