import React, {Component} from 'react';
import {decapitalizeFirstLetter} from "../../../../../build/utils/stringModifier";
import {sculptor, splitter} from "./MDSculptor";

class AboutContent extends Component {
    render() {
        const splitContent = splitter(this.props.content, this.props.belongToMinor);
        if(!splitContent) {
            console.log("[AboutContent] There is no splitContent");
            return null;
        }
        const sculptedContent = sculptor(splitContent, this.props.belongToMinor);

        return (
            <div className={"content-view-wrapper"}>
                <div className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                    {sculptedContent}
                </div>
            </div>
        );
    }
}

export default AboutContent;