import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../../components/shared/Loader';
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function Product() {

    const {id} =useParams('id');
    const [product,setProduct]=useState(null)
    const [isLoading,setLoading]=useState(true)
    const getProduct=async()=>{
        const response=await axios.get(`http://mytshop.runasp.net/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
    }
    const addToCart = async(id)=>{
        const userToken=localStorage.getItem("userToken")
        const response = await axios.post(`http://mytshop.runasp.net/api/Carts/${id}`,{},
            {
                headers:{
                    Authorization:`Bearer ${userToken}`
                }
            }
        )
    }

    useEffect(()=>{
        getProduct();
    },[])
    if(isLoading){
        return <Loader/>
    }
  return (
    <Card>
        <CardContent>
            <Typography component={'h2'}>
                {product.name}
            </Typography>
             <Typography component={'p'}>
                {product.description}
            </Typography>
            <Typography component={'p'}>
                {product.price}
            </Typography>
            <Button onClick={()=>addToCart(product.id)}>Add To Cart</Button>
        </CardContent>

    </Card>
  )
}
