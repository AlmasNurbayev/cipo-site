import React, { useState } from 'react'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Contacts from '../components/Contacts'
import { useDispatch } from 'react-redux'
import FormUser from '../components/FormUser'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../app/slices/userSlice';
import Alert from 'react-bootstrap/Alert'


export default function AuthPage() {

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleLogin(event, email, password) {
    event.preventDefault();

    const auth = getAuth();


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        dispatch(setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
          token: userCredential.user.accessToken
        }));
        setMessage('Успешный вход ' + email + '. Перенаправление на страницу CRM');
        setTimeout(() => navigate('/crm'), 2000);
      })
      .catch(error => {
        console.log(error);
        setMessage('Возникла ошибка: ' + String(error));
      });



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
