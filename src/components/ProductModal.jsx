'useStrict';

import React from 'react'
import { backend_url } from '../app/product.api';
import { useStoresQuery } from '../app/product.api';

import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import Row from 'react-bootstrap/Row';

export default function ProductModal({ show, setShow, product }) {

    //const [show, setShow] = useState(show1);
    const { data, isLoading } = useStoresQuery();
    //console.log('show in modal ' + show);

    function getStore(id) {
        let otvet = '';
        let res = data.find(el => el.id === Number(id))
        if (res) {
            otvet += ' - ' + res.address;
        }
        return otvet;


    }


    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)} product={product} scrollable={true} size="sm"  >
                <Modal.Header closeButton>
                    <Modal.Title><h6>{product.name}</h6></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ lineHeight: 0.8 }}>
                    <Carousel>
                        {product.image_registry.map((e, index) =>
                            <Carousel.Item key={'carousel' + index + product.product_id}>
                                <img
                                    className="d-block w-100"
                                    src={backend_url + '/' + e.full_name}
                                    alt={product.name + index}
                                />
                                {/* <p id={product.product_id + index}>{e.full_name}</p> */}
                            </Carousel.Item>
                        )}

                    </Carousel>



                    <p>сезон: {product.product_group_name}</p>
                    {product.vid_modeli_name ? <p>вид обуви: {product.vid_modeli_name}</p> : ''}
                    <p>id: {product.product_id}</p>
                    <p>артикул: {product.artikul}</p>
                    {product.material_podoshva ? <p>Материал подошвы: {product.material_podoshva}</p> : ''}
                    {product.material_up ? <p>Материал верха: {product.material_up}</p> : ''}
                    {product.material_inside ? <p>Материал низа: {product.material_inside}</p> : ''}Размеры и наличие:

                    {/* {product.qnt_price.map((e, index) =>
                            <span key={'szbtn' + product.product_id + index} style={{ padding: '5px' }} >{e.size}</span>
                        )} */}
                    <p></p>
                    {isLoading
                        ?
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <Tabs
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >

                            {product.qnt_price.map((e, index) =>
                                <Tab eventKey={e.size} title={e.size}>
                                    {e.store_id.map(store => <p key={'store_id'.store_id}>{getStore(store)}</p>)}
                                    <p style={{ textAlign: 'right' }}>Уточняйте наличие через <a href={'/Contacts'}>Whatsapp</a></p>
                                </Tab>
                            )}


                        </Tabs>
                    }

                    <Modal.Footer>
                        Цена: <h4>
                            {product.sum.toLocaleString('ru-RU') + ' тенге'}</h4>

                    </Modal.Footer>
                </Modal.Body>

            </Modal>
        </div>
    )
}
