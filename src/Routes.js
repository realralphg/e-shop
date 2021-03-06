import Home from './components/Views/Home'
import About from './components/Views/About'
import Checkout from './components/Views/Checkout'
import Admin from './components/Views/Admin'


import Overview from './components/Views/Overview'
import Products from './components/Views/Products'
import Profile from './components/Views/Profile'
import Orders from './components/Views/Orders'

export default [
    {
        path: '/', 
        name: 'home',
        component: Home
    },
    {
        path: '/about', 
        name: 'about',
        component: About
    },
    {
        path: '/checkout', 
        name: 'checkout',
        component: Checkout
    },
    {
        path: '/admin', 
        name: 'admin',
        component: Admin,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'overview', 
                name: 'overview',
                component: Overview
            },
            {
                path: 'products', 
                name: 'products',
                component: Products
            },
            {
                path: 'profile', 
                name: 'profile',
                component: Profile
            },            
            {
                path: 'orders', 
                name: 'orders',
                component: Orders
            },                      
        ]
    },    
 
]
