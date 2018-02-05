import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Nav from '../nav/Nav';
import ContentView from '../content/post-viewer/ContentView';
import Footer from '../footer/Footer';

class PostViewer extends Component {
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
                <ContentView postID={this.props.match.params.id}/>
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
