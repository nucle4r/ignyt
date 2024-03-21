import axios from 'axios';

export const createBooking = async booking => {
  try {
    const { data } = axios.post('/api/bookings/', booking);
    return data;
  } catch (error) {
    console.log(error)
  }
};

export const updateBooking = async (bookingID, status) => {
  try {
    const { data } = axios.put(`/api/admin/bookings/update/${bookingID}`, status);
    return data;
  } catch (error) {}
};

export const getAllStatus = async state => {
    const { data } = await axios.get(`/api/admin/bookings/${state ?? ''}`);
    return data;
  };
  
  export const getAllBookingStatus = async () => {
    const { data } = await axios.get(`/api/admin/bookings/allstatus`);
    return data;
  };