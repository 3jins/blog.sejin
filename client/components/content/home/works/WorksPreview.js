import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {mdConverter} from "../../../../utils/mdModifier";
import {decapitalizeFirstLetter} from "../../../../utils/stringModifier";

class WorksPreview extends Component {
    render() {
        return (
            <tr>
                <td id={this.props.id} className={["content-preview", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                    <div>
                        <h1>{this.props.title}</h1>
                        {mdConverter(this.props.content)}
                    </div>
                    <div className={"read-more"}>
                        <Link to={["/postviewer", this.props.id].join('/')}>Read more</Link>
                    </div>
                </td>
            </tr>
        );
    }
}

export default WorksPreview;