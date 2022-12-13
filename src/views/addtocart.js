import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { addCartItem } from './cart.slice';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
export default function AddtoCart() {
    const cartItems = useSelector(state => state.Cart.cartItems);
    const [state, setState] = React.useState({
        right: false,
    });
    let quantity = Object.values(cartItems).reduce((a, b) => a = a + b.quantity, 0)
    var total=0;

for (var i = 0; i < cartItems.length; ++i) {
    total += cartItems[i];
}

console.log("tt",total);
     let price = Object.values(cartItems).map(a=>a.price);
     

     let TotalPrice=price*quantity;
     console.log("pirce",price);
    console.log("quantity", quantity);
    console.log("quantity2", Object.values(cartItems));
    console.log("quantity1", Object.entries(cartItems));
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
   
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <Typography>Your Cart</Typography><br></br><br />
                        <Badge badgeContent={quantity} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        <Paper sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 700,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}>


                            {(quantity == 0) ? (
                                <Card>
                                <Typography component="div" variant="h5">Your cart is empty</Typography>
                                <Button href='menucard' variant='contained'>Add Your favourite food</Button>
                                </Card>
                            ) : (

                                <List sx={{
                                    pt: 0, width: 500,
                                    height: 128,
                                }}>
                                    <Typography component="div" variant="h5">Your cart 
                                        
                                    </Typography>
                                     
                                    <ListItem>
                                        <ListItemText primary="Name" />
                                        <ListItemText primary="Price" />
                                        <ListItemText primary="Quantity" />

                                    </ListItem>
                                    {Object.entries(cartItems).map(([item, details]) => (
                                        <ListItem button key={item}>
                                            <ListItemText primary={item} />
                                            <ListItemText primary={"$" + details.price} />
                                            <ListItemText primary={details.quantity} />
                                        </ListItem>

                                    ))}<Divider />
                                    <Typography sx={{ ml: 1, color: 'orangered' }}>TotalPrice: ${TotalPrice}</Typography>
                                     <Typography sx={{ ml: 30 }} component='div' variant='h6'>
                                        <Button onClick={toggleDrawer(anchor, false)} color="error" variant='contained'>Close</Button></Typography>
               
                                </List>
                            )}
                        </Paper>
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}