import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "../constants";

export const addCartItem = product => {
    return { type: ADD_CART_ITEM, payload: product }
};

export const removeCartItem = index => {
    return { type: REMOVE_CART_ITEM, payload: index }
};