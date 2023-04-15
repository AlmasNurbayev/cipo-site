import { useState } from 'react'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function FormUser({event, send, title}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div>
              <Form onSubmit={(e) => send(e, email, password)} title={title}>
                        <Form.Group required={true} className="mb-3 FormUser">
                            {/* <Form.Label>Email: </Form.Label> */}
                            <Form.Control style={{margin: '10px'}} key='email' type="email" value={email} placeholder="Введите email" onChange={(e) => setEmail(e.target.value)}/>
                            <Form.Control style={{margin: '10px'}} key='password' type="password" value={password} placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                            <Button style={{margin: '10px'}} variant="primary" type='submit' >
                                Ввод
                            </Button>

                        </Form.Group>        
               </Form>                    

    </div>
  )
}
