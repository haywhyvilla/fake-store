import { ActionTypes } from "../constants/action-types";
const intialState = {
    cartItems: [],
};


export const cartReducer = (state = intialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case ActionTypes.REMOVE_FROM_CART:
            const updatedCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
            return {
                ...state,
                cartItems: updatedCartItems,
            };
        default:
            return state;
    }
};