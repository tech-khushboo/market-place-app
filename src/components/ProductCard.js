import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const isLogin = localStorage.getItem("isLogin")

export default function ProductCard(props) {

    const addToCart = () => {
        if (!isLogin) {
            window.location = "/login"
        } else {
            props.addProductToCart(props.data)
            props.setSelectedItem(props.data.title)
            props.setOpen(true)
        }
    }

    return (
        <Card key={props.data.id} style={{ margin: 5 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={props.data.image}
                    alt={props.data.title}
                    style={{ width: 200, margin: "auto" }}
                />
                <CardContent style={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data.title}
                    </Typography>
                    <Rating name="half-rating-read" defaultValue={props.data.rating ? props.data.rating.rate : 0} precision={0.5} readOnly />
                    <Typography gutterBottom variant="h6" component="div">
                        Price: ${props.data.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() => addToCart()} startIcon={<AddShoppingCartIcon />} fullWidth variant="contained" size="small" color="primary">
                    Add To Cart
                </Button>
            </CardActions>
        </Card>
    );
}
