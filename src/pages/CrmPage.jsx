import React from 'react'

import Header from '../components/Header'
import Contacts from '../components/Contacts'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../app/slices/userSlice';
import { Button } from 'react-bootstrap';
import SubscribeManage from '../components/CRM/SubscribeManage';

export default function CrmPage() {

    const { isAuth, email } = useAuth();
    const dispatch = useDispatch();


    console.log(isAuth);

    return (
        !isAuth ? <Navigate to='/auth' /> :
            <div>
                <Header />
                <div className='Block_wrapper'>
                    <h3>CRM page</h3>
                    <SubscribeManage></SubscribeManage>
                    <Button onClick={() => dispatch(removeUser())} >Выйти из пользователя: {email}</Button>
                </div>

                <Contacts />
            </div>
    )
}
