import React, {Component} from 'react';
import {connect} from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../actions';
import Nav from '../nav/Nav';
import ContentView from '../content/post-viewer/ContentView';
import Footer from '../footer/Footer';
import {getMenuHeight} from "../../../server/utils/unitConverter";
import Helmet from "react-helmet/es/Helmet";

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
        console.log(this.props.match.params.postNo);
        return (
            <div>
                <Helmet>
                    <meta property="og:url" content={"http://enhanced.kr/postviewer/" + this.props.match.params.postNo}/>
                </Helmet>
                <Nav/>
                <ContentView
                    postNo={this.props.match.params.postNo}
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
