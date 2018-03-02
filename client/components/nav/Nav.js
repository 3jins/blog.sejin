import React, {Component} from 'react';
import NavItem from './NavItem';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Typist from 'react-typist';
import components from "../../constants";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.menuList = components.menuList;
    }

    render() {
        const cursorOption = {
            show: true,
            blink: true,
            element: '_',
            hideWhenDone: false,
            hideWhenDoneDelay: 1000,
        };
        const titleForDesign = this.menuList[this.props.selectedMenuIdx].titleForDesign;

        const mapMenuToComponent = (menuList, selectedMenuIdx, handleChangeSubmenu, upperMenuTitle = "") => {
            if (!menuList || menuList.length === 0) {
                console.log("[mapMenuToComponent] menuList is undefined or empty");
                return;
            }
            return menuList.map((navMenu, menuIdx) => {
                let isSelected = false;
                if (selectedMenuIdx === menuIdx) {
                    isSelected = true;
                }
                return <NavItem
                    key={menuIdx}
                    menuTitle={navMenu.title}
                    menuIdx={menuIdx}
                    isSelected={isSelected}
                    upperMenuTitle={upperMenuTitle}
                    onSelected={handleChangeSubmenu}
                />;
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
                                {mapMenuToComponent(
                                    this.menuList,
                                    this.props.selectedMenuIdx,
                                    this.props.handleChangeSubmenu
                                )}
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
                            <Typist key={titleForDesign} avgTypingDelay={100} cursor={cursorOption}>
                                <Typist.Delay ms={1000}/>
                                {titleForDesign}
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
                                {this.menuList[this.props.selectedMenuIdx].title &&
                                mapMenuToComponent(
                                    components.menuList[this.props.selectedMenuIdx].submenuList,
                                    this.props.selectedSubmenuIdx,
                                    this.props.handleChangeSubmenu,
                                    this.menuList[this.props.selectedMenuIdx].title
                                )}
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
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
        isNavSticky: state.scrolls.areNavsSticky.isNavSticky,
        isSubnavSticky: state.scrolls.areNavsSticky.isSubnavSticky,
    }),
    (dispatch) => ({
        handleChangeSubmenu: (submenuIdx) => {
            dispatch(actions.changeSubmenu(submenuIdx));
        },
    }),
)(Nav);