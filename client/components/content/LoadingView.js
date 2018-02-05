import React, {Component} from 'react';

class LoadingPreview extends Component {
    render() {
        if(this.props.isTable) {
            return (
                <tr>
                    <td>
                        <p>loading...</p>
                    </td>
                </tr>
            );
        }
        else {
            return (
                <div>
                    <p>loading...</p>
                </div>
            )
        }
    }
}

export default LoadingPreview;