import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { createOrder } from '../../services/orderService';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import NotFound from '../../components/NotFound/NotFound';
import classes from './cartPage.module.css'

export default function CartPage() {
  const { cart, addToCart, removeFromCart, cartQuantities, changeQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate(`/login?returnUrl=/cart`);
      return
    }
    await createOrder({ ...cart, name: user.name });
    await clearCart();
    navigate('/orders');
  };

  const handleDecreaseQuantity = (food) => {
    if (cartQuantities[food.id] > 1) {
      changeQuantity(food.id, cartQuantities[food.id] - 1);
    } else {
      removeFromCart(food.id);
    }
  };

  return (
    <>
      <Title title="Your Cart" margin="1.5rem 0 0 2.5rem" />

      {cart.items.length === 0 ? (
        <NotFound message="Your Cart is Empty!" linkRoute='/menu'
          linkText='Go To Menu' />
      ) : (
        <div className={classes.container}>
          <List sx={{ width: "360px", backgroundColor: '#333', color: '#fff', borderRadius: "20px" }}>
            {cart.items.map((item) => (
              <ListItem key={item.food.id}>
                <ListItemAvatar>
                  <img src={`${item.food.imageUrl}`} alt={item.food.name} style={{ width: '64px', height: '64px', borderRadius: "15px" }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link to={`/food/${item.food.id}`} style={{ color: '#fff', padding: 10 }}>
                      {item.food.name}
                    </Link>
                  }
                  secondary={
                    <ButtonGroup size="small" sx={{ p: 1 }}>
                      <Button color="success" sx={{ position: "realtive", fontSize: '12px' }} variant="contained" onClick={() => handleDecreaseQuantity(item.food)}>
                        <RemoveIcon />
                      </Button>
                      <Button color="success" sx={{ position: "realtive", fontSize: '12px' }} variant="contained">
                        <Typography sx={{ padding: "0", fontSize: "14px" }}>{cartQuantities[item.food.id]}</Typography>
                      </Button>
                      <Button color="success" sx={{ position: "realtive", fontSize: '12px' }} variant="contained" onClick={() => addToCart(item.food)}>
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  }
                />
                <ListItemText
                  primary={<Price price={item.price} />}
                  secondary={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.food.id)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                  }
                  sx={{ flex: '0 0 auto' }}
                />
                <Divider />
              </ListItem>

            ))}

          </List>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Typography variant="h6" style={{ color: '#fff' }}>Total Items: {cart.totalCount}</Typography>
            <Typography variant="h6" style={{ color: '#fff' }}>Total Price: <Price price={cart.totalPrice} /></Typography>
            <Button variant="contained" onClick={handleConfirm} style={{ marginTop: '1rem' }}>
              Confirm Order
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
