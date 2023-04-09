'useStrict';

import { createBrowserRouter } from "react-router-dom";



import Main from "../pages/MainPage";
import GoodsPage from "../pages/GoodsPage";
import ErrorPage from "../pages/ErrorPage";
import ContactsPage from '../pages/ContactsPage'
import GoodPage from "../pages/GoodPage";



export const publicRoutes = createBrowserRouter([
    //{path: '/product/:id', element: <PostPage/>, exact:true},
    //{path: '/logout', element: <Logout/>, exact:true},
    {path: '/stores', element: <ContactsPage/>},
    {path: '/contacts', element: <ContactsPage/>},
    {path: '/goods', element: <GoodsPage/>},
    {path: '/good/:id', element: <GoodPage/>},
    {path: '/', element: <Main title='Главная'/>, exact:true},
    {path: '*', element: <ErrorPage/>, exact:true},
])


