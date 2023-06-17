import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import  Alert from 'react-bootstrap/Alert';


//import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import ru from 'date-fns/locale/ru';
//import { formatISO } from 'date-fns';
//import { id } from 'date-fns/locale';
import ListGroup from 'react-bootstrap/ListGroup';
import { useGetCompaignQuery, useGetBalanceQuery, useCreateCompaignMutation } from '../../app/mobizon.api';



export default function CompaignModal({ modalData, show, setShowCompaignModal }) {

  //let postContent;
  const [postContent, setPostContent] = useState();
  //const [createSubscribe] = useCreateSubscribeMutation();
  //const [patchSubscribe] = usePatchSubscribeMutation();


  //console.log('subscribe', modalData.patchBody.subscribe);
  const [title, setTitle] = useState(modalData.title);
  const [list, setList] = useState(modalData.list);
  const [text, setText] = useState('');
  const [log, setLog] = useState([]);
  const [createCompaign, { isLoading: isLoading_createCompaign }] = useCreateCompaignMutation();
  //const dateFormat = 'dd.MM.yyyy';

  // const formData = new FormData(e.target),
  // formDataObj = Object.fromEntries(formData.entries())

  //console.log('list',list);
  const { data, refetch, isLoading, error, isError, isFetching } = useGetCompaignQuery();
  const { data: data_balance, refetch:  refetch_balance, isLoading: isLoading_balance, error: error_balance } = useGetBalanceQuery();

  //console.log('data',data);
  //console.log('data_balance',data_balance);
  //console.log(process.env.REACT_APP_MOBIZON_KEY);

  function addLog(newData) {
    let old_log = structuredClone(log);
    old_log.push(newData);
    setLog(old_log);
  }


  async function send(e) {
    // валидация


    e.preventDefault();
    setPostContent('');

    const formData = new FormData(e.target.form);
    let formDataObj = Object.fromEntries(formData.entries())
    //console.log(formDataObj);
    const bodyCreate = {
      data: {
          name: formDataObj.name,
          text: text,
          from: formDataObj.from,
          ttl: Number(formDataObj.ttl), 
          msgType: 'SMS'
        }
    };
    
    console.log(bodyCreate);
    let res_create = await createCompaign(bodyCreate);
    addLog(res_create);

    return;  

        let res2 = {};//await createSubscribe(sub);
        if (res2.hasOwnProperty('error')) {
          setPostContent(
            <div className="alert alert-danger" role="alert">
              Возникла ошибка  {JSON.stringify(res2.error)}
            </div>
          )
        };
        if (res2.hasOwnProperty('data')) {
          setPostContent(
            <div className="alert alert-success" role="alert">
              
            </div>
          )
        };
      


    e.target.reset();
  }

  return (
    <div>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}> */}
        <Modal show={show} onHide={() => setShowCompaignModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => send(e)}>
            <Modal.Body style={{ lineHeight: 0.8 }} >
              
              {error_balance ?
                    <div>
                      <Alert key={'success'} variant='danger' dismissible>
                        {error_balance.status}
                      </Alert>
                    </div>
                    :
                    <div>
                      {isLoading_balance
                        ?
                        
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :

                          <div class="input-group mb-3">
                            <Button onClick={()=>refetch_balance()}>Обновить</Button>
                            <Form.Control type="text" className="form-control" placeholder="" defaultValue={'Баланс: ' + data_balance.data.balance + ' ' + data_balance.data.currency} aria-describedby="button-addon1"/>
                          </div>                        
                      }
                      </div>
                    }  
              <p>Передано клиентов: {list.length}</p>
              
              <Form.Group className="mb-3 input_wrapper">
                  {error ?
                    <div>
                      <Alert key={'success'} variant='danger' dismissible>
                        {error.status}
                      </Alert>
                    </div>
                    :
                    <div>
                      {isLoading
                        ?
                        
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        
                        <ListGroup>
                          <h5>Список активных компаний:</h5>
                          {data.data.items.map(el => 
                                <ListGroup.Item variant="info">
                                  {el.name + ' / ' +el.id + ' / ' + el.commonStatus + ' / ' + el.text }
                                </ListGroup.Item>
                          )}
                        </ListGroup>
                        
                      }
                      </div>
                    }  
              </Form.Group>
              
              <Form.Control type="text" name='name' placeholder="Имя компании" />
              <Form.Group className="mb-3 input_wrapper">
                <Form.Control type="text" as="textarea" rows={3} name='text' placeholder="Текст оообщения" onChange={(e) => setText(e.target.value)} />
                <span style={{margin: '5px'}}>Длина:{text.length}</span>
              </Form.Group>                
              <Form.Control type="text" name='from' placeholder="Подпись отправителя" defaultValue={'cipo.kz'}/>
              <Form.Control type="text" name='ttl' placeholder="Время жизни в минутах" defaultValue={4320}/>
              <Form.Control type="text" as="textarea" rows={4} name='recipients' placeholder="Получатели" defaultValue={list.map(el => el.phone)}/>
                <Button onClick={(e) => send(e)}>
                  Создать и запустить компанию
                </Button>
                <Form.Control type="text" as="textarea" rows={4} name='log' value={JSON.stringify(log)} placeholder="Полученные сообщения системы" />


              
            </Modal.Body>
            <Modal.Footer>
              {postContent}
              <fieldset>

              </fieldset>

            </Modal.Footer>

          </Form>
        </Modal>

      {/* </LocalizationProvider>; */}
    </div>
  )
}
