import React from 'react';
import { Spinner } from 'react-bootstrap';

import Header from '../components/Header';
import Goods from '../components/Goods';
import { useFiltersQuery } from '../app/product.api';


export default function GoodsPage() {
  const { data, isLoading, error } = useFiltersQuery();

  return (
    <div className='main_wrapper'>
        <Header />

        {error ? <div>
              <h1>Что-то пошло не так</h1>
              <p>Код: {error.status}</p>
              <p>Статус: {error.data}</p>
              </div> : 
            isLoading
                ? 
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                : 
                <div>
                <h1>Будущие товары...</h1>
                <Goods data={data}/>
                </div>
            }        
        
    </div>
  )
}