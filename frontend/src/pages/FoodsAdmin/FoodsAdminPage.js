import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { deleteById, getAll, search } from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import { toast } from 'react-toastify';
import classes from './foodsAdminPage.module.css';
import Price from '../../components/Price/Price';
import { Add } from '@mui/icons-material';

export default function FoodsAdminPage() {
  const [foods, setFoods] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    loadFoods();
  }, [searchTerm]);

  const loadFoods = async () => {
    const foodsData = searchTerm ? await search(searchTerm) : await getAll();
    setFoods(foodsData);
  };

  const FoodsNotFound = () => {
    if (foods.length > 0) return null;

    return searchTerm ? (
      <NotFound linkRoute="/admin/foods" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  };

  const deleteFood = async (food) => {
    const confirmed = window.confirm(`Delete Food ${food.name}?`);
    if (!confirmed) return;

    await deleteById(food.id);
    toast.success(`"${food.name}" Has Been Removed!`);
    setFoods(foods.filter((f) => f.id !== food.id));
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title title="Manage Foods" />
          <Search
            searchRoute="/admin/foods/"
            defaultRoute="/admin/foods"
            placeholder="Search Foods"
          />
          <Button
            component={Link}
            to="/admin/addFood"
            variant="contained"
            color="primary"
            className={classes.add_food}
          >
            Add Food <Add/>
          </Button>
          <FoodsNotFound />
          {foods.map((food) => (
            <Grid item xs={12} key={food.id} className={classes.list_item}>
              <img src={food.imageUrl} alt={food.name} className={classes.image} />
              <Typography variant="h6" component={Link} to={`/food/${food.id}`} className={classes.food_name}>
                {food.name}
              </Typography>
              <div className={classes.price}>
                <Price price={food.price} />
              </div>
              <div className={classes.actions}>
                <Button
                  component={Link}
                  to={`/admin/editFood/${food.id}`}
                  color="primary"
                  className={classes.edit_button}
                >
                  Edit
                </Button>
                <Button onClick={() => deleteFood(food)} color="secondary" className={classes.delete_button}>
                  Delete
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
