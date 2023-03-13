import React from 'react'
import Header from '../components/Header'
import Goods from '../components/Goods'

export default function GoodsPage() {
  return (
    <div className='main_wrapper'>
        <Header />
        <h1>Будущие товары...</h1>
        <Goods/>
        
    </div>
  )
}