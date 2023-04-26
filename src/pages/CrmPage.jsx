import React from 'react'

import Header from '../components/Header'
import Contacts from '../components/Contacts'
import { useAuth } from '../hooks/useAuth'
import { Navigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../app/slices/userSlice';
import { Button } from 'react-bootstrap';
//import ClientManage from '../components/CRM/ClientManage';
import ClientManage from '../components/CRM/ClientManage2';

export default function CrmPage() {

    const { isAuth, email } = useAuth();
    const dispatch = useDispatch();

    function logout() {
        dispatch(removeUser());
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        
        //setTimeout(() => , 1000);
        
        }


    console.log(isAuth);

    return (
        !isAuth ? <Navigate to='/auth' /> :
            <div>
                <Header />
                <div className='Block_wrapper'>
                    <h3>CRM page</h3>
                    <ClientManage></ClientManage>
                    <Button onClick={() => 
                        logout()
                    } >Выйти из пользователя: {email}</Button>
                </div>

                <Contacts />
            </div>
    )
}
