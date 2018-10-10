import React, { Component } from 'react';
import { connect } from "react-redux";
import './Cart.scss';
import CartIcon from '../../assets/shopping-cart-solid.svg';
import CartItem from './CartItem';

const mapStateToProps = state => {
    return { cart: state.cart };
};

class ConnectedCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleCart() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return  (
            <div className={`navbar-item has-dropdown ${this.state.isOpen ? 'is-active' : ''}`}>
                <a className="navbar-link" onClick={this.toggleCart.bind(this)}>
                    <img className="cart-icon" src={CartIcon} alt="Cart"/>
                </a>
                <div className="navbar-dropdown cart-dropdown">
                    {this.props.cart.items.length > 0 ? (
                            <div>
                                {this.props.cart.items.map((item, index) => <CartItem index={index} item={item} key={item.id}/>)}
                                <div className="navbar-item">
                                    <b>Total: ${this.props.cart.total}</b>
                                </div>
                            </div>
                        ) :
                        <div className="navbar-item">
                            El carrito está vacío
                        </div>
                    }
                </div>
            </div>
        );
    }
}
const Cart = connect(mapStateToProps)(ConnectedCart);
export default Cart;
