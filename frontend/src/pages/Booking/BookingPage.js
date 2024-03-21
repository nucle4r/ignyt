import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Select, MenuItem, FormControl, InputLabel, TextareaAutosize } from '@mui/material';
import { createBooking } from '../../services/bookingService';
import classes from './bookingForm.module.css';
import { toast } from 'react-toastify';

export default function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        date: '',
        time: '',
        peopleCount: 1,
        anyRequest: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBooking(formData)
        toast.success(`Booking for "${formData.name}" done successfully! You will receive confirmation on your number.`);
        setFormData({
            name: '',
            phoneNo: '',
            date: '',
            time: '',
            peopleCount: 1,
            anyRequest: '',
        })
        return;
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom className={classes.title}>Book a Table</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel id="time-select-label">Time</InputLabel>
                            <Select
                                labelId="time-select-label"
                                id="time-select"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className={classes.input}
                            >
                                <MenuItem value="11:00 AM-12:00PM">11:00 AM-12:00PM</MenuItem>
                                <MenuItem value="01:00 PM-02:00PM">01:00 PM-02:00PM</MenuItem>
                                <MenuItem value="03:00 PM-04:00PM">03:00 PM-04:00PM</MenuItem>
                                <MenuItem value="05:00 PM-06:00PM">05:00 PM-06:00PM</MenuItem>
                                <MenuItem value="07:00 PM-08:00PM">07:00 PM-08:00PM</MenuItem>
                                <MenuItem value="09:00 PM-10:00PM">09:00 PM-10:00PM</MenuItem>
                                {/* Add more time slots as needed */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <div classNPMe={classes.numberInput}>
                            <TextField
                                fullWidth
                                label="Number of People"
                                name="peopleCount"
                                type="number"
                                inputProps={{ maxLength: 10 }}
                                value={formData.peopleCount}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                className={classes.input}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.numberInput}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNo"
                                type="number"
                                inputProps={{ maxLength: 10 }}
                                value={formData.phoneNo}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                className={classes.input}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            fullWidth
                            minRows={3}
                            maxRows={5}
                            placeholder="Any Special Requests (Optional)"
                            name="anyRequest"
                            value={formData.anyRequest}
                            onChange={handleChange}
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
