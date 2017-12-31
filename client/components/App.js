import React, {Component} from 'react';
import Nav from './nav/Nav';
import Content from './content/Content';
import 'whatwg-fetch';

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    //
    // componentDidMount() {
    //     fetch('/dbdata', {
    //         method: 'get',
    //         dataType: 'json',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((responseData) => {
    //             // console.log(responseData.about.title);
    //             // this.props.menus = responseData.about.title;
    //             this.setState({menus: responseData});
    //         })
    //         .catch((error) => {
    //             console.log('Error fetching man', error);
    //         });
    // }

    render() {
        return (
            <div>
                <Nav/>
                <Content/>
            </div>
        );
    }

    // render() {
    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <img client={logo} className="App-logo" alt="logo" />
    //         <h1 className="App-title">Welcome to React</h1>
    //       </header>
    //       <p className="App-intro">
    //         To get started, edit <code>client/App.js</code> and save to reload.
    //       </p>
    //     </div>
    //   );
    // }
}

export default App;
