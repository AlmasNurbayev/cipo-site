'useStrict';

import ProductCard from './ProductCard';
//import Pagination from './Pagination';
import Pagination from 'react-bootstrap/Pagination';

import { useProductsQuery } from '../app/product.api';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import React from 'react'

export default function GoodsList({ take, size, vid_modeli, product_group, minPrice, maxPrice, sort, search }) {

  product_group = transArray(product_group);
  vid_modeli = transArray(vid_modeli);
  size = transArray(size);

  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [countPages, setCountPages] = useState(1);
  const { data, isLoading, error, isFetching } = useProductsQuery({ skip: skip, take: take, product_group: product_group, vid_modeli: vid_modeli, size: size, sort: sort, search_name: search, minPrice: minPrice, maxPrice: maxPrice });

  function changePage(i) {
    setCurrentPage(i);

    setSkip(take * (i - 1));
    console.log(skip);
    //isLoading={isFetching};
  }



  function transArray(array) {
    let temp = [];
    array.forEach(e => {
      if (e.hasOwnProperty('select')) {
        if (e.select === true) {
          temp.push(e.id);
        }
      }
    });
    if (temp.length === 0) { temp = undefined }
    return temp;
  }

  let pages_arr = [];
  let pages_obj = [];

  if (!isLoading) {

    // массив страниц
    //pages_obj.push(<Pagination onClick={setCurrentPage(currentPage-1)} key={'page<'} page={currentPage-1} active={true}></Pagination>)
    for (let i = 1; i <= Math.trunc(data.full_count / take) + 1; i++) {
      pages_arr.push(i);

      if (i === currentPage) {
        pages_obj.push(<Pagination.Item onClick={() => changePage(i)} key={'page' + i} active={true}>{i}</Pagination.Item>)
      } else {
        pages_obj.push(<Pagination.Item onClick={() => changePage(i)} key={'page' + i} active={false}>{i}</Pagination.Item>)
      }
    }
    console.log('currentPage', currentPage);
    //console.log('pages ', pages_arr, 'full count', data.full_count);

  }

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
          <div>
            <div className='goods_wrapper'>
              {data.data.length === 0 ? <h2>Ничего не нашлось</h2>
                : data.data.map((product) =>
                  <ProductCard product={product} key={'good_' + product.product_id + '/' + product.sum} />
                )}
            </div>
            <Pagination size='lg' className='pages_wrapper' >
              {isLoading
                ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                : ''}
              {pages_obj}
            </Pagination>
          </div>
      }
    </div>
  )
}
