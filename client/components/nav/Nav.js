import React, {Component} from 'react';
import NavItem from './NavItem';

import { connect } from 'react-redux';
import * as actions from '../../actions';


class Nav extends Component {
    render() {
        const mapToComponent = (menuList) => {
            return menuList.map((navMenu, menuIdx) => {
                return <NavItem key={menuIdx} menuTitle={navMenu['title']} menuIdx={menuIdx} />
            });
        };

        return(
            <div className="nav">
                <table>
                    <tbody>
                        <tr>
                            {mapToComponent(this.props.menuList)}
                        </tr>
                    </tbody>
                </table>
                <h1>$ whoami_</h1>
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