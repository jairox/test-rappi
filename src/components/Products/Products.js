import React, { Component } from 'react';
import ProductItem from './ProductItem';
import ProductFilters from './ProductFilters';
import ProductServices from "../../services/products";

function ProductSearch(props) {
    return (
        <div className="field">
            <label className="label">Buscar productos</label>
            {props.hide}
            <div className="control">
                <input className="input" type="text" placeholder="Buscar" onInput={props.onInput}/>
                <p className="help">Escribe más de 3 letras para buscar</p>
            </div>
        </div>
    )
}

function SortProducts(props) {

    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Ordenar:</label>
            </div>
            <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select onChange={props.onChange} value={props.value}>
                                <option value="" disabled>Seleccionar</option>
                                <option value="price">Precio: menor a mayor</option>
                                <option value="price:desc">Precio: mayor a menor</option>
                                <option value="quantity">Cantidad: menor a mayor</option>
                                <option value="quantity:desc">Cantidad: mayor a menor</option>
                                <option value="available:desc">Disponibilidad</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originalProducts: [],
            products: [],
            currentSort: '',
            showFilters: false
        };
    }

    loadProducts(category = null) {
        if ( category ) {
            ProductServices.getByCategory(category.id).then(products => {
                this.setState({
                    products: products,
                    originalProducts: products
                });
            });
        } else {
            ProductServices.getAll().then(data => {
                this.setState({
                    products: data.products,
                    originalProducts: data.products
                });
            });
        }
    }

    componentWillReceiveProps(newProps) {
        this.loadProducts(newProps.category);
    }

    sortProducts(event) {
        const sortBy = event.target.value;
        const sortByArr = sortBy.split(':');
        const attribute = sortByArr[0];
        const direction = sortByArr[1];
        const result = this.state.products.sort((a, b) => {
            //  If sorting by price, remove all formatting
            const valueA = attribute === 'price' ? Number(a[attribute].replace(/[^0-9.-]+/g,"")) : a[attribute];
            const valueB = attribute === 'price' ? Number(b[attribute].replace(/[^0-9.-]+/g,"")) : b[attribute];
            if ( direction && direction === 'desc' ) {
                if (valueA < valueB) {
                    return 1;
                }
                if (valueA > valueB) {
                    return -1;
                }
            } else {
                if (valueA < valueB) {
                    return -1;
                }
                if (valueA > valueB) {
                    return 1;
                }
            }
            return 0;
        });

        this.setState({
            products: result,
            currentSort: sortBy
        });
    }

    searchProductsByName(event) {
        const value = event.target.value.toLowerCase();
        if ( value.length > 2 ) {
            const result = this.state.products.filter(prod => prod.name.toLowerCase().includes(value));

            this.setState({
                products: result
            });
        } else {
            this.setState({
                products: this.state.originalProducts
            });
        }
    }

    toggleFilters() {
        this.setState({
            showFilters: !this.state.showFilters
        });
    }

    filterProducts(filters) {
        console.log(filters);
        if ( !filters.length ) {
            this.setState({
                products: this.state.originalProducts
            });

            return;
        }

        const result = this.state.products.filter(prod => {
           let result = true;

           for (let i = 0; i < filters.length; i++) {
               let filter = filters[i];

               if ( Array.isArray(filter.value) ) {

                   let values = filter.value;

                   if ( filter.attr === 'price' ) {
                       result = result && ( Number(prod[filter.attr].replace(/[^0-9.-]+/g,"")) >= values[0] && ( Number(prod[filter.attr].replace(/[^0-9.-]+/g,"")) < values[1] || values[1] === null ));
                   } else {
                       result = result && ( prod[filter.attr] >= values[0] && ( prod[filter.attr] < values[1] || values[1] === null ) );
                   }
               } else {
                   result = result && prod[filter.attr] === filter.value;
               }
           }

           return result;
        });

        console.log(result);

        this.setState({
            products: result
        });
    }

    render() {
        return (
            <div>
                <div className="columns is-multiline">
                    <div className="column is-5">
                        <SortProducts onChange={this.sortProducts.bind(this)} value={this.state.currentSort}/>
                    </div>
                    <div className="column is-2">
                        <button className="button is-primary" onClick={this.toggleFilters.bind(this)}>{ this.state.showFilters ? 'Ocultar filtros' : 'Ver filtros' }</button>
                    </div>
                    { this.state.showFilters ? (
                        <div className="column is-12">
                            <ProductFilters onFilter={this.filterProducts.bind(this)}/>
                        </div>
                    ) : '' }
                    { this.props.category && this.props.category.sublevels ? '' :
                        <div className="column is-12">
                            <ProductSearch onInput={this.searchProductsByName.bind(this)}/>
                        </div>
                    }
                </div>
                <div className="columns is-multiline">
                    {this.state.products.map(prod => {
                        return (
                            <ProductItem product={prod} key={prod.id}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Products;