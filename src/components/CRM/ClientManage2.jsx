import React, { useMemo, useState } from 'react'
//import axios from 'axios/dist/browser/axios.cjs';
//import { useGetSubscribeQuery } from '../../app/subscribe.api';
import Spinner from 'react-bootstrap/Spinner';

import { useGetAllClientQuery, useDeleteClientMutation } from '../../app/client.api';
//import debounce from 'lodash.debounce';
import Alert from 'react-bootstrap/Alert';
//import PaginationCRM from './PaginationCRM';
import MaterialReactTable from 'material-react-table';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as CreateIcon,
  SendToMobile as SMSIcon,
} from '@mui/icons-material';
import ClientModal from './ClientModal';
import { useDeleteSubscribeIDMutation, useDeleteSubscribeMutation } from '../../app/subscribeCRM.api';
import SMSModal from './SMSModal';

export default function ClientManage() {

  const [columnFilters, setColumnFilters] = useState([]);
  //const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 100,
  });
  const query = { sorting: JSON.stringify(sorting ?? []),filters: JSON.stringify(columnFilters ?? []), size: pagination.pageSize, start: `${pagination.pageIndex * pagination.pageSize}` };
  const { data, refetch, isLoading, error, isError, isFetching } = useGetAllClientQuery(query);
  const [postContent, setPostContent] = useState('');
  const [ deleteClient ] = useDeleteClientMutation();
  const [deleteSubscribeID] = useDeleteSubscribeIDMutation();
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  console.log('columnFilters', JSON.stringify(columnFilters));
  //console.log('globalFilter', JSON.stringify(globalFilter));
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
        accessorKey: 'sms_send',
        enableSorting: false,
        header: 'sms_send',
        filterVariant: 'checkbox',
        accessorFn: (row) => JSON.stringify(row.subscribe[row.subscribe.length - 1]),
        Cell: ({ cell }) => (
          <span>{send_view(cell.getValue(), 'sms_send')}
          </span>
        ),
      },
      {
        accessorKey: 'email_send',
        enableSorting: false,
        header: 'email_send',
        filterVariant: 'checkbox',
        accessorFn: (row) => JSON.stringify(row.subscribe[row.subscribe.length - 1]),
        Cell: ({ cell }) => (
          <span>{send_view(cell.getValue(), 'email_send')}
          </span>
        ),
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



    ],
    [],
  );

  async function create() {
    setModalData({
      mode: 'create',
      title: 'Создание клиента',
      buttonTitle: 'Создать',
      patchBody: {phone: ''},
      refetch: refetch,
    });
    setShowClientModal(true);
  }  

  async function createSMS() {
    setModalData({
      mode: 'create',
      title: 'Создание СМС подписок',
      buttonTitle: 'Создать',
      list: rowSelection,
      refetch: refetch,
    });
    setShowSMSModal(true);
  }

  async function patchRow(row) {
    console.log('row', row);

    setModalData({
      mode: 'edit',
      title: 'Изменение клиента',
      buttonTitle: 'Изменить',
      patchBody: row.original,
      refetch: refetch,
    });
    setShowClientModal(true);    

  }

  async function deleteRow(row) {
    if (
      !window.confirm(`Подвердите удаление ${row.getValue('phone')} / ${row.getValue('email')}`)
    ) {
      return;
    }
    let res2 = await deleteSubscribeID(row.original.id);
    if (res2.hasOwnProperty('error')) {
      setPostContent(
        <div className="alert alert-danger" role="alert">
          Ошибка {JSON.stringify(res2.error)}
        </div>
      )
    };
    if (res2.hasOwnProperty('data')) {
      setPostContent(
        <div className="alert alert-success" role="alert">
          Выполнено
        </div>
      )
    };    


    
    let res = await deleteClient(row.original.id);
    if (res.hasOwnProperty('error')) {
      setPostContent(
        <div className="alert alert-danger" role="alert">
          Ошибка {JSON.stringify(res.error)}
        </div>
      )
    };
    if (res.hasOwnProperty('data')) {
      setPostContent(
        <div className="alert alert-success" role="alert">
          Выполнено
        </div>
      )
    };    
    
    refetch();
  }



  function send_view(val, prop) {

    if (typeof val === 'string') {
      val = JSON.parse(val);
      if (val.hasOwnProperty(prop)) {
        //console.log('val', val);
        if (val[prop]) {
          return 'true'
        } else {
          return 'false'
        }
      } else { return '' }
    }

  }

  return (
    <div><div className='par'>Client Manage:</div>
    <span>Не работает в бэкенде - фильтрация и сортировка по send-полям </span>
      {error ?
        <div>
          <Alert key={'success'} variant='danger' dismissible>
            {error.status}
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
              {showClientModal ? <ClientModal modalData={modalData} show={showClientModal} setShowClientModal={setShowClientModal}></ClientModal> : ''}
              {showSMSModal ? <SMSModal modalData={modalData} show={showSMSModal} setShowSMSModal={setShowSMSModal}></SMSModal> : ''}
              {postContent !== '' ?

                <Alert key={'success'} variant={String(postContent).slice(0, 1) === 'В' ? 'success' : 'danger'} dismissible>
                  {postContent}
                </Alert>

                : ''}

              <MaterialReactTable
                columns={columns}
                data={data?.data ?? []} //data is undefined on first render
                getRowId={(originalRow) => originalRow.id}
                //enableRowActions

                // editingMode="modal" //default
                enableEditing={false}
                //onEditingRowSave={patchRow}
                positionPagination='top'
                muiTablePaginationProps={{
                  rowsPerPageOptions: [50, 100, 200],
                }}
                enableRowSelection
                enableMultiRowSelection
                onRowSelectionChange={setRowSelection}
                enableSelectAll
                selectAllMode={'page'}
                enableRowActions
                renderRowActions={({ row, table }) => (
                  <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        //table.setEditingRow(row);
                        patchRow(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        console.log(row);
                        deleteRow(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    
                  </Box>
                )}

                initialState={{ showColumnFilters: true, density: 'compact' }}
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
                //onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                renderTopToolbarCustomActions={() => (
                  <div>
                    <IconButton onClick={refetch}>
                      <RefreshIcon />
                    </IconButton>

                    <IconButton onClick={() => create()}>
                      <CreateIcon />
                    </IconButton>
                    <IconButton onClick={() => createSMS()}>
                      <SMSIcon />...
                    </IconButton>                    
                  </div>
                )}
                rowCount={data.totalCount ?? 0}
                state={{
                  columnFilters,
                  //globalFilter,
                  isLoading,
                  pagination,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                  sorting,
                  rowSelection
                }}

              />              {/* <PaginationCRM totalCount={data.totalCount} updateSkip={updateSkip} /> */}
            </div>
          }
        </div>
      }

    </div >
  )
}
