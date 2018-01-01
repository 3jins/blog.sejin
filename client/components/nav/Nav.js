import React, {Component} from 'react';
import NavItem from './NavItem';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import Typist from 'react-typist';


class Nav extends Component {
    // setTypist(typistProps) {
    //     return {
    //         ...typistProps,
    //         avgTypingDelay: 140,
    //         cursor: {
    //             ...cursor,
    //             element: '_'
    //         }
    //     }
    // }
    render() {
        const cursorOption = {
            show: true,
            blink: true,
            element: '_',
            hideWhenDone: false,
            hideWhenDoneDelay: 1000,
        };

        const mapToComponent = (menuList) => {
            return menuList.map((navMenu, menuIdx) => {
                return <NavItem key={menuIdx} menuTitle={navMenu['title']} menuIdx={menuIdx} />
            });
        };

        return(
            <div className="nav">
                <table className="nav-menu-table">
                    <tbody>
                        <tr>
                            {mapToComponent(this.props.menuList)}
                        </tr>
                    </tbody>
                </table>
                <table className="v-center-table"><tbody><tr><td>
                    <Typist avgTypingDelay={100} cursor={cursorOption}>
                        <Typist.Delay ms={1000} />
                        $ {this.props.menuList[this.props.selectedMenuIdx].titleForDesign}
                    </Typist>
                </td></tr></tbody></table>
                <div className="sub-nav">
                    <table className="sub-nav-menu-table">
                        <tbody>
                            <tr>
                                {mapToComponent(this.props.menuList[this.props.selectedMenuIdx].submenuList)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        menuList: state.menus.menuList,
        selectedMenuIdx: state.menus.selectedMenuIdx,
    };
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(actions, dispatch);
    return {
        handleChangeMenu: (menuIdx) => {dispatch(actions.changeMenu(menuIdx))},
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);