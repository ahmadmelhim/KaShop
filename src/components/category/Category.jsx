import { Card, CardActions, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Category.module.css'
export default function Category() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
      const response = await axios.get('http://mytshop.runasp.net/api/categories');
      setCategories(response.data);
    
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      <Grid container spacing={4} className={`${styles.section}`}>
        {categories.map((category) => (
          <Grid item size={{xs:12, sm:6, md:4 ,lg:4, xl:3}}  key={category.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {category.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
