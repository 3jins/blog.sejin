import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {mdConverter} from "../../../../../utils/mdModifier";
import {decapitalizeFirstLetter} from "../../../../../utils/stringModifier";
import {highlightCode} from "../../../../../utils/mdModifier";

class BlogContent extends Component {
    render() {
        return (
            <div id={this.props.postNo}
                 className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                <Link className={"react-router-link"} to={["/postviewer", this.props.postNo].join('/')}>
                    <div className="content-preview" ref={element => highlightCode(element)}>
                        <h1>{this.props.title}</h1>
                        {mdConverter(this.props.content)}
                    </div>
                </Link>
            </div>
        );
    }
}

export default BlogContent;