import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getAll, toggleBlock } from '../../services/userService';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import { useAuth } from '../../hooks/useAuth';
import './usersPage.module.css';
import classes from './usersPage.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { searchTerm } = useParams();
  const auth = useAuth();

  useEffect(() => {
    loadUsers();
  }, [searchTerm]);

  const loadUsers = async () => {
    const usersData = await getAll(searchTerm);
    setUsers(usersData);
  };

  const handleToggleBlock = async (userId) => {
    const isBlocked = await toggleBlock(userId);

    setUsers((oldUsers) =>
      oldUsers.map((user) => (user.id === userId ? { ...user, isBlocked } : user))
    );
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title title="Manage Users" />
          <Search
            searchRoute="/admin/users/"
            defaultRoute="/admin/users"
            placeholder="Search Users"
            margin="1rem 0"
          />
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{user.name}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Email: </strong>{user.email}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Type: </strong>{user.isAdmin ? 'Admin' : 'User'}</Typography>
                    <Box className={classes.actions}>
                      <Button component={Link} to={`/admin/editUser/${user.id}`} color="primary">
                        Edit
                      </Button>
                      {auth.user.id !== user.id && (
                        <Button onClick={() => handleToggleBlock(user.id)} color="primary">
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
