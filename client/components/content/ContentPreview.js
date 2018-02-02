import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
import {capitalizeFirstLetter} from "../../utils/stringModifier";

class ContentPreview extends Component {
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
                <td className={["content-preview", this.belongToMajor].join(' ')}>
                    <Markdown markup={this.content}/>
                    <div className={"read-more"}>
                        <a href="">Read more</a>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ContentPreview;