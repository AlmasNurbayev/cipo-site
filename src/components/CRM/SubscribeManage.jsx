import React from 'react'
//import axios from 'axios/dist/browser/axios.cjs';
import { useGetSubscribeQuery } from '../../app/subscribe.api';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SubscribeManage() {
    const { data, isLoading, error } = useGetSubscribeQuery();



    return (
        <div>SubscribeManage
        {isLoading
          ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          :
          //  <span>готово</span>
          <div>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>email</th>
              <th>phone</th>
              <th>city</th>
              <th>district</th>
              <th>create_date</th>
              <th>sms-send 
                <Button>+</Button>
                <Button>-</Button>
              </th>
            </tr>
          </thead>
          
          <tbody>
          
          {data.map((e, index) => 
             (<tr>
                <td>{index}</td>
                <td>{e.id}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.city}</td>
                <td>{e.district}</td>
                <td>{e.create_date}</td>
                <td>    <Form.Check 
                        type={'checkbox'}
                        id={e.id}
                        // label={`default ${type}`}
                        />
                </td>
            </tr>)          
          )}
          
          </tbody>
          </Table>
          </div>
        }                    
        </div>

        
    )
}
