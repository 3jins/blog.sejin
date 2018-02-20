import React, {Component} from 'react';
import {mdConverter} from "../../../../server/utils/mdModifier";
import LoadingView from '../LoadingView';
import {decapitalizeFirstLetter} from "../../../../server/utils/stringModifier";

class ContentViewContent extends Component {
    render() {
        const renderContents = (postPayload) => {
            if (!postPayload || postPayload.length === 0) {
                return (
                    <td>
                        <LoadingView isTable={false}/>
                    </td>
                );
            }
            return (
                <td className={decapitalizeFirstLetter(this.props.belongToMajor)}>
                    <div>
                        <h1>{postPayload[0].title}</h1>
                        {mdConverter(postPayload[0].content)}
                    </div>
                </td>
            );
        };

        return (
            renderContents(this.props.postPayload)
        );
    }
}

export default ContentViewContent;