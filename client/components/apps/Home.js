import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Nav from '../nav/Nav';
import About from '../content/home/about/About';
import Works from '../content/home/works/Works';
import Blog from '../content/home/blog/Blog';
import Footer from '../footer/Footer';

class Home extends Component {
    componentDidMount() {
        window.addEventListener(
            'scroll',
            () => this.props.handleScroll(window.scrollY, window.innerHeight),
            true
        );
    }
    render() {
        const renderContents = (menuTitle) => {
            if(typeof menuTitle === 'undefined') {
                menuTitle = 'About';
            }
            switch(menuTitle) {
                case 'About':
                    return <About/>;
                case 'Works':
                    return <Works/>;
                case 'Blog':
                    return <Blog/>;
            }
        };

        return (
            <div>
                <Nav/>
                {renderContents(this.props.match.params.title)}
                <Footer/>
            </div>
        );
    }
}

export default Home = connect(
    () => ({}),
    (dispatch) => ({
        handleScroll: (scrollY, subnavGetStickyFromHere) => dispatch(actions.scroll(scrollY, subnavGetStickyFromHere)),
    }),
)(Home);