import React from 'react'

export default function Pagination({page, active}) {

function changePage(p) {

}

  return (
    <div style={{ cursor: 'pointer' }} className={'page-item'} >
      {active ? <div className='page  active_page'>{page}</div> : <div className='page'>{page}</div>}
    </div>
    //{countPages.map(e)}
  )
}
