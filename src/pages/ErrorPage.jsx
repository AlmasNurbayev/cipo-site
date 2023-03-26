'useStrict';

import React from 'react'
import Header from '../components/Header'

export default function ErrorPage() {
  return (
    <div className='main_wrapper'>
        <Header />
        <h1>Что-то пошло не так...</h1>
    </div>
  )
}
