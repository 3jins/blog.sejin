import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {translateTable} from "../../../../utils/mdModifier";

class WorksPreview extends Component {
    render() {
        return (
            <tr>
                <td id={this.props.id} className={["content-preview", this.props.belongToMajor].join(' ')}>
                    <h1>{this.props.title}</h1>
                    {translateTable(this.props.content)}
                    <div className={"read-more"}>
                        <Link to={["/postviewer", this.props.id].join('/')}>Read more</Link>
                    </div>
                </td>
            </tr>
        );
    }
}

export default WorksPreview;