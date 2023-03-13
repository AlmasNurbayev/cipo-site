import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { goto } from '../routes/router';


export default function Features() {


    return (
        <div className='features_wrapper'>
            <div className='features_wrapper_ul'>

                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Почему стоит покупать у нас</Accordion.Header>
                        <Accordion.Body>
                            <ul className='features_ul'>
                                <li className='features_li'>Нам не все равно, что носит ваш ребенок - не вся обувь одинаково полезна</li>
                                <li className='features_li'>Обувь под нашим брендом Cipo мы разрабатываем  с учетом нашего опыта и климата</li>
                                <li className='features_li'>Поможем правильно подобрать обувь в наших  магазинах </li>
                            </ul>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>


            </div>
            <div className='features_wrapper_btn'>
                {/* <Link to="/Contacts"> */}
                    <button className='features_btn' onClick={e => goto(e, 'stores_anchor')}>Где купить</button>
                {/* </Link> */}
                {/* <button className='features_btn'>Заказать онлайн</button> */}
            </div>
        </div>
    )
}
