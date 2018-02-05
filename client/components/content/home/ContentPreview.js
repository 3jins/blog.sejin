import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
import {Link} from 'react-router-dom'

class ContentPreview extends Component {
    constructor(props) {
        super(props);
        this.belongToMajor = props.belongToMajor;
        this.belongToMinor = props.belongToMinor;
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.dataUpdated = props.dataUpdated;
        // this.onReadMore = props.onReadMore;
    }


    render() {
        return (
            <tr>
                <td id={this.id} className={["content-preview", this.belongToMajor].join(' ')}>
                    <h1>{this.title}</h1>
                    <Markdown markup={this.content}/>
                    <div className={"read-more"}>
                        <Link to={["/postviewer", this.id].join('/')}>Read more</Link>
                        {/*<p onClick={() => this.onReadMore('/post', this.id)}>Read more</p>*/}
                    </div>
                </td>
            </tr>
        );
    }
}

export default ContentPreview;