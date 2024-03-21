import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trackOrderById } from '../../services/orderService';
import NotFound from '../../components/NotFound/NotFound';
import classes from './orderTrackPage.module.css';
import DateTime from '../../components/DateTime/DateTime';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    orderId &&
      trackOrderById(orderId).then(order => {
        setOrder(order);
      });
  }, []);

  if (!orderId)
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

  return (
    order && (
      <div className={classes.container}>
        <Card variant="elevation" sx={{ width: "360px" }}>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="body" component="div">
                #{order.id.substring(18,24)}
              </Typography>
              <Typography gutterBottom variant="body2" component="div" sx={{ fontWeight: "bold", textDecoration: "underline", color: (order.status == 'NEW' ? 'blue' : order.status == 'PREPARING' ? "#f57c00" : order.status == 'SERVED' ? "green" : order.status == 'CANCELED' ? "red" : "black") }}>
                {order.status}
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              <strong>Date: </strong> <DateTime date={order.createdAt} />
            </Typography>
            <Typography color="text.secondary" variant="body2">
              <strong>Name: </strong> {order.name}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
              Order Details:
            </Typography>
            <Stack direction="row" spacing={1}>
              <OrderItemsList order={order} />
            </Stack>
          </Box>
        </Card>
      </div>
    )
  );
}
