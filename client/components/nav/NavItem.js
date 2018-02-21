import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavItems extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.menuTitle !== nextProps.menuTitle) {
            this.menuTitle = nextProps.menuTitle;
        }
    }

    render() {
        const makeNavLink = (menuTitle, upperMenuTitle, menuIdx, onSelected) => {
            if (upperMenuTitle === '') {     // nav
                return (
                    <Link to={["/nav", menuTitle].join('/')} onClick={() => onSelected(menuIdx)}>
                        {menuTitle}
                    </Link>
                );
            }
            else if (upperMenuTitle === "About") {   // subnav in About
                return (
                    <p onClick={() => onSelected(menuIdx)}>
                        {menuTitle}
                    </p>
                );
            }
            else {  // subnav in Works or Blog
                return (
                    <Link to={["/nav", upperMenuTitle, menuTitle].join('/')} onClick={() => onSelected(menuIdx)}>
                        {menuTitle}
                    </Link>
                );
            }
        };

        return (
            <td>
                {makeNavLink(
                    this.props.menuTitle,
                    this.props.upperMenuTitle,
                    this.props.menuIdx,
                    this.props.onSelected
                )}
            </td>
        );
    }
}

export default NavItems;