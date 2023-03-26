import React from 'react'
import { useProductsNewsQuery } from '../app/product.api.js'
import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { useNavigate, useLocation } from 'react-router-dom'
import goto from '../routes/goto.js'

export default function NewGoods() {

  const { data, isLoading, error } = useProductsNewsQuery(15);
  
  const location = useLocation();
  const history = useNavigate();
  //console.log(data);
  //console.log(isLoading);

  return (
    <div className='Block_wrapper'>
      <div className='par'>Новинки:</div>
      <div className='NewsGoods_wrapper'>
        {isLoading
          ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          :
          //  <span>готово</span>
          data.map((product) =>
            <ProductCard product={product} key={'newGoods' + product.product_id + '/' + product.sum} />
          )
        }

      </div>
      <Button onClick={(e) => goto(history, location, e, '', '/goods')}>Весь каталог</Button>  
    </div>
    
  )
}
