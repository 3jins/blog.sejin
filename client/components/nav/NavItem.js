import React, {Component} from 'react';

class NavItems extends Component {
    constructor(props) {
        super(props);
        this.menuTitle = props.menuTitle;
        this.menuIdx = props.menuIdx;
        this.exchange = props.exchange;
    }

    componentWillReceiveProps(nextProps) {
        if(this.menuTitle !== nextProps.menuTitle) {
            this.menuTitle = nextProps.menuTitle;
        }
    }

    render() {
        return (
            <td>
                <p onClick={() => this.props.onSelected(this.menuIdx, this.props.exchange)}>
                    {this.menuTitle}
                </p>
            </td>
        );
    }
}

export default NavItems;