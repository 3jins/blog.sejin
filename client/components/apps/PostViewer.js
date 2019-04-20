import React, { Component } from 'react';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../../actions';
import Nav from '../nav/Nav';
import ContentView from '../content/post-viewer/ContentView';
import Footer from '../footer/Footer';
import { getMenuHeight } from '../../../utils/unitConverter';

class PostViewer extends Component {
  constructor(props) {
    super(props);
    this.navPosition = null;
  }

  componentDidMount() {
    const { handleScroll } = this.props;
    window.addEventListener(
      'scroll',
      () => handleScroll(window.scrollY, window.innerHeight),
      true,
    );
    scrollToComponent(
      this.navPosition,
      {
        align: 'top',
        duration: 500,
        offset: -getMenuHeight(),
      },
    );
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Nav />
        <ContentView
          postNo={match.params.postNo}
          ref={(section) => {
            this.navPosition = section;
          }}
        />
        <Footer />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    handleScroll: (scrollY, subnavGetStickyFromHere) => dispatch(
      actions.scroll(scrollY, subnavGetStickyFromHere),
    ),
  }),
)(PostViewer);
