import type { AsynFunctionType } from "../shared/types";

import Hotel from "../models/hotel.model";
import { HotelType } from "../shared/types";

// /api/my-bookings
export const getMyBookingsHandler: AsynFunctionType = async (req, res) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    // map through the hotels
    const results = hotels.map((hotel) => {
      //in each hotel, filter the bookings to get bookings with the user Id
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
};
