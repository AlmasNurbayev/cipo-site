'useStrict';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import SubscribeModal from './SubscribeModal';

export default function Features() {

    const [showSubscribe, setShowSubscribe] = useState(false);
    const location = useLocation();
    const history = useNavigate();

    async function goto(e, id, path) {
        console.log(location.pathname);
        let hero = document.getElementById(id);
        e.preventDefault();  // Stop Page Reloading
        if (location.pathname === '/') {
            hero && hero.scrollIntoView();
        } else {
            history(path);
        }

    }



    //console.log(showSubscribe);
 
    return (
        <div className='features_wrapper'>
            {showSubscribe ? <SubscribeModal show={showSubscribe} setShowSubscribe={setShowSubscribe}></SubscribeModal> : ''}
            <div className='features_wrapper_ul'>

                <Accordion flush={false} defaultActiveKey="1">
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
            <div>
                {/* <Link to="/Contacts"> */}
                <button className='features_btn1' onClick={e => goto(e,'stores_anchor', '/contacts')}>Где купить</button>
                    
                {/* </Link> */}
                {/* <button className='features_btn'>Заказать онлайн</button> */}
            </div>
            <div>
                {/* <Link to="/Contacts"> */}
                <button  className='features_btn2' onClick={() => setShowSubscribe(true)}>Подписаться...</button>
                
                {/* </Link> */}
                {/* <button className='features_btn'>Заказать онлайн</button> */}
            </div>

        </div>
    )
}
