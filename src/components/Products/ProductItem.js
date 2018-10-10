import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProductItem.scss';

import { addCartItem } from '../../actions';

const mapDispatchToProps = dispatch => {
    return {
        addCartItem: prod => dispatch(addCartItem(prod))
    };
};

function AvailabilityTag(props) {

    return (
        <div className="product-meta">
            {props.available ?
                <span className="tag is-success">Disponible</span> :
                <span className="tag is-danger">No Disponible</span>
            }
            <span className="qty"><b>Qty: </b>{props.quantity}</span>
        </div>
    );
}

class ConnectedProductItem extends Component {

    addToCart() {
        console.log(this.props.product);
        this.props.addCartItem(this.props.product);
    }

    render() {
        return (
            <div className="column is-4">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src="https://via.placeholder.com/400x300" alt="Placeholder"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h2>{this.props.product.name}</h2>
                            <p>{this.props.product.price}</p>
                        </div>
                        <div>
                            <AvailabilityTag available={this.props.product.available} quantity={this.props.product.quantity}/>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="button is-primary" onClick={this.addToCart.bind(this)}>Agregar a carrito</button>
                    </div>
                </div>
            </div>
        );
    }
}

const ProductItem = connect(null, mapDispatchToProps)(ConnectedProductItem);

export default ProductItem;