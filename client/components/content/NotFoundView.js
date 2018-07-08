import React, {Component} from 'react';

class LoadingView extends Component {
    render() {
        return (
            <div className='not-found-div'>
                <h2>We can't find the post that you requested.</h2>
                <h3>Neither does my girlfriend.</h3>
            </div>
        )
    }
}

export default LoadingView;