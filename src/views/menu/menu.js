import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, Select, Tab, InputLabel, MenuItem } from '@mui/material';
import 'common/Common.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import { Checkbox } from '@mui/material';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMenu } from './menu.action';
import { TextField } from '@mui/material';
import { fetchTopping } from '../toppings/topping.action';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import OutlinedInput from '@mui/material/OutlinedInput';
import { addCartItem } from '../cart.slice';
import { FormControl } from "@mui/material";

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))
function Menu() {
  const dispatch = useDispatch();
  const toppings = useSelector((state) => state.Topping.toppings);
  const [num, setNum] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [cart, setCart] = useState([]);
  useEffect(() => {
    dispatch(fetchTopping());
  }, []);

  useEffect(() => {

    console.log(toppings)

  }, [toppings]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([])
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setSelectedValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  console.log("select", selectedValue)
  const AddCart = (data) => {

    setCart((oldcart) => {

      return [...oldcart, data]

    })

    dispatch(addCartItem(data));

  }
  const handleOrder = (Name, Itemprice, toppings) => {
    var price = 0;
    toppings.map((item) => {
      price = price + item.price;
    })
    price = price + Itemprice;
    console.log(price + Itemprice);
    console.log(quantity);
    var data = {
      "name": Name,
      "price": price,
      "quantity": quantity
    };
    setNum(num + 1);
    AddCart(data);
  }
  console.log("asdf", cart);
  const QuantityHandler = (event) => {
    setQuantity(event.target.value);
  }
  console.log("cart", cart);

  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log("selected value", selectedValue.price);

  const menus = useSelector((state) => state.Menu.menus);

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  useEffect(() => {

    console.log(menus)

  }, [menus]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '80%',
  });


  return (<>
  <Container >
    <div   className='app-container2'>
      <div className='paper'>
        <Card sx={{ display: 'flex', width: '70%' }} >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Good Food,Great Time
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              our chef's at wiwi make delicious food selections every week-you pick,we cook and deliver
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className='app-container'     >

        <Grid container spacing={3} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>

          {menus?.map(product =>
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 600,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ width: '80%' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {product.menuname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                      {product.menudescription}
                    </Typography>
                  </CardContent>
                  <Typography>${product.menuprice}</Typography>
                  <Button variant="contained" onClick={handleClickOpen} startIcon={<ControlPointIcon />}>
                    toppings
                  </Button>
                  <Dialog onClose={handleClose} open={open}>
                    <List sx={{ pt: 0 }}>
                      <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
                        <InputLabel>Select the Toppings</InputLabel>
                        <Select multiple value={selectedValue} onChange={handleChange} input={<OutlinedInput label="Tag" />}
                        >
                          {toppings?.map((m, i) => (
                            <MenuItem
                              key={i} value={{ "name": m.toppingname, "price": parseFloat(m.toppingprice) }}
                            >
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={m.toppingimg}>

                                </Avatar></ListItemAvatar>
                              <ListItemText primary={m.toppingname} secondary={m.toppingprice} /><Checkbox /></MenuItem>
                          ))}
                          <Button variant="contained" onClick={handleClose}>Done</Button>
                        </Select>
                      </FormControl>
                      <Tab />
                    </List></Dialog>

                  &nbsp;<TextField type="number" size="small" sx={{ width: 80 }} onChange={QuantityHandler} />
                  &nbsp;<Button variant='contained' onClick={() => handleOrder(product.menuname, product.menuprice, selectedValue)}  >Add</Button>
                </Box>
                <CardContent>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 200 }}
                  image={product.menuimage}
                  alt="Live from space album cover" />
              </Card>
            </Paper>

          )}

        </Grid>
      </div>
    </div>
    </Container>
  </>
  );

}

export default
  Menu;