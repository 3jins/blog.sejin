import React from 'react';
import PropTypes from 'prop-types';
import { getParameterByName } from '../../../utils/stringModifier';
import { isEmpty } from '../../../utils/nullChecker';

const PageView = (props) => {
  const { page, numPosts, pageScale } = props;
  const isPageNeeded = numPosts > 10;
  if (!isPageNeeded) return null;

  const pages = [];
  const pageControlButtons = {
    prevBundle: '', prev: '', next: '', nextBundle: '',
  };
  const numPageBundle = 10;
  const pageStart = Math.floor(page / pageScale) * pageScale + 1;
  const finalPage = Math.floor(numPosts / pageScale) + 1;
  let isLast = false;

  const currentTag = getParameterByName('tag');
  const urlQueryBase = isEmpty(currentTag) ? '?page=' : `?tag=${currentTag}&page=`;
  for (let i = 0; i < numPageBundle; i++) {
    if (pageStart + i > finalPage) {
      isLast = true;
      break;
    }
    if (pageStart + i === page) {
      pages[i] = <span>{pageStart + i}</span>;
    } else {
      pages[i] = <a href={urlQueryBase + (pageStart + i)}>{pageStart + i}</a>;
    }
  }
  if (page > 1) {
    pageControlButtons.prev = <a href={urlQueryBase + (page - 1)}>{'<'}</a>;
  }
  if (page > 10) {
    pageControlButtons.prevBundle = <a href={urlQueryBase + (page - numPageBundle)}>{'<<'}</a>;
  }
  if (page < finalPage) {
    pageControlButtons.next = <a href={urlQueryBase + (page + 1)}>{'>'}</a>;
  }
  if (!isLast) {
    pageControlButtons.nextBundle = <a href={urlQueryBase + (page + numPageBundle)}>{'>>'}</a>;
  }

  return (
    <div className="pages">
      <p className="page-buttons">
        {pageControlButtons.prevBundle}
        {pageControlButtons.prev}
        {pages}
        {pageControlButtons.next}
        {pageControlButtons.nextBundle}
      </p>
      <p className="page-summary">
        Current page: {page} of <a href={urlQueryBase + finalPage}>{finalPage}</a>
      </p>
    </div>
  );
};

PageView.propTypes = {
  page: PropTypes.number,
  numPosts: PropTypes.number,
  pageScale: PropTypes.number,
};

PageView.defaultProps = {
  page: 1,
  numPosts: 0,
  pageScale: 10,
};

export default PageView;
