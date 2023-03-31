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

    const { data, isLoading, error } = useNewsQuery(4);



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
                <CardGroup bsPrefix='news_group'>
                     {/* <Row xs={2} md={3} className="g-4"> */}
                    {data.map((element, index) =>
                        <Card key = {'NewsCard' + index} border="light" >
                            <Card.Img bsPrefix='news_img' variant="top" src={backend_url + '/' +element.image_path} />
                            <Card.Body >
                                <Card.Title><h6>{element.title}</h6></Card.Title>
                                <Card.Text>
                                    {element.data.length > 80 ? element.data.slice(0,100) + '...' : element.data}
                                </Card.Text>
                            </Card.Body>
                        </Card> 
                    )}
                    {/* </Row> */}
                </CardGroup>
            }

        </div>
        </div>
    )
}