import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore } from 'redux';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

const prevCart = localStorage.getItem('user_cart');

let store = createStore(reducers, prevCart !== null ? { cart: JSON.parse(prevCart) } : undefined);

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
