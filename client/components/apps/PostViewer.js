import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../actions';
import Nav from '../nav/Nav';
import ContentView from '../content/post-viewer/ContentView';
import Footer from '../footer/Footer';
import {getMenuHeight} from "../../utils/unitConverter";

class PostViewer extends Component {
    constructor(props) {
        super(props);
        this.navPosition = null;
    }

    componentDidMount() {
        window.addEventListener(
            'scroll',
            () => this.props.handleScroll(window.scrollY, window.innerHeight),
            true
        );
        scrollToComponent(
            this.navPosition,
            {
                align: 'top',
                duration: 500,
                offset: -getMenuHeight(),
            }
        );
    }
    render() {
        return (
            <div>
                <Nav/>
                <ContentView
                    postID={this.props.match.params.id}
                    ref={(section) => {
                        this.navPosition = section;
                    }}
                />
                <Footer/>
            </div>
        );
    }
}

export default PostViewer = connect(
    () => ({}),
    (dispatch) => ({
        handleScroll: (scrollY, subnavGetStickyFromHere) => dispatch(actions.scroll(scrollY, subnavGetStickyFromHere)),
    }),
)(PostViewer);
