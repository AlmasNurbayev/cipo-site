'useStrict';

import ProductCard from './ProductCard';
//import Pagination from './Pagination';
import Pagination from 'react-bootstrap/Pagination';

import { useProductsQuery } from '../app/product.api';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from 'react';
import React from 'react'
import qs from 'qs';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GoodsList({ take: take, product_group: product_group, vid_modeli: vid_modeli, size: size, sort: sort, search_name: search_name, minPrice: minPrice, maxPrice: maxPrice }) {

  // product_group = transArray(product_group);
  // vid_modeli = transArray(vid_modeli);
  // size = transArray(size);

  const navigate = useNavigate();  

  const [urlParams, setUrlParams] = useSearchParams();
  // for (const p of urlParams) {
  //   console.log(p);
  // }
  console.log({  product_group: product_group, vid_modeli: vid_modeli, size: size, sort: sort, search_name: search_name });
  
  //console.log(window.location.search);
 
  
  //{ skip, take, product_group, vid_modeli, size, sort, search_name, minPrice, maxPrice } = qs.parse(urlParams.getAll);

  //console.log(urlParams.get('size'));
  //const size = urlParams.get('size');
  
  //skip = Number(urlParams.get('skip'));
   take = Number(urlParams.get('take'));
   console.log(take);
  // const product_group = urlParams.get('product_group');
  // const vid_modeli = urlParams.get('vid_modeli');
  // const search_name = urlParams.get('search_name');
   minPrice = Number(urlParams.get('minPrice'));
   maxPrice = Number(urlParams.get('maxPrice'));
  // const sort = urlParams.get('sort');
  

  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(Number(urlParams.get('skip')));
  //const [countPages, setCountPages] = useState(1);
  const { data, isLoading, error } = useProductsQuery({ skip: skip, take: take, product_group: product_group, vid_modeli: vid_modeli, size: size, sort: sort, search_name: search_name, minPrice: minPrice, maxPrice: maxPrice });

  useEffect(()=>{
    const queryString = qs.stringify({ // формируем URL исходя из параметров
        size: size,
        product_group: product_group,
        vid_modeli: vid_modeli,
        minPrice: minPrice,
        maxPrice: maxPrice,
        skip: skip,
        search_name: search_name,
        sort: sort,
        take: take,
    }, { encode: false });
    navigate('?'+queryString); // передаем в URL браузера
    
     //console.log(queryString);
}, [data]);




  
  // function notFound(newPage) {
  //   setCurrentPage(newPage);
  //   return (<h2>Ничего не нашлось</h2>)
  // }

  function changePage(i) {
    setCurrentPage(i);
    setSkip(take * (i - 1));
    if (data.data.length === 0) {
      setSkip(0);  
    }     
    console.log(skip);
    //isLoading={isFetching};
  }



  function transArray(array) {
    let temp = [];
    array.forEach(e => {
      temp.push(e.id);
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
    if (skip !== 0 && data.data.length === 0) {
      setSkip(0);
      setCurrentPage(1);
    }
    // массив страниц
    //pages_obj.push(<Pagination onClick={setCurrentPage(currentPage-1)} key={'page<'} page={currentPage-1} active={true}></Pagination>)
    for (let i = 1; i <= Math.ceil(data.full_count / take); i++) {
      pages_arr.push(i);

      if (i === currentPage) {
        pages_obj.push(<Pagination.Item onClick={() => changePage(i)} key={'page' + i} active={true}>{i}</Pagination.Item>)
      } else {
        pages_obj.push(<Pagination.Item onClick={() => changePage(i)} key={'page' + i} active={false}>{i}</Pagination.Item>)
      }
    }

    //console.log('currentPage', currentPage);
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
              {data.data.length === 0 ? 
                //changePage(1)
                 <h2>Ничего не нашлось</h2>
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
