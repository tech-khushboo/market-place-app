import {
    SET_PRODUCT_LIST,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART
} from "./ActionTypes";
import axios from 'axios';

const API = 'https://fakestoreapi.com/products'

export const getProductList = (searchText) => {
    return (dispatch) => {
        let productList = [];
        dispatch(setProductList(productList));
        return axios.get(API)
            .then(response => {
                if (searchText) {
                    productList = response.data.filter(product => {
                        if (product.title.match(new RegExp(searchText, "gi")) || product.description.match(new RegExp(searchText, "gi"))) {
                            return true;
                        }
                    })
                } else {
                    productList = response.data
                }
                dispatch(setProductList(productList, searchText))
            })
            .catch(error => {
                dispatch(setProductList(productList))
            });
    }
}
export const setProductList = (productList, searchText) => {
    return {
        type: SET_PRODUCT_LIST,
        productList: productList,
        searchText: searchText
    }
}

export const addProductToCart = (productData) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        productData: productData
    }
}

export const removeProductFromCart = (productData) => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        productData: productData
    }
}