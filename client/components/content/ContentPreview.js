import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
import {capitalizeFirstLetter} from "../../utils/stringModifier";

class ContentPreview extends Component {
    constructor(props) {
        super(props);
        this.belongToMajor = props.belongToMajor;
        this.belongToMinor = props.belongToMinor;
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.dataUpdated = props.dataUpdated;
        this.onReadMore = props.onReadMore;
    }


    render() {
        return (
            <tr>
                <td id={this.id} className={["content-preview", this.belongToMajor].join(' ')}>
                    <Markdown markup={this.content}/>
                    <div className={"read-more"}>
                        <p onClick={() => this.onReadMore('/post', this.id)}>Read more</p>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ContentPreview;