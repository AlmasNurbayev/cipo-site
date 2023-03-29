'useStrict';

import React from 'react'
import { useState } from 'react';
import { backend_url } from '../app/product.api';
import { useStoresQuery } from '../app/product.api';

import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Contacts from './Contacts';
// import Row from 'react-bootstrap/Row';

export default function ProductModal({ show, setShow, product }) {

    //const [show, setShow] = useState(show1);
    const { data, isLoading, error } = useStoresQuery();
    console.log('show in modal ' + show);

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
            <Modal show={show} onHide={() => setShow(false)} product={product}>
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
                    {product.material_inside ? <p>Материал низа: {product.material_inside}</p> : ''}Доступные размеры:
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} size='lg' id={'ButtonGroup' + product.product_id}>
                        {product.qnt_price.map((e, index) =>
                            <ToggleButton key={'szbtn' + product.product_id + index} type='checkbox' variant='light' style={{ padding: '5px' }} value={e.size} size='sm'>{e.size}</ToggleButton>
                        )}
                    </ToggleButtonGroup>
                    {isLoading
                    ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    : 
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Ориентировочное наличие в магазинах</Accordion.Header>
                            <Accordion.Body>
                                {product.qnt_price.map((e, index) =>
                                    <ListGroup key={'size'+e.size+'/'+e.store_id}>
                                        <ListGroup.Item><h6>{'размер ' + e.size + ' в магазинах: '}</h6>
                                            {e.store_id.map(store => <p>{getStore(store)}</p>)}
                                        </ListGroup.Item> 
                                    </ListGroup>
                                )}
                                Уточняйте наличие через <a href={'/Contacts'}>Whatsapp</a>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    }
                </Modal.Body>
                <Modal.Footer>
                Цена: <h4>
                        {product.sum.toLocaleString('ru-RU') + ' тенге'}</h4>
                    {/* <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}
