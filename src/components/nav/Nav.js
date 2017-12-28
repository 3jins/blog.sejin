import React, {Component} from 'react';
import NavItem from './NavItem';

import { connect } from 'react-redux';
import * as actions from '../../actions';


class Nav extends Component {
    render() {
        const mapToComponent = (menuList) => {
            return menuList.map((navMenu, menuIdx) => {
                return <NavItem menuTitle={navMenu['navMenu']} menuIdx={menuIdx} contentMenuList={navMenu['contentMenu']}/>
            });
        };

        return(
            <div class="nav">
                <table>
                    <tr>
                        {mapToComponent(this.props.menuList)}
                        {/*<td>{this.props.menuList[0]['navMenu']}</td>*/}
                        {/*<td>Works</td>*/}
                        {/*<td>Blog</td>*/}
                        {/*<td>Contact</td>*/}
                    </tr>
                </table>
                <h1>$ whoami_</h1>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        menuList: state.menuExchanger.menuList,
        selectedNavMenu: state.menuExchanger.selectedNavMenu,
        selectedContentMenu: state.menuExchanger.selectedContentMenu,
    };
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(actions, dispatch);
    return {
        handleClickNavMenu: (menuIdx) => { dispatch(actions.clickNavMenu(menuIdx))},
        handleClickContentMenu: (menuIdx) => { dispatch(actions.clickContentMenu(menuIdx))},
        handleScroll: () => { dispatch(actions.scroll())}
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);