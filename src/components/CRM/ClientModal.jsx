import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useCreateClientMutation, usePatchClientMutation } from '../../app/client.api.js';
import { useCreateSubscribeMutation } from '../../app/subscribeCRM.api.js';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ru from 'date-fns/locale/ru';
import { formatISO, parseISO } from 'date-fns';


export default function ClientModal({ modalData, show, setShowClientModal }) {

    //let postContent;
    const [postContent, setPostContent] = useState();
    const [createClient, { isLoading: isLoadingClientCreate }] = useCreateClientMutation();
    const [patchClient, { isLoading: isLoadingClientPatch }] = usePatchClientMutation();
    const [createSubscribe] = useCreateSubscribeMutation();
    //const [patchSubscribe] = usePatchSubscribeMutation();

    
    //console.log('subscribe', modalData.patchBody.subscribe);
    const [title, setTitle] = useState(modalData.title);
    const [buttonTitle] = useState(modalData.buttonTitle);
    const [mode] = useState(modalData.mode);
    const [bodySub, setBodySub] = useState({});
    const [body, setBody] = useState({});
    //const dateFormat = 'dd.MM.yyyy';
    
    if (Object.entries(bodySub).length === 0) { // предотвращаем затирание объекта bodySub0 старыми данными из пропса
        if (modalData.patchBody.subscribe) {
            if (modalData.patchBody.subscribe.length > 0) {
                let bodySub0 = structuredClone(modalData.patchBody.subscribe[0]);
                delete bodySub0.id; // удаляем так как будет записываться новая подписка в обоих случаях
                setBodySub(bodySub0);
            }
        }
    }

    if (Object.entries(body).length === 0) { // предотвращаем затирание объекта body0 старыми данными из пропса
        let body0 = structuredClone(modalData.patchBody);
        delete body0.subscribe; // удаляем так как не должно быть в новой записи клиента
        setBody(body0);
    }        

    // const formData = new FormData(e.target),
    // formDataObj = Object.fromEntries(formData.entries())


    function handleSubscribe(e, field) {
        let body01 = structuredClone(bodySub); 
        body01[field] = e.target.checked;
        setBodySub(body01);        
    }

    function handleSMSDate(date) {
        let body01 = structuredClone(bodySub); 
        body01.sms_date_end = formatISO(date);
        setBodySub(body01);
    }

    function handleEmailDate(date) {
        let body01 = structuredClone(bodySub); 
        body01.email_date_end = formatISO(date);
        setBodySub(body01);
    }

    function handleBody(e) {
        //e.preventDefault();
        const formData = new FormData(e.target.form);
        let formDataObj = Object.fromEntries(formData.entries())
        //console.log(formDataObj);
        setBody({
            id: formDataObj.id === '' ? null : parseInt(formDataObj.id),
            email: formDataObj.email === '' ? null : formDataObj.email,
            phone: formDataObj.phone === '' ? null : formDataObj.phone,
            name: formDataObj.name === '' ? null : formDataObj.name,
            city: formDataObj.city === '' ? null : formDataObj.city,
            district: formDataObj.district === '' ? null : formDataObj.district,
            wish: formDataObj.wish === '' ? null : formDataObj.wish,
        });


    }


    async function send(e) {
        // валидация
        e.preventDefault();
        setPostContent('');
        const formData = new FormData(e.target.form);
        let formDataObj = Object.fromEntries(formData.entries())
        if (formDataObj.email === '' && formDataObj.phone === '') {
            alert('Необходимо ввести email или телефон');
            return;
        };


        if (mode === 'create') {
            // записываем клиента
            let body_create = structuredClone(body);
            delete body_create.id;

            let res = await createClient(body_create);
            if (res.hasOwnProperty('error')) {
                setPostContent(
                    <div className="alert alert-danger" role="alert">
                        Возникла ошибка  {JSON.stringify(res.error)}
                    </div>
                )
            };
            if (res.hasOwnProperty('data')) {
                setPostContent(
                    <div className="alert alert-success" role="alert">
                        Данные записаны
                    </div>
                )
            };
            // записываем подписки
            let bodySub2 = bodySub;
            bodySub2.client_id = res.data.id;
            let res2 = await createSubscribe(bodySub2);
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
                        Данные записаны
                    </div>
                )
            };
        };
        if (mode === 'edit') {
            const formData = new FormData(e.target),
                formDataObj = Object.fromEntries(formData.entries())
            if (formDataObj.email === '' && formDataObj.phone === '') {
                alert('Необходимо ввести email или телефон');
            }

            //записываем клиента
            let res = await patchClient(body);
            if (res.hasOwnProperty('error')) {
                setPostContent(
                    <div className="alert alert-danger" role="alert">
                        Возникла ошибка  {JSON.stringify(res.error)}
                    </div>
                )
            };
            if (res.hasOwnProperty('data')) {
                setPostContent(
                    <div className="alert alert-success" role="alert">
                        Данные записаны
                    </div>
                )
            };
            // записываем подписку как новую!
            let bodySub2 = bodySub;
            bodySub2.client_id = res.data.id;
            //console.log('bodySub2', bodySub2);
            let res2 = await createSubscribe(bodySub2);
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
                        Данные записаны
                    </div>
                )
            };
        };
        modalData.refetch();

        e.target.reset();
    }

    console.log('new bodySub', bodySub);
    console.log('new body', body);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                <Modal show={show} onHide={() => setShowClientModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => send(e)} onChange={(e) => handleBody(e)} >
                        <Modal.Body style={{ lineHeight: 0.8 }} >
                            <Form.Group required={true} className="mb-3 input_wrapper" id="id">
                                {/* <Form.Label>Email: </Form.Label> */}
                                <Form.Control defaultValue={body.id} type="text" name='id' placeholder="id" readOnly />
                            </Form.Group>
                            <Form.Group required={true} className="mb-3 input_wrapper" id="email">
                                {/* <Form.Label>Email: </Form.Label> */}
                                <Form.Control defaultValue={body.email} type="email" name='email' placeholder="Введите email" />
                            </Form.Group>
                            <Form.Group required={true} className="mb-3 input_wrapper" id="phone">
                                {/* <Form.Label>Телефон: </Form.Label> */}
                                <Form.Control defaultValue={body.phone} type="tel" name='phone' placeholder="Введите номер телефона" />
                            </Form.Group>
                            <Form.Group required={true} className="mb-3 input_wrapper" id="name">
                                <Form.Control defaultValue={body.name} type="text" name='name' placeholder="Ваше имя" />
                            </Form.Group>
                            <Form.Group className="mb-3 input_wrapper" id="other">
                                {/* <Form.Label>Телефон: </Form.Label> */}

                                <Form.Control defaultValue={body.city} type="text" name='city' placeholder="Ваш город" />
                                <Form.Control defaultValue={body.district} type="text" name='district' placeholder="Район города" />
                            </Form.Group>
                            <Form.Group className="mb-3 input_wrapper" id="other">
                                <Form.Control defaultValue={body.wish} as="textarea" rows={3} type="text" name='wish' placeholder="Пожелания" />
                            </Form.Group>
                            <Form.Group className="mb-3 input_wrapper">
                                <Form.Check defaultChecked={bodySub.sms_send} type="checkbox" name='sms_send' label="SMS-рассылка" onChange={(e) => handleSubscribe(e, 'sms_send')} />
                                <DatePicker defaultValue={parseISO(bodySub.sms_date_end)}
                                    label="дата окончания"
                                    name='sms_date_end'
                                    onChange={(date) => handleSMSDate(date)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 input_wrapper">
                                <Form.Check defaultChecked={bodySub.email_send} type="checkbox" name='email_send' label="Email-рассылка" onChange={(e) => handleSubscribe(e, 'email_send')}/>
                                <DatePicker defaultValue={parseISO(bodySub.email_date_end)}
                                    label='дата окончания'
                                    name='email_date_end'
                                    onChange={(date) => handleEmailDate(date)}
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            {postContent}
                            {isLoadingClientPatch ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                : ''}
                            {isLoadingClientCreate ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                : ''}
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
