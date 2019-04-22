import React, {Component} from 'react';
import {sculptor, splitter} from "./MDSculptor";
import {decapitalizeFirstLetter} from "../../../../../utils/stringModifier";

class AboutContent extends Component {
    render() {
        const splitContent = splitter(this.props.content, this.props.belongToMinor);
        if(!splitContent) {
            console.log("[AboutContent] There is no splitContent");
            return null;
        }
        const sculptedContent = sculptor(splitContent, this.props.belongToMinor);

        return (
            <div className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                {sculptedContent}
            </div>
        );
    }
}

export default AboutContent;