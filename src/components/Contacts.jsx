'useStrict';

import React from 'react'

export default function Contacts() {
  return (
<div className='Block_wrapper'>
    <div className='par' id='contacts_anchor'>Контакты</div>
    <div className='social_wrapper'>
        <div className='social_icons'><a href="https://www.instagram.com/cipo.kz/"><img width='40px' src={require('../assets/contacts/instagram.png')} alt='instagram'/></a></div>
        <div className='social_icons'><a href="https://wa.me/77788121260"><img width='40px' src={require('../assets/contacts/whatsapp.png')} alt='whatsapp'/></a></div>
        <div className='social_icons'><a href="https://kaspi.kz/shop/search/?text=cipo&q=%3Acategory%3AShoes%3AallMerchants%3A8188001&sort=relevance&filteredByCategory=false"><img width='42px' src={require('../assets/contacts/kaspi.png')} alt='kaspi'/></a></div>
    </div>
</div>   

  )
}
