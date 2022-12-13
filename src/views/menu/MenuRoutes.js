import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'
import Menu from './menu'

const Home = Loadable(lazy(() => import('./menu')))

const menuRoutes = [
    {
        path: '/menucard',
        element: < Menu/>,
    },
  
]

export default menuRoutes
