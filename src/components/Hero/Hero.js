import React, { Component } from 'react';

class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'El Baratón'
        };
    }

    componentWillReceiveProps(newProps) {
        if ( newProps.category !== null )
            this.setState({
                title: newProps.category.name
            });
    }

    render() {
        return (
            <section className="hero is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            {this.state.title}
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}

export default Hero;