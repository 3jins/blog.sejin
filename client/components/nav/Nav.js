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

        const mapMenuToComponent = (menuList, level, selectedMenuIdx = 0) => {
            // let exchange = false;
            // if (level === 1 && selectedMenuIdx > 0) {
            //     exchange = true;
            // }
            return menuList.map((navMenu, menuIdx) => {
                return <NavItem key={menuIdx} level={level} menuTitle={navMenu.title} menuIdx={menuIdx}
                                onSelected={this.props.handleChangeSubmenu}/>
            });
        };

        return (
            <div className="nav">
                <div className="main-nav">
                    <div
                        className={["nav-menu-table-wrapper", this.props.isNavSticky ? "sticky" : "unsticky"].join(' ')}>
                        <table className="nav-menu-table">
                            <tbody>
                            <tr>
                                {mapMenuToComponent(this.props.menuList, 0)}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <table className="v-center-table">
                    <tbody>
                    <tr>
                        <td className="typed-td">
                            ${' '}
                            <Typist key={this.props.titleForDesign} avgTypingDelay={100} cursor={cursorOption}>
                                <Typist.Delay ms={1000}/>
                                {this.props.titleForDesign}
                            </Typist>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="subnav">
                    <div
                        className={["subnav-menu-table-wrapper", this.props.isSubnavSticky ? "sticky" : "unsticky"].join(' ')}>
                        <table className="subnav-menu-table">
                            <tbody>
                            <tr>
                                {mapMenuToComponent(this.props.submenuList, 1, this.props.selectedMenuIdx)}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    (state) => ({
        selectedMenuIdx: state.menus.selectedMenuIdx,
        selectedSubmenuIdx: state.menus.selectedSubenuIdx,
        menuList: state.menus.menuList,
        submenuList: state.menus.menuList[state.menus.selectedMenuIdx].submenuList,
        titleForDesign: state.menus.menuList[state.menus.selectedMenuIdx].titleForDesign,
        isNavSticky: state.scrolls.areNavsSticky.isNavSticky,
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    (dispatch) => ({
        handleChangeSubmenu: (submenuIdx) => {
            dispatch(actions.changeSubmenu(submenuIdx));
        },
    }),
)(Nav);