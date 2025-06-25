import { HotelType } from "../shared/types";
import { AsynFunctionType } from "../shared/types";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model";

import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../shared/http";

//image upload function
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export const addHotelHandler: AsynFunctionType = async (req, res) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    //1. upload images to cloudinary

    const imageUrls = await uploadImages(imageFiles);
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.userId;

    //3. save the new hotel in our database
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
    const hotels = await Hotel.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHotelDetailsHandler: AsynFunctionType = async (req, res) => {
  const id = req.params.hotelId.toString();
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateHotelDetailsHandler: AsynFunctionType = async (req, res) => {
  try {
    const updatedHotel: HotelType = req.body;

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(NOT_FOUND).json("Hotel not found");
    }

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    res.status(CREATED).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
