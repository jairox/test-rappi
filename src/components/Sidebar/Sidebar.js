import React, { Component } from 'react';
import Categories from '../../services/categories';
import { NavLink } from "react-router-dom";

function CategoryItem(props) {
    const cat = props.category;
    return <li>
        <NavLink activeClassName="is-active" to={"/categoria/" + cat.id}>{cat.name}</NavLink>
        <CategoryChildren category={cat}/>
    </li>
}

function CategoryChildren(props) {
    const children = props.category.sublevels;
    if (children && children.length > 0) {
        return (
            <ul>
                {children.map(cat => {
                   return <CategoryItem category={cat} key={cat.id}/>
                })}
            </ul>
        );
    }
    return null;
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        Categories.getAll().then(data => {
           this.setState({
               categories: data.categories
           });
        });
    }

    render() {
        return (
            <aside className="menu">
                <p className="menu-label">
                    Categorías
                </p>
                <ul className="menu-list">
                    {this.state.categories.map(cat => {
                        return (
                            <CategoryItem category={cat} key={cat.id}/>
                        );
                    })}
                </ul>
            </aside>
        );
    }
}

export default Sidebar;