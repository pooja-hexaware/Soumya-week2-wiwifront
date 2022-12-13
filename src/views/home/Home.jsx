import {React,useEffect} from 'react'
import { styled } from '@mui/system'
import { SimpleCard } from 'components'
import { useSelector,useDispatch } from 'react-redux'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { fetchRestaurant } from '../restaurant/restaurant.action';
import { Button, CardActionArea, CardActions,Card,Grid,Box } from '@mui/material';
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
const Home = () => {
    const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.Restaurant.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, []);

  useEffect(() => {

    console.log("h",restaurants)

  }, [restaurants]);
    const loading = useSelector((state) => state.loading)
    return <Container>
        <SimpleCard title="Welcome">
                {loading ? (
                    'Loading...'
                ) : (
                    <div >
                        Welcome to WIWI Capstone 
                    </div>
                )}
            </SimpleCard>
            <div   className='app-container1'>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {restaurants?.map(data =>
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.storeimage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.storename}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                     Location:{data.storeaddress}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Contact:{data.storephone}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" href='/menucard'>
                    View Menu
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
    </Container>
}

export default Home
