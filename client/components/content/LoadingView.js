import React, {Component} from 'react';
import loadingCat from '../../res/images/loading_cat.gif';

class LoadingView extends Component {
    render() {
        return (
            <div className='loading-view-div'>
                <img src={loadingCat}/>
                <h3>Loading...</h3>
            </div>
        );
    }
}

export default LoadingView;