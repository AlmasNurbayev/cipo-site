'useStrict';

import React from 'react'
import { useNewsQuery } from '../app/product.api.js'
import { backend_url } from '../app/product.api.js';


//import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';

export default function News() {

    const { data, isLoading, error } = useNewsQuery(3);



    return (
        <div className='Block_wrapper'>
            <div className='par'>Новости:</div>
            <div className='News_wrapper'>
            {isLoading
                ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <CardGroup>
                     <Row xs={1} md={2} className="g-4">
                    {data.map((element, index) =>
                        <Card key = {'NewsCard' + index} border="light" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={backend_url + '/' +element.image_path} width='150px' />
                            <Card.Body>
                                <Card.Title>{element.title}</Card.Title>
                                <Card.Text>
                                    {element.data.length > 80 ? element.data.slice(0,80) + '...' : element.data}
                                </Card.Text>
                            </Card.Body>
                        </Card> 
                    )}
                    </Row>
                </CardGroup>
            }

        </div>
        </div>
    )
}