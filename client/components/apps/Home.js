import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Helmet from "react-helmet/es/Helmet";
import * as actions from '../../actions';
import Nav from '../nav/Nav';
import About from '../content/mainmenu/about/About';
import Works from '../content/mainmenu/works/Works';
import Blog from '../content/mainmenu/blog/Blog';
import Footer from '../footer/Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    window.addEventListener(
      'scroll',
      () => this.props.handleScroll(window.scrollY, window.innerHeight),
      true,
    );
  }

  render() {
    const renderContents = (menuTitle, submenuTitle) => {
      if (typeof menuTitle === 'undefined') {
        menuTitle = 'About';
      }
      switch (menuTitle) {
        case 'Works':
          return <Works belongToMajor={menuTitle} belongToMinor={submenuTitle} />;
        case 'Blog':
          return <Blog belongToMajor={menuTitle} belongToMinor={submenuTitle} />;
        case 'About':
        default:
          return <About />;
      }
    };

    return (
      <div>
        {/*<Helmet>*/}
        {/*<meta property="og:url" content="http://enhanced.kr"/>*/}
        {/*</Helmet>*/}
        <Nav />
        {renderContents(this.props.match.params.title, this.props.match.params.subtitle)}
        <Footer />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    handleScroll: (scrollY, subnavGetStickyFromHere) => {
      dispatch(actions.scroll(scrollY, subnavGetStickyFromHere));
    },
  }),
)(Home);
