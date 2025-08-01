import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

import * as apiClient from "../api-client";

const AddHotel = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,

    onSuccess: () => {
      showToast({ message: "Hotel saved", type: "success" });
      navigate("/my-hotels");
    },
    onError: (error: Error) => {
      console.error("Error adding hotel:", error.message);
      showToast({ message: error.message, type: "error" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
