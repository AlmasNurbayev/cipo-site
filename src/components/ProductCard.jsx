'useStrict';

import React from 'react';
import { useState } from 'react';

import { backend_url } from '../app/product.api';
import ProductModal from './ProductModal';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';




export default function ProductCard({ product }) {
    //const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);
    //const [modalID, setModalID] = useState(0);

    const handleClose = () => setShow(false);
    // const handleShow = () => {
    //     //setModalID(product.product_id);
    //     setShow(true)};
        //console.log(show, modalID);
    const router = useNavigate();

    return (
        <div className='ProductCard_wrapper' id={'ProductCard_wrapper_' + product.product_id}>

            {show ? <ProductModal show={show} product={product} OnHide={handleClose} setShow={setShow} id={'modal'+product.product_id}></ProductModal> : ''}
            

            <Card className='ProductCard' key={'card_' + product.product_id} >
                <Card.Img bsPrefix = '_card-img' variant="top" src={backend_url + '/' + product.image_active_path} />
                <Card.Body style={{ height: '120px', padding: '5px' }}>
                    <Card.Title><h6>{product.vid_modeli_name}</h6></Card.Title>
                    <Card.Text>
                        <span className='.product_card_name'>{product.name}</span>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item style={{ padding: '5px' }}>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1} size='sm' key={'ButtonGroup' + product.product_id}>
                            {product.qnt_price.map((e, index) =>
                                <ToggleButton key={product.product_id + 'button_size_' + index} type='checkbox' variant='light' style={{ padding: '5px' }} value={e.size} size='sm'>{e.size}</ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ padding: '5px' }}>
                        <p>Цена: {product.sum.toLocaleString('ru-RU')}</p>
                        {/* <Button variant="light" onClick={handleShow}>Подробнее</Button> */}
                        <Button variant="light" onClick={() => router(`/good/${product.product_id}`)}>Подробнее</Button>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
            {/* <Box
                sx={{
                    width: 150,
                    height: 200,
                    //backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
                className = 'ProductCard_card'

            >{product.id}
            <img className='ProductCard_img' src={backend_url + '/' + product.image_active_path} alt={product.id}/>
            {product.vid_modeli_name}
            <p>{product.name}</p>
            Размеры: {product.qnt_price.map((e) => 
                <span>{e.size},</span>
            )}    
            <p>Цена: {product.sum.toLocaleString('ru-RU')}</p>

            
            </Box> */}

        </div>
    )
}

