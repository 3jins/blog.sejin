import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {mdConverter} from "../../../../../server/utils/mdModifier";
import {decapitalizeFirstLetter} from "../../../../../server/utils/stringModifier";

class BlogContent extends Component {
    render() {
        return (
            <div id={this.props.postNo}
                className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                <div className="content-preview">
                    <h1>{this.props.title}</h1>
                    {mdConverter(this.props.content)}
                </div>
                <div className="read-more">
                    <Link to={["/postviewer", this.props.postNo].join('/')}>Read more</Link>
                </div>
            </div>
        );
    }
}

export default BlogContent;