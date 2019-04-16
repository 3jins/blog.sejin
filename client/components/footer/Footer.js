import React, {Component} from 'react';
import Contact from './Contact';
import githubImg from '../../res/images/github_white.png';
import facebookImg from '../../res/images/facebook_white.png';
import linkedinImg from '../../res/images/linkedin_white.png';
import mailImg from '../../res/images/mail_white.png';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.contacts = [
            {
                // title: 'GitHub',
                image: githubImg,
                content: 'https://github.com/3jins',
            },
            {
                // title: 'Facebook',
                image: facebookImg,
                content: 'https://facebook.com/jinaidy',
            },
            {
                // title: 'Linkedin',
                image: linkedinImg,
                content: 'https://www.linkedin.com/in/sejin-jeon-65b9b8152/',
            },
            {
                // title: 'Mail',
                image: mailImg,
                content: 'mailto://jinaidy93@gmail.com',
            },
        ];
    }

    render() {
        const mapArrayToComponent = (contacts) => {
            return contacts.map((contact, idx) => {
                return (
                    <Contact key={idx} image={contact.image}
                             content={contact.content}/>
                );
            });
        };

        return (
            <div className="footer">
                <table className="v-center-table">
                    <tbody>
                    <tr>
                        <td>
                            <table className="contact-table">
                                <tbody>
                                <tr>
                                    <th colSpan={this.contacts.length}>
                                        <h1>Contact me</h1>
                                    </th>
                                </tr>
                                <tr>
                                    {mapArrayToComponent(this.contacts)}
                                </tr>
                                </tbody>
                            </table>
                            <p className="copyright">{'©'} 2018 Sejin Jeon. All rights reserved.</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Footer;