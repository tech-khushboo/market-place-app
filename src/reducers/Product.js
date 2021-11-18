import {
    SET_PRODUCT_LIST,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART
} from "../actions/ActionTypes";
const initialState = {
    productList: [],
    productDetails: {},
    searchText: null,
    cartData: []
}

const companyReducer = (state = initialState, action) => {
    let localState = Object.assign({}, state);
    switch (action.type) {
        case SET_PRODUCT_LIST:
            localState.productList = action.productList;
            localState.searchText = action.searchText
            return localState;
        case ADD_PRODUCT_TO_CART:
            localState.cartData.push(action.productData);
            return localState;
        case REMOVE_PRODUCT_FROM_CART:
            localState.cartData = localState.cartData.filter(product => product.id != action.productData.id);
            return localState;
        default:
            return state;
    }
}

export default companyReducer;