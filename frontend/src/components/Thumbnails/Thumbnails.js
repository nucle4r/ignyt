import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import classes from './thumbnails.module.css';
import Desc from '../Description/Desc';
import { Rating } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useCart } from '../../hooks/useCart';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Thumbnails({ foods }) {
  const { addToCart, cartQuantities, changeQuantity, removeFromCart } = useCart();

  const handleAddToCart = (food) => {
    addToCart(food);
  };

  const handleDecreaseQuantity = (food) => {
    if (cartQuantities[food.id] > 1) {
      changeQuantity(food.id, cartQuantities[food.id] - 1);
    } else {
      removeFromCart(food.id);
    }
  };

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

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6" color="#ffca28">
                  {food.name}
                </Typography>
                <Rating name="read-only" value={food.stars} size="small" precision={0.5} readOnly />
                <Typography variant="body" color="#ffffff" fontSize="small" component="div" sx={{ margin: "5px 0" }}>
                  <Price price={food.price} />
                </Typography>
                <Link to={`/food/${food.id}`}>
                  <Typography variant="body" color="#edd87f" fontSize="small" component="div">
                    <Desc desc={food.desc} />
                  </Typography>
                </Link>
              </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Stack spacing={2} direction="column" sx={{ padding: "0.5rem" }}>
                <CardMedia
                  component="img"
                  sx={{ height: "7rem", width: "7rem", borderRadius: "1rem", alignSelf: "start" }}
                  image={`${food.imageUrl}`}
                />
                {cartQuantities[food.id] ? (
                  <ButtonGroup size='small'>
                    <Button color="success" sx={{ position: "realtive", fontSize: '12px' }} variant="contained" onClick={() => handleDecreaseQuantity(food)}>
                      <IconButton size='small' sx={{ padding: "0" }}>
                        <RemoveIcon sx={{ fontSize: "14px" }} />
                      </IconButton>
                    </Button>
                    <Button color="success" sx={{ position: "realtive", fontSize: '12px' }} variant="contained">
                      <Typography sx={{ padding: "0", fontSize: "14px" }}>{cartQuantities[food.id]}</Typography>
                    </Button>
                    <Button color="success" sx={{ position: "realtive", fontSize: '12px' }} variant="contained" onClick={() => addToCart(food)}>
                      <IconButton sx={{ padding: "0" }} >
                        <AddIcon sx={{ fontSize: "14px" }} />
                      </IconButton>
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button onClick={() => handleAddToCart(food)} color="success" sx={{ position: "realtive", fontSize: '12px' }} variant="contained">Add to Cart</Button>
                )}
              </Stack>
            </Box>
          </Box>
        </Card>
      ))}
    </div>
  )
}