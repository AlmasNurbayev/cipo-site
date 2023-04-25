import React, { useCallback, useMemo, useRef, useState } from 'react'
//import axios from 'axios/dist/browser/axios.cjs';
//import { useGetSubscribeQuery } from '../../app/subscribe.api';
import Spinner from 'react-bootstrap/Spinner';

import { useGetAllClientQuery } from '../../app/client.api';
import debounce from 'lodash.debounce';
import Alert from 'react-bootstrap/Alert';
import PaginationCRM from './PaginationCRM';
import MaterialReactTable from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';


export default function ClientManage() {

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  //let [skip, setSkip] = useState(0);


  const inputRef = useRef();


  const query = { filters: JSON.stringify(columnFilters ?? []), columnFilters, size: pagination.pageSize, start: `${pagination.pageIndex * pagination.pageSize}` };
  const { data, refetch, isLoading, error, isError, isFetching } = useGetAllClientQuery(query);

  console.log('columnFilters', JSON.stringify(columnFilters));
  console.log('globalFilter', JSON.stringify(globalFilter));
  console.log('sorting', JSON.stringify(sorting));
  console.log('pagination', JSON.stringify(pagination));

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'id of',
      },
      {
        accessorKey: 'email',
        header: 'email',
      },
      {
        accessorKey: 'phone',
        header: 'phone number',
      },
      {
        accessorKey: 'name',
        header: 'name',
      },
      {
        accessorKey: 'city',
        header: 'city',
      },
      {
        accessorKey: 'district',
        header: 'district of city',
      },
      {
        accessorKey: 'wish',
        header: 'wish text',
      },
      {
        accessorKey: 'create_date',
        header: 'create date',
        enableColumnFilter: false,
      },
      {
        accessorKey: 'sms_send',
        header: 'sms_send',
        filterVariant: 'checkbox',
        accessorFn: (row) => JSON.stringify(row.subscribe[row.subscribe.length-1]),
        Cell: ({ cell }) => (
          <span>{send_view(cell.getValue(), 'sms_send')}
          </span>
        ),        
      },
      {
        accessorKey: 'email_send',
        header: 'email_send',
        filterVariant: 'checkbox',
        accessorFn: (row) => JSON.stringify(row.subscribe[row.subscribe.length-1]),
        Cell: ({ cell }) => (
          <span>{send_view(cell.getValue(), 'email_send')}
          </span>
        ),        
      },      


    ],
    [],
  );

 function send_view(val, prop) {

    if (typeof val === 'string') {
      val = JSON.parse(val);
      if (val.hasOwnProperty(prop)) {
        console.log('val', val);
        if (val[prop]) {
          return 'true'
        } else {
          return 'false'
        }
      } else {return ''}
    } 
    
 }    

  return (
    <div>Client Manage
      {error ?
        <div>
          <Alert key={'success'} variant='danger' dismissible>
            Необходима повторная авторизация: {error.status}
          </Alert>
          {/* {dispatch(removeUser());
                setTimeout(() => Navigate('/auth'), 2000);} */}

        </div>
        :
        <div>
          {isLoading
            ?
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            //  <span>готово</span>

            <div>
              <div>

                {/* <PaginationCRM totalCount={data.totalCount} updateSkip={setSkip} /> */}
              </div>
              {data.data.length === 0 ? <h5>Нет данных</h5> : ''}
              <MaterialReactTable
                columns={columns}
                data={data?.data ?? []} //data is undefined on first render
                initialState={{ showColumnFilters: true }}
                manualFiltering
                manualPagination
                manualSorting
                muiToolbarAlertBannerProps={
                  isError
                    ? {
                      color: 'error',
                      children: 'Error loading data',
                    }
                    : undefined
                }
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                renderTopToolbarCustomActions={() => (
                  <Tooltip arrow title="Refresh Data">
                    <IconButton onClick={refetch}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                )}
                rowCount={data.totalCount ?? 0}
                state={{
                  columnFilters,
                  globalFilter,
                  isLoading,
                  pagination,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                  sorting,
                }}
              />              {/* <PaginationCRM totalCount={data.totalCount} updateSkip={updateSkip} /> */}
            </div>
          }
        </div>
      }

    </div >
  )
}
