import React, {Component} from 'react';
import NavItem from './NavItem';

import {connect} from 'react-redux';
import * as actions from '../../actions';

import Typist from 'react-typist';


class Nav extends Component {
    render() {
        const cursorOption = {
            show: true,
            blink: true,
            element: '_',
            hideWhenDone: false,
            hideWhenDoneDelay: 1000,
        };

        const mapMenuToComponent = (menuList, level) => {
            let onSelected = this.props.handleChangeMenu;
            if (level === 1) {
                onSelected = this.props.handleChangeSubmenu;
            }

            return menuList.map((navMenu, menuIdx) => {
                return <NavItem key={menuIdx} menuTitle={navMenu.title} menuIdx={menuIdx}
                                onSelected={onSelected}/>
            });
        };

        return (
            <div className="nav">
                <div className="main-nav">
                    <table className={["nav-menu-table", this.props.isNavSticky ? "sticky" : "unsticky"].join(' ')}>
                        <tbody>
                        <tr>
                            {mapMenuToComponent(this.props.menuList, 0)}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <table className="v-center-table">
                    <tbody>
                    <tr>
                        <td>
                            ${' '}
                            <Typist avgTypingDelay={100} cursor={cursorOption}>
                                <Typist.Delay ms={1000}/>
                                {this.props.titleForDesign}
                            </Typist>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="sub-nav">
                    <table className={["sub-nav-menu-table", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                        <tbody>
                        <tr>
                            {mapMenuToComponent(this.props.submenuList, 1)}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        selectedMenuIdx: state.menus.selectedMenuIdx,
        selectedSubmenuIdx: state.menus.selectedSubenuIdx,
        menuList: state.menus.menuList,
        submenuList: state.menus.menuList[state.menus.selectedMenuIdx].submenuList,
        titleForDesign: state.menus.menuList[state.menus.selectedMenuIdx].titleForDesign,
        isNavSticky: state.scrolls.areNavsSticky.isNavSticky,
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    };
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(actions, dispatch);
    return {
        handleChangeMenu: (menuIdx) => dispatch(actions.changeMenu(menuIdx)),
        handleChangeSubmenu: (submenuIdx) => {
            dispatch(actions.changeSubmenu(submenuIdx));
        },
        // handleStickNav: () => dispatch(actions.stickNav()),
        // handleUnstickNav: () => dispatch(actions.)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);