import React from 'react';
import { connect } from "react-redux";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CartList from '../components/CartList';

import {
    removeProductFromCart
} from '../actions/Product'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cart(props) {

    const { cartData } = props.productState
    const [open, setOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState("success");
    const [alertMessage, setAlertMessage] = React.useState("Your order has been placed successfully!");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const placeOrder = () => {
        setOpen(true);
        setAlertType("success")
        setAlertMessage("Your order has been placed successfully!")
        setTimeout(() => { window.location = "/product" }, 2000)
    }

    let CartListData = [], TotalPrice = 0, TaxAmount = 0, ShippingPrice = 2;

    if (cartData.length == 0) {
        return (
            <Box sx={{ display: 'contents' }}>
                <center>No item found...</center>
            </Box>
        );
    } else {
        cartData.map(product => {
            TotalPrice = Number((Number(TotalPrice) + Number(product.price)).toFixed(2));
            CartListData.push(
                <CartList
                    data={product}
                    removeProductFromCart={props.removeProductFromCart}
                    setOpen={setOpen}
                    setAlertType={setAlertType}
                    setAlertMessage={setAlertMessage}
                />
            )
        })
    }

    TaxAmount = Number(((TotalPrice / 100) * 13).toFixed(2));

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Grid container>
                <Grid item xs={8} style={{ border: "1px solid #ccc", margin: 30 }}>
                    {CartListData}
                </Grid>
                <Grid item xs style={{ border: "1px solid #ccc", margin: 30, height: "fit-content", padding: 10 }}>
                    <Typography component="div" variant="h5">PRICE DETAILS</Typography><Divider />
                    <div style={{ display: "flex", marginTop: 10 }}>
                        <div style={{ flex: 1 }}>Price ({CartListData.length} items)</div>
                        <span>${TotalPrice}</span>
                    </div>
                    <div style={{ display: "flex", marginTop: 10 }}>
                        <div style={{ flex: 1 }}>Discount</div>
                        <span>$0</span>
                    </div>
                    <div style={{ display: "flex", marginTop: 10 }}>
                        <div style={{ flex: 1 }}>HST (13%)</div>
                        <span>${TaxAmount}</span>
                    </div>
                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
                        <div style={{ flex: 1 }}>Shipping</div>
                        <span>${ShippingPrice}</span>
                    </div>
                    <Divider />
                    <div style={{ display: "flex", fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
                        <div style={{ flex: 1 }}>Total Amount</div>
                        <span>${(TotalPrice + TaxAmount + ShippingPrice).toFixed(2)}</span>
                    </div>
                    <Divider />
                    <Button onClick={() => placeOrder()} style={{ marginTop: 10, marginBottom: 10 }} variant="contained" color="primary" fullWidth>Place Order</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const mapStateToProps = state => {
    return {
        productState: state.productState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeProductFromCart: (data) => {
            return dispatch(removeProductFromCart(data))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
