import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import { getById } from '../../services/foodService';
import classes from './foodPage.module.css';
import NotFound from '../../components/NotFound/NotFound';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  return (
    <>
      {!food ? (
        <NotFound message="Food Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <Card sx={{
            width: 360,
            border: "1px",
            borderColor: "#1d1d1d",
            borderStyle: "solid",
            borderRadius: "1rem",
            backgroundColor: "#1d1d1d"
          }}>

            <CardMedia
              component="img"
              height="200"
              image={food.imageUrl}
              alt={food.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffca28" }}>
                {food.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: "#edd87f", textAlign: "justify", textJustify: "inter-word", fontStyle: "italic" }}>
                {food.desc}
              </Typography>
              {food.cookTime ? <Typography variant="body1" color="text.secondary" sx={{ color: "white", textAlign: "center", margin: "1.5rem" }}>
                Time to cook about {`${food.cookTime}`} minutes
              </Typography> : null}
              <Stack direction="row" sx={{ margin: "10px 0", justifyContent: "space-between" }}>
                <Typography gutterBottom variant="body" component="div" sx={{ color: "white" }}>
                  <Price className={classes.price} price={food.price} />
                </Typography>
                {!user || !user.isAdmin ? (
                  cartQuantities[food.id] ? (
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
                  )
                ) : user.isAdmin ? <Link to={'/admin/editFood/' + food.id}>Edit</Link>
                  : null}
              </Stack>

            </CardContent>




          </Card>
        </div>
      )}
    </>
  );
}
