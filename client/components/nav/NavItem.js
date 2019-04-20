import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItems = (props) => {
  const makeNavLink = (menuTitle, menuIdx, onSelected, isSelected) => {
    const classNameForHover = isSelected ? 'selected' : 'unselected';
    return (
      <Link to={`/nav/${menuTitle}`} className={classNameForHover}>
        {menuTitle}
      </Link>
    );
  };

  const makeSubnavLink = (menuTitle, upperMenuTitle, menuIdx, onSelected, isSelected) => {
    if (upperMenuTitle === 'About') { // About
      return <p className="unselected" onClick={() => onSelected(menuIdx)}>{menuTitle}</p>;
    }

    // Works or Blog
    const classNameForHover = isSelected ? 'selected' : 'unselected';
    return (
      <Link
        to={`/nav/${upperMenuTitle}/${menuTitle}`}
        className={classNameForHover}
        onClick={() => onSelected(menuIdx)}
      >
        {menuTitle}
      </Link>
    );
  };

  const {
    isSelected,
    menuTitle,
    upperMenuTitle,
    menuIdx,
    onSelected,
  } = props;

  if (upperMenuTitle === '') return <td>{makeNavLink(menuTitle, menuIdx, onSelected, isSelected)}</td>;
  return <td>{makeSubnavLink(menuTitle, upperMenuTitle, menuIdx, onSelected, isSelected)}</td>;
};

NavItems.propTypes = {
  isSelected: PropTypes.bool,
  menuTitle: PropTypes.string,
  upperMenuTitle: PropTypes.string,
  menuIdx: PropTypes.number,
  onSelected: PropTypes.func.isRequired,
};

NavItems.defaultProps = {
  isSelected: false,
  menuTitle: '',
  upperMenuTitle: '',
  menuIdx: 0,
};

export default NavItems;
