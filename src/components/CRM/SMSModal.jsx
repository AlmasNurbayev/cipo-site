import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useCreateSubscribeMutation } from '../../app/subscribeCRM.api.js';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ru from 'date-fns/locale/ru';
import { formatISO } from 'date-fns';
import { id } from 'date-fns/locale';


export default function SMSModal({ modalData, show, setShowSMSModal }) {

  //let postContent;
  const [postContent, setPostContent] = useState();
  const [createSubscribe] = useCreateSubscribeMutation();
  //const [patchSubscribe] = usePatchSubscribeMutation();


  //console.log('subscribe', modalData.patchBody.subscribe);
  const [title, setTitle] = useState(modalData.title);
  const [buttonTitle] = useState(modalData.buttonTitle);
  const [idList, setIdList] = useState(modalData.list);
  const [sms_date_end, set_sms_date_end] = useState();
  const [email_date_end, set_email_date_end] = useState();
  const [smsCheck, setSmsCheck] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const [list, setList] = useState(modalData.list);
  //const dateFormat = 'dd.MM.yyyy';

  // const formData = new FormData(e.target),
  // formDataObj = Object.fromEntries(formData.entries())


  function handleSubscribe(e, field) {

    if (field === 'sms_send') {
      setSmsCheck(e.target.checked)
    }
    if (field === 'email_send') {
      setEmailCheck(e.target.checked)
    }
  }

  function handleSMSDate(date) {
    //let body01 = structuredClone(bodySub); 
    set_sms_date_end(formatISO(date));

  }

  function handleEmailDate(date) {
    //let body01 = structuredClone(bodySub); 
    set_email_date_end(formatISO(date));

  }


  async function send(e) {
    // валидация
    e.preventDefault();
    setPostContent('');
    if (email_date_end === undefined) {
      set_email_date_end(null);
    }
    if (!sms_date_end === undefined) {
      set_sms_date_end(null);
    }

    let list2 = [];
    for (const el of Object.entries(list)) {
      list2.push({
        client_id: parseInt(el[0]),
        sms_send: smsCheck,
        email_send: emailCheck,
        email_date_end:  email_date_end,
        sms_date_end:  sms_date_end,
      }) 
    }


    if (modalData.mode === 'create') {
      // записываем клиента
      let index = 0;
      for (const sub of list2) {
        ++index;
        let res2 = await createSubscribe(sub);
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
              Запись {index} / {list2.length}
            </div>
          )
        };
      };
      }


    modalData.refetch();

    e.target.reset();
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Modal show={show} onHide={() => setShowSMSModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => send(e)}>
            <Modal.Body style={{ lineHeight: 0.8 }} >
              <p>Передано клиентов: {Object.entries(list).length}</p>
              <Form.Group className="mb-3 input_wrapper">
                <Form.Check defaultChecked={smsCheck} type="checkbox" name='sms_send' label="SMS-рассылка" onChange={(e) => handleSubscribe(e, 'sms_send')} />
                <DatePicker 
                  label="дата окончания"
                  name='sms_date_end'
                  onChange={(date) => handleSMSDate(date)}
                />
              </Form.Group>
              <Form.Group className="mb-3 input_wrapper">
                <Form.Check defaultChecked={emailCheck} type="checkbox" name='email_send' label="Email-рассылка" onChange={(e) => handleSubscribe(e, 'email_send')} />
                <DatePicker 
                  label="дата окончания"
                  name='email_date_end'
                  onChange={(date) => handleEmailDate(date)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              {postContent}
              {/* {isError ?
                            <div className="alert alert-danger" role="alert">
                                {JSON.stringify(error)}
                            </div>
                            : ''} */}
              <fieldset>

                <Button type='submit' >
                  {buttonTitle}
                </Button>
              </fieldset>

            </Modal.Footer>

          </Form>
        </Modal>

      </LocalizationProvider>;
    </div>
  )
}
