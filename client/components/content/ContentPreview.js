import React, {Component} from 'react';
import { Markdown } from 'react-showdown';
import { capitalizeFirstLetter } from "../../utils/stringModifier";

class ContentPreview extends Component {
    constructor(props) {
        super(props);
        this.belongToMajor = props.belongToMajor;
        this.belongToMinor = props.belongToMinor;
        this.title = props.title;
        this.content = props.content;
        this.dataUpdated = props.dataUpdated;
    }

    // componentWillMount() {
    //     this.content = Converter.makeHtml(this.content);
    //     console.log(this.content);
    // }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.title !== this.props.title) {
    //         this.title = nextProps.title;
    //     }
    // }

    render() {
        if(this.belongToMajor === 'About') {
            return (
                <div className={["content-preview", this.belongToMajor].join(' ')}>
                    <h1>{capitalizeFirstLetter(this.belongToMinor)}</h1>
                    <Markdown markup={this.content}/>
                </div>
            )
        }
        else if(this.belongToMajor === 'Contacts') {
            return (
                <div className={["content-preview", this.belongToMajor].join(' ')}>
                    <h1>{this.title}</h1>
                    <Markdown markup={this.content}/>
                </div>
            )
        }
        else {
            return (
                <div className={["content-preview", this.belongToMajor].join(' ')}>
                    <p>{this.title + ": " + this.content}</p>
                </div>
            )
        }
    }
}

export default ContentPreview;