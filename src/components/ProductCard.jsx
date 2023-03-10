import React from 'react';
import Box from '@mui/material/Box';
import { backend_url } from '../app/product.api';



export default function ProductCard({ product }) {

    return (
        <div className='ProductCard_wrapper'>
            <Box
                sx={{
                    width: 150,
                    height: 150,
                    //backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
                className = 'ProductCard_card'

            >{product.id}
            <img className='ProductCard_img' src={backend_url + '/' + product.image_active_path} alt={product.id}/>
            {product.vid_modeli_name}
            <p>{product.name}</p>
            {product.qnt_price.map((e) => 
                <span>{e.size},</span>
            )}    
            <p>{product.sum}</p>

            
            </Box>

        </div>
    )
}

