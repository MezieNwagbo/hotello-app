import { HotelType } from "../shared/types";
import { AsynFunctionType } from "../shared/types";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model";

import { CREATED, INTERNAL_SERVER_ERROR } from "../shared/http";

export const addHotelHandler: AsynFunctionType = async (req, res) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    //1. upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = `data:${image.mimetype};base64,${b64}`;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    //2. if upload was successful, add the urls to the new hotel
    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.userId;

    //3. save tje new hotel in our database
    const hotel = new Hotel(newHotel);
    await hotel.save();

    //4. return a 201 status
    res.status(CREATED).send(hotel);
  } catch (error) {
    console.log("Error creating hotel:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const getHotelHandler: AsynFunctionType = async (req, res) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
};
