import React, { useMemo, useRef, useState } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//import { useGetAllSubscribeQuery } from '../../app/subscribeCRM.api';
import { useGetAllClientQuery } from '../../app/client.api';
import MaterialReactTable from 'material-react-table';
import MRT_TableInstance from 'material-react-table';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
//import RefreshIcon from '@mui/icons-material/Refresh';
import { Box } from '@mui/material';
import CompaignModal from './CompaignModal';

export default function SendingManage() {

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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'id of',
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
        accessorKey: 'sms_date_end',
        enableSorting: false,
        header: 'sms_date_end',
        accessorFn: (row) => row.subscribe[row.subscribe.length - 1],
        Cell: ({ cell }) => (
          <span>{String(cell.getValue().sms_date_end)}
          </span>
        ),
      },
      {
        accessorKey: 'city',
        header: 'city',
        enableColumnFilter: false,
      },
    ],
    [],
  );

  const [showCompaignModal, setShowCompaignModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const tableInstanceRef = useRef(null); //ts

  async function manageCompaign() {

    const list = tableInstanceRef.current.getState().rowSelection;
    const listPhone = [];

    for (const elList of Object.entries(list)) {
      const dataFind = data.data.find(elData => elData.id === parseInt(elList[0]));
      if (dataFind) {
        listPhone.push({
          client_id: dataFind.id,
          phone: dataFind.phone,
          sms_date_end: dataFind.subscribe[0].sms_date_end
        })         
      }

    }

    setModalData({
      mode: 'manage',
      title: 'Управление СМС-компанией',
      //buttonTitle: 'Создать',
      list: listPhone,
      refetch: refetch,
    });
    console.log(list);
    setShowCompaignModal(true);
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 100,
  });
  const query = { 
    filters: JSON.stringify([{ id: 'sms_send', value: 'true'}]), 
  };
  const { data, refetch, isLoading, error, isError, isFetching } = useGetAllClientQuery(query);


  return (
    <div>
      <div className='par'>Sending:</div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="sms" title="sms">

          {error ?
            <div>
              <Alert key={'success'} variant='danger' dismissible>
                {error.status}
              </Alert>

            </div>
            :
            <div>
              {isLoading
                ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                :

                <div>
                  {data.data.length === 0 ? <h5>Нет данных</h5> : ''}
                  <Button onClick={() => manageCompaign()}>Создать СМС-рассылку</Button>
                  {showCompaignModal ? <CompaignModal modalData={modalData} show={showCompaignModal} setShowCompaignModal={setShowCompaignModal}></CompaignModal> : ''}

                  <MaterialReactTable
                    columns={columns}
                    data={data?.data ?? []} //data is undefined on first render
                    getRowId={(originalRow) => originalRow.id}
                    //enableRowActions

                    // editingMode="modal" //default
                    tableInstanceRef={tableInstanceRef}
                    enableEditing={false}
                    //onEditingRowSave={patchRow}
                    positionPagination='top'
                    muiTablePaginationProps={{
                      rowsPerPageOptions: [50, 100, 200],
                    }}
                    enableRowSelection
                    enableMultiRowSelection
                    //onRowSelectionChange={setRowSelection}
                    enableSelectAll
                    selectAllMode='all'
                    enableRowActions
                    renderRowActions={({ row, table }) => (
                      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                      </Box>
                    )}

                    initialState={{ showColumnFilters: true, density: 'compact' }}
                    //manualFiltering
                    //manualPagination
                    //manualSorting
                    muiToolbarAlertBannerProps={
                      isError
                        ? {
                          color: 'error',
                          children: 'Error loading data',
                        }
                        : undefined
                    }
                    //onColumnFiltersChange={setColumnFilters}
                    //onGlobalFilterChange={setGlobalFilter}
                    onPaginationChange={setPagination}
                    //onSortingChange={setSorting}
                    renderTopToolbarCustomActions={() => (
                      <div>
                      <IconButton onClick={refetch}>
                      <RefreshIcon />
                      </IconButton>
                      </div>
                    )}
                    rowCount={data.totalCount ?? 0}
                    state={{
                      //columnFilters,
                      //globalFilter,
                      isLoading,
                      pagination,
                      showAlertBanner: isError,
                      showProgressBars: isFetching,
                      //sorting,
                      //rowSelection
                    }}
                  />
                </div>
              }
            </div>
          }

        </Tab>
        <Tab eventKey="email" title="email">

        </Tab>

      </Tabs >


    </div >
  )
}
