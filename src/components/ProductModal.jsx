import React from 'react'
import { useState } from 'react';

import { backend_url } from '../app/product.api';


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Carousel from 'react-bootstrap/Carousel';

export default function ProductModal({show, setShow, product}) {

    //const [show, setShow] = useState(show1);

    console.log('show in modal ' + show);   

  return (
    <div>
            <Modal show={show} onHide={() => setShow(false)} product={product}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{lineHeight: 0.8}}>
                <Carousel>
                {product.image_registry.map((e, index) =>
                                <Carousel.Item id={'carousel' + index + product.product_id}>
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
                    {product.material_podoshva ? <p>Материал подошвы: {product.material_podoshva}</p>: ''}
                    {product.material_up ? <p>Материал верха: {product.material_up}</p>: ''}
                    {product.material_inside ? <p>Материал низа: {product.material_inside}</p>: ''}Доступные размеры:
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1} size='lg' id={'ButtonGroup' + product.product_id}>
                            {product.qnt_price.map((e, index) =>
                                <ToggleButton id={product.product_id + index} type='checkbox' variant='light' style={{ padding: '5px' }} value={e.size} size='sm'>{e.size}</ToggleButton>
                            )}
                        </ToggleButtonGroup>

                </Modal.Body>
                <Modal.Footer>
                        <h2>
                        {product.sum.toLocaleString('ru-RU') + ' тенге'}</h2>            
                    {/* <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button> */}
                </Modal.Footer>
            </Modal>        
    </div>
  )
}
