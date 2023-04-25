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


                <Accordion flush defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Почему мы?</Accordion.Header>
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
                <div className='features_buttons'> 
                    <div>
                        <button className='features_btn1' onClick={e => goto(e, 'stores_anchor', '/contacts')}>Где купить</button>
                    </div>
                    <div>
                        <button className='features_btn2' onClick={() => setShowSubscribe(true)}>Подписаться...</button>
                    </div>
                    <div>
                        {/* <Link to='https://wa.me/77788121260'> */}
                        <button className='features_btn1' >
                        <a href="https://wa.me/77788121260"><img width='40px' src={require('../assets/contacts/whatsapp2.png')} alt='whatsapp'/></a>
                        </button>
                        {/* </Link> */}
                    </div>

                </div>
                {/* <div>
                    <a href="https://wa.me/77788121260"><img width='40px' src={require('../assets/contacts/whatsapp2.png')} alt='whatsapp'/></a>
                </div> */}
            </div>
        </div>
    )
}
