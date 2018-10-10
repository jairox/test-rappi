import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "../constants";

const initialState = {
    items: [],
    total: 0
};

function persistCart(cart) {
    localStorage.setItem('user_cart', JSON.stringify(cart));
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            let currentTotal = state.total;
            let itemPrice = Number(action.payload.price.replace(/[^0-9.-]+/g,""));
            const cart = {
                ...state,
                items: state.items.concat(action.payload),
                total: currentTotal + itemPrice
            };
            persistCart(cart);
            return cart;
        case REMOVE_CART_ITEM:
            let nCurrentTotal = state.total;
            let nItemPrice = Number(state.items[action.payload].price.replace(/[^0-9.-]+/g,""));
            const newCart = {
                ...state,
                items: [
                    ...state.items.slice(0, action.payload),
                    ...state.items.slice(action.payload + 1)
                ],
                total: nCurrentTotal - nItemPrice
            };
            persistCart(newCart);
            return newCart;
        default:
            return state;
    }
};
export default cartReducer;