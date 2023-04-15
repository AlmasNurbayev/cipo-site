import React, { useState } from 'react';

import Header from '../components/Header';
import Contacts from '../components/Contacts';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormUser from '../components/FormUser';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../app/slices/userSlice'
import Alert from 'react-bootstrap/Alert';


export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  function handleRegister(event, email, password) {
    event.preventDefault();

    const auth = getAuth();


    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken
        }));
        setMessage('Регистрация прошла успешно! ' + email);
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
