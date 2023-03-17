import React, { useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//import { Slider } from 'antd';

//import ProductCard from './ProductCard';
import GoodsList from './GoodsList';
import { sortArray } from './sortArray';


export default function Goods({ data }) {

    let product_group_0 = structuredClone(data.product_group);
    product_group_0.forEach(e => {
        e.select = false;
    })
    let vid_modeli_0 = structuredClone(data.vid_modeli);
    vid_modeli_0.forEach(e => {
        e.select = false;
    })
    let size_0 = structuredClone(data.size);
    size_0.forEach(e => {
        e.select = false;
    })


    let [product_group, setProductGroup] = useState(product_group_0);
    let [vid_modeli, setVidModeli] = useState(vid_modeli_0);
    let [size, setSize] = useState(size_0);
    let [sort, setSort] = useState();
    let [search, setSearch] = useState();
    const inputRef = useRef();

    //console.log(data);
    async function update(e) {

    }

    const searchDebounce = useCallback(
        debounce((text)=> {
            setSearch(text);
            console.log(text);    
        }, 1000), []
    )

    function clearSearch() {
        setSearch('');
        inputRef.current.value = '';
        inputRef.current.focus();
    }

    function sorting(e) {
        setSort(e.target.value);
        //console.log(sort);
    }

    function searching(e) {
        searchDebounce(e.target.value);
        //console.log(sort);
    }


    function updateFilter(event, array, set) {
        //console.log(event.target.checked);
        //console.log(event.target.id, event.target.value);
        let temp = structuredClone(array);

        let res = temp.findIndex(e => Number(e.id) === Number(event.target.value))
        if (res !== -1) {
            if (event.target.checked) {
                temp[res].select = true;
            } else {
                temp[res].select = false;
            }
            set(temp);
        }
        console.log('set ', temp);

    }

    //setProductGroup(data.product_group);


    return (
        <div>
            <div className='filters_wrapper'>
                <div className='vertical_wrapper'>
                    <div className='sort_wrapper'>
                        <Form.Control
                            type="text"
                            ref={inputRef}
                            id="inputSearch"
                            className='search_input'
                            placeholder="поиск по названию..."
                            aria-describedby="поиск по названию..."
                            onChange={(event) => searching(event)}
                        />
                          <Button className="inner_btn" onClick={clearSearch}>X</Button>Сортировать по...
                        <Form.Select aria-label="Default select example" size='sm'  variant="outline-danger" onChange={(event) => sorting(event)}>
                            <option>Сортировка</option>
                            {sortArray.map((e, index) => 
                                <option key={e.name} value={e.id}>{e.name}</option>
                            )}
                        </Form.Select>
                    </div>
                    <div className='group_wrapper'>
                        Сезоны:
                        <ToggleButtonGroup type="checkbox" defaultValue={'Все'} className="mb-2" >

                            {product_group.map((e, index) =>
                                <ToggleButton id={e.name_1c} key={"tb_group_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, product_group, setProductGroup)}>
                                    {e.name_1c}
                                </ToggleButton>
                            )
                            }

                        </ToggleButtonGroup>
                    </div>
                    <div className='vid_wrapper'>
                        Модели:
                        <ToggleButtonGroup type="checkbox" defaultValue={'Все'} className="mb-2">
                            {vid_modeli.map((e, index) =>
                                <ToggleButton id={e.name_1c} key={"tb_vid_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, vid_modeli, setVidModeli)}>
                                    {e.name_1c}
                                </ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    </div>
                    <Button onClick={update}>Сбросить фильтры (нужно доделать)</Button>
                </div>
                <div className='size_wrapper'>
                    Размеры:
                    <ToggleButtonGroup type="checkbox" defaultValue={'Все'} className="mb-2">
                        {size.map((e, index) =>
                            <ToggleButton id={e.name_1c} key={"tb_size_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, size, setSize)}>
                                {e.name_1c}
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                </div>
            </div>
            <GoodsList product_group={product_group} vid_modeli={vid_modeli} size={size} take={10} sort={sort} search={search}/>

        </div>
    )
}
