import { Router } from 'express';
import { BookingModel } from '../models/booking.model.js';
import { BookingStatus } from '../constants/bookingStatus.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';


const router = Router();

router.get(
    '/',
    admin,
    handler(async (req, res) => {
        const bookings = await BookingModel.find({});
        res.send(bookings);
    })
);

router.post(
    '/',
    handler(async (req, res) => {
        const { name, phoneNo, date, time, peopleCount, anyRequest } =
            req.body;

        const booking = new BookingModel({
            name, phoneNo, date, time, peopleCount, anyRequest
        });

        await booking.save();

        res.send(booking);
    })
);

router.put(
    '/',
    admin,
    handler(async (req, res) => {
        const { name, phoneNo, date, time, peopleCount, anyRequest } =
            req.body;

        await BookingModel.updateOne(
            { _id: id },
            {
                name, phoneNo, date, time, peopleCount, anyRequest
            }
        );

        res.send();
    })
);

router.delete(
    '/:bookingId',
    admin,
    handler(async (req, res) => {
        const { bookingId } = req.params;
        await BookingModel.deleteOne({ _id: bookingId });
        res.send();
    })
);


router.get(
    '/search/:searchTerm',
    handler(async (req, res) => {
        const { searchTerm } = req.params;
        const searchRegex = new RegExp(searchTerm, 'i');

        const bookings = await BookingModel.find({ name: { $regex: searchRegex } });
        res.send(bookings);
    })
);

router.get('/allstatus', (req, res) => {
    const allStatus = Object.values(BookingStatus);
    res.send(allStatus);
});

router.get(
    '/:status?',
    handler(async (req, res) => {
        const status = req.params.status;
        const filter = {};

        if (status) filter.status = status;

        const bookings = await BookingModel.find(filter).sort('-createdAt');
        res.send(bookings);
    })
);

export default router;
