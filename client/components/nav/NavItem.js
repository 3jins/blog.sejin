import React, {Component} from 'react';

class NavItems extends Component {
    constructor(props) {
        super(props);
        this.menuTitle = props.menuTitle;
        this.menuIdx = props.menuIdx;
        this.level = props.level;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.menuTitle !== this.props.menuTitle) {
            this.menuTitle = nextProps.menuTitle;
        }
    }

    render() {
        return(
            <td>
                <p onClick={() => this.props.onSelect(this.menuIdx, this.level)}>
                    {this.menuTitle}
                </p>
            </td>
        );
    }
}

export default NavItems;