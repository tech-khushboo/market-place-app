import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function CartList(props) {
    const theme = useTheme();

    return (
        <>
            <Card sx={{ display: 'flex', boxShadow: "none", padding: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: "contain", width: 150, height: "auto" }}
                    image={props.data.image}
                    alt={props.data.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {props.data.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Qty: 1&nbsp;&nbsp; | &nbsp;&nbsp;Price: ${props.data.price}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Button
                            onClick={() => {
                                props.removeProductFromCart(props.data)
                                props.setOpen(true)
                                props.setAlertType("warning")
                                props.setAlertMessage(`${props.data.title} is removed from your cart`)
                            }}
                            variant="text"
                            color="primary"
                        >Remove Item</Button>
                    </Box>
                </Box>
            </Card><Divider />
        </>
    );
}
