'useStrict';

import React from 'react'

import Header from '../components/Header';
//import Features from '../components/Features';
import Stores from '../components/Stores';
import Contacts from '../components/Contacts';

export default function ContactsPage() {
  return (
    <div className='main_wrapper'>
    <Header />
    <Stores/>
    <Contacts/>
    </div>
  )
}
