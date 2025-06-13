import jwt from "jsonwebtoken";

type UserType = {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const getToken = (user: UserType) =>
  jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });
