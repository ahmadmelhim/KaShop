import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography, Button } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import Loader from '../../components/shared/Loader';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  const getProductFromCart = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get(`http://mytshop.runasp.net/api/Carts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data.cartResponse);
    } catch (error) {
      console.error("Error fetching cart products", error);
    } finally {
      setIsLoader(false);
    }
  };

  const increaseQty = async (id) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(`http://mytshop.runasp.net/api/Carts/increaseCount/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedProducts = products.map(product =>
        product.id === id ? { ...product, count: product.count + 1 } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error increasing quantity", error);
    }
  };

  const decreaseQty = async (id) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(`http://mytshop.runasp.net/api/Carts/decreaseCount/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedProducts = products
        .map(product =>
          product.id === id ? { ...product, count: product.count - 1 } : product
        )
        .filter(product => product.count > 0);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error decreasing quantity", error);
    }
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.delete(`http://mytshop.runasp.net/api/Carts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("userToken");
    const confirm = window.confirm("هل  تريد مسح السلة بالكامل؟");
    if (!confirm) return;
    try {
      await axios.delete(`http://mytshop.runasp.net/api/Carts/clearCart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts([]);
    } catch (error) {
      console.error("Error clearing the cart", error);
    }
  };

  useEffect(() => {
    getProductFromCart();
  }, []);

  if (isLoader) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>Shopping Cart</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {products.map(product => (
            <Card sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', p: 2, mb: 2 }} key={product.id}>
              <CardMedia component="img" image="https://placehold.co/100" sx={{ borderRadius: 2, width: 200 }} />
              <CardContent>
                <Typography variant="h5" gutterBottom>{product.name}</Typography>
                <Typography variant="h6" color="primary">{product.price} $</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto', mr: 2 }}>
                <IconButton onClick={() => decreaseQty(product.id)}><Remove /></IconButton>
                <Typography>{product.count}</Typography>
                <IconButton onClick={() => increaseQty(product.id)}><Add /></IconButton>
                <IconButton color="error" onClick={() => deleteProduct(product.id)}><Delete /></IconButton>
              </Box>
            </Card>
          ))}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={clearCart} startIcon={<Delete />} >
              مسح السلة بالكامل
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h3" gutterBottom>Order Summary</Typography>

          
        </Grid>
      </Grid>
    </Box>
  );
}
