import React, { useState } from 'react'
import { useFiltersQuery } from '../app/product.api';
import { useProductsQuery } from '../app/product.api';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import ProductCard from './ProductCard';


export default function Goods() {

    const { data1, isLoading1, error1 } = useFiltersQuery();
    const { data2, isLoading2, error2 } = useProductsQuery();

    console.log(data1);


    return (
        <div>

            {isLoading1
                ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                //  <span>готово</span>
                <div className='filters_wrapper'>
                    <div className='vertical_wrapper'>
                        <div className='group_wrapper'>
                            Сезоны:
                            <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
                                {data1.product_group.map((e, index) =>
                                    <ToggleButton id={"tb_group_" + index} value={e.id} variant="outline-danger">
                                        {e.name_1c}
                                    </ToggleButton>
                                )}
                            </ToggleButtonGroup>
                        </div>            
                        <div className='vid_wrapper'>
                            Модели:
                            <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
                                {data1.vid_modeli.map((e, index) =>
                                    <ToggleButton id={"tb_vid_" + index} value={e.id} variant="outline-danger">
                                        {e.name_1c}
                                    </ToggleButton>
                                )}
                            </ToggleButtonGroup>
                        </div>
                        <Button>Обновить</Button>
                    </div>
                    <div className='size_wrapper'>
                        Размеры:
                        <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
                            {data1.size.map((e, index) =>
                                <ToggleButton id={"tb_size_" + index} value={e.id} variant="outline-danger">
                                    {e.name_1c}
                                </ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    </div>
                </div>
            }
            {isLoading2
                ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                : 
                <div className='goods_wrapper'>
                    {/* {data2.map((product) => 
                            <ProductCard product={product} id={'good_' + product.product_id}/>
                    )}                       */}
                </div>}
        </div>
    )
}
