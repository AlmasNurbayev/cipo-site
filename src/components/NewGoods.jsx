import React from 'react'
import { useProductsNewsQuery } from '../app/product.api.js'
import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';

export default function NewGoods() {

  const { data, isLoading, error } = useProductsNewsQuery(15);
  
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
                <ProductCard product={product} id={'data' + product.product_id}/>
         )        
      }
      </div>
    </div>
  )
}
