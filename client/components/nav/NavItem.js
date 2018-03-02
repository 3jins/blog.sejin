import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavItems extends Component {
    render() {
        const classNameForHover = this.props.isSelected ? 'selected' : 'unselected';
        const makeNavLink = (menuTitle, upperMenuTitle, menuIdx, onSelected) => {
            if (upperMenuTitle === '') {     // nav
                return (
                    <Link
                        to={["/nav", menuTitle].join('/')}
                        className={classNameForHover}>
                        {menuTitle}
                    </Link>
                );
            }
            else if (upperMenuTitle === "About") {   // subnav in About
                return (
                    <p
                        className="unselected"
                        onClick={() => onSelected(menuIdx)}>
                        {menuTitle}
                    </p>
                );
            }
            else {  // subnav in Works or Blog
                return (
                    <Link
                        to={["/nav", upperMenuTitle, menuTitle].join('/')}
                        className={classNameForHover}
                        onClick={() => onSelected(menuIdx)}>
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