import React from 'react'
import { useProductsNewsQuery } from '../app/product.api.js'
import ProductCard from './ProductCard';

export default function NewGoods() {

  const { data, isLoading, error } = useProductsNewsQuery(20);
  
  console.log(data);
  console.log(isLoading);

  return (
    <div className='NewsGoods'>
      <h1>Новинки:</h1>
      <div className='NewsGoods_wrapper'>
      {isLoading
      ?       
      <span>Не готово</span>
      : 
      //  <span>готово</span>
        data.map((product) => 
                <ProductCard product={product}/>
         )        
      }
      </div>
    </div>
  )
}
