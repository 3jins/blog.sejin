import React, {Component} from 'react';

class Contact extends Component {

    render() {
        return (
            <td>
                <a href={this.props.content}>
                    <img src={this.props.image}/>
                </a>
            </td>
        )
    }
}

export default Contact;