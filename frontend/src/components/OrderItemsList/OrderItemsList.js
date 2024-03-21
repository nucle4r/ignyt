import React from 'react';
import Price from '../Price/Price';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classes from './orderItemsList.module.css';

export default function OrderItemsList({ order }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Item Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map(item => (
              <TableRow
                key={item.food.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{item.food.name}</TableCell>
                <TableCell align="center"><Price price={item.food.price} /></TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center"><Price price={item.price} /></TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2} align="right"><strong>Order Total</strong></TableCell>
              <TableCell align="left"><Price price={order.totalPrice}/></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
