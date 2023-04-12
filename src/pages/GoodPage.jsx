import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Contacts from '../components/Contacts';
import { backend_url, useProductIDQuery, useStoresQuery } from '../app/product.api';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default function GoodPage() {
  const params = useParams();
  const { data, isLoading, error } = useProductIDQuery(params.id);
  const { data: data_s, isLoading: isLoading_s } = useStoresQuery();

  function getStore(id) {

    let otvet = '';
    let res = data_s.find(el => el.id === Number(id))
    if (res) {
        otvet += ' - ' + res.address;
    }
    return otvet;


}

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
            <div className='par'>{data.name}</div>
            <div className="main_product">
              <div className="left_product">
                <Carousel>
                  {data.image_registry.map((e, index) =>
                    <Carousel.Item key={'carousel' + index + data.id}>
                      <a href={backend_url + '/' + e.full_name}>
                      <img
                        style={{ width: '100%' }}
                        src={backend_url + '/' + e.full_name}
                        alt={data.name + index}
                      />
                      </a>
                      {/* <p id={product.product_id + index}>{e.full_name}</p> */}
                    </Carousel.Item>
                  )}
                </Carousel>
              </div>
              <div className="right_product">
                <p key='1'>сезон: {data.product_group.name_1c}</p>
                {data.vid_modeli ? <p>вид обуви: {data.vid_modeli.name_1c}</p> : ''}
                <p key='2'>id: {data.id}</p>
                <p key='3'>артикул: {data.artikul}</p>
                {data.material_podoshva ? <p>материал подошвы: {data.material_podoshva}</p> : ''}
                {data.material_up ? <p>материал верха: {data.material_up}</p> : ''}
                {data.material_inside ? <p>материал низа: {data.material_inside}</p> : ''}<b>Размеры, цены, наличие:</b>

                {isLoading_s
                        ?
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <div >
                        <Tabs
                            id="uncontrolled-tab-example"
                            className="mb-3 tabs"

                        >

                            {data.qnt_price_registry_group.map((e, index) =>
                                <Tab key={e.size_name_1c} eventKey={e.size_name_1c} title={e.size_name_1c}>
                                    <p key={'p'+e.size_name_1c}>Цена: {e.sum.toLocaleString('ru-RU') + ' тенге'}</p>
                                    <p key={'p2'+e.size_name_1c}>В наличии:</p>
                                    {e.store_id.map(store => <p key={'store_id'+store}>{getStore(store)}</p>)}
                                </Tab>
                            )}

                          
                        </Tabs>
                        <p style={{ textAlign: 'right' }}>Уточняйте наличие через <a href={'https://wa.me/77788121260'}>Whatsapp</a></p>
                        </div>
                    }
                <p></p>



              </div>

            </div>

            <Contacts />
          </div>

      }

    </div>

  )
}
