import React, { useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllStatus, getAllBookingStatus, updateBooking, createBooking } from '../../services/bookingService';
import { useAuth } from '../../hooks/useAuth';
import classes from './adminBookingPage.module.css';
import Title from '../../components/Title/Title';
import DateTime from '../../components/DateTime/DateTime';
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
        case 'BOOKINGS_FETCHED':
            return { ...state, bookings: payload };
        case 'UPDATE_BOOKING_STATUS':
            const updatedBookings = state.bookings.map(booking => {
                if (booking.id === payload.id) {
                    return { ...booking, status: payload.status };
                }
                return booking;
            });
            return { ...state, bookings: updatedBookings };
        default:
            return state;
    }
};

export default function AdminBookingsPage() {
    const { user } = useAuth();
    const navigate = useNavigate()
    const [{ allStatus, bookings }, dispatch] = useReducer(reducer, initialState);

    const { filter } = useParams();

    useEffect(() => {
        getAllBookingStatus().then(status => {
            dispatch({ type: 'ALL_STATUS_FETCHED', payload: status });
        });
        getAllStatus(filter).then(bookings => {
            dispatch({ type: 'BOOKINGS_FETCHED', payload: bookings });
        });
    }, [filter]);

    const handleUpdateBooking = async (bookingID, state) => {
        await updateBooking(bookingID, state);
        dispatch({ type: 'UPDATE_BOOKING_STATUS', payload: { id: bookingID, status: state.status } });
    }

    return (
        <div className={classes.container}>
            <Title title={"Bookings"} margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />

            {allStatus && (
                <div className={classes.all_status}>
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
                                to="/admin/bookings"
                                className={!filter ? classes.selected : ''}
                            />
                            {allStatus.map(state => (
                                <Tab
                                    key={state}
                                    label={state}
                                    value={state}
                                    component={Link}
                                    to={`/admin/bookings/${state}`}
                                    className={state === filter ? classes.selected : ''}
                                />
                            ))}
                        </Tabs>
                    </Box>

                </div>
            )}

            {bookings?.length === 0 && (
                <NotFound
                    linkRoute={filter ? '/admin/bookings' : '/'}
                    linkText={filter ? 'Show All' : 'Go To Home Page'}
                />
            )}

            {bookings &&
                bookings.map(booking => (
                    <Card key={booking.id} variant="elevation" sx={{ width: 400, margin: "20px" }}>
                        <div id={booking.id}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1 }}>
                                    <Typography gutterBottom variant="body" component="div">
                                        #{booking.id}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" component="div" sx={{ fontWeight: "bold", textDecoration: "underline", color: (booking.status == 'NEW' ? 'blue' : booking.status == 'CONFIRMED' ? "green" : booking.status == 'CANCELED' ? "red" : "black") }}>
                                        {booking.status}
                                    </Typography>
                                </Stack>
                                <Typography color="text.secondary" variant="body2" sx={{ fontSize: "12px" }}>
                                    <DateTime date={booking.createdAt} />
                                </Typography>
                                <Divider />
                                <Typography color="text.secondary" variant="body2">
                                    <strong>Name: </strong> {booking.name}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    <strong>Phone: </strong> {booking.phoneNo}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    <strong>Booking Date: </strong> {booking.date}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    <strong>Booking Time: </strong> {booking.time}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    <strong>Number Of People: </strong> {booking.peopleCount}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    <strong>Any Requests: </strong> {(booking.anyRequest? booking.anyRequest : "None")}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Stack flexDirection='row' sx={{ justifyContent: "space-evenly" }}>
                                    <Button color='success' variant="contained" sx={{ fontSize: "14px", m: 1 }} onClick={() => handleUpdateBooking(booking.id, { status: 'CONFIRMED' })}>
                                        CONFIRM
                                    </Button>
                                    <Button color='error' variant="contained" sx={{ fontSize: "14px", m: 1 }} onClick={() => handleUpdateBooking(booking.id, { status: 'CANCELED' })}>
                                        CANCELED
                                    </Button>
                                </Stack>
                            </Box>
                        </div>
                    </Card>
                ))}
        </div>
    );
}
