import React from 'react';
import Features from './Features';
//import {Link} from 'react-router-dom';
//import Link from '@mui/material/Link';

export default function Header() {
    return (
        <div className='header'>
            <div className='menu'>
                <a className='menu_item' href="/">
                    Доставка
                </a>                
                <a className='menu_item' href="/">
                    Контакты
                </a>
                <a className='menu_item' href="/">
                    О нас
                </a>                
            </div>
            <div className='title_wrapper'>
                <img className='logo_img' src={require('../assets/logo2.png')} alt='logo'/>
                <div className='title'><h1>Качественная детская обувь из натуральных материалов</h1></div>
                <div className='title_basket'>
                    <img className='basket_img' src={require('../assets/basket.png')} alt='basket'/>
                </div>
            </div>
            <Features/>
        </div>
    )
}
