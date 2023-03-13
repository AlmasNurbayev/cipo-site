import { createBrowserRouter } from "react-router-dom";

import Contacts from "../components/Contacts";
import Main from "../pages/MainPage";
import GoodsPage from "../pages/GoodsPage";
import ErrorPage from "../pages/ErrorPage";

export const publicRoutes = createBrowserRouter([
    //{path: '/product/:id', element: <PostPage/>, exact:true},
    //{path: '/logout', element: <Logout/>, exact:true},
    {path: '/contacts', element: <Contacts/>, exact:true},
    {path: '/goods', element: <GoodsPage/>, exact:true},
    {path: '/', element: <Main title='Главная'/>, exact:true},
    {path: '*', element: <ErrorPage/>, exact:true},
])


export function goto(e, id) {
    let hero = document.getElementById(id);
    e.preventDefault();  // Stop Page Reloading
    hero && hero.scrollIntoView();
}