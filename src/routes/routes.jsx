import NotFound from 'views/sessions/NotFound'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
import menuRoutes from 'views/menu/MenuRoutes'

export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [...homeRoutes, ...menuRoutes]
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '/',
            element: <Navigate to="menucard" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
