import React, { useCallback, useRef, useState } from 'react'
//import axios from 'axios/dist/browser/axios.cjs';
//import { useGetSubscribeQuery } from '../../app/subscribe.api';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useGetAllClientQuery } from '../../app/client.api';
import debounce from 'lodash.debounce';
import Alert from 'react-bootstrap/Alert';
import PaginationCRM from './PaginationCRM';



export default function ClientManage() {

  let [searchString, setSearchString] = useState();
  let [skip, setSkip] = useState(0);


  const inputRef = useRef();

  function clearSearch() {
    setSearchString('');
    inputRef.current.value = '';
    inputRef.current.focus();
  }

  function searching(e, set) {
    searchDebounce(e.target.value, set);
    //console.log(sort);
  }

  const searchDebounce = useCallback(
    debounce((text, set) => {
      set(text);

    }, 1000), []
  )

  const query = { take: 100, skip: skip };

  if (searchString !== '') {
    query.search = searchString
  }

  const { data, isLoading, error } = useGetAllClientQuery(query);

  // function updateSkip(c) {
  //   setSkip(c);
  // }

  function setSMS(e) {
    console.log(e.target);
    if (e.target.checked) {
      e.target.checked = true;

      // axios.post(backend_url_crm + '/api/cli/login', {
      //   email: email,
      //   password: password
      // })
      //   .then(function (response) {
      //     dispatch(setUser({
      //       email: email,
      //       //id: userCredential.user.uid,
      //       token: response.data.accessToken
      //     }));
      //     console.log(response);
      //     localStorage.setItem('token', response.data.accessToken);        
      //     localStorage.setItem('email', email);                 
  
      //     setMessage('Успешный вход ' + email + '. Перенаправление на страницу CRM');
      //     setTimeout(() => navigate('/crm'), 2000);
      //   })
      //   .catch(function (error) {
      //     setMessage('Возникла ошибка: ' + String(error));
      //   })      


    } else {
      e.target.checked = false;
    }
  }

  async function getSMS(id) {
    
  }


  return (
    <div>Client Manage
      {error ?
        <div>
          <Alert key={'success'} variant='danger' dismissible>
            Необходима повторная авторизация: {error.status}
          </Alert>
          {/* {dispatch(removeUser());
                setTimeout(() => Navigate('/auth'), 2000);} */}

        </div>
        :
        <div>
          {isLoading
            ?
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            //  <span>готово</span>

            <div>
              <div>

                <PaginationCRM totalCount={data.totalCount} updateSkip={setSkip} />
                <Form.Control
                  type="text"
                  ref={inputRef}
                  id="inputSearch"
                  bsPrefix='search_input'
                  placeholder="поиск..."
                  aria-describedby="поиск..."
                  onChange={(event) => searching(event, setSearchString)}
                />
                <Button bsPrefix="search_clear" onClick={clearSearch}>X</Button>
                <Button onClick={()=>clearSearch}>Сохранить изменения</Button>


              </div>
              {data.data.length === 0 ? <h5>Нет данных</h5> : ''}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>id</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>name</th>
                    <th>city</th>
                    <th>district</th>
                    <th>wish</th>
                    <th>create_date</th>
                    <th>sms-send
                      <Button>+</Button>
                      <Button>-</Button>
                      <Button>Set</Button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* {console.log('data', data)} */}
                  {data.data.map((e, index) =>
                  (<tr key={'tr' + index}>
                    {/* <td>{index}</td> */}
                    <td>{e.id}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.name}</td>
                    <td>{e.city}</td>
                    <td>{e.district}</td>
                    <td>{e.wish}</td>
                    <td>{e.create_date.slice(0, 10)}</td>
                    <td>
                      <Form.Check
                        type={'checkbox'}
                        id={e.id}
                        checked={(id) => getSMS(id)} // вынести в отдельную функцию - считать массив всех подписок, взять последнее значение
                        value = {e.subscribe.length > 0 ?
                          e.subscribe[0].id : 0}  
                        onChange={(check) => setSMS(check)}  
                      />
                    </td>
                  </tr>)
                  )}

                </tbody>
              </Table>
              {/* <PaginationCRM totalCount={data.totalCount} updateSkip={updateSkip} /> */}
            </div>
          }
        </div>
      }

    </div >
  )
}
