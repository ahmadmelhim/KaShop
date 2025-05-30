import { createBrowserRouter } from 'react-router';
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import SendCode from './pages/sendcode/SendCode';
const routes= createBrowserRouter([
    {
        path:'/',
        element: <MainLayout />,
        errorElement:<ErrorPage />,
        children:[
            {
                path:'/',
                element :<Home />
            },
            {
                path:'/shop',
                element:<Shop /> 
            },
            {
                path:'/cart',
                element:<Cart />
            },
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/register',
                element:<Register />
            },
            {
                path:'/forgotPassword',
                element:<ForgotPassword />
            },
            {
                path:'/sendcode',
                element:<SendCode />
            }
        ]
    }
]);
export default routes;