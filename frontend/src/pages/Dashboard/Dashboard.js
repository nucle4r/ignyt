import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import classes from './dashboard.module.css';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const allItems = [
    {
      title: 'Orders',
      imageUrl: '/icons/orders.svg',
      url: '/orders',
      bgColor: '#FB8B24',
      color: '#111111',
    },
    {
      title: 'Bookings',
      imageUrl: '/icons/booking.svg',
      url: '/admin/bookings',
      forAdmin: true,
      bgColor: '#FFF78A',
      color: '#111111',
    },
    {
      title: 'Users',
      imageUrl: '/icons/users.svg',
      url: '/admin/users',
      forAdmin: true,
      bgColor: '#FFF78A',
      color: '#111111',
    },
    {
      title: 'Foods',
      imageUrl: '/icons/foods.svg',
      url: '/admin/foods',
      forAdmin: true,
      bgColor: '#FB8B24',
      color: '#111111',
    },
    {
      title: 'Profile',
      imageUrl: '/icons/profile.svg',
      url: '/profile',
      bgColor: '#FFF78A',
      color: '#111111',
    },
    
  ];

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter(item => user.isAdmin || !item.forAdmin)
          .map(item => (
            <Link
              key={item.title}
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
              <img src={item.imageUrl} alt={item.title} />
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}
