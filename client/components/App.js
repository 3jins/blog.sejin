import React, {Component} from 'react';
import Nav from './nav/Nav';
import Contents from './content/Contents';
import 'whatwg-fetch';

class App extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <Contents/>
                {/*<Footer/>*/}
            </div>
        );
    }
}

export default App;
