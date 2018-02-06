import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
import {Link} from 'react-router-dom'

class WorksPreview extends Component {
    render() {
        return (
            <tr>
                <td id={this.props.id} className={["content-preview", this.props.belongToMajor].join(' ')}>
                    <h1>{this.props.title}</h1>
                    <Markdown markup={this.props.content}/>
                    <div className={"read-more"}>
                        <Link to={["/postviewer", this.props.id].join('/')}>Read more</Link>
                    </div>
                </td>
            </tr>
        );
    }
}

export default WorksPreview;