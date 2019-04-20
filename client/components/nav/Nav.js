import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import NavItem from './NavItem';
import * as actions from '../../actions';
import { menuList } from '../../constants';

const Nav = (props) => {
  const mapMenuToComponent = (menuList, selectedMenuIdx, handleChangeSubmenu, upperMenuTitle = '') => menuList.map((navMenu, menuIdx) => {
    let isSelected = false;
    if (selectedMenuIdx === menuIdx) {
      isSelected = true;
    }
    return (
      <NavItem
        key={navMenu.title}
        menuTitle={navMenu.title}
        menuIdx={menuIdx}
        isSelected={isSelected}
        upperMenuTitle={upperMenuTitle}
        onSelected={handleChangeSubmenu}
      />
    );
  });

  const {
    selectedMenuIdx,
    selectedSubmenuIdx,
    isNavSticky,
    isSubnavSticky,
    handleChangeSubmenu,
  } = props;

  const cursorOption = {
    show: true,
    blink: true,
    element: '_',
    hideWhenDone: false,
    hideWhenDoneDelay: 1000,
  };
  const { titleForDesign } = menuList[selectedMenuIdx];

  return (
    <div className="nav">
      <div className="main-nav">
        <div className={`nav-menu-table-wrapper ${isNavSticky ? 'sticky' : 'unsticky'}`}>
          <table className="nav-menu-table">
            <tbody>
              <tr>
                {mapMenuToComponent(menuList, selectedMenuIdx, handleChangeSubmenu)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <table className="v-center-table">
        <tbody>
          <tr>
            <td className="typed-td">
              {'$ '}
              <Typist key={titleForDesign} avgTypingDelay={100} cursor={cursorOption}>
                <Typist.Delay ms={1000} />
                {titleForDesign}
              </Typist>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="subnav">
        <div className={`subnav-menu-table-wrapper ${isSubnavSticky ? 'sticky' : 'unsticky'}`}>
          <table className="subnav-menu-table">
            <tbody>
              <tr>
                {menuList[selectedMenuIdx].title
                && mapMenuToComponent(
                  menuList[selectedMenuIdx].submenuList,
                  selectedSubmenuIdx,
                  handleChangeSubmenu,
                  menuList[selectedMenuIdx].title,
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Nav.propTypes = {
  selectedMenuIdx: PropTypes.number,
  selectedSubmenuIdx: PropTypes.number,
  isNavSticky: PropTypes.bool,
  isSubnavSticky: PropTypes.bool,
  handleChangeSubmenu: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  selectedMenuIdx: 0,
  selectedSubmenuIdx: 0,
  isNavSticky: false,
  isSubnavSticky: false,
};

export default connect(
  state => ({
    selectedMenuIdx: state.menus.selectedMenuIdx,
    selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
    isNavSticky: state.scrolls.areNavsSticky.isNavSticky,
    isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
  }),
  dispatch => ({
    handleChangeSubmenu: submenuIdx => dispatch(actions.changeSubmenu(submenuIdx)),
  }),
)(Nav);
