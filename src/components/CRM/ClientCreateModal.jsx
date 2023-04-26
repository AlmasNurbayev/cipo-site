import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useCreateClientMutation } from '../../app/client.api.js';
import { DatePicker } from '@mui/x-date-pickers';


export default function ClientCreateModal({ show, setShowClientCreate }) {

    //let postContent;
    const [postContent, setPostContent] = useState();
    const [
      createClient, { 
            isLoading
            }
    ] = useCreateClientMutation();

    //console.log('show in modal', show);


    async function send(e) {
        // валидация
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        if (formDataObj.email === '' && formDataObj.phone === '') {
            alert('Необходимо ввести email или телефон');
        }

        const body = {
            email: formDataObj.email,
            phone: formDataObj.phone,
            name: formDataObj.name,
            city: formDataObj.city,
            district: formDataObj.district,
            wish: formDataObj.wish,
            sms_send: formDataObj.sms_send.checked,
            email_send: formDataObj.email_send,
        }
        setPostContent('');
        let res = await createClient(body);

        if (res.hasOwnProperty('error')) {
            setPostContent(
                <div className="alert alert-danger" role="alert">
                    Возникла ошибка  {JSON.stringify(res.error)}
                </div>
            )
            //console.log(JSON.stringify(res));
        };
        if (res.hasOwnProperty('data')) {
            setPostContent(
                <div className="alert alert-success" role="alert">
                    Данные записаны
                </div>
            )
        };



        e.target.reset();

    }

    return (
        <div>
            <Modal show={show} onHide={() => setShowClientCreate(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать нового клиента</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => send(e)}>
                    <Modal.Body style={{ lineHeight: 0.8 }}>

                        <Form.Group required={true} className="mb-3 input_wrapper" id="email">
                            {/* <Form.Label>Email: </Form.Label> */}
                            <Form.Control type="email" name='email' placeholder="Введите email" />
                        </Form.Group>
                        <Form.Group required={true} className="mb-3 input_wrapper" id="phone">
                            {/* <Form.Label>Телефон: </Form.Label> */}
                            <Form.Control type="tel" name='phone' placeholder="Введите номер телефона" />
                        </Form.Group>
                        <Form.Group required={true} className="mb-3 input_wrapper" id="name">
                            <Form.Control type="text" name='name' placeholder="Ваше имя" />
                        </Form.Group>    
                        <Form.Group className="mb-3 input_wrapper" id="other">
                            {/* <Form.Label>Телефон: </Form.Label> */}
                            
                            <Form.Control type="text" name='city' placeholder="Ваш город" />
                            <Form.Control type="text" name='district' placeholder="Район города" />
                        </Form.Group>
                        <Form.Group className="mb-3 input_wrapper" id="other">
                            <Form.Control as="textarea" rows={3} type="text" name='wish' placeholder="Пожелания" />
                        </Form.Group>
                        <Form.Group className="mb-3 input_wrapper">
                            <Form.Check type="checkbox" name='sms_send' label="SMS-рассылка" />
                            <DatePicker label="дата окончания" name="sms_send_date"/>
                        </Form.Group>    
                        <Form.Group className="mb-3 input_wrapper">
                            <Form.Check type="checkbox" name='email_send' label="Email-рассылка" />
                            <DatePicker label="дата окончания" name="email_send_date"/>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        {postContent}
                        {isLoading ?
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
                                Создать
                            </Button>
                        </fieldset>

                    </Modal.Footer>

                </Form>
            </Modal>


        </div>
    )
}
