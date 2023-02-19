import React from 'react';


export default function Features() {
    return (
        <div className='features_wrapper'>
            <div className='features_wrapper_ul'>
                <h1>Почему стоит купить у нас</h1>
                <ul className='features_ul'>
                    <li className='features_li'>Нам не все равно, что носит ваш ребенок - не вся обувь одинаково полезна</li>
                    <li className='features_li'>Обувь под нашим брендом Cipo мы разрабатываем  с учетом нашего опыта и климата</li>
                    <li className='features_li'>Поможем правильно подобрать обувь в наших  магазинах </li>
                </ul>
            </div>
            <div className='features_wrapper_btn'>
                <button className='features_btn'>Где купить</button>
                <button className='features_btn'>Заказать онлайн</button>

            </div>
        </div>
    )
}
