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
export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
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
            maxWidth: 380,
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
                  <button onClick={handleAddToCart}>Add to Cart</button>
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
