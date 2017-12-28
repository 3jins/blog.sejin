import React, {Component} from 'react';


class NavItems extends Component {
    constructor(props) {
        super(props);
        this.menuTitle = props.menuTitle;
        this.menuIdx = props.menuIdx;
        this.contentMenuList = props.contentMenuList;
    }

    render() {
        return(
            <td>
                {this.menuTitle}
            </td>
        );
    }
}

export default NavItems;