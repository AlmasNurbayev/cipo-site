'useStrict';

import { createBrowserRouter } from "react-router-dom";



import Main from "../pages/MainPage";
import GoodsPage from "../pages/GoodsPage";
import ErrorPage from "../pages/ErrorPage";
import ContactsPage from '../pages/ContactsPage'
import GoodPage from "../pages/GoodPage";
import NewsPage from "../pages/NewsPage";

export const publicRoutes = createBrowserRouter([
    //{path: '/product/:id', element: <PostPage/>, exact:true},
    //{path: '/logout', element: <Logout/>, exact:true},
    {path: '/stores', element: <ContactsPage/>},
    {path: '/contacts', element: <ContactsPage/>},
    {path: '/goods/filter?', element: <GoodsPage/>, exact:true},
    {path: '/good/:id', element: <GoodPage/>, exact:true},
    {path: '/newsID/:id', element: <NewsPage/>, exact:true},
    {path: '/', element: <Main title='Главная'/>, exact:true},
    {path: '*', element: <ErrorPage/>},
])

//?size=2713, 2714&product_group=1152,1154&minPrice=20000&maxPrice=42000&take=10&skip=10&sort=product_create_date-asc


