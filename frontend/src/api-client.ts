import type { RegisterFormData } from "./pages/Register";

import { API_BASE_URL } from "./constants/env";
import type { SignInFormData } from "./pages/SignIn";
// import type { HotelFormData } from "./forms/manageHotelForm/ManageHotelForm";
import type { HotelType } from "../../shared/types";

const base_url = API_BASE_URL ?? "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${base_url}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${base_url}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${base_url}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${base_url}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${base_url}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${base_url}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${base_url}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};
export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${base_url}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update hotel");
  }

  return response.json();
};
