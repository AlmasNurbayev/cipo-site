'useStrict';

import React, { useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import qs from 'qs';

//import { Slider } from 'antd';

//import ProductCard from './ProductCard';
import { sortArray } from './sortArray';
import { useSearchParams } from 'react-router-dom';
import { useProductsQuery } from '../app/product.api';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import ProductCard from './ProductCard';

export default function Goods({ data_f }) {

    // делаем копии фильтров, которые не будут меняться чтобы отображать кнопки на странице
    // а их исходники ниже очищаются в useState и динамически меняются фильтрами 
    let product_group_0 = structuredClone(data_f.product_group);
    let vid_modeli_0 = structuredClone(data_f.vid_modeli);
    let size_0 = structuredClone(data_f.size);


    let [checkedFilter, setCheckedFilter] = useState(false);
    let [product_group, setProductGroup] = useState([]);
    let [vid_modeli, setVidModeli] = useState([]);
    let [size, setSize] = useState([]);
    let [sort, setSort] = useState();
    let [search, setSearch] = useState();
    let [minPrice, setMinPrice] = useState(1);
    let [maxPrice, setMaxPrice] = useState(100000);
    let [take ] = useState(20);
    const [skip, setSkip] = useState(0);

    const inputRef = useRef();
    const priceMinRef = useRef();
    const priceMaxRef = useRef();
    const sizeRef = useRef();
    //const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams ] = useSearchParams();


    //let location = useLocation();

    //useEffect(() => {
        //console.log('location search', location.search);
        //setSearchParams({size: size});
        //setSearchParams({take: take});
        //if (!location.search) {
        // const queryString = qs.stringify({ // формируем URL исходя из параметров
        //     size: size,
        //     product_group: product_group,
        //     vid_modeli: vid_modeli,
        //     minPrice: minPrice,
        //     maxPrice: maxPrice,
        //     skip: skip,
        //     search_name: search,
        //     sort: sort,
        //     take: take,
        // }, { encode: false, arrayFormat: 'comma' });
        // navigate({pathname: '/goods', search: '?' + queryString}); // передаем в URL браузера
        // console.log('navigate ' + queryString);
        // //}
    //}, [size, product_group, vid_modeli, minPrice, maxPrice, skip, search, sort, take]);


    //searchParams.get('size');
    //take = searchParams.get('take');

    // useEffect(() => {
        
    //     if (location.search) {
    //         console.log('location', location);
            let take_url = searchParams.get('take')
            if (take_url != null) {
                //take = (Number(take_url));
            }
    //         let skip_url = searchParams.get('skip')
    //         if (skip_url != null) {
    //             setSkip(Number(skip_url));
    //         }
            let size_url = searchParams.get('size')
            if (size_url != null) {
                //size = [size_url;
            }
    //         console.log(take_url);
    //     }
    // }, [searchParams])
   
    const { data, isLoading, error } = useProductsQuery({ skip: skip, take: take, product_group: product_group, vid_modeli: vid_modeli, size: size, sort: sort, search_name: search, minPrice: minPrice, maxPrice: maxPrice });

    async function reset(e) {
        e.target.reset();
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

    // eslint-disable-next-line
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

    function changePage(i) {
        setCurrentPage(i);
        setSkip(take * (i - 1));
        if (data.data.length === 0) {
            setSkip(0);
        }
        console.log(skip);
        //isLoading={isFetching};
    }


    function updateFilter(event, array, set, name) {
        //console.log(array);
        //console.log(event.target.id, event.target.value);
        let temp = structuredClone(array);

        let res = temp.findIndex(e => e === event.target.value)

        if (event.target.checked) {
            if (res === -1) {
                temp.push(event.target.value)
                //temp[res].select = true;
            }
        } else {
            console.log('delete ', res);
            if (res !== -1) {

                temp.splice(res, 1);
            }
        }
        set(temp);
         //setSearchParams({[name]: temp});
        // console.log('set', {[name]: temp});

    }

    let pages_arr = [];
    let pages_obj = [];

    if (!isLoading) {

        if (skip !== 0 && data.data.length === 0) {
               setSkip(0);
               setCurrentPage(1);
        }
        // массив страниц
        //pages_obj.push(<Pagination onClick={setCurrentPage(currentPage-1)} key={'page<'} page={currentPage-1} active={true}></Pagination>)
        for (let i = 1; i <= Math.ceil(data.full_count / take); i++) {
            pages_arr.push(i);

            if (i === currentPage) {
                pages_obj.push(<Pagination.Item onClick={() => changePage(i)} key={'page' + i} active={true}>{i}</Pagination.Item>)
            } else {
                pages_obj.push(<Pagination.Item onClick={() => changePage(i)} key={'page' + i} active={false}>{i}</Pagination.Item>)
            }
        }

    }



    return (
        <div className='ver1'>
            {console.log('render')}
            <Form onSubmit={(e) => reset(e)}>
                <div className='hor1'>
                    <div className='sort_wrapper'>
                        <ToggleButton
                            className="mb-2"
                            id="toggle-check"
                            type="checkbox"
                            variant={checkedFilter % 2 ? 'danger' : 'outline-danger'}
                            checked={checkedFilter}
                            // value={checkedFilter}
                            //onChange={(e) => console.log(e.currentTarget.checked)}
                            onChange={(e) => setCheckedFilter(e.currentTarget.checked)}
                        >Фильтр</ToggleButton>
                        <Form.Control
                            type="text"
                            ref={inputRef}
                            id="inputSearch"
                            bsPrefix='search_input'
                            placeholder="поиск..."
                            aria-describedby="поиск..."
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

                    {/* <Button variant="danger" id='filter_btn' onClick={}>Фильтры...</Button> */}
                    <div className='size_wrapper' ref={sizeRef} style={checkedFilter ? { display: 'inline' } : { display: 'none' }}>
                        Размеры:
                        <ToggleButtonGroup type="checkbox" defaultValue={'Все'} bsPrefix="size_toggle_wrapper">
                            {size_0.map((e, index) =>
                                <ToggleButton id={e.name_1c} key={"tb_size_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, size, setSize, 'size')}>
                                    {e.name_1c}
                                </ToggleButton>
                            )}
                        </ToggleButtonGroup>

                    </div>


                </div>
                <div className='vertical_wrapper' >

                    <div className='group_wrapper' style={checkedFilter ? { display: 'inline' } : { display: 'none' }}>
                        <p>Сезоны:  </p>
                        <ToggleButtonGroup vertical type="checkbox" defaultValue={'Все'} className="_mb" >

                            {product_group_0.map((e, index) =>
                                <ToggleButton className='ver_filter_buttons' id={e.name_1c} key={"tb_group_" + index} value={e.id} variant="outline-danger" onChange={(event) => updateFilter(event, product_group, setProductGroup)}>
                                    {e.name_1c}
                                </ToggleButton>
                            )
                            }

                        </ToggleButtonGroup>

                        {/* <div className='vid_wrapper'> */}
                        <p>Модели:</p>
                        <ToggleButtonGroup vertical type="checkbox" defaultValue={'Все'} className="_mb">
                            {vid_modeli_0.map((e, index) =>
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
                    <div>
                        {error ? <div>
                            <h1>Что-то пошло не так</h1>
                            <p>Код: {error.status}</p>
                            <p>Статус: {error.data}</p>
                        </div> :
                            isLoading
                                ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                :
                                <div>
                                    <div className='goods_wrapper'>
                                        {data.data.length === 0 ?
                                            //changePage(1)
                                            <h2>Ничего не нашлось</h2>
                                            : data.data.map((product) =>
                                                <ProductCard product={product} key={'good_' + product.product_id + '/' + product.sum} />
                                            )}
                                    </div>
                                    <Pagination size='lg' className='pages_wrapper' >
                                        {isLoading
                                            ?
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            : ''}
                                        {pages_obj}
                                    </Pagination>
                                </div>
                        }
                    </div>
                    {/* //<GoodsList className='goodsList' product_group={product_group} vid_modeli={vid_modeli} size={size} take={20} sort={sort} search_name={search} minPrice={minPrice} maxPrice={maxPrice} initPage={1} /> */}
                </div>
            </Form>

        </div>
    )
}
