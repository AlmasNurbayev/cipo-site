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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SendingManage from '../components/CRM/SendingManage';
import Menu from '../components/CRM/Menu';

export default function CrmClientsPage() {

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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Header />
                <div className='Block_wrapper'>
                    <h3>CRM</h3>
                    <Menu></Menu>                     
                    <SendingManage></SendingManage>
                    <div style={{marginTop: '20px'}}><Button onClick={() => 
                        logout()
                    } >Выйти из пользователя: {email}</Button>
                    </div>
                </div>

                <Contacts />
                </LocalizationProvider>
            </div>
    )
}
