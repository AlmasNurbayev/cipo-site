import React from 'react';
import Features from './Features';
//import {Link} from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Header() {
    const [themeMode, setThemeMode] = React.useState('light');

    return (
        <div className='header'>
            <div className='menu_line'>
            <div className='theme_switch'>
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


            </div>
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
