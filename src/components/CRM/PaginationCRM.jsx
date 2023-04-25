import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';

export default function PaginationCRM({ totalCount, updateSkip }) {

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 100;

  let items = [];
  for (let i=1; i <= totalCount; i++) {
    items.push(i);
  }
  
  
  
  //console.log('items', items);
  //const endOffset = itemOffset + itemsPerPage;
  //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  updateSkip(itemOffset);

  // function Items({ currentItems }) {
  //   return (
  //     <div>
  //       {currentItems &&
  //         currentItems.map((item, index) => (
  //           <div key = {'item'+index}>
  //             <span>Item #{item}</span>
  //           </div>
  //         ))}
  //     </div>
  //   );
  // }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    //console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };


  return (
    <div >

      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        //className='CRM_page_wrapper'
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}                            
        
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />



    </div>
  )
}
