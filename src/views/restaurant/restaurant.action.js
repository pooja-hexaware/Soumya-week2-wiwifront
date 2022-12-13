import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const endPoint = 'Restaurant'

export const fetchRestaurant = createAsyncThunk('Restaurant/fetchRestaurant', async () => {
    const response = await axios.get('http://localhost:4000/restaurant');
    console.log("res",response);
    return response.data
})



