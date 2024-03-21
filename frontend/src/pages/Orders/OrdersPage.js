import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAll, getAllStatus, updateOrder } from '../../services/orderService';
import { useAuth } from '../../hooks/useAuth';
import classes from './ordersPage.module.css';
import Title from '../../components/Title/Title';
import DateTime from '../../components/DateTime/DateTime';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ALL_STATUS_FETCHED':
      return { ...state, allStatus: payload };
    case 'ORDERS_FETCHED':
      return { ...state, orders: payload };
    case 'UPDATE_ORDER_STATUS':
      const updatedOrders = state.orders.map(order => {
        if (order.id === payload.id) {
          return { ...order, status: payload.status };
        }
        return order;
      });
      return { ...state, orders: updatedOrders };
    default:
      return state;
  }
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);

  const { filter } = useParams();

  useEffect(() => {
    getAllStatus().then(status => {
      dispatch({ type: 'ALL_STATUS_FETCHED', payload: status });
    });
    getAll(filter).then(orders => {
      dispatch({ type: 'ORDERS_FETCHED', payload: orders });
    });
  }, [filter]);

  const handleUpdateOrder = async (orderID, state) => {
    await updateOrder(orderID, state);
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: orderID, status: state.status } });
  }

  return (
    <div className={classes.container}>
      <Title title={(user.isAdmin ? "Orders" : "Your Orders")} margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />
      {user.isAdmin && allStatus && (
          <Box sx={{ width: "100%", bgcolor: '#edd87f', borderBottom: 1, borderColor: 'divider', margin: '10px' }}>
            <Tabs
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              value={filter || 'all'}>
              <Tab
                key="All"
                label="All"
                value="all"
                component={Link}
                to="/orders"
                className={!filter ? classes.selected : ''}
              />
              {allStatus.map(state => (
                <Tab
                  key={state}
                  label={state}
                  value={state}
                  component={Link}
                  to={`/orders/${state}`}
                  className={state === filter ? classes.selected : ''}
                />
              ))}
            </Tabs>
          </Box>
      )}


      {orders?.length === 0 && (
        <NotFound
          linkRoute={filter ? '/orders' : '/'}
          linkText={filter ? 'Show All' : 'Go To Home Page'}
        />
      )}

      {orders &&
        orders.map(order => (
          <Card key={order.id} variant="elevation" sx={{ width: "360px", marginTop: "20px" }}>
            <div id={order.id}>
              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1 }}>
                  <Typography gutterBottom variant="body" component="div">
                    #{order.id.substring(18,24)}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div" sx={{ fontWeight: "bold", textDecoration: "underline", color: (order.status == 'NEW' ? 'blue' : order.status == 'PREPARING' ? "#f57c00" : order.status == 'SERVED' ? "green" : order.status == 'CANCELED' ? "red" : "black") }}>
                    {order.status}
                  </Typography>
                </Stack>
                <Divider />
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
                  Order Items:
                </Typography>
                <Stack direction="row" spacing={1}>
                  <div className={classes.items}>
                    {order.items.map(item => (
                      <Link key={item.food.id} to={`/food/${item.food.id}`}>
                        <img src={item.food.imageUrl} alt={item.food.name} />
                      </Link>
                    ))}
                  </div>
                </Stack>
                <Divider />
                <Stack flexDirection='row' sx={{ justifyContent: "space-between", m: 2 }}>
                  <Button LinkComponent={Link} to={`/track/${order.id}`} variant="outlined">Show Order</Button>
                  <span className={classes.price}>
                    <Price price={order.totalPrice} />
                  </span>
                </Stack>
                {user.isAdmin ? (
                  <Stack flexDirection='row' sx={{ justifyContent: "space-evenly" }}>
                    <Button color='warning' variant="contained" sx={{ fontSize: "14px", m: 1 }} onClick={() => handleUpdateOrder(order.id, { status: 'PREPARING' })}>
                      PREPARING
                    </Button>
                    <Button color='success' variant="contained" sx={{ fontSize: "14px", m: 1 }} onClick={() => handleUpdateOrder(order.id, { status: 'SERVED' })}>
                      SERVED
                    </Button>
                    <Button color='error' variant="contained" sx={{ fontSize: "14px", m: 1 }} onClick={() => handleUpdateOrder(order.id, { status: 'CANCELED' })}>
                      CANCELED
                    </Button>
                  </Stack>) : null}
              </Box>
            </div>
          </Card>
        ))}
    </div>
  );
}
