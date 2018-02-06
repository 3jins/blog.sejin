import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Nav from '../nav/Nav';
import AboutContents from '../content/home/about/AboutContents';
import WorksContents from '../content/home/works/WorksContents';
import BlogContents from '../content/home/blog/BlogContents';
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
                    return <AboutContents/>;
                case 'Works':
                    return <WorksContents/>;
                case 'Blog':
                    return <BlogContents/>
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
