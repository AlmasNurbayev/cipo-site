'useStrict';

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

    let [showFilter, setShowFilter] = useState('none');
    let [product_group, setProductGroup] = useState(product_group_0);
    let [vid_modeli, setVidModeli] = useState(vid_modeli_0);
    let [size, setSize] = useState(size_0);
    let [sort, setSort] = useState();
    let [search, setSearch] = useState();
    let [minPrice, setMinPrice] = useState(1);
    let [maxPrice, setMaxPrice] = useState(100000);
    const inputRef = useRef();
    const priceMinRef = useRef();
    const priceMaxRef = useRef();
    const sizeRef = useRef();

    //console.log(data);
    async function reset(e) {
        
        //e.preventDefault(); // не обновляются данные
        e.target.reset();
        //Goods(data);
    }

    function toggleFilters() {
        if (showFilter === 'inline') {setShowFilter('none')} 
        else {setShowFilter('inline')}
        console.log(showFilter);
    }

    function updateMinPrice(e) {
        let newMin = Number(e.target.value)
        if (newMin > maxPrice) {
            newMin = maxPrice;
            priceMinRef.current.value = newMin;
        }
        setMinPrice(newMin);
    }

    function updateMaxPrice(e) {
        let newMax = Number(e.target.value)
        if (newMax < minPrice) {
            newMax = minPrice;
            priceMaxRef.current.value = newMax;
        }
        setMaxPrice(newMax);
    }

    const searchDebounce = useCallback(
        debounce((text) => {
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
        <div className='ver1'>
            <Form onSubmit={(e) => reset(e)}>
            <div className='hor1'>
                <div className='sort_wrapper'>
                    <Form.Control
                        type="text"
                        ref={inputRef}
                        id="inputSearch"
                        bsPrefix='search_input'
                        placeholder="поиск по названию..."
                        aria-describedby="поиск по названию..."
                        onChange={(event) => searching(event)}
                    />
                    <Button bsPrefix="search_clear" onClick={clearSearch}>X</Button>
                    
                    <div className="sort_div">
                    <Form.Select bsPrefix="inputSort" aria-label="Default select example" size='sm' variant="outline-danger" onChange={(event) => sorting(event)}>
                        <option>Сортировка</option>
                        {sortArray.map((e, index) =>
                            <option key={e.name} value={e.id}>{e.name}</option>
                        )}
                    </Form.Select>
                    
                    </div>
                </div>  
                <Form.Check 
                    type="switch"
                    id="filter_btn"
                    label="Фильтр по размерам, категориям"
                    onChange={(e)=> toggleFilters()}
                />
                {/* <Button variant="danger" id='filter_btn' onClick={}>Фильтры...</Button> */}
                <div className='size_wrapper' ref={sizeRef} style={{display: showFilter}}>
                    Размеры:
                    <ToggleButtonGroup type="checkbox" defaultValue={'Все'} bsPrefix="size_toggle_wrapper">
                        {size.map((e, index) =>
                            <ToggleButton id={e.name_1c} key={"tb_size_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, size, setSize)}>
                                {e.name_1c}
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>

                </div>

                
            </div>
            <div className='vertical_wrapper' >
                
                    <div className='group_wrapper' style={{display: showFilter}}>
                        <p>Сезоны:  </p>
                        <ToggleButtonGroup vertical type="checkbox" defaultValue={'Все'} className="_mb" >

                            {product_group.map((e, index) =>
                                <ToggleButton className='ver_filter_buttons' id={e.name_1c}  key={"tb_group_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, product_group, setProductGroup)}>
                                    {e.name_1c}
                                </ToggleButton>
                            )
                            }

                        </ToggleButtonGroup>
                    
                    {/* <div className='vid_wrapper'> */}
                        <p>Модели:</p>
                        <ToggleButtonGroup vertical type="checkbox" defaultValue={'Все'} className="_mb">
                            {vid_modeli.map((e, index) =>
                                <ToggleButton id={e.name_1c} key={"tb_vid_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, vid_modeli, setVidModeli)}>
                                    {e.name_1c}
                                </ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    {/* </div> */}
                    <div className='price_wrapper'>
                        Цена:
                        <div className='range'>от:
                            <Form.Range variant="outline-danger" min="1" max="100000" value={minPrice} onChange={(e) => updateMinPrice(e)}
                                ref={priceMinRef}
                            />{minPrice.toLocaleString('ru-RU')}</div>
                        <div className='range'>до:
                            <Form.Range min="1" max="100000" value={maxPrice} onChange={(e) => updateMaxPrice(e)}
                                ref={priceMaxRef}
                            />{maxPrice.toLocaleString('ru-RU')}</div>
                                <Button variant="danger" type='submit'>Сбросить фильтры</Button>
                    </div>
                    </div>
                    <GoodsList className='goodsList' product_group={product_group} vid_modeli={vid_modeli} size={size} take={20} sort={sort} search={search} minPrice={minPrice} maxPrice={maxPrice} initPage={1}/>                    
                
                </div>
                </Form>            

        </div>
    )
}
