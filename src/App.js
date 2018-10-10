import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.scss';
import Landing from './scenes/Landing';
import Navbar from './components/Navbar/Navbar';

class App extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <div>
                        <Navbar/>
                        <Route exact path="/" component={Landing} />
                        <Route path="/categoria/:id" component={Landing} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
