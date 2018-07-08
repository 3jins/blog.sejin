import React, {Component} from 'react';

class LoadingView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.isFail) {
            return (
                <div className='not-found-div'>
                    <h2>We can't find the post that you requested.</h2>
                    <h3>Neither does my girlfriend.</h3>
                </div>
            )
        } else {
            return (
                <div className='not-found-div'>
                    <h2>¯\_(ツ)_/¯</h2>
                    <h3>There is no post yet.</h3>
                </div>
            )
        }
    }
}

export default LoadingView;