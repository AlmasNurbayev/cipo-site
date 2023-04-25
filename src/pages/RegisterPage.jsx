import React, { useState } from 'react';

import Header from '../components/Header';
import Contacts from '../components/Contacts';
import { Link, useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import FormUser from '../components/FormUser';

//import { setUser } from '../app/slices/userSlice'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { backend_url_crm } from '../app/product.api';


export default function RegisterPage() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  function handleRegister(event, email, password) {
    event.preventDefault();

    axios.post(backend_url_crm + '/api/user/create', {
      email: email,
      password: password
    })
    .then(function (response) {
      setMessage('Регистрация прошла успешно! Необходимо войти в систему ' + email);
      setTimeout(() => navigate('/auth'), 2000);      
      console.log(response);
    })
    .catch(function (error) {
      setMessage('Возникла ошибка: ' + String(error));
    });

  }

  return (
    <div>
      <Header />
      <div className='Block_wrapper'>
        <h3>Register</h3>
        <p>
          Already account? <Link to='/auth'>login</Link>
        </p>
        <FormUser title='register' send={handleRegister}></FormUser>
        {message !== '' ?

          <Alert key={'success'} variant={String(message).slice(0, 1) === 'Р' ? 'success' : 'danger'} dismissible>
            {message}
          </Alert>
          : ''}
      </div>
      <Contacts />
    </div>
  )
}
