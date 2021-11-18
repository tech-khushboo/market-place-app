import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import StackGrid from "react-stack-grid";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ProductCard from '../components/ProductCard';

import {
    getProductList,
    addProductToCart
} from '../actions/Product'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Product(props) {
    useEffect(() => {
        if (!props.productState.productList.length) {
            props.getProductList()
        }
    }, [])

    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const { productList } = props.productState

    let ProductListData = []

    if (productList.length == 0 && props.productState.searchText) {
        return (
            <Box sx={{ display: 'contents' }}>
                <center>No item found...</center>
            </Box>
        );
    } else if (productList.length == 0) {
        return (
            <Box sx={{ display: 'contents' }}>
                <center><CircularProgress /></center>
            </Box>
        );
    } else {
        productList.map(product => {
            ProductListData.push(
                <ProductCard data={product} addProductToCart={props.addProductToCart} setOpen={setOpen} setSelectedItem={setSelectedItem} />
            )
        })
    }

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {selectedItem} is successfully added in your cart!
                </Alert>
            </Snackbar>
            <StackGrid
                className="stackGrid"
                monitorImagesLoaded={true}
                columnWidth={350}
                gutterWidth={30}
                gutterHeight={30}
                duration={0}
            >
                {ProductListData}
            </StackGrid>
        </>
    );
}

const mapStateToProps = state => {
    return {
        productState: state.productState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductList: () => {
            return dispatch(getProductList())
        },
        addProductToCart: (data) => {
            return dispatch(addProductToCart(data))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);
