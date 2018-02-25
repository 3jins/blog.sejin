import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

import Home from './components/apps/Home';
import AboutView from './components/content/home/about/AboutContent';
import Contents from './components/content/home/about/About';
import PostViewer from './components/apps/PostViewer';
import NoMatch from './components/apps/NoMatch';
import './index.sass';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/nav/:title/:subtitle?" component={Home}/>
                <Route path="/postviewer/:postNo" component={PostViewer}/>
                <Route component={NoMatch}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// registerServiceWorker();