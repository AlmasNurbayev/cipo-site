import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useCreateSubscribeMutation } from '../app/subscribe.api.js';


export default function SubscribeModal({ show, setShowSubscribe }) {

    //let postContent;
    const [agree, setAgree] = useState(false);
    const [postContent, setPostContent] = useState();
    const [
        createSubscribe, { 
            isLoading
            }
    ] = useCreateSubscribeMutation();

    //console.log('show in modal', show);

    function changeAgree(i) {
        if (i.target.checked) { setAgree(true) } else { setAgree(false) }
        //console.log(i.target.checked);
    }

    async function send(e) {
        // валидация
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        if (formDataObj.city === '' && formDataObj.phone === '') {
            alert('Необходимо ввести email или телефон');
        }

        const body = {
            email: formDataObj.email,
            phone: formDataObj.phone,
            city: formDataObj.city,
            district: formDataObj.district,
            agree: formDataObj.agree,
            wish: formDataObj.wish
        }
        setPostContent('');
        let res = await createSubscribe(body);

        if (res.hasOwnProperty('error')) {
            setPostContent(
                <div className="alert alert-danger" role="alert">
                    Возникла ошибка (например email или телефон уже есть в базе) {JSON.stringify(res.error)}
                </div>
            )
            //console.log(JSON.stringify(res));
        };
        if (res.hasOwnProperty('data')) {
            setPostContent(
                <div className="alert alert-success" role="alert">
                    Спасибо, данные отправлены
                </div>
            )
        };



        e.target.reset();

    }

    return (
        <div>
            <Modal show={show} onHide={() => setShowSubscribe(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать рассылку</Modal.Title>
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
                        <Form.Group className="mb-3 input_wrapper" id="other">
                            {/* <Form.Label>Телефон: </Form.Label> */}
                            <Form.Control type="text" name='city' placeholder="Ваш город" />
                            <Form.Control type="text" name='district' placeholder="Район города" />
                        </Form.Group>
                        <Form.Group className="mb-3 input_wrapper" id="other">
                            <Form.Control as="textarea" rows={3} type="text" name='wish' placeholder="Пожелания" />
                        </Form.Group>

                        <Form.Group className="mb-3" id="formBasicCheckbox">
                            <Form.Check type="checkbox" name='agree' value={agree} onChange={(i) => changeAgree(i)} label="согласен на получение рассылки" />
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
                        <fieldset disabled={!agree}>

                            <Button type='submit' >
                                Подписаться
                            </Button>
                        </fieldset>

                    </Modal.Footer>

                </Form>
            </Modal>


        </div>
    )
}
