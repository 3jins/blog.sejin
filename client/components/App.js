import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'whatwg-fetch';

import * as actions from '../actions';
import Nav from './nav/Nav';
import Contents from './content/Contents';
import Footer from './footer/Footer';


class App extends Component {
    componentDidMount() {
        window.addEventListener(
            'scroll',
            () => this.props.handleScroll(window.scrollY, window.innerHeight),
            true
        );
    }
    render() {
        return (
            <div>
                <Nav/>
                <Contents/>
                <Footer/>
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
