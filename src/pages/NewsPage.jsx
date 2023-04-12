import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Contacts from '../components/Contacts';
import { backend_url, useNewsIDQuery } from '../app/product.api';
import Spinner from 'react-bootstrap/Spinner';


export default function NewsPage() {
  const params = useParams();
  const { data, isLoading, error } = useNewsIDQuery(params.id);

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
          <div className='Block_wrapper'>
            <div className='par'>{data.title}</div>
            <div className='news_once'>
              <div className='news_img_once' >
                <img className='news_img' alt={data.image_path} variant="top" src={backend_url + '/' + data.image_path} />
              </div>
              
              <div className='news_text_once' dangerouslySetInnerHTML={{ __html: data.data}}></div>
            </div>
            <Contacts />
          </div>

      }

    </div>

  )
}
