import React from 'react';
import Features from './Features';
import News from './News';
import { goto } from '../routes/router';


//import {Link} from 'react-router-dom';
//import ToggleButton from '@mui/material/ToggleButton';
//import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Header() {
    //const [themeMode, setThemeMode] = React.useState('light');

    return (
        <div className='header'>
            <div className='menu_line'>
            {/* <div className='theme_switch'>
            <ToggleButtonGroup
                color="primary"
                value={themeMode}
                exclusive
                // onChange={}
                aria-label="Platform"
                >
                <ToggleButton value="light">light</ToggleButton>
                <ToggleButton value="dark">dark</ToggleButton>
            </ToggleButtonGroup>


            </div> */}
            <div className='menu'>
            <a className='menu_item' href="/">
                    Главная
                </a>                          
                <a className='menu_item' href="/goods">
                    Все товары
                </a>                
                <a className='menu_item' href="/" onClick={(e) => goto(e, 'contacts_anchor')}>
                    Контакты
                </a>
                <a className='menu_item' href="/">
                    О нас
                </a>                
            </div>

            </div>
            <div className='title_wrapper'>
                <a href='/'>
                <img className='logo_img' src={require('../assets/logo2.png')} alt='logo'/>
                </a>
                <div className='title'><h1>Качественная детская обувь из натуральных материалов</h1></div>
                {/* <div className='title_basket'>
                    <img className='basket_img' src={require('../assets/basket.png')} alt='basket'/>
                </div> */}
            </div>
            <Features/>
        </div>
    )
}
