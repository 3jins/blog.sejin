import React, {Component} from 'react';
import Nav from './nav/Nav';
import Contents from './content/Contents';
import {connect} from 'react-redux';
import * as actions from '../actions';
import 'whatwg-fetch';
import {emToPx} from "../utils/unitConverter";

class App extends Component {
    componentDidMount() {
        window.addEventListener(
            'scroll',
            () => this.props.handleScroll(window.scrollY, window.innerHeight - emToPx(5)),
            true
        );
    }
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

export default connect(
    () => ({}),
    (dispatch) => ({
        handleScroll: (scrollY, subnavGetStickyFromHere) => dispatch(actions.scroll(scrollY, subnavGetStickyFromHere)),
    }),
)(App);

// export default App;
