import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Contacts from '../components/Contacts'
import { useDispatch } from 'react-redux'
import FormUser from '../components/FormUser'
import { setUser } from '../app/slices/userSlice';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { backend_url_crm } from '../app/product.api'


export default function AuthPage() {

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleLogin(event, email, password) {
    event.preventDefault();

    axios.post(backend_url_crm + '/api/auth/login', {
      email: email,
      password: password
    })
      .then(function (response) {
        dispatch(setUser({
          email: email,
          //id: userCredential.user.uid,
          token: response.data.accessToken
        }));
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);        
        localStorage.setItem('email', email);                 

        setMessage('Успешный вход ' + email + '. Перенаправление на страницу CRM');
        setTimeout(() => navigate('/crm'), 2000);
      })
      .catch(function (error) {
        setMessage('Возникла ошибка: ' + String(error));
      })
}

return (
  <div>
    <Header />
    <div className='Block_wrapper'>
      <h3>Авторизация</h3>
      <p>or <Link to='/register'>register</Link></p>
      <FormUser title='sign in'
        send={handleLogin}>
      </FormUser>
      {message !== '' ?

        <Alert key={'success'} variant={String(message).slice(0, 1) === 'У' ? 'success' : 'danger'} dismissible>
          {message}
        </Alert>

        : ''}

    </div>
    <Contacts />
  </div>
)
}
