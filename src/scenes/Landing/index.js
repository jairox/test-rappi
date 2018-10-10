import React, { Component } from 'react';
import Hero from '../../components/Hero/Hero';
import Sidebar from '../../components/Sidebar/Sidebar';
import Products from '../../components/Products/Products';
import Categories from "../../services/categories";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategory: null
        };
    }

    loadCategory(id = null) {
        if ( id ) {
            Categories.get(id).then(cat => {
                this.setState({
                    activeCategory: cat
                });
            });
        } else
            this.setState({
                activeCategory: null
            })
    }

    componentWillReceiveProps(newProps) {
        this.loadCategory(newProps.match.params.id);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.loadCategory(params.id);
    }

    render() {
        return (
            <div>
                <Hero category={this.state.activeCategory}/>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-3">
                                <Sidebar/>
                            </div>
                            <div className="column is-9">
                                <Products category={this.state.activeCategory}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Landing;