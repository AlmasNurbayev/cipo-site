'useStrict';

import React from 'react'
import { useNewsQuery } from '../app/product.api.js'
import { backend_url } from '../app/product.api.js';


//import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import  Button  from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

//import Row from 'react-bootstrap/Row';

export default function News() {

    const router = useNavigate();

    const { data, isLoading } = useNewsQuery(4);



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
                            <a href = {"/newsID/"+element.id}>
                                <Card.Img bsPrefix='news_img' variant="top" src={backend_url + '/' +element.image_path} />
                            </a>
                            <Card.Body >
                                <Card.Title><h6>{element.title}</h6></Card.Title>
                                {/* <Card.Text> */}
                                   <div className='card-text' dangerouslySetInnerHTML= {{__html: element.data.length > 80 ? element.data.slice(0,80) + '...' : element.data}}></div> 
                                {/* </Card.Text> */}
                                {/* <Card.Footer> */}
                                    <Button variant="light" onClick={() => router(`/newsID/${element.id}`)}>Подробнее</Button>
                                {/* </Card.Footer> */}
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