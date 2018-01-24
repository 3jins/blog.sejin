import React, {Component} from 'react';
import { Markdown } from 'react-showdown';
import { capitalizeFirstLetter } from "../../utils/stringModifier";

class ContentView extends Component {
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
        return (
            <div className={["content-view", this.belongToMajor].join(' ')}>
                {!this.isEmpty && <h1>{capitalizeFirstLetter(this.belongToMinor)}</h1>}
                {!this.isEmpty && <Markdown markup={this.content}/>}
                {this.isEmpty && <h2>There is no post :-O</h2>}
            </div>
        )
    }
}

export default ContentView;