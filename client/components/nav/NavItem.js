import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavItems extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.menuTitle !== nextProps.menuTitle) {
            this.menuTitle = nextProps.menuTitle;
        }
    }

    render() {
        return (
            <td>
                {this.props.level === 0 &&
                <Link to={"/nav/" + this.props.menuTitle}>
                    {this.props.menuTitle}
                </Link>
                }
                {this.props.level > 0 &&
                <p onClick={() => this.props.onSelected(this.props.menuIdx)}>
                    {this.props.menuTitle}
                </p>
                }
            </td>
        );
    }
}

export default NavItems;