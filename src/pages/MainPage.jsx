import React from 'react'

import Header from '../components/Header';
import Features from '../components/Features';
import NewGoods from '../components/NewGoods';
import Stores from '../components/Stores';
import News from '../components/News';
import Contacts from '../components/Contacts';

export default function Main() {
  return (
    <div className='main_wrapper'>
    <Header />
    <News />          
    <NewGoods />
    <Stores/>
    <Contacts/>
    </div>
  )
}
