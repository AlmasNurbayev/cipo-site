import React from 'react'
import ProductCard from './ProductCard';
import { useProductsQuery } from '../app/product.api';
import { Spinner } from 'react-bootstrap';

export default function GoodsList({take, skip, size, vid_modeli, product_group, minPrice, maxPrice, sort, search}) {

  function transArray(array) {
    let temp = [];
    array.forEach(e => {
      if (e.hasOwnProperty('select')) {
        if (e.select === true) {
          temp.push(e.id);
        } 
      }
    });
    if (temp.length === 0) {temp = undefined}
    return temp;
  }

  product_group = transArray(product_group);
  vid_modeli = transArray(vid_modeli);
  size = transArray(size);

  console.log('GoodList after ', sort);


  // for (const e of product_group) {
  //    if (e.hasOneProperty('selected')) {
  //       if (e.selected) {
  //         continue;
  //       };
  //    };
  //    delete e;





  const { data, isLoading, error } = useProductsQuery({take: take, product_group: product_group, vid_modeli: vid_modeli, size: size, sort: sort, search_name: search});
  //console.log(error);

  return (
    <div>
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
                <div className='goods_wrapper'>
                    {data.map((product) => 
                            <ProductCard product={product} key={'good_' + product.product_id + '/' + product.sum}/>
                    )}                      
                </div>
            }
    </div>
  )
}
