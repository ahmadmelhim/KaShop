import { Card, CardActions, CardContent, Typography, Button, Grid, Container, CardMedia } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './products.module.css'
import { Link } from 'react-router';

export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
      const response = await axios.get('http://mytshop.runasp.net/api/products');
      setProducts(response.data);
      console.error('Error fetching categories:', error);
    
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Grid container spacing={4} className={`${styles.section}`}>
        {
        products.map((product) => (
          <Grid item size={{xs:12, sm:6, md:4 ,lg:4, xl:3}}  key={product.id}>
            <Card>
                <CardMedia component={'img'} image= {product.mainImg} alt= {product.description}>

                </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/product/${product.id}`}>Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
