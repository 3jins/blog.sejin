import React, {Component} from 'react';
import ContentPreview from './ContentPreview';
import { capitalizeFirstLetter } from "../../utils/stringModifier";

class ContentPreviewBunch extends Component {
    constructor(props) {
        super(props);
        this.submenuTitle = props.submenuTitle;
        this.postList = props.postList;
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
        const mapToContentPreview = (postList) => {
            return postList.map((post) => {
                return <ContentPreview
                    key={post._id}
                    belongToMajor={post.belongToMajor}
                    belongToMinor={post.belongToMinor}
                    title={post.title}
                    content={post.content}
                    dataUpdated={post.dataUpdated}
                />
            });
        };

        return (
            <div className={["content-view", this.submenuTitle].join(' ')}>
                <h1>
                    {this.submenuTitle !== 'a.i.' && capitalizeFirstLetter(this.submenuTitle)}
                    {this.submenuTitle === 'a.i.' && "A.I."}
                        </h1>
                {this.postList.length === 0 &&
                    <div className={"content-preview"}>
                        <h2>There is no post :-O</h2>
                    </div>
                }
                {this.postList.length > 0 && mapToContentPreview(this.postList)}
            </div>
        );
    }
}

export default ContentPreviewBunch;