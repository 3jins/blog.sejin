import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// registerServiceWorker();