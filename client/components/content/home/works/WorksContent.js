import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {mdConverter} from "../../../../../server/utils/mdModifier";
import {decapitalizeFirstLetter} from "../../../../../server/utils/stringModifier";

class WorksContent extends Component {
    render() {
        return (
            <td id={this.props.postNo}
                className={["content-preview", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                <div className="content-preview-div">
                    <h1>{this.props.title}</h1>
                    {mdConverter(this.props.content)}
                </div>
                <div className="read-more">
                    <Link to={["/postviewer", this.props.postNo].join('/')}>Read more</Link>
                </div>
            </td>
        );
    }
}

export default WorksContent;