import { combineReducers } from 'redux'
import Product from './Product'
const reducer = combineReducers({
    productState: Product,
})

export default reducer;