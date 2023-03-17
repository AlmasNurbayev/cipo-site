import React from 'react'
import { useNewsQuery } from '../app/product.api.js'
import { useStoresQuery } from '../app/product.api.js';

import { backend_url } from '../app/product.api.js';

//import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Stores() {

    const { data, isLoading, error } = useStoresQuery();



    return (
        <div className='Block_wrapper'>

            <div className='par' id='stores_anchor'>Магазины:</div>
            <div className='Stores_wrapper'>
                {isLoading
                    ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <div>
                        <CardGroup>
                            <Row xs={1} md={2} className="g-4">
                                {data.map((element, index) =>
                                    <Card key={'StoresCard' + index} border="light" style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={backend_url + '/' + element.image_path} width='150px' />
                                        <Card.Body>
                                            <Card.Title>{element.name_1c}</Card.Title>
                                            <Card.Text></Card.Text>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroup.Item>{element.city + '. ' + element.address}</ListGroup.Item>
                                                    <ListGroup.Item>{element.phone}</ListGroup.Item>
                                                    <ListGroup.Item><Card.Link href={element.link_2gis}>открыть в 2GIS</Card.Link></ListGroup.Item>
                                                </ListGroup>
                                            
                                        </Card.Body>
                                    </Card>
                                )}
                            </Row>
                        </CardGroup>
                    </div>
                }
            </div>
        </div>
    )
}