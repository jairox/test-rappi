import React, { Component } from 'react';
import { connect } from "react-redux";
import TrashIcon from '../../assets/trash-alt-regular.svg';

import { removeCartItem } from '../../actions';

const mapDispatchToProps = dispatch => {
    return {
        removeCartItem: index => dispatch(removeCartItem(index))
    };
};

class ConnectedCartItem extends Component {

    removeCartItem() {
        this.props.removeCartItem(this.props.index);
    }

    render() {
        return (
            <div>
                <div className="navbar-item cart-item">
                    <b>{this.props.item.name}</b>
                    <span className="cart-item-price">{this.props.item.price}</span>
                    <a onClick={this.removeCartItem.bind(this)}>
                        <img className="trash-icon" src={TrashIcon} alt="Cart"/>
                    </a>
                </div>
                <hr className="navbar-divider"/>
            </div>
        );
    }
}

const CartItem = connect(null, mapDispatchToProps)(ConnectedCartItem);

export default CartItem;