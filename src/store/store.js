import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
import RestaurantReducer from '../views/restaurant/restaurant.slice'
import ToppingReducer from '../views/toppings/topping.slice'
import MenuReducer from '../views/menu/menu.slice'
import CartReducer from '../views/cart.slice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        Restaurant:RestaurantReducer,
        Menu:MenuReducer,
        Topping:ToppingReducer,
        Cart:CartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
