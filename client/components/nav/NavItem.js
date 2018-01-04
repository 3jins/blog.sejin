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
        if(this.level === 0) {
            return (
                <td>
                    <a href={"/" + this.menuTitle}>
                        <p onClick={() => this.props.onSelect(this.menuIdx)}>
                            {this.menuTitle}
                        </p>
                    </a>
                </td>
            );
        }
        else {
            return (
                <td>
                    <p onClick={() => this.props.onSelect(this.menuIdx)}>
                        {this.menuTitle}
                    </p>
                </td>
            );
        }
    }
}

export default NavItems;