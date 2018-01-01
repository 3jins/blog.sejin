import React, {Component} from 'react';
import NavItem from './NavItem';

import { connect } from 'react-redux';
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

        const mapToComponent = (menuList, level) => {
            return menuList.map((navMenu, menuIdx) => {
                return <NavItem key={menuIdx} menuTitle={navMenu.title} menuIdx={menuIdx} onSelect={this.props.handleChangeMenu} level={level}/>
            });
        };

        return(
            <div className="nav">
                <table className="nav-menu-table">
                    <tbody>
                        <tr>
                            {mapToComponent(this.props.menuList, 0)}
                        </tr>
                    </tbody>
                </table>
                <table className="v-center-table"><tbody><tr><td>
                    ${' '}
                    <Typist avgTypingDelay={100} cursor={cursorOption}>
                        <Typist.Delay ms={1000} />
                        {this.props.titleForDesign}
                    </Typist>
                </td></tr></tbody></table>
                <div className="sub-nav">
                    <table className="sub-nav-menu-table">
                        <tbody>
                            <tr>
                                {mapToComponent(this.props.submenuList, 1)}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(actions, dispatch);
    return {
        handleChangeMenu: (menuIdx, level) => {dispatch(actions.changeMenu(menuIdx, level))},
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);