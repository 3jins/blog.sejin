import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom'

class ContentView extends Component {
    constructor(props) {
        super(props);
        this.belongToMajor = props.belongToMajor;
        this.belongToMinor = props.belongToMinor;
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.dataUpdated = props.dataUpdated;
    }

    render() {
        return (
            <Markdown markup={this.content}/>
        );
    }
}

export default ContentView;