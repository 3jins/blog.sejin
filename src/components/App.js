import React, {Component} from 'react';
import Nav from './nav/Nav';
import Content from './content/Content';
import 'whatwg-fetch';
import './App.css';

class App extends Component {
    componentDidMount(){
        // fetch('/', {
        //     method: 'get',
        //     dataType: 'json',
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //         console.log(responseData);
        //         // this.setState({mans: responseData});
        //     })
        //     .catch((error)=>{
        //         console.log('Error fetching man',error);
        //     });
        fetch('/').then(
            (res) => {
                if(res.ok) {
                    console.log(res.toString());
                }
                else {
                    console.log(res.status);
                }
            },
            (err) => {
                console.log("Fetch failed ", err);
            }
        )
    }
    render() {
        return (
            <div>
                hello
                {/*<Nav/>*/}
                {/*<Content/>*/}
            </div>
        );
    }

    // render() {
    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <h1 className="App-title">Welcome to React</h1>
    //       </header>
    //       <p className="App-intro">
    //         To get started, edit <code>src/App.js</code> and save to reload.
    //       </p>
    //     </div>
    //   );
    // }
}

export default App;
