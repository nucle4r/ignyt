import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';
import Desc from '../Description/Desc';
import { Rating } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
export default function Thumbnails({ foods }) {
  return (
    <div className={classes.list}>
      {foods.map(food => (
        <Card sx={{
          display: 'flex',
          maxWidth: "380px",
          margin: "0.5rem",
          border: "0px",
          borderColor: "#c99734",
          borderStyle: "solid",
          borderRadius: "1rem",
          backgroundColor: "#1d1d1d"
        }} key={food.id}>
          <Link to={`/food/${food.id}`}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h6" color="#ffca28">
                    {food.name}
                  </Typography>
                  <Rating name="read-only" value={food.stars} size="small" precision={0.5} readOnly />
                  <Typography variant="body" color="#ffffff" fontSize="small" component="div" sx={{margin:"5px 0"}}>
                    <Price price={food.price}/>
                  </Typography>
                  <Typography variant="body" color="#edd87f" fontSize="small" component="div">
                    <Desc desc={food.desc} />
                  </Typography>
                </CardContent>

              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <CardMedia
                  component="img"
                  sx={{ height: "8rem", width: "8rem", padding: "0.5rem", borderRadius: "1rem", alignSelf: "start" }}
                  image={`${food.imageUrl}`}
                  alt="Live from space album cover"
                />
              </Box>
            </Box>
          </Link>
        </Card>))}
    </div>
  );

}

