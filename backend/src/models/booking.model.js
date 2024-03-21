import { model, Schema } from 'mongoose';
import { BookingStatus } from '../constants/bookingStatus.js';

export const BookingSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    peopleCount: { type: Number, required: true },
    anyRequest: { type: String, },
    status: { type: String, default: BookingStatus.NEW },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const BookingModel = model('bookings', BookingSchema);
