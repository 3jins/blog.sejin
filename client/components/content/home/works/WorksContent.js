import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {mdConverter} from "../../../../../server/utils/mdModifier";
import {decapitalizeFirstLetter} from "../../../../../server/utils/stringModifier";
import {highlightCode} from "../../../../../server/utils/mdModifier";

class WorksContent extends Component {
    render() {
        return (
            <div className={"content-view-wrapper"}>
                <div id={this.props.postNo}
                     className={["content-view", decapitalizeFirstLetter(this.props.belongToMajor)].join(' ')}>
                    <Link className={"react-router-link"} to={["/postviewer", this.props.postNo].join('/')}>
                        <div className="content-preview" ref={element => highlightCode(element)}>
                            <h1>{this.props.title}</h1>
                            {mdConverter(this.props.content)}
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default WorksContent;